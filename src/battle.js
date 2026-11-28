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
  slamCycle,
  slamRadius,
  slamStrike,
  smoothRange,
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
import { UNIT_DEFS, assignSquadPositions, findMergeRecipe, squadSummary } from './units.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const TAU = Math.PI * 2;
const WALL_AT = 21;
const HALF_ROAD = 5.45;
export const retreatRange = 1.65;
const COLUMNS = 11;
const MARCH_SPEED = 2.52;
const waveLanes = [[-1, 1], [1, 0], [-1, 0], [1], [0, -1], [1, -1], [0], [0, 1], [-1]];
const PACK_ROWS = 11;

/** 军团四阶整体进化阶梯定义（同步展示当前合成最高阶段） */
export const EVOLUTION_TIERS = [
  { tier: 1, name: '新兵排', need: 0, fireRate: 1.0, critBonus: 0, blastBonus: 1.0 },
  { tier: 2, name: '重装合成连', need: 14, fireRate: 1.08, critBonus: 0.08, blastBonus: 1.08 },
  { tier: 3, name: '重炮突击营', need: 36, fireRate: 1.15, critBonus: 0.15, blastBonus: 1.18 },
  { tier: 4, name: '钢铁泰坦军团', need: 72, fireRate: 1.22, critBonus: 0.22, blastBonus: 1.28 },
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

export class Battle {
  constructor(emit = () => {}) {
    this.emit = emit;
    this.reset();
  }

  get allies() {
    return this.squad;
  }
  set allies(v) {
    this.squad = v;
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
    // 开局绝不自带队长，纯以 3 名普通蓝盔小兵起家，靠招募与合成一步步演化大兵和队长
    this.squad = [];
    this.merges = []; // 合成飞旋汇聚演出队列
    this.lightningArcs = []; // 3D 锯齿闪电链瞬态特效队列
    this.falling = [];
    this.deliveries = [];
    this.runners = [];
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
    this.lastRow = this.finaleRow + (this.route.siege ? 24 : 16);
    this.hitGuard = 0;
    this.score = 0;
    this.recruits = 0;
    this.mergeCount = 0;
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
      defeatKnockStage: 0,
      knockbackVel: 0,
      enraged: false,
      // 连续举手砸地状态机
      attackT: 0,
      slamChain: 0,
      slamHand: 0, // 0=左重砸, 1=右重砸, 2=双拳爆裂重砸
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
    this.bossStride = 1.08 + (this.stage - 1) * 0.14;
    this.marchSpeed = MARCH_SPEED + (this.stage - 1) * 0.12;
    this.wave = null;
    this.columns = Array.from({ length: COLUMNS }, (_, index) => ({
      index,
      minX: Infinity,
      maxX: -Infinity,
      units: [],
    }));

    // 开局 3 名普通蓝盔小兵列阵出发（没有初始队长）
    for (let i = 0; i < 3; i++) this.recruit(this.x, true, 'rifle');
    this.refreshFormation(true);
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
      // 增大敌方普通小兵体型（约 +28%），压迫感与清晰度更强
      size: 1.18 + this.rand() * 0.16,
      alive: true,
    };
  }

  event(kind, x, y, z, strength = 1, supply = null) {
    this.emit({ kind, x, y, z, strength, supply });
  }

  notice(text) {
    this.hint = { id: ++this.hintSequence, text };
  }

  addPopup(x, y, z, text, kind = 'dmg') {
    if (this.popups.length >= 26) return;
    this.popups.push({ x, y, z, text, kind });
  }

  addLightning(ax, ay, az, bx, by, bz) {
    if (this.lightningArcs.length >= 28) return;
    this.lightningArcs.push({ ax, ay, az, bx, by, bz, age: 0, life: 0.24 });
  }

  start() {
    if (this.phase !== 'ready') return;
    this.phase = 'run';
    if (this.stage === 1) this.notice('先吃「步兵+3」，再吃金门「合成进化」合出大兵！');
    else if (this.stage === 2) this.notice('雷霆林谷：注意弯道巨木，打爆电磁塔清屏！');
    else this.notice('熔心裂谷：躲避熔岩喷发，合出终极钢铁指挥官！');
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
    if (this.boss.defeated) return 2.1;
    return 2.25 - 1.55 * smoothRange(this.boss.z, -16, -9);
  }

  /** 军团实时总火力读数（HUD 展示用） */
  get cannonDamage() {
    const sum = squadSummary(this.squad);
    const bonusMult = (this.bonuses?.cannonMult || 1) * (1 + this.upgrades * 0.08);
    return Math.max(10, Math.round(sum.power * bonusMult));
  }

  /** 当前军团内最高阶兵种级别（1~4） */
  get highestUnitTier() {
    let top = 1;
    for (const u of this.squad) {
      const t = UNIT_DEFS[u.kind].tier;
      if (t > top) top = t;
    }
    return top;
  }

  /** 注入局外军械整备永久加成 */
  applyBonuses(bonuses) {
    if (!bonuses) return;
    this.bonuses = { ...this.bonuses, ...bonuses };
    if (bonuses.startingOverdrive > 0) {
      this.overdrive = Math.min(100, bonuses.startingOverdrive);
    }
    const extra = Math.max(0, Math.trunc(bonuses.extraAllies || 0));
    for (let i = 0; i < extra; i++) this.recruit(this.x, true, 'rifle');
    this.refreshFormation(true);
  }

  /** 重新排布阵型（重盾最前 -> 步兵/特兵外围 -> T2大兵中层 -> T3队长/T4指挥官居中核心） */
  refreshFormation(snap = false) {
    assignSquadPositions(this.squad);
    const top = this.highestUnitTier;
    this.scale = 1 + (top - 1) * 0.16;
    if (snap) {
      for (const u of this.squad) {
        u.x = clamp(this.x + u.formX, -6.2, 6.2);
        u.z = this.captainZ + u.formZ;
      }
    }
  }

  /** 招募指定兵种进入队列 */
  recruit(x, initial = false, kind = 'rifle') {
    if (this.squad.length >= 44) {
      // 满编时自动尝试触发一次合成腾出空位
      if (!this.performMerge(1, true)) return null;
    }
    const def = UNIT_DEFS[kind] || UNIT_DEFS.rifle;
    const unit = {
      id: ++this.sequence,
      kind: def.id,
      hp: def.hp,
      maxHp: def.hp,
      x: clamp(x + (this.rand() - 0.5) * 0.5, -6.2, 6.2),
      z: this.captainZ + (this.rand() - 0.5) * 0.4,
      formX: 0,
      formZ: 0,
      age: initial ? 2 : 0,
      phase: this.rand() * TAU,
      hurt: 0,
      recoil: 0,
      fireTimer: 0.08 + this.rand() * 0.24,
      slot: this.squad.length,
    };
    this.squad.push(unit);
    if (!initial) {
      this.recruits++;
      this.addEvo(def.tier === 1 ? 1.5 : 4.5);
    }
    this.refreshFormation(initial);
    return unit;
  }

  /**
   * 核心多级合成进化引擎：
   * 从队列中挑选材料小兵/特兵/大兵，创建物理飞旋汇聚光体，融合诞生更高阶兵种！
   */
  performMerge(maxChains = 2, autoCrowded = false) {
    let mergedAny = false;
    for (let step = 0; step < maxChains; step++) {
      const match = findMergeRecipe(this.squad, autoCrowded);
      if (!match) break;
      mergedAny = true;
      this.mergeCount++;
      const sortedIdx = [...match.consumedIndices].sort((a, b) => b - a);
      const consumed = [];
      let cx = 0,
        cz = 0;
      for (const idx of sortedIdx) {
        const u = this.squad.splice(idx, 1)[0];
        consumed.push(u);
        cx += u.x;
        cz += u.z;
      }
      cx /= consumed.length;
      cz /= consumed.length;

      // 诞生新兵种并赋予合成出生弹跳效果
      const born = this.recruit(cx, false, match.output);
      if (born) {
        born.x = cx;
        born.z = cz;
        born.age = 0;
        born.mergeBirth = 1;
        for (const u of consumed) {
          this.merges.push({
            sx: u.x,
            sz: u.z,
            x: u.x,
            z: u.z,
            y: 0.2,
            kind: u.kind,
            target: born,
            age: 0,
            duration: 0.34,
          });
        }
      }

      const outDef = UNIT_DEFS[match.output];
      this.mergeGlow = 1;
      this.addOverdrive(10);
      this.addEvo(outDef.tier * 6);
      this.event(outDef.tier >= 3 ? 'evolve' : 'merge', cx, 0.55, cz, 1 + outDef.tier * 0.2);
      this.addPopup(cx, 1.85 + outDef.tier * 0.25, cz, match.label, 'evolve');
      if (outDef.tier >= 3) this.notice(match.label);
      this.refreshFormation(false);
    }
    // 如果点击合成门时暂时不够配方材料，赠送 2 名强化步兵并提振火力避免空门挫败感
    if (!mergedAny && !autoCrowded) {
      this.upgrades++;
      for (let i = 0; i < 2; i++) this.recruit(this.x, false, 'rifle');
      this.addPopup(this.x, 1.8, this.captainZ, '增援强化 +2!', 'buff');
      this.event('merge', this.x, 0.3, this.captainZ, 1);
    }
    return mergedAny;
  }

  addCombo(amount = 1) {
    if (!this.playing) return;
    this.combo += amount;
    if (this.combo > this.maxCombo) this.maxCombo = this.combo;
    this.comboTimer = 3.4;
  }

  addOverdrive(amount) {
    if (!this.playing || this.overdriveActive > 0) return;
    const rate = this.bonuses?.overdriveRateMult || 1;
    this.overdrive = Math.min(100, this.overdrive + amount * rate);
  }

  addEvo(points) {
    if (!this.playing) return;
    this.evoPoints += points;
    const topUnit = this.highestUnitTier;
    let next = Math.max(this.tier, topUnit);
    for (const def of EVOLUTION_TIERS) {
      if (this.evoPoints >= def.need && def.tier > next) next = def.tier;
    }
    if (next > this.tier) {
      this.tier = next;
      const def = EVOLUTION_TIERS[next - 1];
      this.mergeGlow = 1;
      this.event('evolve', this.x, 0.35, this.captainZ, 1.25);
      this.addPopup(this.x, 2.35, this.captainZ, `军团进阶 · ${def.name}`, 'evolve');
    }
  }

  get comboDamageMult() {
    if (this.combo >= 80) return 1.2;
    if (this.combo >= 40) return 1.12;
    if (this.combo >= 15) return 1.06;
    return 1;
  }

  get critChance() {
    const tierBonus = EVOLUTION_TIERS[(this.tier || 1) - 1].critBonus;
    const comboBonus = this.combo >= 80 ? 0.16 : this.combo >= 40 ? 0.1 : this.combo >= 15 ? 0.05 : 0;
    const odBonus = this.overdriveActive > 0 ? 0.38 : 0;
    return Math.min(0.85, tierBonus + comboBonus + odBonus + (this.bonuses?.critChanceBonus || 0));
  }

  /** 主动大招：「战术超载 · 5联齐射」 */
  triggerOverdrive() {
    if (!this.playing || this.caught || this.overdrive < 100 || this.overdriveActive > 0) return false;
    this.overdrive = 0;
    this.overdriveActive = 4.4;
    this.buffs.shield = Math.max(this.buffs.shield, 2.0);
    this.mergeGlow = 1;
    this.recoil = 1;
    this.event('overdrive', this.x, 0.4, this.captainZ, 1.55);
    this.addPopup(this.x, 2.4, this.captainZ, '战术超载 · 终极齐射!', 'evolve');
    this.notice('战术超载启动！全军超频 + 护盾守护');
    const baseDmg = Math.max(36, Math.round(this.cannonDamage * 0.52));
    for (const slope of [-0.24, -0.12, 0, 0.12, 0.24]) {
      const shot = this.launch(
        this.x + slope * 1.15,
        1.28,
        this.captainZ - 0.5,
        cannonRound,
        1.55,
        baseDmg,
        slope,
      );
      if (shot) shot.crit = true;
    }
    return true;
  }

  openCard(card) {
    if (!card.active || card.cover?.hp > 0) return;
    card.active = false;
    card.collectedAt = this.elapsed;
    card.pop = 0;
    this.event('supplyBreak', card.x, 0.62, card.z, 1, card.type);
    this.addOverdrive(7);

    if (card.type === 'blast') {
      const blastX = card.x;
      this.blast({ x: blastX, power: 6.2 }, card.z - 1.5);
      if (this.boss.active && Math.hypot(this.boss.x - blastX, this.boss.z - card.z + 1.5) < 5.0)
        this.damageBoss({ kind: 'rocket' }, 140);
      return;
    }

    const def = supplies[card.type] || supplies.plus;
    if (def.count) {
      const unitKind = def.unitKind || 'rifle';
      for (let i = 0; i < def.count; i++) {
        this.deliveries.push({
          type: card.type,
          unitKind,
          slot: i,
          sx: card.x,
          sz: card.z,
          x: card.x,
          z: card.z,
          y: 0.46,
          age: -i * 0.055,
          progress: 0,
          phase: this.rand() * TAU,
        });
      }
      return;
    }

    this.deliveries.push({
      type: card.type,
      slot: null,
      sx: card.x,
      sz: card.z,
      x: card.x,
      z: card.z,
      y: 0.46,
      age: 0,
      progress: 0,
      phase: this.rand() * TAU,
    });
  }

  updateDeliveries(dt) {
    for (const f of this.deliveries) {
      f.age += dt;
      if (f.age < 0) continue;
      const t = Math.min(1, f.age / 0.5);
      const travel = t * (2 - t);
      f.progress = t;
      f.x = f.sx + (this.x - f.sx) * travel;
      f.z = f.sz + (this.captainZ - f.sz) * travel;
      f.y =
        0.46 * (1 - t) + Math.sin(Math.PI * t) * (1.0 + Math.min(1.2, Math.abs(f.sz) * 0.07));
      if (t < 1) continue;

      if (f.slot != null) {
        this.recruit(this.x, false, f.unitKind || 'rifle');
        this.event('plus', f.x, 0.16, f.z, 0.75);
      } else if (f.type === 'merge') {
        this.performMerge(2, false);
      } else if (f.type === 'double') {
        // ×2 扩编：复制一批小兵并立即触发一次自动合成进化！
        const addCount = Math.min(10, Math.max(4, Math.floor(this.squad.length * 0.75)));
        for (let i = 0; i < addCount; i++) this.recruit(this.x, false, 'rifle');
        this.addPopup(this.x, 2.0, this.captainZ, `×2 扩编 +${addCount}!`, 'evolve');
        this.event('evolve', this.x, 0.3, this.captainZ, 1.15);
        this.performMerge(1, true);
      } else if (f.type === 'engineer') {
        this.planks = Math.min(2, this.planks + 1);
        this.notice('便桥 +1，靠近缺口自动架桥');
        this.event('merge', this.x, 0.23, this.captainZ, 1, f.type);
      } else {
        const duration = f.type === 'fever' ? 4.8 : f.type === 'shield' ? 5.5 : 6.5;
        this.buffs[f.type] = duration;
        this.mergeGlow = 1;
        this.addPopup(this.x, 1.9, this.captainZ, supplies[f.type].label + '!', 'buff');
        this.event('merge', this.x, 0.23, this.captainZ, 1, f.type);
      }
    }
    compact(this.deliveries, (f) => f.progress < 1);

    // 推进合成飞旋汇聚光球动画
    for (const m of this.merges) {
      m.age += dt;
      const t = clamp(m.age / m.duration, 0, 1);
      const tx = m.target ? m.target.x : this.x;
      const tz = m.target ? m.target.z : this.captainZ;
      const swirl = (1 - t) * Math.sin(t * Math.PI * 2.5) * 0.55;
      m.x = m.sx + (tx - m.sx) * t * t + swirl;
      m.z = m.sz + (tz - m.sz) * t * t;
      m.y = 0.25 + Math.sin(Math.PI * t) * 0.95;
    }
    compact(this.merges, (m) => m.age < m.duration);
  }

  crossGates() {
    for (const g of this.gates) {
      g.z = this.distance - g.at;
      if (!g.active) {
        g.pop = this.elapsed - g.collectedAt;
        continue;
      }
      if (this.caught || Math.abs(g.z - this.captainZ) > 0.9) continue;
      if (Math.abs(this.x - g.x) <= cardWidth / 2 + 0.35) this.openCard(g);
    }
  }

  marchPastBoss(unit, dt) {
    const b = this.boss;
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
      const exchangeAt = this.distance + 6 + ((-this.entryZ - 6) * 3.65) / (3.65 + this.marchSpeed);
      const prize = this.gates.find((g) => g.coverSpec && Math.abs(g.at - exchangeAt) < 5.2);
      if (prize && index % 3 !== 2) {
        const lane = prize.coverSpec.lane;
        this.wave = this.wave.filter((value) => value !== lane);
        if (!this.wave.length) this.wave = [lane === 0 ? mirror : 0];
      }
    }
    const single = this.wave.length === 1;
    const escort = this.row >= this.finaleRow - 40;
    const fileFraction = escort ? (this.route.siege ? 0.72 : 0.5) : 1;
    for (const c of this.columns) {
      const i = c.index;
      const fullWidth = single ? 9 : i < 6 ? 6 : 5;
      const size = Math.max(
        2,
        Math.round(
          Math.min(fullWidth, fullWidth * (0.35 + 0.65 * this.route.pressure)) * fileFraction,
        ),
      );
      const file = single || i < 6 ? i : i - 6;
      const lane = this.wave[single || i < 6 ? 0 : 1];
      if (file >= size || (inPack < 2 && (file === 0 || file === size - 1))) continue;
      const spacing = single ? 0.54 : 0.64;
      const side = ((this.row % 2) - 0.5) * 0.16;
      const x = laneCenter(lane) + (file - (size - 1) / 2) * spacing + side;
      const entry = this.entryZ - 0.86 - 0.14 * (file % 2);
      const last = c.units.at(-1);
      const z = last ? Math.min(entry, last.z - 0.52) : entry;
      const e = this.grunt(x, z);
      c.minX = Math.min(c.minX, e.x);
      c.maxX = Math.max(c.maxX, e.x);
      if (inPack === 5 && c.index === (pack * 7) % COLUMNS) {
        const roles =
          this.stage === 1
            ? ['gunner', 'brute']
            : this.stage === 2
              ? ['gunner', 'guard', 'weaver', 'vault']
              : ['gunner', 'guard', 'bomber', 'brute', 'standard'];
        e.role = roles[(pack + this.stage) % roles.length];
        const heavy = e.role === 'brute' || e.role === 'guard';
        e.size *= heavy ? 1.32 : 1.1;
        e.hp = heavy ? 10 + this.stage * 2 : 4 + this.stage;
        e.speed = heavy ? 2.05 : e.role === 'weaver' ? 3.45 : 2.82;
        this.runners.push(e);
      } else if (
        inPack === 2 &&
        (c.index === (pack * 3) % COLUMNS || c.index === (pack * 3 + 5) % COLUMNS)
      ) {
        e.speed = 3.45 + this.rand() * 0.25;
        this.runners.push(e);
      } else {
        c.units.push(e);
      }
    }
    this.row++;
  }

  moveGrunt(e, dt, frontage) {
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
        best = Infinity;
      for (const a of frontage) {
        const dist = Math.abs(a.x - e.x);
        if (dist < best) {
          best = dist;
          targetX = a.x;
          targetZ = a.z;
        }
      }
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
      const ox = e.x;
      this.marchPastBoss(e, dt);
      lateral = e.x - ox;
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
    if (!e.spent && e.z > this.captainZ - 2.3 && e.z < this.captainZ + 2.3) this.contact(e);
  }

  advanceCrowd(dt) {
    this.rallyZ =
      this.runners.find((e) => e.alive && e.role === 'standard' && e.z > -10)?.z ?? -100;
    const frontage = this._frontage;
    frontage.length = 0;
    for (let i = 0; i < this.squad.length; i++) {
      const a = this.squad[i];
      if (a.z <= this.captainZ + 0.5) frontage.push(a);
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

  /**
   * 严格落实「敌兵优先打掉外围低阶小兵，而不是优先打掉我方高阶大兵」规则：
   * 优先级：重盾卫兵(shield) > T1普通/特种小兵 > T2大兵 > T3重炮队长 > T4钢铁指挥官。
   */
  pickVictimIndex(ex, ez, maxDist = 0.72) {
    let touched = false;
    for (let i = 0; i < this.squad.length; i++) {
      const a = this.squad[i];
      const rad = 0.36 * UNIT_DEFS[a.kind].scale;
      if (Math.abs(a.x - ex) < rad + 0.16 && Math.abs(a.z - ez) < rad + 0.16) {
        touched = true;
        break;
      }
    }
    if (!touched) return -1;

    // 在附近寻找最低阶的护卫士兵（先盾兵、再普通T1兵、再T2、再T3/T4）
    let bestIdx = -1;
    let bestRank = Infinity;
    let bestDist = Infinity;
    for (let i = 0; i < this.squad.length; i++) {
      const a = this.squad[i];
      const def = UNIT_DEFS[a.kind];
      const d = Math.hypot(a.x - ex, a.z - ez);
      // 只要有 T1 护卫在阵型拦截范围内，绝不越过他们去打核心大兵
      const allowRange = def.tier === 1 ? Math.max(maxDist, 2.35) : maxDist + def.scale * 0.25;
      if (d > allowRange) continue;
      const rank = a.kind === 'shield' ? 0 : def.tier;
      if (rank < bestRank || (rank === bestRank && d < bestDist)) {
        bestRank = rank;
        bestDist = d;
        bestIdx = i;
      }
    }
    return bestIdx;
  }

  /** 对单个我方士兵施加 1 点伤害；高阶大兵扣血闪红，血归零才倒地阵亡 */
  damageUnitAt(idx, originX, lossReason = 'infantry', knockForce = 0.85, attacker = null) {
    if (idx < 0 || idx >= this.squad.length) return false;
    const unit = this.squad[idx];
    unit.hp--;
    unit.hurt = 1;
    this.hurt = Math.max(this.hurt, 0.85);
    if (unit.hp > 0) {
      this.event('shieldHit', unit.x, 0.45, unit.z, 0.8);
      this.addPopup(unit.x, 1.15, unit.z, `HP ${unit.hp}/${unit.maxHp}`, 'rocket');
      return true;
    }
    this.squad.splice(idx, 1);
    const body = this.fall(unit, 'blue', knockForce, originX);
    body.size = UNIT_DEFS[unit.kind].scale;
    if (knockForce === 0) {
      body.prone = true;
      body.dir = unit.x >= originX ? 1 : -1;
    }
    this.refreshFormation(false);
    if (this.squad.length === 0) {
      this.lossReason = lossReason;
      this.finish(false, attacker);
    }
    return true;
  }

  /** 范围伤害（Boss 砸地、技能、陨石、滚木、熔岩）：同样严格优先消耗外围低阶小兵 */
  damageSquadArea(cx, cz, radius, maxVictims = 3, lossReason = 'slam', fxKind = '') {
    if (!this.playing || !this.squad.length) return 0;
    if (this.buffs.shield > 0) {
      this.event('shieldHit', this.x, 0.7, this.captainZ);
      return 0;
    }
    // 筛出圈内单位，并按“盾兵 -> T1小兵 -> T2大兵 -> T3/T4队长”从低到高排序
    const candidates = [];
    for (let i = 0; i < this.squad.length; i++) {
      const u = this.squad[i];
      const d = Math.hypot(u.x - cx, u.z - cz);
      if (d <= radius + 0.28 * UNIT_DEFS[u.kind].scale) {
        candidates.push({ u, d, rank: u.kind === 'shield' ? 0 : UNIT_DEFS[u.kind].tier });
      }
    }
    if (!candidates.length) return 0;
    candidates.sort((a, b) => a.rank - b.rank || a.d - b.d);

    let hits = 0;
    for (const item of candidates) {
      if (hits >= maxVictims || !this.playing) break;
      const idx = this.squad.indexOf(item.u);
      if (idx < 0) continue;
      this.damageUnitAt(idx, cx, lossReason, fxKind === 'engine' ? 1.5 : 1.15);
      hits++;
    }
    if (hits > 0 && this.combo >= 5) {
      this.combo = 0;
      this.comboTimer = 0;
    }
    return hits;
  }

  contact(e) {
    if (!this.playing || this.caught || !this.squad.length) return false;
    const victim = this.pickVictimIndex(e.x, e.z, 0.78);
    if (victim < 0) return false;

    const projectile = e.startZ != null;
    if (projectile || e.role === 'bomber') e.alive = false;
    else {
      e.spent = true;
      e.overX = this.squad[victim].x;
    }
    if (this.hitGuard > 0) return true;
    this.hitGuard = this.buffs.shield > 0 ? 0.36 : this.route.contactGrace;
    if (this.buffs.shield > 0) {
      this.event('shieldHit', e.x, 0.35, e.z);
      return true;
    }
    if (this.combo >= 6) {
      this.combo = 0;
      this.comboTimer = 0;
    }
    if (e.role === 'bomber') {
      this.event('impact', e.x, 0.1, e.z, 0.9);
      this.damageSquadArea(e.x, e.z, 1.35, 3, 'infantry');
      return true;
    }
    const target = this.squad[victim];
    const reason = projectile && e.shooter === this.boss ? 'bossShot' : 'infantry';
    this.damageUnitAt(victim, e.x, reason, projectile ? 0.7 : 0, projectile ? e.shooter : e);
    if (!projectile && target.hp <= 0 && this.falling.length) {
      e.overBody = this.falling[this.falling.length - 1];
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
      if (p.z > this.captainZ - 2.3 && p.z < this.captainZ + 2.3 && this.contact(p))
        this.event('hostileMuzzle', p.x, p.y, p.z);
    }
    compact(this.incoming, (p) => p.alive && p.z < 6);
  }

  pushWall(dt, wall = this.wall, half = 2.14) {
    const touches = (x, z, r) =>
      wall.hp > 0 && Math.abs(x - wall.x) < half + r && Math.abs(z - wall.z) < 0.34 + r;
    for (let i = this.squad.length - 1; i >= 0; i--) {
      const a = this.squad[i];
      if (!touches(a.x, a.z, 0.22)) continue;
      // 优先扫除触碰硬墙的外围小兵；只剩最后核心时推动整体
      if (this.squad.length > 1) {
        this.squad.splice(i, 1);
        const pushed = this.fall(a, 'blue', 0);
        pushed.pushed = true;
        pushed.front = wall.z + 0.55;
      }
    }
    if (!this.caught && touches(this.x, this.captainZ, 0.36)) {
      this.caught = true;
      this.caughtBy = wall;
    }
    if (this.caught && this.caughtBy === wall) {
      this.captainZ = Math.max(this.captainZ, wall.z + 0.42);
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
      vx: (e.x - origin) * 1.15 + (this.rand() - 0.5) * 3.1 * force,
      vz: (this.rand() - 0.5) * 2.6 * force,
      vy: (1.85 + this.rand() * 2.5) * force,
      spin: (this.rand() - 0.5) * 8.5,
      roll: (this.rand() - 0.5) * 7.5,
    };
    this.falling.push(body);
    return body;
  }

  kill(e, force = 1, x = e.x) {
    if (!e.alive || (e.overBody && e.z < e.overBody.z + 0.84)) return;
    e.alive = false;
    this.score++;
    this.addCombo(1);
    this.addOverdrive(0.75);
    this.addEvo(0.18);
    if (this.buffs.fever <= 0) {
      this.feverMeter += 0.25;
      if (this.feverMeter >= 100) {
        this.feverMeter = 0;
        this.buffs.fever = 4.2;
        this.event('merge', this.x, 0.2, this.captainZ);
      }
    }
    this.fall(e, 'red', force, x);
  }

  closeEnemy(x, z) {
    const radius = 2.6;
    let front = null;
    const consider = (e, bodyRadius) => {
      const ahead = z - e.z;
      if (ahead < 0 || ahead > radius + bodyRadius) return;
      if (Math.hypot(e.x - x, ahead) > radius + bodyRadius) return;
      if (!front || e.z > front.z || (e.z === front.z && Math.abs(e.x - x) < Math.abs(front.x - x)))
        front = e;
    };
    if (this.boss.active && !this.boss.defeated) consider(this.boss, 0.85);
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

  launch(x, y, z, profile, power, damage, slope = 0, weaponTag = '') {
    const forward = 1 / Math.hypot(1, slope);
    const shot = {
      kind: profile === cannonRound ? 'rocket' : 'shot',
      profile,
      weaponTag,
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
        profile === plasmaRound || weaponTag === 'tesla' || weaponTag === 'chainArc'
          ? 2
          : this.buffs.longshot > 0 && profile !== cannonRound
            ? 1
            : 0,
    };
    let obstacle = this.firstHit(shot, shot.range);
    if (slope === 0 && (!obstacle || obstacle.distance > 2.4)) {
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
    const bossDistance = (this.boss.z - z) / shot.headingZ;
    if (
      profile === cannonRound &&
      this.boss.active &&
      !this.boss.defeated &&
      bossDistance > 0 &&
      bossDistance < shot.range &&
      Math.abs(x + shot.headingX * bossDistance - this.boss.x) <= 1.3 &&
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

  /** 每个兵种按自己独立的武器、射速与弹道模式自动开火 */
  shoot(dt) {
    const tierDef = EVOLUTION_TIERS[(this.tier || 1) - 1];
    const boosted = this.buffs.fever > 0 || this.overdriveActive > 0;
    const rateMult =
      tierDef.fireRate *
      (boosted ? 1.55 : this.buffs.rapid > 0 ? 1.36 : 1) *
      (this.chill > 0 ? 0.75 : 1);
    const dmgMult = (this.bonuses?.cannonMult || 1) * (1 + this.upgrades * 0.08);
    const critRate = this.critChance;
    let firedSmall = false;

    for (const u of this.squad) {
      if (u.age < 0.14) continue;
      u.recoil = Math.max(0, u.recoil - dt * 5.2);
      const def = UNIT_DEFS[u.kind];
      u.fireTimer -= dt * rateMult * def.fireRate;
      if (u.fireTimer > 0) continue;

      const baseInterval =
        def.weapon === 'cannon' || def.weapon === 'titanCannon'
          ? 0.64
          : def.weapon === 'miniRocket'
            ? 0.56
            : 0.3;
      u.fireTimer += baseInterval;
      u.recoil = 1;
      const dmg = def.damage * dmgMult;
      const isCrit = critRate > 0 && this.rand() < critRate;
      const sx = u.x + 0.14 * def.scale;
      const sy = 0.58 * def.scale;
      const sz = u.z - 0.25 * def.scale;

      if (def.weapon === 'titanCannon') {
        // T4 钢铁指挥官：高爆巨炮 + 两侧等离子副炮齐射
        const main = this.launch(sx, sy * 1.15, sz - 0.25, cannonRound, 1.55, dmg, 0, 'titan');
        if (main && isCrit) main.crit = true;
        for (const side of [-1, 1]) {
          const w = this.launch(u.x + side * 0.55, sy, sz, plasmaRound, 1, dmg * 0.34, side * 0.09, 'chainArc');
          if (w) w.crit = true;
        }
        this.recoil = 1;
        this.event('muzzle', sx, sy * 1.15, sz - 0.25, 1.45);
      } else if (def.weapon === 'cannon') {
        // T3 重炮队长：高爆肩炮火箭
        const r = this.launch(sx, sy * 1.18, sz - 0.22, cannonRound, 1.25, dmg, 0, 'cannon');
        if (r && isCrit) r.crit = true;
        this.recoil = 1;
        this.event('muzzle', sx, sy * 1.18, sz - 0.22, 1.15);
      } else if (def.weapon === 'miniRocket') {
        // T2 烈焰火箭兵：爆燃榴弹火箭
        const r = this.launch(sx, sy * 1.05, sz, cannonRound, 0.85, dmg, 0, 'flame');
        if (r && isCrit) r.crit = true;
        this.event('muzzle', sx, sy, sz, 0.82);
      } else if (def.weapon === 'chainArc' || def.weapon === 'tesla') {
        // 电磁工兵 / T2 雷霆电浆兵：穿透闪电电弧
        const s = this.launch(sx, sy, sz, plasmaRound, 1, dmg, 0, def.weapon);
        if (s && isCrit) s.crit = true;
        firedSmall = true;
      } else if (def.weapon === 'twin') {
        // T2 双枪突击兵：双管并行连发
        for (const off of [-0.14, 0.14]) {
          const s = this.launch(u.x + off, sy, sz, pulseRound, 1, dmg * 0.65, off * 0.12, 'twin');
          if (s && isCrit) s.crit = true;
        }
        firedSmall = true;
      } else if (def.weapon === 'flame') {
        // T1 烈焰兵：炙热火球弹
        const s = this.launch(sx, sy, sz, pulseRound, 0.72, dmg, 0, 'flame');
        if (s) s.crit = true;
        firedSmall = true;
      } else {
        // T1 蓝盔步兵 / 重盾兵
        const energy = boosted || this.buffs.plasma > 0;
        const prof = energy ? plasmaRound : def.weapon === 'pulse' ? pulseRound : rifleRound;
        const s = this.launch(sx, sy, sz, prof, 1, energy ? dmg * 1.45 : dmg);
        if (s && isCrit) s.crit = true;
        if ((boosted || this.buffs.spread > 0) && u.id % 2 === 0) {
          this.launch(sx, sy, sz, rifleRound, 1, dmg * 0.9, (this.volley % 2 ? 1 : -1) * 0.085);
        }
        firedSmall = true;
      }
    }

    if (firedSmall) {
      this.volley++;
      this.event('smallShot', this.x, 0.6, this.captainZ, 0.7);
    }

    this.supportTimer -= dt;
    if ((this.buffs.drone > 0 || this.overdriveActive > 0) && this.supportTimer <= 0) {
      this.supportTimer = 0.34;
      for (const side of [-1, 1]) {
        const s = this.launch(
          this.x + side * 1.25,
          1.32,
          this.captainZ - 0.32,
          plasmaRound,
          1,
          8 * dmgMult,
          0,
          'chainArc',
        );
        if (s) s.crit = true;
      }
    }
  }

  /** 电磁武器命中后触发真实 3D 锯齿连锁闪电跳击周围红兵 */
  chainLightning(originX, originZ, primaryTarget, hops = 2, dmg = 8) {
    let cx = originX;
    let cz = originZ;
    const hitSet = new Set([primaryTarget]);
    for (let h = 0; h < hops; h++) {
      let best = null;
      let bestD = 3.2;
      for (const col of this.columns) {
        if (col.maxX < cx - 3.3 || col.minX > cx + 3.3) continue;
        for (const e of col.units) {
          if (!e.alive || hitSet.has(e)) continue;
          const d = Math.hypot(e.x - cx, e.z - cz);
          if (d < bestD) {
            bestD = d;
            best = e;
          }
        }
      }
      if (!best) break;
      hitSet.add(best);
      this.addLightning(cx, 0.58, cz, best.x, 0.58, best.z);
      if (best.hp != null) best.hp -= dmg;
      if (best.hp == null || best.hp <= 0) this.kill(best, 0.95, cx);
      cx = best.x;
      cz = best.z;
    }
  }

  firstHit(shot, travel) {
    const dx = shot.headingX;
    const dz = shot.headingZ;
    const endX = shot.x + dx * travel;
    const endZ = shot.z + dz * travel;
    const padding = shot.kind === 'rocket' ? 0.16 : 0.08;
    let first = null;
    const check = (e, w, d) => {
      if (e.overBody && e.z < e.overBody.z + 0.84) return;
      const half = w + padding;
      const depth = d + padding;
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
        p.target.z >= endZ - 0.8 &&
        p.target.z <= shot.z + 0.8 &&
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
    if (this.boss.active && !this.boss.defeated) check(this.boss, 1.32, 0.72);
    for (const c of this.columns) {
      if (c.maxX < minX - 0.42 || c.minX > maxX + 0.42) continue;
      for (const e of c.units) {
        if (e.z < endZ - 0.48) break;
        if (e.alive && e.z < shot.z + 0.48) check(e, 0.3, 0.28);
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
    const radius = 1.05 + p.power * 0.52;
    for (const c of this.columns) {
      if (c.maxX < p.x - radius || c.minX > p.x + radius) continue;
      for (const e of c.units) {
        if (e.z < z - radius) break;
        if (e.alive && (e.x - p.x) ** 2 + (e.z - z) ** 2 < radius * radius) this.kill(e, 1.25, p.x);
      }
    }
    for (const e of this.runners)
      if (e.alive && (e.x - p.x) ** 2 + (e.z - z) ** 2 < radius * radius) this.kill(e, 1.25, p.x);
    this.event('impact', p.x, 0.08, z, p.power);
  }

  damageBoss(shot, damage) {
    const b = this.boss;
    if (b.defeated) return;
    b.hp = Math.max(0, b.hp - damage * (b.brace > 0.6 ? 0.55 : 1));
    b.hit = shot.kind === 'rocket' ? 0.85 : Math.max(b.hit, 0.16);
    // 平时被重炮命中时也有轻微受击微退顿挫感
    if (shot.kind === 'rocket' && b.z > -18 && !b.vault) {
      b.z -= 0.08;
    }
    if (b.hp <= 0) {
      b.defeated = true;
      b.skill = null;
      b.attackT = 0;
      b.slamChain = 0;
      b.defeatAge = 0;
      b.defeatKnockStage = 0;
      b.knockbackVel = 7.4; // 初始被密集子弹猛烈向后击退的速度！
      this.phase = 'clear';
      this.lastRow = this.row;
      this.event('finisher', b.x, 2.1, b.z, 1.6);
      this.addPopup(b.x, 2.8, b.z, '击退终结!', 'evolve');
    }
  }

  resolveHit(shot, target) {
    if (target.mechanism) {
      hitMechanism(this, target.mechanism, shot);
      return;
    }
    if (target === this.wall) {
      target.hp = Math.max(0, target.hp - shot.damage * 0.76);
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
      const raw = shot.damage * (shot.profile === cannonRound ? 3.2 : 1) * mult;
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
          shot.x + (this.rand() - 0.5) * 0.5,
          shot.y + 0.45,
          shot.z,
          crit ? `${Math.round(effective)}!` : `${Math.round(effective)}`,
          crit ? 'crit' : 'rocket',
        );
      }
      this.addOverdrive(shot.kind === 'rocket' ? 2.5 : 0.4);
      if (shot.kind === 'rocket') this.addCombo(1);
      else if (this.comboTimer > 0) this.comboTimer = Math.max(this.comboTimer, 2.4);
      this.damageBoss(shot, raw);
    } else if (shot.kind === 'rocket' || shot.weaponTag === 'flame') {
      this.blast({ x: shot.x, power: shot.kind === 'rocket' ? shot.power : 0.55 }, target.z);
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
      if (shot.weaponTag === 'tesla' || shot.weaponTag === 'chainArc') {
        this.chainLightning(shot.x, shot.z, target, shot.weaponTag === 'chainArc' ? 3 : 2, dmg * 0.75);
      }
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

  /** Boss 单记举手重砸落地结算：震撼裂地并击飞落点内我方外围士兵 */
  slamSquad() {
    const b = this.boss;
    const isHeavyFinisher = b.slamHand === 2;
    const rad = isHeavyFinisher ? slamRadius * 1.18 : slamRadius;
    this.event('slam', b.landX, 0.1, b.landZ, isHeavyFinisher ? 1.45 : 1.08);
    this.damageSquadArea(b.landX, b.landZ, rad, isHeavyFinisher ? 4 : 2, 'slam');
  }

  advanceBoss(dt) {
    const b = this.boss;
    if (b.defeated) {
      const before = b.defeatAge;
      b.defeatAge += dt;

      // 阶段 1（0 ~ 0.85s）：密集子弹连环击退！Boss 剧烈向 -Z 远端节节倒退并身上连环爆火花
      if (b.defeatAge < 0.85) {
        const knockStep = b.knockbackVel * dt;
        b.z -= knockStep;
        b.knockbackVel = Math.max(1.4, b.knockbackVel - dt * 6.8);
        b.marched -= knockStep * 1.3;
        const stageTick = Math.floor(b.defeatAge / 0.16);
        if (stageTick > b.defeatKnockStage) {
          b.defeatKnockStage = stageTick;
          b.hit = 1.0;
          const ox = b.x + (this.rand() - 0.5) * 1.4;
          const oy = 1.2 + this.rand() * 1.1;
          this.event('critHit', ox, oy, b.z + 0.4, 1.25);
        }
      } else if (!b.removed) {
        // 阶段 2（0.85 ~ 1.48s）：彻底失衡向后仰面倒地并微滑，1.38s 重重砸地扬尘
        const slide = Math.max(0, 1 - (b.defeatAge - 0.85) / 0.55) * 2.2 * dt;
        b.z -= slide;
        if (before < 1.36 && b.defeatAge >= 1.36) this.landBoss();
      }

      if (before < 2.05 && b.defeatAge >= 2.05) {
        b.removed = true;
        this.event('bossBurst', b.x, 0.72, b.z - 1.3, 1.65);
      }

      if (
        b.removed &&
        b.defeatAge > 2.45 &&
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

    // === Boss 高举双臂连续狂砸地面状态机 ===
    if (b.attackT > 0) {
      const speedMult = b.enraged ? 1.18 : 1.0;
      b.attackT += dt * speedMult;
      // 蓄力举手期间微微压步向前逼近落点，营造扑面重砸压迫感
      const lunge = smoothRange(b.attackT, 0.35, slamStrike);
      b.x = b.leapFromX + (b.landX - b.leapFromX) * 0.48 * lunge;
      b.z = b.leapFromZ + (b.landZ - 1.85 - b.leapFromZ) * 0.42 * lunge;
      // 第 3 记双拳终极重砸时伴随小幅跃起砸落，前两记原地高举狠砸
      b.lift = b.slamHand === 2 ? Math.sin(Math.PI * smoothRange(b.attackT, 0.16, slamStrike)) * 1.15 : 0;

      if (b.attackT >= slamStrike && !b.impactDone) {
        b.impactDone = true;
        this.slamSquad();
      }

      if (b.attackT >= slamCycle) {
        b.slamChain--;
        const nearest = closestSquadMember(this);
        if (b.slamChain > 0 && this.playing && nearest.distance <= 5.4) {
          // 紧接着反手高举继续连砸我们的小兵！
          b.slamHand = (b.slamHand + 1) % 3;
          b.leapFromX = b.x;
          b.leapFromZ = b.z;
          b.landX = clamp(nearest.x + (b.slamHand === 0 ? -0.4 : b.slamHand === 1 ? 0.4 : 0), -5.2, 5.2);
          b.landZ = clamp(nearest.z, -2.5, 2.0);
          b.attackT = 0.001;
          b.impactDone = false;
        } else {
          b.attackT = 0;
          b.lift = 0;
          b.recovery = b.enraged ? 0.48 : 0.72;
        }
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
    if (!b.pursuing && b.z >= this.captainZ - 11.5) b.pursuing = true;
    const target = b.pursuing ? closestSquadMember(this) : null;
    const approach = 1 - smoothRange(b.z, -23, -15);
    const pace = b.pursuing
      ? b.enraged
        ? 3.35
        : 2.9
      : this.bossStride + (this.bossEntryStride - this.bossStride) * approach;
    const stride = dt * pace * (1 - 0.38 * b.brace + 0.78 * b.special + rush);
    bossStep(this, dt, target, stride);

    if (!b.pursuing || b.recovery > 0 || b.skill) return;
    const nearest = closestSquadMember(this);
    if (nearest.distance > 4.6) return;
    const landX = clamp(nearest.x, -5.2, 5.2);
    const landZ = clamp(nearest.z, -2.5, 2.0);
    if (!clearLanding(this, landX, landZ - 0.68)) return;

    // 启动 3~4 连发高举猛砸小兵攻势！
    b.leapFromX = b.x;
    b.leapFromZ = b.z;
    b.landX = landX;
    b.landZ = landZ;
    b.slamHand = 0;
    b.slamChain = b.enraged ? 4 : 3;
    b.attackT = 0.001;
    b.impactDone = false;
  }

  landBoss() {
    this.event('victory', this.boss.x, 0.12, this.boss.z - 1.65, 1.35);
  }

  finish(win, attacker = null) {
    if (!this.playing) return;
    this.phase = win ? 'won' : 'lost';
    this.endTime = 0;
    this.shots = [];
    this.incoming = [];
    if (win) {
      const ranks = [...this.squad].sort((a, b) => a.z - b.z);
      for (let i = 0; i < ranks.length; i += 5) {
        const row = ranks.slice(i, i + 5).sort((a, b) => a.x - b.x);
        row.forEach((ally, file) => {
          ally.exitX = (file - (row.length - 1) / 2) * 0.68;
          ally.exitZ = Math.floor(i / 5) * 0.78;
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
        for (const c of this.columns) {
          for (const e of c.units) {
            if (e.alive && e.z <= this.captainZ + 0.5) {
              leader = e;
              break;
            }
          }
          if (leader) break;
        }
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
        approach: Math.max(2.35, (this.captainZ - leader.z + 1.6) / 3.5),
      };
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
    for (const ally of this.squad) {
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
    if (this.boss.defeated && this.boss.defeatAge < 2.45) return false;
    return this.overrun ? this.overrun.crossed && this.endTime >= 2.2 : this.endTime > 0.86;
  }

  tick(dt, axis = 0, back = 0) {
    this.worldAdvance = 0;
    // 更新 3D 闪电链生命周期
    for (const arc of this.lightningArcs) arc.age += dt;
    compact(this.lightningArcs, (a) => a.age < a.life);

    if (!this.playing) {
      if (this.phase === 'won' || this.phase === 'lost') {
        this.endTime += dt;
        if (this.parade) this.advanceParade(dt);
        if (this.overrun) this.advanceOverrun(dt);
        if (this.phase === 'lost' && this.boss.defeated && this.boss.defeatAge < 2.45)
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
      this.aim(x + axis * 10.6 * dt, this.targetZ + back * 3.4 * dt);
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

    // 阵型跟随与状态更新
    for (const a of this.squad) {
      a.age += dt;
      a.hurt = Math.max(0, a.hurt - dt * 4.5);
      if (a.mergeBirth > 0) a.mergeBirth = Math.max(0, a.mergeBirth - dt * 2.6);
      const targetX = clamp(this.x + a.formX, -6.2, 6.2);
      const targetZ = this.captainZ + a.formZ;
      a.x += (targetX - a.x) * (1 - Math.exp(-18 * dt));
      a.z += (targetZ - a.z) * (1 - Math.exp(-15 * dt));
    }

    // 人数较多时自动触发一次拥挤合成，保持阵型舒展并不断演化大兵
    if (this.squad.length >= 22 && this.merges.length === 0) {
      this.performMerge(1, true);
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
