import test from 'node:test';
import assert from 'node:assert/strict';
import { Battle } from '../src/battle.js';
import {
  rifleRound,
  pulseRound,
  cannonRound,
  shotRange,
  sampleFlight,
} from '../src/projectiles.js';
import { slamCycle, slamStrike } from '../src/brawler-motion.js';
import { UNIT_DEFS } from '../src/units.js';

function field(emit) {
  const battle = new Battle(emit);
  battle.start();
  battle.columns = [];
  battle.gates = [];
  battle.features = [];
  battle.wall.hp = 0;
  return battle;
}

function placeRunner(battle, x, z) {
  const enemy = { ...battle.grunt(x, z), x, z, speed: 2 };
  battle.runners.push(enemy);
  return enemy;
}

test('开局无固定队长，纯由 3 名基础蓝盔步兵出发，并通过多级合成一路进化到重炮队长与钢铁指挥官', () => {
  const b = new Battle();
  b.start();
  // 开局严格没有队长，全是基础步兵
  assert.equal(b.squad.length, 3);
  assert.ok(b.squad.every((u) => u.kind === 'rifle'));
  assert.equal(b.highestUnitTier, 1);

  // 1. 3 名步兵合成 1 名 T2 双枪突击兵
  assert.equal(b.performMerge(1, false), true);
  assert.equal(b.squad.length, 1);
  assert.equal(b.squad[0].kind, 'assault');
  assert.equal(b.highestUnitTier, 2);
  assert.ok(b.merges.length >= 3, '应生成合成飞旋汇聚队列');

  // 2. 1 名烈焰兵 + 2 名步兵融合为 T2 烈焰火箭兵
  b.recruit(0, true, 'flame');
  b.recruit(0, true, 'rifle');
  b.recruit(0, true, 'rifle');
  assert.equal(b.performMerge(1, false), true);
  assert.ok(b.squad.some((u) => u.kind === 'pyro'), '应融合出烈焰火箭兵');

  // 3. 2 名 T2 大兵（assault + pyro）融合为 T3 重炮队长！
  assert.equal(b.performMerge(1, false), true);
  assert.ok(b.squad.some((u) => u.kind === 'captain'), '两尊大兵应合出重炮队长');
  assert.equal(b.highestUnitTier, 3);

  // 4. 再合出一尊 T3 重炮队长后，双队长融合为 T4 终极钢铁指挥官！
  b.recruit(0, true, 'captain');
  assert.equal(b.performMerge(1, false), true);
  assert.ok(b.squad.some((u) => u.kind === 'titan'), '双队长应合出终极钢铁指挥官');
  assert.equal(b.highestUnitTier, 4);
  assert.equal(UNIT_DEFS.titan.hp, 10);
});

test('敌方小兵冲撞严格优先打击重盾卫兵与外围 T1 小兵，绝不越级优先打死高阶大兵和队长', () => {
  const b = field();
  b.squad = [];
  const titan = b.recruit(0, true, 'titan');
  const assault = b.recruit(0.2, true, 'assault');
  const rifle = b.recruit(0.4, true, 'rifle');
  const shield = b.recruit(0.1, true, 'shield');
  // 紧贴高阶核心坐标放置一名冲锋红兵
  titan.x = 0;
  titan.z = 0;
  assault.x = 0.1;
  assault.z = 0;
  rifle.x = 0.6;
  rifle.z = -0.2;
  shield.x = 0.5;
  shield.z = -0.3;

  // 第一击：必定先打重盾卫兵（shield，HP 3 -> 2），大兵与指挥官毫发无伤
  const e1 = placeRunner(b, 0, -0.05);
  b.hitGuard = 0;
  assert.equal(b.contact(e1), true);
  assert.equal(shield.hp, 2);
  assert.equal(titan.hp, titan.maxHp);
  assert.equal(assault.hp, assault.maxHp);

  // 移除重盾后，第二击必定优先打外围 T1 蓝盔步兵，仍然不碰核心大兵与指挥官
  b.squad = b.squad.filter((u) => u !== shield);
  const e2 = placeRunner(b, 0, -0.05);
  b.hitGuard = 0;
  assert.equal(b.contact(e2), true);
  assert.equal(b.squad.includes(rifle), false, '外围 T1 小兵应先挡伤阵亡');
  assert.equal(titan.hp, titan.maxHp);
  assert.equal(assault.hp, assault.maxHp);
});

