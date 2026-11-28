import * as THREE from 'three';
import { createCaptain, createTroopGeometry, fieldEquipment } from './figures.js';
import { loadBrawler } from './brawler.js';
import { slamRadius, touchdown } from './brawler-motion.js';
import { createRoadBend } from './road-bend.js';
import { makeSupplyTokens } from './supply-art.js';
import { createCourseArt } from './course-art.js';
import { createBossFX } from './boss-fx.js';
import { createEffects } from './effects.js';
import { createSpriteArt } from './sprite-art.js';
import { createInfantryModel } from './infantry-paint.js';
import { footReach, marchAngle, sampleFeet } from './infantry-walk.js';
import { createAtmosphere } from './atmosphere.js';

const pose = new THREE.Object3D();

/** 只上传有效实例范围的矩阵数据，大幅削减每帧 GPU 显存带宽开销 */
function flushInstancedMatrix(mesh, count) {
  mesh.count = count;
  mesh.visible = count > 0;
  if (count > 0) {
    mesh.instanceMatrix.clearUpdateRanges();
    mesh.instanceMatrix.addUpdateRange(0, count * 16);
    mesh.instanceMatrix.needsUpdate = true;
  }
}

function troops(scene, side, capacity) {
  const feet = new Float32Array(3);
  const geo = createTroopGeometry(side, 'near');
  const motion = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 4), 4).setUsage(
    THREE.DynamicDrawUsage,
  );
  geo.setAttribute('stepPose', motion);
  const mat = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 42,
    specular: 0x3b4554,
  });
  mat.customProgramCacheKey = () => 'infantry-walk-' + side;
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        attribute float limb;
        attribute vec4 stepPose;
        varying float vGlow;
        const float facing = ${side === 'red' ? '1.0' : '-1.0'};
        mat2 swingJoint() {
          float arm = step(1.5,abs(limb));
          float stride = limb < 0.0 ? stepPose.z : stepPose.y;
          float s = facing * stride * mix(-.62,.78,arm) * step(.5,abs(limb));
          float c = sqrt(max(.01,1.0-s*s));
          return mat2(c,s,-s,c);
        }`,
      )
      .replace(
        '#include <beginnormal_vertex>',
        `#include <beginnormal_vertex>
        mat2 jointTurn = swingJoint();
        objectNormal.yz = jointTurn * objectNormal.yz;`,
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vGlow = stepPose.x;
        float arm = step(1.5,abs(limb));
        float leg = step(.5,abs(limb))*(1.0-arm);
        float stride = limb<0.0 ? stepPose.z : stepPose.y;
        float lift = max(0.0,sign(limb)*stepPose.w);
        float pivot = mix(.29,.438,arm);
        transformed.yz = jointTurn * (position.yz-vec2(pivot,0.0))+vec2(pivot,0.0);
        float boot = leg*(1.0-smoothstep(.105,.28,position.y));
        vec2 sole = position.yz + vec2(.118*lift,facing*${footReach}*stride);
        transformed.yz = mix(transformed.yz,sole,boot);
        transformed.y += .022*abs(stepPose.w)*(1.0-boot);
        transformed.x += stepPose.y*.018*position.y + sign(limb)*arm*.009*stride;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vGlow;')
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
      if (vGlow <= -1.0) {
        vec3 faded = mix(diffuseColor.rgb,vec3(dot(diffuseColor.rgb,vec3(.30,.59,.11))),.18)*.86;
        diffuseColor.rgb = mix(faded,vec3(1.,.90,.66),clamp(-vGlow-1.,0.,1.)*.74);
      }
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(1.0,.78,.24), clamp(vGlow,0.0,1.0)*.94);`,
      );
  };
  const mesh = new THREE.InstancedMesh(geo, mat, capacity);
  let uniform;
  mesh.count = 0;
  mesh.visible = false;
  mesh.frustumCulled = false;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(mesh);
  let count = 0;
  return {
    paint(texture, reverse) {
      uniform = createInfantryModel(side, texture, reverse, motion, capacity);
      uniform.instanceMatrix = mesh.instanceMatrix;
      scene.add(uniform);
      return uniform;
    },
    begin() {
      count = 0;
    },
    put(x, y, z, scale, glow = 0, rx = 0, ry = 0, rz = 0, phase = 0, gait = 0) {
      if (count >= capacity) return;
      pose.position.set(x, y, z);
      pose.rotation.set(rx, ry, rz);
      pose.scale.setScalar(scale);
      pose.updateMatrix();
      mesh.setMatrixAt(count, pose.matrix);
      sampleFeet(phase, gait, feet);
      motion.setXYZW(count, glow, feet[0], feet[1], feet[2]);
      count++;
    },
    end() {
      mesh.count = count;
      mesh.visible = count > 0 && !uniform;
      if (uniform) {
        uniform.count = count;
        uniform.visible = count > 0;
      }
      if (count > 0) {
        mesh.instanceMatrix.clearUpdateRanges();
        mesh.instanceMatrix.addUpdateRange(0, count * 16);
        mesh.instanceMatrix.needsUpdate = true;
        motion.clearUpdateRanges();
        motion.addUpdateRange(0, count * 4);
        motion.needsUpdate = true;
      }
    },
  };
}

