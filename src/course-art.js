import * as THREE from 'three';
import { block, part, combine } from './scenery-mesh.js';
import { createTerrainArt } from './terrain-art.js';
import { landscapes } from './campaign.js';
import { cardWidth, supplies } from './supplies.js';
import { makeSignTexture } from './supply-art.js';

const ROAD_WIDTH = 13.2;
const NEAR = 14;
const FAR = -110;
const LENGTH = NEAR - FAR;
const MIDPOINT = (NEAR + FAR) / 2;
const GATE_TILT = -0.18;

function makeDeckTexture(theme) {
  const colors = landscapes[theme];
  const base = parseInt(colors.floor.slice(1), 16);
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');
  const pixels = ctx.createImageData(canvas.width, canvas.height);
  let seed = 941;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
      const grain = (seed / 4294967296 - 0.5) * 3.0;
      const edge = Math.min(x, canvas.width - 1 - x);
      const shade =
        grain + 0.7 * Math.cos(x * 0.069 + Math.sin(y * 0.049)) - Math.max(0, 1 - edge / 12) * 16;
      const index = (y * canvas.width + x) * 4;
      pixels.data[index] = (base >> 16) + shade;
      pixels.data[index + 1] = ((base >> 8) & 255) + shade;
      pixels.data[index + 2] = (base & 255) + shade;
      pixels.data[index + 3] = 255;
    }
  }
  ctx.putImageData(pixels, 0, 0);
  ctx.scale(2, 2);
  ctx.fillStyle = 'rgba(81,74,91,.13)';
  ctx.fillRect(0, 0, canvas.width, 1.5);
  ctx.fillStyle = 'rgba(249,243,249,.20)';
  ctx.fillRect(0, 2, canvas.width, 1);
  for (const x of [7, 249]) {
    for (const y of [9, 183]) {
      ctx.fillStyle = '#a59aa4';
      ctx.fillRect(x - 1, y - 1, 2.5, 2.5);
    }
  }
  const line = (x, y, xx, yy, color, w = 1) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xx, yy);
    ctx.stroke();
  };
  if (theme === 'quay') {
    // Concrete expansion joints and inset service grates stay at the shoulder.
    // Twin damp wheel marks give the slab depth without competing with drops.
    for (const x of [21, 63, 105, 149, 193, 235]) {
      const wash = ctx.createLinearGradient(x - 6, 0, x + 6, 0);
      wash.addColorStop(0, 'rgba(93,91,91,0)');
      wash.addColorStop(0.48, 'rgba(76,72,94,.043)');
      wash.addColorStop(1, 'rgba(93,91,91,0)');
      ctx.fillStyle = wash;
      ctx.fillRect(x - 6, 0, 12, 192);
    }
    line(0, 96, 256, 96, 'rgba(91,87,102,.18)', 1.05);
    line(0, 97.5, 256, 97.5, 'rgba(255,249,248,.24)');
    for (const [x, y] of [
      [6, 41],
      [246, 137],
    ]) {
      ctx.fillStyle = '#92909e';
      ctx.fillRect(x, y, 4.1, 13);
      for (let j = 1; j < 13; j += 2) line(x + 0.45, y + j, x + 3.7, y + j, '#6e7180', 0.72);
    }
    for (const [x, y] of [
      [28, 5],
      [112, 100],
      [228, 100],
    ]) {
      line(x, y, x + 3, y + 2, 'rgba(84,87,92,.24)', 0.75);
      line(x + 3, y + 2, x + 6, y + 1, 'rgba(84,87,92,.19)', 0.6);
    }
  } else if (theme === 'timber') {
    for (let i = 0; i < 8; i++) {
      let y = i * 24;
      line(0, y, 256, y, colors.joint, 1.35);
      line(0, y + 2, 256, y + 2, colors.rim, 0.7);
      for (let k = 0; k < 4; k++) {
        let x = (i * 41 + k * 71) % 244;
        ctx.strokeStyle = 'rgba(102,91,110,.15)';
        ctx.beginPath();
        ctx.moveTo(x, y + 12);
        ctx.bezierCurveTo(x + 13, y + 6, x + 17, y + 15, x + 38, y + 10);
        ctx.stroke();
      }
    }
  } else if (theme === 'forge') {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 4; j++) {
        let x = i * 85 + 7,
          y = j * 48 + 5;
        ctx.strokeStyle = colors.joint;
        ctx.strokeRect(x, y, 71, 35);
        for (let h = 0; h < 4; h++) line(x + 7 + h * 4, y + 26, x + 12 + h * 4, y + 19, '#9a99aa');
      }
  } else if (theme === 'quarry' || theme === 'cinder') {
    for (let j = 0; j < 4; j++) {
      let y = j * 48;
      line(0, y, 256, y + 1, colors.joint, 1.1);
      for (let i = 0; i < 4; i++) {
        let x = i * 76 + (j % 2) * 32;
        line(x, y, x + 2, y + 48, colors.joint);
      }
    }
  } else if (theme === 'ice') {
    for (let i = 0; i < 12; i++) {
      const x = (i * 63) % 249,
        y = (i * 47) % 175;
      line(x, y, x + 14, y + 13, '#d8dfe9', 1.4);
      line(x + 7, y + 7, x + 17, y + 6, '#adb9c9');
    }
  }
  // A thin gutter, metal join plates and inset reflectors define the deck
  // shoulder at phone scale; the two interior seams carry the lane markings.
  for (const side of [-1, 1]) {
    const x = side < 0 ? 1.6 : 250.6;
    ctx.fillStyle = 'rgba(46,55,64,.32)';
    ctx.fillRect(x, 0, 3.8, 192);
    ctx.fillStyle = 'rgba(228,224,237,.42)';
    ctx.fillRect(x + 0.7, 0, 0.8, 192);
    for (const y of [28, 125]) {
      ctx.fillStyle = '#737784';
      ctx.fillRect(x - 0.5, y, 5.2, 10);
      ctx.fillStyle = colors.rim;
      ctx.fillRect(x + 0.65, y + 2.1, 2.7, 3.7);
    }
  }
  for (const x of [256 / 3, 512 / 3]) {
    ctx.fillStyle = colors.line;
    ctx.fillRect(x - 1.45, 0, 2.9, 192);
    ctx.fillStyle = colors.rim;
    ctx.fillRect(x - 0.15, 0, .96, 192);
    for (let y = 7; y < 192; y += 48) {
      ctx.fillRect(x - 1.25, y, 2.5, 9);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  texture.repeat.y = LENGTH / 8;
  return texture;
}

function makeRoad(group, terrain) {
  const textures = new Map();
  let active;
  const texture = makeDeckTexture('quay');
  textures.set('quay', texture);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(ROAD_WIDTH, LENGTH, 1, 100),
    new THREE.MeshLambertMaterial({ map: texture }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, MIDPOINT);
  floor.receiveShadow = true;
  group.add(floor);

  const rail = (width, height) => new THREE.BoxGeometry(width, height, LENGTH, 1, 1, 100);
  const trim = [part(rail(ROAD_WIDTH + 0.13, 0.38), '#535568', 0, -0.205, MIDPOINT)];
  for (const side of [-1, 1]) {
    const edge = (side * ROAD_WIDTH) / 2;
    trim.push(part(rail(0.13, 0.19), '#7c7b8a', edge, 0.018, MIDPOINT));
    trim.push(part(rail(0.095, 0.042), '#a6a1af', edge + side * 0.01, 0.121, MIDPOINT));
    trim.push(part(rail(0.055, 0.22), '#444759', edge + side * 0.074, -0.14, MIDPOINT));
    trim.push(part(rail(0.048, 0.022), '#8b8391', edge - side * 0.085, 0.006, MIDPOINT));
  }
  const edging = new THREE.Mesh(
    combine(trim),
    new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 18 }),
  );
  group.add(edging);
  terrain.cutDeck(floor.material);
  terrain.cutDeck(edging.material);
  return (s) => {
    const theme = s.route.theme;
    if (!textures.has(theme)) textures.set(theme, makeDeckTexture(theme));
    if (active !== theme) {
      floor.material.map = textures.get(theme);
      active = theme;
    }
    floor.material.map.offset.y = (s.distance / 8) % 1;
  };
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
  const merge = supplies[type].tone === 'gold';
  const w = cardWidth;
  const h = 1.09;
  const depth = 0.17;
  const shell = merge ? '#efbf12' : '#217cde';
  const sideTrim = merge ? '#9c7a19' : '#245ba4';
  const highlight = merge ? '#ffec66' : '#83ceff';
  const feet = [];
  const panels = [part(block(w - 0.1, h, depth, 0.047), shell, 0, h / 2, 0)];
  for (const sign of [-1, 1]) {
    const x = sign * (w / 2 - 0.046);
    panels.push(part(block(0.085, h + 0.087, 0.205), highlight, x, h / 2 + 0.021, 0));
    feet.push(part(block(0.23, 0.13, 0.4, 0.035), sideTrim, x, 0.065, 0.058));
    panels.push(part(block(0.13, 0.19, 0.23, 0.027), sideTrim, x, h - 0.04, 0));
    panels.push(part(block(0.115, 0.044, 0.24), highlight, x, h - 0.09, 0));
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
    new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 52, specular: 0x676352 }),
    new THREE.MeshBasicMaterial({ map: makeSignTexture(type), toneMapped: false }),
    shadowMaterial,
  ];
  let capacity = 16;
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
  return (gates, retract) => {
    // Size against the visible records, so long courses can stream an arbitrary number of gates.
    let visible = 0;
    for (const gate of gates)
      if ((gate.active || gate.pop < 0.28) && gate.type === type && gate.z >= FAR && gate.z < NEAR)
        visible++;
    if (visible > capacity) allocate(THREE.MathUtils.ceilPowerOfTwo(visible));
    let index = 0;
    for (const gate of gates) {
      if (
        (!gate.active && !(gate.pop < 0.28)) ||
        gate.type !== type ||
        gate.z < FAR ||
        gate.z >= NEAR
      )
        continue;
      const t = gate.active ? 0 : gate.pop / 0.28;
      const size = (1 + 0.24 * Math.sin(Math.PI * t) + gate.flash * 0.065) * (1 - t * t);
      transform.makeScale(size, size * (1 - retract) * (1 + 0.18 * Math.sin(t * Math.PI)), size);
      transform.setPosition(
        gate.x + 0.22 * (gate.x < 0 ? 1 : -1) * t,
        Math.sin(t * Math.PI) * 0.38 - retract * 0.13,
        gate.z,
      );
      meshes[0].setMatrixAt(index++, transform);
    }
    for (const mesh of meshes) mesh.count = index;
    meshes[0].instanceMatrix.needsUpdate = index > 0;
  };
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
  const number = document.createElement('canvas');
  number.width = 256;
  number.height = 112;
  const ctx = number.getContext('2d');
  const numberMap = new THREE.CanvasTexture(number);
  numberMap.colorSpace = THREE.SRGBColorSpace;
  const numberPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 0.79),
    new THREE.MeshBasicMaterial({
      map: numberMap,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  numberPanel.position.set(0, 0.84, 0.253);
  root.add(numberPanel);
  let lastHp;
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
    const hp = Math.ceil(wall.hp);
    if (hp !== lastHp) {
      ctx.clearRect(0, 0, number.width, number.height);
      ctx.font = '900 102px "Arial Black",sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 9;
      ctx.strokeStyle = '#333340';
      ctx.strokeText(String(hp), 128, 60);
      ctx.fillStyle = '#f4edf0';
      ctx.fillText(String(hp), 128, 60);
      numberMap.needsUpdate = true;
      lastHp = hp;
    }
    const fraction = wall.hp / Math.max(1, wall.maxHp);
    metal.emissiveIntensity = Math.sqrt(THREE.MathUtils.clamp(wall.flash || 0, 0, 1)) * 0.35;
    cracks[0].visible = fraction < 0.93;
    cracks[1].visible = fraction <= 0.67;
    cracks[2].visible = fraction <= 0.36;
  };
}

