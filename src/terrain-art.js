import * as THREE from 'three';
import { landscapes, laneWidth } from './campaign.js';
import { roadside } from './roadside.js';
import { roadCurveGLSL } from './road-bend.js';
import { block, combine, part, strut } from './scenery-mesh.js';

const metal = new THREE.MeshPhongMaterial({
  vertexColors: true,
  shininess: 33,
  specular: 0x54565b,
});
const turn = (x = 0, y = 0, z = 0) => new THREE.Euler(x, y, z);
const slab = (w, h, d, color, x, y, z, bevel = 0, rot = null) =>
  part(block(w, h, d, bevel), color, x, y, z, rot);
const drum = (rt, rb, h, color, x, y, z, rot = null, n = 16) =>
  part(new THREE.CylinderGeometry(rt, rb, h, n), color, x, y, z, rot);
const ring = (r, t, color, x, y, z, rot = null) =>
  part(new THREE.TorusGeometry(r, t, 7, 30), color, x, y, z, rot);
const batch = (parts) => new THREE.Mesh(combine(parts), metal);
const iron = '#506272',
  gold = '#e4aa48',
  pale = '#f6dda0',
  dark = '#394655',
  wood = '#b78053';
const clamp = THREE.MathUtils.clamp;

// Each rack has one material-specific silhouette and a low health plate so
// the reward on its own board remains visible behind it from the game camera.
function coverHardware(variant) {
  const base = [];
  const sections = [];
  if (variant === 'glass') {
    base.push(
      slab(3.87, 0.17, 0.83, wood, 0, 0.11, 0, 0.04),
      slab(3.83, 0.28, 0.075, iron, 0, 0.26, 0.38, 0.025),
    );
    for (const x of [-1.79, 1.79]) base.push(slab(0.15, 0.62, 0.77, dark, x, 0.35, 0, 0.03));
    for (const [i, x] of [0, -1.12, 1.12].entries()) {
      const h = i === 0 ? 1.14 : 0.91;
      const parts = [
        drum(0.38, 0.32, 0.12, '#176c72', x, 0.23, 0),
        drum(0.38, 0.38, h * 0.59, '#45bdb3', x, 0.28 + h * 0.29, 0),
        drum(0.13, 0.38, h * 0.32, '#7ae1cc', x, 0.28 + h * 0.74, 0),
        drum(0.13, 0.13, 0.22, '#309994', x, 0.34 + h * 0.93, 0),
        drum(0.167, 0.167, 0.09, '#f7cf7a', x, 0.46 + h * 0.93, 0),
        drum(0.39, 0.39, 0.14, '#f7edbe', x, 0.37 + h * 0.3, 0),
        slab(
          0.06,
          h * 0.34,
          0.045,
          '#ddfff2',
          x - 0.21,
          0.48 + h * 0.38,
          0.3,
          0.015,
          turn(0, 0, -0.12),
        ),
      ];
      sections.push(batch(parts));
    }
  } else if (variant === 'crates') {
    base.push(slab(3.89, 0.15, 0.91, dark, 0, 0.09, 0, 0.035));
    for (const [i, x] of [0, -1.24, 1.24].entries()) {
      const h = i === 0 ? 1.35 : 0.96;
      const parts = [slab(1.18, h, 0.78, i ? '#b77d49' : '#cf925c', x, 0.17 + h / 2, 0, 0.065)];
      for (const sign of [-1, 1]) {
        parts.push(
          slab(0.105, h, 0.085, '#f0c685', x + sign * 0.48, 0.17 + h / 2, 0.4, 0.013),
          slab(1.14, 0.078, 0.085, '#704d3c', x, 0.17 + h * (sign > 0 ? 0.9 : 0.12), 0.405, 0.012),
          strut(
            [x + sign * 0.46, 0.27, 0.46],
            [x - sign * 0.46, h + 0.04, 0.46],
            0.052,
            '#ebc188',
            6,
          ),
        );
        for (const y of [0.3, h + 0.01])
          parts.push(
            drum(0.038, 0.038, 0.022, iron, x + sign * 0.48, y, 0.458, turn(Math.PI / 2), 8),
          );
      }
      sections.push(batch(parts));
    }
  } else {
    base.push(
      slab(3.89, 0.16, 0.92, dark, 0, 0.09, 0, 0.05),
      slab(3.84, 1.12, 0.6, '#56697b', 0, 0.71, 0, 0.06),
    );
    for (let i = 0; i < 5; i++)
      base.push(
        slab(3.62, 0.12, 0.14, i % 2 ? '#8ea3ad' : '#a7b7bf', 0, 0.29 + i * 0.21, 0.3, 0.025),
      );
    for (const x of [-1.79, 1.79]) {
      base.push(slab(0.21, 1.37, 0.7, iron, x, 0.67, 0, 0.04));
      for (const y of [0.3, 0.73, 1.14])
        base.push(slab(0.22, 0.14, 0.06, '#f2bc59', x, y, 0.369, 0, turn(0, 0, 0.18)));
    }
    base.push(
      slab(0.93, 0.74, 0.14, dark, 0, 0.8, 0.36, 0.055),
      ring(0.258, 0.067, '#ffb94e', 0, 0.83, 0.46),
      drum(0.15, 0.15, 0.06, '#ee702e', 0, 0.83, 0.47, turn(Math.PI / 2), 16),
    );
  }
  base.push(slab(1.13, 0.32, 0.08, dark, 0, 0.23, 0.455, 0.035));
  return { base: batch(base), sections };
}

