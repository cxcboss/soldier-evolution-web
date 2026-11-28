import * as THREE from 'three';
import { supplies } from './supplies.js';

// The enamel badge is shared by the board and the reward flying back to the squad.
const helmets = 'M4 17h24v3H4z M6 16c0-6 4-11 10-11s10 5 10 11z M10 22h12c-1 4-3 6-6 6s-5-2-6-6z';
const marks = {
  plus: helmets,
  squad: helmets,
  reserve: helmets,
  merge: 'M3 16l17-10 5 8-16 10z M6 23l5-3 4 7-6 2z M21 5l3-2 6 10-3 2z',
  range: 'M3 20l14-10 3 4L7 25z M14 7l15-4-6 15-2-7z',
  longshot: 'M3 20L18 9l3 4L7 25z M16 6l14-4-6 14-2-7z M3 12l8-6 2 2-8 7z M12 26l7-6 2 2-7 6z',
  rapid: 'M3 11l8 5-8 5v-4l3-1-3-1z M11 8l12 8-12 8v-5l5-3-5-3z M22 9l8 7-8 7v-5l3-2-3-2z',
  shield: 'M16 2l12 5v8c0 6-5 12-12 15C9 27 4 21 4 15V7z M16 7v17c5-3 7-6 7-10V10z',
  blast: 'M14 12l5-2 1-5 4 1-2 6c5 3 6 8 3 13-3 5-12 6-17 1-4-4-4-12 1-15z M23 3l3-2 2 2-4 3z',
  plasma: 'M17 1L5 18h9l-2 13 16-20H17l4-10z',
  spread: 'M6 29V13H2l7-10 7 10h-4v16z M20 26V11h-4l7-9 7 9h-4v15z',
  drone:
    'M11 13h10l3 4-4 4h-8l-4-4z M3 6l8 5-2 3-8-5z M21 11l8-5 2 3-8 5z M1 24l8-5 2 3-8 5z M21 22l2-3 8 5-2 3z',
  engineer: 'M2 23h28v4H2z M4 21V6h4v6c5 4 11 4 16 0V6h4v15h-4v-5l-4 2v3h-3v-2h-3v2h-3v-3l-3-2v5z',
  medic: 'M12 4h8v8h8v8h-8v8h-8v-8H4v-8h8z',
  frost: 'M14 1h4v10l8-5 2 4-9 6 9 6-2 4-8-5v10h-4V21l-8 5-2-4 9-6-9-6 2-4 8 5z',
  fever: 'M15 1c2 8 8 8 7 15 3-1 4-4 4-6 8 16-5 23-12 20C4 28 2 21 7 13c0 4 2 5 3 5-1-7 5-10 5-17z',
};
const metal = {
  blue: {
    top: '#36acf9',
    bottom: '#0574e4',
    rim: '#81d7ff',
    light: '#f6fcff',
    ink: '#ffffff',
    shade: '#1150a9',
    badge: '#1678d2',
  },
  gold: {
    top: '#ffe336',
    bottom: '#efbf0c',
    rim: '#ffeb79',
    light: '#fff9ce',
    ink: '#ffffff',
    shade: '#916808',
    badge: '#c78b0d',
  },
};
function polygon(ctx, points, fill) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}
function badge(ctx, type, x, y, size) {
  const p = metal[supplies[type].tone];
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 100, size / 100);
  const shield = [
    [-34, -46],
    [34, -46],
    [48, -31],
    [48, 21],
    [33, 35],
    [0, 49],
    [-33, 35],
    [-48, 21],
    [-48, -31],
  ];
  polygon(ctx, shield, p.shade);
  ctx.scale(0.94, 0.94);
  polygon(ctx, shield, p.rim);
  ctx.scale(0.88, 0.88);
  const g = ctx.createLinearGradient(0, -45, 0, 45);
  g.addColorStop(0, p.badge);
  g.addColorStop(1, p.shade);
  polygon(ctx, shield, g);
  ctx.scale(2, 2);
  ctx.translate(-16, -16);
  const emblem = new Path2D(marks[type]);
  ctx.translate(0, 1.3);
  ctx.fillStyle = p.shade;
  ctx.fill(emblem, 'evenodd');
  ctx.translate(0, -1.3);
  ctx.fillStyle = p.light;
  ctx.fill(emblem, 'evenodd');
  ctx.restore();
}
function texture(canvas) {
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  return map;
}
function paintSignCard(ctx, type, ox, oy, w, h) {
  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(w / 640, h / 196);
  const p = metal[supplies[type].tone];
  const g = ctx.createLinearGradient(0, 0, 0, 196);
  g.addColorStop(0, p.top);
  g.addColorStop(0.52, p.bottom);
  g.addColorStop(1, p.shade);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 640, 196);
  // 左侧深色徽章斜切底座
  polygon(
    ctx,
    [
      [0, 0],
      [152, 0],
      [104, 196],
      [0, 196],
    ],
    p.shade,
  );
  // 顶部金属高光斜带（增添珐琅漆立体反光）
  const sheen = ctx.createLinearGradient(160, 0, 560, 180);
  sheen.addColorStop(0, 'rgba(255,255,255,0.22)');
  sheen.addColorStop(0.45, 'rgba(255,255,255,0.04)');
  sheen.addColorStop(0.55, 'rgba(255,255,255,0.16)');
  sheen.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(105, 8, 530, 110);
  // 顶边与底边金属倒角亮线
  polygon(
    ctx,
    [
      [0, 0],
      [640, 0],
      [640, 10],
      [14, 10],
      [0, 22],
    ],
    p.rim,
  );
  ctx.fillStyle = 'rgba(255,255,255,.18)';
  ctx.fillRect(14, 178, 612, 4);
  // 四角铆钉装饰
  for (const x of [14, 626])
    for (const y of [23, 175]) {
      ctx.fillStyle = p.shade;
      ctx.fillRect(x - 4, y - 3, 8, 6);
      ctx.fillStyle = p.light;
      ctx.fillRect(x - 3, y - 3, 6, 2);
    }
  // 右下角动感速度斜纹
  for (const x of [548, 574, 600])
    polygon(
      ctx,
      [
        [x, 152],
        [x + 14, 152],
        [x + 8, 165],
        [x - 6, 165],
      ],
      p.rim,
    );
  badge(ctx, type, 71, 98, 106);
  const reward = supplies[type];
  const size = reward.count ? 150 : 124;
  ctx.font = '900 ' + size + 'px "Arial Black", "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  const text = ctx.measureText(reward.label);
  const cy = 98 + (text.actualBoundingBoxAscent - text.actualBoundingBoxDescent) / 2;
  ctx.translate(362, cy);
  ctx.scale(Math.min(1, 405 / text.width), 1);
  ctx.lineJoin = 'round';
  ctx.lineWidth = reward.count ? 16 : 12;
  ctx.strokeStyle = '#14263b';
  ctx.strokeText(reward.label, 0, 3);
  ctx.fillStyle = p.ink;
  ctx.fillText(reward.label, 0, 0);
  ctx.restore();
}

