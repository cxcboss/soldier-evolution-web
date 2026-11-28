// 仅保留 3 个完全差异化的精品验证关卡：每一关拥有独立生态主题、另类机关玩法与重做 Boss 演出
export const laneWidth = 4.4;
export const laneCenter = (lane) => laneWidth * lane;
export const laneName = (lane) => ['左路', '中路', '右路'][lane + 1];

export const landscapes = {
  // 第1关·阳光外港：晴朗暖石板桥 + 碧海白浪 + 高爆油桶连环阵
  quay: {
    floor: '#dfd6cc',
    joint: '#b0a399',
    line: '#7c92a8',
    rim: '#fff7ec',
    deep: '#0a3a63',
    glint: '#42b8cc',
    frame: '#49617c',
    railTop: '#f3f7fc',
    lampGlow: '#ffd468',
    hemiSky: '#fff8ec',
    hemiGround: '#3e6f91',
    hemiIntensity: 1.46,
    keyLight: '#ffe9c4',
    keyIntensity: 2.34,
    rimLight: '#6ad8ff',
    rimIntensity: 0.98,
    fog: '#174c78',
    fogDensity: 0.0068,
    skyTop: '#0d346b',
    skyHorizon: '#4899cc',
    sunColor: '#ffe399',
    moteColor: '#fff5d6',
    moteStyle: 'breeze',
    exposure: 1.05,
  },
  // 第2关·雷霆林谷：翡翠弯道木栈桥 + 巨木滚筒奇袭 + 电磁连锁塔
  timber: {
    floor: '#cba680',
    joint: '#886242',
    line: '#725238',
    rim: '#f5dec0',
    deep: '#0d3a3c',
    glint: '#43b896',
    frame: '#684c35',
    railTop: '#deb98e',
    lampGlow: '#7ef7ff',
    hemiSky: '#f4ffea',
    hemiGround: '#355c47',
    hemiIntensity: 1.42,
    keyLight: '#ffebc2',
    keyIntensity: 2.28,
    rimLight: '#6ff7d4',
    rimIntensity: 1.05,
    fog: '#164544',
    fogDensity: 0.0074,
    skyTop: '#113c47',
    skyHorizon: '#469480',
    sunColor: '#ffe9a6',
    moteColor: '#b5ffea',
    moteStyle: 'breeze',
    exposure: 1.04,
  },
  // 第3关·熔心裂谷：玄武黑曜熔岩桥 + 熔岩喷涌裂隙 + 流星火雨
  cinder: {
    floor: '#70636e',
    joint: '#e65b29',
    line: '#ff8e3a',
    rim: '#bfb0ba',
    deep: '#330b08',
    glint: '#ff7224',
    frame: '#4d3640',
    railTop: '#a38996',
    lampGlow: '#ff6e26',
    hemiSky: '#ffd9c2',
    hemiGround: '#822814',
    hemiIntensity: 1.44,
    keyLight: '#ffd2a6',
    keyIntensity: 2.4,
    rimLight: '#ff5e28',
    rimIntensity: 1.42,
    fog: '#401514',
    fogDensity: 0.0082,
    skyTop: '#220912',
    skyHorizon: '#a83a1d',
    sunColor: '#ff8038',
    moteColor: '#ff9d42',
    moteStyle: 'embers',
    exposure: 1.08,
  },
};

export const chapters = [
  { number: 1, name: '阳光外港', theme: 'quay', first: 1, last: 1 },
  { number: 2, name: '雷霆林谷', theme: 'timber', first: 2, last: 2 },
  { number: 3, name: '熔心裂谷', theme: 'cinder', first: 3, last: 3 },
];

// 各关特色机关构造器
const skyfall = (lane, at) => ({ kind: 'skyfall', lane, at, radius: 1.88 });
const gap = (lane, at, length = 3.6) => ({ kind: 'gap', lane, at, length });
const bridge = (lane, at) => ({ kind: 'bridge', lane, at, length: 4.4 });
const cache = (lane, at, reward = 'merge') => ({ kind: 'cache', lane, at, reward });
const coil = (lane, at) => ({ kind: 'coil', lane, at });
const belt = (lane, at, direction) => ({ kind: 'belt', lane, at, direction, length: 8.2 });
// 新增三大另类玩法机关：连环高爆油桶、巨型滚木奇袭、熔岩间歇喷发口
const barrel = (lane, at) => ({ kind: 'barrel', lane, at, radius: 3.85 });
const roller = (lane, at) => ({ kind: 'roller', lane, at, speed: 6.2 });
const lavaVent = (lane, at) => ({ kind: 'lavaVent', lane, at, radius: 2.05 });

