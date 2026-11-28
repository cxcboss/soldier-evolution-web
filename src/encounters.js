import { isOpening, laneWidth, laneName, overOpening, terrainPiece } from './campaign.js';
import { makeCard } from './supplies.js';
import { escortPassage } from './boss-pursuit.js';

const clamp = (v, low, high) => Math.max(low, Math.min(high, v));
const shootable = new Set(['cache', 'bridge', 'coil', 'cover']);

function revealCard(b, p, type) {
  const card = makeCard(p.x, b.distance - p.z + 0.85, type, b.stage);
  card.z = b.distance - card.at;
  b.gates.push(card);
  b.event('supplyBreak', p.x, 0.65, card.z);
}

export function hitMechanism(b, p, shot) {
  if (p.state !== 'ready') return;
  const latch = p.variant === 'shutter' && Math.abs(shot.x - p.x) < 0.51;
  let damage = shot.damage;
  if (latch) damage *= 2.25;
  if (p.variant === 'crates' && shot.kind === 'rocket') damage *= 1.4;
  p.hp = Math.max(0, p.hp - damage);
  p.flash = 1;
  if (p.hp > 0) {
    if (latch && b.addPopup) b.addPopup(shot.x, 1.15, shot.z, '弱点 ×2.2', 'crit');
    b.event(latch ? 'latchHit' : 'wallHit', shot.x, 0.65, shot.z, 0.55);
    return;
  }
  if (b.addOverdrive) b.addOverdrive(8);
  if (b.addCombo) b.addCombo(2);
  p.age = 0;
  if (p.kind === 'cover') {
    p.state = 'open';
    if (p.variant === 'glass') {
      b.event('glassBreak', p.x, 0.48, p.z);
      const shatter = (e) => {
        if (e.alive && Math.hypot(e.x - p.x, e.z - p.z) < 2.45) b.kill(e, 0.82, p.x);
      };
      for (const col of b.columns) for (const e of col.units) shatter(e);
      for (const e of b.runners) shatter(e);
    } else b.event(p.variant === 'crates' ? 'crateBreak' : 'wallBreak', p.x, 0.48, p.z);
  } else if (p.kind === 'cache') {
    p.state = 'open';
    b.event('wallBreak', p.x, 0.57, p.z);
    revealCard(b, p, p.reward);
  } else if (p.kind === 'bridge') {
    p.state = 'cut';
    b.event('chainSnap', p.x, 0.85, p.z);
    b.notice(laneName(p.lane) + '吊桥已落，增援被截断');
  } else if (p.kind === 'coil') {
    p.state = 'discharged';
    b.event('discharge', p.x, 0.5, p.z, 1.35);
    const zap = (e) => {
      if (e.alive && Math.abs(e.z - p.z) < 7 && Math.abs(e.x - p.x) < 5.1) b.kill(e, 0.9, p.x);
    };
    for (const c of b.columns) for (const e of c.units) zap(e);
    for (const e of b.runners) zap(e);
    if (
      b.boss.active &&
      !b.boss.defeated &&
      Math.abs(b.boss.z - p.z) < 6 &&
      Math.abs(b.boss.x - p.x) < 5
    )
      b.damageBoss(shot, 24);
  }
}

export function finaleGap(b) {
  const boss = b.boss,
    relativeSpeed = b.bossEntryStride;
  // Place the far lip from the real camera entry, so the take-off is visible on every aspect ratio.
  const lead = Math.max(4, ((-23 - boss.z) * relativeSpeed) / (2.3 + relativeSpeed));
  let middle = boss.z + lead + 3;
  let passage = escortPassage(b, boss.z - 1.1, middle + 3.8);
  for (const offset of [-2, -4, -6]) {
    if (!passage.conflicts) break;
    const candidate = Math.max(boss.z + 5, boss.z + lead + 3 + offset);
    const lane = escortPassage(b, boss.z - 1.1, candidate + 3.8);
    if (lane.conflicts < passage.conflicts) {
      passage = lane;
      middle = candidate;
    }
  }
  boss.x = boss.escortX = passage.x;
  const p = terrainPiece(
    { kind: 'gap', lane: passage.lane, length: 4.0, at: b.distance - middle },
    b.stage,
  );
  p.z = b.distance - p.at;
  p.finale = true;
  b.features.push(p);
}

