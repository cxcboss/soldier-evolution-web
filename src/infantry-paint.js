import * as THREE from 'three';
import { volumeGeometry } from './creature-paint.js';
import { footReach, sampleFeet } from './infantry-walk.js';

// Bake the helmet, coat, limbs and boot volumes once for the whole formation.
// Each instance keeps its own stance, stride and reaction while sharing one draw.
export function createInfantryModel(side, portrait, reverse, stride, capacity) {
  const captain = side === 'captain';
  const friendly = side !== 'red';
  const geometry = captain
    ? volumeGeometry('captain', portrait, 1.13, 1.73)
    : volumeGeometry('infantry', portrait, friendly ? 0.47 : 0.53, 0.86);
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
        float isRight = smoothstep(-0.04, 0.04, lateral);
        float stride = mix(stepPose.z, stepPose.y, isRight);
        float lift = max(0., (isRight * 2. - 1.) * stepPose.w);
        float leg = 1. - smoothstep(0.15, 0.43, uv.y);
        float arm = smoothstep(0.14, 0.33, abs(lateral))
                  * smoothstep(0.27, 0.41, uv.y) * (1.-smoothstep(0.47, 0.64, uv.y));
        vec3 p = position;
        p.z += facing * stride * (${footReach} * leg - 0.105 * arm);
        p.y += 0.104 * lift * leg + 0.019 * abs(stepPose.w) * (1. - leg) + stride * arm * 0.038;
        p.x += 0.014 * stepPose.y * uv.y + arm * stride * 0.018;
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
