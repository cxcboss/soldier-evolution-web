import * as THREE from 'three';
import { sampleFeet, stanceFraction } from './infantry-walk.js';
import { creaturePaint } from './creature-paint.js';
import { createCreatureBosses } from './creature-bosses.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { jumpProgress, smoothRange, takeoff, touchdown, attackDuration } from './brawler-motion.js';

export async function loadBrawler() {
  const { scene: root } = await new GLTFLoader().loadAsync('./art/brawler.glb?v=ringmaster2');
  const paint = creaturePaint();
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
  material.color.setScalar(0.78);
  material.emissiveMap = material.map;
  material.emissive.setScalar(0.22);

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

  const creature = createCreatureBosses(root, paint);
  const feet = new Float32Array(3);
  function pose({
    time,
    walk,
    march,
    attack,
    hit,
    defeat,
    kind = 'bruiser',
    vault = 0,
    brace = 0,
    drive = 0,
    charge = 0,
    release = 0,
    mode,
  }) {
    const isCreature = creature(kind, {
      time,
      walk,
      march,
      attack,
      defeat,
      vault,
      charge,
      release,
      mode,
      hit,
    });
    skin.visible = buckle.visible = !isCreature;
    if (isCreature) return;
    const vaultT = Math.min(1, vault / 1.35);
    const bound = Math.sin(Math.PI * Math.max(0, Math.min(1, (vault - 0.21) / 0.89)));
    const gather = smoothRange(vault, 0, 0.14) * (1 - smoothRange(vault, 0.14, 0.32));
    const absorb = smoothRange(vault, 1.04, 1.13) * (1 - smoothRange(vault, 1.14, 1.35));
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
      (1 - down) *
      (1 - 0.9 * Math.sin(Math.PI * vaultT));
    const reach = 0.41;
    const beat = march == null ? time * 6.75 : (march * Math.PI * stanceFraction) / reach;
    sampleFeet(beat, gait, feet);
    const stride = feet[0];
    pelvis.position.y =
      hipsY +
      (-0.105 + (0.5 - 0.5 * Math.cos(2 * beat)) * 0.047) * gait -
      0.3 * prep -
      0.48 * settle -
      0.17 * down -
      0.32 * gather -
      0.26 * absorb;
    pelvis.rotation.set(0.055 * prep - 0.075 * air, stride * 0.105, stride * 0.043 - down * 0.075);
    spine.rotation.set(
      0.06 +
        0.24 * gather +
        0.19 * absorb -
        0.14 * bound +
        0.13 * drive +
        0.24 * prep -
        0.18 * raised +
        0.42 * strike -
        0.084 * hit,
      -stride * 0.16,
      -0.057 * stride - 0.16 * down,
    );
    if (kind === 'bruiser') spine.rotation.x += 0.16 * charge + 0.31 * release;
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
        Math.PI -
        safeAcos((thigh * thigh + shin * shin - legLength * legLength) / (2 * thigh * shin));
      limb.Hip.rotation.x =
        hipAngle - (0.62 + i * 0.13) * bound - (0.6 + i * 0.11) * air + side * 0.27 * down;
      limb.Knee.rotation.x = kneeAngle + 0.78 * bound + 0.22 * absorb + 0.86 * air + 0.22 * down;
      limb.Ankle.rotation.x = -hipAngle - kneeAngle + 0.19 * swing - 0.31 * air;
      limb.Arm.rotation.set(
        0.37 * swing -
          0.76 * bound +
          0.18 * gather -
          (i ? 0 : 0.82) * brace -
          (i ? 0.65 : 0) * drive -
          0.24 * prep -
          (2.04 + i * 0.09) * raised -
          0.38 * strike,
        side * (0.23 * raised + 0.1 * strike + 0.22 * bound),
        side * (0.035 + 0.12 * prep + 0.28 * raised + 0.055 * strike + 0.69 * down - 0.26 * relax),
      );
      limb.Elbow.rotation.x =
        -0.26 -
        0.17 * Math.max(0, -swing) -
        0.4 * prep -
        0.65 * raised +
        0.12 * strike -
        0.4 * down;
      limb.Arm.rotation.x -= 1.36 * charge + 0.11 * release;
      limb.Elbow.rotation.x -= 0.34 * charge;
      limb.Wrist.rotation.set(
        -0.24 - 0.13 * raised + 0.22 * strike,
        side * 0.58 * raised,
        side * (0.075 * swing + 0.11 * raised),
      );
    }
    material.emissive.setRGB(0.22 + hit * 0.36, 0.22 + hit * 0.21, 0.22 + hit * 0.12);
  }
  return { root, pose, prepare: paint.prepare };
}
