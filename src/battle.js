import {
  rifleRound,
  pulseRound,
  cannonRound,
  plasmaRound,
  shotRange,
  flightHeight,
  sampleFlight,
} from './projectiles.js';
import {
  attackDuration,
  jumpProgress,
  slamRadius,
  smoothRange,
  touchdown,
} from './brawler-motion.js';
import { courseCards, lastStage, supplies } from './supplies.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const TAU = Math.PI * 2;
const WALL_AT = 21;
const HALF_ROAD = 5.45;
const COLUMNS = 11;
const COLUMN_SPACING = 0.435;
const FIRST_COLUMN = -2.65;
const ROW_SPACING = 0.515;
const MARCH_SPEED = 1.22;
const PACK_ROWS = 11;

function formation(slot, scale) {
  let ring = 0,
    offset = slot,
    count = 8;
  while (offset >= count) {
    offset -= count;
    ring++;
    count = 8 + 6 * ring;
  }
  const angle = (TAU * offset) / count + 0.21 + ring * 0.18;
  const radius = 0.93 + (scale - 1) * 0.46 + ring * 0.51;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.92];
}

export class Battle {
  constructor(emit = () => {}) {
    this.emit = emit;
    this.reset();
  }
  reset(stage = 1) {
    this.stage = clamp(stage, 1, lastStage);
    this.seed = 129920 + (this.stage - 1) * 1141;
    this.sequence = 0;
    this.phase = 'ready';
    this.elapsed = 0;
    this.distance = 0;
    this.captainZ = 0;
    this.caught = false;
    this.lossReason = null;
    this.worldAdvance = 0;
    this.x = 0;
    this.targetX = this.x;
    this.velocity = 0;
    this.upgrades = 0;
    this.scale = 1;
    this.visualScale = 1;
    this.recoil = 0;
    this.mergeGlow = 0;
    this.hurt = 0;
    this.armor = 3;
    this.shots = [];
    this.incoming = [];
    this.enemyFireTimer = 0;
    this.allies = [];
    this.falling = [];
    this.deliveries = [];
    this.runners = [];
    this.rocketTimer = 0.18;
    this.volleyTimer = 0.06;
    this.volley = 0;
    this.buffs = { rapid: 0, shield: 0, plasma: 0, spread: 0, drone: 0, fever: 0 };
    this.supportTimer = 0;
    this.feverMeter = 0;
    this.row = 0;
    this.toNextRow = 0;
    this.entryZ ??= -46;
    this.finaleRow = 164 + (this.stage - 1) * 7;
    this.lastRow = this.finaleRow + 48;
    this.hitGuard = 0;
    this.score = 0;
    this.recruits = 0;
    this.endTime = 0;
    const wallHP = 72 + (this.stage - 1) * 8;
    this.wall = { x: 4.13, z: -WALL_AT, hp: wallHP, maxHp: wallHP, flash: 0 };
    const bossHP = 360 + (this.stage - 1) * 64;
    this.boss = {
      x: -0.42,
      z: this.entryZ - 1.4,
      hp: bossHP,
      maxHp: bossHP,
      marched: 0,
      hit: 0,
      lift: 0,
      active: false,
      defeated: false,
      defeatAge: 0,
      attackT: 0,
      impactDone: false,
      recovery: 0,
      leapFromX: 0,
      leapFromZ: 0,
      landX: 0,
      landZ: 0,
    };
    this.gates = courseCards(this.stage);
    this.columns = Array.from({ length: COLUMNS }, (_, col) => {
      const x = FIRST_COLUMN + col * COLUMN_SPACING;
      return { x, minX: x - 0.18, maxX: x + 0.18, index: col, units: [] };
    });
    this.recruit(this.x, true);
  }
  rand() {
    this.seed = (Math.imul(this.seed, 1664525) + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }
  grunt(x, z) {
    const laneX = x + (this.rand() - 0.5) * 0.16;
    return {
      x: laneX,
      laneX,
      z: z + (this.rand() - 0.5) * 0.08,
      id: ++this.sequence,
      phase: this.rand() * TAU,
      marched: 0,
      yaw: 0,
      size: 0.92 + this.rand() * 0.13,
      alive: true,
    };
  }
  event(kind, x, y, z, strength = 1) {
    this.emit({ kind, x, y, z, strength });
  }
  start() {
    if (this.phase === 'ready') this.phase = 'run';
  }
  aim(x) {
    this.targetX = clamp(x, -HALF_ROAD, HALF_ROAD);
  }
  get playing() {
    return this.phase === 'run' || this.phase === 'boss' || this.phase === 'clear';
  }
  get cannonDamage() {
    return 26 + this.upgrades * 5 + (this.stage - 1) * 2;
  }
  nextSlot() {
    const used = new Set(this.allies.map((a) => a.slot));
    for (const flight of this.deliveries) if (flight.slot != null) used.add(flight.slot);
    let slot = 0;
    while (used.has(slot)) slot++;
    return slot;
  }
  recruit(x, initial = false, slot = this.nextSlot()) {
    if (this.allies.length >= 48) return;
    const [dx, dz] = formation(slot, this.scale);
    this.allies.push({
      slot,
      x: clamp(x + dx, -6.28, 6.28),
      z: dz,
      age: initial ? 2 : 0,
      phase: this.rand() * TAU,
    });
    if (!initial) this.recruits++;
  }
  openCard(card) {
    if (!card.active) return;
    card.active = false;
    card.collectedAt = this.elapsed;
    card.pop = 0;
    this.event('supplyBreak', card.x, 0.62, card.z);
    if (card.type === 'blast') {
      // The charge bursts into the ranks beside the card, on the same stretch of bridge.
      const blastX = clamp(card.x, -1.8, 1.0);
      this.blast({ x: blastX, power: 5.8 }, card.z - 1.5);
      if (this.boss.active && Math.hypot(this.boss.x - blastX, this.boss.z - card.z + 1.5) < 4.6)
        this.damageBoss({ kind: 'rocket' }, 48);
      return;
    }
    const count = supplies[card.type].count;
    for (let i = 0; i < (count || 1); i++) {
      const slot = count ? this.nextSlot() : null;
      if (slot != null && slot >= 48) break;
      this.deliveries.push({
        type: card.type,
        slot,
        sx: card.x,
        sz: card.z,
        x: card.x,
        z: card.z,
        y: 0.46,
        age: -i * 0.065,
        progress: 0,
        phase: this.rand() * TAU,
      });
    }
  }
  updateDeliveries(dt) {
    for (const f of this.deliveries) {
      f.age += dt;
      if (f.age < 0) continue;
      const t = Math.min(1, f.age / 0.58);
      const travel = t * (2 - t);
      const [dx, dz] = f.slot == null ? [0, -0.18] : formation(f.slot, this.scale);
      f.progress = t;
      f.x = f.sx + (clamp(this.x + dx, -6.28, 6.28) - f.sx) * travel;
      f.z = f.sz + (dz - f.sz) * travel;
      f.y =
        0.46 * (1 - t) + Math.sin(Math.PI * t) * (1.05 + Math.min(1.25, Math.abs(f.sz) * 0.075));
      if (t < 1) continue;
      if (f.slot != null) {
        this.recruit(this.x, false, f.slot);
        this.event('plus', f.x, 0.12, f.z, 0.7);
      } else {
        if (f.type === 'merge') {
          this.upgrades++;
          this.scale = 1 + Math.min(0.64, this.upgrades * 0.13);
        } else {
          const duration = f.type === 'fever' ? 4.2 : f.type === 'shield' ? 5 : 6;
          this.buffs[f.type] = duration;
        }
        this.mergeGlow = 1;
        this.event('merge', this.x, 0.23, this.captainZ);
      }
    }
    this.deliveries = this.deliveries.filter((f) => f.progress < 1);
  }
  crossGates() {
    for (const g of this.gates) {
      g.z = this.distance - g.at;
      if (!g.active) {
        g.pop = this.elapsed - g.collectedAt;
        continue;
      }
      if (this.caught || Math.abs(g.z - this.captainZ) > 0.83) continue;
      if (Math.abs(this.x - g.x) <= 1.06 + this.scale * 0.25) this.openCard(g);
    }
  }
  marchPastBoss(unit, dt) {
    const b = this.boss;
    // Spread the existing columns around his footprint, retaining their order
    // on each flank. This also exposes the floor where the fists will land.
    const dz = unit.z - b.z;
    if (!unit.passSide && unit.x === unit.laneX && (dz < -3.3 || dz > 6.4)) return;
    const centerZ = b.attackT > 0 ? b.landZ : b.z + 0.45;
    const nearBody = 1 - smoothRange(Math.abs(dz), 1.45, 3.25);
    const nearLanding = b.attackT > 0 ? 1 - smoothRange(Math.abs(unit.z - centerZ), 1.25, 3.45) : 0;
    const gap = Math.max(1.42 * nearBody, 1.9 * nearLanding * smoothRange(b.attackT, 0, 0.31));
    if (!gap) unit.passSide = 0;
    else if (!unit.passSide) unit.passSide = unit.x < b.x ? -1 : 1;
    if (!gap && unit.x === unit.laneX) return;
    const side = unit.passSide || 1;
    const span = side > 0 ? 2.09 - b.x : b.x + 3.05;
    const across = clamp(Math.abs(unit.laneX - b.x) / span, 0, 1);
    const targetX = unit.laneX + side * gap * (1 - across);
    unit.x += (targetX - unit.x) * (1 - Math.exp(-9 * dt));
    if (!gap && Math.abs(unit.x - unit.laneX) < 0.002) unit.x = unit.laneX;
  }
  spawnRow() {
    const pack = Math.floor(this.row / PACK_ROWS);
    const inPack = this.row % PACK_ROWS;
    for (const c of this.columns) {
      // A narrower vanguard and alternating stepped shoulders make the separate ranks legible.
      const edge = pack % 2 ? c.index : COLUMNS - 1 - c.index;
      if ((this.row < 4 && (c.index < 2 || c.index > 8)) || (inPack < 2 && edge > 8)) continue;
      const side = ((this.row % 2) - 0.5) * 0.12;
      const last = c.units[c.units.length - 1];
      const entry = this.entryZ - 0.8 - 0.09 * (c.index % 2);
      const z = last ? Math.min(entry, last.z - 0.37) : entry;
      const e = this.grunt(c.x + side, z);
      if (inPack === 5 && c.index === (pack * 7) % COLUMNS && this.stage >= 2) {
        const roles = ['gunner'];
        if (this.stage >= 3) roles.push('weaver', 'brute');
        if (this.stage >= 4) roles.push('guard');
        if (this.stage >= 5) roles.push('bomber');
        e.role = roles[pack % roles.length];
        const heavy = e.role === 'brute' || e.role === 'guard';
        e.size *= heavy ? 1.42 : 1.1;
        e.hp = heavy ? 9 + this.stage : 3.2 + this.stage * 0.35;
        e.speed = heavy ? 0.92 : e.role === 'weaver' ? 1.69 : 1.32;
        this.runners.push(e);
      } else if (
        inPack === 2 &&
        (c.index === (pack * 3) % COLUMNS || c.index === (pack * 3 + 5) % COLUMNS)
      ) {
        e.speed = 1.72 + this.rand() * 0.21;
        this.runners.push(e);
      } else {
        c.units.push(e);
      }
    }
    this.row++;
  }
  moveGrunt(e, dt, frontage) {
    const run = e.speed > 1.6;
    const charging = e.z >= (run ? -3.5 : -2.65) && e.z < 1.55;
    let speed = e.speed ?? MARCH_SPEED;
    let lateral = 0;
    if (charging) {
      let targetX = this.x,
        best = Math.abs(targetX - e.x);
      for (const a of frontage) {
        const dist = Math.abs(a.x - e.x);
        if (dist < best) {
          best = dist;
          targetX = a.x;
        }
      }
      const tracking = run ? 3.65 : 2.55;
      lateral = clamp(targetX - e.x, -tracking * dt, tracking * dt);
      if (e.role === 'weaver') lateral += Math.sin(e.phase + e.marched * 7) * dt * 0.74;
      e.x += lateral;
      speed *= run ? 1.48 : 1.32;
    } else if (this.boss.active && !this.boss.defeated) {
      const oldX = e.x;
      this.marchPastBoss(e, dt);
      lateral = e.x - oldX;
    }
    const forward = speed * dt;
    e.z += this.worldAdvance + forward;
    e.marched += Math.hypot(forward, lateral);
    e.yaw += (Math.atan2(lateral, forward) - e.yaw) * (1 - Math.exp(-9 * dt));
    if (e.role === 'gunner' && !e.fired && e.z >= -14 && e.z < -4 && this.enemyFireTimer <= 0) {
      this.enemyRound(e.x, e.z, 0.65);
      e.fired = true;
    }
    if (e.z > -2 && e.z < 2.3) this.contact(e);
  }
  advanceCrowd(dt) {
    const frontage = this.allies.filter((a) => a.z <= 0.18);
    for (const c of this.columns) {
      c.minX = c.x - 0.19;
      c.maxX = c.x + 0.19;
      let count = 0;
      for (const e of c.units) {
        if (!e.alive) continue;
        this.moveGrunt(e, dt, frontage);
        if (!e.alive || e.z > 10) continue;
        c.minX = Math.min(c.minX, e.x);
        c.maxX = Math.max(c.maxX, e.x);
        c.units[count++] = e;
      }
      c.units.length = count;
    }
    for (const e of this.runners) if (e.alive) this.moveGrunt(e, dt, frontage);
    this.runners = this.runners.filter((e) => e.alive && e.z < 10);
    // Issue a row only after the preceding rank has travelled its physical spacing.
    this.toNextRow -= this.worldAdvance + MARCH_SPEED * dt;
    while (this.row < this.lastRow && this.toNextRow <= 0) {
      this.spawnRow();
      this.toNextRow += ROW_SPACING + (this.row % PACK_ROWS === 0 ? 0.38 : 0);
    }
  }
  contact(e) {
    if (!this.playing || this.caught) return;
    let victim = this.allies.findIndex(
      (a) => Math.abs(a.x - e.x) < 0.32 && Math.abs(a.z - e.z) < 0.32,
    );
    const hitsCaptain =
      Math.abs(e.x - this.x) < 0.39 * this.scale && Math.abs(e.z - this.captainZ) < 0.4;
    if (victim < 0 && !hitsCaptain) return false;
    e.alive = false;
    if (this.hitGuard > 0) return true;
    this.hitGuard = this.buffs.shield > 0 ? 0.36 : 0.68;
    if (this.buffs.shield > 0) {
      this.event('shieldHit', e.x, 0.35, e.z);
      return true;
    }
    this.hurt = 1;
    if (e.role === 'bomber') {
      this.event('impact', e.x, 0.1, e.z, 0.87);
      this.allies = this.allies.filter((a) => {
        if (Math.hypot(a.x - e.x, a.z - e.z) > 0.95) return true;
        this.fall(a, 'blue', 1.2, e.x);
        return false;
      });
      if (hitsCaptain && !this.allies.length && --this.armor <= 0) this.finish(false);
      return true;
    }
    if (victim < 0 && this.allies.length) {
      let nearest = Infinity;
      this.allies.forEach((a, i) => {
        const d = (a.x - e.x) ** 2 + (a.z - e.z) ** 2;
        if (d < nearest) {
          nearest = d;
          victim = i;
        }
      });
    }
    if (victim >= 0) this.fall(this.allies.splice(victim, 1)[0], 'blue', 0.95, e.x);
    else if (--this.armor <= 0) this.finish(false);
    return true;
  }
  enemyRound(x, z, y) {
    const speed = 7.4;
    const dx = this.x - x,
      dz = Math.max(1, this.captainZ - z);
    const distance = Math.hypot(dx, dz);
    this.incoming.push({
      x,
      z,
      y,
      startY: y,
      startZ: z,
      vx: (dx * speed) / distance,
      vz: (dz * speed) / distance,
      alive: true,
    });
    this.enemyFireTimer = 1.35;
    this.event('hostileMuzzle', x, y, z);
  }
  advanceIncoming(dt) {
    this.enemyFireTimer = Math.max(0, this.enemyFireTimer - dt);
    for (const p of this.incoming) {
      p.x += p.vx * dt;
      p.z += p.vz * dt;
      p.y = 0.45 + (p.startY - 0.45) * clamp(p.z / p.startZ, 0, 1);
      if (p.z > -2 && p.z < 2.3 && this.contact(p)) this.event('hostileMuzzle', p.x, p.y, p.z);
    }
    this.incoming = this.incoming.filter((p) => p.alive && p.z < 6);
  }
  pushWall(dt) {
    const wall = this.wall;
    const touches = (x, z, r) =>
      wall.hp > 0 && Math.abs(x - wall.x) < 2.14 + r && Math.abs(z - wall.z) < 0.32 + r;
    this.allies = this.allies.filter((a) => {
      if (!touches(a.x, a.z, 0.19)) return true;
      this.fall(a, 'blue', 0);
      const pushed = this.falling[this.falling.length - 1];
      pushed.pushed = true;
      pushed.front = wall.z + 0.55;
      return false;
    });
    if (touches(this.x, this.captainZ, 0.32 * this.visualScale)) this.caught = true;
    if (this.caught) {
      this.captainZ = Math.max(this.captainZ, wall.z + 0.38);
      if (this.captainZ >= 4.5) {
        this.lossReason = 'wall';
        this.finish(false);
      }
    }
  }
  fall(e, side, force, origin = e.x) {
    if (this.falling.length >= 96) {
      const red = this.falling.findIndex((body) => body.side === 'red');
      this.falling.splice(red < 0 ? 0 : red, 1);
    }
    const body = {
      x: e.x,
      z: e.z,
      y: 0.07,
      t: 0,
      side,
      phase: e.phase || 0,
      size: e.size || 1,
      id: e.id || 0,
      vx: (e.x - origin) * 1.05 + (this.rand() - 0.5) * 2.8 * force,
      vz: (this.rand() - 0.5) * 2.4 * force,
      vy: (1.65 + this.rand() * 2.3) * force,
      spin: (this.rand() - 0.5) * 8,
      roll: (this.rand() - 0.5) * 7,
    };
    this.falling.push(body);
    return body;
  }
  kill(e, force = 1, x = e.x) {
    if (!e.alive) return;
    e.alive = false;
    this.score++;
    if (this.buffs.fever <= 0) {
      this.feverMeter += 0.21;
      if (this.feverMeter >= 100) {
        this.feverMeter = 0;
        this.buffs.fever = 4.2;
        this.event('merge', this.x, 0.2, this.captainZ);
      }
    }
    this.fall(e, 'red', force, x);
  }
  closeEnemy(x, z) {
    // Only threats in front of this shooter, within a few infantry strides.
    const radius = 2.35;
    let front = null;
    const consider = (e, bodyRadius) => {
      const ahead = z - e.z;
      if (ahead < 0 || ahead > radius + bodyRadius) return;
      if (Math.hypot(e.x - x, ahead) > radius + bodyRadius) return;
      if (!front || e.z > front.z || (e.z === front.z && Math.abs(e.x - x) < Math.abs(front.x - x)))
        front = e;
    };
    if (this.boss.active && !this.boss.defeated) consider(this.boss, 0.78);
    for (const c of this.columns) {
      if (c.maxX < x - radius - 0.25 || c.minX > x + radius + 0.25) continue;
      for (const e of c.units) {
        if (e.z < z - radius - 0.25) break;
        if (e.alive) consider(e, 0.2);
      }
    }
    for (const e of this.runners) if (e.alive) consider(e, 0.2);
    return front;
  }
  launch(x, y, z, profile, power, damage, slope = 0) {
    const forward = 1 / Math.hypot(1, slope);
    const shot = {
      kind: profile === cannonRound ? 'rocket' : 'shot',
      profile,
      power,
      damage,
      headingX: slope * forward,
      headingZ: -forward,
      startX: x,
      startY: y,
      startZ: z,
      x,
      y,
      z,
      distance: 0,
      range: shotRange,
      age: 0,
      afterHit: 0,
      finished: false,
      pierce: profile === plasmaRound ? 3 : 0,
    };
    let obstacle = this.firstHit(shot, shotRange);
    // Keep a clear, forward firing line. Only turn at the muzzle for a nearby
    // threat when there isn't already an immediate obstacle straight ahead.
    if (slope === 0 && (!obstacle || obstacle.distance > 2.35)) {
      const target = this.closeEnemy(x, z);
      if (target) {
        const dx = target.x - x;
        const dz = Math.min(-0.06, target.z - z);
        const distance = Math.hypot(dx, dz);
        shot.headingX = dx / distance;
        shot.headingZ = dz / distance;
        shot.range = Math.min(shotRange, distance + 0.75);
        obstacle = this.firstHit(shot, shot.range);
      }
    }
    shot.aimDistance = Math.max(0.12, obstacle ? obstacle.distance : shot.range);
    shot.endY =
      obstacle?.target === this.boss
        ? 2.05
        : obstacle?.target === this.wall || obstacle?.target.type
          ? 0.72
          : 0.48;
    // A raised cannon can clear the helmets in front of a boss in its lane.
    const bossDistance = (this.boss.z - z) / shot.headingZ;
    if (
      profile === cannonRound &&
      this.boss.active &&
      !this.boss.defeated &&
      bossDistance > 0 &&
      bossDistance < shot.range &&
      Math.abs(x + shot.headingX * bossDistance - this.boss.x) <= 1.26 &&
      obstacle?.target !== this.wall &&
      !obstacle?.target.type
    ) {
      shot.aimDistance = Math.max(0.12, bossDistance);
      shot.endY = 2.05;
    }
    shot.lift = profile.lift * Math.min(1, shot.aimDistance / 9);
    this.shots.push(shot);
  }
  shoot(dt) {
    const boosted = this.buffs.fever > 0;
    const cadence = boosted ? 0.62 : this.buffs.rapid > 0 ? 0.72 : 1;
    this.rocketTimer -= dt;
    if (this.rocketTimer <= 0) {
      this.rocketTimer += 0.69 * cadence;
      this.recoil = 1;
      const x = this.x + 0.295 * this.visualScale;
      const y = 1.31 * this.visualScale;
      const z = -0.6 * this.visualScale;
      const power = 1 + Math.min(1.7, this.upgrades * 0.28);
      this.launch(x, y, z, cannonRound, power, this.cannonDamage);
      this.event('muzzle', x, y, z, power);
    }
    this.volleyTimer -= dt;
    if (this.volleyTimer <= 0) {
      this.volleyTimer += 0.27 * cadence;
      this.volley++;
      for (const a of this.allies) {
        if (a.age < 0.12) continue;
        const x = a.x + 0.13,
          z = a.z - 0.22;
        const energy = (boosted || this.buffs.plasma > 0) && (a.slot + this.volley) % 3 === 0;
        const profile = energy ? plasmaRound : a.slot % 4 === 1 ? pulseRound : rifleRound;
        this.launch(x, 0.58, z, profile, 1, energy ? 6 : 2.8);
        if ((boosted || this.buffs.spread > 0) && a.slot % 2 === 0)
          this.launch(x, 0.58, z, rifleRound, 1, 2.8, (this.volley % 2 ? 1 : -1) * 0.09);
      }
      if (this.allies.length) this.event('smallShot', this.x, 0.6, 0, 0.7);
    }
    this.supportTimer -= dt;
    if (this.buffs.drone > 0 && this.supportTimer <= 0) {
      this.supportTimer = 0.36;
      for (const side of [-1, 1]) this.launch(this.x + side * 1.15, 1.3, -0.32, plasmaRound, 1, 6);
    }
  }
  firstHit(shot, travel) {
    // Intersect the swept segment, so even a fast diagonal close shot hits at its actual position.
    const dx = shot.headingX;
    const dz = shot.headingZ;
    const endX = shot.x + dx * travel;
    const endZ = shot.z + dz * travel;
    const padding = shot.kind === 'rocket' ? 0.15 : 0.07;
    let first = null;
    const check = (e, w, d) => {
      const half = w + padding;
      const depth = d + padding;
      // All gameplay shots face forward, so dz is strictly negative.
      let enter = Math.max(0, (e.z + depth - shot.z) / dz);
      let exit = Math.min(travel, (e.z - depth - shot.z) / dz);
      if (Math.abs(dx) < 1e-6) {
        if (Math.abs(shot.x - e.x) > half) return;
      } else {
        const a = (e.x - half - shot.x) / dx;
        const b = (e.x + half - shot.x) / dx;
        enter = Math.max(enter, Math.min(a, b));
        exit = Math.min(exit, Math.max(a, b));
      }
      if (enter > exit || (first && enter >= first.distance)) return;
      if (shot.aimDistance !== undefined && e !== this.wall && !e.type) {
        const bottom = e === this.boss ? this.boss.lift : 0;
        const top = bottom + (e === this.boss ? 4.4 : 0.92 * (e.size || 1)) + padding;
        const y0 = flightHeight(shot, shot.distance + enter);
        const y1 = flightHeight(shot, shot.distance + exit);
        if (Math.min(y0, y1) > top || Math.max(y0, y1) < bottom - padding) return;
        if (y0 > top && y0 > y1) enter += ((exit - enter) * (y0 - top)) / (y0 - y1);
      }
      first = { target: e, distance: enter };
    };
    if (this.wall.hp > 0) check(this.wall, 2.1, 0.32);
    for (const card of this.gates) {
      if (card.active && card.z >= endZ - 0.36 && card.z <= shot.z + 0.36)
        check(card, supplies[card.type].tone === 'gold' ? 1.22 : 0.9, 0.15);
    }
    if (this.boss.active && !this.boss.defeated) check(this.boss, 1.26, 0.7);
    for (const c of this.columns) {
      if (c.maxX < Math.min(shot.x, endX) - 0.42 || c.minX > Math.max(shot.x, endX) + 0.42)
        continue;
      for (const e of c.units) {
        if (e.z < endZ - 0.42) break;
        if (e.alive && e.z < shot.z + 0.42) check(e, 0.245, 0.23);
      }
    }
    for (const e of this.runners) if (e.alive) check(e, 0.25 * e.size, 0.23 * e.size);
    return first;
  }
  blast(p, z) {
    const radius = 0.95 + p.power * 0.48;
    for (const c of this.columns) {
      if (c.maxX < p.x - radius || c.minX > p.x + radius) continue;
      for (const e of c.units) {
        if (e.z < z - radius) break;
        if (e.alive && (e.x - p.x) ** 2 + (e.z - z) ** 2 < radius * radius) this.kill(e, 1.18, p.x);
      }
    }
    for (const e of this.runners)
      if (e.alive && (e.x - p.x) ** 2 + (e.z - z) ** 2 < radius * radius) this.kill(e, 1.18, p.x);
    this.event('impact', p.x, 0.06, z, p.power);
  }
  damageBoss(shot, damage) {
    const b = this.boss;
    if (b.defeated) return;
    b.hp = Math.max(0, b.hp - damage);
    b.hit = shot.kind === 'rocket' ? 0.77 : Math.max(b.hit, 0.1);
    if (b.hp <= 0) {
      b.defeated = true;
      b.defeatAge = 0;
      this.phase = 'clear';
      this.event('finisher', b.x, 2.3, b.z, 1.5);
    }
  }
  resolveHit(shot, target) {
    if (target === this.wall) {
      target.hp = Math.max(0, target.hp - shot.damage * 0.72);
      target.flash = 1;
      this.event(
        target.hp <= 0 ? 'wallBreak' : 'wallHit',
        shot.x,
        0.85,
        shot.z,
        shot.kind === 'rocket' ? 1.15 : 0.45,
      );
    } else if (target.type && supplies[target.type]) {
      target.hp = Math.max(0, target.hp - shot.damage);
      target.flash = 1;
      if (target.hp <= 0) this.openCard(target);
      else this.event('cardHit', shot.x, 0.6, shot.z, 0.7);
    } else if (target === this.boss) {
      this.event(
        shot.kind === 'rocket' ? 'impact' : 'hit',
        shot.x,
        shot.y,
        shot.z,
        shot.kind === 'rocket' ? shot.power * 0.7 : 0.7,
      );
      this.damageBoss(shot, shot.damage);
    } else if (shot.kind === 'rocket') {
      this.blast(shot, target.z);
      const b = this.boss;
      if (
        b.active &&
        b.lift < 0.85 &&
        Math.hypot(shot.x - b.x, target.z - b.z) < 1.65 + shot.power * 0.48
      )
        this.damageBoss(shot, shot.damage * 0.65);
    } else {
      if (target.hp != null)
        target.hp -=
          shot.damage * (target.role === 'guard' && shot.profile !== plasmaRound ? 0.65 : 1);
      if (target.hp == null || target.hp <= 0) this.kill(target, 0.72);
      this.event('hit', shot.x, 0.45, shot.z, 0.65);
    }
  }
  advanceShots(dt) {
    const remaining = [];
    for (const shot of this.shots) {
      shot.age += dt;
      if (shot.finished) {
        shot.afterHit += dt;
        if (shot.afterHit * shot.profile.speed < shot.profile.tail) remaining.push(shot);
        continue;
      }
      let travel = Math.min(dt * shot.profile.speed, shot.range - shot.distance);
      while (travel > 0 && !shot.finished && this.playing) {
        const hit = this.firstHit(shot, travel);
        const moved = hit ? hit.distance : travel;
        shot.distance += moved;
        if (!hit && shot.range - shot.distance < 1e-8) shot.distance = shot.range;
        travel -= moved;
        sampleFlight(shot, shot.distance, shot);
        if (hit) this.resolveHit(shot, hit.target);
        const pierced = hit && shot.pierce > 0 && hit.target.alive === false;
        if (pierced) shot.pierce--;
        shot.finished = (Boolean(hit) && !pierced) || shot.distance >= shot.range - 1e-8;
      }
      if (!this.playing) break;
      remaining.push(shot);
    }
    this.shots = this.playing ? remaining : [];
  }
  updateFalling(dt) {
    for (const e of this.falling) {
      if (e.pushed) {
        e.z = Math.max(e.z, e.front);
        e.z += this.worldAdvance;
        e.y = 0;
        if (e.z > 7) e.t = 2;
        continue;
      }
      e.t += dt;
      e.x += e.vx * dt;
      e.z += e.vz * dt + this.worldAdvance * 0.38;
      e.y += e.vy * dt;
      e.vy -= (e.gravity ?? 8.6) * dt;
      if (e.y < 0.05) {
        e.y = 0.05;
        e.vx *= 0.9;
        e.vz *= 0.9;
      }
    }
    this.falling = this.falling.filter((e) => e.t < 1.02);
  }
  slamSquad() {
    const b = this.boss;
    this.event('slam', b.landX, 0.08, b.landZ, 1.08);
    this.allies = this.allies.filter((a) => {
      const dx = a.x - b.landX,
        dz = a.z - b.landZ;
      const distance = Math.hypot(dx, dz);
      if (distance > slamRadius + 0.19) return true;
      const body = this.fall(a, 'blue', 0);
      const angle = distance > 0.01 ? Math.atan2(dz, dx) : a.phase;
      const force = 3.0 + 2.1 * (1 - Math.min(1, distance / slamRadius));
      body.vx = Math.cos(angle) * force;
      body.vz = Math.sin(angle) * force;
      body.vy = 4.0 + force * 0.38;
      body.gravity = 13.5;
      body.spin = -Math.sin(angle) * 5;
      body.roll = Math.cos(angle) * 5;
      return false;
    });
    if (Math.hypot(this.x - b.landX, this.captainZ - b.landZ) > slamRadius + 0.26) return;
    if (this.buffs.shield > 0) {
      this.buffs.shield = 0;
      this.event('shieldHit', this.x, 0.7, this.captainZ);
      return;
    }
    this.hurt = 1;
    this.hitGuard = 1.15;
    this.armor--;
    if (this.armor <= 0) {
      this.lossReason = 'slam';
      this.finish(false);
    }
  }
  advanceBoss(dt) {
    const b = this.boss;
    if (b.defeated) {
      const before = b.defeatAge;
      b.defeatAge += dt;
      if (before < 0.92 && b.defeatAge >= 0.92) this.landBoss();
      if (b.defeatAge >= 0.92) b.z += this.worldAdvance;
      if (
        b.defeatAge > 1.4 &&
        this.row >= this.lastRow &&
        !this.runners.length &&
        this.columns.every((col) => col.units.length === 0)
      )
        this.finish(true);
      return;
    }
    if (!b.active) {
      if (this.row >= this.finaleRow) {
        b.z = this.entryZ - 1.5;
        b.active = true;
        this.phase = 'boss';
      }
      return;
    }
    b.recovery = Math.max(0, b.recovery - dt);
    if (b.attackT > 0) {
      b.attackT += dt;
      const u = jumpProgress(b.attackT);
      const travel = smoothRange(u, 0, 1);
      b.x = b.leapFromX + (b.landX - b.leapFromX) * travel;
      b.z = b.leapFromZ + (b.landZ - 0.68 - b.leapFromZ) * travel;
      b.lift = 2.15 * 4 * u * (1 - u);
      if (b.attackT >= touchdown && !b.impactDone) {
        b.impactDone = true;
        this.slamSquad();
      }
      if (b.attackT >= attackDuration) {
        b.attackT = 0;
        b.recovery = 0.92;
      }
      return;
    }
    const stride = dt * (1.05 + (this.stage - 1) * 0.038);
    b.z += this.worldAdvance + stride;
    b.marched += stride;
    if (b.z > -16 && b.z < -9 && !b.fired && this.enemyFireTimer <= 0) {
      b.fired = true;
      this.enemyRound(b.x, b.z + 0.32, 1.95);
    }
    if (b.z > 4.5) {
      this.lossReason = 'breach';
      this.finish(false);
      return;
    }
    b.x = clamp(b.x + clamp(this.x - b.x, -dt * 0.9, dt * 0.9), -1.13, -0.1);
    if (b.recovery > 0 || b.z < -4.8) return;
    let nearest = null,
      best = 3.65;
    const consider = (x, z) => {
      if (z < b.z - 0.2) return;
      const d = Math.hypot(x - b.x, z - b.z);
      if (d < best) {
        best = d;
        nearest = { x, z };
      }
    };
    consider(this.x, this.captainZ);
    for (const a of this.allies) consider(a.x, a.z);
    if (!nearest) return;
    b.leapFromX = b.x;
    b.leapFromZ = b.z;
    b.landX = clamp(nearest.x, -1.13, -0.1);
    b.landZ = clamp(nearest.z, b.z + 0.68, b.z + 2.8);
    b.attackT = 0.001;
    b.impactDone = false;
  }
  landBoss() {
    const centerZ = this.boss.z - 1.55;
    const displace = (unit) => {
      const dx = unit.x - this.boss.x;
      const dz = unit.z - centerZ;
      if (!unit.alive || (dx / 2.45) ** 2 + (dz / 3.6) ** 2 > 1) return;
      this.kill(unit, 1.25, this.boss.x);
      const body = this.falling[this.falling.length - 1];
      body.vx = Math.sign(dx || 1) * (3.8 + Math.abs(dx));
      body.vz = dz * 1.9;
    };
    for (const column of this.columns) {
      for (const unit of column.units) displace(unit);
      column.units = column.units.filter((unit) => unit.alive);
    }
    for (const unit of this.runners) displace(unit);
    this.runners = this.runners.filter((unit) => unit.alive);
    this.event('victory', this.boss.x, 0.1, centerZ, 1.3);
  }
  finish(win) {
    if (!this.playing) return;
    this.phase = win ? 'won' : 'lost';
    this.endTime = 0;
    this.shots = [];
    this.incoming = [];
    if (!win) {
      this.event('loss', this.x, 0, 0);
      if (this.lossReason !== 'wall' && this.lossReason !== 'slam') {
        for (const a of this.allies) this.fall(a, 'blue', 1.45, this.x);
        this.allies = [];
      }
      this.event('impact', this.x, 0, 0, 1.6);
    }
  }
  tick(dt, axis = 0) {
    this.worldAdvance = 0;
    if (!this.playing) {
      if (this.phase === 'won' || this.phase === 'lost') {
        this.endTime += dt;
        this.boss.hit = Math.max(0, this.boss.hit - 4 * dt);
        this.updateFalling(dt);
      }
      return;
    }
    this.elapsed += dt;
    for (const key of Object.keys(this.buffs)) this.buffs[key] = Math.max(0, this.buffs[key] - dt);
    for (const card of this.gates) card.flash = Math.max(0, card.flash - dt * 7);
    this.hitGuard = Math.max(0, this.hitGuard - dt);
    this.hurt = Math.max(0, this.hurt - 4 * dt);
    this.mergeGlow = Math.max(0, this.mergeGlow - 2.25 * dt);
    this.recoil = Math.max(0, this.recoil - 5.1 * dt);
    this.wall.flash = Math.max(0, this.wall.flash - 4.6 * dt);
    this.boss.hit = Math.max(0, this.boss.hit - 5.4 * dt);
    this.visualScale += (this.scale - this.visualScale) * (1 - Math.exp(-8 * dt));
    if (axis) this.aim(this.targetX + axis * 10.2 * dt);
    const oldX = this.x;
    if (!this.caught) this.x += (this.targetX - this.x) * (1 - Math.exp(-21 * dt));
    this.velocity = (this.x - oldX) / Math.max(dt, 0.001);
    const speed = this.boss.active ? 2.3 : 3.65;
    this.worldAdvance = speed * dt;
    this.distance += this.worldAdvance;
    this.wall.z = this.distance - WALL_AT;
    this.crossGates();
    this.updateDeliveries(dt);
    for (const a of this.allies) {
      a.age += dt;
      const [dx, dz] = formation(a.slot, this.scale);
      const target = clamp(this.x + dx, -6.28, 6.28);
      a.x += (target - a.x) * (1 - Math.exp(-19 * dt));
      a.z += (dz - a.z) * (1 - Math.exp(-14 * dt));
    }
    this.pushWall(dt);
    if (!this.playing) return;
    this.advanceCrowd(dt);
    this.advanceIncoming(dt);
    this.updateFalling(dt);
    if (!this.playing) return;
    this.advanceBoss(dt);
    if (!this.playing) return;
    if (!this.caught) this.shoot(dt);
    this.advanceShots(dt);
  }
}
