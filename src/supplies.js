import { campaign, laneCenter, laneWidth, lastStage } from './campaign.js';

export const cardWidth = laneWidth - 0.4;

/**
 * 全面重塑的 16 种高辨识度补给与兵种合成门：
 * - 新增「合成进化」金门（实时将场上兵种合成为更大兵种/重炮队长/泰坦指挥官！）
 * - 新增特色兵种门：重盾卫 +2、烈焰兵 +2、电磁兵 +2，用于与步兵融合进化
 * - 新增「×2 扩编」高爽倍率门，供第 3 关熔心狂潮体验满屏军团进化
 */
export const supplies = {
  plus: { label: '步兵+3', hp: 10, count: 3, unitKind: 'rifle', tone: 'blue' },
  squad: { label: '步兵+5', hp: 32, count: 5, unitKind: 'rifle', tone: 'blue' },
  reserve: { label: '步兵+6', hp: 38, count: 6, unitKind: 'rifle', tone: 'blue' },
  merge: { label: '合成进化', hp: 16, tone: 'gold' },
  shieldSquad: { label: '重盾+2', hp: 24, count: 2, unitKind: 'shield', tone: 'blue' },
  flameSquad: { label: '火焰+2', hp: 26, count: 2, unitKind: 'flame', tone: 'gold' },
  teslaSquad: { label: '电磁+2', hp: 26, count: 2, unitKind: 'tesla', tone: 'blue' },
  double: { label: '×2 扩编', hp: 46, tone: 'gold' },
  rapid: { label: '极速连射', hp: 30, tone: 'gold' },
  shield: { label: '全军护盾', hp: 32, tone: 'blue' },
  blast: { label: '高爆轰炸', hp: 34, tone: 'gold' },
  plasma: { label: '电浆贯穿', hp: 34, tone: 'blue' },
  spread: { label: '双倍弹幕', hp: 34, tone: 'gold' },
  drone: { label: '浮游炮台', hp: 36, tone: 'blue' },
  engineer: { label: '紧急架桥', hp: 28, tone: 'gold' },
  fever: { label: '全军狂热', hp: 40, tone: 'gold' },
};

export { lastStage } from './campaign.js';

export function makeCard(x, at, type, stage) {
  const safeStage = Math.max(1, Math.min(lastStage, stage));
  const def = supplies[type] || supplies.plus;
  const base = def.hp + (safeStage - 1) * 4;
  const hp = Math.round(base * (0.72 + 0.28 * campaign[safeStage - 1].pressure));
  return { x, at, z: -at, type, hp, maxHp: hp, active: true, flash: 0 };
}

// 第 1 关（阳光外港）：高频体验「招兵 -> 合成突击兵 -> 融合火焰兵 -> 合出重炮队长」完整成长链
const stage1Offers = [
  [-1, 1, null, 'plus', 'flameSquad'],
  [0, -1, 'glass', 'merge', 'plus'],
  [1, -1, null, 'shieldSquad', 'squad'],
  [-1, 1, 'crates', 'merge', 'flameSquad'],
  [0, 1, null, 'rapid', 'squad'],
  [1, -1, 'glass', 'merge', 'blast'],
  [-1, 0, null, 'merge', 'reserve'],
];

// 第 2 关（雷霆林谷）：电磁工兵 + 重盾卫 + 弯道合成雷霆电浆兵与重炮队长
const stage2Offers = [
  [0, 1, null, 'teslaSquad', 'plus'],
  [-1, 1, 'glass', 'merge', 'shieldSquad'],
  [1, -1, null, 'teslaSquad', 'squad'],
  [0, -1, 'crates', 'merge', 'plasma'],
  [-1, 1, null, 'engineer', 'reserve'],
  [1, 0, 'shutter', 'merge', 'drone'],
  [0, -1, null, 'merge', 'spread'],
];

// 第 3 关（熔心裂谷）：高爽 ×2 扩编 + 烈焰/电磁双系融合 + 终极 T4 钢铁指挥官觉醒
const stage3Offers = [
  [-1, 1, null, 'flameSquad', 'teslaSquad'],
  [0, 1, 'glass', 'merge', 'squad'],
  [1, -1, 'crates', 'double', 'shieldSquad'],
  [-1, 0, null, 'merge', 'flameSquad'],
  [1, -1, 'shutter', 'fever', 'merge'],
  [0, 1, null, 'double', 'teslaSquad'],
  [-1, 1, 'crates', 'merge', 'drone'],
  [0, -1, null, 'merge', 'shield'],
];

const stageOfferMap = { 1: stage1Offers, 2: stage2Offers, 3: stage3Offers };

export function courseCards(stage, terrain = []) {
  const safeStage = Math.max(1, Math.min(lastStage, stage));
  const gates = [];
  function add(lane, at, type) {
    const card = makeCard(laneCenter(lane), at, type, safeStage);
    gates.push(card);
    return card;
  }

  // 开局三步明确建立“招募小兵 -> 立刻首次合成进化 -> 招募特兵融合”的爽快心流
  add(0, 10.5, 'plus');
  add(-1, 17, 'merge');
  add(1, 24.5, safeStage === 2 ? 'teslaSquad' : 'flameSquad');

  const offers = stageOfferMap[safeStage] || stage1Offers;
  const room = (lane, front, back) =>
    !terrain.some(
      (p) =>
        p.lane === lane &&
        p.at + (p.length || 1.6) / 2 >= front - 1.8 &&
        p.at - (p.length || 1.6) / 2 <= back + 1.8,
    );

  for (let i = 0; i < offers.length; i++) {
    const at = 37 + i * 16.5;
    const [prize, quick, cover, reward, pickup] = offers[i];
    const lanes = [...new Set([prize, quick, 0, -1, 1])];
    const prizeLane = lanes.find((lane) => room(lane, at - 3.6, at));
    if (prizeLane !== undefined) {
      const card = add(prizeLane, at, reward);
      if (cover)
        card.coverSpec = { kind: 'cover', variant: cover, lane: prizeLane, at: at - 3.6, reward };
    }
    const quickAt = at + (i % 2 ? 1.5 : -0.8);
    const quickLane = [quick, 0, -1, 1].find(
      (lane) => lane !== prizeLane && room(lane, quickAt, quickAt),
    );
    if (quickLane !== undefined) add(quickLane, quickAt, pickup);
  }
  return gates;
}