export function makeSignTexture(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 196;
  const ctx = canvas.getContext('2d');
  paintSignCard(ctx, type, 0, 0, 640, 196);
  return texture(canvas);
}

/**
 * 将全部 16 种补给牌面合批到单张 4x4 纹理图集，大幅削减 Draw Call
 */
export function makeSignAtlas() {
  const types = Object.keys(supplies);
  const cols = 4;
  const rows = Math.ceil(types.length / cols);
  const cellW = 512;
  const cellH = 160;
  const canvas = document.createElement('canvas');
  canvas.width = cols * cellW;
  canvas.height = rows * cellH;
  const ctx = canvas.getContext('2d');
  const cells = new Map();
  types.forEach((type, i) => {
    const cx = i % cols;
    const cy = Math.floor(i / cols);
    paintSignCard(ctx, type, cx * cellW, cy * cellH, cellW, cellH);
    // WebGL UV 原点在左下角，Canvas 原点在左上角
    cells.set(type, [cx / cols, 1 - (cy + 1) / rows]);
  });
  return {
    map: texture(canvas),
    cells,
    scaleU: 1 / cols,
    scaleV: 1 / rows,
  };
}

export function makeSupplyTokens(scene) {
  const types = Object.keys(supplies);
  const side = Math.ceil(Math.sqrt(types.length));
  const cell = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = side * cell;
  const ctx = canvas.getContext('2d');
  const cells = new Map();
  types.forEach((type, i) => {
    const x = i % side,
      y = Math.floor(i / side);
    badge(ctx, type, (x + 0.5) * cell, (y + 0.5) * cell, 118);
    cells.set(type, [x / side, 1 - (y + 1) / side]);
  });
  const material = new THREE.MeshBasicMaterial({
    map: texture(canvas),
    side: THREE.DoubleSide,
    alphaTest: 0.26,
    toneMapped: false,
  });
  material.onBeforeCompile = (shader) => {
    shader.vertexShader =
      'attribute vec2 badgeCell;\n' +
      shader.vertexShader.replace(
        '#include <uv_vertex>',
        '#include <uv_vertex>\nvMapUv = vMapUv * ' + (1 / side).toFixed(6) + ' + badgeCell;',
      );
  };
  const geometry = new THREE.PlaneGeometry(0.99, 0.99);
  const cap = 40;
  const uv = new THREE.InstancedBufferAttribute(new Float32Array(cap * 2), 2);
  uv.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('badgeCell', uv);
  const mesh = new THREE.InstancedMesh(geometry, material, cap);
  mesh.name = 'Flying supply insignia';
  mesh.count = 0;
  mesh.frustumCulled = false;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(mesh);
  const pose = new THREE.Object3D();
  return {
    update(deliveries) {
      let n = 0;
      for (const reward of deliveries) {
        if (reward.slot != null || reward.age < 0 || n >= cap) continue;
        const t = reward.progress;
        pose.scale.setScalar(0.65 + 0.62 * Math.sin(Math.PI * t));
        pose.rotation.set(
          -0.57,
          Math.sin(t * Math.PI * 2) * 0.48,
          0.13 * Math.sin(t * Math.PI * 2),
        );
        pose.position.set(reward.x, reward.y + 0.35, reward.z);
        pose.updateMatrix();
        mesh.setMatrixAt(n, pose.matrix);
        const cell = cells.get(reward.type);
        uv.setXY(n++, cell[0], cell[1]);
      }
      mesh.count = n;
      mesh.visible = n > 0;
      if (n) {
        mesh.instanceMatrix.clearUpdateRanges();
        mesh.instanceMatrix.addUpdateRange(0, n * 16);
        mesh.instanceMatrix.needsUpdate = true;
        uv.clearUpdateRanges();
        uv.addUpdateRange(0, n * 2);
        uv.needsUpdate = true;
      }
    },
  };
}
