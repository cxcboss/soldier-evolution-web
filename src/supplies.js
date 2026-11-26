import { laneCenter, laneWidth } from './campaign.js';

export const cardWidth = laneWidth - 0.4;
// These use the same painted sign, moulding and shadows as the original blue and gold cards.
export const supplies = {
  plus: { label: '+3', hp: 10, count: 3, tone: 'blue' },
  squad: { label: '+5', hp: 39, count: 5, tone: 'blue' },
  merge: { label: '炮+5', hp: 45, tone: 'gold' },
  range: { label: '远射', hp: 28, tone: 'blue' },
  longshot: { label: '穿甲远射', hp: 37, tone: 'gold' },
  rapid: { label: '连射', hp: 35, tone: 'gold' },
  shield: { label: '护盾', hp: 41, tone: 'blue' },
  blast: { label: '爆破', hp: 44, tone: 'gold' },
  plasma: { label: '电浆', hp: 45, tone: 'blue' },
  spread: { label: '双发', hp: 41, tone: 'gold' },
  drone: { label: '支援', hp: 45, tone: 'blue' },
  reserve: { label: '+6', hp: 38, count: 6, tone: 'blue' },
  engineer: { label: '架桥', hp: 35, tone: 'gold' },
  medic: { label: '救援', hp: 30, tone: 'blue' },
  frost: { label: '冰幕', hp: 37, tone: 'blue' },
  fever: { label: '狂热', hp: 48, tone: 'gold' },
};

export { lastStage } from './campaign.js';
export function makeCard(x, at, type, stage) {
  const hp = supplies[type].hp + (type === 'plus' ? Math.min(8, stage - 1) : (stage - 1) * 1.05);
  return { x, at, z: -at, type, hp, maxHp: hp, active: true, flash: 0 };
}

// A protected prize and a quicker pickup arrive on the same stretch of road.
const exchanges = [
  [0, 1, 'glass', 'range', 'plus'],
  [1, -1, 'crates', 'spread', 'squad'],
  [-1, 0, 'shutter', 'longshot', 'shield'],
  [1, 0, 'glass', 'blast', 'reserve'],
  [0, -1, 'crates', 'drone', 'range'],
  [-1, 1, 'shutter', 'fever', 'squad'],
  [0, 1, 'glass', 'plasma', 'medic'],
  [1, -1, 'crates', 'reserve', 'rapid'],
  [-1, 0, 'shutter', 'longshot', 'range'],
];
export function courseCards(stage, terrain = []) {
  const gates = [];
  function add(lane, at, type) {
    const card = makeCard(laneCenter(lane), at, type, stage);
    gates.push(card);
    return card;
  }
  add(0, 11, 'plus');
  add(-1, 16, 'merge');
  add(1, 25, 'squad');
  for (let i = 0; i < 10; i++) {
    const at = 36 + i * 16.2;
    const [prize, quick, cover, reward, pickup] =
      exchanges[(i + (stage - 1) * 2) % exchanges.length];
    const mirror = stage % 2 ? 1 : -1;
    const room = (lane, front, back) =>
      !terrain.some(
        (p) =>
          p.lane === lane &&
          p.at + (p.length || 1) / 2 >= front - 1.5 &&
          p.at - (p.length || 1) / 2 <= back + 1.5,
      );
    const lanes = [...new Set([prize * mirror, quick * mirror, -1, 0, 1])];
    const prizeLane = lanes.find((lane) => room(lane, at - 3.6, at));
    if (prizeLane !== undefined) {
      const card = add(prizeLane, at, reward);
      card.coverSpec = { kind: 'cover', variant: cover, lane: prizeLane, at: at - 3.6, reward };
    }
    const quickAt = at + (i % 2 ? 1.8 : -0.9);
    const quickLane = [quick * mirror, 0, -1, 1].find(
      (lane) => lane !== prizeLane && room(lane, quickAt, quickAt),
    );
    if (quickLane !== undefined) add(quickLane, quickAt, pickup);
  }
  return gates;
}
