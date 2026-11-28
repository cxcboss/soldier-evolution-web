import * as THREE from 'three';
import { coatModel, createSculptedPaint } from './creature-paint.js';
import { block, part, combine, strut } from './scenery-mesh.js';
import { slamDownWeight, slamRaiseWeight, smoothRange } from './brawler-motion.js';

const V = (a) => new THREE.Vector3(...a);
const E = (x = 0, y = 0, z = 0) => new THREE.Euler(x, y, z);
const TAU = Math.PI * 2;
const shell = new THREE.MeshPhongMaterial({
  vertexColors: true,
  shininess: 51,
  specular: 0x706765,
  side: THREE.DoubleSide,
});
const luminous = new THREE.MeshBasicMaterial({
  vertexColors: true,
  toneMapped: false,
  side: THREE.DoubleSide,
});
const ov = (c, x, y, z, a, b, d, rot = null) => {
  const radius = Math.max(a, b, d);
  const slices = radius < 0.11 ? 10 : radius < 0.25 ? 14 : radius < 0.56 ? 20 : 28;
  const g = new THREE.SphereGeometry(1, slices, Math.ceil(slices * 0.55));
  g.scale(a, b, d);
  return part(g, c, x, y, z, rot);
};
const bx = (c, x, y, z, a, b, d, rad = 0.045, rot = null) =>
  part(block(a, b, d, rad), c, x, y, z, rot);
const cy = (c, x, y, z, t, b, h, rot = null, n = 24) =>
  part(new THREE.CylinderGeometry(t, b, h, n), c, x, y, z, rot);
const ring = (c, x, y, z, r, t, rot = null) =>
  part(new THREE.TorusGeometry(r, t, 8, 32), c, x, y, z, rot);