function shadows(scene) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const penumbra = ctx.createRadialGradient(35, 32, 2, 34, 32, 29);
  penumbra.addColorStop(0, 'rgba(24,28,50,.48)');
  penumbra.addColorStop(0.53, 'rgba(28,31,54,.34)');
  penumbra.addColorStop(0.83, 'rgba(36,39,62,.14)');
  penumbra.addColorStop(1, 'rgba(36,39,62,0)');
  ctx.fillStyle = penumbra;
  ctx.fillRect(0, 0, 64, 64);
  const contact = ctx.createRadialGradient(23, 32, 1, 24, 32, 17);
  contact.addColorStop(0, 'rgba(18,20,40,.52)');
  contact.addColorStop(0.57, 'rgba(22,25,46,.28)');
  contact.addColorStop(1, 'rgba(22,25,46,0)');
  ctx.fillStyle = contact;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  const geometry = new THREE.PlaneGeometry(1, 1);
  geometry.rotateX(-Math.PI / 2);
  const mesh = new THREE.InstancedMesh(
    geometry,
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
    1600,
  );
  mesh.count = 0;
  mesh.visible = false;
  mesh.frustumCulled = false;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.renderOrder = 1;
  scene.add(mesh);
  let count = 0;
  return {
    begin() {
      count = 0;
    },
    put(x, z, size, elongate = 1, reach = 1) {
      if (count >= 1600) return;
      pose.position.set(x + size * 0.29 * reach, 0.021, z - size * 0.19 * reach);
      pose.rotation.set(0, 0.65, 0);
      pose.scale.set(size * 1.68 * reach, 0.95, size * 0.85 * elongate);
      pose.updateMatrix();
      mesh.setMatrixAt(count++, pose.matrix);
    },
    end() {
      flushInstancedMatrix(mesh, count);
    },
  };
}

function footRing(radius, inner, color, alpha, scene) {
  const geo = new THREE.RingGeometry(inner, radius, 64);
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: alpha,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  mesh.renderOrder = 3;
  scene.add(mesh);
  return mesh;
}

