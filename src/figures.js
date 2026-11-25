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

function panel(points) {
  const center = new THREE.Vector3();
  for (const p of points) center.add(new THREE.Vector3(...p));
  center.divideScalar(points.length);
  const positions = [...center.toArray(), ...points.flat()];
  const indices = [];
  const ccw =
    points.reduce((sum, p, i) => {
      const q = points[(i + 1) % points.length];
      return sum + p[0] * q[1] - p[1] * q[0];
    }, 0) > 0;
  for (let i = 0; i < points.length; i++) {
    const a = i + 1,
      b = ((i + 1) % points.length) + 1;
    indices.push(0, ccw ? a : b, ccw ? b : a);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function finishes() {
  return {
    cloth: new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 21, specular: 0x302827 }),
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
  const fabric = red ? 0xbb754b : 0xd5b177;
  const yDome = far ? 6 : 10;
  const headSides = far ? 5 : 8;
  for (const sign of [-1, 1]) {
    const x = sign * 0.081;
    parts.shape(
      [
        [0.01, 0.058, 0.09, x, -0.022],
        [0.05, 0.068, 0.103, x, -0.025],
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
    if (!red) {
      parts.add(beam([0.163, 0.264, 0.032], [0.173, 0.525, -0.19], 0.026, 0.026, 5), colors.gun);
      parts.add(beam([0.173, 0.51, -0.18], [0.173, 0.656, -0.268], 0.013, 0.013, 5), 0x2d4452);
    } else {
      parts.ell(0xdb945b, [0, 0.536, -0.135], [0.043, 0.038, 0.046], zero, 'cloth', 5, 3);
    }
  }
  if (red && !far) {
    for (const sign of [-1, 1]) {
      parts.ell(
        0x533428,
        [sign * 0.064, 0.54, -0.137],
        [0.029, 0.012, 0.011],
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
    top.shape(
      [
        [0.144, 0.078, 0.084, x * 1.62, 0.042],
        [0.207, 0.102, 0.109, x * 1.66, 0.022],
        [0.307, 0.107, 0.112, x * 1.6],
        [0.342, 0.07, 0.073, x * 1.47],
      ],
      0xc99556,
      { sides: 12 },
    );
    top.add(
      beam([x * 1.74, 0.18, 0.038], [x * 1.88, 0.074, -0.092], 0.066, 0.059, 10),
      colors.skin,
    );
    top.ell(0x8a6243, [x * 1.88, 0.078, -0.105], [0.07, 0.068, 0.076], [0.22, 0, 0]);
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
    body.position.y = Math.abs(Math.sin(beat)) * 0.035 * run;
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

function bossLeg(parent, sign, palette) {
  const hip = joint(parent, sign * 0.43, 1.68, -0.015);
  const leg = new Parts();
  leg.shape(
    [
      [-1.25, 0.174, 0.178, sign * 0.045, -0.045],
      [-0.942, 0.204, 0.209, sign * 0.048, 0.014],
      [-0.791, 0.233, 0.242, sign * 0.04, 0.064],
      [-0.594, 0.252, 0.269, sign * 0.028, 0.048],
      [-0.285, 0.29, 0.323, sign * 0.007, 0.015],
      [-0.07, 0.315, 0.347],
      [0.125, 0.259, 0.29],
    ],
    0x373341,
    { sides: 16, power: 0.89 },
  );
  leg.shape(
    [
      [-1.638, 0.214, 0.317, sign * 0.048, 0.095],
      [-1.545, 0.228, 0.328, sign * 0.048, 0.115],
      [-1.44, 0.224, 0.31, sign * 0.048, 0.103],
      [-1.325, 0.191, 0.225, sign * 0.047, 0.035],
      [-1.087, 0.21, 0.199, sign * 0.044, -0.009],
      [-0.956, 0.203, 0.192, sign * 0.043, 0.007],
    ],
    0x682f31,
    { sides: 16, power: 0.76, finish: 'lacquer' },
  );
  leg.shape(
    [
      [-1.677, 0.214, 0.32, sign * 0.048, 0.102],
      [-1.64, 0.232, 0.337, sign * 0.048, 0.105],
      [-1.579, 0.231, 0.331, sign * 0.048, 0.109],
    ],
    0x382d36,
    { sides: 16, power: 0.67 },
  );
  leg.shape(
    [
      [-1.072, 0.21, 0.201, sign * 0.045, -0.001],
      [-0.979, 0.221, 0.21, sign * 0.045, 0.007],
      [-0.931, 0.208, 0.203, sign * 0.044, 0.009],
    ],
    0x873e3b,
    { sides: 16, power: 0.84 },
  );
  leg.add(
    stroke(
      [
        [sign * 0.208, -1.044, 0.035],
        [sign * 0.214, -1.234, 0.049],
        [sign * 0.221, -1.365, 0.088],
      ],
      0.012,
    ),
    0xb36350,
  );
  leg.attach(hip, palette);
  return hip;
}

function bossArm(parent, sign, palette) {
  const shoulder = joint(parent, sign * 1.105, 1.01, 0.006);
  const upper = new Parts();
  upper.shape(
    [
      [-0.946, 0.183, 0.212, sign * 0.247, 0.066],
      [-0.832, 0.245, 0.272, sign * 0.24, 0.068],
      [-0.69, 0.312, 0.324, sign * 0.227, 0.084],
      [-0.565, 0.35, 0.358, sign * 0.208, 0.104],
      [-0.464, 0.349, 0.348, sign * 0.183, 0.09],
      [-0.364, 0.304, 0.297, sign * 0.155, 0.055],
      [-0.21, 0.275, 0.265, sign * 0.112, 0.023],
      [0.015, 0.261, 0.243, sign * 0.044, -0.004],
      [0.127, 0.216, 0.205, -sign * 0.021, -0.014],
    ],
    0xf1a36d,
    { sides: 20, power: 0.91 },
  );
  upper.shape(
    [
      [-0.385, 0.331, 0.334, sign * 0.164, 0.018],
      [-0.32, 0.384, 0.365, sign * 0.139, 0.008],
      [-0.155, 0.407, 0.387, sign * 0.104, -0.012],
      [0.037, 0.387, 0.372, sign * 0.048, -0.017],
      [0.171, 0.311, 0.32, sign * 0.009, -0.022],
      [0.204, 0.206, 0.213, -sign * 0.01, -0.025],
    ],
    0xcd2631,
    { sides: 18, power: 0.87, finish: 'lacquer' },
  );
  upper.shape(
    [
      [-0.395, 0.335, 0.339, sign * 0.162, 0.02],
      [-0.361, 0.362, 0.351, sign * 0.152, 0.015],
      [-0.332, 0.374, 0.359, sign * 0.141, 0.011],
    ],
    0x932034,
    { sides: 18, finish: 'lacquer' },
  );
  upper.ell(
    0xe65347,
    [sign * 0.211, 0.096, 0.238],
    [0.101, 0.037, 0.063],
    [0, 0, -sign * 0.2],
    'lacquer',
    10,
    6,
  );
  upper.attach(shoulder, palette);

  const elbow = joint(shoulder, sign * 0.242, -0.841, 0.063);
  const lower = new Parts();
  lower.shape(
    [
      [-0.638, 0.167, 0.19, sign * 0.089, 0.089],
      [-0.5, 0.219, 0.237, sign * 0.094, 0.058],
      [-0.359, 0.27, 0.268, sign * 0.088, 0.034],
      [-0.184, 0.292, 0.283, sign * 0.063, 0.006],
      [-0.045, 0.251, 0.249, sign * 0.025],
      [0.084, 0.177, 0.194],
    ],
    0xf0a371,
    { sides: 16, power: 0.9 },
  );
  lower.shape(
    [
      [-0.672, 0.25, 0.256, sign * 0.103, 0.102],
      [-0.624, 0.275, 0.271, sign * 0.1, 0.092],
      [-0.516, 0.256, 0.251, sign * 0.096, 0.07],
      [-0.448, 0.224, 0.227, sign * 0.095, 0.062],
    ],
    0x9c1f2d,
    { sides: 16, power: 0.75, finish: 'lacquer' },
  );
  lower.shape(
    [
      [-1.063, 0.216, 0.244, sign * 0.109, 0.176],
      [-1.021, 0.295, 0.307, sign * 0.123, 0.164],
      [-0.925, 0.336, 0.337, sign * 0.129, 0.154],
      [-0.766, 0.337, 0.322, sign * 0.124, 0.132],
      [-0.65, 0.272, 0.262, sign * 0.109, 0.115],
      [-0.592, 0.2, 0.2, sign * 0.104, 0.102],
    ],
    0xdc3031,
    { sides: 18, power: 0.63, finish: 'lacquer' },
  );
  // Separate thumb and four knuckle pads preserve the clenched fist when raised.
  lower.ell(
    0xd12a2e,
    [-sign * 0.105, -0.822, 0.265],
    [0.147, 0.208, 0.17],
    [-0.17, 0, sign * 0.4],
    'lacquer',
  );
  for (let i = 0; i < 4; i++) {
    const off = (i - 1.5) * 0.131;
    lower.ell(
      i % 2 ? 0xe4433e : 0xdf3837,
      [sign * 0.115 + off, -0.919, 0.423 - Math.abs(off) * 0.17],
      [0.069, 0.106, 0.08],
      [-0.15, 0, 0],
      'lacquer',
      10,
      6,
    );
  }
  lower.add(
    stroke(
      [
        [sign * 0.272, -0.665, 0.286],
        [sign * 0.324, -0.776, 0.353],
        [sign * 0.321, -0.893, 0.377],
      ],
      0.011,
    ),
    0xff6c4b,
  );
  lower.attach(elbow, palette);
  return { shoulder, elbow };
}

function jacket(p) {
  // A true open jacket shell wraps around the white tank. The front edges
  // travel over the chest, leaving a deep continuous opening down the middle.
  const outer = [
    [-0.223, 0.748, 0.473, 0, -0.017],
    [-0.139, 0.836, 0.523, 0, -0.022],
    [0.105, 0.91, 0.563, 0, -0.022],
    [0.403, 1.011, 0.614, 0, -0.017],
    [0.702, 1.164, 0.636, 0, -0.031],
    [0.909, 1.238, 0.601, 0, -0.054],
    [1.079, 1.122, 0.505, 0, -0.067],
    [1.207, 0.788, 0.365, 0, -0.078],
    [1.24, 0.489, 0.302, 0, -0.092],
  ];
  const start = [0.425, 0.432, 0.429, 0.433, 0.455, 0.563, 0.617, 0.628, 0.52];
  const cols = 36,
    verts = [],
    indices = [];
  for (let row = 0; row < outer.length; row++) {
    const [y, rx, rz, cx, cz] = outer[row],
      cut = start[row];
    for (let j = 0; j <= cols; j++) {
      const angle = cut + ((TAU - 2 * cut) * j) / cols;
      verts.push(cx + rx * Math.sin(angle), y, cz + rz * Math.cos(angle));
    }
  }
  for (let row = 0; row < outer.length - 1; row++) {
    for (let j = 0; j < cols; j++) {
      const a = row * (cols + 1) + j,
        b = a + 1,
        c = b + cols + 1,
        d = a + cols + 1;
      indices.push(a, b, d, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  p.add(geometry, 0xd92532, zero, [1, 1, 1], zero, 'lacquer');
  for (const sign of [-1, 1]) {
    const edge = outer.map(([y, rx, rz, , cz], i) => [
      sign * rx * Math.sin(start[i]),
      y,
      cz + rz * Math.cos(start[i]),
    ]);
    p.add(stroke(edge, 0.044, 8), 0x8e1928);
    p.add(
      stroke(
        edge.map(([x, y, z]) => [x - sign * 0.013, y, z + 0.03]),
        0.01,
        5,
      ),
      0xf98b68,
    );
    p.add(
      stroke(
        [
          [sign * 0.71, -0.158, 0.279],
          [sign * 0.85, 0.14, 0.292],
          [sign * 0.92, 0.39, 0.326],
          [sign * 1.02, 0.66, 0.293],
        ],
        0.014,
      ),
      0xb41c30,
    );
    // Wide pointed lapels are slightly raised above the rounded chest.
    const lapel = [
      [sign * 0.397, 0.401, 0.564],
      [sign * 0.723, 0.711, 0.515],
      [sign * 0.832, 0.826, 0.428],
      [sign * 0.687, 0.916, 0.474],
      [sign * 0.826, 1.048, 0.352],
      [sign * 0.53, 1.207, 0.289],
      [sign * 0.394, 1.211, 0.234],
      [sign * 0.459, 0.972, 0.51],
    ];
    p.add(panel(lapel), 0xe74340, zero, [1, 1, 1], zero, 'lacquer');
    p.add(stroke([lapel[0], lapel[1], lapel[2]], 0.012), 0xef5a4b);
    p.ell(0xe9b15d, [sign * 0.675, 0.812, 0.526], [0.038, 0.039, 0.017], zero, 'metal', 9, 6);
    p.add(
      stroke(
        [
          [sign * 0.627, 0.319, 0.464],
          [sign * 0.798, 0.398, 0.407],
          [sign * 0.893, 0.436, 0.353],
        ],
        0.027,
      ),
      0x982430,
    );
    p.ell(0xd8a455, [sign * 0.77, 0.389, 0.431], [0.025, 0.029, 0.018], zero, 'metal', 8, 5);
  }
}

function bossHead(neck, palette, variant) {
  const p = new Parts();
  p.shape(
    [
      [-0.08, 0.226, 0.218, 0, -0.005],
      [0.026, 0.28, 0.245, 0, 0.008],
      [0.102, 0.315, 0.262, 0, 0.035],
      [0.228, 0.365, 0.304, 0, 0.036],
      [0.402, 0.385, 0.34, 0, 0.003],
      [0.557, 0.401, 0.341, 0, -0.032],
      [0.694, 0.359, 0.308, 0, -0.044],
      [0.766, 0.267, 0.267, 0, -0.041],
    ],
    0xf3ad73,
    { sides: 24, power: 0.77 },
  );
  p.shape(
    [
      [-0.023, 0.234, 0.206, 0, 0.03],
      [0.03, 0.277, 0.226, 0, 0.062],
      [0.121, 0.291, 0.193, 0, 0.076],
    ],
    0xe99a63,
    { sides: 18, power: 0.82 },
  );
  for (const s of [-1, 1]) {
    p.ell(0xed9f69, [s * 0.378, 0.366, -0.013], [0.077, 0.124, 0.078], [0, 0.13 * s, -0.07 * s]);
    p.ell(0xd9805c, [s * 0.411, 0.365, 0.037], [0.036, 0.07, 0.03]);
    p.ell(0xf5ae74, [s * 0.224, 0.335, 0.265], [0.14, 0.092, 0.07], [0.02, 0.2 * s, -s * 0.23]);
    // Cream sclera, visible iris, lid and a low brow make the head readable
    // at a distance even with the upward-looking camera angle on the bridge.
    p.ell(0x773e2e, [s * 0.16, 0.461, 0.312], [0.118, 0.065, 0.048], [0, s * 0.13, s * 0.16]);
    p.ell(0xffecd5, [s * 0.156, 0.472, 0.342], [0.092, 0.047, 0.033], [0, s * 0.13, s * 0.14]);
    p.ell(
      0x253642,
      [s * 0.128, 0.473, 0.367],
      [0.037, 0.039, 0.018],
      [0, s * 0.12, 0],
      'lacquer',
      12,
      7,
    );
    p.ell(0xfbffff, [s * 0.128 - 0.009, 0.487, 0.383], [0.01, 0.012, 0.004], zero, 'lacquer', 8, 5);
    p.ell(0xb36324, [s * 0.16, 0.548, 0.335], [0.159, 0.052, 0.065], [0, s * 0.16, s * 0.32]);
    p.ell(0xf5a831, [s * 0.168, 0.564, 0.347], [0.143, 0.048, 0.055], [0, s * 0.16, s * 0.3]);
    p.shape(
      [
        [0.202, 0.026, 0.025, s * 0.339, 0.057],
        [0.313, 0.045, 0.054, s * 0.35, 0.053],
        [0.489, 0.061, 0.075, s * 0.337, 0.052],
        [0.588, 0.043, 0.057, s * 0.321, 0.057],
      ],
      0xc87829,
      { sides: 10 },
    );
  }
  p.ell(0xeaa16b, [0, 0.43, 0.341], [0.067, 0.135, 0.067], [-0.103, 0, 0]);
  p.ell(0xffb27b, [0, 0.362, 0.379], [0.098, 0.079, 0.089]);
  p.shape(
    [
      [0.037, 0.102, 0.059, 0, 0.239],
      [0.08, 0.163, 0.095, 0, 0.236],
      [0.152, 0.197, 0.096, 0, 0.226],
      [0.211, 0.205, 0.092, 0, 0.218],
    ],
    0xc47726,
    { sides: 16, power: 0.81 },
  );
  p.shape(
    [
      [-0.047, 0.063, 0.063, 0, 0.239],
      [0.0, 0.128, 0.091, 0, 0.257],
      [0.083, 0.177, 0.117, 0, 0.251],
      [0.154, 0.187, 0.116, 0, 0.248],
      [0.186, 0.157, 0.085, 0, 0.253],
    ],
    0xf1a02e,
    { sides: 19, power: 0.83, finish: 'lacquer' },
  );
  p.add(
    stroke(
      [
        [-0.122, 0.246, 0.321],
        [-0.056, 0.255, 0.351],
        [0.008, 0.258, 0.352],
        [0.084, 0.245, 0.34],
        [0.123, 0.239, 0.322],
      ],
      0.015,
    ),
    0x773e2d,
  );
  for (const s of [-1, 1]) {
    p.ell(0xe3942b, [s * 0.09, 0.282, 0.327], [0.097, 0.032, 0.036], [0, s * 0.1, -s * 0.21]);
  }
  if (variant === 0) {
  // The swept quiff consists of interlocking, bent locks with broad roots,
  // bright ridges and tapered tips. It follows the skull at the sides.
  p.shape(
    [
      [0.544, 0.355, 0.286, 0, -0.068],
      [0.674, 0.378, 0.309, 0, -0.065],
      [0.785, 0.349, 0.311, 0.002, -0.066],
      [0.84, 0.258, 0.263, 0.014, -0.091],
    ],
    0xd88b33,
    { sides: 24, power: 0.83, arc: [0.92, TAU - 0.92] },
  );
  const pompadour = [
    [0.685, 0.309, 0.263, 0, -0.014],
    [0.754, 0.362, 0.309, 0.01, -0.018],
    [0.836, 0.376, 0.301, 0.021, -0.014],
    [0.96, 0.339, 0.264, 0.045, -0.045],
    [1.095, 0.248, 0.201, 0.081, -0.104],
    [1.201, 0.132, 0.111, 0.104, -0.169],
    [1.294, 0.022, 0.029, 0.129, -0.231],
  ];
  p.shape(pompadour, 0xe2992a, { sides: 26, power: 0.8 });
  const locks = [
    [-0.275, 0.132, 0.71, 0.403, -0.038, -0.228, 0.083, 0xf9ae31],
    [-0.204, 0.205, 0.702, 0.561, 0.015, -0.364, 0.1, 0xfab542],
    [-0.088, 0.235, 0.694, 0.573, 0.118, -0.411, 0.106, 0xee9e28],
    [0.031, 0.242, 0.687, 0.725, 0.095, -0.514, 0.105, 0xffbf3e],
    [0.147, 0.213, 0.697, 0.564, 0.097, -0.419, 0.092, 0xf1a32b],
    [0.244, 0.148, 0.705, 0.657, 0.094, -0.434, 0.082, 0xffb739],
    [0.297, 0.074, 0.705, 0.445, 0.092, -0.318, 0.076, 0xed9c24],
  ];
  for (const [x, z, y, h, dx, dz, width, tint] of locks) {
    p.shape(
      [
        [y, width * 0.48, width * 0.52, x, z],
        [y + h * 0.16, width, width * 1.08, x + dx * 0.04, z + dz * 0.01],
        [y + h * 0.39, width, width * 0.9, x + dx * 0.22, z + dz * 0.12],
        [y + h * 0.66, width * 0.65, width * 0.65, x + dx * 0.5, z + dz * 0.38],
        [y + h * 0.85, width * 0.3, width * 0.33, x + dx * 0.8, z + dz * 0.73],
        [y + h, 0.003, 0.004, x + dx, z + dz],
      ],
      tint,
      { sides: 11, power: 0.86 },
    );
  }
  } else {
    const pilot = variant === 1;
    const crown = pilot ? 0x6a4132 : 0x39374b;
    p.shape([[.53,.39,.34,0,-.02],[.65,.445,.38],[.83,.43,.395],[.94,.34,.31],[1.01,.13,.12]], crown,{sides:32});
    for(const sign of [-1,1]){
      if(pilot){
        p.ell(0x583329,[sign*.39,.52,0],[.10,.22,.21]);
        p.ell(0xd69c55,[sign*.445,.54,.03],[.065,.14,.13],zero,'metal');
        p.ell(0x553521,[sign*.178,.737,.335],[.196,.134,.09],[0,sign*.29,sign*.09]);
        p.ell(0xf2bd65,[sign*.178,.744,.391],[.181,.119,.061],[0,sign*.29,sign*.09],'metal');
        p.ell(0x296b83,[sign*.178,.744,.425],[.15,.09,.048],[0,sign*.29,sign*.09],'lacquer');
        p.ell(0x99e2e8,[sign*.17,.771,.458],[.083,.013,.009],[0,sign*.28,.19]);
      } else {
        p.ell(0xf3bc59,[sign*.37,.66,.16],[.046,.05,.023],zero,'metal');
      }
    }
    if(!pilot){
      p.shape([[.69,.42,.39],[.75,.54,.47,0,.034],[.86,.53,.48,0,.045],[.93,.46,.43,0,.055]],0x982b39,{sides:36});
      p.ell(0x262338,[0,.657,.275],[.413,.044,.29],[-.13,0,0],'lacquer');
      p.add(stroke([[-.34,.72,.27],[0,.70,.408],[.34,.72,.27]],.022),0xe8ac4c);
      p.ell(0xffc964,[0,.812,.50],[.083,.089,.022],zero,'metal');
    }
  }
  p.attach(neck, palette);
}

export function createBoss(variant=0) {
  const root = new THREE.Group();
  const palette = finishes();
  const carriage = joint(root);
  const leftLeg = bossLeg(carriage, -1, palette),
    rightLeg = bossLeg(carriage, 1, palette);
  const torso = joint(carriage, 0, 1.9, -0.014);
  const core = new Parts();
  core.shape(
    [
      [-0.36, 0.641, 0.399],
      [-0.13, 0.751, 0.457],
      [0.033, 0.775, 0.472],
      [0.096, 0.741, 0.449],
    ],
    0x3c3240,
    { sides: 22, power: 0.8 },
  );
  core.shape(
    [
      [-0.13, 0.757, 0.457],
      [-0.092, 0.78, 0.471],
      [0.015, 0.78, 0.469],
      [0.043, 0.755, 0.454],
    ],
    0x623b36,
    { sides: 22, power: 0.84 },
  );
  core.box(0xffbd61, [0, -0.041, 0.469], [0.242, 0.117, 0.037], zero, 'metal');
  core.box(0x77533b, [0, -0.039, 0.495], [0.179, 0.063, 0.023], zero, 'metal');
  core.shape(
    [
      [-0.136, 0.675, 0.433, 0, 0.025],
      [0.018, 0.767, 0.498, 0, 0.017],
      [0.254, 0.838, 0.548],
      [0.519, 0.92, 0.579, 0, -0.013],
      [0.779, 0.993, 0.584, 0, -0.02],
      [0.973, 0.909, 0.507, 0, -0.034],
      [1.094, 0.637, 0.377, 0, -0.031],
    ],
    0xf1e4cb,
    { sides: 26, power: 0.88 },
  );
  core.shape(
    [
      [0.855, 0.18, 0.05, 0, 0.509],
      [0.928, 0.272, 0.094, 0, 0.449],
      [1.013, 0.425, 0.151, 0, 0.357],
      [1.135, 0.464, 0.261, 0, 0.152],
      [1.316, 0.338, 0.264, 0, 0.04],
    ],
    0xe9a16a,
    { sides: 22, power: 0.88 },
  );
  core.add(
    stroke(
      [
        [-0.411, 1.078, 0.423],
        [-0.289, 0.958, 0.502],
        [0, 0.848, 0.554],
        [0.289, 0.958, 0.502],
        [0.411, 1.078, 0.423],
      ],
      0.024,
    ),
    0xffefd9,
  );
  core.shape(
    [
      [1.059, 0.424, 0.326],
      [1.168, 0.388, 0.303],
      [1.396, 0.284, 0.247],
      [1.481, 0.239, 0.207],
    ],
    0xe7a06c,
    { sides: 18, power: 0.88 },
  );
  jacket(core);
  for(const sign of [-1,1]){
    core.ell(variant===1?0x654537:0x992638,[sign*.95,1.0,-.035],[.32,.13,.37],[0,0,-sign*.32],'lacquer');
    core.add(stroke([[sign*.71,1.12,.08],[sign*.91,1.115,.17],[sign*1.12,1.015,.18]],.029),0xf6bc61);
  }
  for(let i=0;i<3;i++)core.box([0xf2b24d,0x46a9be,0xc74c39][i],[.64+.082*i,.62,.528],[.07,.067,.027],zero,'metal');
  core.attach(torso, palette);
  const neck = joint(torso, 0, 1.413, 0.034);
  neck.scale.set(1.24,1.08,1.17);
  bossHead(neck, palette, variant);
  const arms = [bossArm(torso, -1, palette), bossArm(torso, 1, palette)];
  const clamp = THREE.MathUtils.clamp;
  const smooth = (low, high, value) => THREE.MathUtils.smoothstep(value, low, high);
  function animate({ time = 0, run = 0, slam = 0, hit = 0, defeat = 0 } = {}) {
    const stride = time * 6.48;
    const wind = smooth(0.02, 0.53, slam) * (1 - smooth(0.59, 0.79, slam));
    const impact = smooth(0.58, 0.78, slam) * (1 - smooth(0.88, 1, slam));
    const normal = 1 - clamp(wind + impact, 0, 1);
    const walk = run * normal;
    leftLeg.rotation.x = Math.sin(stride) * 0.28 * walk + impact * 0.28;
    rightLeg.rotation.x = -Math.sin(stride) * 0.28 * walk + impact * 0.28;
    leftLeg.position.y = rightLeg.position.y = 1.68 + impact * 0.055;
    carriage.position.y = Math.abs(Math.sin(stride)) * 0.057 * walk + wind * 0.11;
    torso.position.y = 1.9 - impact * 0.7;
    torso.rotation.x = -wind * 0.17 + impact * 0.73 - hit * 0.034;
    torso.rotation.z = Math.sin(stride) * 0.025 * walk;
    neck.rotation.x = wind * 0.19 - impact * 0.36;
    neck.rotation.y = Math.sin(stride * 0.5) * 0.049 * walk;
    for (let i = 0; i < arms.length; i++) {
      const sign = i === 0 ? -1 : 1;
      arms[i].shoulder.rotation.x =
        sign * Math.sin(stride) * 0.17 * walk - wind * 2.43 - impact * 0.94;
      arms[i].shoulder.rotation.z = sign * (0.041 + 0.26 * wind - 0.065 * impact);
      arms[i].elbow.rotation.x = -0.105 - wind * 0.71 - impact * 0.09;
    }
    if(defeat>0){
      const buckle=smooth(.12,.53,defeat), relax=smooth(.83,1.23,defeat);
      torso.position.y-=.42*buckle; torso.rotation.z-=.19*buckle;
      neck.rotation.x+=.27*buckle;
      for(const [i,arm] of arms.entries()){
        arm.shoulder.rotation.z+=(i?1:-1)*(.76*buckle-.46*relax);
        arm.elbow.rotation.x-=.54*buckle-.32*relax;
      }
      leftLeg.rotation.x+=.62*buckle;rightLeg.rotation.x-=.36*buckle;
    }
    const glow = clamp(hit, 0, 1);
    palette.cloth.emissive.setRGB(glow * 0.44, glow * 0.31, glow * 0.21);
    palette.lacquer.emissive.setRGB(glow * 0.52, glow * 0.35, glow * 0.21);
    palette.metal.emissive.setRGB(glow * 0.35, glow * 0.31, glow * 0.24);
  }
  return { root, animate };
}
