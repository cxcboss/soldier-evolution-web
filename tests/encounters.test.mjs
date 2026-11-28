import test from 'node:test';
import assert from 'node:assert/strict';
import { Battle } from '../src/battle.js';
import { campaign, lastStage, terrainPiece, isOpening } from '../src/campaign.js';
import { updateTerrain, hitMechanism, finaleGap } from '../src/encounters.js';

test('严格仅保留 3 个精品验证关卡，三关生态、Boss 与核心机关各不相同', () => {
  assert.equal(lastStage, 3);
  assert.equal(campaign.length, 3);
  assert.equal(new Set(campaign.map((r) => r.theme)).size, 3);
  assert.equal(new Set(campaign.map((r) => r.boss)).size, 3);
  // 第 1 关特色：高爆油桶阵；第 2 关特色：巨木滚筒 + 电磁塔 + 吊桥；第 3 关特色：熔岩喷发 + 流星火雨
  assert.ok(campaign[0].features.some((f) => f.kind === 'barrel'));
  assert.ok(
    campaign[1].features.some((f) => f.kind === 'roller') &&
      campaign[1].features.some((f) => f.kind === 'coil') &&
      campaign[1].features.some((f) => f.kind === 'bridge'),
  );
  assert.ok(
    campaign[2].features.some((f) => f.kind === 'lavaVent') &&
      campaign[2].features.some((f) => f.kind === 'skyfall'),
  );
  // 任何位置均保留可行进通道，绝不三道全封死
  for (const route of campaign) {
    for (let d = 0; d < 160; d += 0.5) {
      const danger = route.features.filter(
        (p) =>
          ['gap', 'bridge', 'cache'].includes(p.kind) &&
          Math.abs(p.at - d) < (p.length || 1) / 2 + 1.0,
      );
      assert.ok(new Set(danger.map((p) => p.lane)).size < 3, route.name);
    }
  }
});

test('第 1 关高爆油桶命中引爆清屏，并触发邻近油桶 0.14s 多米诺连锁爆破', () => {
  const events = [];
  const b = new Battle((e) => events.push(e.kind));
  b.reset(1);
  b.start();
  const barrels = b.features.filter((f) => f.kind === 'barrel');
  assert.ok(barrels.length >= 2);
  const first = barrels[0];
  const second = barrels[1];
  b.distance = first.at - 6;
  updateTerrain(b, 1 / 60);
  const enemy = { ...b.grunt(first.x + 0.5, first.z), x: first.x + 0.5, z: first.z, speed: 2 };
  b.runners.push(enemy);

  // 打爆第一个油桶
  hitMechanism(b, first, { x: first.x, z: first.z, damage: first.hp + 10 });
  assert.equal(first.state, 'exploded');
  assert.equal(enemy.alive, false, '油桶爆炸应炸飞范围内红兵');
  assert.ok(second.chainTimer > 0, '邻近油桶应进入延迟连锁引爆');

  // 推进 0.2s，第二个油桶自动连锁爆破！
  for (let i = 0; i < 15; i++) updateTerrain(b, 1 / 60);
  assert.equal(second.state, 'exploded');
  assert.equal(events.filter((k) => k === 'barrelBlast').length, 2);
});

test('第 2 关巨木滚筒高速滚向玩家，集火击碎后爆出 +3 步兵援兵', () => {
  const b = new Battle();
  b.reset(2);
  b.start();
  const roller = b.features.find((f) => f.kind === 'roller');
  assert.ok(roller);
  b.distance = roller.at - 18;
  updateTerrain(b, 1 / 60);
  const zBefore = roller.z;
  for (let i = 0; i < 20; i++) updateTerrain(b, 1 / 60);
  assert.ok(roller.z > zBefore + 1.5 && roller.rollSpin > 1, '滚木应滚转向前加速推进');

  const beforeSquad = b.squad.length;
  hitMechanism(b, roller, { x: roller.x, z: roller.z, damage: roller.hp + 10, kind: 'rocket' });
  assert.equal(roller.state, 'broken');
  assert.equal(b.squad.length, beforeSquad + 3, '轰碎巨木滚筒应奖励 3 名步兵');
});