function dropHardware(theme = 'quay') {
  const crate = [];
  if (theme === 'cinder') {
    // 第 3 关熔心裂谷：炽热黑曜熔岩陨石球
    crate.push(
      part(new THREE.DodecahedronGeometry(0.84, 1), '#2c1e24', 0, 0.84, 0),
      part(new THREE.IcosahedronGeometry(0.72, 1), '#ff5416', 0, 0.84, 0),
      part(new THREE.OctahedronGeometry(0.56, 1), '#ffd54f', 0.24, 1.02, 0.16),
      part(new THREE.OctahedronGeometry(0.46, 0), '#ff8624', -0.32, 0.72, 0.28),
    );
  } else {
    crate.push(
      slab(1.52, 1.19, 1.24, '#a97748', 0, 0.82, 0, 0.055),
      slab(1.68, 0.15, 1.39, iron, 0, 0.25, 0, 0.033),
      slab(1.65, 0.12, 1.38, '#66737b', 0, 1.46, 0, 0.03),
      slab(1.58, 0.25, 0.074, '#ffc76c', 0, 1.12, 0.631),
      ring(0.175, 0.046, gold, 0, 1.66, 0),
    );
    for (const side of [-1, 1]) {
      crate.push(slab(0.18, 1.34, 1.32, '#495866', side * 0.61, 0.86, 0, 0.025));
      crate.push(slab(0.23, 0.17, 1.48, dark, side * 0.52, 0.11, 0, 0.03));
      for (const y of [0.39, 1.32])
        crate.push(drum(0.047, 0.047, 0.045, pale, side * 0.61, y, 0.669, turn(Math.PI / 2), 8));
      crate.push(strut([side * 0.48, 0.44, 0.644], [-side * 0.47, 0.95, 0.644], 0.046, '#ddbb89', 6));
    }
    for (let i = -2; i <= 2; i++)
      crate.push(slab(0.09, 0.24, 0.02, dark, i * 0.22, 1.12, 0.676, 0, turn(0, 0, -0.42)));
  }
  const warning = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    const arc = new THREE.RingGeometry(0.95, 1.0, 8, 1, a + 0.035, Math.PI / 6 - 0.07);
    arc.rotateX(-Math.PI / 2);
    warning.push(part(arc, i % 3 ? '#ffbb49' : '#fff0aa', 0, 0.013, 0));
    if (i % 3 === 0) {
      const arrow = new THREE.ConeGeometry(0.075, 0.17, 3);
      arrow.rotateX(Math.PI / 2);
      arrow.rotateY(Math.PI / 2 + a);
      warning.push(part(arrow, '#fff0aa', Math.cos(a) * 0.87, 0.01, -Math.sin(a) * 0.87));
    }
  }
  const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
    toneMapped: false,
    depthWrite: false,
  });
  const halo = new THREE.Mesh(combine(warning), material);
  halo.renderOrder = 3;
  const disc = new THREE.CircleGeometry(1, 48);
  disc.rotateX(-Math.PI / 2);
  const tint = new THREE.Mesh(
    disc,
    new THREE.MeshBasicMaterial({
      color: '#ff7e31',
      transparent: true,
      opacity: 0.13,
      depthWrite: false,
    }),
  );
  tint.renderOrder = 2;
  const sweepGeo = new THREE.RingGeometry(0.96, 1, 48);
  sweepGeo.rotateX(-Math.PI / 2);
  const sweep = new THREE.Mesh(
    sweepGeo,
    new THREE.MeshBasicMaterial({
      color: '#fff0a4',
      transparent: true,
      opacity: 0.77,
      depthWrite: false,
    }),
  );
  sweep.renderOrder = 3;
  return { base: batch(crate), halo, tint, sweep };
}

/** 第 1 / 3 关：高爆连环汽油桶簇（3 桶三角紧簇 + 黄黑警示环 + 醒目爆破标识） */
function barrelHardware() {
  const parts = [];
  const positions = [
    [0, 0, -0.26, 1.06],
    [-0.56, 0, 0.24, 0.96],
    [0.56, 0, 0.24, 0.96],
  ];
  for (const [bx, , bz, sc] of positions) {
    const h = 1.12 * sc;
    const r = 0.36 * sc;
    parts.push(
      drum(r, r, h, '#e82d26', bx, h * 0.5, bz, null, 14),
      drum(r * 1.045, r * 1.045, h * 0.22, '#ffd038', bx, h * 0.52, bz, null, 14),
      drum(r * 1.06, r * 1.06, 0.06, '#2a2d36', bx, h * 0.24, bz, null, 14),
      drum(r * 1.06, r * 1.06, 0.06, '#2a2d36', bx, h * 0.78, bz, null, 14),
      drum(r * 0.96, r * 0.96, 0.07, '#4c5460', bx, h + 0.02, bz, null, 12),
      drum(0.08 * sc, 0.08 * sc, 0.08, '#ffe066', bx + 0.14 * sc, h + 0.06, bz, null, 8),
    );
  }
  // 底部金属托盘
  parts.push(slab(1.96, 0.1, 1.24, dark, 0, 0.05, 0.05, 0.03));
  return { base: batch(parts) };
}

