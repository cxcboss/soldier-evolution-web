import test from 'node:test';
import assert from 'node:assert/strict';
import { Battle } from '../src/battle.js';
import { campaign, lastStage, terrainPiece, isOpening } from '../src/campaign.js';
import { updateTerrain, hitMechanism, finaleGap } from '../src/encounters.js';

test('all 30 routes have distinct arrangements and keep at least one passage open', () => {
  assert.equal(lastStage, 30);
  assert.equal(new Set(campaign.map((r) => r.name)).size, 30);
  assert.equal(new Set(campaign.map((r) => JSON.stringify(r.features))).size, 30);
  assert.equal(new Set(campaign.map((r) => r.theme)).size, 6);
  assert.equal(new Set(campaign.map((r) => r.boss)).size, 6);
  for (const route of campaign) {
    for (let d = 0; d < 183; d += 0.5) {
      const danger = route.features.filter(
        (p) =>
          ['gap', 'bridge', 'cache'].includes(p.kind) &&
          Math.abs(p.at - d) < (p.length || 1) / 2 + 1.0,
      );
      assert.ok(new Set(danger.map((p) => p.lane)).size < 3, route.name);
    }
  }
});

test('a missed drawbridge admits one finite extra column; cutting it early opens the span', () => {
  for (const cut of [false, true]) {
    const b = new Battle();
    b.reset(3);
    b.start();
    const p = b.features.find((f) => f.kind === 'bridge');
    b.distance = p.at - 15;
    updateTerrain(b, 1 / 60);
    b.runners = [];
    if (cut) hitMechanism(b, p, { x: p.x, z: p.z, damage: p.hp });
    b.distance = p.at - 6.96;
    for (let i = 0; i < 320; i++) updateTerrain(b, 1 / 60);
    const extras = b.runners.filter((e) => e.flank);
    assert.equal(extras.length, cut ? 0 : 17);
    assert.ok(extras.every((e) => Math.abs(e.x - p.x) < 0.25 && e.z < b.entryZ));
    assert.equal(isOpening(p), cut);
    assert.equal(p.state, cut ? 'cut' : 'linked');
  }
});

test('a cache reveals its reward only after escort entry and breaking the last brick', () => {
  const b = new Battle();
  b.reset(2);
  b.start();
  const p = b.features.find((f) => f.kind === 'cache');
  b.distance = p.at + b.entryZ - 4;
  updateTerrain(b, 1 / 60);
  assert.equal(b.runners.length, 6);
  assert.ok(b.runners.every((e) => e.z < b.entryZ));
  const before = b.gates.length;
  hitMechanism(b, p, { x: p.x, z: p.z, damage: p.hp - 1 });
  assert.equal(b.gates.length, before);
  hitMechanism(b, p, { x: p.x, z: p.z, damage: 1 });
  hitMechanism(b, p, { x: p.x, z: p.z, damage: 100 });
  assert.equal(b.gates.length, before + 1);
  assert.ok(b.gates.at(-1).type === 'engineer' && b.gates.at(-1).z < p.z);
});

test('a finale boss jumps from one visible lip to the other with no slam attack', () => {
  for (const edge of [-39, -48, -55]) {
    const events = [],
      b = new Battle((e) => events.push(e.kind));
    b.reset(2);
    b.start();
    b.entryZ = edge;
    b.features = [];
    Object.assign(b.boss, { active: true, z: edge - 1.5 });
    finaleGap(b);
    const p = b.features[0];
    let takeoff,
      landing,
      peak = 0;
    for (let i = 0; i < 800; i++) {
      b.worldAdvance = 2.3 / 60;
      b.distance += b.worldAdvance;
      updateTerrain(b, 1 / 60);
      b.wall.z += b.worldAdvance;
      b.crossGates();
      const was = b.boss.vault;
      b.advanceBoss(1 / 60);
      if (!was && b.boss.vault) takeoff = [b.boss.z, b.boss.z - p.z];
      if (was && !b.boss.vault) {
        landing = b.boss.z - p.z;
        break;
      }
      peak = Math.max(peak, b.boss.lift);
    }
    assert.ok(takeoff[0] > edge + 4 && takeoff[1] < -p.length / 2);
    assert.ok(landing > p.length / 2 && peak > 2.4);
    assert.equal(events.filter((e) => e === 'vaultLand').length, 1);
    assert.equal(events.includes('slam'), false);
  }
});

