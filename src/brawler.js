import * as THREE from 'three';
import { sampleFeet, stanceFraction } from './infantry-walk.js';
import { creaturePaint } from './creature-paint.js';
import { createCreatureBosses } from './creature-bosses.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {
  slamCycle,
  slamDownWeight,
  slamRaiseWeight,
  slamStrike,
  smoothRange,
} from './brawler-motion.js';

export function loadBrawler() {
  const root = new THREE.Group();
  const paint = creaturePaint();
  const creature = createCreatureBosses(root, paint);
  const feet = new Float32Array(3);

  let brawlerReady = null;
  let glb = null;

  /** 按需加载 1.77MB 的铁拳队长 GLB，生物 Boss 关卡无需首屏阻塞等待 */
  function loadBruiserModel() {
    if (brawlerReady) return brawlerReady;
    brawlerReady = new GLTFLoader()
      .loadAsync('./art/brawler.glb?v=ringmaster2')
      .then(({ scene: model }) => {
        root.add(model);
        const bone = (name) => model.getObjectByName(name);
        const pelvis = bone('Pelvis'),
          spine = bone('Spine'),
          head = bone('Head');
        const hipsY = pelvis.position.y;
        const limbs = ['L', 'R'].map((side) =>
          Object.fromEntries(
            ['Hip', 'Knee', 'Ankle', 'Arm', 'Elbow', 'Wrist'].map((name) => [
              name,
              bone(name + side),
            ]),
          ),
        );
        const skin = bone('Brawler');
        skin.frustumCulled = false;
        const material = skin.material;
        material.color.setScalar(0.84);
        material.emissiveMap = material.map;
        material.emissive.setScalar(0.24);

        // 金属腰带扣倒角细节
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
          new THREE.MeshStandardMaterial({ color: 0xc9b08e, metalness: 0.48, roughness: 0.42 }),
        );
        buckle.position.set(0, 0.15, 0.85);
        buckle.rotation.x = -0.11;
        pelvis.add(buckle);
        glb = { model, pelvis, spine, head, hipsY, limbs, skin, material, buckle };
        return true;
      });
    return brawlerReady;
  }

  function prepare(kind) {
    if (kind === 'bruiser') return loadBruiserModel();
    // 生物关卡仅加载对应皮肤，同时后台空闲预载铁拳模型
    return paint.prepare(kind);
  }

  function pose({
    time,
    walk,
    march,
    attack,
    slamHand = 0,
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
      slamHand,
      defeat,
      vault,
      charge,
      release,
      mode,
      hit,
    });
    if (glb) glb.skin.visible = glb.buckle.visible = !isCreature;
    if (isCreature || !glb) return;
    const { pelvis, spine, head, hipsY, limbs, material } = glb;
    const vaultT = Math.min(1, vault / 1.35);
    const bound = Math.sin(Math.PI * Math.max(0, Math.min(1, (vault - 0.21) / 0.89)));
    const gather = smoothRange(vault, 0, 0.14) * (1 - smoothRange(vault, 0.14, 0.32));
    const absorb = smoothRange(vault, 1.04, 1.13) * (1 - smoothRange(vault, 1.14, 1.35));

    // 高举手臂连砸地面动作权重
    const attackWeight = attack > 0 ? 1 - smoothRange(defeat, 0, 0.15) : 0;
    const raise = attackWeight * slamRaiseWeight(attack);
    const strike = attackWeight * slamDownWeight(attack);
    const bothHands = slamHand === 2;
    const air =
      bothHands && attack > 0
        ? attackWeight * Math.sin(Math.PI * smoothRange(attack, 0.16, slamStrike))
        : 0;

    // 击杀两阶段：0~0.85s 子弹密集击退踉跄后仰抽搐 -> 0.85~1.38s 彻底失衡向后仰面倒地
    const knock = smoothRange(defeat, 0, 0.08) * (1 - smoothRange(defeat, 0.82, 0.96));
    const knockPulse = knock * Math.abs(Math.sin(defeat * 28));
    const fall = smoothRange(defeat, 0.84, 1.38);
    const relax = smoothRange(defeat, 1.38, 1.85);

    const gait =
      (walk *
        (1 - 0.82 * attackWeight) *
        (1 - fall) *
        (1 - 0.9 * Math.sin(Math.PI * vaultT))) +
      knock * 0.85;
    const reach = 0.41;
    const beat = march == null ? time * 6.75 : (march * Math.PI * stanceFraction) / reach;
    sampleFeet(beat, Math.min(1, gait), feet);
    const stride = feet[0];
    const handTwist = slamHand === 0 ? 1 : slamHand === 1 ? -1 : 0;

    pelvis.position.y =
      hipsY +
      (-0.105 + (0.5 - 0.5 * Math.cos(2 * beat)) * 0.047) * Math.min(1, gait) +
      0.14 * raise -
      0.56 * strike -
      0.16 * knockPulse -
      0.18 * fall -
      0.32 * gather -
      0.26 * absorb;
    pelvis.rotation.set(
      -0.1 * raise + 0.14 * strike - 0.12 * air - 0.14 * knock,
      stride * 0.105 + handTwist * (0.28 * raise - 0.34 * strike),
      stride * 0.043 - fall * 0.08 + knock * Math.sin(defeat * 22) * 0.12,
    );
    spine.rotation.set(
      0.06 +
        0.24 * gather +
        0.19 * absorb -
        0.14 * bound +
        0.13 * drive -
        0.34 * raise +
        0.72 * strike -
        0.09 * hit -
        0.38 * knock -
        0.22 * knockPulse -
        0.18 * fall,
      -stride * 0.16 + handTwist * (0.42 * raise - 0.48 * strike),
      -0.057 * stride - 0.15 * fall + knock * Math.sin(defeat * 19) * 0.14,
    );
    if (kind === 'bruiser') spine.rotation.x += 0.16 * charge + 0.31 * release;
    head.rotation.set(
      -0.25 + 0.18 * raise - 0.42 * strike - 0.35 * knock + 0.24 * fall,
      stride * 0.052 - handTwist * 0.18 * raise,
      0.032 * stride + knock * Math.sin(defeat * 26) * 0.16,
    );
    for (const [i, limb] of limbs.entries()) {
      const side = i ? 1 : -1;
      const swing = feet[i];
      const lift = Math.max(0, (i === 0 ? 1 : -1) * feet[2]);
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
        hipAngle -
        (0.62 + i * 0.13) * bound -
        (0.58 + i * 0.1) * air +
        0.22 * strike +
        side * 0.28 * fall;
      limb.Knee.rotation.x =
        kneeAngle + 0.78 * bound + 0.22 * absorb + 0.82 * air + 0.32 * strike + 0.24 * fall;
      limb.Ankle.rotation.x = -hipAngle - kneeAngle + 0.19 * swing - 0.31 * air;

      // 判断当前手臂是否是本记砸地的主力臂（左砸=0 / 右砸=1 / 双拳爆裂重砸=2）
      const activeArm = bothHands || slamHand === i;
      const armRaise = activeArm ? raise : 0;
      const armStrike = activeArm ? strike : 0;
      const counterArm = !activeArm && attackWeight > 0 ? raise : 0;

      limb.Arm.rotation.set(
        0.37 * swing -
          0.76 * bound +
          0.18 * gather -
          (i ? 0 : 0.82) * brace -
          (i ? 0.65 : 0) * drive -
          (bothHands ? 2.68 : 2.58) * armRaise -
          0.88 * armStrike +
          0.42 * counterArm -
          0.88 * knock -
          0.45 * knockPulse,
        side * (0.28 * armRaise - 0.16 * armStrike + 0.22 * bound + 0.42 * knock),
        side *
          (0.05 +
            0.34 * armRaise -
            0.12 * armStrike +
            0.25 * counterArm +
            0.78 * knock +
            0.68 * fall -
            0.24 * relax),
      );
      limb.Elbow.rotation.x =
        -0.26 -
        0.17 * Math.max(0, -swing) -
        0.58 * armRaise -
        0.14 * armStrike -
        0.48 * knock -
        0.38 * fall;
      limb.Arm.rotation.x -= 1.36 * charge + 0.11 * release;
      limb.Elbow.rotation.x -= 0.34 * charge;
      limb.Wrist.rotation.set(
        -0.24 - 0.15 * armRaise + 0.28 * armStrike,
        side * 0.52 * armRaise,
        side * (0.075 * swing + 0.12 * armRaise),
      );
    }
    const glowBoost = Math.max(hit, knockPulse * 0.85);
    material.emissive.setRGB(
      0.24 + glowBoost * 0.62,
      0.24 + glowBoost * 0.32,
      0.24 + glowBoost * 0.18,
    );
  }
  return { root, pose, prepare };
}