/** 第 2 关：雷霆林谷巨型尖刺滚木（带独立滚转木筒 + 地面红色危险轨道预警带） */
function rollerHardware() {
  const laneTrack = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 9.5),
    new THREE.MeshBasicMaterial({
      color: '#ff4229',
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  laneTrack.rotation.x = -Math.PI / 2;
  laneTrack.position.set(0, 0.036, 4.75);
  laneTrack.renderOrder = 2;

  const logParts = [
    // 横卧滚木主干
    drum(0.56, 0.56, 3.55, '#8c5a32', 0, 0, 0, turn(0, 0, Math.PI / 2), 16),
    drum(0.49, 0.49, 3.6, '#d9aa73', 0, 0, 0, turn(0, 0, Math.PI / 2), 14),
  ];
  // 3 道厚重铁箍 + 环形尖刺钉，滚动时极具动感
  for (const x of [-1.25, 0, 1.25]) {
    logParts.push(drum(0.59, 0.59, 0.2, dark, x, 0, 0, turn(0, 0, Math.PI / 2), 14));
    for (let k = 0; k < 6; k++) {
      const a = (k * Math.PI) / 3 + x * 0.4;
      const spike = new THREE.ConeGeometry(0.095, 0.28, 5);
      spike.rotateZ(-Math.PI / 2);
      spike.rotateX(a);
      logParts.push(
        part(spike, '#f4c85a', x, Math.cos(a) * 0.66, Math.sin(a) * 0.66, turn(a, 0, 0)),
      );
    }
  }
  const rollDrum = batch(logParts);
  rollDrum.position.set(0, 0.58, 0);
  return { base: laneTrack, rollDrum };
}

/** 第 3 关：熔心裂谷熔岩间歇喷发裂口（黑曜石火山口 + 沸腾自发光岩浆池 + 预警光环 + 冲天熔岩喷泉柱） */
function lavaVentHardware() {
  const ringParts = [
    drum(1.48, 1.82, 0.24, '#36232b', 0, 0.12, 0, null, 18),
    ring(1.26, 0.22, '#522c34', 0, 0.22, 0, turn(Math.PI / 2)),
  ];
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    ringParts.push(
      part(
        new THREE.ConeGeometry(0.32, 0.58, 5),
        i % 2 ? '#452b34' : '#63363b',
        Math.cos(a) * 1.4,
        0.32,
        Math.sin(a) * 1.4,
        turn(0.18, a, 0.14),
      ),
    );
  }
  const baseMesh = batch(ringParts);
  // 裂口中心沸腾自发光熔岩池（不受暗面压暗，始终滚烫醒目）
  const lavaPool = new THREE.Mesh(
    (() => {
      const g = new THREE.CircleGeometry(1.16, 24);
      g.rotateX(-Math.PI / 2);
      return g;
    })(),
    new THREE.MeshBasicMaterial({
      color: '#ff5d14',
      toneMapped: false,
    }),
  );
  lavaPool.position.y = 0.22;
  const lavaCore = new THREE.Mesh(
    (() => {
      const g = new THREE.CircleGeometry(0.62, 18);
      g.rotateX(-Math.PI / 2);
      return g;
    })(),
    new THREE.MeshBasicMaterial({
      color: '#ffd64a',
      toneMapped: false,
    }),
  );
  lavaCore.position.y = 0.24;
  baseMesh.add(lavaPool, lavaCore);

  const ventGlow = new THREE.Mesh(
    (() => {
      const g = new THREE.RingGeometry(0.75, 1.0, 32);
      g.rotateX(-Math.PI / 2);
      return g;
    })(),
    new THREE.MeshBasicMaterial({
      color: '#ff962e',
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      toneMapped: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  ventGlow.position.y = 0.055;
  ventGlow.renderOrder = 3;

  const plumeParts = [
    drum(0.76, 1.08, 4.3, '#ff4510', 0, 2.15, 0, null, 14),
    drum(0.45, 0.68, 4.55, '#ffcc38', 0, 2.28, 0, null, 12),
    part(new THREE.SphereGeometry(1.0, 12, 8), '#ffe66e', 0, 4.3, 0),
  ];
  const ventPlume = new THREE.Mesh(
    combine(plumeParts),
    new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.94,
      depthWrite: false,
      toneMapped: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  ventPlume.renderOrder = 5;
  ventPlume.visible = false;

  return { base: baseMesh, ventGlow, ventPlume };
}

function hardware(kind, length = 4.4, direction = 1, variant, theme = 'quay') {
  if (kind === 'cover') return coverHardware(variant);
  if (kind === 'skyfall') return dropHardware(theme);
  if (kind === 'barrel') return barrelHardware();
  if (kind === 'roller') return rollerHardware();
  if (kind === 'lavaVent') return lavaVentHardware();
  const base = [],
    planks = [],
    moving = [];
  if (kind === 'gap' || kind === 'bridge') {
    const half = length / 2;
    for (const s of [-1, 1]) {
      base.push(slab(4.22, 0.43, 0.25, iron, 0, -0.2, s * (half + 0.04), 0.035));
      for (let k = -3; k <= 3; k++)
        base.push(
          slab(
            0.29,
            0.025,
            0.19,
            k % 2 ? gold : dark,
            k * 0.53,
            0.025,
            s * (half + 0.21),
            0,
            turn(0, 0.23, 0),
          ),
        );
      for (const side of [-1, 1]) {
        const x = side * 1.97;
        base.push(
          slab(0.2, 0.83, 0.24, dark, x, -0.39, s * half, 0.025),
          strut([x, -0.85, s * half], [x, -0.1, s * (half + 0.65)], 0.055, iron),
        );
      }
    }
    const steps = Math.round(length / 0.4);
    for (let i = 0; i < steps; i++) {
      const z = ((i + 0.5) * length) / steps;
      planks.push(
        slab(4.03, 0.14, length / steps - 0.025, i % 3 === 0 ? '#c59762' : wood, 0, 0.01, z, 0.018),
      );
      for (const x of [-1.54, 1.54])
        planks.push(drum(0.056, 0.056, 0.015, iron, x, 0.085, z, null, 7));
    }
    for (const x of [-1.5, 1.5]) planks.push(slab(0.19, 0.28, length, iron, x, -0.14, half, 0.024));
    if (kind === 'bridge') {
      for (const side of [-1, 1]) {
        const x = side * 1.92;
        base.push(
          slab(0.21, 1.72, 0.34, iron, x, 0.82, -half, 0.04),
          drum(0.23, 0.23, 0.12, gold, x, 1.68, -half, turn(0, 0, Math.PI / 2)),
          strut([x, 0.12, -half - 0.42], [x, 1.3, -half], 0.054, pale),
        );
      }
      base.push(drum(0.16, 0.16, 3.9, iron, 0, 0.11, -half, turn(0, 0, Math.PI / 2)));
      base.push(
        slab(1.33, 0.61, 0.41, iron, 0, 0.33, half + 0.24, 0.055),
        slab(1.45, 0.09, 0.48, gold, 0, 0.64, half + 0.24, 0.025),
      );
    } else {
      for (let i = 0; i < 5; i++)
        base.push(
          strut(
            [i * 0.63 - 1.25, -0.11, -half],
            [i * 0.63 - 1.21, -0.18, -half + 0.28 + (i % 2) * 0.18],
            0.024,
            iron,
            6,
          ),
        );
    }
  } else if (kind === 'cache') {
    for (let r = 0; r < 3; r++)
      for (let i = 0; i < 5; i++) {
        const colors = ['#af7149', '#ba8051', '#cf955f', '#a56745'];
        base.push(
          slab(
            0.643,
            0.366,
            0.65,
            colors[(i + 2 * r) % 4],
            (i - 2) * 0.665,
            0.22 + r * 0.385,
            0,
            0.033,
          ),
        );
      }
    for (const x of [-1.53, 1.53]) {
      base.push(slab(0.17, 1.24, 0.75, gold, x, 0.6, 0, 0.035));
      for (const y of [0.19, 0.57, 1.02])
        base.push(drum(0.047, 0.047, 0.034, pale, x, y, 0.389, turn(Math.PI / 2), 8));
    }
    base.push(
      slab(3.38, 0.11, 0.72, dark, 0, 1.18, 0, 0.025),
      slab(1.7, 0.61, 0.07, dark, 0, 0.63, 0.345, 0.055),
    );
  } else if (kind === 'coil') {
    base.push(
      drum(0.78, 0.9, 0.22, iron, 0, 0.12, 0, null, 28),
      drum(0.26, 0.34, 0.96, '#b2d5ce', 0, 0.68, 0, null, 28),
    );
    for (let i = 0; i < 7; i++)
      base.push(
        ring(
          0.39 - i * 0.016,
          0.044,
          i % 2 ? '#cc8548' : '#f3b867',
          0,
          0.3 + i * 0.115,
          0,
          turn(Math.PI / 2),
        ),
      );
    base.push(
      drum(0.25, 0.3, 0.2, gold, 0, 1.19, 0),
      part(new THREE.IcosahedronGeometry(0.21, 1), '#96ffff', 0, 1.39, 0),
    );
  } else if (kind === 'belt') {
    base.push(slab(3.9, 0.065, length, '#697981', 0, 0.035, 0, 0.045));
    for (const x of [-1.92, 1.92]) base.push(slab(0.1, 0.11, length, gold, x, 0.074, 0, 0.022));
    for (let j = 0; j < 11; j++)
      base.push(slab(3.74, 0.045, 0.055, '#475765', 0, 0.08, ((j - 5) * length) / 11));
    for (let j = 0; j < 5; j++)
      for (const side of [-1, 1])
        moving.push(
          strut(
            [-0.24 * direction, 0.107, (j - 2) * 1.53 + side * 0.3],
            [0.24 * direction, 0.107, (j - 2) * 1.53],
            0.052,
            pale,
            6,
          ),
        );
  }
  return {
    base: batch(base),
    deck: planks.length ? batch(planks) : null,
    arrows: moving.length ? batch(moving) : null,
  };
}

function marker() {
  const c = document.createElement('canvas');
  c.width = 320;
  c.height = 104;
  const ctx = c.getContext('2d'),
    map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.56, 0.51),
    new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false, toneMapped: false }),
  );
  let previous = '';
  return {
    mesh,
    label(text) {
      if (text === previous) return;
      previous = text;
      ctx.clearRect(0, 0, 320, 104);
      ctx.font = '900 69px "Arial Black","PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 9;
      ctx.strokeStyle = '#2e3b48';
      ctx.strokeText(text, 160, 56);
      ctx.fillStyle = '#fff3cf';
      ctx.fillText(text, 160, 56);
      map.needsUpdate = true;
    },
    dispose() {
      map.dispose();
      mesh.geometry.dispose();
      mesh.material.dispose();
    },
  };
}