test('a real hole removes only overlapping allies and the engineer can rebuild it in advance', () => {
  for (const engineer of [false, true]) {
    const b = new Battle();
    b.reset(2);
    b.start();
    b.x = engineer ? 4.4 : 1.8;
    const p = terrainPiece({ kind: 'gap', lane: 1, at: 10, length: 4 }, 2);
    b.features = [p];
    b.allies = [
      { x: 4.35, z: 0 },
      { x: 1.6, z: 0 },
    ];
    b.planks = engineer ? 1 : 0;
    b.distance = 6;
    updateTerrain(b, 1 / 60);
    b.distance = 10;
    updateTerrain(b, 1 / 60);
    assert.equal(b.allies.length, engineer ? 2 : 1);
    assert.equal(b.planks, 0);
    assert.equal(isOpening(p), !engineer);
    assert.equal(b.armor, 3);
  }
});

test('every boss telegraphs its own locked attack, resolves once per mark, and cancels on death', async () => {
  const { bosses, startSkill, advanceSkill, inStrike } = await import('../src/boss-skills.js');
  for (const kind of Object.keys(bosses)) {
    const events = [],
      b = new Battle((e) => events.push(e.kind));
    b.start();
    b.x = 0;
    b.allies = [];
    Object.assign(b.boss, { active: true, kind, z: -16 });
    let cast = startSkill(b);
    const first = cast.marks[0],
      oldX = first.x;
    // Get out of the marked lane or ring before impact.
    b.x = 5.4;
    for (let i = 0; i < Math.floor((cast.warm - 0.03) * 60); i++) advanceSkill(b, 1 / 60);
    assert.equal(events.includes(kind + 'Strike'), false);
    for (let i = 0; i < 185; i++) advanceSkill(b, 1 / 60);
    assert.equal(first.x, oldX);
    assert.equal(b.armor, 3);
    assert.equal(events.filter((e) => e === kind + 'Strike').length, cast.marks.length);
    b.x = 0;
    cast = startSkill(b);
    b.x = cast.marks[0].x;
    b.captainZ = cast.marks[0].z;
    assert.ok(inStrike(cast, cast.marks[0], b.x, b.captainZ));
    for (let i = 0; i < 217; i++) advanceSkill(b, 1 / 60);
    assert.equal(b.armor, 2, kind);
    if (kind === 'kestrel') assert.ok(b.chill > 0);
    startSkill(b);
    b.damageBoss({ kind: 'rocket' }, 9999);
    assert.equal(b.boss.skill, null);
  }
});

test('lane-wide protected supplies block shots and touch until the obstacle is destroyed', async () => {
  const { cardWidth } = await import('../src/supplies.js');
  const { laneWidth } = await import('../src/campaign.js');
  const { rifleRound } = await import('../src/projectiles.js');
  assert.ok(cardWidth > 0.88 * laneWidth && cardWidth < laneWidth);
  for (const variant of ['glass', 'crates', 'shutter']) {
    const b = new Battle();
    b.reset(4);
    b.start();
    const card = b.gates.find((g) => g.cover?.variant === variant);
    const cover = card.cover;
    const easy = b.gates.find((g) => !g.cover && g.x !== card.x && Math.abs(g.at - card.at) < 2);
    assert.ok(easy);
    b.gates = [card, easy];
    b.features = [cover];
    b.wall.hp = 0;
    b.distance = cover.at - 7;
    updateTerrain(b, 1 / 60);
    b.crossGates();
    const hit = (x, damage) => {
      b.launch(x, 0.58, 0, rifleRound, 1, damage);
      for (let i = 0; i < 46; i++) b.advanceShots(1 / 60);
    };
    const hp = card.hp;
    hit(card.x + 1.35, 4);
    assert.equal(card.hp, hp);
    assert.equal(cover.hp, cover.maxHp - 4);
    b.openCard(card);
    assert.equal(card.active, true);
    b.x = card.x;
    b.captainZ = card.z;
    b.crossGates();
    assert.equal(card.active, true);
    b.captainZ = 0;
    hit(card.x, 4);
    assert.equal(cover.hp, cover.maxHp - 4 - (variant === 'shutter' ? 9 : 4));
    hit(card.x, 500);
    assert.equal(cover.state, 'open');
    assert.ok(card.active && card.hp === hp);
    hit(card.x + cardWidth / 2 - 0.025, 500);
    assert.equal(card.active, false);
    assert.ok(easy.active);
  }
});

