// These use the same painted sign, moulding and shadows as the original blue and gold cards.
export const supplies = {
  plus: { label: '+3', hp: 10, count: 3, tone: 'blue' },
  squad: { label: '+5', hp: 39, count: 5, tone: 'blue' },
  merge: { label: '炮+5', hp: 45, tone: 'gold' },
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

export function courseCards(stage) {
  const gates = [];
  function add(x, at, type) {
    gates.push(makeCard(x, at, type, stage));
  }
  // One rescue is already in the opening firing lane, as in the bridge game.
  add(0, 11, 'plus');
  const yellow = ['merge', 'blast', 'rapid', 'merge', 'spread', 'engineer', 'fever', 'merge'];
  const blue = ['squad', 'shield', 'squad', 'plasma', 'medic', 'drone', 'reserve', 'frost'];
  const offset = stage - 1;
  for (let i = 0; i < 15; i++) {
    add(-4.65, 16 + i * 13.2, yellow[i === 0 ? 0 : (i + offset) % yellow.length]);
    add(4.05, 24 + i * 13.2, blue[i === 0 ? 0 : (i + offset) % blue.length]);
  }
  return gates;
}
