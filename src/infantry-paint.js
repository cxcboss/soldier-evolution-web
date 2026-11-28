import * as THREE from 'three';
import { helmetPaintGLSL } from './helmet-paint.js';
import { volumeGeometry } from './creature-paint.js';
import { footReach, sampleFeet } from './infantry-walk.js';

// Lift the metal shell, harness and boots off the underlying closed sculpture.
// Coordinates are the same portrait UVs used by the gait rig. Only the existing
// vertices are moved, so a whole formation keeps one instanced draw.
function moldUniform(geometry, side) {
  const captain = side === 'captain';
  const width = captain ? 1.16 : side === 'red' ? 0.54 : 0.49;
  const pos = geometry.attributes.position,
    uv = geometry.attributes.uv;
  const shellX = captain ? 0.42 : 0.5;
  const height = captain ? 1.73 : 0.88;
  const baseRise = Math.cos(0.43),
    baseTilt = Math.sin(0.43);
  const reliefPitch = captain ? 0.79 : 0.65;
  const depthY = Math.sin(reliefPitch),
    depthZ = Math.cos(reliefPitch);
  const smooth = THREE.MathUtils.smoothstep;
  const region = (u, v, cx, cy, rx, ry) => {
    const d = ((u - cx) / rx) ** 2 + ((v - cy) / ry) ** 2;
    return 1 - smooth(d, 0.13, 1);
  };
  for (let i = 0; i < pos.count; i++) {
    const u = uv.getX(i),
      v = uv.getY(i);
    const front = geometry.attributes.surface.getX(i);
    const crown = region(u, v, shellX, 0.818, captain ? 0.285 : 0.4, 0.19);
    const brim = region(u, v, shellX, 0.726, captain ? 0.33 : 0.425, 0.055);
    const sleeve = region(u, v, 0.18, 0.552, 0.16, 0.135) + region(u, v, 0.82, 0.552, 0.16, 0.135);
    const boot = region(u, v, 0.29, 0.105, 0.135, 0.135) + region(u, v, 0.69, 0.118, 0.135, 0.13);
    const waist = region(u, v, 0.285, 0.34, 0.115, 0.076) + region(u, v, 0.69, 0.35, 0.11, 0.078);
    const strap =
      (1 - smooth(Math.abs(u - (0.82 - 0.93 * v)), 0.024, 0.075)) *
      region(u, v, 0.47, 0.475, 0.35, 0.2);
    const fieldPack = side === 'blue' ? region(u, v, 0.5, 0.452, 0.29, 0.145) : 0;
    const barrel = captain ? region(u, v, 0.836, 0.754, 0.156, 0.29) : 0;
    // The near-facing breech has a raised brass collar around a recessed bore.
    const boreRadius = captain ? Math.hypot((u - 0.842) / 0.139, (v - 0.666) / 0.086) : 2;
    const bore = (1 - smooth(boreRadius, 0.6, 0.78)) * front;
    const collar = smooth(boreRadius, 0.58, 0.78) * (1 - smooth(boreRadius, 0.89, 1.07));
    const depth =
      width *
      (0.14 * crown +
        0.071 * brim +
        0.075 * sleeve +
        0.09 * boot +
        0.069 * waist +
        0.054 * strap +
        0.13 * fieldPack +
        0.21 * barrel +
        0.092 * collar -
        0.18 * bore);
    const normal = front ? 1 : -0.45;
    // The portrait already includes a view of the helmet crown and cannon.
    // Lay the relief depth toward the elevated camera so those front surfaces
    // cannot fold down over the photographed brim or the opening of the bore.
    const centerY = v * height * baseRise + 0.025;
    const centerZ = 0.09 - v * height * baseTilt;
    const relief =
      (pos.getY(i) - centerY) * baseTilt + (pos.getZ(i) - centerZ) * baseRise + depth * normal;
    const x =
      pos.getX(i) +
      (u - shellX) * width * (0.079 * brim + 0.033 * crown) +
      (u - 0.5) * width * (0.04 * boot + 0.065 * sleeve);
    pos.setXYZ(i, x, centerY + relief * depthY, centerZ + relief * depthZ);
  }
  geometry.computeVertexNormals();
}

