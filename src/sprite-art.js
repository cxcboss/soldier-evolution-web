import * as THREE from 'three';
import { helmetPaintGLSL } from './helmet-paint.js';
import { footReach, marchAngle, sampleFeet } from './infantry-walk.js';
import { UNIT_DEFS } from './units.js';

// 原画角色图元配置：队长批次扩至 12 以支持多尊合成重炮队长与钢铁指挥官
const designs = {
  ally: { width: 0.49, height: 0.88, pivot: 0.49, pad: 0.008, capacity: 220, grid: [8, 10] },
  captain: { width: 1.16, height: 1.73, pivot: 0.43, pad: 0.009, capacity: 12, grid: [16, 20] },
  grunt: { width: 0.54, height: 0.88, pivot: 0.5, pad: 0.011, capacity: 1800, grid: [8, 10] },
};
const clamp = THREE.MathUtils.clamp;
const smooth = THREE.MathUtils.smoothstep;

const vertexShader = `
  attribute vec3 anchor;
  attribute float fallAngle;
  attribute vec2 dimensions;
  attribute vec4 motion;
  attribute vec3 feet;
  attribute vec4 treatment;
  uniform vec3 cameraRight;
  uniform vec3 cameraLift;
  uniform float pivot;
  uniform float padding;
  varying vec2 imageUv;
  varying vec3 colorTreatment;
  void main() {
    imageUv = uv;
    colorTreatment = treatment.xyz;
    vec2 point = vec2(uv.x - pivot, (uv.y-padding)/(1.0-2.0*padding));
    float stride = feet.x;
    // 锐化左右腿分缝并赋予轻度自然站距，移除内收横拉偏移，彻底消除双脚粘连
    float sideSign = smoothstep(pivot-0.018,pivot+0.018,uv.x)*2.0-1.0;
    float boots = (1.0-smoothstep(0.08,0.34,uv.y));
    float arms = smoothstep(.15,.32,abs(uv.x-pivot)) * smoothstep(.22,.38,uv.y)
               * (1.0-smoothstep(.46,.63,uv.y));
    float lift = max(0.0,sideSign*feet.z);
    float swing = mix(feet.y,feet.x,sideSign*.5+.5);
    #ifdef CAPTAIN
      arms *= mix(1.0,0.18,smoothstep(pivot,pivot+0.12,uv.x));
    #endif
    float ankle = 1.0-smoothstep(.08,.21,uv.y);
    float chest = smoothstep(.28,.49,uv.y)*(1.0-smoothstep(.58,.72,uv.y));
    point.x += swing * (0.042*arms) + sideSign * (0.036*boots + 0.022*lift*ankle) + stride*.022*chest;
    point.y += ankle*max(0.,-swing)*.022;
    point.y += .148*lift*boots + .024*abs(feet.z)*(1.0-boots) + swing*.058*arms;
    float depthSwing = stride*.033*(uv.x-pivot)*chest + (boots*${footReach / 0.86}-arms*.16)*swing*dimensions.y;
    #ifdef ALLY
      depthSwing *= -1.0;
    #endif
    #ifdef CAPTAIN
      depthSwing *= -1.0;
    #endif
    point.x += treatment.w*uv.y;
    #ifdef CAPTAIN
      float barrel = smoothstep(0.53,0.78,uv.x)*smoothstep(0.40,0.62,uv.y);
      point.y -= (barrel*0.093+uv.y*0.017)*motion.w;
      point.x += barrel*motion.w*0.023;
    #endif
    point *= dimensions;
    float angle = motion.z, c = cos(angle), s = sin(angle);
    // A falling unit tumbles around the waist. Upright runners remain boot-anchored.
    vec2 center = vec2(0.0,dimensions.y*0.42);
    point -= center;
    point = vec2(c*point.x-s*point.y,s*point.x+c*point.y)+center;
    vec3 bodyAxis = normalize(mix(cameraLift,vec3(0.,.035,1.),sin(fallAngle)));
    vec3 world = anchor + cameraRight*point.x + bodyAxis*point.y;
    world.z += depthSwing;
    gl_Position = projectionMatrix*viewMatrix*vec4(world, 1.0);
  }
`;

const fragmentShader = `
  ${helmetPaintGLSL}
  uniform sampler2D portrait;
  varying vec2 imageUv;
  varying vec3 colorTreatment;
  void main() {
    vec4 pixel = texture2D(portrait,imageUv);
    // Keep occlusion correct between rows, the hero, fences and fully 3D units.
    // Mild coverage AA retains fine helmet/gun edges at distant mip levels.
    float coverage = smoothstep(0.23,0.70,pixel.a);
    if (coverage < 0.11) discard;
    #if defined(ALLY) || defined(CAPTAIN)
      pixel.rgb = paintHelmet(pixel.rgb, imageUv.y, false);
    #else
      pixel.rgb = paintHelmet(pixel.rgb, imageUv.y, true);
    #endif
    float luma = dot(pixel.rgb,vec3(0.2126,0.7152,0.0722));
    vec3 ash = vec3(0.13,0.15,0.18) + vec3(0.48,0.48,0.50)*luma;
    vec3 rgb = mix(pixel.rgb,ash,colorTreatment.z);
    vec3 gold = vec3(1.0,0.40,0.012)+vec3(0.20,0.5,0.36)*luma;
    rgb = mix(rgb,gold,colorTreatment.x);
    vec3 highlight = mix(vec3(0.60,0.66,0.70),vec3(1.0,0.98,0.88),sqrt(clamp(luma,0.0,1.0)));
    rgb = mix(rgb,highlight,min(colorTreatment.y,0.75));
    gl_FragColor = vec4(rgb,coverage);
    #include <colorspace_fragment>
  }
`;