test('both range pickups affect new rounds temporarily and expire without cutting an airborne shot', async () => {
  const { rifleRound, shotRange, extendedRange } = await import('../src/projectiles.js');
  for (const type of ['range', 'longshot']) {
    const b = new Battle();
    b.start();
    b.gates = [];
    b.features = [];
    b.wall.hp = 0;
    b.launch(0, 0.58, 0, rifleRound, 1, 3);
    assert.equal(b.shots[0].range, 22);
    b.openCard({ x: 0, z: -2, active: true, type });
    b.updateDeliveries(0.61);
    b.launch(0, 0.58, 0, rifleRound, 1, 3);
    const extended = b.shots.at(-1);
    assert.equal(extended.range, extendedRange);
    assert.equal(extended.pierce, type === 'longshot' ? 1 : 0);
    b.buffs[type] = 0.01;
    b.tick(1 / 60);
    b.launch(0, 0.58, 0, rifleRound, 1, 3);
    assert.equal(b.shots.at(-1).range, shotRange);
    assert.equal(extended.range, extendedRange);
  }
});

test('a close boss pursues both outside lanes, locks its warning and can be dodged', () => {
  for (const side of [-1, 1]) {
    const events = [],
      b = new Battle((e) => events.push(e));
    b.start();
    b.allies = [];
    b.gates = [];
    b.features = [];
    b.wall.hp = 0;
    b.x = 5.1 * side;
    b.targetX = b.x;
    Object.assign(b.boss, { active: true, x: 0, z: -7.3, nextCast: 100 });
    for (let i = 0; i < 270 && !b.boss.attackT; i++) b.advanceBoss(1 / 60);
    assert.ok(b.boss.pursuing && b.boss.x * side > 3.2 && b.boss.attackT > 0);
    assert.equal(b.boss.landX, b.x);
    const locked = b.boss.landX;
    b.x = -side * 5.1;
    for (let i = 0; i < 112; i++) b.advanceBoss(1 / 60);
    assert.equal(b.boss.landX, locked);
    assert.equal(b.armor, 3);
    assert.equal(events.filter((e) => e.kind === 'slam').length, 1);
    for (let i = 0; i < 330 && b.boss.landX === locked; i++) b.advanceBoss(1 / 60);
    assert.ok(b.boss.landX * side < -3.5);
    for (let i = 0; i < 65; i++) b.advanceBoss(1 / 60);
    assert.equal(b.armor, 2);
  }
});

test('a boss changes lanes around an active supply and never plants its feet on the board', () => {
  const b = new Battle();
  b.start();
  b.x = 4.5;
  b.allies = [];
  b.features = [];
  b.wall.hp = 0;
  const g = b.gates[0];
  g.x = 0;
  g.at = 4;
  b.gates = [g];
  Object.assign(b.boss, { x: 0, z: -8.1, active: true, nextCast: 100 });
  for (let i = 0; i < 180; i++) {
    b.worldAdvance = 2.3 / 60;
    b.distance += b.worldAdvance;
    b.crossGates();
    b.advanceBoss(1 / 60);
    if (b.boss.lift < 0.12)
      assert.ok(Math.abs(b.boss.z - g.z) > 0.74 || Math.abs(b.boss.x - g.x) > 2.9);
  }
});