const routes = [
  {
    name: '合兵破阵 · 油桶连爆',
    tagline: '合兵进阶 · 连环油桶 · 铁拳连砸',
    badge: '合成教学',
    theme: 'quay',
    boss: 'bruiser',
    vault: false,
    pressure: 0.56,
    bossHP: 3400,
    wallHP: 52,
    approachLength: 132,
    features: [
      barrel(0, 32),
      barrel(1, 35.5),
      cache(-1, 56, 'merge'),
      barrel(-1, 74),
      barrel(0, 77.5),
      barrel(1, 102),
      cache(1, 108, 'flameSquad'),
    ],
  },
  {
    name: '磁暴弯道 · 滚木奇袭',
    tagline: '弯道滚木 · 电磁连锁塔 · 巨螯狂砸',
    badge: '机关奇袭',
    theme: 'timber',
    boss: 'diver',
    vault: true,
    pressure: 0.72,
    bossHP: 4600,
    wallHP: 70,
    approachLength: 146,
    features: [
      coil(0, 31),
      roller(-1, 46),
      belt(1, 58, -1),
      roller(1, 72),
      coil(-1, 82),
      bridge(1, 96),
      roller(0, 112),
      cache(-1, 120, 'merge'),
    ],
  },
  {
    name: '熔心狂潮 · 泰坦觉醒',
    tagline: '熔岩喷发 · 流星火雨 · 终极指挥官',
    badge: '终极狂潮',
    theme: 'cinder',
    boss: 'engine',
    vault: true,
    pressure: 0.88,
    bossHP: 6400,
    wallHP: 92,
    approachLength: 158,
    features: [
      lavaVent(0, 30),
      barrel(1, 42),
      skyfall(-1, 55),
      lavaVent(1, 68),
      coil(0, 79),
      skyfall(0, 92),
      lavaVent(-1, 104),
      gap(1, 116),
      skyfall(1, 126),
      barrel(0, 134),
      cache(-1, 138, 'merge'),
    ],
  },
];

export const campaign = routes.map((r, i) => {
  const number = i + 1;
  const chapter = chapters[i];
  const rowSpacing = 0.565 / Math.sqrt(r.pressure);
  const restLength = 6.2 / r.pressure;
  const restEvery = 42;
  const finale = Math.round(r.approachLength / (rowSpacing + 0.38 / 11 + restLength / restEvery));
  return {
    number,
    name: r.name,
    tagline: r.tagline,
    badge: r.badge,
    chapter,
    theme: r.theme,
    boss: r.boss,
    vault: r.vault,
    features: r.features,
    pressure: r.pressure,
    siege: number === 3,
    rowSpacing,
    restEvery,
    restLength,
    finale,
    bossHP: r.bossHP,
    wallHP: r.wallHP,
    contactGrace: 0.42, // 更短的碰撞无敌，让冲锋红兵真实消耗外围小兵
  };
});

export const lastStage = campaign.length; // 严格仅保留 3 关

export function terrainPiece(spec, stage) {
  const coverHP = { glass: 20, crates: 44, shutter: 72 };
  const baseHP =
    spec.kind === 'cover'
      ? coverHP[spec.variant]
      : spec.kind === 'cache'
        ? 54
        : spec.kind === 'bridge'
          ? 38
          : spec.kind === 'barrel'
            ? 14
            : spec.kind === 'roller'
              ? 46
              : 24;
  const pressure = campaign[Math.min(stage, lastStage) - 1].pressure;
  const hp = Math.round((0.68 + 0.32 * pressure) * baseHP);
  return {
    ...spec,
    x: laneCenter(spec.lane),
    z: -spec.at,
    hp,
    maxHp: hp,
    state: 'ready',
    age: 0,
    flash: 0,
    half:
      spec.kind === 'cover'
        ? 1.94
        : spec.kind === 'cache'
          ? 1.67
          : spec.kind === 'roller'
            ? 1.78
            : spec.kind === 'barrel'
              ? 1.15
              : 0.78,
    depth: spec.kind === 'cover' ? 0.46 : spec.kind === 'roller' ? 0.72 : 0.44,
  };
}

export function isOpening(p) {
  return (p.kind === 'gap' && p.state !== 'repaired') || (p.kind === 'bridge' && p.state === 'cut');
}

export function overOpening(p, x, z, margin = 0) {
  return (
    isOpening(p) &&
    Math.abs(x - p.x) < laneWidth / 2 - 0.14 - margin &&
    Math.abs(z - p.z) < p.length / 2 - margin
  );
}
