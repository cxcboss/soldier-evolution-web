import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const ROAD_WIDTH = 13.2;
const NEAR = 14;
const FAR = -110;
const LENGTH = NEAR - FAR;
const MIDPOINT = (NEAR + FAR) / 2;
const GATE_TILT = -0.18;

function block(w, h, d, bevel = 0) {
  return bevel ? new RoundedBoxGeometry(w, h, d, 1, bevel) : new THREE.BoxGeometry(w, h, d);
}

function part(geometry, tint, x, y, z, rotation = null) {
  const flat = geometry.index ? geometry.toNonIndexed() : geometry;
  if (flat !== geometry) geometry.dispose();
  flat.deleteAttribute('uv');
  if (rotation) flat.applyQuaternion(new THREE.Quaternion().setFromEuler(rotation));
  flat.translate(x, y, z);
  const color = new THREE.Color(tint);
  const count = flat.getAttribute('position').count;
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < colors.length; i += 3) color.toArray(colors, i);
  flat.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return flat;
}

function combine(pieces) {
  const joined = mergeGeometries(pieces, false);
  for (const piece of pieces) piece.dispose();
  return joined;
}

function makeDeckTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');
  const pixels = ctx.createImageData(canvas.width, canvas.height);
  let seed = 941;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
      const grain = (seed / 4294967296 - 0.5) * 3;
      const edge = Math.min(x, canvas.width - 1 - x);
      const shade = grain - Math.max(0, 1 - edge / 4) * 12;
      const index = (y * canvas.width + x) * 4;
      pixels.data[index] = 189 + shade;
      pixels.data[index + 1] = 179 + shade;
      pixels.data[index + 2] = 188 + shade;
      pixels.data[index + 3] = 255;
    }
  }
  ctx.putImageData(pixels, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.y = LENGTH / 8;
  return texture;
}

function makeRoad(group) {
  const texture = makeDeckTexture();
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(ROAD_WIDTH, LENGTH),
    new THREE.MeshLambertMaterial({ map: texture }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, MIDPOINT);
  floor.receiveShadow = true;
  group.add(floor);

  const trim = [part(block(ROAD_WIDTH + 0.13, 0.38, LENGTH), '#535568', 0, -0.205, MIDPOINT)];
  for (const side of [-1, 1]) {
    const edge = (side * ROAD_WIDTH) / 2;
    trim.push(part(block(0.13, 0.19, LENGTH), '#7c7b8a', edge, 0.018, MIDPOINT));
    trim.push(part(block(0.095, 0.042, LENGTH), '#a6a1af', edge + side * 0.01, 0.121, MIDPOINT));
    trim.push(part(block(0.055, 0.22, LENGTH), '#444759', edge + side * 0.074, -0.14, MIDPOINT));
    trim.push(part(block(0.048, 0.022, LENGTH), '#8b8391', edge - side * 0.085, 0.006, MIDPOINT));
  }
  const edging = new THREE.Mesh(
    combine(trim),
    new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 18 }),
  );
  group.add(edging);
  return texture;
}

