import { isOpening, laneWidth, laneName, overOpening, terrainPiece } from './campaign.js';
import { makeCard } from './supplies.js';
import { escortPassage } from './boss-pursuit.js';

const clamp = (v, low, high) => Math.max(low, Math.min(high, v));
const shootable = new Set(['cache', 'bridge', 'coil', 'cover', 'barrel', 'roller']);

function revealCard(b, p, type) {
  const card = makeCard(p.x, b.distance - p.z + 0.85, type, b.stage);
  card.z = b.distance - card.at;
  b.gates.push(card);
  b.event('supplyBreak', p.x, 0.65, card.z);
}

/** 引爆高爆油桶，并延迟连锁引爆附近其他油桶 */
function detonateBarrel(b, p, shot) {
  p.state = 'exploded';
  p.hp = 0;
  p.age = 0;
  b.event('barrelBlast', p.x, 0.5, p.z, 1.45);
  b.addPopup?.(p.x, 1.35, p.z, '连环爆破!', 'crit');
  const radius = p.radius || 3.85;
  const burn = (e) => {
    if (e.alive && Math.hypot(e.x - p.x, e.z - p.z) < radius) b.kill(e, 1.55, p.x);
  };
  for (const col of b.columns) for (const e of col.units) burn(e);
  for (const e of b.runners) burn(e);
  if (
    b.boss.active &&
    !b.boss.defeated &&
    Math.hypot(b.boss.x - p.x, b.boss.z - p.z) < radius + 1.4
  ) {
    b.damageBoss(shot || { kind: 'rocket' }, 180);
  }
  // 触发附近 5.8 单位内的邻近油桶进入 0.14s 连锁引爆倒计时
  for (const other of b.features) {
    if (
      other !== p &&
      other.kind === 'barrel' &&
      other.state === 'ready' &&
      Math.hypot(other.x - p.x, other.z - p.z) < 5.8
    ) {
      other.chainTimer = 0.14;
    }
  }
}

export function hitMechanism(b, p, shot) {
  if (p.state !== 'ready') return;
  const latch = p.variant === 'shutter' && Math.abs(shot.x - p.x) < 0.51;
  let damage = shot.damage;
  if (latch) damage *= 2.25;
  if ((p.variant === 'crates' || p.kind === 'roller') && shot.kind === 'rocket') damage *= 1.45;
  p.hp = Math.max(0, p.hp - damage);
  p.flash = 1;
  if (p.hp > 0) {
    if (latch && b.addPopup) b.addPopup(shot.x, 1.15, shot.z, '弱点 ×2.2', 'crit');
    b.event(latch ? 'latchHit' : 'wallHit', shot.x, 0.65, shot.z, 0.55);
    return;
  }
  b.addOverdrive?.(8);
  b.addCombo?.(2);
  p.age = 0;

  if (p.kind === 'barrel') {
    detonateBarrel(b, p, shot);
    return;
  }

  if (p.kind === 'roller') {
    p.state = 'broken';
    b.event('crateBreak', p.x, 0.65, p.z, 1.35);
    b.addPopup?.(p.x, 1.35, p.z, '击碎滚木 · 援兵+3!', 'buff');
    for (let i = 0; i < 3; i++) b.recruit(p.x + (i - 1) * 0.4, false, 'rifle');
    return;
  }

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
    b.notice(laneName(p.lane) + '吊桥已断，截断增援');
  } else if (p.kind === 'coil') {
    p.state = 'discharged';
    b.event('discharge', p.x, 0.5, p.z, 1.45);
    b.addPopup?.(p.x, 1.5, p.z, '电磁连锁放电!', 'buff');
    let arcs = 0;
    const zap = (e) => {
      if (e.alive && Math.abs(e.z - p.z) < 7.5 && Math.abs(e.x - p.x) < 5.5) {
        if (arcs < 12) {
          b.addLightning?.(p.x, 1.32, p.z, e.x, 0.55, e.z);
          arcs++;
        }
        b.kill(e, 1.0, p.x);
      }
    };
    for (const c of b.columns) for (const e of c.units) zap(e);
    for (const e of b.runners) zap(e);
    if (
      b.boss.active &&
      !b.boss.defeated &&
      Math.abs(b.boss.z - p.z) < 6.5 &&
      Math.abs(b.boss.x - p.x) < 5.5
    ) {
      b.addLightning?.(p.x, 1.32, p.z, b.boss.x, 1.6, b.boss.z);
      b.damageBoss(shot, 120);
    }
  }
}

