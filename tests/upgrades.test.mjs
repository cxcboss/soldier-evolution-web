import test from 'node:test';
import assert from 'node:assert/strict';
import { Battle, EVOLUTION_TIERS } from '../src/battle.js';
import {
  ARMORY_UPGRADES,
  buyUpgrade,
  computeBonuses,
  defaultSave,
  evaluateRun,
  loadProgress,
  saveProgress,
  totalStars,
} from '../src/progression.js';

test('军团进化随合成与击杀升阶并触发进化播报与暴击增益', () => {
  const events = [];
  const b = new Battle((e) => events.push(e.kind));
  b.start();
  assert.equal(b.tier, 1);
  b.addEvo(EVOLUTION_TIERS[1].need);
  assert.equal(b.tier, 2);
  assert.ok(events.includes('evolve'));
  assert.ok(b.popups.some((p) => p.kind === 'evolve' && p.text.includes('军团进阶')));
  b.addEvo(EVOLUTION_TIERS[3].need);
  assert.equal(b.tier, 4);
  assert.ok(b.critChance >= EVOLUTION_TIERS[3].critBonus);
});

test('连击累加提升伤害倍率，超时后自动归零并保留最高记录', () => {
  const b = new Battle();
  b.start();
  b.columns = [];
  b.gates = [];
  b.features = [];
  b.wall.hp = 0;
  assert.equal(b.comboDamageMult, 1);
  b.addCombo(16);
  assert.ok(b.comboDamageMult > 1.05);
  b.addCombo(70);
  assert.equal(b.maxCombo, 86);
  assert.ok(b.comboDamageMult >= 1.18);
  for (let i = 0; i < 220; i++) b.tick(1 / 60);
  assert.equal(b.combo, 0);
  assert.equal(b.maxCombo, 86);
});

test('战术超载满能释放 5 联暴击重炮并激活护盾与超频期', () => {
  const events = [];
  const b = new Battle((e) => events.push(e.kind));
  b.start();
  b.columns = [];
  b.gates = [];
  b.features = [];
  b.wall.hp = 0;
  assert.equal(b.triggerOverdrive(), false);
  b.addOverdrive(100);
  assert.equal(b.overdrive, 100);
  assert.equal(b.triggerOverdrive(), true);
  assert.equal(b.overdrive, 0);
  assert.ok(b.overdriveActive > 4);
  assert.ok(b.buffs.shield >= 1.5);
  assert.ok(events.includes('overdrive'));
  const rockets = b.shots.filter((s) => s.kind === 'rocket' && s.crit);
  assert.equal(rockets.length, 5);
});

test('Boss 血量跌破 50% 后进入狂暴连砸状态并触发警报事件', () => {
  const events = [];
  const b = new Battle((e) => events.push(e.kind));
  b.reset(1);
  b.start();
  b.columns = [];
  b.gates = [];
  b.features = [];
  b.wall.hp = 0;
  b.boss.active = true;
  b.boss.z = -14;
  b.boss.hp = b.boss.maxHp * 0.45;
  b.advanceBoss(1 / 60);
  assert.equal(b.boss.enraged, true);
  assert.ok(events.includes('bossEnrage'));
});

test('三关星级（含合成重炮队长 2★ 条件）、军饷与军械整备升级闭环', () => {
  const mem = new Map();
  const mockStorage = {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
  };
  const state = defaultSave();
  const b = new Battle();
  b.reset(1);
  b.start();
  b.score = 120;
  b.maxCombo = 45;
  b.recruit(0, true, 'captain'); // 达成合成重炮队长 2★ 条件
  const res = evaluateRun(state, b, true);
  assert.equal(res.stars, 3);
  assert.equal(totalStars(state), 3);
  assert.ok(state.coins >= 150);

  // 购买起始编制升级（+2 基础步兵）
  const firstCost = ARMORY_UPGRADES[0].costs[0];
  state.coins = firstCost + 10;
  assert.equal(buyUpgrade(state, 'squad'), true);
  assert.equal(state.upgrades.squad, 1);
  assert.equal(state.coins, 10);

  saveProgress(state, mockStorage);
  const loaded = loadProgress(mockStorage);
  assert.equal(loaded.upgrades.squad, 1);
  assert.equal(loaded.stars['1'], 3);

  const b2 = new Battle();
  b2.reset(1);
  b2.applyBonuses(computeBonuses(loaded));
  assert.equal(b2.squad.length, 5); // 基础 3 名步兵 + 升级额外 2 名步兵
});