function makeSignTexture(type) {
  const merge = type === 'merge';
  const canvas = document.createElement('canvas');
  canvas.width = merge ? 512 : 384;
  canvas.height = 208;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, merge ? '#ffe749' : '#40afff');
  gradient.addColorStop(0.1, merge ? '#ffdd22' : '#269bfa');
  gradient.addColorStop(0.68, merge ? '#ffd419' : '#178cf0');
  gradient.addColorStop(1, merge ? '#efbb09' : '#1276d7');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
  const label = merge ? '升炮' : '+1';
  const fontSize = merge ? 122 : 147;
  ctx.font = `900 ${fontSize}px "Arial Rounded MT Bold", "Arial Black", "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const metrics = ctx.measureText(label);
  const baseline = h / 2 + (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
  ctx.translate(w / 2, baseline + 1);
  ctx.scale(Math.min(1.25, (w * (merge ? 0.8 : 0.63)) / metrics.width), 1);
  ctx.lineWidth = merge ? 15 : 18;
  ctx.strokeStyle = '#17212b';
  ctx.strokeText(label, 0, 0);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, 0, 0);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  return map;
}

// Soft-edged contact and directional shadows share the same instance transform as their board.
function castShadow(width, height) {
  const positions = [];
  const colors = [];
  function trapezoid(x, z, w, depth, shift, bottomOpacity, topOpacity, softness) {
    const half = w / 2;
    const outer = [
      [-half, 0],
      [half, 0],
      [half + shift, -depth],
      [-half + shift, -depth],
    ];
    const inner = [
      [-half + softness, -softness],
      [half - softness, -softness],
      [half + shift - softness, -depth + softness],
      [-half + shift + softness, -depth + softness],
    ];
    const corners = [...outer, ...inner];
    const alpha = [0, 0, 0, 0, bottomOpacity, bottomOpacity, topOpacity, topOpacity];
    const indices = [
      4, 5, 6, 4, 6, 7, 0, 1, 5, 0, 5, 4, 1, 2, 6, 1, 6, 5, 2, 3, 7, 2, 7, 6, 3, 0, 4, 3, 4, 7,
    ];
    for (const index of indices) {
      const p = corners[index];
      positions.push(x + p[0], 0.008, z + p[1]);
      colors.push(1, 1, 1, alpha[index]);
    }
  }
  trapezoid(0, 0.1, width * 1.01, height * 0.87, height * 0.92, 0.32, 0.22, 0.045);
  trapezoid(0, 0.17, width + 0.06, 0.32, 0.028, 0.2, 0.16, 0.07);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
  return geometry;
}

function gateBatch(group, type, shadowMaterial) {
  const merge = type === 'merge';
  const w = merge ? 2.65 : 1.82;
  const h = merge ? 1.03 : 0.91;
  const depth = 0.17;
  const shell = merge ? '#ffd526' : '#2095ef';
  const sideTrim = merge ? '#e8aa10' : '#1e76ce';
  const highlight = merge ? '#ffe663' : '#55b4ff';
  const feet = [];
  const panels = [part(block(w - 0.1, h, depth, 0.047), shell, 0, h / 2, 0)];
  for (const sign of [-1, 1]) {
    const x = sign * (w / 2 - 0.046);
    panels.push(part(block(0.085, h + 0.087, 0.205), highlight, x, h / 2 + 0.021, 0));
    feet.push(part(block(0.16, 0.115, 0.33), sideTrim, x, 0.057, 0.058));
  }
  panels.push(part(block(w - 0.16, 0.047, 0.123), highlight, 0, h - 0.012, -0.003));
  const inclined = combine(panels);
  inclined.rotateX(GATE_TILT);
  inclined.translate(0, 0.059, 0.015);
  const shellGeometry = combine([inclined, ...feet]);
  const face = new THREE.PlaneGeometry(w - 0.19, h - 0.086);
  face.translate(0, h / 2 + 0.007, depth / 2 + 0.004);
  face.rotateX(GATE_TILT);
  face.translate(0, 0.059, 0.015);
  const geometries = [shellGeometry, face, castShadow(w, h)];
  const materials = [
    new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 52, specular: 0x635b61 }),
    new THREE.MeshBasicMaterial({ map: makeSignTexture(type), toneMapped: false }),
    shadowMaterial,
  ];
  let capacity = 128;
  let meshes;
  const transform = new THREE.Matrix4();
  function allocate(nextCapacity) {
    if (meshes) {
      for (const mesh of meshes) {
        group.remove(mesh);
        mesh.dispose();
      }
    }
    capacity = nextCapacity;
    meshes = geometries.map((geometry, i) => {
      const mesh = new THREE.InstancedMesh(geometry, materials[i], capacity);
      mesh.count = 0;
      mesh.frustumCulled = false;
      if (i === 2) mesh.renderOrder = 1;
      group.add(mesh);
      return mesh;
    });
    meshes[0].instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    for (const mesh of meshes.slice(1)) mesh.instanceMatrix = meshes[0].instanceMatrix;
  }
  allocate(capacity);
  return (gates) => {
    // Size against the visible records, so long courses can stream an arbitrary number of gates.
    let visible = 0;
    for (const gate of gates)
      if ((gate.active || gate.pop<.28) && gate.type === type && gate.z >= FAR && gate.z < NEAR) visible++;
    if (visible > capacity) allocate(THREE.MathUtils.ceilPowerOfTwo(visible));
    let index = 0;
    for (const gate of gates) {
      if ((!gate.active && !(gate.pop<.28)) || gate.type !== type || gate.z < FAR || gate.z >= NEAR) continue;
      const t=gate.active?0:gate.pop/.28;
      const size=(1+.24*Math.sin(Math.PI*t))*(1-t*t);
      transform.makeScale(size,size*(1+.18*Math.sin(t*Math.PI)),size);
      transform.setPosition(gate.x+(.22*(gate.x<0?1:-1))*t, Math.sin(t*Math.PI)*.38,gate.z);
      meshes[0].setMatrixAt(index++, transform);
    }
    for (const mesh of meshes) mesh.count = index;
    meshes[0].instanceMatrix.needsUpdate = index > 0;
  };
}

function embossed(points, depth) {
  const outline = new THREE.Shape();
  points.forEach(([x, y], i) => (i ? outline.lineTo(x, y) : outline.moveTo(x, y)));
  outline.closePath();
  return new THREE.ExtrudeGeometry(outline, {
    depth,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.033,
    bevelThickness: 0.03,
    steps: 1,
  });
}

const FRACTURES = [
  [
    [
      [-0.72, 1.01],
      [-1.01, 1.09],
      [-1.19, 1.01],
      [-1.41, 1.17],
    ],
    [
      [-1.01, 1.09],
      [-0.93, 1.24],
      [-1.02, 1.39],
      [-0.89, 1.56],
    ],
    [
      [-1.19, 1.01],
      [-1.32, 0.86],
      [-1.51, 0.81],
    ],
  ],
  [
    [
      [-1.41, 1.17],
      [-1.59, 1.12],
      [-1.74, 1.22],
      [-1.96, 1.2],
    ],
    [
      [-0.72, 1.01],
      [-0.83, 0.82],
      [-0.69, 0.66],
      [-0.72, 0.53],
      [-0.51, 0.31],
      [-0.58, 0.15],
    ],
    [
      [0.48, 1.18],
      [0.65, 1.33],
      [0.82, 1.36],
      [0.95, 1.56],
    ],
    [
      [0.65, 1.33],
      [0.72, 1.08],
      [0.98, 0.68],
      [1.19, 0.63],
      [1.38, 0.43],
    ],
  ],
  [
    [
      [0.98, 0.68],
      [1.21, 0.88],
      [1.41, 0.8],
      [1.63, 0.97],
      [1.9, 0.9],
    ],
    [
      [1.19, 0.63],
      [1.1, 0.42],
      [1.2, 0.31],
      [1.12, 0.12],
    ],
    [
      [-0.72, 0.53],
      [-1.03, 0.51],
      [-1.21, 0.37],
      [-1.47, 0.4],
    ],
    [
      [-1.02, 1.39],
      [-1.29, 1.42],
      [-1.46, 1.56],
    ],
  ],
];

function crackGeometry(paths) {
  const pieces = [];
  for (const path of paths) {
    for (let i = 1; i < path.length; i++) {
      const [ax, ay] = path[i - 1];
      const [bx, by] = path[i];
      const length = Math.hypot(bx - ax, by - ay) + 0.018;
      const angle = new THREE.Euler(0, 0, Math.atan2(by - ay, bx - ax));
      const size = i === 1 ? 0.039 : 0.031;
      pieces.push(
        part(
          new THREE.PlaneGeometry(length, size),
          '#302e39',
          (ax + bx) / 2,
          (ay + by) / 2,
          0.227,
          angle,
        ),
      );
      pieces.push(
        part(
          new THREE.PlaneGeometry(length, size * 0.38),
          '#e3dee1',
          (ax + bx) / 2,
          (ay + by) / 2 + size * 0.41,
          0.229,
          angle,
        ),
      );
    }
  }
  return combine(pieces);
}

function makeWall(group, shadowMaterial) {
  const root = new THREE.Group();
  group.add(root);
  const w = 4.28,
    h = 1.65;
  const pieces = [part(block(w - 0.08, h - 0.08, 0.39, 0.057), '#61616d', 0, h / 2, 0)];
  for (const side of [-1, 1]) {
    const x = side * (w / 2 - 0.085);
    pieces.push(part(block(0.165, h, 0.47, 0.038), '#858493', x, h / 2, 0));
    pieces.push(part(block(0.14, h - 0.12, 0.032), '#9998a4', x, h / 2, 0.228));
    for (const y of [0.15, h - 0.16]) {
      const rot = new THREE.Euler(Math.PI / 2, 0, 0);
      pieces.push(
        part(new THREE.CylinderGeometry(0.074, 0.074, 0.023, 10), '#40414e', x, y, 0.254, rot),
      );
      pieces.push(
        part(new THREE.CylinderGeometry(0.052, 0.061, 0.032, 6), '#a9a8af', x, y, 0.273, rot),
      );
    }
  }
  for (const y of [0.084, h - 0.079])
    pieces.push(part(block(w - 0.28, 0.11, 0.43, 0.019), '#898795', 0, y, 0));
  const plus = [
    [-0.39, 0.105],
    [-0.11, 0.105],
    [-0.11, 0.37],
    [0.11, 0.37],
    [0.11, 0.105],
    [0.39, 0.105],
    [0.39, -0.105],
    [0.11, -0.105],
    [0.11, -0.37],
    [-0.11, -0.37],
    [-0.11, -0.105],
    [-0.39, -0.105],
  ];
  const one = [
    [-0.24, 0.26],
    [0.025, 0.43],
    [0.23, 0.43],
    [0.23, -0.43],
    [-0.015, -0.43],
    [-0.015, 0.16],
    [-0.17, 0.075],
  ];
  pieces.push(part(embossed(plus, 0.115), '#a6a4ab', -0.34, 0.81, 0.206));
  pieces.push(part(embossed(one, 0.115), '#afacb3', 0.42, 0.83, 0.206));
  const metal = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 36,
    specular: 0x686571,
    emissive: 0xfff5ed,
    emissiveIntensity: 0,
  });
  root.add(new THREE.Mesh(combine(pieces), metal));
  const shadow = new THREE.Mesh(castShadow(w, h), shadowMaterial);
  shadow.renderOrder = 1;
  root.add(shadow);
  const crackMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });
  const cracks = FRACTURES.map((paths) => {
    const mesh = new THREE.Mesh(crackGeometry(paths), crackMaterial);
    root.add(mesh);
    return mesh;
  });
  return (wall) => {
    root.visible = Boolean(wall && wall.hp > 0 && wall.z >= FAR && wall.z < NEAR);
    if (!root.visible) return;
    root.position.set(wall.x, 0, wall.z);
    const fraction = wall.hp / Math.max(1, wall.maxHp);
    metal.emissiveIntensity = Math.sqrt(THREE.MathUtils.clamp(wall.flash || 0, 0, 1)) * 0.82;
    cracks[0].visible = fraction < 0.93;
    cracks[1].visible = fraction <= 0.67;
    cracks[2].visible = fraction <= 0.36;
  };
}

export function createCourseArt(scene) {
  const root = new THREE.Group();
  root.name = 'Course';
  scene.add(root);
  const deck = makeRoad(root);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x30324b,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
  const mergeGates = gateBatch(root, 'merge', shadowMaterial);
  const plusGates = gateBatch(root, 'plus', shadowMaterial);
  const updateWall = makeWall(root, shadowMaterial);
  return {
    update({ distance = 0, gates = [], wall }) {
      deck.offset.y = (distance / 8) % 1;
      mergeGates(gates);
      plusGates(gates);
      updateWall(wall);
    },
    dispose() {
      const geometries = new Set();
      const materials = new Set();
      const maps = new Set();
      root.traverse((mesh) => {
        if (!mesh.isMesh) return;
        geometries.add(mesh.geometry);
        materials.add(mesh.material);
        if (mesh.material.map) maps.add(mesh.material.map);
        if (mesh.isInstancedMesh) mesh.dispose();
      });
      root.removeFromParent();
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      for (const map of maps) map.dispose();
    },
  };
}
