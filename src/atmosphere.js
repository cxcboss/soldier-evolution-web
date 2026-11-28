import * as THREE from 'three';
import { landscapes } from './campaign.js';

/**
 * 章节氛围、天空渐变背景、动态光照与环境飘浮粒子系统。
 * 彻底消除原版“纯深蓝底色+死板统一光照”的割裂感，让 6 个章节拥有截然不同的气候与光影氛围。
 */

const PARTICLE_COUNT = 72;

export function createAtmosphere(scene, renderer) {
  // 1. 三点章节动态光照系统（按主题平滑插值）
  const hemi = new THREE.HemisphereLight(0xf6f5ff, 0x62738c, 1.38);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff0d8, 2.25);
  key.position.set(-9, 17, 7);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x88d4ff, 0.85);
  rim.position.set(8, 9, -10);
  scene.add(rim);

  // 2. 动态战斗点光源池（常驻 visible=true 仅调节 intensity，避免 NUM_POINT_LIGHTS 宏变化触发着色器重编译）
  const dynamicLights = [0, 1].map(() => {
    const light = new THREE.PointLight(0xff9b3d, 0, 15, 1.6);
    light.visible = true;
    scene.add(light);
    return { light, active: false, age: 1, life: 0.35, peak: 0 };
  });
  let nextLight = 0;

  // 3. 远景渐变天空与太阳/极光/红月背景板（挂在相机视野远处，不参与弯道变形）
  const skyUniforms = {
    topColor: { value: new THREE.Color('#0c2c57') },
    horizonColor: { value: new THREE.Color('#3b7cb0') },
    sunColor: { value: new THREE.Color('#ffe29c') },
    sunPos: { value: new THREE.Vector2(-0.42, 0.72) },
    aurora: { value: 0 },
    clock: { value: 0 },
  };
  const skyMat = new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.9999, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor, horizonColor, sunColor;
      uniform vec2 sunPos;
      uniform float aurora, clock;
      varying vec2 vUv;
      void main() {
        float h = clamp(vUv.y, 0.0, 1.0);
        // 上部为高空，中上部为天际线云霞光带，下部自然过渡到深水色
        float skyBand = smoothstep(0.54, 1.0, h);
        vec3 col = mix(horizonColor, topColor, pow(skyBand, 0.72));
        // 地平线散射亮带
        float bandGlow = exp(-pow((h - 0.78) * 6.5, 2.0)) * 0.24;
        col += sunColor * bandGlow;
        // 太阳 / 红月柔光晕
        vec2 aspectUv = vec2((vUv.x - 0.5) * 0.62, vUv.y);
        float d = length(aspectUv - vec2(sunPos.x * 0.62, sunPos.y));
        col += sunColor * (exp(-d * 4.5) * 0.42 + smoothstep(0.075, 0.045, d) * 0.55);
        // 极光带（冰河章节激活）
        if (aurora > 0.01) {
          float wave = sin(vUv.x * 8.0 + clock * 0.45 + sin(vUv.x * 3.2 - clock * 0.25) * 1.4);
          float ribbon = exp(-pow((h - 0.87 - wave * 0.045) * 15.0, 2.0));
          float ribbon2 = exp(-pow((h - 0.92 + wave * 0.03) * 18.0, 2.0));
          vec3 auraCol = mix(vec3(0.18, 0.96, 0.72), vec3(0.55, 0.45, 1.0), vUv.x);
          col += auraCol * (ribbon * 0.42 + ribbon2 * 0.28) * aurora;
        }
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
  skyMat.userData.unbent = true;
  const skyQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), skyMat);
  skyQuad.frustumCulled = false;
  skyQuad.renderOrder = -100;
  scene.add(skyQuad);

  // 4. 大气指数雾（提供远景纵深感与章节色融合）
  const fog = new THREE.FogExp2(0x16385b, 0.0085);
  scene.fog = fog;

  // 5. 章节环境飘浮微粒（雪花 / 火山余烬 / 林谷光叶 / 港口光尘 / 工业火星）
  const moteGeo = new THREE.PlaneGeometry(0.16, 0.16);
  const moteMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      tint: { value: new THREE.Color('#fff1cc') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vAlpha;
      void main() {
        vUv = uv;
        vec4 mvCenter = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float scale = length(vec3(instanceMatrix[0].xyz));
        mvCenter.xy += position.xy * scale;
        vAlpha = smoothstep(-58.0, -36.0, mvCenter.z) * smoothstep(2.0, -4.0, mvCenter.z);
        gl_Position = projectionMatrix * mvCenter;
      }
    `,
    fragmentShader: `
      uniform vec3 tint;
      varying vec2 vUv;
      varying float vAlpha;
      void main() {
        float r = length(vUv - 0.5) * 2.0;
        float glow = smoothstep(1.0, 0.12, r);
        float alpha = glow * glow * 0.62 * vAlpha;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(tint, alpha);
      }
    `,
  });
  const motes = new THREE.InstancedMesh(moteGeo, moteMat, PARTICLE_COUNT);
  motes.frustumCulled = false;
  motes.renderOrder = 7;
  motes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(motes);

  // 初始化环境微粒状态
  const moteData = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    x: (((i * 73) % 100) / 100 - 0.5) * 22,
    y: 0.4 + (((i * 37) % 100) / 100) * 6.5,
    z: -48 + (((i * 53) % 100) / 100) * 56,
    phase: i * 1.13,
    size: 0.65 + ((i * 29) % 100) / 85,
  }));
  const dummy = new THREE.Object3D();

  let currentTheme = null;
  let moteStyle = 'breeze';

  function applyTheme(theme) {
    if (theme === currentTheme) return;
    currentTheme = theme;
    const c = landscapes[theme] || landscapes.quay;
    hemi.color.set(c.hemiSky);
    hemi.groundColor.set(c.hemiGround);
    hemi.intensity = c.hemiIntensity ?? 1.38;

    key.color.set(c.keyLight);
    key.intensity = c.keyIntensity ?? 2.25;

    rim.color.set(c.rimLight);
    rim.intensity = c.rimIntensity ?? 0.88;

    fog.color.set(c.fog);
    fog.density = c.fogDensity ?? 0.0082;
    renderer.setClearColor(c.deep, 1);
    renderer.toneMappingExposure = c.exposure ?? 1.06;

    skyUniforms.topColor.value.set(c.skyTop);
    skyUniforms.horizonColor.value.set(c.skyHorizon);
    skyUniforms.sunColor.value.set(c.sunColor);
    skyUniforms.aurora.value = theme === 'ice' ? 1.0 : 0.0;

    moteMat.uniforms.tint.value.set(c.moteColor);
    moteStyle = c.moteStyle || 'breeze';
  }

  /** 触发一盏瞬态局部动态战斗点光源 */
  function flashLight(x, y, z, hexColor, peakIntensity = 8, duration = 0.28) {
    const slot = dynamicLights[nextLight++ % dynamicLights.length];
    slot.light.position.set(x, Math.max(0.6, y + 0.45), z);
    slot.light.color.setHex(hexColor);
    slot.light.intensity = peakIntensity;
    slot.active = true;
    slot.peak = peakIntensity;
    slot.life = duration;
    slot.age = 0;
  }

  function update(theme, time, dt, worldAdvance) {
    applyTheme(theme);
    skyUniforms.clock.value = time;

    // 更新动态战斗点光源衰减（不切换 visible，零着色器重编译）
    for (const slot of dynamicLights) {
      if (!slot.active) continue;
      slot.age += dt;
      slot.light.position.z += worldAdvance;
      const t = slot.age / slot.life;
      if (t >= 1) {
        slot.light.intensity = 0;
        slot.active = false;
      } else {
        slot.light.intensity = slot.peak * (1 - t) * (1 - t);
      }
    }

    // 更新章节环境微粒飘动
    const rising = moteStyle === 'embers';
    const snow = moteStyle === 'snow';
    const speedY = rising ? 2.1 : snow ? -1.45 : -0.35;
    const driftX = rising ? 0.65 : snow ? 1.15 : 0.9;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const m = moteData[i];
      m.z += worldAdvance * 0.92 + (snow ? 1.6 : 0.8) * dt;
      m.y += speedY * dt;
      m.x += Math.sin(time * 1.4 + m.phase) * driftX * dt;
      if (m.z > 9) m.z -= 56;
      if (m.y < 0.25) m.y = 6.8;
      if (m.y > 7.2) m.y = 0.35;
      if (m.x > 11.5) m.x = -11.5;
      if (m.x < -11.5) m.x = 11.5;
      const twinkle = 0.72 + 0.28 * Math.sin(time * 4.2 + m.phase);
      dummy.position.set(m.x, m.y, m.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(m.size * (rising ? 1.15 : snow ? 1.1 : 0.95) * twinkle);
      dummy.updateMatrix();
      motes.setMatrixAt(i, dummy.matrix);
    }
    motes.instanceMatrix.needsUpdate = true;
  }

  return { update, flashLight, applyTheme };
}
