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
    this.blueDistance = 0;
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
      slam: 0,
      active: false,
      attackT: 0,
      impactDone: false,
      recovery: 0,
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
      return { x, index: col, units };
    });
    for (let i = 0; i < 8; i++) this.recruit(this.x, true);
  }
  rand() {
    this.seed = (Math.imul(this.seed, 1664525) + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }
  grunt(x, z) {
    return {
      x: x + (this.rand() - 0.5) * 0.16,
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
      g.z = (g.type === 'plus' ? this.blueDistance : this.distance) - g.at;
      if (!g.active || g.z < -range || g.z > 1.45) continue;
      if (g.type === 'plus' && this.wall.hp > 0) continue;
      const half = g.type === 'plus' ? 0.86 : 1.28;
      if (Math.abs(this.x - g.x) > half + range * 0.61) continue;
      if (g.type === 'plus') {
        g.active = false;
        this.recruit(g.x);
        continue;
      }
      if (!this.allies.length) continue;
      g.active = false;
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
  advanceCrowd(dt) {
    const march = 1.55 * dt + this.worldAdvance * 0.48;
    for (const c of this.columns) {
      let lead = -7.15 + 0.37 * Math.sin(this.elapsed * 0.8 + c.index * 0.72);
      if (this.boss.active) lead -= Math.max(0, 2.6 - this.boss.z * 0.1);
      const alive = [];
      for (const e of c.units) {
        if (!e.alive) continue;
        e.z = Math.min(lead, e.z + march);
        lead = e.z - 0.445;
        alive.push(e);
      }
      c.units = alive;
      let tail = alive.length ? alive[alive.length - 1].z : lead;
      while (tail > -63) {
        tail -= 0.49;
        alive.push(this.grunt(c.x + ((this.sequence % 2) - 0.5) * 0.12, tail));
      }
    }
    this.rushTimer -= dt;
    if (this.rushTimer <= 0 && !this.boss.active) {
      this.rushTimer = 1.3 + this.rand() * 0.75;
      const near = clamp(Math.round((this.x - FIRST_COLUMN) / COLUMN_SPACING), 0, COLUMNS - 1);
      const count = 2 + Math.floor(this.rand() * 3);
      for (let i = 0; i < count; i++) {
        const c = this.columns[clamp(near + Math.round((this.rand() - 0.5) * 4), 0, COLUMNS - 1)];
        const unit = c.units.shift();
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
      if (Math.abs(e.x - this.x) < 0.78 + this.scale * 0.2 && e.z > -0.38 && e.z < 1.0) {
        e.alive = false;
        if (this.hitGuard <= 0) {
          this.hitGuard = this.allies.length ? 0.64 : 1.16;
          this.hurt = 1;
          if (this.allies.length) {
            const a = this.allies.pop();
            this.fall(a, 'blue', 0.7);
          } else if (--this.armor <= 0) {
            this.finish(false);
          }
        }
      }
    }
    this.runners = this.runners.filter((e) => e.alive && e.z < 3.1);
  }
  fall(e, side, force, origin = e.x) {
    if (this.falling.length > 95) this.falling.shift();
    this.falling.push({
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
    });
  }
  kill(e, force = 1, x = e.x) {
    if (!e.alive) return;
    e.alive = false;
    this.score++;
    this.fall(e, 'red', force, x);
  }
  shoot(dt) {
    this.rocketTimer -= dt;
    if (this.rocketTimer <= 0) {
      this.rocketTimer += 0.78;
      this.recoil = 1;
      const x = this.x + 0.295 * this.visualScale,
        y = 1.31 * this.visualScale,
        z = -0.6 * this.visualScale;
      const power = 1 + Math.min(2.1, this.absorbed * 0.05);
      this.shots.push({
        kind: 'rocket',
        x,
        y,
        z,
        originY: y,
        power,
        age: 0,
        damage: 26 + Math.min(174, this.absorbed * 4.85),
      });
      this.event('muzzle', x, y, z, power);
    }
    let fired = false;
    for (const a of this.allies) {
      a.shotTimer -= dt;
      if (a.shotTimer > 0 || a.age < 0.15) continue;
      a.shotTimer += 0.46 + this.rand() * 0.17;
      fired = true;
      this.shots.push({
        kind: 'shot',
        x: a.x + 0.13,
        y: 0.58,
        z: a.z - 0.22,
        originY: 0.58,
        power: 1,
        age: 0,
        damage: 2.5,
      });
    }
    if (fired) this.event('smallShot', this.x, 0.6, 0, 0.64);
  }
  shotHit(p, nextZ) {
    let best = null,
      nearest = -Infinity;
    const reach = p.kind === 'rocket' ? 0.24 : 0.12;
    const tryTarget = (type, target, x, z, half, depth) => {
      if (Math.abs(x - p.x) > half + reach || z + depth < nextZ || z - depth > p.z || z <= nearest)
        return;
      best = { type, target };
      nearest = z;
    };
    if (this.wall.hp > 0) tryTarget('wall', this.wall, this.wall.x, this.wall.z, 2.1, 0.32);
    if (this.boss.active) tryTarget('boss', this.boss, this.boss.x, this.boss.z, 1.26, 0.7);
    for (const c of this.columns) {
      if (Math.abs(c.x - p.x) > 0.48 + reach) continue;
      for (const e of c.units) {
        if (e.z < nextZ - 0.35) break;
        if (e.alive) tryTarget('grunt', e, e.x, e.z, 0.245, 0.23);
      }
    }
    for (const e of this.runners) if (e.alive) tryTarget('grunt', e, e.x, e.z, 0.25, 0.23);
    return best;
  }
  blast(p, z) {
    const radius = 0.95 + p.power * 0.48;
    for (const c of this.columns) {
      if (Math.abs(c.x - p.x) > radius + 0.14) continue;
      for (const e of c.units) {
        if (e.z < z - radius) break;
        if (e.alive && (e.x - p.x) ** 2 + (e.z - z) ** 2 < radius * radius) this.kill(e, 1.18, p.x);
      }
    }
    for (const e of this.runners)
      if (e.alive && (e.x - p.x) ** 2 + (e.z - z) ** 2 < radius * radius) this.kill(e, 1.18, p.x);
    this.event('impact', p.x, 0.06, z, p.power);
  }
  advanceShots(dt) {
    const remaining = [];
    for (const p of this.shots) {
      p.age += dt;
      const next = p.z - dt * (p.kind === 'rocket' ? 15.8 : 24.8);
      const hit = this.shotHit(p, next);
      if (!hit) {
        p.z = next;
        p.y = p.kind === 'rocket' ? Math.max(0.72, p.originY - 0.17 * p.age) : p.originY;
        if (p.z > -51) remaining.push(p);
        continue;
      }
      const e = hit.target;
      if (hit.type === 'wall') {
        e.hp = Math.max(0, e.hp - p.damage * 0.72);
        e.flash = 1;
        this.event(
          e.hp <= 0 ? 'wallBreak' : 'wallHit',
          p.x,
          0.85,
          e.z + 0.22,
          p.kind === 'rocket' ? 1.15 : 0.45,
        );
      } else if (hit.type === 'boss') {
        e.hp = Math.max(0, e.hp - p.damage);
        e.hit = p.kind === 'rocket' ? 0.77 : Math.max(e.hit, 0.10);
        if (p.kind === 'rocket') this.event('impact', p.x, 0.25, e.z + 0.43, p.power * 0.7);
        if (e.hp <= 0) {
          this.finish(true);
          break;
        }
      } else if (p.kind === 'rocket') {
        this.blast(p, e.z);
      } else {
        this.kill(e, 0.72);
        this.event('hit', e.x, 0.45, e.z, 0.65);
      }
    }
    this.shots = remaining;
  }
  updateFalling(dt) {
    for (const e of this.falling) {
      e.t += dt;
      e.x += e.vx * dt;
      e.z += e.vz * dt + this.worldAdvance * 0.38;
      e.y += e.vy * dt;
      e.vy -= 8.6 * dt;
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
      b.slam = Math.min(1, b.attackT / 1.02);
      if (b.attackT >= 0.8 && !b.impactDone) {
        b.impactDone = true;
        this.event('slam', b.x, 0.08, b.z + 1.0, 2.1);
        if (Math.abs(b.x - this.x) < 2.25 && Math.abs(b.z) < 2.7) {
          this.finish(false);
          return;
        }
      }
      if (b.attackT >= 1.09) {
        b.slam = 0;
        b.attackT = 0;
        b.recovery = 0.55;
      }
      return;
    }
    b.z = Math.min(-1.18, b.z + dt * 2.48);
    b.x += clamp(this.x - b.x, -dt * 1.46, dt * 1.46);
    if (b.z > -2.05 && Math.abs(b.x - this.x) < 1.7 && b.recovery <= 0) {
      b.attackT = 0.001;
      b.impactDone = false;
    }
  }
  finish(win) {
    if (!this.playing) return;
    this.phase = win ? 'won' : 'lost';
    this.endTime = 0;
    if (win) {
      this.event('victory', this.boss.x, 0.55, this.boss.z, 2);
    } else {
      this.event('loss', this.x, 0, 0);
      for (const a of this.allies) this.fall(a, 'blue', 1.45, this.x);
      this.allies = [];
      this.event('impact', this.x, 0, 0, 1.6);
    }
  }
  tick(dt, axis = 0) {
    this.worldAdvance = 0;
    if (!this.playing) {
      if (this.phase === 'won' || this.phase === 'lost') {
        this.endTime += dt;
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
    this.x += (this.targetX - this.x) * (1 - Math.exp(-21 * dt));
    this.velocity = (this.x - oldX) / Math.max(dt, 0.001);
    const speed = this.boss.active ? 2.3 : 3.65;
    const blocked = this.wall.hp > 0 && this.blueDistance >= WALL_AT - 4.25 && this.x > 2.5;
    this.worldAdvance = blocked ? 0 : speed * dt;
    this.distance += this.worldAdvance;
    this.blueDistance += speed * dt;
    if (this.wall.hp > 0) this.blueDistance = Math.min(this.blueDistance, WALL_AT - 4.25);
    this.wall.z = this.blueDistance - WALL_AT;
    this.crossGates();
    for (const a of this.allies) {
      a.age += dt;
      const [dx, dz] = formation(a.slot, this.scale);
      const target = clamp(this.x + dx, -6.28, 6.28);
      a.x += (target - a.x) * (1 - Math.exp(-19 * dt));
      a.z += (dz - a.z) * (1 - Math.exp(-14 * dt));
    }
    this.advanceCrowd(dt);
    this.updateFalling(dt);
    if (!this.playing) return;
    this.advanceBoss(dt);
    if (!this.playing) return;
    this.shoot(dt);
    this.advanceShots(dt);
  }
}
