import { cardWidth } from './supplies.js';
import { laneCenter } from './campaign.js';

const limit = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const rail = 5.32;
const bodyHalf = 0.94;

export function closestSquadMember(battle) {
  const boss = battle.boss;
  let x = battle.x,
    z = battle.captainZ;
  let distance = Math.hypot(x - boss.x, z - boss.z);
  for (const ally of battle.allies) {
    const d = Math.hypot(ally.x - boss.x, ally.z - boss.z);
    if (d < distance) {
      distance = d;
      x = ally.x;
      z = ally.z;
    }
  }
  return { x, z, distance };
}

function obstacles(battle, low, high) {
  const blocks = [];
  function add(item, half, depth) {
    if (item.z + depth + 0.65 < low || item.z - depth - 0.65 > high) return;
    blocks.push({ x: item.x, z: item.z, half: half + bodyHalf, depth: depth + 0.65 });
  }
  for (const card of battle.gates) if (card.active) add(card, cardWidth / 2, 0.16);
  if (battle.wall.hp > 0) add(battle.wall, 2.14, 0.32);
  for (const p of battle.features) {
    if ((p.kind === 'cover' || p.kind === 'cache') && p.hp > 0 && p.state === 'ready')
      add(p, p.half, p.depth);
  }
  return blocks;
}

export function escortPassage(battle, fromZ, toZ) {
  const busy = obstacles(battle, fromZ, toZ);
  const lanes = [...new Set([...(battle.wave || [0]), 0, -1, 1])];
  let best,
    fewest = Infinity;
  for (const lane of lanes) {
    const x = lane === 0 ? -0.42 : laneCenter(lane);
    const conflicts = busy.filter((o) => Math.abs(x - o.x) < o.half + 0.12).length;
    if (conflicts < fewest) {
      best = { lane, x, conflicts };
      fewest = conflicts;
    }
    if (!conflicts) break;
  }
  return best;
}

// Move relative to the scrolling deck, leaving a whole boss footprint around
// a supply. If a row has two prizes, the remaining lane is the passage.
export function bossStep(battle, dt, target, stride) {
  const boss = battle.boss;
  const startZ = boss.z + battle.worldAdvance;
  const preferred = limit(boss.pursuing ? target.x : (boss.escortX ?? -0.42), -rail, rail);
  const forward = boss.pursuing
    ? Math.min(startZ + stride, Math.max(boss.z - dt * 3.9, target.z - 1.35))
    : startZ + stride;
  const blocks = obstacles(
    battle,
    Math.min(startZ, forward) - 0.2,
    Math.max(startZ, forward) + 3.0,
  );
  let steer = preferred;
  const clearX = (x) => blocks.every((o) => Math.abs(x - o.x) >= o.half + 0.025);
  if (!clearX(preferred) || !clearX(boss.x)) {
    const choices = [preferred, boss.x, laneCenter(-1), 0, laneCenter(1)];
    for (const o of blocks) choices.push(o.x - o.half - 0.07, o.x + o.half + 0.07);
    let best = Infinity;
    for (const x of choices) {
      if (Math.abs(x) > rail || !clearX(x)) continue;
      const cost = Math.abs(x - boss.x) + 0.48 * Math.abs(x - preferred);
      if (cost < best) {
        best = cost;
        steer = x;
      }
    }
  }
  const stepX = (boss.pursuing ? 5.1 : blocks.length ? 3.5 : 1.2) * dt;
  let x = boss.x + limit(steer - boss.x, -stepX, stepX);
  let z = forward;
  for (const o of blocks) {
    if (Math.abs(x - o.x) >= o.half || Math.abs(z - o.z) >= o.depth) continue;
    if (Math.abs(boss.x - o.x) >= o.half) x = o.x + Math.sign(boss.x - o.x) * (o.half + 0.002);
    else if (startZ <= o.z) z = Math.min(z, o.z - o.depth - 0.002);
    else z = Math.max(z, o.z + o.depth + 0.002);
  }
  const dx = x - boss.x;
  boss.marched += Math.hypot(dx, z - startZ);
  boss.yaw +=
    (limit(Math.atan2(dx, Math.max(dt * 2, z - startZ)), -0.6, 0.6) - boss.yaw) *
    (1 - Math.exp(-8 * dt));
  boss.x = x;
  boss.z = z;
}

// A warning stays where it was drawn. Reserve the feet's landing position
// through touchdown and recovery as the surrounding supplies scroll downhill.
export function clearLanding(battle, x, z) {
  const scroll = battle.worldAdvance > 0 ? battle.roadSpeed : 0;
  return !obstacles(battle, z - scroll * 1.55, z + 0.25).some(
    (o) => Math.abs(x - o.x) < o.half && o.z - o.depth <= z && o.z + scroll * 1.55 + o.depth >= z,
  );
}
