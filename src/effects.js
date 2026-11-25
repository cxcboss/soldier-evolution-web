import * as THREE from 'three';
import { plasmaRound, pulseRound, sampleFlight } from './projectiles.js';
import { slamRadius } from './brawler-motion.js';

const TILE = 128;
const TILES = 4;
const sprites = {
  glow: 0,
  smoke: 1,
  glint: 2,
  wave: 3,
  crack: 4,
  plus: 5,
  arrow: 6,
  flash: 7,
  goldWave: 8,
  ember: 9,
};

function makeAtlas() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = TILE * TILES;
  const ctx = canvas.getContext('2d');
  function tile(index, paint) {
    ctx.save();
    ctx.translate(((index % TILES) + 0.5) * TILE, (Math.floor(index / TILES) + 0.5) * TILE);
    paint();
    ctx.restore();
  }
  function glow(x, y, radius, stops) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    for (const [offset, color] of stops) gradient.addColorStop(offset, color);
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  const transparent = 'rgba(255,255,255,0)';
  tile(sprites.glow, () => {
    glow(0, 0, 57, [
      [0, '#fff'],
      [0.18, 'rgba(255,255,255,.94)'],
      [0.43, 'rgba(255,255,255,.41)'],
      [1, transparent],
    ]);
  });
  tile(sprites.smoke, () => {
    const lobes = [
      [-14, 8, 37],
      [18, 8, 32],
      [9, -13, 32],
      [-15, -13, 27],
      [3, 3, 40],
    ];
    for (const [x, y, radius] of lobes) {
      glow(x, y, radius, [
        [0, 'rgba(255,255,255,.62)'],
        [0.38, 'rgba(255,255,255,.42)'],
        [0.77, 'rgba(255,255,255,.13)'],
        [1, transparent],
      ]);
    }
  });
  tile(sprites.glint, () => {
    glow(0, 0, 44, [
      [0, '#fff'],
      [0.16, 'rgba(255,255,255,.9)'],
      [1, transparent],
    ]);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const radius = i % 2 ? 5 : i % 4 ? 45 : 32;
      const x = Math.cos(angle) * radius,
        y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  });
  tile(sprites.wave, () => {
    glow(0, 0, 60, [
      [0, transparent],
      [0.7, transparent],
      [0.78, 'rgba(255,255,255,.26)'],
      [0.86, 'rgba(255,255,255,.94)'],
      [0.9, 'rgba(255,255,255,.60)'],
      [1, transparent],
    ]);
  });
  tile(sprites.goldWave, () => {
    glow(0, 0, 58, [
      [0, 'rgba(255,255,255,.25)'],
      [0.41, 'rgba(255,255,255,.08)'],
      [0.66, transparent],
      [0.81, 'rgba(255,255,255,.18)'],
      [0.88, '#fff'],
      [0.92, 'rgba(255,255,255,.65)'],
      [1, transparent],
    ]);
  });
  tile(sprites.crack, () => {
    glow(0, 0, 40, [
      [0, '#c14d0d'],
      [0.19, 'rgba(158,63,22,.9)'],
      [0.62, 'rgba(80,52,51,.24)'],
      [1, 'rgba(80,52,51,0)'],
    ]);
    let seed = 783;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let i = 0; i < 11; i++) {
      const angle = ((i + random() * 0.55) * 2 * Math.PI) / 11;
      const length = 31 + random() * 29;
      let x = 0,
        y = 0;
      for (let j = 1; j <= 4; j++) {
        const a = angle + (random() - 0.5) * 0.23;
        const radius = (length * j) / 4;
        const nx = Math.cos(a) * radius,
          ny = Math.sin(a) * radius;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nx, ny);
        ctx.lineWidth = (5 - j) * 0.62 + 0.35;
        ctx.strokeStyle = j === 1 ? '#793714' : '#493e41';
        ctx.stroke();
        if (j === 2 || j === 3) {
          const branch = a + (random() > 0.5 ? 0.65 : -0.66);
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(nx + Math.cos(branch) * 9, ny + Math.sin(branch) * 9);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        x = nx;
        y = ny;
      }
    }
    ctx.beginPath();
    for (let i = 0; i < 15; i++) {
      const a = (i * Math.PI * 2) / 15,
        r = 5 + random() * 10;
      const x = Math.cos(a) * r,
        y = Math.sin(a) * r;
      if (!i) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#ff9021';
    ctx.fill();
  });
  tile(sprites.plus, () => {
    ctx.font = '1000 80px Arial Black, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#754508';
    ctx.lineWidth = 9;
    ctx.strokeText('+1', 0, 6, 110);
    ctx.strokeStyle = '#422916';
    ctx.lineWidth = 6.5;
    ctx.strokeText('+1', 0, 2, 110);
    const gold = ctx.createLinearGradient(0, -28, 0, 32);
    gold.addColorStop(0, '#fff592');
    gold.addColorStop(0.31, '#fff020');
    gold.addColorStop(1, '#ffbe00');
    ctx.fillStyle = gold;
    ctx.fillText('+1', 0, 2, 110);
  });
  tile(sprites.arrow, () => {
    ctx.shadowColor = '#00baff';
    ctx.shadowBlur = 9;
    ctx.beginPath();
    ctx.moveTo(0, -47);
    ctx.lineTo(35, -7);
    ctx.lineTo(16, -7);
    ctx.lineTo(16, 40);
    ctx.lineTo(-16, 40);
    ctx.lineTo(-16, -7);
    ctx.lineTo(-35, -7);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, -45, 0, 40);
    g.addColorStop(0, '#f2ffff');
    g.addColorStop(0.45, '#67fff4');
    g.addColorStop(1, 'rgba(10,201,255,.38)');
    ctx.fillStyle = g;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(227,255,255,.82)';
    ctx.stroke();
  });
  tile(sprites.flash, () => {
    glow(0, 0, 58, [
      [0, '#fff'],
      [0.21, '#fff'],
      [0.36, 'rgba(255,255,255,.85)'],
      [0.71, 'rgba(255,255,255,.18)'],
      [1, transparent],
    ]);
    for (let i = 0; i < 9; i++) {
      const angle = (i * Math.PI * 2) / 9 + 0.2,
        reach = i % 3 === 1 ? 48 : 31;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(8, -4.2);
      ctx.lineTo(reach, 0);
      ctx.lineTo(8, 4.2);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,.76)';
      ctx.fill();
      ctx.restore();
    }
  });
  tile(sprites.ember, () => {
    ctx.save();
    ctx.scale(0.45, 1);
    glow(0, 0, 53, [
      [0, '#fff'],
      [0.37, '#fff'],
      [0.65, 'rgba(255,255,255,.58)'],
      [1, transparent],
    ]);
    ctx.restore();
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Most transient elements share one material and one draw, including camera-facing
// glyphs and transparent art laid flat on the road. The mode bit selects their basis.
function makeSpriteBatch(scene, capacity) {
  const quad = new THREE.PlaneGeometry(1, 1);
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setIndex(quad.index);
  geometry.setAttribute('position', quad.getAttribute('position'));
  geometry.setAttribute('uv', quad.getAttribute('uv'));
  const buffers = {};
  for (const [name, width] of [
    ['anchor', 3],
    ['sizeModeTile', 4],
    ['tint', 4],
    ['rotation', 1],
  ]) {
    const attribute = new THREE.InstancedBufferAttribute(new Float32Array(capacity * width), width);
    attribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute(name, attribute);
    buffers[name] = attribute;
  }
  const material = new THREE.ShaderMaterial({
    uniforms: { atlas: { value: makeAtlas() } },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
    vertexShader: `
      attribute vec3 anchor;
      attribute vec4 sizeModeTile;
      attribute vec4 tint;
      attribute float rotation;
      varying vec2 vUv;
      varying vec4 vTint;
      void main() {
        float c = cos(rotation), s = sin(rotation);
        vec2 p = position.xy * sizeModeTile.xy;
        p = vec2(c*p.x-s*p.y, s*p.x+c*p.y);
        vec4 view = modelViewMatrix * vec4(anchor, 1.0);
        if (sizeModeTile.z > 0.5) {
          view += modelViewMatrix * vec4(p.x, 0.0, -p.y, 0.0);
        } else {
          view.xy += p;
        }
        gl_Position = projectionMatrix * view;
        float frame = sizeModeTile.w;
        vUv = (uv + vec2(mod(frame, 4.0), 3.0-floor(frame/4.0))) * 0.25;
        vTint = tint;
      }`,
    fragmentShader: `
      uniform sampler2D atlas;
      varying vec2 vUv;
      varying vec4 vTint;
      void main() {
        vec4 pixel = texture2D(atlas, vUv) * vTint;
        if (pixel.a < 0.007) discard;
        gl_FragColor = pixel;
        #include <colorspace_fragment>
      }`,
  });
  material.forceSinglePass = true;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 8;
  geometry.instanceCount = 0;
  scene.add(mesh);
  let count = 0;
  return {
    clear() {
      count = 0;
    },
    write(x, y, z, width, height, flat, tile, color, alpha, angle = 0) {
      if (count >= capacity || alpha < 0.008) return;
      buffers.anchor.setXYZ(count, x, y, z);
      buffers.sizeModeTile.setXYZW(count, width, height, flat ? 1 : 0, tile);
      buffers.tint.setXYZW(count, color.r, color.g, color.b, alpha);
      buffers.rotation.setX(count, angle);
      count++;
    },
    flush() {
      mesh.visible = count > 0;
      geometry.instanceCount = count;
      for (const attribute of Object.values(buffers)) {
        attribute.clearUpdateRanges();
        if (count) attribute.addUpdateRange(0, count * attribute.itemSize);
        attribute.needsUpdate = true;
      }
    },
  };
}

// Profile coordinates are tail to nose. The positive longitudinal axis is -Z.
function missileGeometry(profile, segments) {
  const points = profile.map(([y, radius]) => new THREE.Vector2(radius, y));
  const geometry = new THREE.LatheGeometry(points, segments);
  const colors = new Float32Array(geometry.attributes.position.count * 3);
  const palette = profile.map(([, , hex]) => new THREE.Color(hex));
  for (let i = 0; i < geometry.attributes.position.count; i++)
    palette[i % palette.length].toArray(colors, i * 3);
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function batchOf(scene, geometry, material, maximum, renderOrder) {
  const batch = new THREE.InstancedMesh(geometry, material, maximum);
  batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  batch.count = 0;
  batch.frustumCulled = false;
  batch.renderOrder = renderOrder;
  scene.add(batch);
  return batch;
}

const palette = Object.fromEntries(
  Object.entries({
    white: '#ffffff',
    pearl: '#fff5dc',
    aqua: '#64ffff',
    blue: '#18ccff',
    gold: '#ffd02f',
    orange: '#ff861d',
    fire: '#ff5a16',
    dust: '#ece0cd',
    smoke: '#928180',
    steel: '#8f99a3',
  }).map(([name, hex]) => [name, new THREE.Color(hex)]),
);
const chipColors = ['#555c69', '#8e97a3', '#abb4bc', '#727986', '#a5a7aa'].map(
  (hex) => new THREE.Color(hex),
);
const between = (low, high) => low + (high - low) * Math.random();
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
const TAU = Math.PI * 2;

// One camera-facing ribbon per live round, shaped from points on its actual flight.
function makeTraces(scene, capacity) {
  const strip = new THREE.PlaneGeometry(1, 1, 5, 1);
  const geo = new THREE.InstancedBufferGeometry().copy(strip);
  const starts = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3);
  const ends = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3);
  const styles = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 4), 4);
  for (const [name, attr] of [
    ['trailStart', starts],
    ['trailEnd', ends],
    ['trailStyle', styles],
  ]) {
    geo.setAttribute(name, attr.setUsage(THREE.DynamicDrawUsage));
  }
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    side: THREE.DoubleSide,
    vertexShader: `
      attribute vec3 trailStart, trailEnd;
      attribute vec4 trailStyle;
      varying vec2 vUv;
      varying vec2 vStyle;
      void main() {
        float t = uv.x;
        vec3 path = trailEnd - trailStart;
        vec3 center = mix(trailStart, trailEnd, t);
        center.y += 4.0*t*(1.0-t)*trailStyle.x;
        path.y += 4.0*(1.0-2.0*t)*trailStyle.x;
        vec3 side = normalize(cross(path, cameraPosition-center));
        float radius = trailStyle.y * mix(0.19,1.0,smoothstep(0.0,0.83,t));
        vec3 vertex = center + side*(uv.y*2.0-1.0)*radius;
        gl_Position = projectionMatrix*viewMatrix*vec4(vertex,1.0);
        vUv=uv; vStyle=trailStyle.zw;
      }`,
    fragmentShader: `
      varying vec2 vUv;
      varying vec2 vStyle;
      void main() {
        float edge=abs(vUv.y*2.0-1.0);
        float pulse=step(0.5,vStyle.x)*(1.0-step(1.5,vStyle.x));
        float flame=step(1.5,vStyle.x);
        float gap=smoothstep(0.33,0.39,vUv.x)*(1.0-smoothstep(0.48,0.55,vUv.x));
        vec3 rim=mix(vec3(.012,.39,.96),vec3(.018,.67,.62),pulse);
        rim=mix(rim,vec3(.97,.24,.026),flame);
        vec3 core=mix(vec3(.70,1.0,1.0),vec3(1.0,.84,.40),flame);
        float alpha=(1.0-smoothstep(.64,1.0,edge))*smoothstep(0.0,.28,vUv.x);
        gl_FragColor=vec4(mix(rim,core,(1.0-smoothstep(.10,.61,edge))*vUv.x),alpha*vStyle.y*(1.0-.94*pulse*gap));
        #include <colorspace_fragment>
      }`,
  });
  material.forceSinglePass = true;
  const mesh = new THREE.Mesh(geo, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = 4;
  geo.instanceCount = 0;
  scene.add(mesh);
  return {
    write(i, a, b, bend, width, style, alpha) {
      starts.setXYZ(i, a.x, a.y, a.z);
      ends.setXYZ(i, b.x, b.y, b.z);
      styles.setXYZW(i, bend, width, style, alpha);
    },
    flush(count) {
      geo.instanceCount = count;
      mesh.visible = count > 0;
      if (!count) return;
      for (const attr of [starts, ends, styles]) {
        attr.clearUpdateRanges();
        attr.addUpdateRange(0, count * attr.itemSize);
        attr.needsUpdate = true;
      }
    },
  };
}

