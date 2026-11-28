import {
  rifleRound,
  pulseRound,
  cannonRound,
  plasmaRound,
  shotRange,
  extendedRange,
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
import { advanceSkill, bosses } from './boss-skills.js';
import { bossStep, clearLanding, closestSquadMember, escortPassage } from './boss-pursuit.js';
import { cardWidth, courseCards, supplies } from './supplies.js';
import { campaign, isOpening, laneCenter, lastStage, terrainPiece } from './campaign.js';
import {
  hitMechanism,
  updateTerrain,
  steerTerrain,
  finaleGap,
  startVault,
  vaultPose,
} from './encounters.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const TAU = Math.PI * 2;
const WALL_AT = 21;
const HALF_ROAD = 5.45;
export const retreatRange = 1.38;
const COLUMNS = 11;
const MARCH_SPEED = 2.47;
const waveLanes = [[-1, 1], [1, 0], [-1, 0], [1], [0, -1], [1, -1], [0], [0, 1], [-1]];
const PACK_ROWS = 11;

/** 军团四阶进化体系定义 */
export const EVOLUTION_TIERS = [
  { tier: 1, name: '登陆新兵', need: 0, fireRate: 1.0, critBonus: 0, blastBonus: 1.0 },
  { tier: 2, name: '突击精锐', need: 14, fireRate: 1.06, critBonus: 0.08, blastBonus: 1.06 },
  { tier: 3, name: '重装连队', need: 38, fireRate: 1.12, critBonus: 0.14, blastBonus: 1.16 },
  { tier: 4, name: '钢铁军团', need: 76, fireRate: 1.18, critBonus: 0.2, blastBonus: 1.24 },
];

/** 原地压缩数组，避免 60fps 热循环频繁创建新数组触发 GC */
function compact(list, keep) {
  let write = 0;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (keep(item)) list[write++] = item;
  }
  list.length = write;
}

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
    this.stage = clamp(Math.trunc(Number(stage)) || 1, 1, lastStage);
    this.route = campaign[this.stage - 1];
    this.features = this.route.features.map((spec) => terrainPiece(spec, this.stage));
    this.activeGround = [];
    this.flanks = [];
    this.rope = null;
    this.planks = 0;
    this.overrun = null;
    this.parade = null;
    this.chill = 0;
    this.hint = null;
    this.hintSequence = 0;
    this.rallyZ = -100;
    this.seed = 129920 + (this.stage - 1) * 1141;
    this.sequence = 0;
    this.phase = 'ready';
    this.elapsed = 0;
    this.distance = 0;
    this.captainZ = 0;
    this.targetZ = 0;
    this.caught = false;
    this.caughtBy = null;
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
    this.buffs = {
      rapid: 0,
      shield: 0,
      plasma: 0,
      spread: 0,
      drone: 0,
      fever: 0,
      frost: 0,
      range: 0,
      longshot: 0,
    };
    this.supportTimer = 0;
    this.feverMeter = 0;
    // 军团进化、连击暴击、战术超载大招与局外加成状态
    this.bonuses = {
      extraAllies: 0,
      cannonMult: 1,
      critChanceBonus: 0,
      overdriveRateMult: 1,
      startingOverdrive: 0,
    };
    this.evoPoints = 0;
    this.tier = 1;
    this.combo = 0;
    this.maxCombo = 0;
    this.comboTimer = 0;
    this.overdrive = 0;
    this.overdriveActive = 0;
    this.popups = [];
    this._frontage = [];
    this.row = 0;
    this.toNextRow = 0;
    this.entryZ ??= -46;
    this.finaleRow = this.route.finale;
    this.lastRow = this.finaleRow + (this.route.siege ? 30 : 18);
    this.hitGuard = 0;
    this.score = 0;
    this.recruits = 0;
    this.endTime = 0;
    const wallHP = this.route.wallHP;
    this.wall = { x: 4.13, z: -WALL_AT, hp: wallHP, maxHp: wallHP, flash: 0 };
    const bossHP = this.route.bossHP;
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
      removed: false,
      skill: null,
      nextCast: 0,
      kind: this.route.boss,
      vault: null,
      moveClock: 0,
      special: 0,
      pattern: 0,
      brace: 0,
      defeatAge: 0,
      enraged: false,
      attackT: 0,
      impactDone: false,
      pursuing: false,
      yaw: 0,
      recovery: 0,
      leapFromX: 0,
      leapFromZ: 0,
      landX: 0,
      landZ: 0,
    };
    this.gates = courseCards(this.stage, this.features);
    this.gates[2].cover = this.wall;
    for (const card of this.gates) {
      if (!card.coverSpec) continue;
      card.cover = terrainPiece(card.coverSpec, this.stage);
      this.features.push(card.cover);
    }
    this.bossEntryStride = 8.15;
    this.bossStride = 1.02 + Math.min(0.27, (this.stage - 1) * 0.014);
    this.marchSpeed = MARCH_SPEED + Math.min(0.28, (this.stage - 1) * 0.012);
    this.wave = null;
    this.columns = Array.from({ length: COLUMNS }, (_, index) => ({
      index,
      minX: Infinity,
      maxX: -Infinity,
      units: [],
    }));
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
  event(kind, x, y, z, strength = 1, supply = null) {
    this.emit({ kind, x, y, z, strength, supply });
  }
  notice(text) {
    this.hint = { id: ++this.hintSequence, text };
  }
  start() {
    if (this.phase !== 'ready') return;
    this.phase = 'run';
    if (this.stage === 1) this.notice('左右移动，对准 +3 招募士兵');
  }
  aim(x, z = this.targetZ) {
    this.targetZ = clamp(z, 0, retreatRange);
    this.targetX = clamp(x, -HALF_ROAD, HALF_ROAD);
  }
  get playing() {
    return this.phase === 'run' || this.phase === 'boss' || this.phase === 'clear';
  }
  get roadSpeed() {
    if (!this.boss.active) return 3.65;
    if (this.boss.defeated) return 2.3;
    // Ease the convoy's pace as the boss reaches the fighting distance. The road
    // still moves under every card, gap and soldier during the duel.
    return 2.3 - 1.48 * smoothRange(this.boss.z, -16, -10);
  }
  get cannonDamage() {
    const base = 26 + this.upgrades * 5 + Math.round((this.stage - 1) * 0.88);
    return Math.round(base * (this.bonuses?.cannonMult || 1));
  }
  /** 注入军械整备永久加成（仅局内 UI 流程调用，保持基础单测确定性） */
  applyBonuses(bonuses) {
    if (!bonuses) return;
    this.bonuses = { ...this.bonuses, ...bonuses };
    if (bonuses.startingOverdrive > 0) {
      this.overdrive = Math.min(100, bonuses.startingOverdrive);
    }
    const extra = Math.max(0, Math.trunc(bonuses.extraAllies || 0));
    for (let i = 0; i < extra; i++) this.recruit(this.x, true);
  }
  /** 推送一条 3D 世界坐标飘浮战斗文字，由主循环每帧消费渲染 */
  addPopup(x, y, z, text, kind = 'dmg') {
    if (this.popups.length >= 24) return;
    this.popups.push({ x, y, z, text, kind });
  }
  /** 累加连击并维护最高纪录 */
  addCombo(amount = 1) {
    if (!this.playing) return;
    this.combo += amount;
    if (this.combo > this.maxCombo) this.maxCombo = this.combo;
    this.comboTimer = 3.2;
  }
  /** 累加战术超载充能槽（0~100） */
  addOverdrive(amount) {
    if (!this.playing || this.overdriveActive > 0) return;
    const rate = this.bonuses?.overdriveRateMult || 1;
    this.overdrive = Math.min(100, this.overdrive + amount * rate);
  }
  /** 累加进化经验并在突破阈值时触发军团阶梯进化 */
  addEvo(points) {
    if (!this.playing) return;
    this.evoPoints += points;
    let next = this.tier;
    for (const def of EVOLUTION_TIERS) {
      if (this.evoPoints >= def.need) next = def.tier;
    }
    if (next > this.tier) {
      this.tier = next;
      const def = EVOLUTION_TIERS[next - 1];
      this.mergeGlow = 1;
      this.scale = Math.max(this.scale, 1 + (next - 1) * 0.1 + Math.min(0.45, this.upgrades * 0.1));
      this.event('evolve', this.x, 0.35, this.captainZ, 1.2);
      this.addPopup(this.x, 2.25, this.captainZ, `进化 Lv.${next} ${def.name}`, 'evolve');
      this.notice(`军团进化！Lv.${next} ${def.name}`);
    }
  }
  /** 当前连击带来的伤害倍率 */
  get comboDamageMult() {
    if (this.combo >= 80) return 1.18;
    if (this.combo >= 40) return 1.12;
    if (this.combo >= 15) return 1.06;
    return 1;
  }
  /** 当前总暴击几率 */
  get critChance() {
    const tierBonus = EVOLUTION_TIERS[(this.tier || 1) - 1].critBonus;
    const comboBonus = this.combo >= 80 ? 0.16 : this.combo >= 40 ? 0.1 : this.combo >= 15 ? 0.05 : 0;
    const odBonus = this.overdriveActive > 0 ? 0.35 : 0;
    return Math.min(0.85, tierBonus + comboBonus + odBonus + (this.bonuses?.critChanceBonus || 0));
  }
  /** 主动释放「战术超载 · 终极齐射」大招 */
  triggerOverdrive() {
    if (!this.playing || this.caught || this.overdrive < 100 || this.overdriveActive > 0) return false;
    this.overdrive = 0;
    this.overdriveActive = 4.2;
    this.buffs.shield = Math.max(this.buffs.shield, 1.8);
    this.mergeGlow = 1;
    this.recoil = 1;
    this.event('overdrive', this.x, 0.4, this.captainZ, 1.5);
    this.addPopup(this.x, 2.35, this.captainZ, '战术超载 · 齐射!', 'evolve');
    this.notice('战术超载启动！全队火力超频');
    // 瞬间向前方扇形倾泻 5 枚高爆暴击重炮
    const power = (1 + Math.min(1.7, this.upgrades * 0.28)) * 1.3;
    const y = 1.32 * this.visualScale;
    const z = this.captainZ - 0.55 * this.visualScale;
    for (const slope of [-0.24, -0.12, 0, 0.12, 0.24]) {
      const shot = this.launch(
        this.x + slope * 1.1,
        y,
        z,
        cannonRound,
        power,
        Math.round(this.cannonDamage * 1.35),
        slope,
      );
      if (shot) shot.crit = true;
    }
    return true;
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
      z: this.captainZ + dz,
      age: initial ? 2 : 0,
      phase: this.rand() * TAU,
    });
    if (!initial) this.recruits++;
  }
  openCard(card) {
    if (!card.active || card.cover?.hp > 0) return;
    card.active = false;
    card.collectedAt = this.elapsed;
    card.pop = 0;
    this.event('supplyBreak', card.x, 0.62, card.z, 1, card.type);
    this.addOverdrive(6.5);
    this.addEvo(card.type === 'merge' ? 8 : 3);
    if (card.type === 'blast') {
      // The charge bursts into the ranks beside the card, on the same stretch of bridge.
      const blastX = card.x;
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
      f.z = f.sz + (this.captainZ + dz - f.sz) * travel;
      f.y =
        0.46 * (1 - t) + Math.sin(Math.PI * t) * (1.05 + Math.min(1.25, Math.abs(f.sz) * 0.075));
      if (t < 1) continue;
      if (f.slot != null) {
        this.recruit(this.x, false, f.slot);
        this.addEvo(1.8);
        this.event('plus', f.x, 0.12, f.z, 0.7);
      } else {
        if (f.type === 'merge') {
          this.upgrades++;
          this.scale = 1 + Math.min(0.64, this.upgrades * 0.13);
          this.addPopup(this.x, 2.0, this.captainZ, '炮击 +5', 'buff');
        } else if (f.type === 'engineer') {
          this.planks = Math.min(2, this.planks + 1);
          this.notice('便桥 +1，靠近缺口自动架桥');
        } else if (f.type === 'medic') {
          this.armor = Math.min(3, this.armor + 1);
          for (let i = 0; i < 2; i++) this.recruit(this.x);
          this.notice('救援到队，护甲 +1');
        } else if (f.type === 'range' || f.type === 'longshot') {
          this.buffs[f.type] = f.type === 'range' ? 7 : 5.5;
          this.notice(f.type === 'range' ? '全队远射 · 7秒' : '穿甲远射 · 5.5秒');
        } else {
          const duration = f.type === 'fever' ? 4.2 : f.type === 'shield' ? 5 : 6;
          this.buffs[f.type] = duration;
        }
        this.mergeGlow = 1;
        this.event('merge', this.x, 0.23, this.captainZ, 1, f.type);
      }
    }
    compact(this.deliveries, (f) => f.progress < 1);
  }
  crossGates() {
    for (const g of this.gates) {
      g.z = this.distance - g.at;
      if (!g.active) {
        g.pop = this.elapsed - g.collectedAt;
        continue;
      }
      if (this.caught || Math.abs(g.z - this.captainZ) > 0.83) continue;
      if (Math.abs(this.x - g.x) <= cardWidth / 2 + this.scale * 0.16) this.openCard(g);
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
    const span = Math.max(0.2, side > 0 ? 6.4 - b.x : b.x + 6.4);
    const across = clamp(Math.abs(unit.laneX - b.x) / span, 0, 1);
    const targetX = unit.laneX + side * gap * (1 - across);
    unit.x += (targetX - unit.x) * (1 - Math.exp(-9 * dt));
    if (!gap && Math.abs(unit.x - unit.laneX) < 0.002) unit.x = unit.laneX;
  }
  spawnRow() {
    const pack = Math.floor(this.row / PACK_ROWS);
    const inPack = this.row % PACK_ROWS;
    if (!this.wave || this.row % (PACK_ROWS * 2) === 0) {
      const index = Math.floor(pack / 2) + (this.stage - 1) * 2;
      const mirror = this.stage % 2 ? 1 : -1;
      this.wave = waveLanes[index % waveLanes.length].map((lane) => lane * mirror);
      // Predict where this pack will meet a guarded card. Leave its firing lane clear
      // on alternating exchanges and send the packed ranks down the adjacent lane.
      const exchangeAt = this.distance + 6 + ((-this.entryZ - 6) * 3.65) / (3.65 + this.marchSpeed);
      const prize = this.gates.find((g) => g.coverSpec && Math.abs(g.at - exchangeAt) < 5.2);
      if (prize && index % 3 !== 2) {
        const lane = prize.coverSpec.lane;
        this.wave = this.wave.filter((value) => value !== lane);
        if (!this.wave.length) this.wave = [lane === 0 ? mirror : 0];
      }
    }
    const single = this.wave.length === 1;
    // The last formation escorts the boss in narrower files; the player can now
    // read the boss's windup and concentrate fire between the two flanks.
    const escort = this.row >= this.finaleRow - 44;
    const fileFraction = escort ? (this.route.siege ? 0.8 : 0.52) : 1;
    for (const c of this.columns) {
      const i = c.index;
      const fullWidth = single ? 9 : i < 6 ? 6 : 5;
      const size = Math.max(
        2,
        Math.round(
          Math.min(fullWidth, fullWidth * (0.32 + 0.68 * this.route.pressure)) * fileFraction,
        ),
      );
      const file = single || i < 6 ? i : i - 6;
      const lane = this.wave[single || i < 6 ? 0 : 1];
      if (file >= size || (inPack < 2 && (file === 0 || file === size - 1))) continue;
      const spacing = single ? 0.43 : 0.52;
      const side = ((this.row % 2) - 0.5) * 0.15;
      const x = laneCenter(lane) + (file - (size - 1) / 2) * spacing + side;
      const entry = this.entryZ - 0.86 - 0.12 * (file % 2);
      const last = c.units.at(-1);
      const z = last ? Math.min(entry, last.z - 0.4) : entry;
      const e = this.grunt(x, z);
      c.minX = Math.min(c.minX, e.x);
      c.maxX = Math.max(c.maxX, e.x);
      if (inPack === 5 && c.index === (pack * 7) % COLUMNS && this.stage >= 2) {
        const roles = ['gunner'];
        if (this.stage >= 3) roles.push('weaver', 'brute', 'vault');
        if (this.stage >= 4) roles.push('guard');
        if (this.stage >= 5) roles.push('bomber', 'standard');
        if (this.stage >= 7) roles.push('courier');
        e.role = roles[(pack + this.stage) % roles.length];
        const heavy = e.role === 'brute' || e.role === 'guard';
        e.size *= heavy ? 1.42 : 1.1;
        e.hp = heavy ? 9 + this.stage * 0.65 : 3.2 + this.stage * 0.27;
        e.speed = heavy ? 2.02 : e.role === 'weaver' ? 3.47 : 2.77;
        this.runners.push(e);
      } else if (
        inPack === 2 &&
        (c.index === (pack * 3) % COLUMNS || c.index === (pack * 3 + 5) % COLUMNS)
      ) {
        e.speed = 3.4 + this.rand() * 0.25;
        this.runners.push(e);
      } else {
        c.units.push(e);
      }
    }
    this.row++;
  }
  moveGrunt(e, dt, frontage) {
    // After a breakthrough the final survivors turn back into the firing line.
    // Let an attacker finish crossing its victim before it turns.
    if (
      this.phase === 'clear' &&
      (e.spent || e.z > this.captainZ + 0.75) &&
      (!e.overBody || e.z > e.overBody.z + 1.06)
    ) {
      e.spent = true;
      e.overBody = null;
      const x = this.x + ((e.id % 5) - 2) * 0.28;
      const z = this.captainZ - 2.15 - (e.id % 3) * 0.28;
      const dx = clamp(x - e.x, -5.1 * dt, 5.1 * dt);
      const dz = clamp(z - e.z, -4.7 * dt, 4.7 * dt);
      e.x += dx;
      e.z += dz;
      e.marched += Math.hypot(dx, dz - this.worldAdvance);
      if (Math.abs(dz) + Math.abs(dx) > 0.001)
        e.yaw += (Math.atan2(dx, dz) - e.yaw) * (1 - Math.exp(-7 * dt));
      return;
    }
    const run = e.speed >= 3.12;
    const charging =
      !e.spent && e.z >= this.captainZ + (run ? -8.4 : -6.9) && e.z < this.captainZ + 1.65;
    const oldX = e.x;
    let speed = e.speed ?? this.marchSpeed;
    let lateral = 0;
    if (charging) {
      let targetX = this.x,
        targetZ = this.captainZ,
        best = Math.abs(targetX - e.x);
      for (const a of frontage) {
        const dist = Math.abs(a.x - e.x);
        if (dist < best) {
          best = dist;
          targetX = a.x;
          targetZ = a.z;
        }
      }
      // Start on the feet and accelerate into the charge. Even the opposite outer lane
      // can reach the squad. Slight offsets keep a group of attackers from stacking.
      speed *= run ? 1.48 : 1.32;
      const closing = Math.max(0.075, (targetZ - e.z - 0.32) / (this.worldAdvance / dt + speed));
      const tracking = run ? 12.2 : 11.6;
      const slot = ((e.id % 7) - 3) * 0.065;
      lateral = clamp((targetX + slot - e.x) / closing, -tracking, tracking) * dt;
      if (e.role === 'weaver') lateral += Math.sin(e.phase + e.marched * 7) * dt * 0.74;
      e.x += lateral;
    } else if (e.spent) {
      if (e.overX != null) e.x += clamp(e.overX - e.x, -3.3 * dt, 3.3 * dt);
    } else if (this.boss.active && !this.boss.defeated) {
      const oldX = e.x;
      this.marchPastBoss(e, dt);
      lateral = e.x - oldX;
    }
    if (this.activeGround.length) steerTerrain(this, e, dt);
    else e.lift = 0;
    if (!e.alive) return;
    if (this.buffs.frost > 0) {
      speed *= 0.48;
      e.x = oldX + (e.x - oldX) * 0.6;
    }
    if (Math.abs(e.z - this.rallyZ) < 2.7) speed *= 1.17;
    lateral = e.x - oldX;
    const forward = speed * dt;
    e.z += this.worldAdvance + forward;
    e.marched += Math.hypot(forward, lateral);
    e.yaw += (Math.atan2(lateral, forward) - e.yaw) * (1 - Math.exp(-9 * dt));
    if (e.role === 'gunner' && !e.fired && e.z >= -14 && e.z < -4 && this.enemyFireTimer <= 0) {
      this.enemyRound(e.x, e.z, 0.65, 0, e);
      e.fired = true;
    }
    if (!e.spent && e.z > this.captainZ - 2 && e.z < this.captainZ + 2.3) this.contact(e);
  }
  advanceCrowd(dt) {
    this.rallyZ =
      this.runners.find((e) => e.alive && e.role === 'standard' && e.z > -10)?.z ?? -100;
    const frontage = this._frontage;
    frontage.length = 0;
    for (let i = 0; i < this.allies.length; i++) {
      const a = this.allies[i];
      if (a.z <= this.captainZ + 0.18) frontage.push(a);
    }
    for (const c of this.columns) {
      c.minX = Infinity;
      c.maxX = -Infinity;
      let count = 0,
        reordered = false;
      for (const e of c.units) {
        if (!e.alive) continue;
        this.moveGrunt(e, dt, frontage);
        if (!e.alive || (e.z > 10 && this.phase !== 'clear')) continue;
        c.minX = Math.min(c.minX, e.x);
        c.maxX = Math.max(c.maxX, e.x);
        if (count && c.units[count - 1].z < e.z) reordered = true;
        c.units[count++] = e;
      }
      c.units.length = count;
      if (reordered) c.units.sort((a, b) => b.z - a.z);
    }
    for (const e of this.runners) if (e.alive) this.moveGrunt(e, dt, frontage);
    compact(this.runners, (e) => e.alive && (e.z < 10 || this.phase === 'clear'));
    // Issue a row only after the preceding rank has travelled its physical spacing.
    this.toNextRow -= this.worldAdvance + this.marchSpeed * dt;
    while (this.row < this.lastRow && this.toNextRow <= 0) {
      this.spawnRow();
      this.toNextRow += this.route.rowSpacing + (this.row % PACK_ROWS === 0 ? 0.38 : 0);
      if (
        this.row >= 70 &&
        Math.abs(this.row - this.finaleRow) > 10 &&
        (this.row - 70) % this.route.restEvery === 0
      )
        this.toNextRow += this.route.restLength;
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
    const projectile = e.startZ != null;
    if (projectile || e.role === 'bomber') e.alive = false;
    else {
      e.spent = true;
      e.overX = victim >= 0 ? this.allies[victim].x : this.x;
    }
    if (this.hitGuard > 0) return true;
    this.hitGuard = this.buffs.shield > 0 ? 0.46 : this.route.contactGrace;
    if (this.buffs.shield > 0) {
      this.event('shieldHit', e.x, 0.35, e.z);
      return true;
    }
    this.hurt = 1;
    if (this.combo >= 5) {
      this.combo = 0;
      this.comboTimer = 0;
    }
    if (e.role === 'bomber') {
      this.event('impact', e.x, 0.1, e.z, 0.87);
      this.allies = this.allies.filter((a) => {
        if (Math.hypot(a.x - e.x, a.z - e.z) > 0.95) return true;
        this.fall(a, 'blue', 1.2, e.x);
        return false;
      });
      if (hitsCaptain && !this.allies.length && --this.armor <= 0) {
        this.lossReason = 'infantry';
        this.finish(false, e);
      }
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
    if (victim >= 0) {
      const ally = this.allies.splice(victim, 1)[0];
      const body = this.fall(ally, 'blue', 0);
      body.prone = true;
      body.dir = ally.x >= e.x ? 1 : -1;
      if (!projectile) {
        e.overX = ally.x;
        e.overBody = body;
      }
    } else if (--this.armor <= 0) {
      this.lossReason = projectile && e.shooter === this.boss ? 'bossShot' : 'infantry';
      this.finish(false, projectile ? e.shooter : e);
    }
    return true;
  }
  enemyRound(x, z, y, offset = 0, shooter = this.boss) {
    const speed = 7.4;
    const dx = this.x + offset - x,
      dz = Math.max(1, this.captainZ - z);
    const distance = Math.hypot(dx, dz);
    this.incoming.push({
      x,
      z,
      y,
      startY: y,
      startZ: z,
      shooter,
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
      if (p.z > this.captainZ - 2 && p.z < this.captainZ + 2.3 && this.contact(p))
        this.event('hostileMuzzle', p.x, p.y, p.z);
    }
    compact(this.incoming, (p) => p.alive && p.z < 6);
  }
  pushWall(dt, wall = this.wall, half = 2.14) {
    const touches = (x, z, r) =>
      wall.hp > 0 && Math.abs(x - wall.x) < half + r && Math.abs(z - wall.z) < 0.32 + r;
    this.allies = this.allies.filter((a) => {
      if (!touches(a.x, a.z, 0.19)) return true;
      this.fall(a, 'blue', 0);
      const pushed = this.falling[this.falling.length - 1];
      pushed.pushed = true;
      pushed.front = wall.z + 0.55;
      return false;
    });
    if (!this.caught && touches(this.x, this.captainZ, 0.32 * this.visualScale)) {
      this.caught = true;
      this.caughtBy = wall;
    }
    if (this.caught && this.caughtBy === wall) {
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
    if (!e.alive || (e.overBody && e.z < e.overBody.z + 0.84)) return;
    e.alive = false;
    this.score++;
    this.addCombo(1);
    this.addOverdrive(0.62);
    this.addEvo(0.16);
    if (this.buffs.fever <= 0) {
      this.feverMeter += 0.21;
      if (this.feverMeter >= 100) {
        this.feverMeter = 0;
        this.buffs.fever = 4.2;
        this.event('merge', this.x, 0.2, this.captainZ);
      }
    }
    this.fall(e, 'red', force, x);
    if (e.role === 'courier' && this.playing) {
      const card = { x: e.x, z: e.z, type: 'medic', active: true };
      this.openCard(card);
    }
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
      range: this.buffs.range > 0 || this.buffs.longshot > 0 ? extendedRange : shotRange,
      age: 0,
      afterHit: 0,
      finished: false,
      pierce:
        profile === plasmaRound ? 3 : this.buffs.longshot > 0 && profile !== cannonRound ? 1 : 0,
    };
    let obstacle = this.firstHit(shot, shot.range);
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
        shot.range = Math.min(shot.range, distance + 0.75);
        obstacle = this.firstHit(shot, shot.range);
      }
    }
    shot.aimDistance = Math.max(0.12, obstacle ? obstacle.distance : shot.range);
    shot.endY =
      obstacle?.target === this.boss
        ? bosses[this.boss.kind].aim
        : obstacle?.target === this.wall || obstacle?.target.type || obstacle?.target.mechanism
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
      !obstacle?.target.type &&
      !obstacle?.target.mechanism
    ) {
      shot.aimDistance = Math.max(0.12, bossDistance);
      shot.endY = bosses[this.boss.kind].aim;
    }
    shot.lift = profile.lift * Math.min(1, shot.aimDistance / 9);
    this.shots.push(shot);
    return shot;
  }
  shoot(dt) {
    const tierDef = EVOLUTION_TIERS[(this.tier || 1) - 1];
    const boosted = this.buffs.fever > 0 || this.overdriveActive > 0;
    const cadence =
      ((boosted ? 0.62 : this.buffs.rapid > 0 ? 0.72 : 1) * (this.chill > 0 ? 1.32 : 1)) /
      tierDef.fireRate;
    const critRate = this.critChance;
    this.rocketTimer -= dt;
    if (this.rocketTimer <= 0) {
      this.rocketTimer += 0.69 * cadence;
      this.recoil = 1;
      const x = this.x + 0.295 * this.visualScale;
      const y = 1.31 * this.visualScale;
      const z = this.captainZ - 0.6 * this.visualScale;
      const power = (1 + Math.min(1.7, this.upgrades * 0.28)) * tierDef.blastBonus;
      const rocket = this.launch(x, y, z, cannonRound, power, this.cannonDamage);
      if (rocket && critRate > 0 && this.rand() < critRate) rocket.crit = true;
      // 进化到 Lv.4 钢铁军团时，主炮齐射附带双联等离子翼弹
      if (this.tier >= 4) {
        for (const side of [-1, 1]) {
          const wing = this.launch(
            this.x + side * 0.48 * this.visualScale,
            y * 0.85,
            z + 0.1,
            plasmaRound,
            1,
            Math.round(this.cannonDamage * 0.28),
            side * 0.085,
          );
          if (wing) wing.crit = true;
        }
      }
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
        const isElite =
          this.tier >= 4 ||
          (this.tier === 3 && a.slot % 2 === 0) ||
          (this.tier === 2 && a.slot % 4 === 0);
        const energy =
          (boosted || this.buffs.plasma > 0) && (a.slot + this.volley) % 3 === 0;
        const profile = energy
          ? plasmaRound
          : isElite || a.slot % 4 === 1
            ? pulseRound
            : rifleRound;
        const baseDmg = energy ? 6 : isElite ? 3.2 : 2.8;
        const shot = this.launch(x, 0.58, z, profile, 1, baseDmg);
        if (shot && critRate > 0 && this.rand() < critRate * (isElite ? 1.25 : 0.7)) {
          shot.crit = true;
        }
        if ((boosted || this.buffs.spread > 0) && a.slot % 2 === 0)
          this.launch(x, 0.58, z, rifleRound, 1, 2.8, (this.volley % 2 ? 1 : -1) * 0.09);
      }
      if (this.allies.length) this.event('smallShot', this.x, 0.6, 0, 0.7);
    }
    this.supportTimer -= dt;
    if ((this.buffs.drone > 0 || this.overdriveActive > 0) && this.supportTimer <= 0) {
      this.supportTimer = 0.36;
      for (const side of [-1, 1]) {
        const s = this.launch(this.x + side * 1.15, 1.3, this.captainZ - 0.32, plasmaRound, 1, 6);
        if (s && this.overdriveActive > 0) s.crit = true;
      }
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
      if (e.overBody && e.z < e.overBody.z + 0.84) return;
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
      if (shot.aimDistance !== undefined && e !== this.wall && !e.type && !e.mechanism) {
        const bottom = e.lift || 0;
        const top =
          bottom + (e === this.boss ? bosses[e.kind].height : 0.92 * (e.size || 1)) + padding;
        const y0 = flightHeight(shot, shot.distance + enter);
        const y1 = flightHeight(shot, shot.distance + exit);
        if (Math.min(y0, y1) > top || Math.max(y0, y1) < bottom - padding) return;
        if (y0 > top && y0 > y1) enter += ((exit - enter) * (y0 - top)) / (y0 - y1);
      }
      first = { target: e, distance: enter };
    };
    const minX = Math.min(shot.x, endX);
    const maxX = Math.max(shot.x, endX);
    if (this.wall.hp > 0 && this.wall.z >= endZ - 0.5 && this.wall.z <= shot.z + 0.5)
      check(this.wall, 2.1, 0.32);
    for (const p of this.features)
      if (
        p.target &&
        p.state === 'ready' &&
        p.target.z >= endZ - 0.7 &&
        p.target.z <= shot.z + 0.7 &&
        p.target.x + p.half + padding >= minX &&
        p.target.x - p.half - padding <= maxX
      )
        check(p.target, p.half, p.depth);
    for (const card of this.gates) {
      if (
        card.active &&
        !(card.cover?.hp > 0) &&
        card.z >= endZ - 0.36 &&
        card.z <= shot.z + 0.36 &&
        card.x + cardWidth / 2 + padding >= minX &&
        card.x - cardWidth / 2 - padding <= maxX
      )
        check(card, cardWidth / 2, 0.15);
    }
    if (this.boss.active && !this.boss.defeated) check(this.boss, 1.26, 0.7);
    for (const c of this.columns) {
      if (c.maxX < minX - 0.42 || c.minX > maxX + 0.42) continue;
      for (const e of c.units) {
        if (e.z < endZ - 0.42) break;
        if (e.alive && e.z < shot.z + 0.42) check(e, 0.245, 0.23);
      }
    }
    for (const e of this.runners) {
      if (
        e.alive &&
        e.z >= endZ - 0.5 &&
        e.z <= shot.z + 0.5 &&
        e.x + 0.5 >= minX &&
        e.x - 0.5 <= maxX
      )
        check(e, 0.25 * e.size, 0.23 * e.size);
    }
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
    b.hp = Math.max(0, b.hp - damage * (b.brace > 0.6 ? 0.55 : 1));
    b.hit = shot.kind === 'rocket' ? 0.77 : Math.max(b.hit, 0.1);
    if (b.hp <= 0) {
      b.defeated = true;
      b.skill = null;
      b.defeatAge = 0;
      this.phase = 'clear';
      this.lastRow = this.row;
      this.event('finisher', b.x, 2.3, b.z, 1.5);
    }
  }
  resolveHit(shot, target) {
    if (target.mechanism) {
      hitMechanism(this, target.mechanism, shot);
      return;
    }
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
      else this.event('cardHit', shot.x, 0.6, shot.z, 0.7, target.type);
    } else if (target === this.boss) {
      const crit = Boolean(shot.crit);
      const mult = this.comboDamageMult * (crit ? 1.48 : 1);
      const raw = shot.damage * (shot.profile === cannonRound ? 4.2 : 1) * mult;
      const effective = raw * (this.boss.brace > 0.6 ? 0.55 : 1);
      this.event(
        shot.kind === 'rocket' ? 'impact' : crit ? 'critHit' : 'hit',
        shot.x,
        shot.y,
        shot.z,
        shot.kind === 'rocket' ? shot.power * 0.75 : crit ? 0.95 : 0.7,
      );
      if (shot.kind === 'rocket' || crit) {
        this.addPopup(
          shot.x + (this.rand() - 0.5) * 0.45,
          shot.y + 0.42,
          shot.z,
          crit ? `${Math.round(effective)}!` : `${Math.round(effective)}`,
          crit ? 'crit' : 'rocket',
        );
      }
      this.addOverdrive(shot.kind === 'rocket' ? 2.4 : 0.35);
      if (shot.kind === 'rocket') this.addCombo(1);
      else if (this.comboTimer > 0) this.comboTimer = Math.max(this.comboTimer, 2.4);
      this.damageBoss(shot, raw);
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
      const crit = Boolean(shot.crit);
      const dmg = shot.damage * (crit ? 1.5 : 1);
      if (target.hp != null)
        target.hp -= dmg * (target.role === 'guard' && shot.profile !== plasmaRound ? 0.65 : 1);
      if (target.hp == null || target.hp <= 0) this.kill(target, crit ? 1.05 : 0.72);
      if (crit && target.role) {
        this.addPopup(shot.x, 0.9, shot.z, `${Math.round(dmg)}!`, 'crit');
      }
      this.event(crit ? 'critHit' : 'hit', shot.x, 0.45, shot.z, crit ? 0.85 : 0.65);
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
      if (e.prone) {
        e.t += dt;
        e.z += this.worldAdvance;
        continue;
      }
      if (e.intoGap) {
        e.t += dt;
        e.vy -= dt * 8;
        e.y += e.vy * dt;
        e.z += this.worldAdvance;
        continue;
      }
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
    compact(this.falling, (e) => e.t < (e.prone ? (this.overrun ? 4.9 : 2.1) : 1.02));
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
    if (this.combo >= 5) {
      this.combo = 0;
      this.comboTimer = 0;
    }
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
      if (!b.removed) b.z += this.worldAdvance;
      if (before < 1.62 && b.defeatAge >= 1.62) {
        b.removed = true;
        this.event('bossBurst', b.x, 0.62, b.z - 1.15, 1.4);
      }
      if (
        b.removed &&
        b.defeatAge > 2.05 &&
        !this.flanks.length &&
        !this.deliveries.length &&
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
        if (this.route.vault) finaleGap(this);
        else b.x = b.escortX = escortPassage(this, b.z - 1.3, b.z + 6).x;
      }
      return;
    }
    advanceSkill(this, dt);
    if (!this.playing) return;
    if (b.vault) {
      vaultPose(this, dt);
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
        b.recovery = 1.14;
      }
      return;
    }
    for (const p of this.activeGround) {
      if (p.crossed || !isOpening(p) || Math.abs(b.x - p.x) > 1.9) continue;
      const lip = p.z - p.length / 2 - b.z;
      if (lip <= 1.05 && lip >= -0.5) {
        startVault(this, p);
        return;
      }
    }
    b.moveClock += dt;
    const cycle = b.moveClock % 5.2;
    b.brace =
      b.kind === 'warden'
        ? smoothRange(cycle, 0.92, 1.32) * (1 - smoothRange(cycle, 2.45, 2.95))
        : 0;
    b.special =
      b.kind === 'drill' ? smoothRange(cycle, 1.1, 1.55) * (1 - smoothRange(cycle, 2.35, 2.85)) : 0;
    const rush = b.skill?.kind === 'warden' && b.skill.fired && !b.skill.marks[0].hit ? 2.2 : 0;
    if (!b.pursuing && b.z >= this.captainZ - 9.7) b.pursuing = true;
    const target = b.pursuing ? closestSquadMember(this) : null;
    // Cover the far, heavily foreshortened approach briskly, then settle into fighting stride.
    const approach = 1 - smoothRange(b.z, -23, -15);
    const pace = b.pursuing
      ? 2.75
      : this.bossStride + (this.bossEntryStride - this.bossStride) * approach;
    const stride = dt * pace * (1 - 0.38 * b.brace + 0.78 * b.special + rush);
    bossStep(this, dt, target, stride);
    if (b.kind === 'kestrel' && b.z > -11 && b.z < -7 && !b.glided && !b.skill) {
      b.glided = true;
      b.vault = { piece: { z: b.z + 2 }, from: -2, to: 2.1, t: 0, airDash: true };
      return;
    }
    if (!b.pursuing || b.recovery > 0 || b.skill) return;
    const nearest = closestSquadMember(this);
    if (nearest.distance > 3.38) return;
    const landX = clamp(nearest.x, -5.32, 5.32);
    const landZ = nearest.z;
    if (!clearLanding(this, landX, landZ - 0.68)) return;
    b.leapFromX = b.x;
    b.leapFromZ = b.z;
    b.landX = landX;
    b.landZ = landZ;
    b.attackT = 0.001;
    b.impactDone = false;
  }
  landBoss() {
    this.event('victory', this.boss.x, 0.1, this.boss.z - 1.35, 1.05);
  }
  finish(win, attacker = null) {
    if (!this.playing) return;
    this.phase = win ? 'won' : 'lost';
    this.endTime = 0;
    this.shots = [];
    this.incoming = [];
    if (win) {
      // Sort each row from left to right so the squad can close ranks without crossing.
      const ranks = [...this.allies].sort((a, b) => a.z - b.z);
      for (let i = 0; i < ranks.length; i += 5) {
        const row = ranks.slice(i, i + 5).sort((a, b) => a.x - b.x);
        row.forEach((ally, file) => {
          ally.exitX = (file - (row.length - 1) / 2) * 0.58;
          ally.exitZ = 0.98 + Math.floor(i / 5) * 0.64;
        });
      }
      this.parade = { complete: false, originX: this.x };
      this.recoil = 0;
      this.event('rally', this.x, 0.14, this.captainZ);
      return;
    }
    this.event('loss', this.x, 0, this.captainZ);
    if (this.lossReason === 'infantry') {
      let leader = attacker?.alive && attacker.id ? attacker : null;
      if (!leader) {
        const consider = (e) => {
          if (!e.alive || e.z > this.captainZ + 0.36) return;
          if (
            !leader ||
            Math.hypot(e.x - this.x, e.z - this.captainZ) <
              Math.hypot(leader.x - this.x, leader.z - this.captainZ)
          )
            leader = e;
        };
        for (const c of this.columns) for (const e of c.units) consider(e);
        this.runners.forEach(consider);
      }
      if (!leader) {
        leader = this.grunt(this.x, this.entryZ - 1);
        this.runners.push(leader);
      }
      this.overrun = {
        x: this.x,
        z: this.captainZ,
        crossed: false,
        attacker: leader.id,
        approach: Math.max(2.35, (this.captainZ - leader.z + 1.6) / 4.0),
      };
      for (const a of this.allies) {
        const body = this.fall(a, 'blue', 0);
        body.prone = true;
        body.dir = a.x >= this.x ? 1 : -1;
      }
      this.allies = [];
    } else this.event('impact', this.x, 0, this.captainZ, 1.25);
  }
  advanceOverrun(dt) {
    const scene = this.overrun;
    this.worldAdvance = 0.36 * dt;
    this.distance += this.worldAdvance;
    this.captainZ += this.worldAdvance;
    scene.z = this.captainZ;
    this.wall.z += this.worldAdvance;
    for (const g of this.gates) g.z += this.worldAdvance;
    for (const p of this.features) p.z += this.worldAdvance;
    const march = (e) => {
      if (!e.alive || e.z > 10) return;
      const leader = e.id === scene.attacker;
      let advance =
        (leader
          ? Math.max((e.speed || MARCH_SPEED) * 1.68, scene.approach)
          : (e.speed || MARCH_SPEED) * 1.68) * dt;
      let dx = 0;
      if ((leader || e.z > scene.z - 7) && e.z < scene.z + 0.46) {
        const offset = e.id === scene.attacker ? 0 : ((e.id % 7) - 3) * 0.15;
        const speedX = leader ? 11 : 4.9;
        dx = clamp(scene.x + offset - e.x, -speedX * dt, speedX * dt);
        e.x += dx;
      }
      if (leader && Math.abs(e.x - scene.x) > 0.43 && e.z < scene.z + 0.48)
        advance = Math.min(advance, Math.max(0, scene.z + 0.15 - e.z));
      const before = e.z;
      e.z += advance + this.worldAdvance;
      e.marched += Math.hypot(dx, advance);
      e.yaw += (Math.atan2(dx, advance) - e.yaw) * (1 - Math.exp(-8 * dt));
      if (before < scene.z + 1.05 && e.z >= scene.z + 1.05 && Math.abs(e.x - scene.x) < 1.15)
        scene.crossed = true;
    };
    for (const c of this.columns) for (const e of c.units) march(e);
    this.runners.forEach(march);
  }
  advanceParade(dt) {
    const parade = this.parade;
    if (parade.complete) return;
    const t = this.endTime;
    const speed = (7.4 + Math.min(18, t * 8.6)) * smoothRange(t, 0.12, 0.58);
    const dz = speed * dt;
    this.x = parade.originX * (1 - smoothRange(t, 0.16, 1.65));
    this.velocity = 0;
    this.captainZ -= dz;
    let tail = this.captainZ;
    for (const ally of this.allies) {
      ally.age += dt;
      ally.x += (this.x + ally.exitX - ally.x) * (1 - Math.exp(-4.8 * dt));
      ally.z -= dz;
      ally.z += (this.captainZ + ally.exitZ - ally.z) * (1 - Math.exp(-4.2 * dt));
      tail = Math.max(tail, ally.z);
    }
    parade.complete = tail < this.entryZ - 2.8;
  }
  get resultReady() {
    if (this.parade) return this.parade.complete;
    if (this.boss.defeated && this.boss.defeatAge < 2.05) return false;
    return this.overrun ? this.overrun.crossed && this.endTime >= 2.5 : this.endTime > 0.86;
  }
  tick(dt, axis = 0, back = 0) {
    this.worldAdvance = 0;
    if (!this.playing) {
      if (this.phase === 'won' || this.phase === 'lost') {
        this.endTime += dt;
        if (this.parade) this.advanceParade(dt);
        if (this.overrun) this.advanceOverrun(dt);
        if (this.phase === 'lost' && this.boss.defeated && this.boss.defeatAge < 2.05)
          this.advanceBoss(dt);
        this.boss.hit = Math.max(0, this.boss.hit - 4 * dt);
        this.updateFalling(dt);
      }
      return;
    }
    this.elapsed += dt;
    this.chill = Math.max(0, this.chill - dt);
    this.overdriveActive = Math.max(0, this.overdriveActive - dt);
    if (this.comboTimer > 0) {
      this.comboTimer = Math.max(0, this.comboTimer - dt);
      if (this.comboTimer <= 0) this.combo = 0;
    }
    for (const key of Object.keys(this.buffs)) this.buffs[key] = Math.max(0, this.buffs[key] - dt);
    for (const card of this.gates) card.flash = Math.max(0, card.flash - dt * 7);
    this.hitGuard = Math.max(0, this.hitGuard - dt);
    this.hurt = Math.max(0, this.hurt - 4 * dt);
    this.mergeGlow = Math.max(0, this.mergeGlow - 2.25 * dt);
    this.recoil = Math.max(0, this.recoil - 5.1 * dt);
    this.wall.flash = Math.max(0, this.wall.flash - 4.6 * dt);
    this.boss.hit = Math.max(0, this.boss.hit - 5.4 * dt);
    this.visualScale += (this.scale - this.visualScale) * (1 - Math.exp(-8 * dt));
    if (this.caught && this.caughtBy?.hp <= 0) {
      this.caught = false;
      this.caughtBy = null;
    }
    if (axis || back) {
      const x = axis * (this.targetX - this.x) < 0 ? this.x : this.targetX;
      this.aim(x + axis * 10.2 * dt, this.targetZ + back * 3.1 * dt);
    }
    if (!this.caught) this.captainZ += (this.targetZ - this.captainZ) * (1 - Math.exp(-16 * dt));
    const oldX = this.x;
    if (this.rope) {
      const r = this.rope;
      r.age += dt;
      this.x = r.from + (r.to - r.from) * smoothRange(r.age, 0, 0.58);
      if (r.age >= 0.58) {
        this.rope = null;
        this.aim(r.to);
      }
    } else if (!this.caught) this.x += (this.targetX - this.x) * (1 - Math.exp(-26 * dt));
    this.velocity = (this.x - oldX) / Math.max(dt, 0.001);
    this.worldAdvance = this.roadSpeed * dt;
    this.distance += this.worldAdvance;
    this.wall.z = this.distance - WALL_AT;
    updateTerrain(this, dt);
    if (!this.playing) return;
    this.crossGates();
    this.updateDeliveries(dt);
    for (const a of this.allies) {
      a.age += dt;
      const [dx, dz] = formation(a.slot, this.scale);
      const target = clamp(this.x + dx, -6.28, 6.28);
      a.x += (target - a.x) * (1 - Math.exp(-19 * dt));
      a.z += (this.captainZ + dz - a.z) * (1 - Math.exp(-14 * dt));
    }
    this.pushWall(dt);
    for (const p of this.features)
      if (
        (p.kind === 'cache' || (p.kind === 'cover' && p.variant !== 'glass')) &&
        p.state === 'ready' &&
        p.z > -4 &&
        p.z < 11
      )
        this.pushWall(dt, p, p.half);
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
