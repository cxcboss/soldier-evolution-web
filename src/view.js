import * as THREE from 'three';
import { createBoss, createCaptain, createTroopGeometry } from './figures.js';
import { createCourseArt } from './course-art.js';
import { createEffects } from './effects.js';
import { createSpriteArt } from './sprite-art.js';

const pose = new THREE.Object3D();
const clockUniform = { value: 0 },
  strideUniform = { value: 1 };
function troops(scene, side, detail, capacity) {
  const geo = createTroopGeometry(side, detail);
  const flashes = new THREE.InstancedBufferAttribute(new Float32Array(capacity), 1).setUsage(
    THREE.DynamicDrawUsage,
  );
  geo.setAttribute('unitGlow', flashes);
  const mat = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 37,
    specular: 0x313744,
  });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.walkTime = clockUniform;
    shader.uniforms.gaitAmount = strideUniform;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nattribute float unitGlow; varying float vGlow; uniform float walkTime; uniform float gaitAmount;',
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
      vGlow=unitGlow; float phase=walkTime*10.2 + float(gl_InstanceID)*2.39996;
      float gait=sin(phase + (position.x<0.0 ? 3.14159 : 0.0));
      float foot=(1.0-smoothstep(0.14,0.39,position.y))*gaitAmount;
      transformed.z += gait*.105*foot;
      transformed.y += max(0.0,gait)*.054*foot + abs(sin(phase))*.019*gaitAmount;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vGlow;')
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(.82,.93,1.0), clamp(-vGlow,0.0,1.0)*.88);
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(1.0,.72,.18), clamp(vGlow,0.0,1.0)*.94);`,
      );
  };
  const mesh = new THREE.InstancedMesh(geo, mat, capacity);
  mesh.count = 0;
  mesh.frustumCulled = false;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(mesh);
  let count = 0;
  return {
    begin() {
      count = 0;
    },
    put(x, y, z, scale, glow = 0, rx = 0, ry = 0, rz = 0) {
      if (count >= capacity) return;
      pose.position.set(x, y, z);
      pose.rotation.set(rx, ry, rz);
      pose.scale.setScalar(scale);
      pose.updateMatrix();
      mesh.setMatrixAt(count, pose.matrix);
      flashes.setX(count, glow);
      count++;
    },
    end() {
      mesh.count = count;
      mesh.visible = count > 0;
      mesh.instanceMatrix.needsUpdate = true;
      flashes.needsUpdate = true;
    },
  };
}
function shadows(scene) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d'),
    gradient = ctx.createRadialGradient(30, 33, 1, 32, 32, 31);
  gradient.addColorStop(0, 'rgba(22,23,45,.63)');
  gradient.addColorStop(0.5, 'rgba(24,27,49,.47)');
  gradient.addColorStop(0.83, 'rgba(32,32,53,.20)');
  gradient.addColorStop(1, 'rgba(32,32,53,0)');
  ctx.fillStyle = gradient;
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
  mesh.frustumCulled = false;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.renderOrder = 1;
  scene.add(mesh);
  let count = 0;
  return {
    begin() {
      count = 0;
    },
    put(x, z, size, elongate = 1) {
      if (count >= 1600) return;
      pose.position.set(x + size * 0.3, 0.021, z - size * 0.2);
      pose.rotation.set(0, 0.65, 0);
      pose.scale.set(size * 1.4, 0.95, size * 0.79 * elongate);
      pose.updateMatrix();
      mesh.setMatrixAt(count++, pose.matrix);
    },
    end() {
      mesh.count = count;
      mesh.instanceMatrix.needsUpdate = true;
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
export function makeView(canvas, stage) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x092640, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xf4f8ff, 0x8592b7, 1.55));
  const key = new THREE.DirectionalLight(0xffeedc, 2.0);
  key.position.set(-8, 16, 6);
  scene.add(key);
  const edge = new THREE.DirectionalLight(0xc3e8ff, 0.63);
  edge.position.set(7, 8, -8);
  scene.add(edge);
  const camera = new THREE.PerspectiveCamera(41, 1, 0.15, 150),
    world = new THREE.Vector3();
  const captain = createCaptain(),
    boss = createBoss();
  scene.add(captain.root, boss.root);
  const blue = troops(scene, 'blue', 'near', 180),
    close = troops(scene, 'red', 'near', 400),
    far = troops(scene, 'red', 'far', 1200);
  const shade = shadows(scene),
    ring = footRing(0.68, 0.634, 0x64ff35, 0.94, scene),
    glow = footRing(0.72, 0.606, 0x66fc37, 0.21, scene);
  const course = createCourseArt(scene),
    effects = createEffects(scene);
  let sprites = null;
  const assets = createSpriteArt(scene)
    .then((result) => {
      sprites = result;
      return true;
    })
    .catch((error) => {
      console.warn('角色贴图加载失败，已使用 3D 模型', error);
      return false;
    });
  let cameraX = -3.72,
    shake = 0,
    width = 1,
    height = 1,
    quality = Math.min(devicePixelRatio || 1, 1.65);
  const resize = () => {
    width = stage.clientWidth;
    height = stage.clientHeight;
    camera.aspect = width / Math.max(1, height);
    camera.fov = THREE.MathUtils.clamp(41 + (0.54 - camera.aspect) * 27, 37, 47);
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
    cameraX += (s.x * 0.94 - cameraX) * mix;
    shake = Math.max(0, shake - dt * 1.75);
    const jx = Math.sin(time * 58) * shake * shake * 0.19,
      jy = Math.sin(time * 72) * shake * shake * 0.12;
    camera.position.set(cameraX + jx, 15.0 + jy, 13.2);
    camera.lookAt(cameraX + 0.06 + jx, 0.12, -7.45);
    camera.updateMatrixWorld();
    clockUniform.value = time;
    strideUniform.value = playing ? 1 : 0.13;
    course.update(s);
    shade.begin();
    blue.begin();
    close.begin();
    far.begin();
    for (const c of s.columns)
      for (const e of c.units) {
        if (!e.alive || e.z < -61) continue;
        if (is3d) {
          (e.z < -18 ? far : close).put(e.x, 0, e.z, e.size, 0, 0, 0.06 * Math.sin(e.phase), 0);
        }
        if (e.z >= -32) shade.put(e.x, e.z, 0.64);
      }
    for (const e of s.runners) {
      if (!e.alive) continue;
      if (mode === '3d') close.put(e.x, 0, e.z, e.size, 0, 0, 0.15 * Math.sin(e.phase), 0);
      shade.put(e.x, e.z, 0.67);
    }
    for (const a of s.allies) {
      let scale = 1;
      if (a.age < 0.25)
        scale =
          0.55 +
          0.45 * Math.min(1, a.age / 0.15) +
          Math.sin(Math.PI * Math.min(1, a.age / 0.25)) * 0.18;
      if (mode === '3d')
        blue.put(a.x, 0, a.z, scale, Math.max(0, 1 - a.age * 2.8), 0, -s.velocity * 0.014, 0);
      shade.put(a.x, a.z, 0.71 * scale);
    }
    for (const a of s.merging) {
      const f = Math.min(1, a.t / 0.32);
      if (mode === '3d')
        blue.put(
          THREE.MathUtils.lerp(a.x, s.x, f),
          Math.sin(f * Math.PI) * 0.55,
          THREE.MathUtils.lerp(a.z, 0, f),
          1 - f * 0.68,
          1 - f * 0.28,
        );
    }
    for (const e of s.falling) {
      const scale = (e.size || 1) * (1 - Math.pow(Math.min(1, e.t / 1.02), 4));
      if (is3d)
        (e.side === 'red' ? close : blue).put(
          e.x,
          e.y,
          e.z,
          scale,
          -Math.max(0.39, 1 - e.t * 0.82),
          e.spin * e.t,
          e.phase,
          e.roll * e.t,
        );
      if (e.y < 2) shade.put(e.x, e.z, 0.64 * scale);
    }
    const dead = s.phase === 'lost',
      win = s.phase === 'won',
      mainSize = s.visualScale;
    captain.root.visible = is3d && (!dead || s.endTime < 0.32);
    captain.root.position.set(
      s.x,
      dead ? Math.sin(Math.min(1, s.endTime / 0.33) * Math.PI) * 0.68 : 0,
      0,
    );
    captain.root.rotation.set(0, -s.velocity * 0.018, dead ? -s.endTime * 5 : 0);
    captain.root.scale.setScalar(mainSize * (dead ? Math.max(0.05, 1 - s.endTime * 2) : 1));
    captain.animate({
      time,
      run: playing ? 0.91 : 0.09,
      recoil: s.recoil,
      merge: Math.max(s.mergeGlow, s.hurt * 0.62),
      lean: THREE.MathUtils.clamp(s.velocity / 9, -1, 1),
    });
    boss.root.visible = is3d && (!win || s.endTime < 1.08);
    boss.root.position.set(s.boss.x, 0, s.boss.z);
    boss.root.rotation.set(
      win ? -Math.min(1, s.endTime / 0.75) * 1.43 : 0,
      0,
      win ? Math.min(1, s.endTime) * -0.2 : 0,
    );
    boss.animate({
      time,
      run: playing ? (s.boss.active ? 0.91 : 0.45) : 0.12,
      slam: s.boss.slam,
      hit: s.boss.hit,
    });
    if (!dead) shade.put(s.x, 0, 1.3 * mainSize);
    if (!win || s.endTime < 1) shade.put(s.boss.x, s.boss.z, 3.9, 1.12);
    for (const r of [glow, ring]) {
      r.visible = !dead;
      r.position.set(s.x, 0.048, 0);
      r.scale.setScalar(mainSize);
    }
    shade.end();
    blue.end();
    close.end();
    far.end();
    if (sprites) sprites.draw(s, camera, time, mode);
    effects.update(dt, advance, s.shots);
    renderer.render(scene, camera);
  }
  return {
    draw,
    assets,
    resize,
    project(x, y, z) {
      world.set(x, y, z).project(camera);
      return { x: ((world.x + 1) * width) / 2, y: ((1 - world.y) * height) / 2 };
    },
    feedback(e) {
      effects.burst(e.kind, e.x, e.y, e.z, e.strength);
      if (e.kind === 'slam' || e.kind === 'wallBreak' || e.kind === 'victory') shake = 0.85;
      else if (e.kind === 'impact') shake = Math.max(shake, 0.25);
    },
    reset(x) {
      cameraX = x * 0.94;
      shake = 0;
      effects.reset();
    },
    lowerResolution() {
      if (quality <= 1) return;
      quality = Math.max(1, quality - 0.22);
      resize();
    },
  };
}