export function finaleGap(b) {
  const boss = b.boss,
    relativeSpeed = b.bossEntryStride;
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

/** 第 3 关：高空炙热陨石火雨落点逻辑 */
function advanceSkyfall(b, p) {
  const landingZ = 0.66;
  const warningTravel = 8.4;
  const remaining = landingZ - p.z;
  if (p.state === 'ready' && b.phase !== 'clear' && remaining <= warningTravel) {
    p.state = 'warning';
    p.age = 0;
    b.notice(laneName(p.lane) + '炽热陨石坠落，闪避红圈！');
  }
  if (p.state !== 'warning') return;
  p.progress = clamp(1 - remaining / warningTravel, 0, 1);
  p.fallProgress = clamp(1 - remaining / (0.55 * b.roadSpeed), 0, 1);
  if (remaining > 0) return;
  p.state = 'landed';
  p.age = 0;
  b.event('barrelBlast', p.x, 0.2, p.z, 1.35);
  const inside = (x, z) => Math.hypot(x - p.x, z - p.z) <= p.radius;
  for (const col of b.columns) for (const e of col.units) if (e.alive && inside(e.x, e.z)) b.kill(e, 1.3, p.x);
  for (const e of b.runners) if (e.alive && inside(e.x, e.z)) b.kill(e, 1.3, p.x);
  b.damageSquadArea?.(p.x, p.z, p.radius, 3, 'skyfall');
}

/** 第 3 关：熔岩间歇喷发裂隙 */
function advanceLavaVent(b, p, dt) {
  if (p.z < -28 || p.z > 8) return;
  p.ventClock = (p.ventClock ?? (p.lane + 1) * 0.7) + dt;
  const cycle = p.ventClock % 2.4;
  const prevErupt = p.erupting;
  p.warming = cycle >= 0.75 && cycle < 1.6;
  p.erupting = cycle >= 1.6 && cycle < 2.25;
  p.ventProgress = p.warming ? (cycle - 0.75) / 0.85 : p.erupting ? 1 : 0;
  if (p.erupting && !prevErupt) {
    b.event('lavaBurst', p.x, 0.25, p.z, 1.25);
    // 瞬间灼烧路过红兵
    const r = p.radius || 2.05;
    for (const col of b.columns)
      for (const e of col.units)
        if (e.alive && Math.hypot(e.x - p.x, e.z - p.z) < r) b.kill(e, 1.15, p.x);
    for (const e of b.runners)
      if (e.alive && Math.hypot(e.x - p.x, e.z - p.z) < r) b.kill(e, 1.15, p.x);
    // 若我方在熔岩喷口上则伤及外围小兵
    b.damageSquadArea?.(p.x, p.z, r * 0.92, 2, 'lava');
  }
}

/** 第 2 关：林谷巨型滚木奇袭 */
function advanceRoller(b, p, dt) {
  if (p.state !== 'ready') return;
  if (p.z > -32) {
    p.rollOffset = (p.rollOffset || 0) + (p.speed || 6.2) * dt;
    p.z = b.distance - p.at + p.rollOffset;
    p.rollSpin = (p.rollSpin || 0) + dt * 6.5;
  }
  if (!p.warned && p.z > -26 && p.z < -12) {
    p.warned = true;
    b.notice(laneName(p.lane) + '巨木滚来！闪避或集火轰碎');
  }
  if (p.target) {
    p.target.x = p.x;
    p.target.z = p.z;
  }
  // 滚木也会碾倒同车道红兵
  for (const col of b.columns) {
    for (const e of col.units) {
      if (e.alive && Math.abs(e.x - p.x) < 1.8 && Math.abs(e.z - p.z) < 0.72) b.kill(e, 1.1, p.x);
    }
  }
  // 碾过我方阵列时击飞同车道外围小兵
  if (!p.hitSquad && Math.abs(p.z - b.captainZ) < 1.15) {
    const hits = b.damageSquadArea?.(p.x, p.z, 1.9, 3, 'roller');
    if (hits > 0) p.hitSquad = true;
  }
}

export function updateTerrain(b, dt) {
  b.activeGround.length = 0;
  for (const p of b.features) {
    if (p.kind !== 'roller' || p.state !== 'ready' || p.z <= -32) {
      p.z = b.distance - p.at + (p.rollOffset || 0);
    }
    p.age += dt;
    p.flash = Math.max(0, p.flash - dt * 6);

    // 连锁油桶延迟引爆
    if (p.kind === 'barrel' && p.state === 'ready' && p.chainTimer > 0) {
      p.chainTimer -= dt;
      if (p.chainTimer <= 0) {
        detonateBarrel(b, p, null);
        continue;
      }
    }

    if (p.z < b.entryZ - 12 || p.z > 15) continue;

    if (p.kind === 'skyfall') {
      advanceSkyfall(b, p);
      if (!b.playing) return;
      continue;
    }
    if (p.kind === 'lavaVent') {
      advanceLavaVent(b, p, dt);
      if (!b.playing) return;
      continue;
    }
    if (p.kind === 'roller') {
      if (shootable.has(p.kind)) {
        p.target ??= { mechanism: p };
        p.target.x = p.x;
        p.target.z = p.z;
      }
      advanceRoller(b, p, dt);
      if (!b.playing) return;
      continue;
    }

    if (p.kind === 'bridge' || p.kind === 'gap' || p.kind === 'belt') b.activeGround.push(p);
    if (!p.warned && p.z > -22 && p.z < -13 && p.state === 'ready' && !p.finale) {
      p.warned = true;
      const side = laneName(p.lane);
      const prompts = {
        gap: side + '断桥，提前换道',
        bridge: '打断' + side + '吊索，截断增援',
        cache: '打碎' + side + '砖墙，获取合成补给',
        barrel: '引爆' + side + '汽油桶，连锁清屏！',
        cover:
          p.variant === 'glass'
            ? side + '玻璃瓶，击碎震倒红兵'
            : p.variant === 'crates'
              ? side + '木箱，重炮拆得快'
              : side + '钢闸，瞄准橙色锁扣',
        coil: '击中' + side + '电磁塔，触发闪电链！',
        belt: side + '传送带向' + (p.direction > 0 ? '右' : '左'),
      };
      if (prompts[p.kind]) b.notice(prompts[p.kind]);
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
        remaining: 16,
        next: 0,
      });
      b.notice(laneName(p.lane) + '吊桥接通，敌军增援来袭');
    }
    if (
      p.kind === 'belt' &&
      Math.abs(p.z - b.captainZ) < p.length / 2 &&
      Math.abs(b.x - p.x) < laneWidth / 2 - 0.1 &&
      !b.rope
    )
      b.aim(b.targetX + p.direction * dt * 1.45);
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
      for (let i = b.squad.length - 1; i >= 0; i--) {
        const a = b.squad[i];
        if (!overOpening(p, a.x, a.z, 0.16)) continue;
        // 断桥仅跌落踏空的外围小兵；若是高阶大兵则安全绳拉回保护
        if (b.squad.length > 1) {
          b.squad.splice(i, 1);
          const body = b.fall(a, 'blue', 0);
          body.intoGap = true;
          body.vy = -0.6;
        }
      }
      if (!b.rope && overOpening(p, b.x, b.captainZ, 0.25)) {
        const side = p.lane === -1 ? 1 : p.lane === 1 ? -1 : b.x >= p.x ? 1 : -1;
        b.rope = { age: 0, from: b.x, to: p.x + side * (laneWidth / 2 + 0.75) };
        b.aim(b.rope.to);
        b.damageSquadArea?.(p.x, p.z, 2.2, 2, 'gap');
        b.notice('触发安全绳拉回，小心断桥！');
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
      b.runners.push(e);
    }
  }
  b.flanks = b.flanks.filter((f) => f.remaining > 0);
}

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
  boss.slamChain = 0;
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