// 路边地标保留各章节鲜明原色，仅施加轻度大气雾融合，告别阴暗死灰感
function bankFinish(geometry, theme) {
  const attribute = geometry.getAttribute('color');
  const c = landscapes[theme] || landscapes.quay;
  const glaze = new THREE.Color(c.fog || '#14243d');
  const bright = new THREE.Color(c.skyHorizon || '#8294ab');
  const paint = new THREE.Color(),
    tint = new THREE.Color();
  for (let i = 0; i < attribute.count; i++) {
    paint.fromBufferAttribute(attribute, i);
    const value = paint.r * 0.213 + paint.g * 0.715 + paint.b * 0.072;
    tint.lerpColors(glaze, bright, Math.min(1, Math.sqrt(value) * 1.12));
    // 仅融入 22% 章节大气色，充分保留灯塔、青松、赤岩、冰川、黑曜石的真实辨识度
    paint.lerp(tint, 0.22);
    attribute.setXYZ(i, paint.r, paint.g, paint.b);
  }
  return geometry;
}

/** 构造桥侧发光灯笼/能源柱的灯泡几何体（与底座分离，支持自发光纯亮材质） */
function outlookLamps(theme) {
  const bulbs = [];
  for (const s of [-1, 1]) {
    const x = s * 6.68;
    if (theme === 'cinder') {
      bulbs.push(
        drum(0.24, 0.2, 0.22, '#ff9838', x, 0.34, 0, null, 10),
        part(new THREE.OctahedronGeometry(0.22, 0), '#ffe384', x, 0.56, 0),
      );
    } else if (theme === 'ice') {
      bulbs.push(part(new THREE.OctahedronGeometry(0.23, 0), '#a8ffff', x, 0.58, 0));
    } else if (theme === 'forge') {
      bulbs.push(slab(0.32, 0.22, 0.26, '#ffaa44', x, 0.56, 0, 0.04));
    } else {
      // 港区/林谷/矿峡：还原主视觉 convoy-keyart 的温暖灯笼球
      bulbs.push(
        drum(0.2, 0.22, 0.28, '#ffd966', x, 0.56, 0, null, 12),
        part(new THREE.SphereGeometry(0.2, 10, 8), '#fff5b8', x, 0.7, 0),
      );
    }
  }
  return combine(bulbs);
}