// The warning follows one marked spot on the deck. Its radius is the exact hit area.
function advanceSkyfall(b, p) {
  const landingZ = 0.66;
  const warningTravel = 7.8;
  const remaining = landingZ - p.z;
  if (p.state === 'ready' && b.phase !== 'clear' && remaining <= warningTravel) {
    p.state = 'warning';
    p.age = 0;
    b.notice(laneName(p.lane) + '吊货坠落，避开地标');
  }
  if (p.state !== 'warning') return;
  p.progress = clamp(1 - remaining / warningTravel, 0, 1);
  p.fallProgress = clamp(1 - remaining / (0.55 * b.roadSpeed), 0, 1);
  if (remaining > 0) return;
  p.state = 'landed';
  p.age = 0;
  b.event('impact', p.x, 0.18, p.z, 1.35);
  const inside = (x, z) => Math.hypot(x - p.x, z - p.z) <= p.radius;
  function hitRed(e) {
    if (e.alive && inside(e.x, e.z)) b.kill(e, 1.08, p.x);
  }
  for (const col of b.columns) for (const e of col.units) hitRed(e);
  for (const e of b.runners) hitRed(e);
  b.allies = b.allies.filter((a) => {
    if (!inside(a.x, a.z)) return true;
    b.fall(a, 'blue', 1.15, p.x);
    return false;
  });
  if (!inside(b.x, b.captainZ)) return;
  if (b.buffs.shield > 0) {
    b.event('shieldHit', b.x, 0.55, b.captainZ);
    return;
  }
  if (b.hitGuard > 0) return;
  b.hurt = 1;
  b.hitGuard = 1.2;
  if (--b.armor <= 0) {
    b.lossReason = 'skyfall';
    b.finish(false);
  }
}

export function updateTerrain(b, dt) {
  b.activeGround.length = 0;
  for (const p of b.features) {
    p.z = b.distance - p.at;
    p.age += dt;
    p.flash = Math.max(0, p.flash - dt * 6);
    if (p.z < b.entryZ - 12 || p.z > 15) continue;
    if (p.kind === 'skyfall') {
      advanceSkyfall(b, p);
      if (!b.playing) return;
      continue;
    }
    if (p.kind === 'bridge' || p.kind === 'gap' || p.kind === 'belt') b.activeGround.push(p);
    if (!p.warned && p.z > -22 && p.z < -14 && p.state === 'ready' && !p.finale) {
      p.warned = true;
      const side = laneName(p.lane);
      const prompts = {
        gap: side + '断桥，提前换道',
        bridge: '打断' + side + '吊索，截住增援',
        cache: '打碎' + side + '砖墙，取出补给',
        cover:
          p.variant === 'glass'
            ? side + '玻璃瓶，击碎可震倒近兵'
            : p.variant === 'crates'
              ? side + '木箱，重炮拆得快'
              : side + '钢闸，瞄准橙色锁扣',
        coil: '击中' + side + '线圈，放电清兵',
        belt: side + '传送带向' + (p.direction > 0 ? '右' : '左'),
      };
      b.notice(prompts[p.kind]);
    }
    if (shootable.has(p.kind)) {
      p.target ??= { mechanism: p };
      p.target.x = p.x;
      p.target.z = p.z + (p.kind === 'bridge' ? p.length / 2 + 0.24 : 0);
    }
    if (
      b.phase !== 'clear' &&
      !p.escorted &&
      p.kind === 'cache' &&
      p.z >= b.entryZ - 5 &&
      p.z < -8
    ) {
      p.escorted = true;
      for (let row = 0; row < 2; row++)
        for (let col = -1; col <= 1; col++) {
          const e = b.grunt(p.x + col * 0.48, b.entryZ - 0.95 - row * 0.59);
          e.speed = 2.62;
          b.runners.push(e);
        }
    }
    if (b.phase !== 'clear' && p.kind === 'bridge' && p.state === 'ready' && p.z >= -7.1) {
      p.state = 'linked';
      p.age = 0;
      b.flanks.push({
        x: p.lane === 0 ? 4.44 : p.x,
        remaining: b.route.siege ? 27 : 16 + Math.floor(b.stage / 3),
        next: 0,
      });
      b.notice(laneName(p.lane) + '吊桥接通，增援来了');
    }
    if (
      p.kind === 'belt' &&
      Math.abs(p.z - b.captainZ) < p.length / 2 &&
      Math.abs(b.x - p.x) < laneWidth / 2 - 0.1 &&
      !b.rope
    )
      b.aim(b.targetX + p.direction * dt * 1.32);
    if (
      isOpening(p) &&
      b.planks &&
      p.z > -5.2 &&
      p.z < 1 &&
      Math.abs(b.x - p.x) < laneWidth / 2 + 0.2 &&
      !b.rope
    ) {
      b.planks--;
      p.state = 'repaired';
      p.age = 0;
      b.event('plus', p.x, 0.24, p.z);
      b.notice(laneName(p.lane) + '已搭好便桥');
    }
    if (isOpening(p) && Math.abs(p.z) < p.length / 2 + 2.8) {
      b.allies = b.allies.filter((a) => {
        if (!overOpening(p, a.x, a.z, 0.14)) return true;
        const body = b.fall(a, 'blue', 0);
        body.intoGap = true;
        body.vy = -0.5;
        return false;
      });
      if (!b.rope && overOpening(p, b.x, b.captainZ, 0.22)) {
        b.armor--;
        b.hurt = 1;
        if (b.armor <= 0) {
          b.lossReason = 'gap';
          b.finish(false);
          return;
        }
        const side = p.lane === -1 ? 1 : p.lane === 1 ? -1 : b.x >= p.x ? 1 : -1;
        b.rope = { age: 0, from: b.x, to: p.x + side * (laneWidth / 2 + 0.75) };
        b.aim(b.rope.to);
        b.hitGuard = 1.05;
        b.notice('安全绳拉回队长，护甲 −1');
      }
    }
  }
  for (const flank of b.flanks) {
    flank.next -= dt;
    if (flank.remaining > 0 && flank.next <= 0) {
      flank.next += 0.16;
      flank.remaining--;
      const e = b.grunt(flank.x + ((flank.remaining % 3) - 1) * 0.12, b.entryZ - 0.92);
      e.speed = 3.18;
      e.flank = true;
      if (b.route.siege && flank.remaining % 5 === 0) {
        e.role = 'guard';
        e.size *= 1.32;
        e.hp = 9;
      }
      b.runners.push(e);
    }
  }
  b.flanks = b.flanks.filter((f) => f.remaining > 0);
}

