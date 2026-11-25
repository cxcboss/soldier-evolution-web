import * as THREE from 'three';
import { sampleFeet, stanceFraction } from './infantry-walk.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { jumpProgress, smoothRange, takeoff, touchdown, attackDuration } from './brawler-motion.js';

export async function loadBrawler() {
  const { scene: root } = await new GLTFLoader().loadAsync('./art/brawler.glb');
  const bone = (name) => root.getObjectByName(name);
  const pelvis = bone('Pelvis'),
    spine = bone('Spine'),
    head = bone('Head');
  const hipsY = pelvis.position.y;
  const limbs = ['L', 'R'].map((side) =>
    Object.fromEntries(
      ['Hip', 'Knee', 'Ankle', 'Arm', 'Elbow', 'Wrist'].map((name) => [name, bone(name + side)]),
    ),
  );
  const skin = bone('Brawler');
  skin.frustumCulled = false;
  const material = skin.material;
  material.color.setScalar(0.7);
  material.bumpMap = material.map;
  material.bumpScale = 0.016;
  material.emissiveMap = material.map;
  material.emissive.setScalar(0.3);

  // Give the buckle a beveled edge and an open centre even when seen obliquely.
  const frame = new THREE.Shape();
  frame.moveTo(-0.17, -0.125);
  frame.lineTo(0.17, -0.125);
  frame.quadraticCurveTo(0.21, -0.125, 0.21, -0.088);
  frame.lineTo(0.21, 0.092);
  frame.quadraticCurveTo(0.21, 0.125, 0.17, 0.125);
  frame.lineTo(-0.17, 0.125);
  frame.quadraticCurveTo(-0.21, 0.125, -0.21, 0.086);
  frame.lineTo(-0.21, -0.086);
  frame.quadraticCurveTo(-0.21, -0.125, -0.17, -0.125);
  const opening = new THREE.Path();
  opening.moveTo(-0.145, -0.072);
  opening.lineTo(-0.145, 0.072);
  opening.lineTo(0.145, 0.072);
  opening.lineTo(0.145, -0.072);
  opening.closePath();
  frame.holes.push(opening);
  const buckle = new THREE.Mesh(
    new THREE.ExtrudeGeometry(frame, {
      depth: 0.027,
      bevelThickness: 0.009,
      bevelSize: 0.009,
      bevelSegments: 2,
    }),
    new THREE.MeshStandardMaterial({ color: 0xb9a38c, metalness: 0.37, roughness: 0.52 }),
  );
  buckle.position.set(0, 0.15, 0.85);
  buckle.rotation.x = -0.11;
  pelvis.add(buckle);

  // Replay costumes attach to the same skeleton and leave the reference face intact.
  const replayTrim = [];
  const brass = new THREE.MeshStandardMaterial({
    color: 0xf7bf55,
    metalness: 0.42,
    roughness: 0.37,
  });
  const leather = new THREE.MeshStandardMaterial({ color: 0x55302d, roughness: 0.69 });
  for (const [i, limb] of limbs.entries()) {
    const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.345, 0.135, 24), leather);
    cuff.position.set(i ? 0.045 : -0.045, 0.07, 0.02);
    limb.Wrist.add(cuff);

    const chevron = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.047, 0.04), brass);
    chevron.rotation.z = i ? -0.25 : 0.25;
    chevron.position.set(i ? 0.2 : -0.2, -0.34, 0.38);
    limb.Arm.add(chevron);
    replayTrim.push({ cuff, chevron });
  }

  const feet = new Float32Array(3);
  function pose({ time, walk, march, attack, hit, defeat, variant }) {
    const attackWeight = 1 - smoothRange(defeat, 0, 0.38);
    const prep =
      attackWeight * smoothRange(attack, 0, 0.19) * (1 - smoothRange(attack, 0.2, takeoff + 0.1));
    const air = attackWeight * Math.sin(Math.PI * jumpProgress(attack));
    const raised =
      attackWeight * smoothRange(attack, 0.11, 0.53) * (1 - smoothRange(attack, 0.68, touchdown));
    const strike =
      attackWeight *
      smoothRange(attack, 0.68, touchdown) *
      (1 - smoothRange(attack, 1.01, attackDuration));
    const settle =
      attackWeight * smoothRange(attack, touchdown, 1.0) * (1 - smoothRange(attack, 1.01, 1.39));
    const down = smoothRange(defeat, 0.12, 0.58);
    const relax = smoothRange(defeat, 0.82, 1.34);
    const gait =
      walk *
      (1 - smoothRange(attack, 0.015, 0.16) + smoothRange(attack, 1.32, attackDuration)) *
      (1 - down);
    const reach = 0.41;
    const beat = march == null ? time * 6.75 : march * Math.PI * stanceFraction / reach;
    sampleFeet(beat, gait, feet);
    const stride = feet[0];
    pelvis.position.y =
      hipsY +
      (-0.105 + (0.5 - 0.5 * Math.cos(2 * beat)) * 0.047) * gait -
      0.3 * prep -
      0.48 * settle -
      0.17 * down;
    pelvis.rotation.set(0.055 * prep - 0.075 * air, stride * 0.105, stride * 0.043 - down * 0.075);
    spine.rotation.set(
      0.06 + 0.24 * prep - 0.18 * raised + 0.42 * strike - 0.084 * hit,
      -stride * 0.16,
      -0.057 * stride - 0.16 * down,
    );
    head.rotation.set(
      -0.29 - 0.12 * prep + 0.07 * raised - 0.34 * strike + 0.21 * down,
      stride * 0.052,
      0.032 * stride,
    );
    for (const [i, limb] of limbs.entries()) {
      const side = i ? 1 : -1;
      const swing = feet[i];
      const lift = Math.max(0, (i === 0 ? 1 : -1) * feet[2]);
      // Solve the two leg angles to keep the supporting boot on the road while
      // the other clears it. The painted pose alone has one foot in front.
      const thigh = -limb.Knee.position.y;
      const shin = -limb.Ankle.position.y;
      const downToAnkle = thigh + shin + pelvis.position.y - hipsY - lift * 0.22;
      const footZ = reach * swing;
      const legLength = Math.min(thigh + shin - 0.00001, Math.hypot(downToAnkle, footZ));
      const safeAcos = (value) => Math.acos(THREE.MathUtils.clamp(value, -1, 1));
      const hipAngle =
        Math.atan2(-footZ, downToAnkle) -
        safeAcos((thigh * thigh + legLength * legLength - shin * shin) / (2 * thigh * legLength));
      const kneeAngle =
        Math.PI - safeAcos((thigh * thigh + shin * shin - legLength * legLength) / (2 * thigh * shin));
      limb.Hip.rotation.x = hipAngle - (0.6 + i * 0.11) * air + side * 0.27 * down;
      limb.Knee.rotation.x = kneeAngle + 0.86 * air + 0.22 * down;
      limb.Ankle.rotation.x = -hipAngle - kneeAngle + 0.19 * swing - 0.31 * air;
      limb.Arm.rotation.set(
        0.37 * swing - 0.24 * prep - (2.04 + i * 0.09) * raised - 0.38 * strike,
        side * (0.23 * raised + 0.1 * strike),
        side * (0.035 + 0.12 * prep + 0.28 * raised + 0.055 * strike + 0.69 * down - 0.26 * relax),
      );
      limb.Elbow.rotation.x =
        -0.26 -
        0.17 * Math.max(0, -swing) -
        0.4 * prep -
        0.65 * raised +
        0.12 * strike -
        0.4 * down;
      limb.Wrist.rotation.set(
        -0.24 - 0.13 * raised + 0.22 * strike,
        side * 0.58 * raised,
        side * (0.075 * swing + 0.11 * raised),
      );
      replayTrim[i].cuff.visible = variant === 1;
      replayTrim[i].chevron.visible = variant === 2;
    }
    material.emissive.setRGB(0.3 + hit * 0.36, 0.3 + hit * 0.21, 0.3 + hit * 0.12);
  }
  return { root, pose };
}