/** 队长脚下双层旋转进化战术光环（随军团阶梯 T1~T4 与狂热/超载动态演化） */
function createTacticalAura(scene) {
  const geo = new THREE.PlaneGeometry(2.15, 2.15);
  geo.rotateX(-Math.PI / 2);
  const uniforms = {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#3af2c8') },
    uAccent: { value: new THREE.Color('#9effea') },
    uTier: { value: 1 },
    uBoost: { value: 0 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    blending: THREE.AdditiveBlending,
    vertexShader:
      'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `
      uniform float uTime, uTier, uBoost;
      uniform vec3 uColor, uAccent;
      varying vec2 vUv;
      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float r = length(p);
        if (r > 1.0) discard;
        float angle = atan(p.y, p.x);
        // 主光圈
        float mainRing = exp(-pow((r - 0.68) * 26.0, 2.0));
        // 旋转战术刻度环
        float ticks = step(0.32, fract((angle + uTime * (0.9 + uTier * 0.35)) * (3.0 + uTier) / 3.14159));
        float outerRing = exp(-pow((r - 0.84) * 32.0, 2.0)) * (0.45 + 0.55 * ticks);
        // 内圈柔和能量填充 + 脉冲扫波
        float pulse = exp(-pow((r - fract(uTime * (0.85 + uBoost * 0.6)) * 0.72) * 18.0, 2.0)) * 0.4;
        float coreGlow = smoothstep(0.66, 0.15, r) * (0.14 + 0.14 * uBoost);
        float intensity = mainRing * 0.95 + outerRing * (0.38 + 0.16 * uTier) + pulse + coreGlow;
        vec3 col = mix(uColor, uAccent, mainRing * 0.65 + uBoost * 0.35);
        float alpha = clamp(intensity * (0.78 + 0.22 * uBoost), 0.0, 1.0);
        if (alpha < 0.015) discard;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = 3;
  scene.add(mesh);
  const tierColors = [
    ['#36e6c4', '#b6fff0'], // T1 登陆新兵
    ['#3ab8ff', '#b8ecff'], // T2 突击精锐
    ['#ffb82e', '#fff099'], // T3 重装连队
    ['#ff6d2e', '#fff7b2'], // T4 钢铁军团
  ];
  return {
    mesh,
    update(s, time) {
      const dead = s.phase === 'lost';
      mesh.visible = !dead && !s.parade;
      if (!mesh.visible) return;
      const tier = Math.max(1, Math.min(4, s.tier || 1));
      const boost = s.buffs.fever > 0 || s.overdriveActive > 0 ? 1 : 0;
      const [baseHex, accHex] = boost ? ['#ffbe2e', '#ffffff'] : tierColors[tier - 1];
      uniforms.uColor.value.set(baseHex);
      uniforms.uAccent.value.set(accHex);
      uniforms.uTime.value = time;
      uniforms.uTier.value = tier;
      uniforms.uBoost.value = boost;
      mesh.position.set(s.x, 0.048, s.captainZ);
      mesh.scale.setScalar(s.visualScale * (1 + boost * 0.12));
    },
  };
}

export function makeView(canvas, stage) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x0a3356, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;

  const scene = new THREE.Scene();
  const bend = createRoadBend(renderer, scene);
  const atmosphere = createAtmosphere(scene, renderer);

  const camera = new THREE.PerspectiveCamera(41, 1, 0.15, 165),
    world = new THREE.Vector3();
  const captain = createCaptain();
  scene.add(captain.root);
  const warning = footRing(slamRadius, slamRadius - 0.065, 0xff7b29, 0.88, scene);
  const countdown = footRing(slamRadius, slamRadius - 0.13, 0xffcf5e, 0.44, scene);

  // 同步挂载 Boss 容器，非铁拳队长关卡无需阻塞首屏下载 1.77MB GLB
  const boss = loadBrawler();
  scene.add(boss.root);

  const blue = troops(scene, 'blue', 180),
    red = troops(scene, 'red', 1800);
  const shade = shadows(scene);
  const aura = createTacticalAura(scene);

  const shield = new THREE.Mesh(
    new THREE.SphereGeometry(1, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader:
        'varying vec3 n; varying vec3 eye; void main(){vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal);eye=-p.xyz;gl_Position=projectionMatrix*p;}',
      fragmentShader:
        'varying vec3 n; varying vec3 eye; void main(){float rim=pow(1.-abs(dot(normalize(n),normalize(eye))),1.85);gl_FragColor=vec4(.28,.88,1.,.06+.62*rim);}',
    }),
  );
  scene.add(shield);

  const support = new THREE.InstancedMesh(
    new THREE.OctahedronGeometry(0.21),
    new THREE.MeshPhongMaterial({ color: 0x74e8ff, emissive: 0x1d78b8, shininess: 90 }),
    20,
  );
  support.count = 0;
  support.visible = false;
  support.frustumCulled = false;
  support.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(support);

  const kits = {};
  const kitMaterial = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 46 });
  for (const role of ['gunner', 'guard', 'bomber', 'standard', 'vault', 'courier']) {
    const mesh = new THREE.InstancedMesh(fieldEquipment(role), kitMaterial, 32);
    mesh.count = 0;
    mesh.visible = false;
    mesh.frustumCulled = false;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);
    kits[role] = mesh;
  }

  const drawBossSkills = createBossFX(scene);
  const tokens = makeSupplyTokens(scene);
  const course = createCourseArt(scene, bend.curve),
    effects = createEffects(scene);

  let sprites = null;
  const spritesReady = createSpriteArt(scene)
    .then((result) => {
      sprites = result;
      captain.paint(result.captainTexture, result.gruntTexture);
      blue.paint(result.allyTexture, result.gruntTexture);
      red.paint(result.gruntTexture, result.allyTexture);
      bend.markDirty();
      return true;
    })
    .catch((error) => {
      console.warn('角色贴图加载失败，已使用 3D 模型', error);
      return false;
    });

  const assets = spritesReady;
  let cameraX = -3.72,
    bossPullback = 0,
    shake = 0,
    fovPunch = 0,
    baseFov = 41,
    width = 1,
    height = 1,
    quality = Math.min(devicePixelRatio || 1, 1.75);

  const resize = () => {
    width = stage.clientWidth;
    height = stage.clientHeight;
    camera.aspect = width / Math.max(1, height);
    baseFov = THREE.MathUtils.clamp(41 + (0.54 - camera.aspect) * 27, 37, 47);
    camera.fov = baseFov;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(quality);
    renderer.setSize(width, height, false);
  };
  resize();

  function draw(s, time, dt, advance, mode) {
    if (!sprites) mode = '3d';
    const playing = s.playing,
      is3d = mode !== 'ai';
    const mix = 1 - Math.exp(-8.5 * dt);
    bend.setRoute(s.route.theme, s.stage, s.distance);
    atmosphere.update(s.route.theme, time, dt, advance);

    const defeatTime = s.boss.defeatAge;
    const finishFocus = s.boss.defeated
      ? 0.18 *
        THREE.MathUtils.smoothstep(defeatTime, 0, 0.42) *
        (1 - THREE.MathUtils.smoothstep(defeatTime, 0.82, 1.65))
      : 0;
    const halfView = 19.5 * Math.tan(THREE.MathUtils.degToRad(baseFov / 2)) * camera.aspect;
    const edgePan = Math.sign(s.x) * Math.max(0, Math.abs(s.x) - halfView * 0.54);
    const onCurve = bend.curve.x > 0;
    const nearPan = onCurve ? THREE.MathUtils.clamp(edgePan, -1.0, 1.0) : edgePan;

    // 近身 Boss 战抬升俯角并适当后拉，避免队长遮挡 Boss 本体和技能动作
    const bossX = s.boss.x + bend.offset(s.boss.z);
    const portrait = 1 - THREE.MathUtils.smoothstep(camera.aspect, 0.6, 0.92);
    const duel = s.boss.active
      ? portrait *
        THREE.MathUtils.smoothstep(s.boss.z, -16, -4) *
        (1 - THREE.MathUtils.smoothstep(defeatTime, 1.45, 2.05))
      : 0;
    const center = THREE.MathUtils.lerp(s.x, bossX, 0.55);
    const pan = THREE.MathUtils.lerp(nearPan, center, duel * 0.85);
    const focusX = THREE.MathUtils.lerp(pan, bossX, finishFocus);
    const focusZ = (s.boss.z + 5.4) * finishFocus;
    if (onCurve && !s.boss.active) cameraX = THREE.MathUtils.clamp(cameraX, -1, 1);
    cameraX += (focusX - cameraX) * mix;
    const desiredPullback = duel * (3.1 + Math.min(3.2, Math.abs(s.x - bossX) * 0.48));
    bossPullback += (desiredPullback - bossPullback) * mix;

    shake = Math.max(0, shake - dt * 1.9);
    fovPunch = Math.max(0, fovPunch - dt * 4.8);
    const targetFov = baseFov + fovPunch * 2.1;
    if (Math.abs(camera.fov - targetFov) > 0.02) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }

    const jx = Math.sin(time * 62) * shake * shake * 0.21,
      jy = Math.sin(time * 76) * shake * shake * 0.14;
    const roadEyeY = onCurve
      ? THREE.MathUtils.clamp(19.5 + (0.5 - camera.aspect) * 29, 17.5, 23.4)
      : 15.2;
    const eyeY = roadEyeY + bossPullback;
    const eyeZ = 13.2 + (eyeY - 15) * 0.81;
    const tangent = onCurve ? (cameraX - bend.offset(-22) * 0.45) / 30 : 0;
    const fovHalf = THREE.MathUtils.degToRad(baseFov / 2);
    const normalPitch = Math.atan2(14.88, 20.65);
    const topZ = 13.2 - 15 / Math.tan(normalPitch - fovHalf);
    const pitch = Math.atan2(eyeY, eyeZ - topZ) + fovHalf;
    const lookZ = eyeZ - (eyeY - 0.12) / Math.tan(pitch);
    camera.position.set(
      cameraX + jx + tangent * eyeZ,
      eyeY + jy - finishFocus * 1.2,
      eyeZ + focusZ,
    );
    camera.lookAt(cameraX + 0.06 + jx + tangent * lookZ, 0.12, lookZ + focusZ);
    camera.updateMatrixWorld();
    bend.setCamera(camera);

    const walk = playing || s.overrun || s.parade ? 1 : 0;
    const step = time * 10.8 + (s.parade ? s.endTime * 5.6 : 0);
    course.update(s);
    shade.begin();
    blue.begin();
    red.begin();
    for (const c of s.columns)
      for (const e of c.units) {
        if (!e.alive || e.z < s.entryZ - 3) continue;
        if (mode === '3d') {
          red.put(e.x, e.lift || 0, e.z, e.size, 0, 0, e.yaw, 0, marchAngle(e), walk);
        }
        const shadowScale = THREE.MathUtils.smoothstep(e.z, -45, -30);
        if (shadowScale > 0) shade.put(e.x, e.z, 0.64 * shadowScale);
      }

    const kitCounts = { gunner: 0, guard: 0, bomber: 0, standard: 0, vault: 0, courier: 0 };
    for (const e of s.runners) {
      if (!e.alive) continue;
      const kit = kits[e.role];
      if (kit && kitCounts[e.role] < kit.instanceMatrix.count) {
        pose.position.set(e.x, (e.lift || 0) + 0.012, e.z);
        pose.rotation.set(0, e.yaw, 0);
        pose.scale.setScalar(e.size);
        pose.updateMatrix();
        kit.setMatrixAt(kitCounts[e.role]++, pose.matrix);
      }
      if (mode === '3d')
        red.put(e.x, e.lift || 0, e.z, e.size, 0, 0, e.yaw, 0, marchAngle(e), walk);
      shade.put(e.x, e.z, 0.67);
    }
    for (const [role, mesh] of Object.entries(kits)) flushInstancedMatrix(mesh, kitCounts[role]);

    const tier = s.tier || 1;
    for (const a of s.allies) {
      let scale = 1;
      if (a.age < 0.25)
        scale =
          0.55 +
          0.45 * Math.min(1, a.age / 0.15) +
          Math.sin(Math.PI * Math.min(1, a.age / 0.25)) * 0.18;
      const elite =
        tier >= 4 || (tier === 3 && a.slot % 2 === 0) || (tier === 2 && a.slot % 4 === 0);
      if (elite) scale *= 1.06;
      if (mode === '3d')
        blue.put(
          a.x,
          0,
          a.z,
          scale,
          Math.max(0, 1 - a.age * 2.8, elite ? 0.22 : 0),
          0,
          -s.velocity * 0.014,
          0,
          step + a.phase,
          walk,
        );
      shade.put(a.x, a.z, 0.71 * scale);
    }

    let supportCount = 0;
    function crystal(x, y, z, size) {
      if (supportCount >= support.instanceMatrix.count) return;
      pose.position.set(x, y, z);
      pose.rotation.set(0.18, time * 4, 0);
      pose.scale.setScalar(size);
      pose.updateMatrix();
      support.setMatrixAt(supportCount++, pose.matrix);
    }
    tokens.update(s.deliveries);
    for (const f of s.deliveries) {
      if (f.age < 0 || f.slot == null) continue;
      if (mode === '3d')
        blue.put(f.x, f.y, f.z, 0.65 + 0.35 * f.progress, 0.42, 0, 0, 0, step + f.phase, 0.55);
    }
    if (s.buffs.drone > 0 || s.overdriveActive > 0)
      for (const side of [-1, 1])
        crystal(s.x + side * 1.18, 1.32 + 0.08 * Math.sin(time * 6), s.captainZ - 0.32, 1.08);
    flushInstancedMatrix(support, supportCount);

    shield.visible = playing && (s.buffs.shield > 0 || s.overdriveActive > 0);
    if (shield.visible) {
      shield.position.set(s.x, 0.06, s.captainZ);
      shield.scale.set(1.56 * s.scale, 1.58, 1.32 * s.scale);
    }

    for (const e of s.falling) {
      const drop = THREE.MathUtils.smoothstep(e.t, 0, 0.42);
      const scale =
        (e.size || 1) *
        (e.prone
          ? s.overrun
            ? 1
            : 1 - THREE.MathUtils.smoothstep(e.t, 1.78, 2.1)
          : 1 - Math.pow(Math.min(1, e.t / 0.75), 3.4));
      if (mode === '3d')
        (e.side === 'red' ? red : blue).put(
          e.x,
          e.prone ? 0.15 * drop : e.y,
          e.z,
          scale,
          -2 + THREE.MathUtils.smoothstep(e.t, 0.018, 0.16),
          e.prone ? 1.48 * drop : e.spin * e.t,
          e.prone ? 0.12 * e.dir : e.phase,
          e.prone ? 0.16 * drop * e.dir : e.roll * e.t,
        );
      if (e.y < 2) shade.put(e.x, e.z, 0.64 * scale);
    }

    const dead = s.phase === 'lost',
      mainSize = s.visualScale;
    const overrunFall = s.overrun ? THREE.MathUtils.smoothstep(s.endTime, 0, 0.5) : 0;
    const otherFall = dead && !s.overrun;
    captain.root.visible = is3d && (!otherFall || s.endTime < 0.4);
    const rescueLift = s.rope ? 0.68 * Math.sin((Math.PI * s.rope.age) / 0.58) : 0;
    captain.root.position.set(
      s.x,
      s.overrun
        ? 0.25 * overrunFall
        : otherFall
          ? Math.sin(Math.min(1, s.endTime / 0.4) * Math.PI) * 0.64
          : rescueLift,
      s.captainZ,
    );
    captain.root.rotation.set(
      1.45 * overrunFall,
      dead ? 0 : -s.velocity * 0.018,
      otherFall ? -s.endTime * 5 : -0.16 * overrunFall,
    );
    captain.root.scale.setScalar(mainSize * (otherFall ? Math.max(0.05, 1 - s.endTime * 2) : 1));
    captain.animate({
      time: time + (s.parade ? s.endTime * 0.54 : 0),
      run: s.parade ? 1 : playing ? 0.91 : dead ? 0 : 0.09,
      recoil: s.recoil,
      merge: Math.max(s.mergeGlow, s.hurt * 0.62, s.overdriveActive > 0 ? 0.35 : 0),
      lean: THREE.MathUtils.clamp(s.velocity / 9, -1, 1),
    });

    const b = s.boss;
    boss.root.visible = b.active && !b.removed && b.z < 9;
    const drop = THREE.MathUtils.smoothstep(defeatTime, 0.25, 0.92);
    const bounce =
      defeatTime > 0.92
        ? Math.sin((defeatTime - 0.92) * 19) * Math.exp(-9 * (defeatTime - 0.92))
        : 0;
    const lift = b.lift * (1 - THREE.MathUtils.smoothstep(defeatTime, 0, 0.3));
    boss.root.position.set(
      b.x - 0.26 * drop,
      lift + 0.27 * drop + Math.max(0, bounce) * 0.16,
      b.z - 0.62 * drop,
    );
    boss.root.rotation.set(-1.49 * drop + 0.13 * bounce, b.yaw * (1 - drop), -0.3 * drop);
    drawBossSkills(b);
    const cast = b.skill;
    const charge = cast
      ? THREE.MathUtils.smoothstep(cast.age, 0, cast.warm) *
        (1 - THREE.MathUtils.smoothstep(cast.age, cast.warm, cast.warm + 0.3))
      : 0;
    const release = cast
      ? Math.sin(Math.PI * THREE.MathUtils.clamp((cast.age - cast.warm) / 0.52, 0, 1))
      : 0;
    boss.pose({
      charge,
      release,
      mode,
      time,
      walk: playing && b.active && !b.defeated ? 1 : 0,
      march: b.marched,
      attack: b.attackT,
      hit: Math.max(b.hit, b.enraged ? 0.16 + 0.1 * Math.sin(time * 9) : 0),
      defeat: defeatTime,
      kind: b.kind,
      vault: b.vault?.t || 0,
      brace: b.brace,
      drive: b.special,
    });
    warning.visible = countdown.visible =
      playing && !b.defeated && b.attackT > 0 && b.attackT < touchdown;
    if (warning.visible) {
      warning.position.set(b.landX, 0.047, b.landZ);
      countdown.position.set(b.landX, 0.051, b.landZ);
      countdown.scale.setScalar(0.3 + 0.7 * THREE.MathUtils.smoothstep(b.attackT, 0, touchdown));
    }
    if (!dead || s.overrun) shade.put(s.x, s.captainZ + overrunFall * 0.4, 1.3 * mainSize, 1, 1.32);
    if (boss.root.visible) shade.put(b.x, b.z - drop, 3.65 - lift * 0.38, 1.12 + drop * 0.65, 1.15);

    aura.update(s, time);
    shade.end();
    blue.end();
    red.end();
    if (sprites) sprites.draw(s, camera, time, mode);
    effects.update(dt, advance, s.shots, s.incoming);
    bend.prepareScene();
    renderer.render(scene, camera);
  }

  return {
    draw,
    assets,
    prepareBoss: (kind) =>
      boss.prepare(kind).then((ok) => {
        bend.markDirty();
        return ok;
      }),
    resize,
    entryZ() {
      const pitch = Math.atan2(15 - 0.12, 13.2 + 7.45);
      return 13.2 - 15 / Math.tan(pitch - THREE.MathUtils.degToRad(baseFov / 2));
    },
    project(x, y, z) {
      world.set(x + bend.offset(z), y, z).project(camera);
      return { x: ((world.x + 1) * width) / 2, y: ((1 - world.y) * height) / 2 };
    },
    feedback(e) {
      effects.burst(e.kind, e.x, e.y, e.z, e.strength, e.supply);
      if (e.kind === 'slam' || e.kind === 'wallBreak' || e.kind === 'bossBurst') {
        shake = 0.92;
        fovPunch = 0.75;
        atmosphere.flashLight(e.x, e.y + 0.4, e.z, 0xff8a2b, 14, 0.36);
      } else if (e.kind === 'overdrive' || e.kind === 'evolve') {
        shake = Math.max(shake, 0.68);
        fovPunch = Math.max(fovPunch, 0.9);
        atmosphere.flashLight(e.x, 1.1, e.z, 0xffd245, 16, 0.45);
      } else if (e.kind === 'bossEnrage') {
        shake = Math.max(shake, 0.72);
        fovPunch = Math.max(fovPunch, 0.65);
        atmosphere.flashLight(e.x, 1.4, e.z, 0xff3b26, 15, 0.42);
      } else if (e.kind === 'victory' || e.kind === 'vaultLand') {
        shake = Math.max(shake, 0.55);
        atmosphere.flashLight(e.x, 0.5, e.z, 0xffc65c, 9, 0.3);
      } else if (e.kind === 'impact' || e.kind === 'discharge') {
        shake = Math.max(shake, 0.3);
        fovPunch = Math.max(fovPunch, 0.22);
        atmosphere.flashLight(
          e.x,
          0.4,
          e.z,
          e.kind === 'discharge' ? 0x45f0ff : 0xff9230,
          10,
          0.22,
        );
      } else if (e.kind === 'muzzle') {
        atmosphere.flashLight(e.x, e.y, e.z, 0xffb84d, 6, 0.12);
      } else if (e.kind === 'critHit') {
        shake = Math.max(shake, 0.22);
        atmosphere.flashLight(e.x, e.y, e.z, 0xffde59, 8, 0.15);
      }
    },
    reset(x) {
      cameraX = x * 0.94;
      bossPullback = 0;
      shake = 0;
      fovPunch = 0;
      effects.reset();
    },
    lowerResolution() {
      if (quality <= 1) return;
      quality = Math.max(1, quality - 0.25);
      resize();
    },
  };
}