function makeBatch(scene, name, texture, right, lift) {
  const spec = designs[name];
  const footState = new Float32Array(3);
  const plane = new THREE.PlaneGeometry(1, 1, ...spec.grid);
  const geometry = new THREE.InstancedBufferGeometry().copy(plane);
  const attributes = {};
  for (const [key, size] of [
    ['anchor', 3],
    ['dimensions', 2],
    ['motion', 4],
    ['feet', 3],
    ['fallAngle', 1],
    ['treatment', 4],
  ]) {
    const attribute = new THREE.InstancedBufferAttribute(
      new Float32Array(spec.capacity * size),
      size,
    );
    attribute.setUsage(THREE.DynamicDrawUsage);
    attributes[key] = attribute;
    geometry.setAttribute(key, attribute);
  }
  geometry.instanceCount = 0;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  const material = new THREE.ShaderMaterial({
    uniforms: {
      portrait: { value: texture },
      cameraRight: { value: right },
      cameraLift: { value: lift },
      pivot: { value: spec.pivot },
      padding: { value: spec.pad },
    },
    defines: name === 'captain' ? { CAPTAIN: 1 } : name === 'ally' ? { ALLY: 1 } : {},
    vertexShader,
    fragmentShader,
    depthWrite: true,
    transparent: false,
    toneMapped: false,
    alphaToCoverage: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `AI ${name}`;
  mesh.visible = false;
  mesh.frustumCulled = false;
  scene.add(mesh);
  let count = 0;
  return {
    begin() {
      count = 0;
    },
    clear() {
      count = 0;
      geometry.instanceCount = 0;
      mesh.visible = false;
    },
    add(
      x,
      y,
      z,
      scaleX,
      scaleY,
      step,
      run,
      angle = 0,
      action = 0,
      gold = 0,
      white = 0,
      gray = 0,
      lean = 0,
      fallAngle = 0,
    ) {
      if (count >= spec.capacity || scaleX <= 0.001 || scaleY <= 0.001) return;
      attributes.fallAngle.setX(count, fallAngle);
      attributes.anchor.setXYZ(count, x, y, z);
      attributes.dimensions.setXY(count, spec.width * scaleX, spec.height * scaleY);
      attributes.motion.setXYZW(count, step, run, angle, action);
      sampleFeet(step, run, footState);
      attributes.feet.setXYZ(count, footState[0], footState[1], footState[2]);
      attributes.treatment.setXYZW(count, gold, white, gray, lean);
      count++;
    },
    flush() {
      geometry.instanceCount = count;
      mesh.visible = count > 0;
      if (!count) return;
      for (const attribute of Object.values(attributes)) {
        attribute.clearUpdateRanges();
        attribute.addUpdateRange(0, count * attribute.itemSize);
        attribute.needsUpdate = true;
      }
    },
  };
}

export async function createSpriteArt(scene) {
  const loader = new THREE.TextureLoader();
  const names = Object.keys(designs);
  const loaded = await Promise.allSettled(
    names.map((name) => loader.loadAsync(`./art/${name}-field.webp?v=kit2`)),
  );
  const failure = loaded.find((result) => result.status === 'rejected');
  if (failure) {
    for (const result of loaded) if (result.status === 'fulfilled') result.value.dispose();
    throw new Error('角色插画加载失败', { cause: failure.reason });
  }
  const right = new THREE.Vector3(),
    lift = new THREE.Vector3(),
    viewUp = new THREE.Vector3();
  const batches = Object.fromEntries(
    names.map((name, i) => [name, makeBatch(scene, name, loaded[i].value, right, lift)]),
  );
  const groups = Object.values(batches);
  const clear = () => groups.forEach((batch) => batch.clear());

  function draw(s, camera, time, mode) {
    if (mode !== 'ai' && mode !== 'hybrid') {
      clear();
      return;
    }
    for (const batch of groups) batch.begin();
    camera.updateWorldMatrix(true, false);
    right.setFromMatrixColumn(camera.matrixWorld, 0);
    right.y = 0;
    right.normalize();
    viewUp.setFromMatrixColumn(camera.matrixWorld, 1);
    // A small pitch retains the painted helmet and shoulder volume under the high camera.
    lift.set(0, 1, 0).lerp(viewUp, 0.42).normalize();
    const full = mode === 'ai';
    const moving = s.phase === 'ready' ? 0.3 : s.playing || s.overrun || s.parade ? 1 : 0;
    const step = time * 10.8 + (s.parade ? s.endTime * 5.6 : 0);
    for (const column of s.columns) {
      for (const e of column.units) {
        if (e.alive)
          batches.grunt.add(e.x, e.lift || 0, e.z, e.size, e.size, marchAngle(e), moving);
      }
    }
    for (const e of s.runners) {
      if (e.alive) batches.grunt.add(e.x, e.lift || 0, e.z, e.size, e.size, marchAngle(e), moving);
    }
    const lean = clamp(s.velocity * 0.007, -0.095, 0.095);
    const rescueLift = s.rope ? 0.68 * Math.sin((Math.PI * s.rope.age) / 0.58) : 0;
    // 全员按真实兵种编成绘制（不再渲染开局固定队长；只有真正合成出 T3/T4 才绘制队长/指挥官）
    for (const u of s.squad) {
      const def = UNIT_DEFS[u.kind] || UNIT_DEFS.rifle;
      const p = clamp(u.age / 0.34, 0, 1);
      const pop = 0.72 + 0.28 * p + 0.14 * Math.sin(p * Math.PI) + (u.mergeBirth || 0) * 0.22;
      if (def.tier >= 3) {
        if (!full) continue; // hybrid 模式下由 view.js 渲染 3D 重炮队长/钢铁指挥官模型
        const capScale = (u.kind === 'titan' ? 1.28 : 1.04) * pop;
        const gold = u.kind === 'titan' ? 0.56 : 0.22;
        batches.captain.add(
          u.x,
          rescueLift + 0.04 * Math.sin(p * Math.PI),
          u.z,
          capScale,
          capScale,
          step * 0.83 + u.phase,
          moving,
          0,
          u.recoil || 0,
          Math.max(gold, (u.mergeBirth || 0) * 0.8),
          0.16 * (u.mergeBirth || 0) + 0.52 * (u.hurt || 0),
          0,
          lean,
          0,
        );
        continue;
      }
      const unitScale = def.scale * pop;
      const tierGold =
        def.tier === 2
          ? u.kind === 'pyro'
            ? 0.44
            : 0.26
          : u.kind === 'flame'
            ? 0.38
            : u.kind === 'shield'
              ? 0.08
              : 0;
      const goldTint = Math.max(0.75 * (1 - p), (u.mergeBirth || 0) * 0.85, tierGold);
      const whiteTint =
        0.22 * (1 - p) +
        (u.hurt || 0) * 0.55 +
        (u.kind === 'tesla' || u.kind === 'storm' ? 0.16 : 0) +
        (s.buffs.fever > 0 || s.overdriveActive > 0 ? 0.14 : 0);
      batches.ally.add(
        u.x,
        rescueLift + 0.045 * Math.sin(p * Math.PI),
        u.z,
        unitScale,
        unitScale,
        step + u.phase,
        moving,
        0,
        0,
        goldTint,
        whiteTint,
        0,
        lean * 0.65,
      );
    }
    // 合成飞旋汇聚演出中的能量化身小兵
    for (const m of s.merges || []) {
      const t = clamp(m.age / m.duration, 0, 1);
      const scale = (UNIT_DEFS[m.kind]?.scale || 1) * (1 - 0.52 * t);
      batches.ally.add(m.x, m.y, m.z, scale, scale, step * 1.4, 0.4, t * 2.2, 0, 0.88, 0.45);
    }
    for (const f of s.deliveries) {
      if (f.slot == null || f.age < 0) continue;
      const unitScale = UNIT_DEFS[f.unitKind]?.scale || 1;
      const size = (0.65 + 0.35 * f.progress) * unitScale;
      batches.ally.add(f.x, f.y, f.z, size, size, step + f.phase, 0.55, 0, 0, 0.45, 0.26);
    }
    for (const e of s.falling) {
      if (e.prone) {
        const fallen = smooth(e.t, 0, 0.42);
        const size = e.size * (s.overrun ? 1 : 1 - smooth(e.t, 1.78, 2.1));
        batches.ally.add(
          e.x,
          0.09 * fallen,
          e.z,
          size,
          size,
          0,
          0,
          0.1 * fallen * e.dir,
          0,
          0,
          0,
          0.3 * fallen,
          0,
          1.5 * fallen,
        );
        continue;
      }
      const p = clamp(e.t / 0.72, 0, 1),
        size = e.size * (1 - smooth(p, 0.55, 1));
      const tilt = e.roll * e.t + 0.16 * Math.sin(e.spin * e.t);
      const batch = e.side === 'red' ? batches.grunt : batches.ally;
      batch.add(
        e.x,
        e.y,
        e.z,
        size,
        size,
        step + e.phase,
        0,
        tilt,
        0,
        0.55 * (1 - smooth(p, 0.08, 0.45)),
        0.72 * (1 - smooth(p, 0.03, 0.26)),
        0.22 * smooth(p, 0.25, 0.75),
      );
    }
    for (const batch of groups) batch.flush();
  }
  return {
    draw,
    clear,
    captainTexture: loaded[names.indexOf('captain')].value,
    gruntTexture: loaded[names.indexOf('grunt')].value,
    allyTexture: loaded[names.indexOf('ally')].value,
  };
}