test('第 2 关电磁塔击爆释放 3D 锯齿连锁闪电并清扫大片红兵', () => {
  const events = [];
  const b = new Battle((e) => events.push(e.kind));
  b.reset(2);
  b.start();
  const coil = b.features.find((f) => f.kind === 'coil');
  b.distance = coil.at - 8;
  updateTerrain(b, 1 / 60);
  for (let i = 0; i < 5; i++) {
    const e = { ...b.grunt(coil.x + (i - 2) * 0.8, coil.z - 1), x: coil.x + (i - 2) * 0.8, z: coil.z - 1 };
    b.runners.push(e);
  }
  hitMechanism(b, coil, { x: coil.x, z: coil.z, damage: coil.hp + 10 });
  assert.equal(coil.state, 'discharged');
  assert.ok(events.includes('discharge'));
  assert.ok(b.lightningArcs.length >= 5, '电磁塔放电应产生真实 3D 闪电链');
  assert.ok(b.runners.every((e) => !e.alive));
});

test('第 2 关吊桥打断可截断侧翼增援，未打断则放行一波侧翼敌兵', () => {
  for (const cut of [false, true]) {
    const b = new Battle();
    b.reset(2);
    b.start();
    const p = b.features.find((f) => f.kind === 'bridge');
    b.distance = p.at - 15;
    updateTerrain(b, 1 / 60);
    b.runners = [];
    if (cut) hitMechanism(b, p, { x: p.x, z: p.z, damage: p.hp + 5 });
    b.distance = p.at - 6.96;
    for (let i = 0; i < 320; i++) updateTerrain(b, 1 / 60);
    const extras = b.runners.filter((e) => e.flank);
    assert.equal(extras.length, cut ? 0 : 16);
    assert.equal(isOpening(p), cut);
    assert.equal(p.state, cut ? 'cut' : 'linked');
  }
});

test('第 3 关熔岩裂隙按周期蓄力预警并喷发灼烧红兵与裂口内单位', () => {
  const events = [];
  const b = new Battle((e) => events.push(e.kind));
  b.reset(3);
  b.start();
  const vent = b.features.find((f) => f.kind === 'lavaVent');
  assert.ok(vent);
  b.distance = vent.at - 6;
  vent.ventClock = 1.5;
  updateTerrain(b, 1 / 60);
  const red = { ...b.grunt(vent.x, vent.z), x: vent.x, z: vent.z };
  b.runners.push(red);
  // 跨过 1.6s 喷发阈值
  for (let i = 0; i < 12; i++) updateTerrain(b, 1 / 60);
  assert.equal(vent.erupting, true);
  assert.ok(events.includes('lavaBurst'));
  assert.equal(red.alive, false, '熔岩喷发应灼杀范围内红兵');
});

test('第 3 关高空炽热陨石预警落地后击杀圈内敌兵且仅结算一次', () => {
  const events = [];
  const b = new Battle((e) => events.push(e.kind));
  b.reset(3);
  b.start();
  const meteor = b.features.find((p) => p.kind === 'skyfall');
  b.features = [meteor];
  const advanceTo = (z) => {
    b.distance = meteor.at + z;
    updateTerrain(b, 1 / 60);
  };
  advanceTo(-9.5);
  assert.equal(meteor.state, 'ready');
  advanceTo(-6.5);
  assert.equal(meteor.state, 'warning');
  const local = { ...b.grunt(meteor.x, 0.67), x: meteor.x, z: 0.67 };
  b.runners.push(local);
  b.x = meteor.x - 4;
  for (const u of b.squad) u.x = b.x;
  advanceTo(0.7);
  assert.equal(meteor.state, 'landed');
  assert.equal(local.alive, false);
  assert.equal(events.filter((k) => k === 'barrelBlast').length, 1);
  advanceTo(1.2);
  assert.equal(events.filter((k) => k === 'barrelBlast').length, 1);
});

test('第 2 关 Boss 飞跃终局断桥并平稳落地', () => {
  const events = [],
    b = new Battle((e) => events.push(e.kind));
  b.reset(2);
  b.start();
  b.entryZ = -48;
  b.features = [];
  Object.assign(b.boss, { active: true, z: -49.5 });
  finaleGap(b);
  const p = b.features[0];
  let peak = 0;
  let landed = false;
  for (let i = 0; i < 800; i++) {
    b.worldAdvance = 2.3 / 60;
    b.distance += b.worldAdvance;
    updateTerrain(b, 1 / 60);
    const was = b.boss.vault;
    b.advanceBoss(1 / 60);
    if (was && !b.boss.vault) {
      landed = true;
      break;
    }
    peak = Math.max(peak, b.boss.lift);
  }
  assert.ok(landed && peak > 2.4 && b.boss.z > p.z + p.length / 2);
  assert.equal(events.filter((e) => e === 'vaultLand').length, 1);
});
