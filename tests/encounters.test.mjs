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