export function createCourseArt(scene, curve) {
  const root = new THREE.Group();
  root.name = 'Course';
  scene.add(root);
  const terrain = createTerrainArt(root, curve);
  const updateRoad = makeRoad(root, terrain);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x30324b,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
  const signs = Object.keys(supplies).map((type) => gateBatch(root, type, shadowMaterial));
  const meters = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 0.073, 0.065),
    new THREE.MeshBasicMaterial(),
    80,
  );
  meters.frustumCulled = false;
  root.add(meters);
  const meterTransform = new THREE.Matrix4(),
    ink = new THREE.Color('#253347'),
    white = new THREE.Color('#9ff9d9');
  const lockGeometry = combine([
    part(block(0.43, 0.32, 0.1, 0.04), '#3e505d', 0, 0, 0.01),
    part(new THREE.TorusGeometry(0.132, 0.045, 7, 18, Math.PI), '#ffe3a2', 0, 0.13, 0.04),
    part(block(0.12, 0.1, 0.022, 0.017), '#f3be63', 0, 0, 0.072),
  ]);
  const locks = new THREE.InstancedMesh(
    lockGeometry,
    new THREE.MeshPhongMaterial({ vertexColors: true }),
    40,
  );
  locks.frustumCulled = false;
  locks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  root.add(locks);
  const updateWall = makeWall(root, shadowMaterial);
  return {
    update(s) {
      const { gates, wall } = s;
      terrain.update(s);
      updateRoad(s);
      const retract = s.parade ? THREE.MathUtils.smoothstep(s.endTime, 0, 0.4) : 0;
      for (const updateSign of signs) updateSign(retract === 1 ? [] : gates, retract);
      let count = 0,
        lockCount = 0;
      for (const g of gates) {
        if (!s.parade && g.active && g.cover?.hp > 0 && g.z > FAR && g.z < NEAR) {
          meterTransform
            .makeRotationX(GATE_TILT)
            .setPosition(g.x + cardWidth / 2 - 0.35, 0.72, g.z + 0.18);
          locks.setMatrixAt(lockCount++, meterTransform);
        }
        if (s.parade || !g.active || g.hp >= g.maxHp || g.z < -45 || g.z > NEAR) continue;
        const width = cardWidth - 0.38;
        const fill = (width * g.hp) / g.maxHp;
        for (const [w, x, z, color] of [
          [width, g.x, g.z + 0.18, ink],
          [fill, g.x - (width - fill) / 2, g.z + 0.22, white],
        ]) {
          meterTransform.makeScale(w, 1, 1).setPosition(x, 0.13, z);
          meters.setMatrixAt(count, meterTransform);
          meters.setColorAt(count++, color);
        }
      }
      locks.count = lockCount;
      locks.instanceMatrix.needsUpdate = lockCount > 0;
      meters.count = count;
      if (count) {
        meters.instanceMatrix.needsUpdate = true;
        meters.instanceColor.needsUpdate = true;
      }
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
