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
import { touchdown } from '../src/brawler-motion.js';

function field(emit) {
  const battle = new Battle(emit);
  battle.start();
  battle.columns = [];
  battle.gates = [];
  battle.allies = [];
  battle.wall.hp = 0;
  return battle;
}

function placeRunner(battle, x, z) {
  const enemy = { ...battle.grunt(x, z), x, z, speed: 2 };
  battle.runners.push(enemy);
  return enemy;
}

test('every weapon normally fires straight, including from either side lane, and expires at range', () => {
  for (const profile of [rifleRound, pulseRound, cannonRound]) {
    for (const x of [-4.4, 0, 4.15]) {
      const battle = field();
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

test('a close enemy can change the launch angle; losing that enemy never bends an airborne round', () => {
  const battle = field();
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

test('a forward round hits the first soldier or wall it physically crosses', () => {
  const battle = field();
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
});

test('the three flight profiles share a forward line and have distinct heights', () => {
  const battle = field();
  const midpoints = [rifleRound, pulseRound, cannonRound].map((profile) => {
    battle.launch(1, 0.58, 0, profile, 1, 26);
    return sampleFlight(battle.shots.at(-1), shotRange / 2, {});
  });
  assert.deepEqual(
    midpoints.map((p) => [p.x, p.z]),
    Array(3).fill([1, -shotRange / 2]),
  );
  assert.ok(midpoints[0].y < midpoints[1].y && midpoints[1].y < midpoints[2].y);
});

test('jump locks its landing point, then hits only soldiers still in the circle, once at touchdown', () => {
  const events = [];
  const battle = field((e) => events.push(e.kind));
  const boss = battle.boss;
  Object.assign(boss, { x: -0.5, z: -3.1, active: true });
  battle.x = -5;
  battle.allies = [
    { x: -0.5, z: 0, slot: 0, phase: 0 },
    { x: 3, z: 0, slot: 1, phase: 1 },
  ];
  battle.advanceBoss(1 / 60);
  assert.ok(boss.attackT > 0);
  const { landX, landZ } = boss;
  battle.allies[1].x = 4;
  while (boss.attackT < 0.6) battle.advanceBoss(1 / 60);
  assert.ok(boss.lift > 2);
  assert.equal(events.includes('slam'), false);
  while (boss.attackT < touchdown + 0.2) battle.advanceBoss(1 / 60);
  assert.deepEqual([boss.landX, boss.landZ], [landX, landZ]);
  assert.equal(events.filter((e) => e === 'slam').length, 1);
  assert.equal(boss.lift, 0);
  assert.equal(battle.allies.length, 1);
  assert.equal(battle.allies[0].slot, 1);
  assert.equal(battle.armor, 3);
  assert.ok(battle.falling[0].vy > 4 && Math.hypot(battle.falling[0].vx, battle.falling[0].vz) > 2);
});

test('moving after the windup lets the captain dodge the locked impact', () => {
  for (const dodge of [false, true]) {
    const battle = field();
    Object.assign(battle.boss, { active: true, x: -0.6, z: -3.1 });
    battle.x = -0.6;
    battle.advanceBoss(1 / 60);
    if (dodge) battle.x = 4;
    for (let i = 0; i < 65; i++) battle.advanceBoss(1 / 60);
    assert.equal(battle.armor, dodge ? 3 : 2);
  }
});

test('red ranks enter from above the current viewport and march past the moving bridge', () => {
  for (const entry of [-34.8, -46.2, -56]) {
    const b = new Battle();
    b.entryZ = entry;
    const units = () => [...b.columns.flatMap((col) => col.units), ...b.runners];
    assert.equal(units().length, 0);
    assert.equal(b.boss.active, false);
    b.start();
    b.x = -5;
    const seen = new Map();
    for (let frame = 0; frame < 420; frame++) {
      b.worldAdvance = 3.65 / 60;
      b.advanceCrowd(1 / 60);
      for (const e of units()) {
        if (!seen.has(e.id)) assert.ok(e.z < entry - 0.65, 'born above the top edge');
        else assert.ok(e.z - seen.get(e.id) > b.worldAdvance, 'advances even relative to the deck');
        seen.set(e.id, e.z);
      }
      if (frame === 59) {
        const lead = Math.max(...units().map((e) => e.z)) - entry;
        assert.ok(lead > 5 && lead < 6.7, 'faster approach with a visible entry');
      }
    }
    const band = units().filter((e) => e.z >= entry + 4 && e.z < entry + 25).length;
    assert.ok(band > 120 && band < 185, 'training packs leave a visible interval to change lanes');
    assert.ok(units().some((e) => e.laneX < -3) && units().some((e) => e.laneX > 3));
  }
});

test('the planted boot follows the bridge, the other swings forward while lifted', async () => {
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

test('the opening rescue breaks in the firing lane and three individual soldiers arrive once', () => {
  const b = new Battle();
  const rescue = b.gates[0];
  b.start();
  for (let i = 0; i < 140; i++) b.tick(1 / 60);
  assert.equal(rescue.active, false);
  assert.equal(b.recruits, 3);
  assert.equal(b.allies.length, 4);
  b.openCard(rescue);
  assert.equal(b.deliveries.length, 0);
  const weapon = b.gates.find((g) => g.type === 'merge');
  b.openCard(weapon);
  b.aim(-4.2);
  for (let i = 0; i < 40; i++) b.tick(1 / 60);
  assert.equal(b.cannonDamage, 31);
  assert.equal(b.allies.length, 4);
});

test('the finale enters offscreen alongside the last wave, and each level starts with an empty road', () => {
  const b = new Battle();
  for (const stage of [1, 5, 10]) {
    b.reset(stage);
    b.entryZ = -48;
    b.start();
    b.row = b.finaleRow - 1;
    b.worldAdvance = 2.3 / 60;
    b.advanceBoss(1 / 60);
    assert.equal(b.boss.active, false);
    b.advanceCrowd(1 / 60);
    b.advanceBoss(1 / 60);
    assert.ok(b.boss.active && b.boss.z < b.entryZ - 1);
    const before = b.row,
      start = b.boss.z;
    for (let i = 0; i < 60; i++) {
      b.advanceCrowd(1 / 60);
      b.advanceBoss(1 / 60);
    }
    assert.ok(b.row > before && b.boss.z > start + 2.3);
    assert.ok(Math.abs(b.boss.x) < 5.4);
    assert.ok(
      b.gates.every(
        (g) => !g.active || Math.abs(g.z - b.boss.z) > 0.8 || Math.abs(g.x - b.boss.x) >= 2.9,
      ),
    );
  }
});

test('the moving wall sweeps only the soldiers it overlaps and keeps travelling', () => {
  const b = field();
  b.wall.hp = 72;
  b.wall.z = -0.25;
  b.x = -2;
  b.allies = [
    { slot: 0, x: 1.25, z: 0, phase: 0 },
    { slot: 1, x: 4.1, z: 0, phase: 0 },
  ];
  b.pushWall(1 / 60);
  assert.deepEqual(
    b.allies.map((a) => a.slot),
    [0],
  );
  const body = b.falling[0];
  assert.ok(body.pushed);
  const start = body.z;
  b.worldAdvance = 0.4;
  b.updateFalling(1 / 60);
  assert.ok(body.z > start && !b.caught);
});

test('the boss hits the road, stays down, then bursts exactly once without touching adjacent soldiers', () => {
  const events = [];
  const b = field((e) => events.push(e.kind));
  Object.assign(b.boss, { active: true, z: -12, hp: 12 });
  b.row = b.lastRow;
  const red = placeRunner(b, b.boss.x + 0.25, b.boss.z - 1.1);
  const before = { ...red };
  b.damageBoss({ kind: 'rocket' }, 26);
  const advance = (n) => {
    for (let i = 0; i < n; i++) b.advanceBoss(1 / 60);
  };
  advance(56);
  assert.equal(b.boss.removed, false);
  assert.deepEqual(events, ['finisher', 'victory']);
  advance(38);
  assert.equal(b.boss.removed, false);
  advance(4);
  assert.equal(b.boss.removed, true);
  assert.deepEqual(events, ['finisher', 'victory', 'bossBurst']);
  assert.deepEqual(red, before);
  assert.equal(b.score, 0);
  b.damageBoss({ kind: 'shot' }, 6);
  advance(35);
  assert.equal(b.phase, 'clear');
  assert.equal(events.filter((e) => e === 'bossBurst').length, 1);
  b.runners.length = 0;
  advance(1);
  assert.equal(b.phase, 'won');
});

test('a red attacker survives contact and marches across the fallen soldier and captain', () => {
  const b = field(),
    attacker = placeRunner(b, 0, -0.2);
  b.allies = [{ x: 0, z: 0, slot: 0, phase: 0 }];
  b.contact(attacker);
  const body = b.falling[0];
  assert.ok(body.prone && attacker.alive && attacker.spent);
  for (let i = 0; i < 60; i++) {
    b.worldAdvance = 3.65 / 60;
    b.moveGrunt(attacker, 1 / 60, []);
    b.updateFalling(1 / 60);
  }
  assert.ok(attacker.z > body.z + 1.1 && b.falling.includes(body));
  const final = field(),
    last = placeRunner(final, 0, -0.25);
  final.armor = 1;
  final.contact(last);
  assert.equal(final.lossReason, 'infantry');
  for (let i = 0; i < 70; i++) final.tick(1 / 60);
  assert.ok(last.alive && last.z > final.captainZ + 1.05 && last.marched > 1);
  assert.equal(final.resultReady, false);
  for (let i = 0; i < 90; i++) final.tick(1 / 60);
  assert.ok(final.overrun.crossed && final.resultReady);
});

test('both outer lanes keep marching straight at range and converge when the squad is near', () => {
  for (const side of [-1, 1]) {
    const b = field();
    b.x = 4.45 * side;
    b.worldAdvance = 3.65 / 60;
    const enemy = placeRunner(b, -4.45 * side, -14),
      start = enemy.x;
    b.moveGrunt(enemy, 1 / 60, []);
    assert.equal(enemy.x, start);
    enemy.z = -6.6;
    for (let i = 0; i < 93; i++) b.moveGrunt(enemy, 1 / 60, []);
    assert.ok(enemy.marched > 6 && Math.abs(enemy.x - b.x) < 0.55);
    assert.ok(enemy.spent && b.armor < 3);
  }
});

test('retreat moves the formation and every muzzle together, clamps to a short strip and releases forward', () => {
  const b = field();
  b.recruit(0, true);
  const start = b.allies[0].z;
  for (let i = 0; i < 105; i++) b.tick(1 / 60, 0, 1);
  assert.ok(b.captainZ > 1.35 && b.captainZ <= 1.38);
  assert.ok(Math.abs(b.allies[0].z - start - b.captainZ) < 0.011);
  b.shots = [];
  b.rocketTimer = 0;
  b.volleyTimer = 0;
  b.buffs.drone = 1;
  b.supportTimer = 0;
  b.shoot(1 / 60);
  assert.ok(
    b.shots.some(
      (p) => p.kind === 'rocket' && Math.abs(p.startZ - (b.captainZ - 0.6 * b.visualScale)) < 0.001,
    ),
  );
  assert.ok(b.shots.filter((p) => p.kind !== 'rocket').every((p) => p.startZ > 0.7));
  b.aim(2, 99);
  assert.equal(b.targetZ, 1.38);
  b.aim(-3);
  assert.equal(b.targetZ, 1.38);
  for (let i = 0; i < 110; i++) b.tick(1 / 60, 0, -1);
  assert.ok(b.captainZ < 0.005 && Math.abs(b.allies[0].z - start) < 0.01);
});
