import * as THREE from 'three';
import { bosses, castProgress } from './boss-skills.js';
const flat = new THREE.PlaneGeometry(1, 1),
  ball = new THREE.SphereGeometry(1, 16, 10);
const hard = (color) => new THREE.MeshBasicMaterial({ color, toneMapped: false });
const dark = new THREE.MeshPhongMaterial({ color: 0x404958, shininess: 65 });
const warm = hard(0xffbd62),
  cold = hard(0xceffff);
const V = new THREE.Vector3(),
  W = new THREE.Vector3(),
  up = new THREE.Vector3(0, 1, 0);
const clamp = THREE.MathUtils.clamp;
function material() {
  return new THREE.ShaderMaterial({
    uniforms: {
      ink: { value: new THREE.Color() },
      style: { value: 0 },
      time: { value: 0 },
      progress: { value: 0 },
      after: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    vertexShader:
      'varying vec2 tex;void main(){tex=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: `varying vec2 tex;uniform vec3 ink;uniform float style,time,progress,after;
    void main(){ vec2 q=tex*2.-1.;float d,segment=1.;float scan=0.;
      if(style<.5){d=length(q);segment=step(.24,fract(atan(q.y,q.x)*1.91+.1));scan=1.-smoothstep(.015,.045,abs(d-progress*.92));}
      else{float w=style>1.5?mix(.09,1.,tex.y):1.;d=abs(q.x)/w;
        segment=step(.18,fract(tex.y*17.));scan=1.-smoothstep(.017,.045,abs(tex.y-progress));}
      float aa=max(fwidth(d)*1.4,.016);
      float mask=1.-smoothstep(1.-aa,1.,d);
      float edge=smoothstep(.84-aa,.89,d)*(1.-smoothstep(.97,1.,d));
      float hatch=.045*step(.70,fract(q.x*3.5+q.y*5.));
      float a=(.085+hatch+.53*edge*segment+.27*scan+.15*progress)*mask*(1.-after);
      gl_FragColor=vec4(mix(ink,vec3(1.),edge*.35),a);
      #include <colorspace_fragment>
    }`,
  });
}
function node(geo, mat, parent) {
  const m = new THREE.Mesh(geo, mat);
  parent.add(m);
  return m;
}
function rod(mesh, a, b, width) {
  V.subVectors(b, a);
  const len = V.length();
  mesh.position.copy(a).lerp(b, 0.5);
  mesh.scale.set(width, len, width);
  mesh.quaternion.setFromUnitVectors(up, V.normalize());
}
function slot(scene) {
  const root = new THREE.Group();
  scene.add(root);
  const mat = material(),
    mark = node(flat, mat, root);
  mark.renderOrder = 3;
  const bubble = new THREE.Group();
  root.add(bubble);
  const tide = new THREE.MeshPhongMaterial({
    color: 0x32d2c7,
    emissive: 0x12786f,
    transparent: true,
    opacity: 0.8,
    shininess: 90,
  });
  node(ball, tide, bubble).scale.set(0.42, 0.28, 0.45);
  const crest = node(new THREE.TorusGeometry(0.46, 0.053, 6, 25, Math.PI * 1.65), cold, bubble);
  crest.rotation.x = -1.2;
  const shell = new THREE.Group();
  root.add(shell);
  const core = node(ball, dark, shell);
  core.scale.set(0.235, 0.29, 0.235);
  node(new THREE.TorusGeometry(0.235, 0.04, 6, 20), warm, shell).rotation.x = 1.3;
  const spark = node(ball, warm, shell);
  spark.position.y = 0.22;
  spark.scale.setScalar(0.12);
  const beam = node(
    new THREE.CylinderGeometry(1, 0.2, 1, 12, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0x62d9ff,
      transparent: true,
      opacity: 0.41,
      toneMapped: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
    root,
  );
  const ridge = new THREE.Group();
  root.add(ridge);
  const shades = [hard('#e8beff'), hard('#ab65dd'), hard('#83eaff')];
  for (let i = 0; i < 7; i++) {
    const shard = node(new THREE.ConeGeometry(1, 1, 5), shades[i % 2], ridge);
    const a = i * 2.4;
    shard.position.set(Math.cos(a) * (0.27 + i * 0.05), 0.4, Math.sin(a) * (0.27 + i * 0.05));
    shard.rotation.set(Math.sin(a) * 0.32, i * 0.9, Math.cos(a) * 0.38);
    shard.scale.set(0.13 + (i % 3) * 0.035, 0.66 + (i % 3) * 0.35, 0.17);
  }
  const streaks = new THREE.Group();
  root.add(streaks);
  for (let i = 0; i < 7; i++) {
    const blade = node(new THREE.OctahedronGeometry(1), cold, streaks);
    blade.scale.set(0.055, 0.09, 0.28);
  }
  const wave = node(new THREE.TorusGeometry(1, 0.09, 6, 32, Math.PI * 1.4), warm, root);
  wave.rotation.x = -Math.PI / 2;
  return { root, mat, mark, bubble, shell, beam, ridge, streaks, wave };
}
export function createBossFX(scene) {
  const slots = Array.from({ length: 3 }, () => slot(scene)),
    from = new THREE.Vector3(),
    to = new THREE.Vector3();
  return function render(b) {
    const s = b.skill;
    slots.forEach((v, i) => {
      const m = s?.marks[i];
      v.root.visible = Boolean(m) && !b.defeated;
      if (!v.root.visible) return;
      const elapsed = s.age - m.delay,
        travel = castProgress(s, m),
        after = clamp((elapsed - s.warm - s.flight) / 0.62, 0, 1);
      const fired = elapsed >= s.warm,
        arrived = travel >= 1;
      const dx = m.x - s.x,
        dz = m.z - s.z;
      const u = v.mat.uniforms;
      u.ink.value.set(bosses[s.kind].color);
      const progress = clamp(elapsed / s.warm, 0, 1);
      u.progress.value = fired ? travel : progress;
      u.after.value = after;
      u.time.value = s.age;
      u.style.value = m.shape === 'circle' ? 0 : m.shape === 'strip' ? 1 : 2;
      v.mark.visible = elapsed >= -0.12 && after < 1;
      if (m.shape === 'circle') {
        v.mark.rotation.set(-Math.PI / 2, 0, 0);
        v.mark.scale.set(2 * m.radius, 2 * m.radius, 1);
        v.mark.position.set(m.x, 0.059, m.z);
      } else {
        const len = Math.hypot(dx, dz),
          a = Math.atan2(dx, dz);
        v.mark.position.set(
          (m.x + s.x) / 2 + Math.sin(a) * 0.82,
          0.06,
          (m.z + s.z) / 2 + Math.cos(a) * 0.82,
        );
        v.mark.rotation.order = 'YXZ';
        v.mark.rotation.set(Math.PI / 2, a, 0);
        v.mark.material.side = THREE.DoubleSide;
        v.mark.scale.set(2 * m.radius, len + 1.64, 1);
      }
      const moving = fired && !arrived;
      v.bubble.visible = moving && s.kind === 'diver';
      v.shell.visible = moving && s.kind === 'engine';
      const projectile = v.bubble.visible ? v.bubble : v.shell;
      if (projectile.visible) {
        const sourceX = s.x + (i ? 1 : -1) * 0.8;
        const arc = s.kind === 'engine' ? 4.6 : 0.57;
        projectile.position.set(
          THREE.MathUtils.lerp(sourceX, m.x, travel),
          s.height * (1 - travel) + 0.17 + Math.sin(Math.PI * travel) * arc,
          THREE.MathUtils.lerp(s.z, m.z, travel),
        );
        projectile.rotation.y = travel * 7;
      }
      const frost = s.kind === 'kestrel';
      v.beam.visible = frost && fired && after < 0.82;
      v.streaks.visible = v.beam.visible;
      if (v.beam.visible) {
        const reach = clamp(travel * 1.25, 0, 1);
        from.set(s.x, s.height, s.z + 0.59);
        to.set(m.x, 0.34, m.z).lerp(from, 1 - reach);
        rod(v.beam, from, to, m.radius * (1 - after * 0.55));
        v.beam.material.opacity = (0.31 + 0.12 * Math.sin(s.age * 24)) * (1 - after);
        v.streaks.children.forEach((blade, j) => {
          const t = (s.age * 1.9 + j * 0.136) % 1;
          blade.position.copy(from).lerp(to, t);
          blade.position.x += Math.sin(j * 1.8 + s.age * 11) * t * 0.78;
          blade.position.y += Math.cos(j * 1.4 + s.age * 12) * t * 0.26;
        });
      }
      v.ridge.visible = s.kind === 'drill' && arrived && after < 1;
      if (v.ridge.visible) {
        v.ridge.position.set(m.x, 0.025, m.z);
        v.ridge.scale.set(1, Math.max(0.02, Math.sin(Math.PI * Math.pow(after, 0.58)) * 1.35), 1);
      }
      v.wave.visible = moving && (s.kind === 'bruiser' || s.kind === 'warden');
      if (v.wave.visible) {
        v.wave.position.set(s.x + dx * travel, 0.13, s.z + dz * travel);
        v.wave.scale.set(1.1 + 0.37 * travel, 0.4 + 0.25 * travel, 1);
        v.wave.rotation.z = Math.atan2(dx, dz) - 0.59;
      }
    });
  };
}