// Bake the helmet, coat, limbs and boot volumes once for the whole formation.
// Each instance keeps its own stance, stride and reaction while sharing one draw.
export function createInfantryModel(side, portrait, reverse, stride, capacity) {
  const captain = side === 'captain';
  const friendly = side !== 'red';
  const geometry = captain
    ? volumeGeometry('captain', portrait, 1.16, 1.73)
    : volumeGeometry('infantry', portrait, friendly ? 0.49 : 0.54, 0.88);
  moldUniform(geometry, side);
  geometry.setAttribute('stepPose', stride);
  const material = new THREE.ShaderMaterial({
    side: THREE.FrontSide,
    alphaToCoverage: true,
    defines: captain ? { CAPTAIN: 1 } : {},
    uniforms: {
      recoil: { value: 0 },
      lean: { value: 0 },
      portrait: { value: portrait },
      reverse: { value: reverse },
      facing: { value: friendly ? -1 : 1 },
    },
    vertexShader: `
      #ifdef CAPTAIN
        uniform float recoil, lean;
      #endif
      attribute vec4 stepPose;
      attribute float surface;
      uniform float facing;
      varying vec2 tex;
      varying float cap, flash;
      varying vec3 normalView;
      void main() {
        tex = uv; cap = surface; flash = stepPose.x;
        float lateral = uv.x - 0.5;
        // 锐化左右腿分界并保持微外展站距，消除行走时双脚像粘连在一起的观感
        float isRight = smoothstep(-0.014, 0.014, lateral);
        float stride = mix(stepPose.z, stepPose.y, isRight);
        float lift = max(0., (isRight * 2. - 1.) * stepPose.w);
        float leg = 1. - smoothstep(0.16, 0.42, uv.y);
        float arm = smoothstep(0.14, 0.33, abs(lateral))
                  * smoothstep(0.27, 0.41, uv.y) * (1.-smoothstep(0.47, 0.64, uv.y));
        vec3 p = position;
        float heel = leg * (1. - smoothstep(.085,.20,uv.y));
        float chest = smoothstep(.28,.48,uv.y) * (1.-smoothstep(.58,.72,uv.y));
        p.x += (isRight - .5) * (.046 * leg + .026 * lift * heel) + .016 * stepPose.y * chest;
        p.z += .042 * facing * stepPose.y * lateral * chest;
        p.y += heel * max(.0, -stride) * .022;
        p.z += facing * stride * (${footReach} * leg - 0.105 * arm);
        p.y += 0.112 * lift * leg + 0.018 * abs(stepPose.w) * (1. - leg) + stride * arm * 0.038;
        p.x += 0.012 * stepPose.y * chest + arm * stride * 0.016;
        #ifdef CAPTAIN
          float shoulder = smoothstep(.53, .73, tex.x) * smoothstep(.41, .61, tex.y);
          p.x += .079 + lean * tex.y * .14 + shoulder * recoil * .026;
          p.z += facing * stride * (.078 * leg - .032 * arm) + shoulder * recoil * .21;
          p.y -= shoulder * recoil * .082;
        #endif
        normalView = normalize(normalMatrix * mat3(instanceMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(p, 1.);
      }`,
    fragmentShader: `
      ${helmetPaintGLSL}
      uniform sampler2D portrait, reverse;
      uniform float facing;
      varying vec2 tex;
      varying float cap, flash;
      varying vec3 normalView;
      void main() {
        vec4 paint = texture2D(portrait, tex);
        float coverage = smoothstep(0.23, 0.70, paint.a);
        if (coverage < 0.11) discard;
        vec3 color = paint.rgb;
        float back = (1. - cap) * smoothstep(.1, .67, -normalize(normalView).z);
        if (back > 0.) {
          vec4 opposite = texture2D(reverse, vec2(1. - tex.x, tex.y));
          float value = dot(opposite.rgb, vec3(.25, .58, .17));
          float helmet = smoothstep(.63, .72, tex.y);
          float coat = smoothstep(.29, .38, tex.y) * (1. - smoothstep(.54, .65, tex.y));
          vec3 dye = facing > 0. ? vec3(.64,.054,.036) : vec3(.037,.25,.68);
          vec3 clothDye = facing > 0. ? dye : vec3(.59,.32,.13);
          float trousers = (1. - smoothstep(.29, .38, tex.y)) * smoothstep(.13, .23, tex.y);
          vec3 kit = mix(opposite.rgb, clothDye * (.26 + value * 2.1), coat * .8);
          kit = mix(kit, (facing > 0. ? vec3(.095,.073,.069) : dye) * (.24 + value * 2.1), trousers);
          kit = mix(kit, dye * (.26 + value * 2.1), helmet);
          color = mix(color, kit, back * opposite.a);
        }
        color = paintHelmet(color, tex.y, facing > 0.);
        float light = .87 + .17 * max(0., dot(normalize(normalView), normalize(vec3(-.52,.76,.56))));
        color *= light;
        if (flash <= -1.) {
          vec3 faded = mix(color, vec3(dot(color, vec3(.30,.59,.11))), .36) * .74;
          color = mix(faded, vec3(1.,.85,.64), clamp(-flash-1.,0.,1.)*.67);
        }
        color = mix(color, vec3(1.,.70,.16), clamp(flash,0.,1.)*.86);
        gl_FragColor = vec4(color, coverage);
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, capacity);
  mesh.name = captain ? '蓝队重炮队长' : friendly ? '蓝队野战制服' : '红队野战制服';
  mesh.count = 0;
  mesh.frustumCulled = false;
  return mesh;
}

export function createFieldCaptain(portrait, reverse) {
  const feet = new Float32Array(3);
  const stride = new THREE.InstancedBufferAttribute(new Float32Array(4), 4).setUsage(
    THREE.DynamicDrawUsage,
  );
  const mesh = createInfantryModel('captain', portrait, reverse, stride, 1);
  mesh.setMatrixAt(0, new THREE.Matrix4());
  mesh.count = 1;
  return {
    mesh,
    pose(time, run, recoil, lean, merge) {
      sampleFeet(time * 9.03, run, feet);
      stride.setXYZW(0, Math.min(0.66, merge * 0.55), feet[0], feet[1], feet[2]);
      stride.needsUpdate = true;
      mesh.material.uniforms.lean.value = lean;
      mesh.material.uniforms.recoil.value = recoil;
    },
  };
}
