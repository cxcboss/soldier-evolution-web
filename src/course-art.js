import * as THREE from 'three';
import { block, part, combine } from './scenery-mesh.js';
import { createTerrainArt } from './terrain-art.js';
import { landscapes } from './campaign.js';
import { cardWidth, supplies } from './supplies.js';
import { makeSignAtlas } from './supply-art.js';

const ROAD_WIDTH = 13.2;
const NEAR = 14;
const FAR = -110;
const LENGTH = NEAR - FAR;
const MIDPOINT = (NEAR + FAR) / 2;
const GATE_TILT = -0.18;

/**
 * 为每个章节生成高清漫反射贴图与配套程序凹凸贴图（Bump Map），
 * 赋予海港石板、林谷木板、矿峡砂岩、船坞防滑钢板、极光冰砖、熔岩黑曜石截然不同的表面触感。
 */
function makeDeckTextures(theme) {
  const colors = landscapes[theme];
  const base = parseInt(colors.floor.slice(1), 16);
  const w = 1024;
  const h = 768;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // 配套凹凸高度图（灰度：白凸黑凹）
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 512;
  bumpCanvas.height = 384;
  const bctx = bumpCanvas.getContext('2d');
  bctx.fillStyle = '#a8a8a8';
  bctx.fillRect(0, 0, 512, 384);

  const pixels = ctx.createImageData(w, h);
  const baseR = (base >> 16) & 255;
  const baseG = (base >> 8) & 255;
  const baseB = base & 255;
  let seed = 941 + theme.charCodeAt(0) * 31;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
      const grain = (seed / 4294967296 - 0.5) * 9.0;
      const edge = Math.min(x, w - 1 - x);
      const vignette = Math.max(0, 1 - edge / 44) * 28;
      const wave = 2.6 * Math.cos(x * 0.032 + Math.sin(y * 0.025));
      const shade = grain + wave - vignette;
      const idx = (y * w + x) * 4;
      pixels.data[idx] = Math.max(0, Math.min(255, baseR + shade));
      pixels.data[idx + 1] = Math.max(0, Math.min(255, baseG + shade));
      pixels.data[idx + 2] = Math.max(0, Math.min(255, baseB + shade));
      pixels.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(pixels, 0, 0);

  // 在 256x192 逻辑坐标系绘制细节，同步输出漫反射与凹凸
  ctx.scale(4, 4);
  bctx.scale(2, 2);

  const line = (target, x, y, xx, yy, color, lw = 1) => {
    target.strokeStyle = color;
    target.lineWidth = lw;
    target.beginPath();
    target.moveTo(x, y);
    target.lineTo(xx, yy);
    target.stroke();
  };

  // 横向桥梁伸缩缝
  ctx.fillStyle = 'rgba(35,38,54,.22)';
  ctx.fillRect(0, 0, 256, 1.8);
  ctx.fillStyle = 'rgba(255,250,245,.34)';
  ctx.fillRect(0, 2.2, 256, 1.1);
  bctx.fillStyle = '#383838';
  bctx.fillRect(0, 0, 256, 2.2);
  bctx.fillStyle = '#dedede';
  bctx.fillRect(0, 2.2, 256, 1.2);

  if (theme === 'quay') {
    // 晴朗海港阳光石板：微暖车道轮胎印 + 大石板接缝 + 排水格栅
    for (const x of [24, 61, 108, 148, 195, 232]) {
      const wash = ctx.createLinearGradient(x - 8, 0, x + 8, 0);
      wash.addColorStop(0, 'rgba(65,78,96,0)');
      wash.addColorStop(0.5, 'rgba(62,74,95,.075)');
      wash.addColorStop(1, 'rgba(65,78,96,0)');
      ctx.fillStyle = wash;
      ctx.fillRect(x - 8, 0, 16, 192);
    }
    for (const y of [48, 96, 144]) {
      line(ctx, 0, y, 256, y, 'rgba(72,76,92,.24)', 1.1);
      line(ctx, 0, y + 1.4, 256, y + 1.4, 'rgba(255,250,242,.38)', 0.9);
      line(bctx, 0, y, 256, y, '#4a4a4a', 1.4);
      line(bctx, 0, y + 1.5, 256, y + 1.5, '#dcdcdc', 0.9);
    }
    for (const [x, y] of [
      [7, 42],
      [244, 136],
    ]) {
      ctx.fillStyle = '#798798';
      ctx.fillRect(x, y, 5, 15);
      for (let j = 1.5; j < 14; j += 2.2) line(ctx, x + 0.5, y + j, x + 4.5, y + j, '#3e4c5e', 0.9);
    }
  } else if (theme === 'timber') {
    // 悬索林谷：温润交替木板 + 清晰木纹曲线 + 金属钉头
    for (let i = 0; i < 8; i++) {
      const y = i * 24;
      ctx.fillStyle = i % 2 ? 'rgba(92,58,32,.08)' : 'rgba(255,232,195,.07)';
      ctx.fillRect(0, y, 256, 24);
      line(ctx, 0, y, 256, y, colors.joint, 1.8);
      line(ctx, 0, y + 2, 256, y + 2, colors.rim, 0.85);
      line(bctx, 0, y, 256, y, '#2c2c2c', 2.0);
      line(bctx, 0, y + 2, 256, y + 2, '#e2e2e2', 1.0);
      for (let k = 0; k < 5; k++) {
        const x = (i * 41 + k * 59) % 236;
        ctx.strokeStyle = 'rgba(92,58,32,.22)';
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.moveTo(x, y + 11);
        ctx.bezierCurveTo(x + 14, y + 5, x + 22, y + 17, x + 42, y + 11);
        ctx.stroke();
      }
      // 木板两端铁铆钉
      for (const nx of [12, 82, 174, 244]) {
        ctx.fillStyle = '#53453c';
        ctx.beginPath();
        ctx.arc(nx, y + 12, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (theme === 'forge') {
    // 钢铁船坞：工业重钢拼接板 + 菱形防滑花纹 + 警示边线
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        const x = i * 85 + 6;
        const y = j * 48 + 5;
        ctx.fillStyle = (i + j) % 2 ? 'rgba(30,45,66,.09)' : 'rgba(235,245,255,.06)';
        ctx.fillRect(x, y, 73, 38);
        ctx.strokeStyle = colors.joint;
        ctx.lineWidth = 1.4;
        ctx.strokeRect(x, y, 73, 38);
        bctx.strokeStyle = '#363636';
        bctx.lineWidth = 1.6;
        bctx.strokeRect(x, y, 73, 38);
        for (let h = 0; h < 5; h++) {
          line(ctx, x + 8 + h * 11, y + 27, x + 14 + h * 11, y + 18, '#c5d2df', 1.0);
          line(bctx, x + 8 + h * 11, y + 27, x + 14 + h * 11, y + 18, '#eeeeee', 1.2);
        }
      }
    }
  } else if (theme === 'quarry') {
    // 回声矿峡：粗犷交错砂岩块 + 矿道压痕
    for (let j = 0; j < 4; j++) {
      const y = j * 48;
      line(ctx, 0, y, 256, y, colors.joint, 1.6);
      line(ctx, 0, y + 1.8, 256, y + 1.8, colors.rim, 0.8);
      line(bctx, 0, y, 256, y, '#383838', 1.8);
      for (let i = 0; i < 4; i++) {
        const x = i * 66 + (j % 2) * 28;
        ctx.fillStyle = (i + j) % 2 ? 'rgba(130,75,45,.08)' : 'rgba(255,236,210,.06)';
        ctx.fillRect(x, y + 2, 64, 44);
        line(ctx, x, y, x + 1.5, y + 48, colors.joint, 1.3);
        line(bctx, x, y, x + 1.5, y + 48, '#383838', 1.5);
      }
    }
  } else if (theme === 'cinder') {
    // 熔心裂谷：玄武岩石块 + 缝隙间隐隐炽热的红橙熔纹
    for (let j = 0; j < 4; j++) {
      const y = j * 48;
      line(ctx, 0, y, 256, y, '#ff6e26', 1.35);
      line(ctx, 0, y + 1.2, 256, y + 1.2, '#3d2224', 1.0);
      line(bctx, 0, y, 256, y, '#242424', 2.0);
      for (let i = 0; i < 4; i++) {
        const x = i * 68 + (j % 2) * 30;
        ctx.fillStyle = (i + j) % 2 ? 'rgba(32,20,28,.16)' : 'rgba(255,120,60,.05)';
        ctx.fillRect(x, y + 2, 66, 44);
        line(ctx, x, y, x + 2, y + 48, 'rgba(255,108,42,.52)', 1.2);
        line(bctx, x, y, x + 2, y + 48, '#282828', 1.6);
      }
    }
  } else if (theme === 'ice') {
    // 极光冰河：透亮晶蓝冰砖 + 冰面折射斜纹裂痕
    for (let y = 0; y < 192; y += 48) {
      line(ctx, 0, y, 256, y, colors.joint, 1.2);
      line(ctx, 0, y + 1.5, 256, y + 1.5, '#ffffff', 0.9);
      line(bctx, 0, y, 256, y, '#505050', 1.4);
    }
    for (let i = 0; i < 14; i++) {
      const x = (i * 61) % 244;
      const y = (i * 43) % 176;
      line(ctx, x, y, x + 18, y + 16, 'rgba(255,255,255,.72)', 1.5);
      line(ctx, x + 8, y + 8, x + 21, y + 6, 'rgba(110,195,235,.55)', 1.0);
      line(bctx, x, y, x + 18, y + 16, '#f0f0f0', 1.5);
    }
  }

  // 桥肩暗槽、接缝压板与反光灯标
  for (const side of [-1, 1]) {
    const x = side < 0 ? 1.6 : 250.4;
    ctx.fillStyle = 'rgba(24,34,48,.42)';
    ctx.fillRect(x, 0, 4.0, 192);
    ctx.fillStyle = 'rgba(255,250,242,.55)';
    ctx.fillRect(x + 0.8, 0, 0.9, 192);
    for (const y of [28, 125]) {
      ctx.fillStyle = '#5f6b7d';
      ctx.fillRect(x - 0.6, y, 5.4, 11);
      ctx.fillStyle = colors.lampGlow || colors.rim;
      ctx.fillRect(x + 0.7, y + 2.2, 2.8, 4.2);
    }
  }

  // 三车道高辨识度标线 + 发光导引点
  for (const x of [256 / 3, 512 / 3]) {
    ctx.fillStyle = colors.line;
    ctx.fillRect(x - 1.7, 0, 3.4, 192);
    ctx.fillStyle = colors.rim;
    ctx.fillRect(x - 0.3, 0, 1.15, 192);
    for (let y = 8; y < 192; y += 32) {
      ctx.fillStyle = colors.rim;
      ctx.fillRect(x - 1.5, y, 3.0, 9.5);
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.y = LENGTH / 8;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.y = LENGTH / 8;

  return { map, bumpMap };
}

function makeRoad(group, terrain) {
  const textures = new Map();
  let active;
  const initial = makeDeckTextures('quay');
  textures.set('quay', initial);

  const floorMat = new THREE.MeshStandardMaterial({
    map: initial.map,
    bumpMap: initial.bumpMap,
    bumpScale: 0.045,
    roughness: 0.76,
    metalness: 0.08,
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_WIDTH, LENGTH, 1, 100), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, MIDPOINT);
  floor.receiveShadow = true;
  group.add(floor);

  const rail = (width, height) => new THREE.BoxGeometry(width, height, LENGTH, 1, 1, 100);
  const trim = [part(rail(ROAD_WIDTH + 0.16, 0.42), '#4e586e', 0, -0.22, MIDPOINT)];
  for (const side of [-1, 1]) {
    const edge = (side * ROAD_WIDTH) / 2;
    trim.push(part(rail(0.16, 0.22), '#7e8699', edge, 0.03, MIDPOINT));
    trim.push(part(rail(0.115, 0.052), '#d6dce8', edge + side * 0.01, 0.148, MIDPOINT));
    trim.push(part(rail(0.06, 0.24), '#3b4356', edge + side * 0.085, -0.14, MIDPOINT));
    trim.push(part(rail(0.055, 0.025), '#9ea4b2', edge - side * 0.09, 0.008, MIDPOINT));
  }
  const edgingMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.56,
    metalness: 0.28,
  });
  const edging = new THREE.Mesh(combine(trim), edgingMat);
  group.add(edging);
  terrain.cutDeck(floor.material);
  terrain.cutDeck(edging.material);

  const themePbr = {
    quay: [0.76, 0.08, 0.045],
    timber: [0.84, 0.04, 0.06],
    quarry: [0.86, 0.05, 0.065],
    forge: [0.46, 0.42, 0.055],
    ice: [0.34, 0.16, 0.04],
    cinder: [0.74, 0.14, 0.065],
  };

  return (s) => {
    const theme = s.route.theme;
    if (!textures.has(theme)) textures.set(theme, makeDeckTextures(theme));
    if (active !== theme) {
      const pack = textures.get(theme);
      floorMat.map = pack.map;
      floorMat.bumpMap = pack.bumpMap;
      const [rough, metal, bump] = themePbr[theme] || themePbr.quay;
      floorMat.roughness = rough;
      floorMat.metalness = metal;
      floorMat.bumpScale = bump;
      floorMat.needsUpdate = true;
      edgingMat.color.set(landscapes[theme].railTop || '#ffffff');
      active = theme;
    }
    const offY = (s.distance / 8) % 1;
    floorMat.map.offset.y = offY;
    floorMat.bumpMap.offset.y = offY;
  };
}

// 补给牌与硬墙的柔和方向接触阴影
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
  trapezoid(0, 0.1, width * 1.01, height * 0.87, height * 0.92, 0.34, 0.22, 0.045);
  trapezoid(0, 0.17, width + 0.06, 0.32, 0.028, 0.22, 0.16, 0.07);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
  return geometry;
}

/**
 * 合并全部 16 种补给牌到统一的合批渲染管线（4 个 Draw Call 替代原来的 48 个）：
 * - 蓝色壳体 InstancedMesh (1 DC)
 * - 金色壳体 InstancedMesh (1 DC)
 * - 共享 4x4 图集牌面 InstancedMesh (1 DC)
 * - 共享投影 InstancedMesh (1 DC)
 */
function createUnifiedGateBatch(group, shadowMaterial) {
  const w = cardWidth;
  const h = 1.09;
  const depth = 0.17;

  function buildShellGeometry(merge) {
    const shell = merge ? '#f5c218' : '#1f83ec';
    const sideTrim = merge ? '#9c7112' : '#1b53a0';
    const highlight = merge ? '#fff078' : '#8fd5ff';
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
    return combine([inclined, ...feet]);
  }

  const faceGeo = new THREE.PlaneGeometry(w - 0.19, h - 0.086);
  faceGeo.translate(0, h / 2 + 0.007, depth / 2 + 0.004);
  faceGeo.rotateX(GATE_TILT);
  faceGeo.translate(0, 0.059, 0.015);

  const shadowGeo = castShadow(w, h);
  const atlas = makeSignAtlas();

  const shellMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.36,
    metalness: 0.32,
  });

  const faceMat = new THREE.MeshBasicMaterial({
    map: atlas.map,
    toneMapped: false,
  });
  faceMat.customProgramCacheKey = () => 'gate-sign-atlas';
  faceMat.onBeforeCompile = (shader) => {
    shader.vertexShader =
      'attribute vec2 signCell;\n' +
      shader.vertexShader.replace(
        '#include <uv_vertex>',
        `#include <uv_vertex>\nvMapUv = vMapUv * vec2(${atlas.scaleU.toFixed(6)}, ${atlas.scaleV.toFixed(6)}) + signCell;`,
      );
  };

  const CAP = 64;
  const blueShell = new THREE.InstancedMesh(buildShellGeometry(false), shellMat, CAP);
  const goldShell = new THREE.InstancedMesh(buildShellGeometry(true), shellMat, CAP);
  const signUvAttr = new THREE.InstancedBufferAttribute(new Float32Array(CAP * 2), 2);
  signUvAttr.setUsage(THREE.DynamicDrawUsage);
  faceGeo.setAttribute('signCell', signUvAttr);
  const faceMesh = new THREE.InstancedMesh(faceGeo, faceMat, CAP);
  const shadowMesh = new THREE.InstancedMesh(shadowGeo, shadowMaterial, CAP);
  shadowMesh.renderOrder = 1;

  for (const m of [blueShell, goldShell, faceMesh, shadowMesh]) {
    m.count = 0;
    m.visible = false;
    m.frustumCulled = false;
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(m);
  }
  shadowMesh.instanceMatrix = faceMesh.instanceMatrix;

  const transform = new THREE.Matrix4();
  function flushMesh(mesh, count) {
    mesh.count = count;
    mesh.visible = count > 0;
    if (count > 0) {
      mesh.instanceMatrix.clearUpdateRanges();
      mesh.instanceMatrix.addUpdateRange(0, count * 16);
      mesh.instanceMatrix.needsUpdate = true;
    }
  }

  return (gates, retract) => {
    let blueCount = 0;
    let goldCount = 0;
    let allCount = 0;
    for (const gate of gates) {
      if (allCount >= CAP) break;
      if ((!gate.active && !(gate.pop < 0.28)) || gate.z < FAR || gate.z >= NEAR) continue;
      const cell = atlas.cells.get(gate.type);
      if (!cell) continue;
      const t = gate.active ? 0 : gate.pop / 0.28;
      const size = (1 + 0.24 * Math.sin(Math.PI * t) + (gate.flash || 0) * 0.08) * (1 - t * t);
      transform.makeScale(size, size * (1 - retract) * (1 + 0.18 * Math.sin(t * Math.PI)), size);
      transform.setPosition(
        gate.x + 0.22 * (gate.x < 0 ? 1 : -1) * t,
        Math.sin(t * Math.PI) * 0.38 - retract * 0.13,
        gate.z,
      );
      if (supplies[gate.type].tone === 'gold') {
        goldShell.setMatrixAt(goldCount++, transform);
      } else {
        blueShell.setMatrixAt(blueCount++, transform);
      }
      faceMesh.setMatrixAt(allCount, transform);
      signUvAttr.setXY(allCount, cell[0], cell[1]);
      allCount++;
    }
    flushMesh(blueShell, blueCount);
    flushMesh(goldShell, goldCount);
    flushMesh(faceMesh, allCount);
    shadowMesh.count = allCount;
    shadowMesh.visible = allCount > 0;
    if (allCount > 0) {
      signUvAttr.clearUpdateRanges();
      signUvAttr.addUpdateRange(0, allCount * 2);
      signUvAttr.needsUpdate = true;
    }
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
      const size = i === 1 ? 0.042 : 0.033;
      pieces.push(
        part(
          new THREE.PlaneGeometry(length, size),
          '#25222f',
          (ax + bx) / 2,
          (ay + by) / 2,
          0.228,
          angle,
        ),
      );
      pieces.push(
        part(
          new THREE.PlaneGeometry(length, size * 0.4),
          '#f2e5d6',
          (ax + bx) / 2,
          (ay + by) / 2 + size * 0.42,
          0.23,
          angle,
        ),
      );
    }
  }
  return combine(pieces);
}

