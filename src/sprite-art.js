import * as THREE from 'three';
import { footReach, marchAngle, sampleFeet } from './infantry-walk.js';

// The source paintings include a few transparent edge pixels to keep minified art clean.
// Each pivot sits between the boots. The captain's cannon makes his crop asymmetric.
const designs = {
  ally: { width: 0.475, height: 0.86, pivot: 0.5, pad: 0.008, capacity: 180, grid: [6, 8] },
  captain: { width: 1.13, height: 1.73, pivot: 0.43, pad: 0.009, capacity: 1, grid: [13, 16] },
  grunt: { width: 0.515, height: 0.86, pivot: 0.5, pad: 0.011, capacity: 1800, grid: [6, 8] },
};
const clamp = THREE.MathUtils.clamp;
const smooth = THREE.MathUtils.smoothstep;

const vertexShader = `
  attribute vec3 anchor;
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
    float sideSign = smoothstep(pivot-0.07,pivot+0.07,uv.x)*2.0-1.0;
    float boots = (1.0-smoothstep(0.08,0.34,uv.y));
    float arms = smoothstep(.15,.32,abs(uv.x-pivot)) * smoothstep(.22,.38,uv.y)
               * (1.0-smoothstep(.46,.63,uv.y));
    float lift = max(0.0,sideSign*feet.z);
    float swing = mix(feet.y,feet.x,sideSign*.5+.5);
    #ifdef CAPTAIN
      arms *= mix(1.0,0.18,smoothstep(pivot,pivot+0.12,uv.x));
    #endif
    point.x += swing * (0.042*arms-0.032*boots) + stride*.014*uv.y;
    point.y += .141*lift*boots + .026*abs(feet.z)*(1.0-boots) + swing*.058*arms;
    float depthSwing = (boots*${footReach / 0.86}-arms*.16)*swing*dimensions.y;
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
    vec3 world = anchor + cameraRight*point.x + cameraLift*point.y;
    world.z += depthSwing;
    gl_Position = projectionMatrix*viewMatrix*vec4(world, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D portrait;
  varying vec2 imageUv;
  varying vec3 colorTreatment;
  void main() {
    vec4 pixel = texture2D(portrait,imageUv);
    // Keep occlusion correct between rows, the hero, fences and fully 3D units.
    // Mild coverage AA retains fine helmet/gun edges at distant mip levels.
    float coverage = smoothstep(0.23,0.70,pixel.a);
    if (coverage < 0.11) discard;
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
    ) {
      if (count >= spec.capacity || scaleX <= 0.001 || scaleY <= 0.001) return;
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
    names.map((name) => loader.loadAsync(`./art/${name}.webp`)),
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
    const moving = s.phase === 'ready' ? 0.3 : s.playing ? 1 : 0;
    const step = time * 10.8;
    if (full) {
      for (const column of s.columns) {
        for (const e of column.units) {
          if (e.alive) batches.grunt.add(e.x, 0, e.z, e.size, e.size, marchAngle(e), moving);
        }
      }
    }
    for (const e of s.runners) {
      if (e.alive) batches.grunt.add(e.x, 0, e.z, e.size, e.size, marchAngle(e), moving);
    }
    for (const a of s.allies) {
      const p = clamp(a.age / 0.32, 0, 1),
        pop = 0.81 + 0.19 * p + 0.095 * Math.sin(p * Math.PI);
      batches.ally.add(
        a.x,
        0.035 * Math.sin(p * Math.PI),
        a.z,
        pop,
        pop,
        step + a.phase,
        moving,
        0,
        0,
        0.8 * (1 - p),
        0.22 * (1 - p),
      );
    }
    for (const f of s.deliveries) {
      if (f.slot == null || f.age < 0) continue;
      const size = 0.65 + 0.35 * f.progress;
      batches.ally.add(f.x, f.y, f.z, size, size, step + f.phase, 0.55, 0, 0, 0.42, 0.24);
    }
    if (full) {
      for (const e of s.falling) {
        const p = clamp(e.t / 1.02, 0, 1),
          size = e.size * (1 - smooth(p, 0.78, 1));
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
          0,
          0.64 * (1 - smooth(p, 0.04, 0.31)),
          0.72 * smooth(p, 0.05, 0.31),
        );
      }
      if (s.phase !== 'lost' || s.endTime < 0.25) {
        const size = s.visualScale,
          fade = s.phase === 'lost' ? clamp(s.endTime / 0.25, 0, 1) : 0;
        batches.captain.add(
          s.x,
          0,
          s.captainZ,
          size,
          size * (1 - 0.55 * fade),
          step * 0.83,
          moving,
          -0.38 * fade,
          s.recoil,
          0.66 * s.mergeGlow,
          0.14 * s.mergeGlow + 0.48 * s.hurt + 0.32 * fade,
          0,
          clamp(s.velocity * 0.007, -0.095, 0.095),
        );
      }

    }
    for (const batch of groups) batch.flush();
  }
  return { draw, clear, gruntTexture: loaded[names.indexOf('grunt')].value };
}
