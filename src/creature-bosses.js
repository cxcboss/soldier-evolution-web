import * as THREE from 'three';
import { coatModel, createPaintedBoss, createSculptedPaint } from './creature-paint.js';
import { block, part, combine, strut } from './scenery-mesh.js';

const V = (a) => new THREE.Vector3(...a);
const E = (x = 0, y = 0, z = 0) => new THREE.Euler(x, y, z);
const TAU = Math.PI * 2;
const shell = new THREE.MeshPhongMaterial({
  vertexColors: true,
  shininess: 35,
  specular: 0x635a56,
  side: THREE.DoubleSide,
});
const luminous = new THREE.MeshBasicMaterial({
  vertexColors: true,
  toneMapped: false,
  side: THREE.DoubleSide,
});
const ov = (c, x, y, z, a, b, d, rot = null) => {
  const g = new THREE.SphereGeometry(1, 28, 16);
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
function gem(c, x, y, z, r, h, tilt = 0) {
  const g = new THREE.CylinderGeometry(0.035, r, h, 5, 1);
  g.translate(0, h / 2, 0);
  return part(g, c, x, y, z, E(0, 0.2, tilt));
}
function rig() {
  const groups = [];
  function joint(parent, x = 0, y = 0, z = 0) {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    parent?.add(g);
    g.userData.geometry = [];
    g.userData.light = [];
    groups.push(g);
    return g;
  }
  const root = joint(null);
  const add = (g, ...geo) => g.userData.geometry.push(...geo);
  const glow = (g, ...geo) => g.userData.light.push(...geo);
  function finish() {
    for (const g of groups) {
      for (const [k, mat] of [
        ['geometry', shell],
        ['light', luminous],
      ]) {
        const pieces = g.userData[k];
        if (pieces.length) g.add(new THREE.Mesh(combine(pieces), mat));
        delete g.userData[k];
      }
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
  return (q) => {
    body.position.y = 1.04 + q.bob * 0.08 - q.down * 0.29;
    body.rotation.z = q.stride * 0.044 + q.down * 0.18;
    body.rotation.x = -q.cast * 0.14;
    legs.forEach(({ g, shank, phase, s }) => {
      const a = q.beat + phase;
      g.rotation.y = s * 0.25 * Math.sin(a) * q.walk;
      shank.rotation.z = s * (Math.max(0, Math.cos(a)) * 0.28 * q.walk + q.down * 0.45);
    });
    claws.forEach(({ arm, palm, finger, s }) => {
      arm.rotation.x = -0.14 + 0.2 * q.stride * s - 0.55 * q.cast - 0.58 * q.air + 0.5 * q.down;
      palm.rotation.y = s * (0.43 - 0.31 * q.cast);
      finger.rotation.y = s * (0.17 + 0.37 * q.cast + 0.09 * Math.sin(q.time * 3));
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
        [0.08, 0.43, 1.13],
        [0.23, 0.82, 1.37],
        [0.35, 1.19, 1.4],
      ],
      [0.245, 0.181, 0.078, 0.004],
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
  return (q) => {
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
      [0.25, 2.04, 0.83, 0.71],
      [0.45, 1.52, 0.17, 0.77],
      [0.28, 1.05, -0.46, 0.68],
      [-0.32, 0.69, -0.91, 0.57],
      [-0.84, 0.53, -1.15, 0.48],
      [-1.22, 0.48, -0.87, 0.32],
      [-1.39, 0.57, -0.39, 0.2],
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
  return (q) => {
    segments.forEach((g, i) => {
      const [, y, z] = nodes[i];
      g.position.x = nodes[i][0] + Math.sin(q.beat * 0.68 - i * 0.71) * (0.13 + i * 0.044) * q.walk;
      g.position.y =
        y * (1 - 0.57 * q.down - 0.36 * q.cast) +
        Math.sin(q.beat * 0.63 - i * 0.73) * 0.074 * q.walk;
      g.position.z = z + i * 0.035 * q.cast;
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
      elbow = joint(arm, s * 0.75, 0.4, -0.12);
    add(
      arm,
      horn(
        '#5296b7',
        [
          [0, 0, 0],
          [s * 0.38, 0.16, 0.02],
          [s * 0.76, 0.39, -0.12],
        ],
        [0.18, 0.12, 0.095],
      ),
      membrane(
        [
          [0, 0, 0],
          [s * 0.76, 0.4, -0.12],
          [s * 0.68, 0.1, -0.93],
          [s * 0.14, -0.08, -0.76],
        ],
        ['#4a9fc7', '#8ddfe5', '#3b81b0', '#306d9c'],
      ),
    );
    const fingers = [
      [s * 1.13, 0.38, -0.3],
      [s * 1.23, 0.08, -0.72],
      [s * 0.97, -0.11, -1.0],
      [s * 0.4, -0.23, -0.99],
    ];
    for (let i = 0; i < 3; i++) {
      const a = fingers[i],
        b = fingers[i + 1],
        mid = a.map((v, j) => (v + b[j]) * 0.5);
      mid[0] *= 0.91;
      mid[1] += 0.045;
      mid[2] += 0.12;
      add(
        elbow,
        membrane([[0, 0, 0], a, mid, b], ['#9ee6e3', '#72c6df', '#348bb9', '#81cfe4']),
        horn(
          '#d0ecdc',
          [[0, 0, 0], [a[0] * 0.56, a[1] * 0.58 + 0.05, a[2] * 0.47], a],
          [0.055, 0.042, 0.009],
        ),
      );
    }
    add(
      elbow,
      horn('#c5e8df', [[0, 0, 0], fingers[3]], [0.046, 0.008]),
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
  for (let j = 0; j < 4; j++) add(body, gem('#d5ede7', 0, 0.5, 0.41 - j * 0.31, 0.084, 0.23));
  return (q) => {
    const flap = Math.sin(q.time * 4.9);
    body.position.y = 1.7 + 0.1 * flap * (1 - q.down) - 0.69 * q.down - 0.3 * q.cast;
    body.rotation.x = -0.13 * q.cast + 0.17 * q.fire + 0.18 * q.down;
    head.rotation.x = 0.1 * Math.sin(q.time * 2.4) + 0.32 * q.fire;
    lower.rotation.x = 0.08 + 0.36 * q.cast + 0.4 * q.fire;
    for (const { arm, elbow, s } of wings) {
      arm.rotation.z = s * (0.06 + 0.32 * flap * (1 - q.down) + 0.39 * q.cast - 0.65 * q.down);
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
  return (q) => {
    body.position.y = 1.14 + 0.066 * q.bob - 0.15 * q.cast - 0.42 * q.down;
    body.rotation.z = 0.042 * q.stride + 0.21 * q.down;
    iris.rotation.z = 0.14 * q.time + 0.67 * q.cast;
    legs.forEach(({ g, shank, s, phase }) => {
      const a = q.beat + phase;
      g.rotation.y = s * 0.22 * Math.sin(a) * q.walk;
      shank.rotation.z = s * (0.25 * Math.max(0, Math.cos(a)) * q.walk + 0.36 * q.down);
    });
    guns.forEach(({ g, s }) => {
      g.rotation.x = 0.17 + 0.4 * q.cast - 0.25 * q.fire;
      g.rotation.z = s * (0.18 + 0.12 * q.down);
      g.position.y = 0.56 - 0.14 * q.fire;
    });
  };
}
const sculpt = { diver: crab, warden: rhino, drill: wyrm, kestrel: dragon, engine: furnace };
export function createCreatureBosses(parent, paint) {
  const cache = new Map();
  let current;
  return function animate(kind, pose) {
    if (current !== kind) {
      const previous = cache.get(current);
      if (previous) {
        previous.root.visible = false;
        if (previous.volume) previous.volume.mesh.visible = previous.portrait.mesh.visible = false;
      }
      if (sculpt[kind] && !cache.has(kind)) {
        const r = rig(),
          sample = sculpt[kind](r);
        r.finish();
        parent.add(r.root);
        cache.set(kind, { root: r.root, sample });
      }
      current = kind;
    }
    const active = cache.get(kind);
    if (!active) return false;
    const texture = paint.get(kind);
    if (!active.volume && texture) {
      coatModel(active.root, texture, shell);
      active.volume = createSculptedPaint(kind, texture);
      active.portrait = createPaintedBoss(kind, texture);
      parent.add(active.volume.mesh, active.portrait.mesh);
    }
    const beat = pose.march * 4.35,
      down = THREE.MathUtils.smoothstep(pose.defeat, 0.12, 0.94);
    if (active.volume) {
      active.portrait.mesh.visible = pose.mode === 'ai';
      active.volume.mesh.visible = !active.portrait.mesh.visible;
      const reverse = THREE.MathUtils.smoothstep(down, 0.3, 0.92);
      active.root.visible = active.volume.mesh.visible && reverse > 0.01;
      active.root.scale.set(0.63 * reverse, 0.66 * reverse, 0.68 * reverse);
      active.root.position.set(0, 0.07, -0.95);
      const displayed = active.portrait.mesh.visible ? active.portrait : active.volume;
      displayed.pose({ ...pose, down });
    } else {
      active.root.visible = true;
      active.root.scale.setScalar(1);
      active.root.position.set(0, 0, 0);
    }
    if (!active.root.visible) return true;
    const air =
      Math.sin(Math.PI * THREE.MathUtils.clamp((pose.vault - 0.21) / 0.89, 0, 1)) +
      Math.sin(Math.PI * THREE.MathUtils.clamp((pose.attack - 0.23) / 0.65, 0, 1));
    active.sample({
      time: pose.time,
      beat,
      walk: pose.walk * (1 - down),
      stride: Math.sin(beat) * pose.walk * (1 - down),
      bob: (0.5 - 0.5 * Math.cos(beat * 2)) * pose.walk,
      down,
      air,
      cast: pose.charge || 0,
      fire: pose.release || 0,
    });
    return true;
  };
}