/** 工业强化装甲硬墙：增加黄黑警示条、钢筋边框与受击微震弹性 */
function makeWall(group, shadowMaterial) {
  const root = new THREE.Group();
  group.add(root);
  const w = 4.28,
    h = 1.65;
  const pieces = [part(block(w - 0.08, h - 0.08, 0.41, 0.06), '#525969', 0, h / 2, 0)];
  for (const side of [-1, 1]) {
    const x = side * (w / 2 - 0.085);
    pieces.push(part(block(0.18, h + 0.04, 0.5, 0.04), '#7b8496', x, h / 2, 0));
    pieces.push(part(block(0.14, h - 0.14, 0.036), '#9aa4b5', x, h / 2, 0.242));
    for (const y of [0.16, h - 0.16]) {
      const rot = new THREE.Euler(Math.PI / 2, 0, 0);
      pieces.push(
        part(new THREE.CylinderGeometry(0.076, 0.076, 0.025, 10), '#343a47', x, y, 0.265, rot),
      );
      pieces.push(
        part(new THREE.CylinderGeometry(0.052, 0.061, 0.036, 6), '#d9b56c', x, y, 0.285, rot),
      );
    }
  }
  // 顶部与底部工业警示黄黑横条，大幅强化危险障碍辨识度
  for (const y of [0.11, h - 0.09]) {
    pieces.push(part(block(w - 0.26, 0.16, 0.45, 0.02), '#333947', 0, y, 0));
    for (let i = -5; i <= 5; i++) {
      if ((i + 10) % 2 === 0) {
        pieces.push(
          part(
            block(0.24, 0.135, 0.035),
            '#f7be31',
            i * 0.34,
            y,
            0.228,
            new THREE.Euler(0, 0, -0.35),
          ),
        );
      }
    }
  }
  // 中央钢板加固框
  pieces.push(part(block(1.96, 0.86, 0.04, 0.02), '#394152', 0, 0.84, 0.215));

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
  numberPanel.position.set(0, 0.84, 0.258);
  root.add(numberPanel);
  let lastHp;
  const metal = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.48,
    metalness: 0.38,
    emissive: 0xffd2a6,
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
    const flash = THREE.MathUtils.clamp(wall.flash || 0, 0, 1);
    root.position.set(wall.x, 0, wall.z);
    root.scale.set(1 + flash * 0.026, 1 - flash * 0.032, 1 + flash * 0.04);
    const hp = Math.ceil(wall.hp);
    if (hp !== lastHp) {
      ctx.clearRect(0, 0, number.width, number.height);
      ctx.font = '900 100px "Arial Black",sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#1b2230';
      ctx.strokeText(String(hp), 128, 59);
      ctx.fillStyle = '#fff5dc';
      ctx.fillText(String(hp), 128, 59);
      numberMap.needsUpdate = true;
      lastHp = hp;
    }
    const fraction = wall.hp / Math.max(1, wall.maxHp);
    metal.emissiveIntensity = Math.sqrt(flash) * 0.55;
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
    color: 0x262942,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
  const updateGates = createUnifiedGateBatch(root, shadowMaterial);
  const meters = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 0.08, 0.07),
    new THREE.MeshBasicMaterial({ toneMapped: false }),
    80,
  );
  meters.frustumCulled = false;
  meters.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  root.add(meters);
  const meterTransform = new THREE.Matrix4(),
    ink = new THREE.Color('#1d2b3f'),
    white = new THREE.Color('#7dffdb');
  const lockGeometry = combine([
    part(block(0.43, 0.32, 0.1, 0.04), '#3e505d', 0, 0, 0.01),
    part(new THREE.TorusGeometry(0.132, 0.045, 7, 18, Math.PI), '#ffe3a2', 0, 0.13, 0.04),
    part(block(0.12, 0.1, 0.022, 0.017), '#f3be63', 0, 0, 0.072),
  ]);
  const locks = new THREE.InstancedMesh(
    lockGeometry,
    new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 48 }),
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
      updateGates(retract === 1 ? [] : gates, retract);
      let count = 0,
        lockCount = 0;
      for (const g of gates) {
        if (!s.parade && g.active && g.cover?.hp > 0 && g.z > FAR && g.z < NEAR && lockCount < 40) {
          meterTransform
            .makeRotationX(GATE_TILT)
            .setPosition(g.x + cardWidth / 2 - 0.35, 0.72, g.z + 0.18);
          locks.setMatrixAt(lockCount++, meterTransform);
        }
        if (s.parade || !g.active || g.hp >= g.maxHp || g.z < -45 || g.z > NEAR || count > 78)
          continue;
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
      locks.visible = lockCount > 0;
      if (lockCount) {
        locks.instanceMatrix.clearUpdateRanges();
        locks.instanceMatrix.addUpdateRange(0, lockCount * 16);
        locks.instanceMatrix.needsUpdate = true;
      }
      meters.count = count;
      meters.visible = count > 0;
      if (count) {
        meters.instanceMatrix.clearUpdateRanges();
        meters.instanceMatrix.addUpdateRange(0, count * 16);
        meters.instanceMatrix.needsUpdate = true;
        meters.instanceColor.clearUpdateRanges();
        meters.instanceColor.addUpdateRange(0, count * 3);
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
        if (mesh.material.bumpMap) maps.add(mesh.material.bumpMap);
        if (mesh.isInstancedMesh) mesh.dispose();
      });
      root.removeFromParent();
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      for (const map of maps) map.dispose();
    },
  };
}
