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
  fever: { label: '狂热', hp: 48, tone: 'gold' },
};

export const lastStage = 10;

export function courseCards(stage) {
  const gates = [];
  function add(x, at, type) {
    const hp = supplies[type].hp + (stage - 1) * 2;
    gates.push({ x, at, z: -at, type, hp, maxHp: hp, active: true, flash: 0 });
  }
  // One rescue is already in the opening firing lane, as in the bridge game.
  add(0, 11, 'plus');
  const yellow = ['merge', 'blast', 'rapid', 'merge', 'spread', 'merge', 'fever'];
  const blue = ['squad', 'shield', 'squad', 'plasma', 'plus', 'drone'];
  const offset = stage - 1;
  for (let i = 0; i < 15; i++) {
    add(-4.65, 16 + i * 13.2, yellow[i === 0 ? 0 : (i + offset) % yellow.length]);
    add(4.05, 24 + i * 13.2, blue[i === 0 ? 0 : (i + offset) % blue.length]);
  }
  return gates;
}