test('所有武器在各车道直线飞行并在射程边界自然消散', () => {
  for (const profile of [rifleRound, pulseRound, cannonRound]) {
    for (const x of [-4.4, 0, 4.15]) {
      const battle = field();
      battle.squad = [];
      const distant = placeRunner(battle, x > 0 ? -1 : 2, -6);
      const beyondRange = placeRunner(battle, x, -shotRange - 1);
      battle.launch(x, 0.6, 0, profile, 1, 26);
      const shot = battle.shots[0];
      assert.equal(shot.headingX, 0);
      for (let i = 0; i < 130; i++) {
        battle.advanceShots(1 / 60);
        assert.equal(shot.x, x);
        assert.ok(shot.z >= -shotRange);
      }
      assert.equal(shot.z, -shotRange);
      assert.equal(battle.shots.length, 0);
      assert.ok(distant.alive && beyondRange.alive);
    }
  }
});

test('近距离敌人可微调弹道朝向，目标消失后在空子弹不会弯曲折返', () => {
  const battle = field();
  battle.squad = [];
  const close = placeRunner(battle, 1.2, -1.4);
  battle.launch(0, 0.58, 0, rifleRound, 1, 2.5);
  const shot = battle.shots[0];
  const { headingX, headingZ } = shot;
  assert.ok(headingX > 0 && headingZ < 0);
  battle.advanceShots(0.016);
  close.alive = false;
  const other = placeRunner(battle, -1, -1);
  for (let i = 0; i < 20; i++) {
    battle.advanceShots(1 / 60);
    assert.equal(shot.headingX, headingX);
    assert.equal(shot.headingZ, headingZ);
    assert.ok(Math.abs(shot.x * headingZ - shot.z * headingX) < 1e-6);
  }
  assert.ok(other.alive);
});

test('前飞子弹命中物理路径上首个士兵或硬墙，三种弹道拥有递增弧高', () => {
  const battle = field();
  battle.squad = [];
  const far = placeRunner(battle, 0, -5);
  const near = placeRunner(battle, 0, -3);
  battle.launch(0, 0.58, 0, rifleRound, 1, 2.5);
  battle.advanceShots(0.3);
  assert.ok(!near.alive && far.alive);
  battle.wall.x = 0;
  battle.wall.z = -2;
  battle.wall.hp = 72;
  battle.launch(0, 1.31, 0, cannonRound, 1, 26);
  battle.advanceShots(0.3);
  assert.ok(battle.wall.hp < 72 && far.alive);

  battle.wall.hp = 0;
  const midpoints = [rifleRound, pulseRound, cannonRound].map((profile) => {
    battle.launch(1, 0.58, 0, profile, 1, 26);
    return sampleFlight(battle.shots.at(-1), shotRange / 2, {});
  });
  assert.ok(midpoints[0].y < midpoints[1].y && midpoints[1].y < midpoints[2].y);
});

test('Boss 近身发动高举手臂连续砸地（3 连锤切换左右与双拳）并可闪避', () => {
  const events = [];
  const battle = field((e) => events.push(e.kind));
  battle.squad = [];
  for (let i = 0; i < 6; i++) {
    const u = battle.recruit(0, true, 'rifle');
    u.x = (i % 3) * 0.25 - 0.25;
    u.z = 0;
  }
  const boss = battle.boss;
  Object.assign(boss, { x: 0, z: -2.4, active: true, pursuing: true, nextCast: 99 });
  battle.advanceBoss(1 / 60);
  assert.ok(boss.attackT > 0);
  assert.equal(boss.slamChain, 3, '常态应发起 3 连砸攻势');
  assert.equal(boss.slamHand, 0, '第一锤应为左手高举');

  // 推进一整个砸地周期后应砸出第 1 下 slam，并自动切换右手连砸第 2 锤！
  const steps = Math.ceil((slamCycle + 0.05) * 60);
  for (let i = 0; i < steps; i++) battle.advanceBoss(1 / 60);
  assert.equal(events.filter((k) => k === 'slam').length, 1);
  assert.equal(boss.slamHand, 1, '第 1 锤结束后应立刻切右手连砸');
  assert.ok(boss.attackT > 0 && boss.slamChain === 2);

  // 再推进 2 个周期，连砸出第 2、3 锤（含双拳终极重砸）
  for (let i = 0; i < steps * 2; i++) battle.advanceBoss(1 / 60);
  assert.ok(events.filter((k) => k === 'slam').length >= 2);
});