test('the last red straggler actually falls before the captain and every surviving ally run off the top', () => {
  const events = [],
    b = new Battle((e) => events.push(e.kind));
  b.start();
  b.gates = [];
  b.features = [];
  b.wall.hp = 0;
  b.row = b.lastRow;
  for (let i = 0; i < 8; i++) b.recruit(0, true);
  Object.assign(b.boss, { active: true, z: -5 });
  b.damageBoss({ kind: 'rocket' }, 99999);
  const last = b.grunt(4.8, 8.9);
  last.spent = true;
  b.runners = [last];
  const start = b.captainZ;
  for (let i = 0; i < 720 && b.phase === 'clear'; i++) b.tick(1 / 60);
  assert.equal(last.alive, false);
  assert.ok(b.score && b.boss.removed && b.parade && b.phase === 'won');
  assert.ok(!b.resultReady && b.captainZ >= start - 0.01);
  const n = b.allies.length;
  for (let i = 0; i < 85; i++) b.tick(1 / 60, 1, 1);
  assert.ok(b.captainZ < start - 6 && !b.resultReady);
  for (let i = 0; i < 400 && !b.resultReady; i++) b.tick(1 / 60);
  assert.equal(b.allies.length, n);
  assert.ok(b.resultReady && b.allies.every((a) => a.z < b.entryZ) && b.captainZ < b.entryZ);
  assert.equal(events.filter((k) => k === 'rally').length, 1);
  b.reset(2);
  assert.equal(b.parade, null);
});

test('each region spans five sorties and the siege peaks independently of later progression', () => {
  for (let i = 0; i < campaign.length; i++) {
    const route = campaign[i];
    assert.equal(route.chapter.first, 1 + Math.floor(i / 5) * 5);
    assert.equal(route.chapter.last, route.chapter.first + 4);
    assert.equal(route.theme, route.chapter.theme);
    if (i % 5) assert.equal(route.chapter, campaign[i - 1].chapter);
  }
  const [first, second, third] = campaign;
  assert.ok(first.pressure < third.pressure && third.pressure < second.pressure);
  assert.ok(first.bossHP < third.bossHP && third.bossHP < second.bossHP);
  for (const i of [3, 4, 5, 6, 7, 8, 9, ...Array.from({ length: 19 }, (_, n) => 11 + n)]) {
    assert.ok(campaign[i].pressure > campaign[i - 1].pressure);
  }
  assert.ok(campaign[9].bossHP > 2 * Math.max(campaign[8].bossHP, campaign[10].bossHP));
  assert.ok(campaign[10].pressure < campaign[8].pressure);
});

test('cargo telegraphs the physical footprint, hits both teams at touchdown and lands only once', () => {
  const events = [];
  const b = new Battle((e) => events.push(e.kind));
  b.reset(6);
  b.start();
  const cargo = b.features.find((p) => p.kind === 'skyfall');
  b.features = [cargo];
  const advanceTo = (z) => {
    b.distance = cargo.at + z;
    updateTerrain(b, 1 / 60);
  };
  advanceTo(-9);
  assert.equal(cargo.state, 'ready');
  advanceTo(-6.9);
  assert.equal(cargo.state, 'warning');
  assert.ok(cargo.progress < 0.1 && cargo.fallProgress === 0);
  const local = b.grunt(cargo.x, 0.67);
  const safe = b.grunt(cargo.x - 3.2, 0.67);
  b.runners.push(local, safe);
  b.x = cargo.x - 3;
  b.allies = [
    { x: cargo.x, z: 0.5 },
    { x: b.x, z: 0.5 },
  ];
  advanceTo(-0.3);
  assert.ok(cargo.fallProgress > 0 && cargo.fallProgress < 1);
  assert.ok(local.alive && b.allies.length === 2);
  advanceTo(0.68);
  assert.equal(cargo.state, 'landed');
  assert.ok(!local.alive && safe.alive);
  assert.equal(b.allies.length, 1);
  assert.equal(b.allies[0].x, b.x);
  assert.equal(b.armor, 3);
  b.x = cargo.x;
  advanceTo(0.75);
  assert.equal(b.armor, 3);
  assert.equal(events.filter((kind) => kind === 'impact').length, 1);
});

test('a marked captain can retreat out of the cargo circle, block it, or lose one plate', () => {
  for (const move of ['leave', 'shield', 'stay']) {
    const b = new Battle();
    b.reset(6);
    b.start();
    const cargo = b.features.find((p) => p.kind === 'skyfall');
    b.features = [cargo];
    b.x = cargo.x;
    b.distance = cargo.at - 6;
    updateTerrain(b, 1 / 60);
    if (move === 'leave') b.x -= cargo.radius + 0.2;
    if (move === 'shield') b.buffs.shield = 1;
    b.distance = cargo.at + 0.67;
    for (let i = 0; i < 3; i++) updateTerrain(b, 1 / 60);
    assert.equal(b.armor, move === 'stay' ? 2 : 3);
  }
});
