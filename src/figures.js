import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const TAU = Math.PI * 2;
const zero = [0, 0, 0];
const colors = {
  blue: 0x108ee0,
  blueShade: 0x075095,
  ice: 0x79d7ff,
  navy: 0x162d50,
  skin: 0xf1b57e,
  skinShade: 0xc98d60,
  khaki: 0xd0aa67,
  tan: 0xb68247,
  leather: 0x543528,
  dark: 0x252530,
  gun: 0x263548,
  steel: 0x8197a8,
  red: 0xe72d35,
  wine: 0x8f1826,
  orange: 0xffb02d,
  gold: 0xf0b84d,
};

// A stack of elliptical cross-sections. With a power below 1 the contours
// become squarer, which is useful for jaws, gloves and the soles of boots.
function loft(rings, sides = 16, power = 1, arc = null) {
  const positions = [];
  const indices = [];
  const count = arc ? sides + 1 : sides;
  const firstAngle = arc ? arc[0] : 0;
  const sweep = arc ? arc[1] - arc[0] : TAU;
  for (const [y, rx, rz, cx = 0, cz = 0] of rings) {
    for (let i = 0; i < count; i++) {
      const theta = firstAngle + (sweep * i) / sides;
      const sin = Math.sin(theta),
        cos = Math.cos(theta);
      positions.push(
        cx + rx * Math.sign(sin) * Math.abs(sin) ** power,
        y,
        cz + rz * Math.sign(cos) * Math.abs(cos) ** power,
      );
    }
  }
  for (let level = 0; level < rings.length - 1; level++) {
    for (let i = 0; i < sides; i++) {
      const next = arc ? i + 1 : (i + 1) % count;
      const a = level * count + i,
        b = level * count + next;
      indices.push(a, b, a + count, b, b + count, a + count);
    }
  }
  if (!arc) {
    for (const last of [false, true]) {
      const level = last ? rings.length - 1 : 0;
      const [y, , , cx = 0, cz = 0] = rings[level];
      const center = positions.length / 3;
      positions.push(cx, y, cz);
      const offset = level * count;
      for (let i = 0; i < sides; i++) {
        const a = offset + i,
          b = offset + ((i + 1) % sides);
        if (last) indices.push(center, a, b);
        else indices.push(center, b, a);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function orb(x = 12, y = 8) {
  return new THREE.SphereGeometry(1, x, y);
}

function beam(a, b, ra, rb = ra, sides = 8) {
  const from = new THREE.Vector3(...a),
    to = new THREE.Vector3(...b);
  const axis = to.clone().sub(from);
  const geometry = new THREE.CylinderGeometry(rb, ra, axis.length(), sides);
  geometry.applyQuaternion(
    new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis.normalize()),
  );
  const middle = from.add(to).multiplyScalar(0.5);
  return geometry.translate(middle.x, middle.y, middle.z);
}

function stroke(points, radius, sides = 6) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  return new THREE.TubeGeometry(curve, (points.length - 1) * 3, radius, sides, false);
}

function finishes() {
  const cloth = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 18,
    specular: 0x302827,
  });
  cloth.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 fabricPoint;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nfabricPoint=position;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 fabricPoint;')
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        vec2 stitch=vec2(fabricPoint.x+.42*fabricPoint.z,fabricPoint.y)*175.;
        vec2 weight=1.-smoothstep(vec2(.75),vec2(2.7),fwidth(stitch));
        float thread=dot(sin(stitch*3.14159),weight)*.024;
        diffuseColor.rgb*=1.+thread;`,
      );
  };
  return {
    cloth,
    lacquer: new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 58, specular: 0x6d7c86 }),
    metal: new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 78, specular: 0x9baaba }),
  };
}

// Bake every rigid, multi-colour piece into one mesh per finish. A whole
// infantryman is a single vertex-coloured geometry suitable for instancing.
class Parts {
  constructor() {
    this.byFinish = new Map();
  }

  add(geometry, tint, position = zero, scale = [1, 1, 1], rotation = zero, finish = 'cloth') {
    const transform = new THREE.Matrix4().compose(
      new THREE.Vector3(...position),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
      new THREE.Vector3(...scale),
    );
    geometry.applyMatrix4(transform);
    geometry.deleteAttribute('uv');
    geometry.clearGroups();
    const length = geometry.attributes.position.count;
    if (geometry.index === null) geometry.setIndex(Array.from({ length }, (_, i) => i));
    const c = new THREE.Color(tint);
    const values = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      const j = i * 3;
      values[j] = c.r;
      values[j + 1] = c.g;
      values[j + 2] = c.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(values, 3));
    if (this.limb !== undefined) {
      geometry.setAttribute(
        'limb',
        new THREE.Float32BufferAttribute(new Float32Array(length).fill(this.limb), 1),
      );
    }
    if (!this.byFinish.has(finish)) this.byFinish.set(finish, []);
    this.byFinish.get(finish).push(geometry);
  }

  shape(rings, tint, options = {}) {
    const { sides = 16, power = 1, arc = null, at, scale, rotate, finish } = options;
    this.add(loft(rings, sides, power, arc), tint, at, scale, rotate, finish);
  }

  ell(tint, at, scale, rotate = zero, finish = 'cloth', sides = 14, stacks = 8) {
    this.add(orb(sides, stacks), tint, at, scale, rotate, finish);
  }

  box(tint, at, size, rotate = zero, finish = 'cloth') {
    this.add(new THREE.BoxGeometry(1, 1, 1), tint, at, size, rotate, finish);
  }

  joinGeometry() {
    const geometry = mergeGeometries([...this.byFinish.values()].flat(), false);
    geometry.computeBoundingSphere();
    geometry.computeBoundingBox();
    return geometry;
  }

  attach(parent, palette) {
    for (const [finish, parts] of this.byFinish) {
      const mesh = new THREE.Mesh(mergeGeometries(parts, false), palette[finish]);
      mesh.castShadow = true;
      parent.add(mesh);
    }
  }
}

function joint(parent, x = 0, y = 0, z = 0) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  parent.add(group);
  return group;
}

export function createTroopGeometry(side, detail = 'near') {
  const red = side === 'red',
    far = detail === 'far';
  const parts = new Parts();
  const dome = red ? 0xf2353a : 0x149fe8;
  const lip = red ? 0xb0212b : 0x155cac;
  const fabric = red ? 0xa54039 : 0xc5995e;
  const yDome = far ? 6 : 10;
  const headSides = far ? 5 : 8;
  for (const sign of [-1, 1]) {
    parts.limb = sign;
    const x = sign * 0.081;
    parts.shape(
      [
        [0.01, 0.058, 0.105, x, -0.031],
        [0.05, 0.068, 0.11, x, -0.032],
        [0.12, 0.05, 0.067, x],
      ],
      0x352d30,
      { sides: far ? 4 : 6, power: 0.72 },
    );
    parts.shape(
      [
        [0.075, 0.055, 0.058, x],
        [0.22, 0.068, 0.074, x * 0.91],
        [0.3, 0.073, 0.078, x * 0.83],
      ],
      red ? 0x664333 : 0x2c5980,
      { sides: far ? 4 : 6 },
    );
  }
  parts.limb = 0;
  parts.shape(
    [
      [0.235, 0.117, 0.081],
      [0.3, 0.151, 0.114],
      [0.42, 0.153, 0.101],
      [0.485, 0.118, 0.084],
    ],
    fabric,
    { sides: far ? 5 : 8, power: 0.89 },
  );
  if (!far) {
    parts.shape(
      [
        [0.274, 0.137, 0.11],
        [0.307, 0.151, 0.117],
      ],
      0x694634,
      { sides: 8 },
    );
    parts.box(0xa37545, [0, 0.365, 0.097], [0.093, 0.118, 0.045], [0.03, 0, 0.08]);
  }
  for (const sign of [-1, 1]) {
    parts.limb = sign * 2;
    const x = sign * 0.166;
    // Hands stay low in the silhouette and leave room for the broad helmet.
    parts.shape(
      [
        [0.26, 0.037, 0.044, x * 1.12, -0.031],
        [0.298, 0.055, 0.06, x * 1.07, -0.03],
        [0.386, 0.052, 0.057, x, 0.007],
        [0.444, 0.05, 0.058, x * 0.91],
      ],
      0xf0ab70,
      { sides: far ? 4 : 6 },
    );
    if (!far)
      parts.ell(fabric, [x * 0.88, 0.427, 0.008], [0.083, 0.078, 0.092], zero, 'cloth', 6, 3);
  }
  parts.limb = 0;
  parts.shape(
    [
      [0.43, 0.072, 0.073, 0, -0.012],
      [0.462, 0.127, 0.1, 0, -0.016],
      [0.548, 0.161, 0.14],
      [0.635, 0.162, 0.149],
    ],
    0xffc28c,
    { sides: headSides, power: 0.82 },
  );
  if (!far) {
    parts.ell(0xd79869, [-0.151, 0.546, 0.005], [0.033, 0.046, 0.041], zero, 'cloth', 5, 3);
    parts.ell(0xd79869, [0.151, 0.546, 0.005], [0.033, 0.046, 0.041], zero, 'cloth', 5, 3);
  }
  parts.shape(
    [
      [0.548, 0.177, 0.162, 0, 0.009],
      [0.585, 0.221, 0.198],
      [0.613, 0.215, 0.195],
    ],
    lip,
    { sides: yDome },
  );
  parts.shape(
    [
      [0.595, 0.224, 0.2],
      [0.644, 0.229, 0.211],
      [0.744, 0.204, 0.19],
      [0.818, 0.132, 0.124],
      [0.847, 0.054, 0.052],
    ],
    dome,
    { sides: yDome },
  );
  if (!far) {
    parts.shape(
      [
        [0.589, 0.221, 0.201],
        [0.605, 0.226, 0.205],
      ],
      red ? 0xf65d4e : 0x6dc7f5,
      { sides: 10 },
    );
    // Geometry carries the insignia, pack and straps through side views and a fall.
    // Their outlines are wider than the finer weave in the uniform texture.
    parts.limb = 0;
    if (red) {
      for (const y of [0.66, 0.698])
        parts.box(0xffdd91, [0, y, -0.203], [0.09, 0.019, 0.017], [-0.23, 0, 0]);
      parts.add(beam([-0.093, 0.449, -0.096], [0.107, 0.291, -0.111], 0.017, 0.018, 5), 0x59382a);
      parts.box(0xe3b76b, [0.027, 0.356, -0.127], [0.041, 0.031, 0.014], [0, 0, -0.57]);
      for (const side of [-1, 1]) {
        parts.box(
          0x714233,
          [side * 0.093, 0.302, -0.098],
          [0.067, 0.065, 0.04],
          [0, -side * 0.23, 0],
        );
        parts.box(0xc0965a, [side * 0.093, 0.318, -0.121], [0.055, 0.018, 0.012]);
        parts.box(
          0xd8a561,
          [side * 0.11, 0.448, -0.031],
          [0.054, 0.019, 0.097],
          [0, 0, -side * 0.28],
        );
      }
    } else {
      parts.box(0x38515d, [0, 0.351, 0.116], [0.194, 0.177, 0.086]);
      parts.box(0x4c727e, [0, 0.356, 0.163], [0.159, 0.118, 0.02]);
      parts.add(beam([-0.109, 0.447, 0.13], [0.109, 0.447, 0.13], 0.039, 0.039, 8), 0xdab87b);
      for (const side of [-1, 1]) {
        parts.box(0x6b4934, [side * 0.053, 0.372, 0.179], [0.023, 0.171, 0.018]);
        parts.box(0xe0b97d, [side * 0.053, 0.335, 0.189], [0.036, 0.025, 0.014]);
      }
      parts.add(
        stroke(
          [
            [0, 0.65, 0.205],
            [0, 0.739, 0.189],
            [0, 0.808, 0.127],
            [0, 0.845, 0.05],
            [0, 0.852, -0.027],
          ],
          0.014,
          6,
        ),
        0x91dafa,
      );
    }
    if (!red) {
      parts.limb = 2;
      parts.add(beam([0.163, 0.264, 0.032], [0.173, 0.525, -0.19], 0.026, 0.026, 5), colors.gun);
      parts.add(beam([0.173, 0.51, -0.18], [0.173, 0.656, -0.268], 0.013, 0.013, 5), 0x2d4452);
    }
  }
  if (red) {
    // Keep the front of the existing red helmet and face readable from the overhead camera.
    parts.ell(lip, [0, 0.583, -0.12], [0.18, 0.019, 0.133], [-0.14, 0, 0], 'cloth', 8, 3);
    parts.ell(0xefaa70, [0, 0.514, -0.139], [0.042, 0.042, 0.061], zero, 'cloth', 5, 3);
    if (far) parts.box(0xffc783, [0, 0.68, -0.196], [0.09, 0.027, 0.013], [-0.28, 0, 0]);
    for (const sign of [-1, 1]) {
      parts.ell(
        0x422d2c,
        [sign * 0.061, 0.536, -0.14],
        [0.026, 0.022, 0.015],
        [0, -sign * 0.28, -sign * 0.12],
        'cloth',
        5,
        3,
      );
    }
  }
  const geometry = parts.joinGeometry();
  geometry.scale(1.055, 1.016, 1);
  if (red) geometry.rotateY(Math.PI);
  geometry.computeBoundingBox();
  return geometry;
}

export function fieldEquipment(role) {
  const p = new Parts();
  if (role === 'guard') {
    p.box(0x526476, [0.12, 0.32, 0.155], [0.25, 0.34, 0.065], [-0.12, 0, -0.045]);
    p.box(0xb6c5bf, [0.12, 0.36, 0.194], [0.2, 0.038, 0.014]);
  } else if (role === 'gunner') {
    p.add(beam([0.14, 0.33, 0.07], [0.13, 0.37, 0.39], 0.04, 0.03, 6), 0x354251);
    p.add(beam([0.13, 0.37, 0.38], [0.13, 0.38, 0.47], 0.038, 0.038, 6), 0x7c8085);
  } else if (role === 'standard') {
    p.add(beam([-0.18, 0.19, -0.05], [-0.18, 1.09, -0.05], 0.025, 0.02, 6), 0x746047);
    p.box(0xeab75e, [-0.18, 1.08, -0.04], [0.078, 0.06, 0.078]);
    p.box(0xa62b39, [-0.01, 0.93, -0.05], [0.33, 0.22, 0.043], [-0.08, 0, -0.09]);
    p.box(0xffdb82, [-0.035, 0.92, -0.02], [0.18, 0.043, 0.02]);
  } else if (role === 'courier') {
    p.box(0xd1b783, [0.18, 0.34, 0.1], [0.26, 0.22, 0.14], [0, 0, -0.16]);
    p.box(0xfff1d3, [0.18, 0.34, 0.177], [0.17, 0.145, 0.018]);
    p.box(0xb74645, [0.18, 0.34, 0.196], [0.035, 0.12, 0.01]);
    p.box(0xb74645, [0.18, 0.34, 0.196], [0.12, 0.035, 0.01]);
  } else if (role === 'vault') {
    p.add(beam([0.22, 0.07, 0.46], [0.16, 1.19, -0.53], 0.027, 0.017, 8), 0xffcc75);
    p.add(beam([0.2, 0.32, 0.24], [0.195, 0.47, 0.11], 0.033, 0.033, 8), 0x43525e);
  } else {
    p.box(0x65453a, [0, 0.38, 0.12], [0.23, 0.15, 0.082]);
    for (const x of [-0.068, 0, 0.068])
      p.add(beam([x, 0.32, 0.163], [x, 0.45, 0.17], 0.029, 0.029, 6), 0xdf4b32);
  }
  return p.joinGeometry();
}

function captainLeg(parent, sign, palette) {
  const hip = joint(parent, sign * 0.117, 0.607, 0);
  const leg = new Parts();
  leg.shape(
    [
      [-0.385, 0.063, 0.064, sign * 0.013, 0.016],
      [-0.29, 0.086, 0.082, sign * 0.012, 0.012],
      [-0.165, 0.103, 0.103, sign * 0.007, -0.005],
      [-0.032, 0.111, 0.114],
      [0.036, 0.079, 0.086],
    ],
    0x37638a,
    { sides: 12 },
  );
  leg.shape(
    [
      [-0.59, 0.078, 0.142, sign * 0.013, -0.045],
      [-0.553, 0.091, 0.153, sign * 0.012, -0.044],
      [-0.493, 0.092, 0.141, sign * 0.012, -0.036],
      [-0.448, 0.079, 0.082, sign * 0.012, 0.012],
      [-0.299, 0.08, 0.077, sign * 0.012, 0.018],
    ],
    0x554031,
    { sides: 12, power: 0.74 },
  );
  leg.shape(
    [
      [-0.606, 0.081, 0.143, sign * 0.013, -0.045],
      [-0.586, 0.092, 0.151, sign * 0.013, -0.046],
      [-0.565, 0.092, 0.151, sign * 0.013, -0.045],
    ],
    0x352f32,
    { sides: 12, power: 0.7 },
  );
  leg.shape(
    [
      [-0.327, 0.081, 0.079, sign * 0.012, 0.015],
      [-0.291, 0.086, 0.084, sign * 0.012, 0.014],
    ],
    0x8b6244,
    { sides: 12 },
  );
  leg.attach(hip, palette);
  return hip;
}

export function createCaptain() {
  const root = new THREE.Group();
  const palette = finishes();
  const body = joint(root);
  const leftLeg = captainLeg(body, -1, palette),
    rightLeg = captainLeg(body, 1, palette);
  const torso = joint(body, 0, 0.62);
  const top = new Parts();
  top.shape(
    [
      [-0.075, 0.183, 0.122],
      [0.005, 0.217, 0.15],
      [0.102, 0.221, 0.156],
      [0.264, 0.274, 0.19],
      [0.367, 0.285, 0.177],
      [0.416, 0.191, 0.131],
    ],
    colors.khaki,
    { power: 0.8 },
  );
  top.shape(
    [
      [-0.046, 0.216, 0.146],
      [-0.008, 0.226, 0.155],
      [0.045, 0.227, 0.158],
    ],
    colors.leather,
    { sides: 16, power: 0.8 },
  );
  // A rolled collar, stitched load-bearing straps and a compact belt pack face the camera.
  top.shape(
    [
      [0.358, 0.185, 0.128],
      [0.392, 0.187, 0.136],
      [0.431, 0.165, 0.12],
    ],
    0xf3cc8e,
    { sides: 14 },
  );
  top.shape(
    [
      [0.375, 0.102, 0.106],
      [0.502, 0.106, 0.099],
    ],
    colors.skinShade,
  );
  const shoulders = [];
  for (const sign of [-1, 1]) {
    const x = sign * 0.158;
    top.add(
      stroke(
        [
          [x * 0.8, 0.005, 0.155],
          [x * 0.85, 0.135, 0.179],
          [x, 0.29, 0.168],
          [x, 0.37, 0.126],
          [x * 0.85, 0.405, 0.014],
          [x * 0.81, 0.36, -0.111],
        ],
        0.027,
      ),
      0x795036,
    );
    top.box(
      0xb99c66,
      [x * 0.89, 0.22, 0.192],
      [0.064, 0.035, 0.015],
      [0, 0, sign * 0.065],
      'metal',
    );
    const shoulder = joint(torso, x * 1.47, 0.34, 0);
    const sleeve = joint(shoulder, -x * 1.47, -0.34, 0);
    shoulders.push(shoulder);
    const arm = new Parts();
    arm.shape(
      [
        [0.144, 0.078, 0.084, x * 1.62, 0.042],
        [0.207, 0.102, 0.109, x * 1.66, 0.022],
        [0.307, 0.107, 0.112, x * 1.6],
        [0.342, 0.07, 0.073, x * 1.47],
      ],
      0xc99556,
      { sides: 12 },
    );
    arm.add(
      beam([x * 1.74, 0.18, 0.038], [x * 1.88, 0.074, -0.092], 0.066, 0.059, 10),
      colors.skin,
    );
    arm.ell(0x8a6243, [x * 1.88, 0.078, -0.105], [0.07, 0.068, 0.076], [0.22, 0, 0]);
    arm.attach(sleeve, palette);
  }
  for (const sign of [-1, 1]) {
    top.box(0xc69a60, [sign * 0.124, 0.22, -0.157], [0.126, 0.101, 0.03], [0.08, sign * 0.16, 0]);
    top.box(0xe6bf7c, [sign * 0.124, 0.249, -0.174], [0.13, 0.037, 0.016], [0.1, sign * 0.16, 0]);
  }
  top.box(0xcaa66a, [0, -0.011, -0.153], [0.1, 0.061, 0.021], zero, 'metal');
  top.box(0x986439, [0, 0.077, 0.144], [0.17, 0.112, 0.074], [0.08, 0, 0]);
  top.box(0xbb844f, [0, 0.101, 0.184], [0.172, 0.062, 0.02], [0.12, 0, 0]);
  top.add(
    stroke(
      [
        [-0.165, 0.034, 0.158],
        [-0.002, 0.169, 0.207],
        [0.153, 0.292, 0.17],
      ],
      0.033,
    ),
    0x906740,
  );
  top.attach(torso, palette);

  const head = joint(torso, -0.027, 0.461, -0.015);
  const face = new Parts();
  face.shape(
    [
      [0, 0.093, 0.078],
      [0.024, 0.142, 0.126, 0, -0.012],
      [0.078, 0.189, 0.162, 0, -0.016],
      [0.204, 0.211, 0.181, 0, -0.004],
      [0.278, 0.203, 0.176],
      [0.327, 0.142, 0.137],
    ],
    colors.skin,
    { sides: 18, power: 0.83 },
  );
  for (const sign of [-1, 1]) {
    face.ell(0xe1a675, [sign * 0.201, 0.145, 0.001], [0.037, 0.072, 0.053]);
    face.add(
      stroke(
        [
          [sign * 0.199, 0.245, 0.062],
          [sign * 0.192, 0.112, 0.045],
          [sign * 0.148, 0.014, -0.001],
          [sign * 0.068, -0.005, -0.052],
        ],
        0.019,
      ),
      0x785340,
    );
  }
  face.shape(
    [
      [0.192, 0.18, 0.168, 0, 0.009],
      [0.219, 0.223, 0.202],
      [0.264, 0.224, 0.202],
    ],
    0x6e513b,
    { sides: 20, arc: [-0.69 * Math.PI, 0.69 * Math.PI] },
  );
  face.ell(0xd59261, [0, 0.132, -0.167], [0.052, 0.049, 0.05]);
  for (const sign of [-1, 1]) {
    face.ell(
      0x54382d,
      [sign * 0.08, 0.168, -0.155],
      [0.042, 0.013, 0.016],
      [0, -sign * 0.31, -sign * 0.09],
    );
    face.ell(
      0x3b3c3a,
      [sign * 0.076, 0.15, -0.164],
      [0.018, 0.021, 0.014],
      [0, -sign * 0.28, 0],
      'lacquer',
      9,
      5,
    );
  }
  face.add(
    stroke(
      [
        [-0.054, 0.079, -0.157],
        [0, 0.07, -0.169],
        [0.053, 0.078, -0.155],
      ],
      0.009,
    ),
    0xb57653,
  );
  face.shape(
    [
      [0.207, 0.224, 0.212, 0, 0.015],
      [0.243, 0.273, 0.242, 0, 0.011],
      [0.279, 0.285, 0.253],
      [0.302, 0.279, 0.248],
    ],
    colors.blueShade,
    { sides: 24, finish: 'lacquer' },
  );
  face.shape(
    [
      [0.255, 0.275, 0.251],
      [0.272, 0.286, 0.258],
      [0.288, 0.282, 0.253],
    ],
    0x68caff,
    { sides: 24, finish: 'lacquer' },
  );
  face.shape(
    [
      [0.281, 0.278, 0.25],
      [0.331, 0.288, 0.257],
      [0.413, 0.275, 0.249],
      [0.498, 0.23, 0.222],
      [0.574, 0.144, 0.155],
      [0.609, 0.055, 0.068],
      [0.614, 0.014, 0.022],
    ],
    colors.blue,
    { sides: 28, finish: 'lacquer' },
  );
  face.shape(
    [
      [0.296, 0.281, 0.252],
      [0.312, 0.289, 0.259],
      [0.325, 0.292, 0.261],
    ],
    0xb8dae0,
    { sides: 30, finish: 'metal' },
  );
  for (const side of [-1, 1])
    face.ell(0xe1bc78, [side * 0.255, 0.325, 0.114], [0.013, 0.016, 0.014], zero, 'metal', 8, 5);
  face.attach(head, palette);

  const cannon = joint(torso, 0.295, 0.691, -0.03);
  const weapon = new Parts();
  // The sleeve diameters vary to distinguish the chamber, muzzle and rear vent from above.
  function barrel(tint, radiusA, radiusB, zA, zB, finish = 'metal', n = 18) {
    weapon.add(
      beam([0, 0, zA], [0, 0, zB], radiusA, radiusB, n),
      tint,
      zero,
      [1, 1, 1],
      zero,
      finish,
    );
  }
  barrel(0x263b4d, 0.106, 0.11, -0.48, 0.367);
  barrel(0x364b5e, 0.13, 0.12, -0.5, -0.375);
  barrel(0x69b7de, 0.142, 0.142, -0.495, -0.471);
  barrel(0x203344, 0.142, 0.142, -0.549, -0.498);
  barrel(0x718e9e, 0.147, 0.147, -0.558, -0.541);
  barrel(0x131b2b, 0.105, 0.105, -0.561, -0.56);
  barrel(0x283849, 0.144, 0.134, -0.275, -0.12);
  barrel(0x548aab, 0.141, 0.135, -0.254, -0.205);
  barrel(0x326e9b, 0.125, 0.129, -0.044, 0.161);
  for (const z of [-0.292, -0.119, 0.148, 0.203, 0.249, 0.294]) {
    barrel(z < 0.15 ? 0x829bad : 0x5c7186, 0.139, 0.139, z, z + 0.021);
  }
  barrel(0x263546, 0.146, 0.137, 0.178, 0.346);
  barrel(0x98adbc, 0.154, 0.153, 0.322, 0.36);
  barrel(0x263444, 0.127, 0.123, 0.359, 0.373);
  barrel(0x142231, 0.087, 0.086, 0.374, 0.375);
  weapon.box(0x395166, [0, 0.095, -0.1], [0.093, 0.09, 0.202], zero, 'metal');
  weapon.box(0x76cbec, [0, 0.147, -0.12], [0.103, 0.023, 0.105], zero, 'metal');
  weapon.box(0x31465a, [0.098, 0.066, 0.061], [0.052, 0.047, 0.189], zero, 'metal');
  weapon.ell(0x84c6e7, [0.123, 0.065, 0.02], [0.012, 0.022, 0.036], zero, 'lacquer');
  weapon.attach(cannon, palette);
  const muzzle = joint(cannon, 0, 0, -0.57);
  function animate({ time = 0, run = 0, recoil = 0, merge = 0, lean = 0 } = {}) {
    const beat = time * 10.9;
    leftLeg.rotation.x = Math.sin(beat) * 0.53 * run;
    rightLeg.rotation.x = -Math.sin(beat) * 0.53 * run;
    const swing = Math.sin(beat) * run;
    shoulders[0].rotation.x = -swing * 0.46;
    shoulders[1].rotation.x = swing * 0.15 + recoil * 0.12;
    torso.rotation.y = swing * 0.055;
    body.position.y = (1 - Math.cos(beat * 2)) * 0.019 * run;
    torso.rotation.z = -lean * 0.13 + Math.sin(beat) * 0.021 * run;
    torso.rotation.x = -0.058 * run + recoil * 0.085;
    head.rotation.z = lean * 0.026;
    cannon.position.z = -0.03 + recoil * 0.155;
    cannon.rotation.x = recoil * 0.14;
    palette.cloth.emissive.setRGB(merge * 0.43, merge * 0.21, merge * 0.05);
    palette.lacquer.emissive.setRGB(merge * 0.37, merge * 0.31, merge * 0.11);
    palette.metal.emissive.setRGB(merge * 0.29, merge * 0.22, merge * 0.07);
  }
  return { root, animate, muzzle };
}