function outlook(theme) {
  const c = landscapes[theme],
    bits = [];
  // 桥墩与主视觉同款灯柱底座，外沿挂靠并共享一次实例绘制
  for (const s of [-1, 1]) {
    const x = s * 6.68;
    bits.push(
      slab(0.32, 4.7, 0.44, c.frame, x, -2.35, 0, 0.03),
      strut([x, -2.4, 0], [x, -0.25, 2.3], 0.09, c.frame),
      // 桥侧灯座与灯顶帽檐
      slab(0.56, 0.24, 0.56, c.frame, x, 0.22, 0, 0.04),
      drum(0.26, 0.3, 0.14, gold, x, 0.36, 0, null, 10),
    );
    if (theme === 'timber') {
      for (const dx of [0, 0.48])
        bits.push(drum(0.13, 0.18, 2.0, '#9d6e45', x + s * dx, -0.4, 1.3 + dx, null, 9));
      bits.push(strut([x, 0.32, 1.3], [x, 0.28, 4.9], 0.05, '#d1b586'));
      for (const [h, off] of [
        [2.3, 1.9],
        [1.7, 3.2],
      ]) {
        bits.push(drum(0.16, 0.21, 1.9, wood, x + s * off, -3.0, 1 + off, null, 7));
        for (let k = 0; k < 3; k++)
          bits.push(
            part(
              new THREE.ConeGeometry(0.84 - k * 0.19, h * 0.58, 8),
              ['#2d7a56', '#3d9968', '#68be7f'][k],
              x + s * off,
              -2.62 + k * 0.48,
              1 + off,
            ),
          );
      }
    } else if (theme === 'quarry' || theme === 'cinder' || theme === 'ice') {
      for (let k = 0; k < 4; k++) {
        const rock = new THREE.ConeGeometry(
          0.62 + k * 0.15,
          1.6 + (k % 2) * 1.4,
          theme === 'ice' ? 5 : 7,
        );
        bits.push(
          part(
            rock,
            theme === 'ice'
              ? ['#67c7e8', '#a6eef7'][k % 2]
              : theme === 'cinder'
                ? ['#3d2b36', '#5c3b3d'][k % 2]
                : ['#b8744e', '#cf8d63'][k % 2],
            x + s * (1.1 + k * 0.6),
            -2.45 + 0.3 * k,
            k * 1.35,
            turn(0.09 * k, 0.6 * k, s * 0.16),
          ),
        );
      }
      if (theme === 'cinder')
        bits.push(
          drum(0.28, 0.38, 0.44, '#59363a', x, 0.02, 0),
          drum(0.24, 0.27, 0.12, '#ff7a33', x, 0.24, 0),
        );
    } else if (theme === 'forge') {
      bits.push(
        drum(0.3, 0.3, 3.6, '#5c788a', x + s * 0.38, -0.53, 0.4, turn(Math.PI / 2)),
        ring(0.34, 0.06, gold, x + s * 0.38, -0.53, 1.75),
        slab(0.52, 0.54, 0.48, iron, x, 0.21, 0, 0.045),
      );
    } else {
      // 灯塔外港：灯笼顶盖与海面红白浮标
      bits.push(
        drum(0.06, 0.28, 0.16, '#395570', x, 0.84, 0, null, 10),
        drum(0.38, 0.52, 0.64, '#d9533f', x + s * 1.85, -3.02, 2.2),
        drum(0.22, 0.34, 0.26, '#fff2d2', x + s * 1.85, -2.58, 2.2),
      );
    }
  }
  return combine(bits);
}