// Ordinary ranks follow the edge of a missing span. Pole troops plant their pole and vault.
export function steerTerrain(b, e, dt) {
  e.lift = 0;
  for (const p of b.activeGround) {
    const dz = e.z - p.z;
    if (p.kind === 'belt' && Math.abs(dz) < p.length / 2 && Math.abs(e.x - p.x) < laneWidth / 2) {
      e.x = clamp(e.x + p.direction * dt * 0.65, -6, 6);
      continue;
    }
    if (
      !isOpening(p) ||
      dz < -p.length / 2 - 4.3 ||
      dz > p.length / 2 + 0.45 ||
      Math.abs(e.x - p.x) > laneWidth / 2 + 0.16
    )
      continue;
    if (e.role === 'vault') {
      const progress = clamp((dz + p.length / 2 + 0.55) / (p.length + 1.1), 0, 1);
      e.lift = 1.08 * Math.sin(Math.PI * progress);
      return;
    }
    const side = p.lane === -1 ? 1 : p.lane === 1 ? -1 : e.laneX < p.x ? -1 : 1;
    const target = p.x + side * (laneWidth / 2 + 0.24);
    e.x += clamp(target - e.x, -3.8 * dt, 3.8 * dt);
    if (overOpening(p, e.x, e.z, 0.22)) {
      e.alive = false;
      const body = b.fall(e, 'red', 0);
      body.intoGap = true;
      body.vy = -0.7;
    }
    return;
  }
}

export function startVault(b, p) {
  const boss = b.boss;
  boss.vault = { piece: p, t: 0, from: boss.z - p.z, to: p.length / 2 + 1.08 };
  boss.attackT = 0;
  boss.recovery = 0.15;
  p.crossed = true;
}
export function vaultPose(b, dt) {
  const boss = b.boss,
    v = boss.vault;
  if (v.airDash) v.piece.z += b.worldAdvance;
  v.t += dt;
  const u = clamp((v.t - 0.21) / 0.89, 0, 1);
  const travel = u * u * (3 - 2 * u);
  boss.z = v.piece.z + v.from + (v.to - v.from) * travel;
  boss.lift = 2.5 * 4 * u * (1 - u);
  if (v.t >= 1.1 && !v.landed) {
    v.landed = true;
    b.event('vaultLand', boss.x, 0.06, boss.z, 0.9);
  }
  if (v.t >= 1.35) {
    boss.vault = null;
    boss.lift = 0;
    boss.recovery = 0.34;
  }
}