test('Boss 被击杀时先被密集子弹猛烈向 -Z 击退，再向后仰面倒地砸尘，最后过载爆裂一次', () => {
  const events = [];
  const b = field((e) => events.push(e.kind));
  Object.assign(b.boss, { active: true, z: -8.5, hp: 20 });
  b.row = b.lastRow;
  const startZ = b.boss.z;
  b.damageBoss({ kind: 'rocket' }, 40);
  assert.equal(b.boss.defeated, true);
  assert.equal(b.phase, 'clear');

  // 阶段 1（0~0.85s）：被子弹向 -Z 远端持续击退 3+ 单位，身上爆发连环火星，尚未倒地
  for (let i = 0; i < 48; i++) b.advanceBoss(1 / 60);
  assert.ok(b.boss.z < startZ - 3.0, `Boss 应被大幅向远端 -Z 击退（现 ${b.boss.z} vs 原 ${startZ}）`);
  assert.equal(b.boss.removed, false);
  assert.equal(events.includes('victory'), false, '击退期间尚未落地');
  assert.ok(events.includes('critHit'), '击退期间应有连续子弹火花');

  // 阶段 2（0.85~1.48s）：向后仰面倒下并在 ~1.36s 砸地扬尘（victory 事件）
  for (let i = 0; i < 40; i++) b.advanceBoss(1 / 60);
  assert.equal(events.includes('victory'), true, '约 1.36s 应重重仰摔砸地');
  assert.equal(b.boss.removed, false);

  // 阶段 3（~2.05s）：倒地停顿后过载炸裂一次
  for (let i = 0; i < 50; i++) b.advanceBoss(1 / 60);
  assert.equal(b.boss.removed, true);
  assert.equal(events.filter((e) => e === 'bossBurst').length, 1);

  // 残敌清空且超过 2.45s 自动转入胜利阅兵
  for (let i = 0; i < 35; i++) b.advanceBoss(1 / 60);
  assert.equal(b.phase, 'won');
});

test('步态插值保持支撑脚贴地不打滑、摆动脚清晰抬起迈前', async () => {
  const { marchAngle, sampleFeet, footReach, strideLength } = await import(
    '../src/infantry-walk.js'
  );
  const e = { phase: 0, size: 1.04, marched: 0 };
  const feet = new Float64Array(3);
  function pose(cycle) {
    e.marched = cycle * strideLength * e.size;
    sampleFeet(marchAngle(e), 1, feet);
    return { forward: e.marched + feet[0] * footReach * e.size, leftLift: Math.max(0, feet[2]) };
  }
  const heel = pose(0.04),
    toe = pose(0.52),
    swing = pose(0.8),
    next = pose(1.04);
  assert.equal(heel.leftLift, 0);
  assert.equal(toe.leftLift, 0);
  assert.ok(Math.abs(toe.forward - heel.forward) < 1e-9);
  assert.ok(swing.leftLift > 0.85 && swing.forward > toe.forward);
  assert.ok(Math.abs(next.forward - heel.forward - strideLength * e.size) < 1e-9);
});

test('全部 3 关 Boss 均按预期在终波入场，且第 1 关铁拳能稳健进场交战', () => {
  for (const stage of [1, 2, 3]) {
    const b = new Battle();
    b.reset(stage);
    b.entryZ = -46;
    b.start();
    b.row = b.finaleRow - 1;
    b.worldAdvance = 2.3 / 60;
    b.advanceBoss(1 / 60);
    assert.equal(b.boss.active, false);
    b.advanceCrowd(1 / 60);
    b.advanceBoss(1 / 60);
    assert.ok(b.boss.active && b.boss.z < b.entryZ - 1);
  }
});

test('全队阵亡进入失败演出，红兵越过防线后允许结算弹窗', () => {
  const b = field();
  b.squad = [];
  const only = b.recruit(0, true, 'rifle');
  only.x = 0;
  only.z = 0;
  const attacker = placeRunner(b, 0, -0.15);
  b.contact(attacker);
  assert.equal(b.phase, 'lost');
  assert.equal(b.lossReason, 'infantry');
  for (let i = 0; i < 160; i++) b.tick(1 / 60);
  assert.ok(b.overrun.crossed && b.resultReady);
});