export function createEffects(scene) {
  const marks = makeSpriteBatch(scene, 650);
  const shots = batchOf(
    scene,
    missileGeometry(
      [
        [-0.33, 0.004, '#1395ec'],
        [-0.14, 0.026, '#28d7ff'],
        [0.1, 0.039, '#b4fbff'],
        [0.24, 0.025, '#e8ffff'],
        [0.3, 0.002, '#ebffff'],
      ],
      7,
    ),
    new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }),
    320,
    3,
  );
  const rockets = batchOf(
    scene,
    missileGeometry(
      [
        [-0.38, 0.003, '#b9430d'],
        [-0.37, 0.127, '#dd7117'],
        [-0.31, 0.18, '#ff9c1a'],
        [-0.25, 0.19, '#ffc32d'],
        [-0.21, 0.158, '#ef8d18'],
        [-0.15, 0.166, '#ffb824'],
        [0.23, 0.175, '#ffce36'],
        [0.37, 0.16, '#ffcb2c'],
        [0.48, 0.117, '#ffdb46'],
        [0.54, 0.059, '#ffdc56'],
        [0.56, 0.001, '#fff1a3'],
      ],
      14,
    ),
    new THREE.MeshPhongMaterial({
      vertexColors: true,
      emissive: 0x371500,
      specular: 0xffedb0,
      shininess: 62,
    }),
    24,
    3,
  );
  const flames = batchOf(
    scene,
    missileGeometry(
      [
        [-1.52, 0.003, '#ef5615'],
        [-1.18, 0.07, '#fc641b'],
        [-0.77, 0.114, '#ff9f13'],
        [-0.49, 0.149, '#ffe039'],
        [-0.31, 0.112, '#fff8af'],
      ],
      10,
    ),
    new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      toneMapped: false,
    }),
    24,
    6,
  );
  const shards = batchOf(
    scene,
    new THREE.DodecahedronGeometry(1, 0),
    new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x56606b, shininess: 18 }),
    88,
    2,
  );
  const pose = new THREE.Object3D();
  const particles = [],
    chips = [],
    particlePool = [],
    chipPool = [];
  let hitCredit = 5;

  function add(tile, x, y, z, start, end, life, opts = {}) {
    if (particles.length >= 260) {
      if (tile !== sprites.plus && tile !== sprites.arrow && tile !== sprites.crack) return;
      const drop = particles.findIndex(
        (p) => p.tile === sprites.smoke || p.tile === sprites.glint || p.tile === sprites.glow,
      );
      if (drop < 0) return;
      particlePool.push(particles[drop]);
      particles[drop] = particles[particles.length - 1];
      particles.pop();
    }
    const p = particlePool.pop() || {};
    p.tile = tile;
    p.x = x;
    p.y = y;
    p.z = z;
    p.start = start;
    p.end = end;
    p.life = life;
    p.age = 0;
    p.color = opts.color || palette.white;
    p.alpha = opts.alpha ?? 1;
    p.ratio = opts.ratio ?? 1;
    p.vx = opts.vx || 0;
    p.vy = opts.vy || 0;
    p.vz = opts.vz || 0;
    p.gravity = opts.gravity || 0;
    p.angle = opts.angle || 0;
    p.spin = opts.spin || 0;
    p.flat = opts.flat || false;
    p.world = opts.world ?? true;
    p.hold = opts.hold ?? 0.12;
    particles.push(p);
  }

  function scatterSmoke(x, y, z, scale, count, color) {
    for (let i = 0; i < count; i++) {
      const a = ((i + Math.random() * 0.5) * TAU) / count;
      const r = between(0.12, 0.42) * scale,
        velocity = between(0.75, 2.15) * scale;
      add(
        sprites.smoke,
        x + Math.cos(a) * r,
        y + between(0.02, 0.14),
        z + Math.sin(a) * r,
        between(0.23, 0.47) * scale,
        between(0.71, 1.12) * scale,
        between(0.36, 0.6),
        {
          color,
          alpha: between(0.4, 0.63),
          vx: Math.cos(a) * velocity,
          vz: Math.sin(a) * velocity,
          vy: between(0.35, 1.05),
          spin: between(-1.5, 1.5),
          angle: a,
        },
      );
    }
  }

  function scatterSparks(x, y, z, scale, count) {
    for (let i = 0; i < count; i++) {
      const a = ((i + Math.random()) * TAU) / count,
        v = between(1.8, 4.3) * scale;
      add(sprites.ember, x, y, z, between(0.22, 0.39) * scale, 0.035, between(0.21, 0.42), {
        color: i % 3 ? palette.orange : palette.pearl,
        vx: Math.cos(a) * v,
        vz: Math.sin(a) * v,
        vy: between(0.8, 2.5) * scale,
        gravity: 5,
        angle: a,
        spin: between(-2, 2),
        ratio: 1.7,
      });
    }
  }

  function debris(x, y, z, amount, scale, radial = false) {
    for (let i = 0; i < amount && chips.length < shards.instanceMatrix.count; i++) {
      const p = chipPool.pop() || {};
      p.x = x + between(-1.75, 1.75) * scale;
      p.y = y + between(0.14, 0.9);
      p.z = z + between(-0.24, 0.3);
      p.vx = between(-2.8, 2.8);
      p.vz = between(-1.8, 3.5);
      p.vy = between(2.2, 5.2);
      if (radial) {
        const angle = ((i + Math.random()) * TAU) / amount;
        const speed = between(2.2, 4.4);
        p.x = x + Math.cos(angle) * 0.48;
        p.z = z + Math.sin(angle) * 0.48;
        p.vx = Math.cos(angle) * speed;
        p.vz = Math.sin(angle) * speed;
      }
      p.size = between(0.085, 0.245) * scale;
      p.stretch = between(0.52, 1.65);
      p.rx = between(-2, 2);
      p.ry = between(-2, 2);
      p.spin = between(2, 8);
      p.age = 0;
      p.life = between(0.52, 1.04);
      p.color = chipColors[i % chipColors.length];
      chips.push(p);
    }
  }

  function burst(kind, x, y, z, strength = 1) {
    const s = clamp(strength, 0.62, 2.05);
    switch (kind) {
      case 'cardHit':
        add(sprites.glint, x, y, z + 0.1, 0.35, 0.7, 0.12, {color: palette.pearl});
        scatterSparks(x, y, z, 0.45, 3);
        return;
      case 'supplyBreak':
        add(sprites.flash, x, y, z, 0.46, 1.45, 0.13, {color: palette.pearl});
        add(sprites.wave, x, 0.07, z, 0.4, 2.45, 0.32, {flat: true, color: palette.aqua});
        scatterSparks(x, y, z, 0.86, 10);
        return;
      case 'shieldHit':
        add(sprites.wave, x, 0.1, z, 0.4, 1.75, 0.26, {flat: true, color: palette.aqua});
        add(sprites.glint, x, y, z, 0.26, 0.68, 0.14, {color: palette.pearl});
        return;
      case 'hostileMuzzle':
        add(sprites.flash, x, y, z, 0.32, 0.63, 0.14, {color: palette.orange});
        return;
      case 'finisher':
        scatterSparks(x, y, z, 1.35, 16);
        add(sprites.flash, x, y, z, 0.65, 1.45, 0.13, { color: palette.pearl });
        return;
      case 'hit':
        if (hitCredit < 1) return;
        hitCredit--;
        scatterSparks(x, y, z, 0.48, 3);
        add(sprites.glint, x, y, z, 0.26, 0.47, 0.105, {
          color: palette.aqua,
          angle: between(0, TAU),
        });
        return;
      case 'muzzle':
        add(sprites.flash, x, y, z, 0.47 * s, 0.83 * s, 0.105, {
          color: palette.pearl,
          angle: between(0, TAU),
          world: false,
        });
        add(sprites.glow, x, y, z, 0.82 * s, 0.38 * s, 0.13, {
          color: palette.orange,
          alpha: 0.7,
          world: false,
        });
        return;
      case 'impact':
      case 'slam': {
        const slam = kind === 'slam';
        const size = s * (slam ? 1.4 : 1),
          centerY = slam ? 0.16 : Math.max(0.17, y * 0.58);
        if (slam) {
          debris(x, 0.04, z, 12, 0.61, true);
          for (const side of [-1, 1])
            add(sprites.flash, x + side * 0.57, 0.12, z, 0.58, 0.93, 0.1, { color: palette.pearl });
        }
        add(sprites.crack, x, 0.035, z, 2.02 * size, 2.33 * size, slam ? 2 : 1.42, {
          flat: true,
          angle: between(0, TAU),
          hold: 0.62,
        });
        add(
          sprites.wave,
          x,
          0.065,
          z,
          0.42 * size,
          slam ? (2 * slamRadius) / 0.81 : 3.16 * size,
          0.32,
          {
            flat: true,
            color: slam ? palette.gold : palette.pearl,
            alpha: 0.83,
          },
        );
        add(sprites.flash, x, centerY, z, 0.6 * size, 1.85 * size, 0.16, {
          color: palette.gold,
          angle: between(0, TAU),
        });
        add(sprites.glow, x, centerY + 0.06, z, 0.39 * size, 0.93 * size, 0.1, {
          color: palette.pearl,
        });
        scatterSmoke(x, 0.17, z, size, slam ? 12 : 7, slam ? palette.dust : palette.smoke);
        scatterSparks(x, centerY, z, size, slam ? 10 : 5);
        return;
      }
      case 'wallHit':
        add(sprites.flash, x, Math.max(y, 0.4), z + 0.12, 0.38 * s, 1.12 * s, 0.13, {
          color: palette.pearl,
        });
        scatterSmoke(x, Math.max(0.35, y), z, 0.61 * s, 3, palette.steel);
        scatterSparks(x, Math.max(0.4, y), z, 0.59 * s, 3);
        return;
      case 'wallBreak':
        debris(x, 0.24, z, 22, Math.min(1.17, s));
        add(sprites.flash, x, 0.72, z, 0.85 * s, 2.8 * s, 0.19, { color: palette.pearl });
        add(sprites.wave, x, 0.062, z, 0.6, 4.7, 0.38, { flat: true, color: palette.dust });
        for (let i = -1; i <= 1; i++) scatterSmoke(x + i * 1.17, 0.3, z, 0.98, 4, palette.steel);
        scatterSparks(x, 0.8, z, s, 7);
        return;
      case 'plus': {
        add(sprites.wave, x, 0.09, z, 0.12, 1.28, 0.23, { flat: true, color: palette.aqua });
        const base = Math.max(0, y);
        add(sprites.goldWave, x, 0.055, z, 0.22, 0.96, 0.34, {
          flat: true,
          world: false,
          color: palette.gold,
        });
        add(sprites.glow, x, base + 0.36, z, 0.45, 0.82, 0.28, {
          ratio: 1.75,
          world: false,
          color: palette.gold,
        });
        add(sprites.glint, x + 0.08, base + 0.57, z, 0.35, 0.14, 0.23, {
          world: false,
          color: palette.pearl,
        });
        add(sprites.plus, x + between(-0.13, 0.13), base + 0.83, z, 0.8, 1.04, 0.65, {
          world: false,
          vy: 1.1,
          hold: 0.62,
        });
        return;
      }
      case 'merge': {
        add(sprites.goldWave, x, 0.12, z, 2.15, 0.32, 0.27, { flat: true, color: palette.gold });
        const floorSize = clamp(s * 1.55, 1.5, 2.5);
        add(sprites.goldWave, x, 0.061, z, 0.38, floorSize, 0.46, {
          flat: true,
          world: false,
          color: palette.aqua,
          hold: 0.3,
        });
        add(sprites.goldWave, x, 0.077, z, 0.17, floorSize * 0.72, 0.38, {
          flat: true,
          world: false,
          color: palette.gold,
        });
        add(sprites.glow, x, y + 0.62, z, 0.77 * s, 1.6 * s, 0.32, {
          color: palette.gold,
          world: false,
          ratio: 1.3,
          alpha: 0.72,
        });
        for (let i = 0; i < 3; i++) {
          const a = ((i + 0.16) * TAU) / 3;
          add(
            sprites.arrow,
            x + Math.cos(a) * floorSize * 0.31,
            y + 0.3,
            z + Math.sin(a) * floorSize * 0.34,
            0.38,
            0.65,
            0.51 + i * 0.035,
            {
              color: palette.white,
              hold: 0.42,
              vy: 1.55 + 0.15 * i,
              world: false,
            },
          );
        }
        return;
      }
      case 'victory':
        add(sprites.goldWave, x, 0.07, z, 0.5, 5.2 * s, 0.71, { flat: true, color: palette.gold });
        add(sprites.flash, x, y + 0.3, z, 0.6, 2.8 * s, 0.24, { color: palette.pearl });
        scatterSparks(x, y + 0.6, z, 1.6 * s, 19);
        scatterSmoke(x, 0.25, z, 1.4, 8, palette.dust);
        return;
    }
  }

  const forward = new THREE.Vector3(0, 0, -1);
  const heading = new THREE.Vector3();
  const tail = new THREE.Vector3();
  const mid = new THREE.Vector3();
  const traces = makeTraces(scene, 384);
  function packProjectiles(list, dt) {
    let bulletCount = 0,
      rocketCount = 0,
      trailCount = 0;
    for (const p of list) {
      const rocket = p.kind === 'rocket';
      const plasma = p.profile === plasmaRound;
      const pulse = p.profile === pulseRound || plasma;
      const tailDistance = Math.max(0, p.distance - p.profile.tail + p.afterHit * p.profile.speed);
      sampleFlight(p, tailDistance, tail);
      if (p.distance - tailDistance > 0.012 && trailCount < 384) {
        sampleFlight(p, (tailDistance + p.distance) * 0.5, mid);
        const bend = mid.y - (tail.y + p.y) * 0.5;
        const fade = p.range > 4 ? clamp((p.range - tailDistance) / 1.6, 0, 1) : 1;
        traces.write(
          trailCount++,
          tail,
          p,
          bend,
          rocket ? 0.093 : plasma ? 0.092 : pulse ? 0.066 : 0.052,
          rocket ? 2 : pulse ? 1 : 0,
          fade * 0.91,
        );
      }
      if (p.finished) continue;
      sampleFlight(p, p.distance + 0.015, mid);
      heading.set(mid.x - p.x, mid.y - p.y, mid.z - p.z).normalize();
      pose.quaternion.setFromUnitVectors(forward, heading);
      pose.position.set(p.x, p.y, p.z);
      if (!rocket && bulletCount < shots.instanceMatrix.count) {
        pose.scale.set(pulse ? 1.54 : 1.13, pulse ? 1.54 : 1.13, pulse ? 0.62 : 0.83);
        pose.updateMatrix();
        shots.setMatrixAt(bulletCount++, pose.matrix);
        if (p.age < 0.045)
          marks.write(
            p.startX,
            p.startY,
            p.startZ,
            0.21,
            0.21,
            false,
            sprites.flash,
            palette.aqua,
            0.65 * (1 - p.age / 0.045),
          );
      } else if (rocket && rocketCount < rockets.instanceMatrix.count) {
        const size = 0.63 + Math.min(0.19, p.power * 0.055);
        pose.scale.setScalar(size);
        pose.updateMatrix();
        rockets.setMatrixAt(rocketCount, pose.matrix);
        pose.scale.z *= 0.9;
        pose.updateMatrix();
        flames.setMatrixAt(rocketCount++, pose.matrix);
        if (dt > 0 && Math.floor(p.age * 16) !== Math.floor(Math.max(0, p.age - dt) * 16)) {
          add(sprites.smoke, tail.x, tail.y, tail.z, 0.14 * size, 0.39 * size, 0.19, {
            color: palette.dust,
            alpha: 0.38,
            vy: 0.19,
            world: false,
          });
        }
      }
    }
    traces.flush(trailCount);
    shots.count = bulletCount;
    rockets.count = flames.count = rocketCount;
    shots.visible = bulletCount > 0;
    rockets.visible = flames.visible = rocketCount > 0;
    if (bulletCount) shots.instanceMatrix.needsUpdate = true;
    if (rocketCount) {
      rockets.instanceMatrix.needsUpdate = true;
      flames.instanceMatrix.needsUpdate = true;
    }
  }

  function update(dt, worldAdvance, projectiles, incoming = []) {
    const step = clamp(dt, 0, 0.12);
    hitCredit = Math.min(6, hitCredit + step * 21);
    marks.clear();
    packProjectiles(projectiles, step);
    for (const p of incoming) {
      marks.write(p.x - p.vx * 0.038, p.y, p.z - p.vz * 0.038, 0.30, 0.52, false, sprites.glow, palette.fire, 0.8);
      marks.write(p.x, p.y, p.z, 0.30, 0.34, false, sprites.glint, palette.gold, 0.98);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.age += step;
      if (p.age >= p.life) {
        particlePool.push(p);
        particles[i] = particles[particles.length - 1];
        particles.pop();
        continue;
      }
      p.x += p.vx * step;
      p.y += p.vy * step;
      p.z += p.vz * step + (p.world ? worldAdvance : 0);
      p.vy -= p.gravity * step;
      p.angle += p.spin * step;
    }
    // Labels go last so the luminous pickup below a label will not wash its outline away.
    for (let pass = 0; pass < 2; pass++) {
      for (const p of particles) {
        const label = p.tile === sprites.plus || p.tile === sprites.arrow;
        if (label !== (pass === 1)) continue;
        const progress = p.age / p.life,
          eased = 1 - (1 - progress) * (1 - progress);
        const size = THREE.MathUtils.lerp(p.start, p.end, eased);
        const fade = 1 - clamp((progress - p.hold) / (1 - p.hold), 0, 1);
        marks.write(
          p.x,
          p.y,
          p.z,
          size,
          size * p.ratio,
          p.flat,
          p.tile,
          p.color,
          p.alpha * fade,
          p.angle,
        );
      }
    }
    marks.flush();
    let count = 0;
    for (let i = chips.length - 1; i >= 0; i--) {
      const chip = chips[i];
      chip.age += step;
      if (chip.age >= chip.life) {
        chipPool.push(chip);
        chips[i] = chips[chips.length - 1];
        chips.pop();
        continue;
      }
      chip.x += chip.vx * step;
      chip.z += chip.vz * step + worldAdvance;
      chip.y += chip.vy * step;
      chip.vy -= 11 * step;
      if (chip.y < chip.size * 0.4) {
        chip.y = chip.size * 0.4;
        chip.vy = Math.abs(chip.vy) * 0.22;
        chip.vx *= 0.78;
        chip.vz *= 0.78;
      }
      const fade = Math.min(1, (chip.life - chip.age) * 5);
      pose.position.set(chip.x, chip.y, chip.z);
      pose.rotation.set(
        chip.rx + chip.age * chip.spin,
        chip.ry - chip.age * chip.spin * 0.56,
        chip.age * chip.spin * 0.77,
      );
      pose.scale.set(chip.size * chip.stretch * fade, chip.size * 0.74 * fade, chip.size * fade);
      pose.updateMatrix();
      shards.setMatrixAt(count, pose.matrix);
      shards.setColorAt(count++, chip.color);
    }
    shards.count = count;
    shards.visible = count > 0;
    if (count) {
      shards.instanceMatrix.needsUpdate = true;
      shards.instanceColor.needsUpdate = true;
    }
  }

  function reset() {
    particlePool.push(...particles);
    chipPool.push(...chips);
    particles.length = chips.length = 0;
    hitCredit = 5;
    traces.flush(0);
    for (const mesh of [shots, rockets, flames, shards]) {
      mesh.count = 0;
      mesh.visible = false;
    }
    marks.clear();
    marks.flush();
  }
  reset();
  return { update, burst, reset };
}
