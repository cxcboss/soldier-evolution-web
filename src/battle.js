import {
  rifleRound,
  pulseRound,
  cannonRound,
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

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const TAU = Math.PI * 2;
const WALL_AT = 21;
const BOSS_AT = 86;
const HALF_ROAD = 5.45;
const COLUMNS = 11;
const COLUMN_SPACING = 0.435;
const FIRST_COLUMN = -2.65;

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
  reset() {
    this.seed = 129920;
    this.sequence = 0;
    this.phase = 'ready';
    this.elapsed = 0;
    this.distance = 0;
    this.captainZ = 0;
    this.caught = false;
    this.lossReason = null;
    this.round = (this.round ?? -1) + 1;
    this.worldAdvance = 0;
    this.x = -3.95;
    this.targetX = this.x;
    this.velocity = 0;
    this.absorbed = 0;
    this.scale = 1;
    this.visualScale = 1;
    this.recoil = 0;
    this.mergeGlow = 0;
    this.hurt = 0;
    this.armor = 3;
    this.shots = [];
    this.allies = [];
    this.falling = [];
    this.merging = [];
    this.runners = [];
    this.rocketTimer = 0.18;
    this.rushTimer = 3.8;
    this.hitGuard = 0;
    this.score = 0;
    this.recruits = 0;
    this.endTime = 0;
    this.wall = { x: 4.13, z: -WALL_AT, hp: 72, maxHp: 72, flash: 0 };
    this.boss = {
      x: -0.42,
      z: -39,
      hp: 800,
      maxHp: 800,
      hit: 0,
      lift: 0,
      active: false,
      attackT: 0,
      impactDone: false,
      recovery: 0,
      leapFromX: 0,
      leapFromZ: 0,
      landX: 0,
      landZ: 0,
    };
    this.gates = [];
    const add = (x, at, type) => this.gates.push({ x, at, z: -at, type, active: true });
    for (let row = 0; row < 80; row++) {
      add(-4.65, 2.7 + row * 2.42, 'merge');
      const at = WALL_AT + 2.35 + row * 2.12;
      add(3.1, at, 'plus');
      add(5.15, at, 'plus');
    }
    this.columns = Array.from({ length: COLUMNS }, (_, col) => {
      const x = FIRST_COLUMN + col * COLUMN_SPACING,
        units = [];
      for (let row = 0; row < 104; row++)
        units.push(this.grunt(x + ((row % 2) - 0.5) * 0.13, -12.6 - row * 0.49 - (col % 2) * 0.18));
      return { x, minX: x - 0.18, maxX: x + 0.18, index: col, units };
    });
    for (let i = 0; i < 8; i++) this.recruit(this.x, true);
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
    return this.phase === 'run' || this.phase === 'boss';
  }
  recruit(x, initial = false) {
    if (this.allies.length >= 48) return;
    const used = new Set(this.allies.map((a) => a.slot));
    let slot = 0;
    while (used.has(slot)) slot++;
    const [dx, z] = formation(slot, this.scale);
    this.allies.push({
      slot,
      x: initial ? this.x + dx : x,
      z: initial ? z : -0.26,
      age: initial ? 2 : 0,
      shotTimer: 0.14 + this.rand() * 0.47,
      phase: this.rand() * TAU,
    });
    if (!initial) {
      this.recruits++;
      this.event('plus', x, 0, -0.08);
    }
  }
  crossGates() {
    const range = 0.72 + Math.min(0.75, this.allies.length * 0.017);
    for (const g of this.gates) {
      if (g.collectedAt != null) g.pop = this.elapsed - g.collectedAt;
      g.z = this.distance - g.at;
      if (!g.active || g.z < -range || g.z > 1.45) continue;
      if (this.caught) continue;
      const half = g.type === 'plus' ? 0.86 : 1.28;
      if (Math.abs(this.x - g.x) > half + range * 0.61) continue;
      if (g.type === 'plus') {
        g.active = false;
        g.pop = 0;
        g.collectedAt = this.elapsed;
        this.recruit(g.x);
        continue;
      }
      if (!this.allies.length) continue;
      g.active = false;
      g.pop = 0;
      g.collectedAt = this.elapsed;
      const n = Math.min(
        this.allies.length,
        1 + Math.floor(this.absorbed / 5) + Math.floor(this.allies.length / 9),
      );
      this.allies.sort((a, b) => Math.abs(a.x - g.x) - Math.abs(b.x - g.x));
      const taken = this.allies.splice(0, n);
      for (const a of taken) this.merging.push({ x: a.x, z: a.z, t: 0, phase: a.phase });
      this.absorbed += taken.length;
      this.scale =
        1 +
        Math.min(1.12, this.absorbed * 0.042) +
        Math.min(0.32, Math.max(0, this.absorbed - 27) * 0.009);
      this.mergeGlow = 1;
      this.event('merge', this.x, 0, 0, Math.min(2, 1 + taken.length * 0.07));
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
  advanceCrowd(dt) {
    const march = 1.55 * dt + this.worldAdvance * 0.48;
    for (const c of this.columns) {
      const alive = [];
      c.minX = c.x - 0.18;
      c.maxX = c.x + 0.18;
      for (const e of c.units) {
        if (!e.alive) continue;
        e.z += march;
        if (e.z > 10) continue;
        this.marchPastBoss(e, dt);
        c.minX = Math.min(c.minX, e.x);
        c.maxX = Math.max(c.maxX, e.x);
        this.contact(e);
        if (e.alive) alive.push(e);
      }
      c.units = alive;
      let tail = alive.length ? alive[alive.length - 1].z : -63;
      while (tail > -70) {
        tail -= 0.49;
        alive.push(this.grunt(c.x + (this.rand() - 0.5) * 0.13, tail));
      }
    }
    this.rushTimer -= dt;
    if (this.rushTimer <= 0 && !this.boss.active) {
      this.rushTimer = 1.3 + this.rand() * 0.75;
      const near = clamp(Math.round((this.x - FIRST_COLUMN) / COLUMN_SPACING), 0, COLUMNS - 1);
      const count = 2 + Math.floor(this.rand() * 3);
      for (let i = 0; i < count; i++) {
        const c = this.columns[clamp(near + Math.round((this.rand() - 0.5) * 4), 0, COLUMNS - 1)];
        const candidate = c.units.findIndex((e) => e.z < -6);
        const unit = candidate < 0 ? null : c.units.splice(candidate, 1)[0];
        if (unit) {
          unit.speed = 2.0 + this.rand() * 0.62;
          this.runners.push(unit);
        }
      }
    }
    for (const e of this.runners) {
      if (!e.alive) continue;
      e.z += (e.speed + (this.worldAdvance / Math.max(dt, 0.001)) * 0.25) * dt;
      const chase = e.z > -7 ? 1.0 : 0.32;
      e.x += clamp(this.x - e.x, -chase * dt, chase * dt);
      this.contact(e);
    }
    this.runners = this.runners.filter((e) => e.alive && e.z < 10);
  }
  contact(e) {
    if (
      !this.playing ||
      this.caught ||
      Math.abs(e.x - this.x) > 0.47 * this.scale ||
      Math.abs(e.z) > 0.42
    )
      return;
    e.alive = false;
    if (this.hitGuard > 0) return;
    this.hitGuard = this.allies.length ? 0.64 : 1.16;
    this.hurt = 1;
    if (this.allies.length) this.fall(this.allies.pop(), 'blue', 0.7);
    else if (--this.armor <= 0) this.finish(false);
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
    if (this.boss.active) consider(this.boss, 0.78);
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
  launch(x, y, z, profile, power, damage) {
    const shot = {
      kind: profile === cannonRound ? 'rocket' : 'shot',
      profile,
      power,
      damage,
      headingX: 0,
      headingZ: -1,
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
    };
    let obstacle = this.firstHit(shot, shotRange);
    // Keep a clear, forward firing line. Only turn at the muzzle for a nearby
    // threat when there isn't already an immediate obstacle straight ahead.
    if (!obstacle || obstacle.distance > 2.35) {
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
      obstacle?.target === this.boss ? 2.05 : obstacle?.target === this.wall ? 0.86 : 0.48;
    // A raised cannon can clear the helmets in front of a boss in its lane.
    const bossDistance = (this.boss.z - z) / shot.headingZ;
    if (
      profile === cannonRound &&
      this.boss.active &&
      bossDistance > 0 &&
      bossDistance < shot.range &&
      Math.abs(x + shot.headingX * bossDistance - this.boss.x) <= 1.26 &&
      obstacle?.target !== this.wall
    ) {
      shot.aimDistance = Math.max(0.12, bossDistance);
      shot.endY = 2.05;
    }
    shot.lift = profile.lift * Math.min(1, shot.aimDistance / 9);
    this.shots.push(shot);
  }
  shoot(dt) {
    this.rocketTimer -= dt;
    if (this.rocketTimer <= 0) {
      this.rocketTimer += 0.78;
      this.recoil = 1;
      const x = this.x + 0.295 * this.visualScale;
      const y = 1.31 * this.visualScale;
      const z = -0.6 * this.visualScale;
      const power = 1 + Math.min(2.1, this.absorbed * 0.05);
      this.launch(x, y, z, cannonRound, power, 26 + Math.min(174, this.absorbed * 4.85));
      this.event('muzzle', x, y, z, power);
    }
    let fired = false;
    for (const a of this.allies) {
      a.shotTimer -= dt;
      if (a.shotTimer > 0 || a.age < 0.15) continue;
      a.shotTimer += 0.46 + this.rand() * 0.17;
      fired = true;
      this.launch(a.x + 0.13, 0.58, a.z - 0.22, a.slot % 4 === 1 ? pulseRound : rifleRound, 1, 2.5);
    }
    if (fired) this.event('smallShot', this.x, 0.6, 0, 0.64);
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
      if (shot.aimDistance !== undefined && e !== this.wall) {
        const bottom = e === this.boss ? this.boss.lift : 0;
        const top = bottom + (e === this.boss ? 4.4 : 0.92) + padding;
        const y0 = flightHeight(shot, shot.distance + enter);
        const y1 = flightHeight(shot, shot.distance + exit);
        if (Math.min(y0, y1) > top || Math.max(y0, y1) < bottom - padding) return;
        if (y0 > top && y0 > y1) enter += ((exit - enter) * (y0 - top)) / (y0 - y1);
      }
      first = { target: e, distance: enter };
    };
    if (this.wall.hp > 0) check(this.wall, 2.1, 0.32);
    if (this.boss.active) check(this.boss, 1.26, 0.7);
    for (const c of this.columns) {
      if (c.maxX < Math.min(shot.x, endX) - 0.42 || c.minX > Math.max(shot.x, endX) + 0.42)
        continue;
      for (const e of c.units) {
        if (e.z < endZ - 0.42) break;
        if (e.alive && e.z < shot.z + 0.42) check(e, 0.245, 0.23);
      }
    }
    for (const e of this.runners) if (e.alive) check(e, 0.25, 0.23);
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
    b.hp = Math.max(0, b.hp - damage);
    b.hit = shot.kind === 'rocket' ? 0.77 : Math.max(b.hit, 0.1);
    if (b.hp <= 0) this.finish(true);
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
      this.kill(target, 0.72);
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
      const travel = Math.min(dt * shot.profile.speed, shot.range - shot.distance);
      const hit = this.firstHit(shot, travel);
      shot.distance += hit ? hit.distance : travel;
      sampleFlight(shot, shot.distance, shot);
      shot.finished = Boolean(hit) || shot.distance >= shot.range;
      if (hit) this.resolveHit(shot, hit.target);
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
    for (const e of this.merging) e.t += dt;
    this.merging = this.merging.filter((e) => e.t < 0.32);
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
    if (!b.active) {
      b.z = -39 + this.distance * 0.18;
      if (this.distance >= BOSS_AT) {
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
    b.z += dt * 2.48;
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
    if (win) {
      this.event('finisher', this.boss.x, 2.3, this.boss.z, 1.5);
    } else {
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
        const before = this.endTime;
        this.endTime += dt;
        this.boss.hit = Math.max(0, this.boss.hit - 4 * dt);
        if (this.phase === 'won' && before < 0.92 && this.endTime >= 0.92) this.landBoss();
        this.updateFalling(dt);
      }
      return;
    }
    this.elapsed += dt;
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
    this.updateFalling(dt);
    if (!this.playing) return;
    this.advanceBoss(dt);
    if (!this.playing) return;
    if (!this.caught) this.shoot(dt);
    this.advanceShots(dt);
  }
}
