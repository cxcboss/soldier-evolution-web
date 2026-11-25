import * as THREE from 'three';
import { createCaptain, createTroopGeometry, fieldEquipment } from './figures.js';
import { loadBrawler } from './brawler.js';
import { slamRadius, touchdown } from './brawler-motion.js';
import { createCourseArt } from './course-art.js';
import { createEffects } from './effects.js';
import { createSpriteArt } from './sprite-art.js';
import { footReach, marchAngle, sampleFeet } from './infantry-walk.js';

const pose = new THREE.Object3D();
// Map the face from the existing full-body painting around the original 3D head.
// The cheeks curve back and the chin tips up to meet the elevated game camera.
function paintedFace() {
  const positions = [],
    uv = [],
    indices = [];
  for (let row = 0; row <= 5; row++) {
    const t = row / 5;
    const width = 0.081 + 0.089 * Math.sin(Math.PI * t * 0.73);
    const y = 0.407 + 0.182 * t;
    for (let col = 0; col <= 8; col++) {
      const across = col / 4 - 1;
      positions.push(
        across * width,
        y + 0.016 * across * across * (1 - t),
        0.205 + 0.038 * Math.sin(t * Math.PI) - across * across * 0.07,
      );
      uv.push(
        (104 + across * (23 + 23 * Math.sin(Math.PI * t * 0.73))) / 205,
        1 - (145 - t * 60) / 300,
      );
      if (row && col) {
        const n = row * 9 + col;
        indices.push(n - 10, n - 9, n, n - 10, n, n - 1);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(indices);
  return geo;
}
function troops(scene, side, detail, capacity) {
  const feet = new Float32Array(3);
  const geo = createTroopGeometry(side, detail);
  const motion = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 4), 4).setUsage(
    THREE.DynamicDrawUsage,
  );
  geo.setAttribute('stepPose', motion);
  const mat = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 37,
    specular: 0x313744,
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
        vec3 faded = mix(diffuseColor.rgb,vec3(dot(diffuseColor.rgb,vec3(.30,.59,.11))),.34)*.74;
        diffuseColor.rgb = mix(faded,vec3(1.,.85,.64),clamp(-vGlow-1.,0.,1.)*.64);
      }
      diffuseColor.rgb=mix(diffuseColor.rgb, vec3(1.0,.72,.18), clamp(vGlow,0.0,1.0)*.94);`,
      );
  };
  const mesh = new THREE.InstancedMesh(geo, mat, capacity);
  let face;
  mesh.count = 0;
  mesh.frustumCulled = false;
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(mesh);
  let count = 0;
  return {
    paint(texture) {
      const geo = paintedFace();
      geo.setAttribute('stepPose', motion);
      const mat = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
      mat.onBeforeCompile = (shader) => {
        shader.vertexShader = shader.vertexShader
          .replace(
            '#include <common>',
            '#include <common>\nattribute vec4 stepPose; varying float faceGlow;',
          )
          .replace(
            '#include <begin_vertex>',
            '#include <begin_vertex>\nfaceGlow=stepPose.x; transformed.y+=.022*abs(stepPose.w); transformed.x+=stepPose.y*.018*position.y;',
          );
        shader.fragmentShader = shader.fragmentShader
          .replace('#include <common>', '#include <common>\nvarying float faceGlow;')
          .replace(
            '#include <color_fragment>',
            '#include <color_fragment>\nif(faceGlow<=-1.) diffuseColor.rgb=mix(diffuseColor.rgb*.75,vec3(1.,.85,.64),clamp(-faceGlow-1.,0.,1.)*.64);',
          );
      };
      face = new THREE.InstancedMesh(geo, mat, capacity);
      face.instanceMatrix = mesh.instanceMatrix;
      face.frustumCulled = false;
      scene.add(face);
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
      mesh.visible = count > 0;
      if (face) {
        face.count = count;
        face.visible = mesh.visible;
      }
      mesh.instanceMatrix.needsUpdate = true;
      motion.needsUpdate = true;
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
  const captain = createCaptain();
  scene.add(captain.root);
  const warning = footRing(slamRadius, slamRadius - 0.055, 0xff8e36, 0.82, scene);
  const countdown = footRing(slamRadius, slamRadius - 0.115, 0xffc45d, 0.38, scene);
  let boss;
  const modelReady = loadBrawler().then((model) => {
    boss = model;
    scene.add(model.root);
  });
  const blue = troops(scene, 'blue', 'near', 180),
    close = troops(scene, 'red', 'near', 900),
    far = troops(scene, 'red', 'far', 1200);
  const shade = shadows(scene),
    ring = footRing(0.68, 0.634, 0x64ff35, 0.94, scene),
    glow = footRing(0.72, 0.606, 0x66fc37, 0.21, scene);
  const shield = new THREE.Mesh(
    new THREE.SphereGeometry(1, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader:
        'varying vec3 n; varying vec3 eye; void main(){vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal);eye=-p.xyz;gl_Position=projectionMatrix*p;}',
      fragmentShader:
        'varying vec3 n; varying vec3 eye; void main(){float rim=pow(1.-abs(dot(normalize(n),normalize(eye))),2.1);gl_FragColor=vec4(.27,.86,1.,.024+.41*rim);}',
    }),
  );
  scene.add(shield);
  const support = new THREE.InstancedMesh(
    new THREE.OctahedronGeometry(0.18),
    new THREE.MeshPhongMaterial({ color: 0x6cd9ff, emissive: 0x175b93 }),
    20,
  );
  support.frustumCulled = false;
  scene.add(support);
  const kits = {};
  const kitMaterial = new THREE.MeshPhongMaterial({ vertexColors: true });
  for (const role of ['gunner', 'guard', 'bomber']) {
    const mesh = new THREE.InstancedMesh(fieldEquipment(role), kitMaterial, 32);
    mesh.frustumCulled = false;
    scene.add(mesh);
    kits[role] = mesh;
  }
  const course = createCourseArt(scene),
    effects = createEffects(scene);
  let sprites = null;
  const spritesReady = createSpriteArt(scene)
    .then((result) => {
      sprites = result;
      close.paint(result.gruntTexture);
      far.paint(result.gruntTexture);
      return true;
    })
    .catch((error) => {
      console.warn('角色贴图加载失败，已使用 3D 模型', error);
      return false;
    });
  const assets = Promise.all([modelReady, spritesReady]).then(([, loadedSprites]) => loadedSprites);
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
    const variant = (s.stage - 1) % 3;
    const playing = s.playing,
      is3d = mode !== 'ai';
    const mix = 1 - Math.exp(-8.5 * dt);
    const defeatTime = s.boss.defeatAge;
    const finishFocus = s.boss.defeated
      ? 0.18 *
        THREE.MathUtils.smoothstep(defeatTime, 0, 0.42) *
        (1 - THREE.MathUtils.smoothstep(defeatTime, 0.82, 1.65))
      : 0;
    // Let the squad visibly cross the bridge. Follow only far enough to keep a
    // player at the outer rail on screen on very narrow phones.
    const halfView = 19.5 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
    const edgePan = Math.sign(s.x) * Math.max(0, Math.abs(s.x) - halfView * 0.54);
    const focusX = THREE.MathUtils.lerp(edgePan, s.boss.x, finishFocus);
    const focusZ = (s.boss.z + 5.4) * finishFocus;
    cameraX += (focusX - cameraX) * mix;
    shake = Math.max(0, shake - dt * 1.75);
    const jx = Math.sin(time * 58) * shake * shake * 0.19,
      jy = Math.sin(time * 72) * shake * shake * 0.12;
    camera.position.set(cameraX + jx, 15.0 + jy - finishFocus * 1.2, 13.2 + focusZ);
    camera.lookAt(cameraX + 0.06 + jx, 0.12, -7.45 + focusZ);
    camera.updateMatrixWorld();
    const walk = playing ? 1 : 0;
    const step = time * 10.8;
    course.update(s);
    shade.begin();
    blue.begin();
    close.begin();
    far.begin();
    for (const c of s.columns)
      for (const e of c.units) {
        if (!e.alive || e.z < -61) continue;
        if (is3d) {
          (e.z < -18 ? far : close).put(e.x, 0, e.z, e.size, 0, 0, e.yaw, 0, marchAngle(e), walk);
        }
        if (e.z >= -32) shade.put(e.x, e.z, 0.64);
      }
    for (const kit of Object.values(kits)) kit.count = 0;
    for (const e of s.runners) {
      if (!e.alive) continue;
      const kit = kits[e.role];
      if (kit && kit.count < kit.instanceMatrix.count) {
        pose.position.set(e.x, 0.012, e.z);
        pose.rotation.set(0, e.yaw, 0);
        pose.scale.setScalar(e.size);
        pose.updateMatrix();
        kit.setMatrixAt(kit.count++, pose.matrix);
      }
      if (mode === '3d') close.put(e.x, 0, e.z, e.size, 0, 0, e.yaw, 0, marchAngle(e), walk);
      shade.put(e.x, e.z, 0.67);
    }
    for (const kit of Object.values(kits)) kit.instanceMatrix.needsUpdate = kit.count > 0;
    for (const a of s.allies) {
      let scale = 1;
      if (a.age < 0.25)
        scale =
          0.55 +
          0.45 * Math.min(1, a.age / 0.15) +
          Math.sin(Math.PI * Math.min(1, a.age / 0.25)) * 0.18;
      if (mode === '3d')
        blue.put(
          a.x,
          0,
          a.z,
          scale,
          Math.max(0, 1 - a.age * 2.8),
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
    for (const f of s.deliveries) {
      if (f.age < 0) continue;
      if (f.slot == null) crystal(f.x, f.y + 0.14, f.z, 1.5);
      else if (mode === '3d')
        blue.put(f.x, f.y, f.z, 0.65 + 0.35 * f.progress, 0.42, 0, 0, 0, step + f.phase, 0.55);
    }
    if (s.buffs.drone > 0)
      for (const side of [-1, 1])
        crystal(s.x + side * 1.15, 1.3 + 0.06 * Math.sin(time * 6), -0.32, 1);
    support.count = supportCount;
    support.instanceMatrix.needsUpdate = supportCount > 0;
    shield.visible = playing && s.buffs.shield > 0;
    if (shield.visible) {
      shield.position.set(s.x, 0.06, s.captainZ);
      shield.scale.set(1.52 * s.scale, 1.55, 1.28 * s.scale);
    }
    for (const e of s.falling) {
      const scale = (e.size || 1) * (1 - Math.pow(Math.min(1, e.t / 1.02), 4));
      if (is3d)
        (e.side === 'red' ? close : blue).put(
          e.x,
          e.y,
          e.z,
          scale,
          -2 + THREE.MathUtils.smoothstep(e.t, 0.018, 0.15),
          e.spin * e.t,
          e.phase,
          e.roll * e.t,
        );
      if (e.y < 2) shade.put(e.x, e.z, 0.64 * scale);
    }
    const dead = s.phase === 'lost',
      mainSize = s.visualScale;
    captain.root.visible = is3d && (!dead || s.endTime < 0.32);
    captain.root.position.set(
      s.x,
      dead ? Math.sin(Math.min(1, s.endTime / 0.33) * Math.PI) * 0.68 : 0,
      s.captainZ,
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
    const b = s.boss;
    boss.root.visible = b.active && b.z < 9;
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
    boss.root.rotation.set(-1.49 * drop + 0.13 * bounce, 0, -0.3 * drop);
    boss.pose({
      time,
      walk: playing && b.active && !b.defeated ? 1 : 0,
      march: b.marched,
      attack: b.attackT,
      hit: b.hit,
      defeat: defeatTime,
      variant,
    });
    warning.visible = countdown.visible =
      playing && !b.defeated && b.attackT > 0 && b.attackT < touchdown;
    if (warning.visible) {
      warning.position.set(b.landX, 0.047, b.landZ);
      countdown.position.set(b.landX, 0.051, b.landZ);
      countdown.scale.setScalar(0.3 + 0.7 * THREE.MathUtils.smoothstep(b.attackT, 0, touchdown));
    }
    if (!dead) shade.put(s.x, s.captainZ, 1.3 * mainSize);
    if (b.active) shade.put(b.x, b.z - drop, 3.65 - lift * 0.38, 1.12 + drop * 0.65);
    for (const r of [glow, ring]) {
      r.visible = !dead;
      r.position.set(s.x, 0.048, s.captainZ);
      r.scale.setScalar(mainSize);
    }
    shade.end();
    blue.end();
    close.end();
    far.end();
    if (sprites) sprites.draw(s, camera, time, mode);
    effects.update(dt, advance, s.shots, s.incoming);
    renderer.render(scene, camera);
  }
  return {
    draw,
    assets,
    resize,
    entryZ() {
      // Ground under the top screen edge in the normal play camera.
      const pitch = Math.atan2(15 - 0.12, 13.2 + 7.45);
      return 13.2 - 15 / Math.tan(pitch - THREE.MathUtils.degToRad(camera.fov / 2));
    },
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