export function createTerrainArt(root, curve = new THREE.Vector4()) {
  const cuts = Array.from({ length: 10 }, () => new THREE.Vector4(0, -1000, 0, 0));
  function cutDeck(mat) {
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.roadCuts = { value: cuts };
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 deckPosition;')
        .replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\ndeckPosition=(modelMatrix*vec4(transformed,1.)).xyz;',
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          '#include <common>\nvarying vec3 deckPosition; uniform vec4 roadCuts[10];',
        )
        .replace(
          '#include <clipping_planes_fragment>',
          '#include <clipping_planes_fragment>\nfor(int i=0;i<10;i++){vec4 h=roadCuts[i];if(abs(deckPosition.x-h.x)<h.z && abs(deckPosition.z-h.y)<h.w)discard;}',
        );
    };
  }
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(160, 170),
    new THREE.ShaderMaterial({
      uniforms: {
        deep: { value: new THREE.Color() },
        crest: { value: new THREE.Color() },
        fogColor: { value: new THREE.Color() },
        clock: { value: 0 },
        origin: { value: 0 },
        biome: { value: 0 },
        roadCurve: { value: curve },
      },
      vertexShader:
        'varying vec3 pos; void main(){vec4 w=modelMatrix*vec4(position,1.);pos=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
      fragmentShader: `${roadCurveGLSL}
      varying vec3 pos; uniform vec3 deep, crest, fogColor; uniform float clock, origin, biome;
      void main(){
        vec2 q=vec2(pos.x,pos.z-origin);
        float swell=sin(q.x*.65+clock*.55)*.95+sin(q.x*.28-q.y*.22+clock*.35)*.62;
        float wave=sin(q.y*1.95+swell+clock*.95)+.55*sin(q.x*.92-q.y*1.65-clock*.52);
        float shelf=smoothstep(-.75,.95,sin(q.x*.24+q.y*.19)+.48*sin(q.x*.46-q.y*.25));
        float sparkle=pow(smoothstep(.88,1.52,wave),2.2)*(.32+.45*shelf);
        float shore=abs(q.x-lateralBend(pos.z));
        // 紧贴大桥护栏外缘的白色海浪拍岸泡沫 / 熔岩亮边
        float bankFoam=smoothstep(8.3,6.65,shore)*smoothstep(6.1,6.75,shore)*(.42+.35*sin(q.y*2.4+clock*2.2));
        vec3 c;
        if(biome>1.5){
          // 熔心裂谷：翻涌沸腾的炽热金橙熔岩河与冷却黑曜浮壳
          float crust=abs(sin(q.x*.56+sin(q.y*.78+clock*.32)+q.y*.52));
          float vein=1.-smoothstep(.0,.18,crust);
          float pulse=.72+.28*sin(clock*1.9+q.y*.65+q.x*.4);
          vec3 magma=mix(vec3(1.,.28,.04),vec3(1.,.86,.32),vein*pulse);
          c=mix(deep,magma,clamp(.14+.16*shelf+vein*.92+bankFoam*.45,0.,1.));
        }else if(biome>.5){
          // 极光冰河：清透冰蓝海面与浮冰晶棱高光
          float seam=abs(sin(q.x*.72+q.y*.52+sin(q.y*.48)));
          float floe=1.-smoothstep(.0,.11,seam);
          c=mix(deep,crest,clamp(.16+.24*shelf+floe*.42+sparkle*.65+bankFoam*.6,0.,1.));
          c+=vec3(.78,.98,1.)*sparkle*.38;
        }else{
          // 港口/林谷/矿峡/船坞：澄澈动态水波与夕阳波光闪烁
          float gleam=.14+.26*shelf+sparkle*.85+bankFoam*.75;
          c=mix(deep,crest,clamp(gleam,0.,1.));
          c+=vec3(1.,.96,.85)*(sparkle*.28+bankFoam*.25);
        }
        // 桥底轻投影 + 远景自然融入天际雾色
        c*=mix(.58,1.,smoothstep(5.2,8.4,shore));
        float distFade=smoothstep(-28.,-105.,pos.z);
        c=mix(c,fogColor,distFade*.85);
        gl_FragColor=vec4(c,1.);
      #include <colorspace_fragment>
      }`,
    }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, -3.7, -43);
  water.material.userData.unbent = true;
  root.add(water);
  const terrainAssets = new Map(),
    scenic = new Map(),
    lampBatches = new Map(),
    landmarks = new Map(),
    live = new Map(),
    matrix = new THREE.Matrix4();
  const lampMaterial = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
  let region, features;
  const chainGeo = new THREE.CylinderGeometry(0.035, 0.035, 1, 8),
    chainMat = new THREE.MeshPhongMaterial({ color: 0xab9b79 });
  const a = new THREE.Vector3(),
    b = new THREE.Vector3(),
    axis = new THREE.Vector3(),
    up = new THREE.Vector3(0, 1, 0);
  function item(p, theme) {
    const key = [p.kind, p.variant || '', p.length || 0, p.direction || 0, p.kind === 'skyfall' ? theme : ''].join(':');
    if (!terrainAssets.has(key))
      terrainAssets.set(key, hardware(p.kind, p.length, p.direction, p.variant, theme));
    const template = terrainAssets.get(key),
      g = new THREE.Group(),
      base = template.base.clone();
    g.add(base);
    const sections = (template.sections || []).map((part) => part.clone());
    for (const section of sections) g.add(section);
    let leaf, arrows, label, drop, rollDrum, ventGlow, ventPlume;
    if (template.rollDrum) {
      rollDrum = template.rollDrum.clone();
      g.add(rollDrum);
    }
    if (template.ventGlow) {
      ventGlow = template.ventGlow.clone();
      ventPlume = template.ventPlume.clone();
      g.add(ventGlow, ventPlume);
    }
    if (template.halo) {
      drop = {
        halo: template.halo.clone(),
        tint: template.tint.clone(),
        sweep: template.sweep.clone(),
      };
      for (const mesh of Object.values(drop)) g.add(mesh);
      drop.tint.position.y = 0.038;
      drop.halo.position.y = 0.044;
      drop.sweep.position.y = 0.048;
    }
    const chains = [];
    if (template.deck) {
      leaf = template.deck.clone();
      leaf.position.z = -p.length / 2;
      g.add(leaf);
    }
    if (template.arrows) {
      arrows = template.arrows.clone();
      g.add(arrows);
    }
    if (
      p.kind === 'cache' ||
      p.kind === 'bridge' ||
      p.kind === 'coil' ||
      p.kind === 'cover' ||
      p.kind === 'barrel' ||
      p.kind === 'roller'
    ) {
      label = marker();
      g.add(label.mesh);
      label.mesh.position.set(
        0,
        p.kind === 'cover'
          ? 0.25
          : p.kind === 'cache'
            ? 0.66
            : p.kind === 'coil'
              ? 0.55
              : p.kind === 'barrel'
                ? 1.56
                : p.kind === 'roller'
                  ? 1.62
                  : 0.43,
        p.kind === 'cover'
          ? 0.512
          : p.kind === 'bridge'
            ? p.length / 2 + 0.48
            : p.kind === 'coil'
              ? 0.56
              : p.kind === 'barrel'
                ? 0.55
                : p.kind === 'roller'
                  ? 0.25
                  : 0.397,
      );
      if (p.kind === 'cover' || p.kind === 'barrel' || p.kind === 'roller')
        label.mesh.scale.setScalar(0.76);
    }
    if (p.kind === 'bridge')
      for (let i = 0; i < 2; i++) {
        const m = new THREE.Mesh(chainGeo, chainMat);
        g.add(m);
        chains.push(m);
      }
    root.add(g);
    return { g, base, leaf, arrows, chains, sections, label, drop, rollDrum, ventGlow, ventPlume };
  }
  function update(s) {
    const theme = s.route.theme;
    if (theme !== region) {
      if (region) {
        scenic.get(region).visible = false;
        lampBatches.get(region).visible = false;
        landmarks.get(region).visible = false;
      }
      region = theme;
      if (!scenic.has(theme)) {
        const m = new THREE.InstancedMesh(bankFinish(outlook(theme), theme), metal, 10);
        m.frustumCulled = false;
        const lamps = new THREE.InstancedMesh(outlookLamps(theme), lampMaterial, 10);
        lamps.frustumCulled = false;
        lamps.instanceMatrix = m.instanceMatrix;
        const landmark = new THREE.InstancedMesh(bankFinish(roadside(theme), theme), metal, 3);
        landmark.frustumCulled = false;
        landmarks.set(theme, landmark);
        root.add(landmark);
        scenic.set(theme, m);
        lampBatches.set(theme, lamps);
        root.add(m, lamps);
      }
      scenic.get(theme).visible = true;
      lampBatches.get(theme).visible = true;
      landmarks.get(theme).visible = true;
      water.material.uniforms.biome.value = theme === 'cinder' ? 2 : theme === 'ice' ? 1 : 0;
      water.material.uniforms.deep.value.set(landscapes[theme].deep);
      water.material.uniforms.crest.value.set(landscapes[theme].glint);
      water.material.uniforms.fogColor.value.set(landscapes[theme].fog);
    }
    const landmark = landmarks.get(theme);
    for (let i = 0; i < landmark.count; i++)
      landmark.setMatrixAt(i, matrix.makeTranslation(0, 0, -36 - i * 47 + (s.distance % 47)));
    landmark.instanceMatrix.needsUpdate = true;
    const scenery = scenic.get(theme);
    for (let i = 0; i < 10; i++)
      scenery.setMatrixAt(i, matrix.makeTranslation(0, 0, 12 - i * 10 + (s.distance % 10)));
    scenery.instanceMatrix.needsUpdate = true;
    water.material.uniforms.clock.value = s.elapsed;
    water.material.uniforms.origin.value = s.distance;
    if (s.features !== features) {
      for (const v of live.values()) {
        v.g.removeFromParent();
        v.label?.dispose();
      }
      live.clear();
      features = s.features;
    }
    let count = 0;
    for (const p of s.features) {
      if (p.z < -68 || p.z > 14) {
        const v = live.get(p);
        if (v) v.g.visible = false;
        continue;
      }
      const v = live.get(p) || item(p, theme);
      live.set(p, v);
      v.g.visible = true;
      v.g.position.set(p.x, 0, p.z);
      if (p.kind === 'barrel') {
        v.g.rotation.z = Math.sin(s.elapsed * 75) * (p.flash || 0) * 0.08;
        if (p.state !== 'ready') {
          const shrink = 1 - THREE.MathUtils.smoothstep(p.age, 0, 0.16);
          v.base.scale.setScalar(Math.max(0.001, shrink));
          if (shrink <= 0.01) v.g.visible = false;
        } else {
          v.base.scale.setScalar(1);
        }
      }
      if (p.kind === 'roller' && v.rollDrum) {
        const ready = p.state === 'ready';
        v.base.visible = ready;
        v.base.material.opacity = 0.16 + 0.12 * Math.sin(s.elapsed * 12);
        v.rollDrum.rotation.x = p.rollSpin || 0;
        v.rollDrum.position.y = 0.58 + Math.abs(Math.sin((p.rollSpin || 0) * 2)) * 0.06;
        if (!ready) {
          const shrink = 1 - THREE.MathUtils.smoothstep(p.age, 0, 0.2);
          v.rollDrum.scale.setScalar(Math.max(0.001, shrink));
          if (shrink <= 0.01) v.g.visible = false;
        } else {
          v.rollDrum.scale.setScalar(1);
        }
      }
      if (p.kind === 'lavaVent' && v.ventGlow && v.ventPlume) {
        const r = p.radius || 2.05;
        v.ventGlow.visible = Boolean(p.warming || p.erupting);
        if (v.ventGlow.visible) {
          const prog = p.ventProgress || 0;
          const sc = p.erupting ? r * (1.05 + 0.08 * Math.sin(s.elapsed * 28)) : r * (0.45 + 0.55 * prog);
          v.ventGlow.scale.setScalar(sc);
          v.ventGlow.material.opacity = p.erupting ? 0.92 : 0.35 + 0.5 * prog;
        }
        v.ventPlume.visible = Boolean(p.erupting);
        if (v.ventPlume.visible) {
          v.ventPlume.rotation.y = s.elapsed * 7.5;
          const pulse = 0.88 + 0.18 * Math.sin(s.elapsed * 32);
          v.ventPlume.scale.set(pulse, 0.92 + 0.14 * Math.cos(s.elapsed * 26), pulse);
        }
      }
      if (v.drop) {
        const warning = p.state === 'warning',
          landed = p.state === 'landed';
        v.g.visible = warning || (landed && p.age < 0.85);
        if (!v.g.visible) continue;
        const fall = p.fallProgress || 0,
          age = p.age;
        const radius = p.radius;
        v.drop.halo.visible = v.drop.tint.visible = warning;
        v.drop.halo.scale.setScalar(radius);
        v.drop.tint.scale.setScalar(radius);
        v.drop.sweep.visible = warning || age < 0.38;
        v.drop.sweep.scale.setScalar(
          radius *
            (warning
              ? 0.1 + 0.88 * p.progress
              : 1 + 0.77 * THREE.MathUtils.smoothstep(age, 0, 0.38)),
        );
        v.base.visible = true;
        if (warning) {
          const overhead = 7.9 + 10 * (1 - THREE.MathUtils.smoothstep(p.progress, 0.08, 0.71));
          v.base.position.y = overhead * (1 - fall * fall);
          v.base.rotation.set(0.12 * (1 - fall), 0.39 * (1 - fall), 0.13 * (1 - fall));
          v.base.scale.setScalar(1);
        } else {
          const bounce = Math.sin(age * 20) * Math.exp(-age * 10);
          v.base.position.y = Math.abs(bounce) * 0.32;
          v.base.rotation.set(0.08 * bounce, 0, 0.14 * bounce);
          v.base.scale.setScalar(1 - THREE.MathUtils.smoothstep(age, 0.34, 0.83));
        }
      }
      if (p.kind === 'cover') {
        const fraction = p.hp / p.maxHp;
        v.sections.forEach((part, i) => {
          part.visible = fraction > i * 0.34;
        });
        v.g.rotation.z = Math.sin(p.age * 95) * p.flash * 0.033;
      }
      if (s.parade && p.kind !== 'bridge' && p.kind !== 'gap') {
        v.g.position.y -= 1.8 * THREE.MathUtils.smoothstep(s.endTime, 0, 0.48);
        if (s.endTime >= 0.49) v.g.visible = false;
      }
      if (p.kind === 'gap' || p.kind === 'bridge') {
        if (s.parade) {
          v.exitAngle ??= v.leaf.visible ? v.leaf.rotation.x : Math.PI / 2;
          v.leaf.position.y = 0.03;
        }
        if (count < cuts.length) cuts[count++].set(p.x, p.z, laneWidth / 2 - 0.055, p.length / 2);
        v.leaf.visible = Boolean(s.parade) || p.kind === 'bridge' || p.state === 'repaired';
        const progress = THREE.MathUtils.smoothstep(p.age, 0, 0.58);
        v.leaf.rotation.x = s.parade
          ? v.exitAngle * (1 - THREE.MathUtils.smoothstep(s.endTime, 0, 0.45))
          : p.state === 'cut'
            ? -0.2 + 1.6 * progress
            : p.state === 'ready' && p.kind === 'bridge'
              ? -0.2
              : p.state === 'linked'
                ? -0.2 * (1 - progress)
                : 0;
        if (p.state === 'repaired') v.leaf.position.y = 0.03 + 0.22 * (1 - progress);
        for (let i = 0; i < v.chains.length; i++) {
          const m = v.chains[i],
            x = (i ? 1 : -1) * 1.83;
          m.visible = p.state !== 'cut' && p.state !== 'repaired';
          a.set(x, 1.63, -p.length / 2);
          b.set(
            x,
            -Math.sin(v.leaf.rotation.x) * p.length + 0.1,
            -p.length / 2 + Math.cos(v.leaf.rotation.x) * p.length,
          );
          axis.subVectors(b, a);
          m.scale.y = axis.length();
          m.position.copy(a).lerp(b, 0.5);
          m.quaternion.setFromUnitVectors(up, axis.normalize());
        }
      }
      if (v.arrows) v.arrows.position.x = Math.sin(s.elapsed * 5) * 0.39 * p.direction;
      if (v.label) {
        v.label.mesh.visible = p.state === 'ready';
        if (v.label.mesh.visible)
          v.label.label(
            (p.kind === 'cover'
              ? ''
              : p.kind === 'bridge'
                ? '断索 '
                : p.kind === 'coil'
                  ? '电 '
                  : p.kind === 'barrel'
                    ? '爆 '
                    : p.kind === 'roller'
                      ? '木 '
                      : '箱 ') + Math.ceil(p.hp),
          );
      }
      if ((p.kind === 'cache' || p.kind === 'coil' || p.kind === 'cover') && p.state !== 'ready')
        v.base.scale.setScalar(1 - THREE.MathUtils.smoothstep(p.age, 0, 0.24));
    }
    for (let i = count; i < cuts.length; i++) cuts[i].set(0, -1000, 0, 0);
  }
  return { cutDeck, update };
}
