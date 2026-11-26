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
    top: '#226b86',
    bottom: '#103754',
    rim: '#67cbcb',
    light: '#e1ffef',
    ink: '#f7fcf2',
    shade: '#082a3f',
    badge: '#147f94',
  },
  gold: {
    top: '#ffce66',
    bottom: '#eca341',
    rim: '#ffdd7e',
    light: '#fff5c5',
    ink: '#332b28',
    shade: '#744722',
    badge: '#93501d',
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
export function makeSignTexture(type) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 196;
  const ctx = canvas.getContext('2d');
  const p = metal[supplies[type].tone];
  const g = ctx.createLinearGradient(0, 0, 0, 196);
  g.addColorStop(0, p.top);
  g.addColorStop(0.64, p.bottom);
  g.addColorStop(1, p.bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 640, 196);
  polygon(
    ctx,
    [
      [0, 0],
      [200, 0],
      [153, 196],
      [0, 196],
    ],
    p.shade,
  );
  polygon(
    ctx,
    [
      [0, 0],
      [640, 0],
      [640, 8],
      [12, 8],
      [0, 20],
    ],
    p.rim,
  );
  ctx.fillStyle = 'rgba(255,255,255,.10)';
  ctx.fillRect(13, 177, 614, 3);
  // Recessed fasteners and the two enamel ribs stay clear of the lettering.
  for (const x of [13, 627])
    for (const y of [22, 175]) {
      ctx.fillStyle = p.shade;
      ctx.fillRect(x - 4, y - 3, 8, 6);
      ctx.fillStyle = p.light;
      ctx.fillRect(x - 3, y - 3, 6, 2);
    }
  for (const x of [551, 576, 601])
    polygon(
      ctx,
      [
        [x, 154],
        [x + 13, 154],
        [x + 7, 164],
        [x - 6, 164],
      ],
      p.rim,
    );
  badge(ctx, type, 92, 96, 144);
  const reward = supplies[type];
  const size = reward.count ? 145 : 113;
  ctx.font = '900 ' + size + 'px "Arial Black", "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  const text = ctx.measureText(reward.label);
  const cy = 96 + (text.actualBoundingBoxAscent - text.actualBoundingBoxDescent) / 2;
  ctx.translate(381, cy);
  ctx.scale(Math.min(1, 376 / text.width), 1);
  ctx.fillStyle = supplies[type].tone === 'gold' ? '#ffda7d' : '#082d47';
  ctx.fillText(reward.label, 0, 4);
  ctx.fillStyle = p.ink;
  ctx.fillText(reward.label, 0, 0);
  return texture(canvas);
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
      if (n) {
        mesh.instanceMatrix.needsUpdate = true;
        uv.needsUpdate = true;
      }
    },
  };
}
