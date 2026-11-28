/**
 * 局外成长与进度存档系统：
 * 负责本地存档读写、关卡 1~3 星评价计算、远征军饷结算与军械整备永久升级。
 */

const STORAGE_KEY = 'xiaobing-jinhua-save-v3';

/** 军械整备升级项配置 */
export const ARMORY_UPGRADES = [
  {
    id: 'squad',
    name: '起始编制',
    desc: '开局额外携带士兵出击',
    maxLevel: 5,
    costs: [80, 160, 280, 440, 650],
    format: (lv) => (lv ? `+${lv * 2} 士兵` : '基础编制'),
    nextText: (lv) => `+${(lv + 1) * 2} 士兵`,
  },
  {
    id: 'cannon',
    name: '重炮口径',
    desc: '永久提升队长主炮与齐射伤害',
    maxLevel: 5,
    costs: [90, 180, 310, 480, 700],
    format: (lv) => (lv ? `+${lv * 12}% 炮伤` : '标准口径'),
    nextText: (lv) => `+${(lv + 1) * 12}% 炮伤`,
  },
  {
    id: 'crit',
    name: '高爆装药',
    desc: '提升全队暴击率与暴击穿透感',
    maxLevel: 5,
    costs: [100, 190, 320, 500, 720],
    format: (lv) => (lv ? `+${lv * 6}% 暴击` : '标准装药'),
    nextText: (lv) => `+${(lv + 1) * 6}% 暴击`,
  },
  {
    id: 'charge',
    name: '超载电容',
    desc: '加快战术超载充能并提升初始能量',
    maxLevel: 5,
    costs: [85, 170, 290, 450, 660],
    format: (lv) => (lv ? `+${lv * 18}% 充能` : '标准电容'),
    nextText: (lv) => `+${(lv + 1) * 18}% 充能`,
  },
];

export function defaultSave() {
  return {
    coins: 0,
    stars: {},
    bestCombo: 0,
    totalKills: 0,
    upgrades: {
      squad: 0,
      cannon: 0,
      crit: 0,
      charge: 0,
    },
  };
}

/** 从 localStorage 安全读取进度 */
export function loadProgress(storage = globalThis.localStorage) {
  const base = defaultSave();
  if (!storage) return base;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return base;
    base.coins = Math.max(0, Math.trunc(Number(parsed.coins) || 0));
    base.bestCombo = Math.max(0, Math.trunc(Number(parsed.bestCombo) || 0));
    base.totalKills = Math.max(0, Math.trunc(Number(parsed.totalKills) || 0));
    if (parsed.stars && typeof parsed.stars === 'object') {
      for (const [k, v] of Object.entries(parsed.stars)) {
        const stageNum = Math.trunc(Number(k) || 0);
        const n = Math.trunc(Number(v) || 0);
        if (stageNum >= 1 && stageNum <= 3 && n >= 1 && n <= 3) base.stars[String(stageNum)] = n;
      }
    }
    if (parsed.upgrades && typeof parsed.upgrades === 'object') {
      for (const item of ARMORY_UPGRADES) {
        const lv = Math.trunc(Number(parsed.upgrades[item.id]) || 0);
        base.upgrades[item.id] = Math.max(0, Math.min(item.maxLevel, lv));
      }
    }
  } catch {
    return base;
  }
  return base;
}

/** 持久化进度到 localStorage */
export function saveProgress(state, storage = globalThis.localStorage) {
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

/** 将军械整备等级转换为局内战斗加成对象 */
export function computeBonuses(state) {
  const u = state?.upgrades || {};
  return {
    extraAllies: (u.squad || 0) * 2,
    cannonMult: 1 + (u.cannon || 0) * 0.12,
    critChanceBonus: (u.crit || 0) * 0.06,
    overdriveRateMult: 1 + (u.charge || 0) * 0.18,
    startingOverdrive: (u.charge || 0) >= 3 ? (u.charge - 2) * 14 : 0,
  };
}

/** 计算单局星级（1~3星）与结算军饷奖励 */
export function evaluateRun(state, battle, won) {
  const stageKey = String(battle.stage);
  const prevStars = state.stars[stageKey] || 0;
  let stars = 0;
  const criteria = [];

  if (won) {
    stars = 1;
    criteria.push({ ok: true, text: '击败首领通过关卡' });
    const armorOk = battle.squad.some((u) => u.kind === 'captain' || u.kind === 'titan');
    if (armorOk) stars++;
    criteria.push({ ok: armorOk, text: '成功合成重炮队长或钢铁指挥官' });
    const masteryOk = (battle.maxCombo || 0) >= 25 || battle.squad.length >= 8;
    if (masteryOk) stars++;
    criteria.push({ ok: masteryOk, text: '最高连击 ≥ 25 或 存活兵力 ≥ 8' });
  }

  const stageBase = 45 + battle.stage * 10;
  const killBonus = Math.min(120, Math.floor((battle.score || 0) * 0.45));
  const comboBonus = Math.min(80, Math.floor((battle.maxCombo || 0) * 0.8));
  const firstStarBonus = won && stars > prevStars ? (stars - prevStars) * 35 : 0;
  const reward = won
    ? stageBase + killBonus + comboBonus + firstStarBonus
    : Math.max(20, Math.floor(stageBase * 0.35 + killBonus * 0.55));

  state.coins += reward;
  state.totalKills += battle.score || 0;
  state.bestCombo = Math.max(state.bestCombo, battle.maxCombo || 0);
  if (won && stars > prevStars) state.stars[stageKey] = stars;

  return {
    stars,
    prevStars,
    isNewBest: won && stars > prevStars,
    reward,
    firstStarBonus,
    criteria,
  };
}

/** 购买指定升级项，返回是否成功 */
export function buyUpgrade(state, id) {
  const item = ARMORY_UPGRADES.find((u) => u.id === id);
  if (!item) return false;
  const lv = state.upgrades[id] || 0;
  if (lv >= item.maxLevel) return false;
  const cost = item.costs[lv];
  if (state.coins < cost) return false;
  state.coins -= cost;
  state.upgrades[id] = lv + 1;
  return true;
}

/** 统计总星级 */
export function totalStars(state) {
  return Object.values(state.stars || {}).reduce((acc, v) => acc + v, 0);
}
