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