function pipe(c, points, r = 0.04) {
  return part(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points.map(V)),
      Math.max(9, points.length * 5),
      r,
      8,
      false,
    ),
    c,
    0,
    0,
    0,
  );
}
// Swept, tapered cross sections retain the curvature and sharp tips of horns, jaws and claws.
function horn(c, points, radii, facets = 14) {
  const curve = new THREE.CatmullRomCurve3(points.map(V)),
    steps = (points.length - 1) * 5;
  const basis = curve.computeFrenetFrames(steps, false),
    positions = [],
    indices = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps,
      pos = curve.getPointAt(t),
      r = t * (radii.length - 1),
      k = Math.min(radii.length - 2, Math.floor(r)),
      radius = THREE.MathUtils.lerp(radii[k], radii[k + 1], r - k);
    for (let j = 0; j < facets; j++) {
      const a = (j * TAU) / facets,
        p = pos
          .clone()
          .addScaledVector(basis.normals[i], radius * Math.cos(a))
          .addScaledVector(basis.binormals[i], radius * Math.sin(a));
      positions.push(p.x, p.y, p.z);
      if (i) {
        const n = i * facets + j,
          q = i * facets + ((j + 1) % facets);
        indices.push(n - facets, q - facets, n, q - facets, q, n);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return part(g, c, 0, 0, 0);
}
function membrane(points, colors) {
  const positions = [],
    values = [];
  for (let i = 1; i < points.length - 1; i++) {
    for (const k of [0, i, i + 1]) {
      positions.push(...points[k]);
      const v = new THREE.Color(colors[k % colors.length]);
      values.push(v.r, v.g, v.b);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(values, 3));
  g.computeVertexNormals();
  return g;
}
// A crowned, bevel-edged plate. Its enamel, chamfer and exposed undercut share one draw.
function scute(color, rim, x, y, z, width, rise, length, rotation = null) {
  const outline = [
    [0, 1],
    [0.66, 0.64],
    [1, 0.08],
    [0.82, -0.53],
    [0, -1],
    [-0.82, -0.53],
    [-1, 0.08],
    [-0.66, 0.64],
  ];
  const foot = outline.map(([dx, dz]) => [dx * width, 0, dz * length]);
  const edge = outline.map(([dx, dz]) => [dx * width, rise * 0.24, dz * length]);
  const shoulder = outline.map(([dx, dz]) => [dx * width * 0.86, rise * 0.53, dz * length * 0.87]);
  const top = [0, rise, length * 0.06];
  const vertices = [],
    colors = [];
  const faceColor = new THREE.Color(color),
    edgeColor = new THREE.Color(rim);
  const shadow = faceColor.clone().multiplyScalar(0.48);
  function tri(a, b, c, tint) {
    vertices.push(...a, ...c, ...b);
    for (let k = 0; k < 3; k++) colors.push(tint.r, tint.g, tint.b);
  }
  for (let i = 0; i < outline.length; i++) {
    const j = (i + 1) % outline.length;
    tri(foot[i], edge[i], foot[j], shadow);
    tri(foot[j], edge[i], edge[j], shadow);
    tri(edge[i], shoulder[i], edge[j], edgeColor);
    tri(edge[j], shoulder[i], shoulder[j], edgeColor);
    tri(shoulder[i], top, shoulder[j], faceColor);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  if (rotation) geo.applyQuaternion(new THREE.Quaternion().setFromEuler(rotation));
  return geo.translate(x, y, z);
}
// Translucent-looking flight skin sags between the fingers and pulls in at the trailing edge.
function flightPanel(a, b, side) {
  const steps = 5,
    vertices = [],
    colors = [],
    faces = [];
  const dark = new THREE.Color('#307fa8'),
    bright = new THREE.Color('#94ddec');
  for (let row = 0; row <= steps; row++)
    for (let col = 0; col <= steps; col++) {
      const t = row / steps,
        s = col / steps,
        bow = Math.sin(Math.PI * s);
      const reach = t * (1 - 0.25 * bow * t * t);
      vertices.push(
        THREE.MathUtils.lerp(a[0], b[0], s) * reach,
        THREE.MathUtils.lerp(a[1], b[1], s) * reach - 0.19 * bow * t + 0.06 * Math.sin(Math.PI * t),
        THREE.MathUtils.lerp(a[2], b[2], s) * reach,
      );
      const c = dark.clone().lerp(bright, 0.22 + 0.51 * (1 - bow) + 0.17 * t);
      colors.push(c.r, c.g, c.b);
      if (row && col) {
        const d = row * (steps + 1) + col,
          c = d - 1,
          b = d - (steps + 1),
          a = b - 1;
        if (side < 0) faces.push(a, d, b, a, c, d);
        else faces.push(a, b, d, a, d, c);
      }
    }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(faces);
  geo.computeVertexNormals();
  const flat = geo.toNonIndexed();
  geo.dispose();
  return flat;
}

function gem(c, x, y, z, r, h, tilt = 0) {
  const g = new THREE.CylinderGeometry(0.035, r, h, 5, 1);
  g.translate(0, h / 2, 0);
  return part(g, c, x, y, z, E(0, 0.2, tilt));
}
function rig() {
  const root = new THREE.Group();
  const joints = [];
  function joint(parent, x = 0, y = 0, z = 0) {
    const bone = new THREE.Bone();
    bone.position.set(x, y, z);
    parent.add(bone);
    bone.userData.geometry = [];
    bone.userData.light = [];
    joints.push(bone);
    return bone;
  }
  const add = (bone, ...geo) => bone.userData.geometry.push(...geo);
  const glow = (bone, ...geo) => bone.userData.light.push(...geo);
  function finish() {
    // Store each rigid shell/wing/claw in bind space once. All joints then share two
    // mobile draw calls (enamel and light) regardless of the number of moving legs.
    root.updateMatrixWorld(true);
    const skeleton = new THREE.Skeleton(joints);
    for (const [channel, material] of [
      ['geometry', shell],
      ['light', luminous],
    ]) {
      const pieces = [];
      joints.forEach((bone, index) => {
        const local = bone.userData[channel];
        delete bone.userData[channel];
        if (!local.length) return;
        const geometry = combine(local).applyMatrix4(bone.matrixWorld);
        const count = geometry.getAttribute('position').count;
        const indices = new Uint8Array(count * 4),
          weights = new Uint8Array(count * 4);
        for (let i = 0; i < indices.length; i += 4) {
          indices[i] = index;
          weights[i] = 255;
        }
        geometry.setAttribute('skinIndex', new THREE.Uint8BufferAttribute(indices, 4));
        geometry.setAttribute('skinWeight', new THREE.Uint8BufferAttribute(weights, 4, true));
        pieces.push(geometry);
      });
      if (!pieces.length) continue;
      const mesh = new THREE.SkinnedMesh(combine(pieces), material);
      root.add(mesh);
      mesh.bind(skeleton, new THREE.Matrix4());
      mesh.frustumCulled = false;
    }
  }
  return { root, joint, add, glow, finish };
}
function eyes(r, head, x, y, z, iris, pupil = true) {
  for (const s of [-1, 1]) {
    r.add(head, ov('#28313b', s * x, y, z, 0.15, 0.106, 0.095, E(0, s * 0.35, -s * 0.27)));
    r.glow(
      head,
      ov(iris, s * x, y + 0.006, z + 0.055, 0.114, 0.068, 0.06, E(0, s * 0.35, -s * 0.27)),
    );
    if (pupil) r.add(head, ov('#271f2e', s * x, y, z + 0.11, 0.027, 0.052, 0.017));
  }
}
function teeth(r, head, z, width, y, count, up = false) {
  for (let i = 0; i < count; i++) {
    const x = width * (i / (count - 1) - 0.5),
      h = 0.12 + (i === 0 || i === count - 1 ? 0.08 : 0);
    r.add(
      head,
      horn(
        '#f7dfb0',
        [
          [x, y, z - Math.abs(x) * 0.15],
          [x * 0.98, y + (up ? 1 : -1) * h, z + 0.035],
        ],
        [0.049, 0.004],
        8,
      ),
    );
  }
}
function legSet(r, body, attachment, points, palette, mechanical = false) {
  const g = r.joint(body, ...attachment),
    [knee, ankle, toe] = points;
  const [base, upper, trim] = palette;
  r.add(
    g,
    horn(upper, [[0, 0, 0], knee], [mechanical ? 0.17 : 0.19, 0.12]),
    ov(trim, ...knee, 0.16, 0.15, 0.15),
  );
  const shank = r.joint(g, ...knee);
  const end = ankle.map((n, i) => n - knee[i]),
    tip = toe.map((n, i) => n - knee[i]);
  r.add(shank, horn(base, [[0, 0, 0], end, tip], [0.13, 0.092, 0.009], 12));
  if (mechanical) {
    const mid = end.map((v) => v * 0.56);
    r.add(
      shank,
      horn(
        upper,
        [end.map((v) => v * 0.09), mid, end.map((v) => v * 0.81)],
        [0.145, 0.17, 0.105],
        10,
      ),
      strut(
        end.map((v) => v * 0.25),
        end.map((v) => v * 0.32),
        0.172,
        trim,
        12,
      ),
      strut(
        end.map((v) => v * 0.64),
        end.map((v) => v * 0.69),
        0.143,
        trim,
        12,
      ),
    );
    r.add(g, strut([0, 0.09, 0.1], [knee[0], knee[1] + 0.085, knee[2] + 0.08], 0.041, '#e9b277'));
    r.add(
      shank,
      strut([0, 0.03, 0.06], [end[0], end[1] + 0.12, end[2] + 0.05], 0.042, '#dba26b'),
      ov(upper, ...end, 0.13, 0.09, 0.14),
    );
  } else r.add(shank, ov(upper, ...end, 0.13, 0.095, 0.13));
  return { g, shank };
}
function crab(r) {
  const { root, joint, add, glow } = r,
    body = joint(root, 0, 1.04, -0.12),
    jaw = joint(body, 0, -0.06, 0.8),
    legs = [],
    claws = [];
  const teal = '#176f70',
    sea = '#30a59a',
    dark = '#124e59',
    coral = '#f07846',
    edge = '#fcbb71';
  add(
    body,
    ov(dark, 0, -0.1, 0, 1.23, 0.55, 1.0),
    ov(teal, 0, 0.24, -0.05, 1.39, 0.77, 1.06),
    ov(sea, 0, 0.48, -0.13, 1.08, 0.55, 0.84),
  );
  for (const s of [-1, 1]) {
    add(
      body,
      horn(
        '#248d87',
        [
          [s * 0.15, 0.87, 0.13],
          [s * 0.56, 1.01, -0.17],
          [s * 0.72, 1.12, -0.42],
        ],
        [0.135, 0.12, 0.009],
      ),
    );
    for (let j = 0; j < 5; j++)
      add(
        body,
        ov(
          '#65ae96',
          s * (0.26 + j * 0.14),
          0.88 - j * 0.07,
          -0.36 + j * 0.032,
          0.055,
          0.039,
          0.075,
        ),
      );
    add(
      body,
      pipe(
        '#93c9ac',
        [
          [s * 0.18, 0.96, 0.09],
          [s * 0.58, 0.83, 0.31],
          [s * 1.07, 0.59, 0.33],
          [s * 1.26, 0.29, 0.19],
        ],
        0.036,
      ),
    );
    for (let n = 0; n < 3; n++) {
      const z = 0.4 - n * 0.46;
      add(
        body,
        horn(
          sea,
          [
            [s * 1.0, 0.32, z],
            [s * 1.36, 0.38, z - 0.13],
            [s * 1.45, 0.58, z - 0.26],
          ],
          [0.21, 0.13, 0.006],
        ),
      );
      const a = [s * 0.92, -0.09, z];
      legs.push({
        ...legSet(
          r,
          body,
          a,
          [
            [s * 0.58, 0.18, -0.14],
            [s * 0.91, -0.78, 0.02],
            [s * 1.0, -0.97, 0.31],
          ],
          [dark, teal, coral],
        ),
        phase: n * 0.98 + (s < 0 ? Math.PI : 0),
        s,
      });
    }
    const arm = joint(body, s * 0.9, 0.06, 0.39),
      palm = joint(arm, s * 0.41, 0.25, 0.5);
    add(
      arm,
      horn(
        dark,
        [
          [0, 0, 0],
          [s * 0.37, 0.05, 0.22],
          [s * 0.41, 0.25, 0.5],
        ],
        [0.27, 0.23, 0.24],
      ),
    );
    add(
      palm,
      ov(coral, 0, 0.05, 0.05, 0.45, 0.34, 0.49, E(0.12, 0, -s * 0.12)),
      horn(
        coral,
        [
          [s * 0.23, 0.12, 0.2],
          [s * 0.39, 0.22, 0.55],
          [s * 0.33, 0.31, 0.89],
          [-s * 0.015, 0.33, 1.08],
        ],
        [0.23, 0.19, 0.1, 0.008],
      ),
      pipe(
        edge,
        [
          [s * 0.29, 0.23, 0.32],
          [s * 0.39, 0.33, 0.62],
          [s * 0.24, 0.37, 0.9],
        ],
        0.047,
      ),
    );
    const finger = joint(palm, -s * 0.13, 0.02, 0.24);
    add(
      finger,
      horn(
        '#e78954',
        [
          [0, 0, 0],
          [-s * 0.18, 0.02, 0.32],
          [-s * 0.19, 0.12, 0.62],
          [s * 0.033, 0.25, 0.8],
        ],
        [0.19, 0.16, 0.095, 0.007],
      ),
    );
    for (let j = 0; j < 4; j++)
      add(palm, ov(edge, -s * 0.02, 0.29, 0.07 + j * 0.11, 0.074, 0.054, 0.06));
    claws.push({ arm, palm, finger, s });
    add(
      body,
      horn(
        dark,
        [
          [s * 0.39, 0.45, 0.55],
          [s * 0.48, 0.71, 0.62],
          [s * 0.49, 0.85, 0.72],
        ],
        [0.13, 0.095, 0.08],
      ),
    );
    add(body, ov(dark, s * 0.49, 0.86, 0.74, 0.22, 0.16, 0.17));
    glow(body, ov('#ffd777', s * 0.49, 0.88, 0.865, 0.146, 0.11, 0.077));
    add(body, ov('#333442', s * 0.49, 0.9, 0.927, 0.036, 0.078, 0.02));
    for (let j = 0; j < 3; j++)
      add(
        jaw,
        horn(
          edge,
          [
            [s * (0.14 + j * 0.1), 0.07, 0.03],
            [s * (0.16 + j * 0.14), -0.12, 0.21],
            [s * (0.13 + j * 0.14), -0.29, 0.27],
          ],
          [0.078, 0.055, 0.007],
        ),
      );
    for (let j = 0; j < 3; j++) {
      const z = -0.39 - j * 0.17;
      add(
        body,
        ring(
          '#ded5a1',
          s * (0.46 + j * 0.1),
          0.88 - j * 0.06,
          z,
          0.077,
          0.025,
          E(Math.PI / 2, 0, 0),
        ),
      );
    }
  }
  add(
    body,
    pipe(
      '#a7dac4',
      [
        [0, 0.59, 0.81],
        [0, 0.96, 0.21],
        [0, 1.01, -0.18],
        [0, 0.75, -0.78],
      ],
      0.034,
    ),
  );
  // Branching coral is part of the living shell. Twin cut-water brows protect the eye stalks.
  for (const side of [-1, 1]) {
    for (let i = 0; i < 2; i++) {
      const x = side * (0.36 + i * 0.24),
        z = -0.54 + i * 0.18;
      const top = [x + side * 0.2, 1.57 - i * 0.13, z - 0.11];
      add(
        body,
        horn(
          '#e77648',
          [
            [x, 0.84, z],
            [x + side * 0.03, 1.09, z],
            [x + side * 0.17, 1.31 - i * 0.06, z - 0.04],
            top,
          ],
          [0.12, 0.092, 0.061, 0.022],
          10,
        ),
        horn(
          '#ff9c5e',
          [
            [x + side * 0.09, 1.19, z - 0.02],
            [x - side * 0.08, 1.35, z + 0.025],
            [x - side * 0.06, 1.47, z + 0.055],
          ],
          [0.062, 0.04, 0.011],
          9,
        ),
        horn(
          '#f59853',
          [
            [x + side * 0.15, 1.28 - i * 0.04, z - 0.04],
            [x + side * 0.29, 1.34, z - 0.11],
            [x + side * 0.33, 1.46, z - 0.16],
          ],
          [0.055, 0.035, 0.01],
          9,
        ),
      );
    }
    add(
      body,
      scute(
        '#126d72',
        '#91cba9',
        side * 0.48,
        0.9,
        0.7,
        0.24,
        0.1,
        0.23,
        E(0.15, side * 0.12, -side * 0.36),
      ),
    );
    add(
      jaw,
      horn(
        '#efc69c',
        [
          [side * 0.26, 0.13, 0.15],
          [side * 0.37, 0.03, 0.38],
          [side * 0.2, -0.13, 0.44],
        ],
        [0.115, 0.071, 0.004],
        12,
      ),
    );
  }
  for (const side of [-1, 1])
    add(
      body,
      horn(
        '#195a5c',
        [
          [side * 0.27, 0.86, 0.9],
          [side * 0.47, 0.99, 0.865],
          [side * 0.68, 1.02, 0.73],
        ],
        [0.052, 0.116, 0.033],
        12,
      ),
    );
  add(jaw, ov('#362a2f', 0, 0.07, 0.27, 0.28, 0.12, 0.13));
  teeth(r, jaw, 0.36, 0.39, 0.11, 5);
  // The raised shield and deeply notched crusher distinguish it from the thinner cutting claw.
  add(body, scute('#209f95', '#98dfbb', 0, 0.86, -0.03, 0.7, 0.27, 0.82));
  for (const side of [-1, 1])
    add(
      body,
      scute(
        '#197c7f',
        '#7ecaaa',
        side * 0.79,
        0.67,
        -0.18,
        0.39,
        0.23,
        0.55,
        E(0.08, side * 0.28, -side * 0.35),
      ),
    );
  for (const { palm, finger, s } of claws) {
    if (s < 0) palm.scale.set(1.24, 1.28, 1.15);
    add(palm, scute('#fb7c3d', '#ffd27a', 0, 0.27, 0.2, 0.33, 0.13, 0.43, E(0.04, 0, -s * 0.16)));
    for (let i = 0; i < 3; i++) {
      const z = 0.44 + i * 0.17;
      add(
        palm,
        horn(
          '#ffda8e',
          [
            [s * 0.23, 0.19, z],
            [s * 0.09, 0.16, z + 0.04],
          ],
          [0.078, 0.007],
          9,
        ),
      );
      add(
        finger,
        horn(
          '#f6c583',
          [
            [-s * 0.13, 0.13, z - 0.23],
            [-s * 0.02, 0.14, z - 0.15],
          ],
          [0.065, 0.004],
          9,
        ),
      );
    }
  }
  return (q) => {
    const both = q.slamHand === 2;
    jaw.rotation.x = 0.07 + 0.12 * Math.sin(q.time * 3.2) + 0.28 * q.cast - 0.18 * q.fire + 0.24 * q.raise;
    body.position.y = 1.04 + q.bob * 0.08 + 0.26 * q.raise - 0.44 * q.strike - q.down * 0.29;
    body.rotation.z = q.stride * 0.044 + q.down * 0.18 + q.knock * Math.sin(q.time * 26) * 0.14;
    body.rotation.x = -q.cast * 0.14 - 0.28 * q.raise + 0.36 * q.strike - 0.32 * q.knock;
    legs.forEach(({ g, shank, phase, s }) => {
      const a = q.beat + phase;
      g.rotation.y = s * 0.25 * Math.sin(a) * q.walk;
      shank.rotation.z = s * (Math.max(0, Math.cos(a)) * 0.28 * q.walk + q.down * 0.45 + q.knock * 0.25);
    });
    claws.forEach(({ arm, palm, finger, s }) => {
      const active = both || (s < 0 ? q.slamHand === 0 : q.slamHand === 1);
      const r = active ? q.raise : 0;
      const st = active ? q.strike : 0;
      // 巨蟹交替高举巨螯过顶、再狠砸地面连击；被击退期双螯失衡朝天甩开
      arm.rotation.x =
        -0.14 +
        0.2 * q.stride * s -
        0.55 * q.cast -
        1.65 * r +
        0.82 * st -
        0.58 * q.air -
        0.9 * q.knock +
        0.5 * q.down;
      palm.rotation.y = s * (0.1 - 0.26 * q.cast + 0.26 * q.fire - 0.32 * r + 0.38 * st);
      finger.rotation.y =
        s * (-0.28 - 0.32 * q.cast + 0.64 * q.fire - 0.45 * r + 0.72 * st + 0.09 * Math.sin(q.time * 3));
    });
  };
}
function rhino(r) {
  const { root, joint, add, glow } = r,
    body = joint(root, 0, 1.24, -0.26),
    head = joint(body, 0, 0.18, 0.7),
    legs = [];
  const hide = '#57484b',
    plate = '#b67b35',
    gold = '#e9b858',
    ivory = '#ffe3a8';
  add(
    body,
    ov(hide, 0, 0.03, -0.17, 0.94, 0.77, 1.36),
    ov('#8e612f', 0, 0.18, 0.18, 1.04, 0.84, 0.94),
  );
  for (let i = 0; i < 3; i++) {
    const z = 0.36 - i * 0.48,
      scale = 1 - i * 0.12;
    add(
      body,
      ov(i % 2 ? plate : '#c89348', 0, 0.53 - i * 0.09, z, 0.98 * scale, 0.53 * scale, 0.55),
    );
    for (const s of [-1, 1]) {
      add(
        body,
        strut(
          [s * 0.6 * scale, 0.9 - i * 0.1, z + 0.12],
          [s * 0.92 * scale, 0.46 - i * 0.1, z + 0.04],
          0.048,
          gold,
        ),
        ov('#5b5052', s * 0.9 * scale, 0.49 - i * 0.09, z + 0.11, 0.07, 0.07, 0.07),
      );
    }
  }
  add(
    head,
    ov(hide, 0, 0.11, 0.27, 0.64, 0.63, 0.68),
    ov('#866344', 0, -0.11, 0.72, 0.56, 0.37, 0.56),
    ov('#624c41', 0, -0.2, 1.03, 0.5, 0.25, 0.25),
    horn(
      ivory,
      [
        [0, 0.12, 0.88],
        [0.04, 0.43, 1.17],
        [0.22, 0.86, 1.47],
        [0.46, 1.48, 1.35],
      ],
      [0.3, 0.22, 0.115, 0.004],
    ),
    horn(
      '#d6ae76',
      [
        [0, 0.45, 0.6],
        [0, 0.67, 0.69],
        [0, 0.87, 0.78],
      ],
      [0.16, 0.1, 0.005],
    ),
  );
  for (const s of [-1, 1]) {
    add(
      head,
      ov('#493d42', s * 0.275, -0.16, 1.205, 0.105, 0.064, 0.038),
      horn(
        hide,
        [
          [s * 0.41, 0.39, 0.1],
          [s * 0.62, 0.56, 0.04],
          [s * 0.69, 0.68, -0.13],
        ],
        [0.16, 0.14, 0.015],
      ),
      ov(plate, s * 0.46, 0.33, 0.63, 0.27, 0.11, 0.26, E(0, s * 0.42, -s * 0.31)),
    );
    for (const z of [-0.86, 0.62]) {
      const g = joint(body, s * 0.64, -0.11, z),
        knee = joint(g, 0, -0.54, 0.05);
      add(
        g,
        ov(hide, s * 0.055, -0.19, 0, 0.3, 0.46, 0.34),
        ov(plate, s * 0.12, -0.2, 0.045, 0.29, 0.23, 0.32),
      );
      add(
        knee,
        ov(hide, 0, -0.13, 0, 0.235, 0.33, 0.25),
        ov('#423d43', 0, -0.39, 0.095, 0.267, 0.16, 0.34),
      );
      for (let j = -1; j <= 1; j++)
        add(knee, ov('#c3a580', j * 0.123, -0.41, 0.29, 0.075, 0.074, 0.11));
      legs.push({ g, knee, phase: (z < 0 ? Math.PI : 0) + (s < 0 ? Math.PI : 0) });
    }
  }
  eyes(r, head, 0.447, 0.22, 0.72, '#ffb333');
  const tail = joint(body, 0, 0.12, -1.22);
  add(
    tail,
    horn(
      hide,
      [
        [0, 0, 0],
        [0.13, -0.22, -0.34],
        [0.12, -0.45, -0.47],
      ],
      [0.11, 0.073, 0.035],
    ),
    ov('#342f3a', 0.12, -0.47, -0.48, 0.08, 0.13, 0.085),
  );
  for (let i = 0; i < 3; i++) {
    const z = 0.38 - i * 0.48,
      scale = 1 - i * 0.12;
    add(body, scute('#cf9440', '#ffe093', 0, 1.0 - i * 0.1, z, scale * 0.44, 0.14, 0.36));
  }
  for (let i = 0; i < 3; i++) {
    const z = 0.31 - i * 0.48,
      w = 1 - i * 0.12;
    for (const side of [-1, 1])
      add(
        body,
        pipe(
          '#795533',
          [
            [side * 0.24 * w, 1.02 - i * 0.09, z + 0.12],
            [side * 0.59 * w, 0.91 - i * 0.1, z + 0.24],
            [side * 0.9 * w, 0.54 - i * 0.1, z + 0.16],
          ],
          0.026,
        ),
      );
  }
  eyes(r, head, 0.488, 0.295, 0.8, '#e7a73e');
  add(head, scute('#c28b3d', '#ffd46b', 0, 0.58, 0.34, 0.46, 0.18, 0.46, E(0.35)));
  for (const side of [-1, 1]) {
    add(
      body,
      scute(
        '#ba7827',
        '#ffd473',
        side * 0.71,
        0.7,
        0.17,
        0.48,
        0.25,
        0.69,
        E(0.03, side * 0.1, -side * 0.61),
      ),
    );
    add(
      head,
      scute(
        '#935b32',
        '#ffd181',
        side * 0.51,
        0.2,
        0.44,
        0.26,
        0.12,
        0.42,
        E(0.38, side * 0.18, -side * 0.55),
      ),
    );
    add(
      head,
      pipe(
        '#ecd287',
        [
          [side * 0.08, 0.16, 0.89],
          [side * 0.14, 0.19, 1.0],
          [side * 0.14, 0.25, 1.08],
        ],
        0.035,
      ),
    );
    for (let i = 0; i < 3; i++)
      add(
        body,
        ov(
          '#69484b',
          side * (0.63 + i * 0.09),
          0.96 - i * 0.102,
          0.46 - i * 0.03,
          0.05,
          0.042,
          0.052,
        ),
      );
  }
  return (q) => {
    head.rotation.y = 0.065 * q.stride - 0.1 * Math.sin(q.time * 3) * q.cast;
    body.position.y = 1.24 + 0.1 * q.bob - 0.26 * q.cast - 0.35 * q.down;
    body.rotation.z = 0.06 * q.stride + 0.25 * q.down;
    head.rotation.x = 0.025 + 0.18 * q.stride + 0.48 * q.cast - 0.47 * q.fire + 0.2 * q.down;
    for (const { g, knee, phase } of legs) {
      const v = Math.sin(q.beat + phase) * q.walk;
      g.rotation.x = -v * 0.39 + 0.25 * q.down;
      knee.rotation.x = Math.max(0, v) * 0.39 + 0.35 * q.air;
    }
    tail.rotation.z = 0.28 * Math.sin(q.time * 3);
  };
}
function wyrm(r) {
  const { root, joint, add, glow } = r,
    segments = [],
    nodes = [
      [-0.32, 1.76, 0.88, 0.69],
      [-0.07, 1.14, 0.63, 0.75],
      [0.51, 0.63, 0.49, 0.73],
      [0.91, 0.48, -0.12, 0.68],
      [0.72, 0.47, -0.75, 0.63],
      [0.19, 0.49, -1.1, 0.56],
      [-0.4, 0.52, -1.12, 0.52],
      [-0.85, 0.58, -0.76, 0.46],
      [-0.99, 0.77, -0.27, 0.4],
      [-0.85, 1.16, -0.14, 0.36],
      [-0.64, 1.59, -0.35, 0.31],
      [-0.3, 1.95, -0.62, 0.25],
      [0.14, 2.07, -0.66, 0.19],
      [0.46, 1.95, -0.64, 0.14],
      [0.54, 1.72, -0.63, 0.078],
    ];
  for (let i = 0; i < nodes.length; i++) {
    const [x, y, z, rad] = nodes[i],
      g = joint(root, x, y, z);
    add(
      g,
      ov(i % 2 ? '#623c81' : '#654194', 0, 0, 0, rad, rad * 0.78, rad * 0.98),
      ov(i % 2 ? '#a969bd' : '#9659af', 0, rad * 0.23, -0.03, rad * 1.06, rad * 0.71, rad * 0.64),
    );
    for (const s of [-1, 1]) {
      add(
        g,
        ov('#50365e', s * rad * 0.78, -0.09, 0.08, rad * 0.21, rad * 0.19, rad * 0.5),
        gem(
          i % 2 ? '#cc80ee' : '#a17de8',
          s * rad * 0.62,
          rad * 0.43,
          -0.1,
          rad * 0.26,
          rad * 0.78,
          -s * 0.5,
        ),
      );
      glow(g, ov('#edacff', s * rad * 0.72, rad * 0.5, 0.075, rad * 0.22, rad * 0.043, rad * 0.09));
    }
    add(g, gem('#e5b0ff', 0, rad * 0.62, -0.14, rad * 0.23, rad * 0.67, -0.12));
    add(
      g,
      scute(
        i % 2 ? '#9f62cb' : '#8251b7',
        '#d39ae8',
        0,
        rad * 0.61,
        0.025,
        rad * 0.82,
        rad * 0.32,
        rad * 0.69,
      ),
    );
    if (i + 1 < nodes.length) {
      const [nx, ny, nz, nr] = nodes[i + 1],
        link = [nx - x, ny - y, nz - z];
      add(
        g,
        horn(
          i % 2 ? '#6e498c' : '#8453a4',
          [[0, 0, 0], link.map((v) => v * 0.55), link],
          [rad * 0.79, (rad + nr) * 0.44, nr * 0.78],
          16,
        ),
      );
    }
    segments.push(g);
  }
  const head = joint(segments[0], 0, 0.37, 0.34),
    jaw = joint(head, 0, -0.12, 0.11);
  add(
    head,
    ov('#75469a', 0, 0.18, 0.02, 0.69, 0.49, 0.61),
    ov('#9954af', 0, 0.1, 0.4, 0.56, 0.23, 0.44),
    ov('#392744', 0, -0.043, 0.41, 0.51, 0.11, 0.44),
  );
  add(jaw, ov('#b579ab', 0, -0.19, 0.37, 0.47, 0.145, 0.45));
  teeth(r, head, 0.67, 0.83, -0.012, 7);
  teeth(r, jaw, 0.62, 0.67, -0.13, 5, true);
  for (const s of [-1, 1]) {
    add(
      head,
      horn(
        '#cea6ef',
        [
          [s * 0.45, 0.32, 0.1],
          [s * 0.65, 0.69, -0.06],
          [s * 0.69, 0.91, -0.32],
        ],
        [0.19, 0.135, 0.01],
      ),
      horn(
        '#a07ccf',
        [
          [s * 0.48, 0.11, -0.04],
          [s * 0.78, 0.36, -0.23],
          [s * 0.94, 0.44, -0.49],
        ],
        [0.19, 0.1, 0.007],
      ),
      ov('#b17cba', s * 0.4, 0.32, 0.44, 0.24, 0.105, 0.19, E(0, s * 0.37, -s * 0.32)),
    );
  }
  for (const s of [-1, 1]) {
    add(
      head,
      horn(
        '#c491da',
        [
          [s * 0.18, 0.31, 0.63],
          [s * 0.39, 0.42, 0.54],
          [s * 0.66, 0.5, 0.24],
        ],
        [0.1, 0.16, 0.035],
      ),
      horn(
        '#cba7d1',
        [
          [s * 0.49, 0.09, 0.31],
          [s * 0.67, -0.03, 0.53],
          [s * 0.57, -0.19, 0.75],
        ],
        [0.12, 0.085, 0.005],
      ),
    );
  }
  eyes(r, head, 0.39, 0.235, 0.51, '#a3ffe6');
  for (const side of [-1, 1]) {
    add(
      head,
      gem('#86bdf3', side * 0.43, 0.43, -0.11, 0.16, 0.62, -side * 0.45),
      gem('#d6b8ff', side * 0.56, 0.36, -0.21, 0.12, 0.41, -side * 0.67),
    );
  }
  add(jaw, scute('#713f83', '#e19acd', 0, -0.16, 0.34, 0.44, 0.12, 0.34));
  add(jaw, ov('#512c4b', 0, -0.061, 0.4, 0.25, 0.05, 0.18));
  for (const side of [-1, 1]) {
    add(
      head,
      horn(
        '#ffe8c5',
        [
          [side * 0.36, 0.08, 0.61],
          [side * 0.37, -0.1, 0.81],
          [side * 0.3, -0.28, 0.87],
        ],
        [0.092, 0.06, 0.006],
        12,
      ),
    );
    add(
      head,
      scute(
        '#754593',
        '#cc8dee',
        side * 0.38,
        0.35,
        0.4,
        0.25,
        0.1,
        0.25,
        E(0.22, -side * 0.22, -side * 0.44),
      ),
    );
  }
  return (q) => {
    segments.forEach((g, i) => {
      const [, y, z] = nodes[i];
      g.position.x =
        nodes[i][0] +
        Math.sin(q.beat * 0.68 - i * 0.71) * (0.075 + Math.min(4, i) * 0.026) * q.walk;
      g.position.y =
        y * (1 - 0.57 * q.down - 0.36 * q.cast) +
        Math.sin(q.beat * 0.63 - i * 0.73) * 0.074 * q.walk;
      g.position.z = z + i * 0.035 * q.cast + Math.max(0, 1 - i * 0.2) * 0.36 * q.fire;
      g.rotation.z = 0.12 * Math.sin(q.beat * 0.7 - i * 0.61) * q.walk + 0.27 * q.down;
    });
    head.rotation.x = -0.22 * q.cast - 0.36 * q.fire + 0.1 * Math.sin(q.beat) * q.walk;
    jaw.rotation.x = 0.4 + 0.31 * q.cast + 0.36 * q.fire + 0.04 * Math.sin(q.time * 3);
  };
}
function dragon(r) {
  const { root, joint, add, glow } = r,
    body = joint(root, 0, 1.72, -0.26),
    head = joint(body, 0, 0.4, 0.8),
    lower = joint(head, 0, -0.16, 0.28),
    wings = [],
    legs = [],
    tail = [];
  add(
    body,
    ov('#387bab', 0, 0.09, -0.08, 0.65, 0.59, 1.1),
    ov('#a4d6df', 0, -0.18, 0.12, 0.48, 0.35, 0.8),
    ov('#397aa7', 0, 0.3, 0.58, 0.45, 0.49, 0.64),
  );
  add(
    head,
    ov('#599fc2', 0, 0.11, 0.14, 0.46, 0.39, 0.61),
    ov('#92cbd6', 0, -0.01, 0.5, 0.38, 0.2, 0.47),
    ov('#296382', 0, -0.14, 0.58, 0.35, 0.1, 0.38),
  );
  add(lower, ov('#b1e3e3', 0, -0.12, 0.3, 0.31, 0.12, 0.34));
  teeth(r, head, 0.76, 0.53, -0.11, 5);
  for (const s of [-1, 1]) {
    add(
      head,
      horn(
        '#e1f3e6',
        [
          [s * 0.28, 0.27, 0],
          [s * 0.45, 0.58, -0.24],
          [s * 0.48, 0.72, -0.51],
        ],
        [0.13, 0.085, 0.006],
      ),
      horn(
        '#80d5e1',
        [
          [s * 0.27, 0.07, -0.08],
          [s * 0.54, 0.17, -0.25],
          [s * 0.66, 0.22, -0.47],
        ],
        [0.14, 0.08, 0.01],
      ),
    );
    const arm = joint(body, s * 0.39, 0.32, 0.04),
      elbow = joint(arm, s * 0.76, 0.72, -0.26);
    add(
      arm,
      horn(
        '#5296b7',
        [
          [0, 0, 0],
          [s * 0.38, 0.26, -0.08],
          [s * 0.76, 0.72, -0.26],
        ],
        [0.18, 0.12, 0.095],
      ),
      membrane(
        [
          [0, 0, 0],
          [s * 0.76, 0.72, -0.26],
          [s * 0.82, 0.08, 0.74],
          [s * 0.14, -0.08, 0.47],
        ],
        ['#4a9fc7', '#8ddfe5', '#3b81b0', '#306d9c'],
      ),
    );
    const fingers = [
      [s * 0.98, 0.33, -0.32],
      [s * 1.2, -0.005, 0.18],
      [s * 1.16, -0.36, 0.77],
      [s * 0.78, -0.62, 1.05],
      [s * 0.4, -0.66, 0.98],
    ];
    for (let i = 0; i < fingers.length - 1; i++) {
      const a = fingers[i],
        b = fingers[i + 1];
      add(
        elbow,
        flightPanel(a, b, s),
        horn(
          '#d0ecdc',
          [[0, 0, 0], [a[0] * 0.56, a[1] * 0.58 + 0.05, a[2] * 0.47], a],
          [0.055, 0.042, 0.009],
        ),
      );
    }
    add(
      elbow,
      horn('#c5e8df', [[0, 0, 0], fingers[fingers.length - 1]], [0.046, 0.008]),
      horn(
        '#b2e8e2',
        [
          [0, 0, 0],
          [s * 0.09, 0.12, 0.1],
          [s * 0.12, 0.16, 0.22],
        ],
        [0.08, 0.05, 0.004],
      ),
    );
    wings.push({ arm, elbow, s });
    for (const z of [-0.57, 0.41]) {
      const leg = joint(body, s * 0.37, -0.23, z);
      add(
        leg,
        horn(
          '#407ea5',
          [
            [0, 0, 0],
            [s * 0.12, -0.32, 0.05],
            [s * 0.14, -0.49, 0.23],
          ],
          [0.15, 0.095, 0.069],
        ),
      );
      for (const j of [-1, 0, 1])
        add(
          leg,
          horn(
            '#dcebd5',
            [
              [s * 0.14, -0.49, 0.23],
              [s * 0.15 + j * 0.09, -0.57, 0.38],
            ],
            [0.053, 0.006],
          ),
        );
      legs.push({ leg, s, z });
    }
  }
  for (const s of [-1, 1])
    add(
      head,
      horn(
        '#4b92af',
        [
          [s * 0.11, 0.24, 0.55],
          [s * 0.31, 0.32, 0.47],
          [s * 0.48, 0.39, 0.21],
        ],
        [0.052, 0.095, 0.021],
      ),
    );
  eyes(r, head, 0.315, 0.14, 0.54, '#f9c45b');
  let parent = body;
  for (let i = 0; i < 5; i++) {
    const g = joint(parent, 0, i ? -0.015 : 0, i ? -0.33 : -0.83),
      rad = 0.28 - i * 0.042;
    add(
      g,
      horn(
        '#4789ad',
        [
          [0, 0, 0.06],
          [0, -0.025, -0.27],
          [0, 0.01, -0.4],
        ],
        [rad, rad * 0.8, rad * 0.64],
      ),
      gem('#acdfe4', 0, rad * 0.59, -0.16, 0.065, 0.17 - i * 0.014),
    );
    tail.push(g);
    parent = g;
  }
  for (let i = 0; i < 4; i++) {
    const z = 0.47 - i * 0.28;
    add(
      body,
      scute(i % 2 ? '#68b4d3' : '#559fc9', '#d1eef0', 0, 0.48, z, 0.39 - i * 0.035, 0.13, 0.26),
    );
  }
  add(head, scute('#4085a8', '#a9dce8', 0, 0.15, 0.52, 0.28, 0.12, 0.4, E(0.17)));
  for (const side of [-1, 1]) {
    add(
      head,
      horn(
        '#316785',
        [
          [side * 0.16, 0.22, 0.63],
          [side * 0.34, 0.29, 0.52],
          [side * 0.48, 0.36, 0.22],
        ],
        [0.06, 0.1, 0.012],
        11,
      ),
      horn(
        '#f6f2df',
        [
          [side * 0.25, -0.045, 0.72],
          [side * 0.28, -0.17, 0.85],
          [side * 0.25, -0.28, 0.86],
        ],
        [0.066, 0.039, 0.005],
        10,
      ),
    );
  }
  add(head, gem('#b8eef8', 0, 0.38, 0.1, 0.14, 0.44));
  const fan = tail[tail.length - 1];
  for (const side of [-1, 1]) {
    add(
      fan,
      membrane(
        [
          [0, 0.03, -0.11],
          [side * 0.29, 0.12, -0.32],
          [side * 0.35, 0.1, -0.63],
          [0, -0.02, -0.49],
        ],
        ['#bbeffd', '#2689ae', '#b2eff7', '#246c98'],
      ),
    );
    add(
      fan,
      horn(
        '#daeff3',
        [
          [0, 0.05, -0.1],
          [side * 0.22, 0.12, -0.33],
          [side * 0.35, 0.1, -0.63],
        ],
        [0.06, 0.035, 0.006],
        10,
      ),
    );
    add(
      head,
      scute(
        '#57a6ca',
        '#b4edf1',
        side * 0.31,
        0.27,
        0.12,
        0.2,
        0.105,
        0.31,
        E(0.16, 0, -side * 0.25),
      ),
    );
  }
  for (const { arm, elbow, s } of wings) {
    add(
      arm,
      scute(
        '#3f8fba',
        '#d7f1e8',
        s * 0.39,
        0.27,
        -0.05,
        0.22,
        0.1,
        0.43,
        E(-0.03, s * 0.94, -s * 0.28),
      ),
    );
    add(
      elbow,
      horn(
        '#c1eafa',
        [
          [0, 0.04, 0.02],
          [s * 0.22, 0.22, 0.18],
          [s * 0.32, 0.33, 0.11],
        ],
        [0.1, 0.055, 0.005],
        10,
      ),
    );
  }
  for (let j = 0; j < 4; j++) add(body, gem('#d5ede7', 0, 0.5, 0.41 - j * 0.31, 0.084, 0.23));
  return (q) => {
    const flap = Math.sin(q.time * 4.9);
    body.position.y = 1.7 + 0.1 * flap * (1 - q.down) - 0.69 * q.down - 0.3 * q.cast;
    body.rotation.x = -0.13 * q.cast + 0.17 * q.fire + 0.18 * q.down;
    head.rotation.x = 0.1 * Math.sin(q.time * 2.4) + 0.32 * q.fire;
    lower.rotation.x = 0.08 + 0.36 * q.cast + 0.4 * q.fire;
    for (const { arm, elbow, s } of wings) {
      arm.rotation.z = s * (0.06 + 0.32 * flap * (1 - q.down) + 0.39 * q.cast - 0.65 * q.down);
      elbow.rotation.z = s * (0.21 * Math.sin(q.time * 4.9 - 0.85) * (1 - q.down) - 0.18 * q.fire);
      elbow.rotation.y = s * (0.12 + 0.12 * Math.sin(q.time * 4.9 - 0.6) + 0.7 * q.down);
    }
    for (const { leg, s, z } of legs)
      leg.rotation.x = 0.32 + 0.13 * Math.sin(q.beat + s + (z > 0 ? Math.PI : 0)) + 0.35 * q.air;
    tail.forEach((g, i) => (g.rotation.y = 0.16 * Math.sin(q.time * 3 - i * 0.6)));
  };
}
function furnace(r) {
  const { root, joint, add, glow } = r,
    body = joint(root, 0, 1.14, -0.17),
    legs = [],
    guns = [],
    iris = joint(body, 0, 0.14, 0.88);
  const iron = '#394955',
    armour = '#8a4239',
    bronze = '#d09253',
    dark = '#27313d',
    hot = '#ffc669';
  add(
    body,
    ov(dark, 0, 0.0, -0.06, 0.99, 0.63, 1.15),
    ov(armour, 0, 0.24, -0.15, 1.06, 0.68, 1.08),
  );
  for (let i = 0; i < 3; i++) {
    add(
      body,
      cy(
        i === 1 ? bronze : iron,
        0,
        0.6 + i * 0.13,
        -0.22,
        0.71 - i * 0.075,
        0.74 - i * 0.073,
        0.15,
      ),
      ring('#c4874f', 0, 0.65 + i * 0.13, -0.22, 0.705 - i * 0.072, 0.043, E(Math.PI / 2)),
    );
  }
  add(body, cy(dark, 0, 0.98, -0.22, 0.48, 0.56, 0.11));
  glow(body, cy('#ff9642', 0, 1.035, -0.22, 0.414, 0.414, 0.035));
  for (let j = -2; j <= 2; j++)
    add(body, bx(iron, j * 0.14, 1.07, -0.22, 0.052, 0.04, 0.66 - 0.09 * Math.abs(j), 0.014));
  add(
    iris,
    cy(dark, 0, 0, 0.1, 0.54, 0.54, 0.27, E(Math.PI / 2)),
    ring(bronze, 0, 0, 0.265, 0.48, 0.077),
  );
  glow(
    iris,
    ov('#ff8235', 0, 0, 0.245, 0.39, 0.39, 0.105),
    ov('#ffe395', 0, 0, 0.326, 0.17, 0.17, 0.054),
  );
  for (let i = 0; i < 8; i++) {
    const a = (i * TAU) / 8;
    add(
      iris,
      bx(
        iron,
        Math.cos(a) * 0.32,
        Math.sin(a) * 0.32,
        0.35,
        0.24,
        0.066,
        0.053,
        0.016,
        E(0, 0, a + 0.32),
      ),
    );
  }
  for (const s of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const z = 0.62 - i * 0.45,
        knee = [s * (0.5 + Math.sin((i * Math.PI) / 3) * 0.12), 0.39, z * 0.42],
        end = [s * (0.9 + Math.sin((i * Math.PI) / 3) * 0.18), -0.75, z * 0.78];
      legs.push({
        ...legSet(
          r,
          body,
          [s * 0.75, -0.06, z],
          [knee, end, [end[0] + s * 0.16, -1.04, end[2] + 0.27]],
          [iron, armour, bronze],
          true,
        ),
        s,
        phase: i * 1.5 + (s < 0 ? Math.PI : 0),
      });
    }
    const g = joint(body, s * 0.74, 0.56, -0.25);
    guns.push({ g, s });
    add(
      g,
      cy(iron, 0, 0.28, 0, 0.245, 0.265, 0.76, E(0.26)),
      cy(bronze, 0, 0.62, 0.095, 0.258, 0.26, 0.13, E(0.26)),
      cy(dark, 0, 0.72, 0.118, 0.22, 0.22, 0.1, E(0.26)),
      ring('#e4a361', 0, 0.78, 0.132, 0.232, 0.045, E(Math.PI / 2 + 0.26)),
      pipe(
        bronze,
        [
          [s * 0.17, 0.0, -0.1],
          [s * 0.27, 0.28, -0.12],
          [s * 0.2, 0.46, -0.06],
        ],
        0.05,
      ),
    );
    glow(g, ov(hot, 0, 0.742, 0.13, 0.142, 0.042, 0.14));
    add(body, bx(armour, s * 0.76, 0.3, 0.45, 0.47, 0.43, 0.52, 0.1, E(0, s * 0.16, -s * 0.25)));
    for (let j = 0; j < 3; j++)
      glow(
        body,
        bx(
          '#ffa64f',
          s * (0.67 + j * 0.075),
          0.31,
          0.72,
          0.036,
          0.18,
          0.033,
          0.007,
          E(0, 0, -s * 0.18),
        ),
      );
  }
  for (const side of [-1, 1]) add(iris, bx(iron, side * 0.142, 0, 0.37, 0.066, 0.46, 0.06, 0.023));
  glow(iris, ov('#ffe295', 0, 0, 0.391, 0.061, 0.236, 0.034));
  const turbine = joint(body, 0, 1.11, -0.22);
  add(turbine, cy(bronze, 0, 0.01, 0, 0.094, 0.116, 0.06));
  for (let i = 0; i < 6; i++) {
    const angle = (i * TAU) / 6;
    add(
      turbine,
      scute(
        '#5b6970',
        '#dda064',
        0.21 * Math.sin(angle),
        0,
        0.21 * Math.cos(angle),
        0.085,
        0.042,
        0.17,
        E(0, angle + 0.61, 0.13),
      ),
    );
  }
  for (const { g, s } of guns) {
    for (let i = 0; i < 3; i++)
      add(
        g,
        ring('#be8451', 0, 0.39 + i * 0.083, 0.04 + i * 0.022, 0.253, 0.018, E(Math.PI / 2 + 0.26)),
      );
    add(
      body,
      scute('#a64b36', '#d8944f', s * 0.7, 0.65, 0.43, 0.4, 0.17, 0.4, E(0.05, s * 0.2, -s * 0.42)),
    );
  }
  return (q) => {
    const both = q.slamHand === 2;
    turbine.rotation.y = q.time * 2.8 + q.cast * 1.2 + q.fire * 0.7 + q.raise * 3.2;
    body.position.y = 1.14 + 0.066 * q.bob + 0.34 * q.raise - 0.48 * q.strike - 0.15 * q.cast - 0.42 * q.down;
    body.rotation.z = 0.042 * q.stride + 0.21 * q.down + q.knock * Math.sin(q.time * 25) * 0.16;
    body.rotation.x = -0.32 * q.raise + 0.42 * q.strike - 0.34 * q.knock;
    iris.rotation.z = 0.14 * q.time + 0.67 * q.cast + 1.4 * q.raise;
    legs.forEach(({ g, shank, s, phase }, idx) => {
      const a = q.beat + phase;
      const frontPair = idx % 4 === 0;
      const activeFront = frontPair && (both || (s < 0 ? q.slamHand === 0 : q.slamHand === 1));
      g.rotation.y = s * 0.22 * Math.sin(a) * q.walk;
      g.rotation.x = activeFront ? -0.95 * q.raise + 0.52 * q.strike : -0.35 * q.knock;
      shank.rotation.z =
        s *
        (0.25 * Math.max(0, Math.cos(a)) * q.walk +
          0.36 * q.down +
          (activeFront ? -0.55 * q.raise + 0.42 * q.strike : 0) +
          0.25 * q.knock);
    });
    guns.forEach(({ g, s }) => {
      const active = both || (s < 0 ? q.slamHand === 0 : q.slamHand === 1);
      g.rotation.x =
        0.22 + 0.54 * q.cast - 0.34 * q.fire - (active ? 0.95 * q.raise - 0.78 * q.strike : 0) - 0.5 * q.knock;
      g.rotation.z = s * (0.18 + 0.12 * q.down + 0.24 * q.knock);
      g.position.y = 0.56 - 0.14 * q.fire + (active ? 0.18 * q.raise - 0.18 * q.strike : 0);
    });
  };
}
// High points of the moving sculpts in road space: height, depth, half-span.
export const creatureCrowns = {
  diver: [[2.86, -0.93, 0.74]],
  warden: [
    [2.85, -0.79, 0.52],
    [3.5, 2.1, 0.45],
  ],
  drill: [
    [3.18, 0.69, 0.56],
    [2.38, -0.83, 0.54],
  ],
  kestrel: [
    [3.6, -0.8, 1.85],
    [3.3, 0.35, 0.44],
  ],
  engine: [
    [2.77, -0.49, 0.8],
    [2.29, -1.2, 0.44],
  ],
};
const creatureScale = { diver: 1.08, warden: 1.19, drill: 1.03, kestrel: 1.05, engine: 1.09 };
const sculpt = { diver: crab, warden: rhino, drill: wyrm, kestrel: dragon, engine: furnace };
export function createCreatureBosses(parent, paint) {
  const cache = new Map();
  let current;
  return function animate(kind, pose) {
    if (current !== kind) {
      const previous = cache.get(current);
      if (previous) {
        if (previous.root) previous.root.visible = false;
        if (previous.portrait) previous.portrait.mesh.visible = false;
      }
      if (sculpt[kind] && !cache.has(kind)) cache.set(kind, {});
      current = kind;
    }
    const active = cache.get(kind);
    if (!active) return false;
    const texture = paint.get(kind);
    const illustrated = pose.mode === 'ai' && texture;
    const beat = pose.march * 4.35;
    const knock = smoothRange(pose.defeat, 0, 0.08) * (1 - smoothRange(pose.defeat, 0.82, 0.96));
    const down = THREE.MathUtils.smoothstep(pose.defeat, 0.84, 1.38);
    const atkW = pose.attack > 0 ? 1 - smoothRange(pose.defeat, 0, 0.15) : 0;
    const raise = atkW * slamRaiseWeight(pose.attack);
    const strike = atkW * slamDownWeight(pose.attack);
    if (illustrated) {
      if (!active.portrait) {
        active.portrait = createSculptedPaint(kind, texture);
        parent.add(active.portrait.mesh);
      }
      if (active.root) active.root.visible = false;
      active.portrait.mesh.visible = true;
      active.portrait.pose({ ...pose, down });
      return true;
    }
    if (!active.root) {
      const r = rig();
      active.sample = sculpt[kind](r);
      r.finish();
      active.root = r.root;
      parent.add(r.root);
    }
    if (!active.paintState && texture)
      active.paintState = coatModel(active.root, texture, shell, kind);
    if (active.portrait) active.portrait.mesh.visible = false;
    active.root.visible = true;
    active.root.scale.setScalar(creatureScale[kind]);
    if (active.paintState) active.paintState.value = Math.max(0, pose.hit, knock * 0.72);
    const air =
      Math.sin(Math.PI * THREE.MathUtils.clamp((pose.vault - 0.21) / 0.89, 0, 1)) +
      (pose.slamHand === 2 && pose.attack > 0
        ? Math.sin(Math.PI * smoothRange(pose.attack, 0.16, 0.62))
        : 0);
    active.sample({
      time: pose.time,
      beat,
      walk: pose.walk * (1 - down) * (1 - 0.75 * atkW) + knock * 0.6,
      stride: Math.sin(beat) * pose.walk * (1 - down),
      bob: (0.5 - 0.5 * Math.cos(beat * 2)) * pose.walk,
      down,
      knock,
      raise,
      strike,
      slamHand: pose.slamHand || 0,
      air,
      cast: pose.charge || 0,
      fire: pose.release || 0,
    });
    return true;
  };
}
