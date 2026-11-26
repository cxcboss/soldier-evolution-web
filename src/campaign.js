// All distances, including the bridge apertures, are in the same road space as combat.
export const laneWidth = 4.4;
export const laneCenter = (lane) => laneWidth * lane;
export const laneName = (lane) => ['左路', '中路', '右路'][lane + 1];
export const landscapes = {
  quay: {
    floor: '#b6b3b9',
    joint: '#aba2af',
    line: '#998f9f',
    rim: '#ddd5df',
    deep: '#071a32',
    glint: '#1c3854',
    frame: '#485267',
  },
  timber: {
    floor: '#b9b7b9',
    joint: '#aaa1a8',
    line: '#988f9c',
    rim: '#ded5d9',
    deep: '#091c33',
    glint: '#214257',
    frame: '#535b6c',
  },
  quarry: {
    floor: '#b9b6bc',
    joint: '#b0a5b3',
    line: '#9c92a2',
    rim: '#e1d6e3',
    deep: '#0a1931',
    glint: '#30445d',
    frame: '#54596d',
  },
  forge: {
    floor: '#b7b5be',
    joint: '#a0a1af',
    line: '#898d9e',
    rim: '#d7d7df',
    deep: '#071b31',
    glint: '#2a435e',
    frame: '#464f64',
  },
  ice: {
    floor: '#babdc5',
    joint: '#b0b9c7',
    line: '#969fb0',
    rim: '#e2e7f1',
    deep: '#0a1b34',
    glint: '#32506f',
    frame: '#58677e',
  },
  cinder: {
    floor: '#b7b2b9',
    joint: '#aaa0af',
    line: '#958b9d',
    rim: '#dcd4e0',
    deep: '#0e1932',
    glint: '#34435b',
    frame: '#534e65',
  },
};
export const chapters = [
  ['灯塔外港', 'quay'],
  ['悬索林谷', 'timber'],
  ['回声矿峡', 'quarry'],
  ['钢铁船坞', 'forge'],
  ['极光冰河', 'ice'],
  ['熔心裂谷', 'cinder'],
].map(([name, theme], i) => ({ number: i + 1, name, theme, first: i * 5 + 1, last: i * 5 + 5 }));

const skyfall = (lane, at) => ({ kind: 'skyfall', lane, at, radius: 1.82 });
const gap = (lane, at, length = 3.6) => ({ kind: 'gap', lane, at, length });
const bridge = (lane, at) => ({ kind: 'bridge', lane, at, length: 4.4 });
const cache = (lane, at, reward = 'reserve') => ({ kind: 'cache', lane, at, reward });
const coil = (lane, at) => ({ kind: 'coil', lane, at });
const belt = (lane, at, direction) => ({ kind: 'belt', lane, at, direction, length: 8.2 });

// Three positions per beat leave at least one safe lane. Repeated mechanisms switch
// sides, change neighbours or play a different role in the next encounter.
const routes = [
  ['港口外桥', 'bruiser', false, [cache(-1, 59, 'squad')]],
  ['卸货栈桥', 'diver', true, [gap(1, 42), cache(-1, 75, 'engineer')]],
  ['吊索码头', 'warden', false, [bridge(1, 49), cache(-1, 83, 'medic')]],
  ['海堤岔口', 'drill', false, [cache(1, 37, 'reserve'), gap(-1, 65), coil(0, 94)]],
  ['灯塔航道', 'kestrel', true, [belt(-1, 41, 1), gap(1, 69), cache(0, 89, 'frost')]],
  [
    '林场吊运线',
    'engine',
    false,
    [skyfall(1, 55), coil(-1, 39), bridge(1, 68), cache(-1, 96, 'engineer')],
  ],
  [
    '林间浮桥',
    'bruiser',
    true,
    [gap(-1, 35), cache(1, 53, 'engineer'), gap(1, 82), belt(0, 104, -1)],
  ],
  [
    '木料闸口',
    'diver',
    false,
    [skyfall(-1, 73), cache(1, 37, 'medic'), bridge(-1, 60), coil(1, 82), gap(0, 105)],
  ],
  [
    '双索峡廊',
    'warden',
    false,
    [cache(-1, 35, 'reserve'), cache(1, 55, 'frost'), gap(0, 80), bridge(-1, 105)],
  ],
  [
    '悬索封锁战',
    'drill',
    true,
    [
      skyfall(1, 51),
      skyfall(0, 74),
      skyfall(-1, 99),
      bridge(-1, 40),
      coil(0, 61),
      bridge(1, 86),
      cache(1, 107, 'reserve'),
    ],
  ],
  ['溪谷矿口', 'diver', true, [gap(0, 37), bridge(1, 60), cache(-1, 84, 'engineer'), gap(-1, 107)]],
  [
    '运矿斜坡',
    'warden',
    false,
    [skyfall(1, 64), belt(0, 34, 1), cache(1, 53, 'medic'), bridge(-1, 77), coil(0, 106)],
  ],
  [
    '峡谷救援',
    'kestrel',
    false,
    [cache(-1, 33, 'medic'), gap(1, 58), belt(0, 80, -1), cache(-1, 105, 'reserve')],
  ],
  [
    '水闸矿道',
    'engine',
    true,
    [bridge(-1, 36), coil(1, 54), bridge(1, 81), cache(0, 108, 'frost')],
  ],
  [
    '碎石转运桥',
    'drill',
    true,
    [
      skyfall(0, 88),
      coil(1, 35),
      gap(-1, 57),
      cache(0, 78, 'engineer'),
      gap(1, 99),
      belt(-1, 116, 1),
    ],
  ],
  [
    '码头装配线',
    'bruiser',
    false,
    [
      skyfall(1, 65),
      belt(-1, 38, 1),
      cache(0, 52, 'reserve'),
      coil(1, 75),
      bridge(-1, 97),
      gap(1, 119),
    ],
  ],
  [
    '回转船台',
    'kestrel',
    true,
    [
      belt(0, 35, -1),
      gap(1, 55),
      cache(-1, 73, 'engineer'),
      belt(1, 93, -1),
      gap(0, 116),
      cache(-1, 138, 'reserve'),
    ],
  ],
  [
    '重锤装配线',
    'engine',
    false,
    [
      skyfall(0, 62),
      skyfall(1, 110),
      cache(1, 36, 'frost'),
      belt(-1, 55, 1),
      bridge(1, 75),
      coil(0, 98),
      cache(-1, 121, 'reserve'),
    ],
  ],
  [
    '船坞吊架',
    'warden',
    true,
    [bridge(1, 37), gap(-1, 56), cache(0, 79, 'medic'), gap(1, 101), coil(-1, 123)],
  ],
  [
    '龙门夜航',
    'diver',
    true,
    [
      skyfall(-1, 65),
      skyfall(0, 108),
      coil(0, 34),
      cache(-1, 54, 'engineer'),
      bridge(1, 77),
      belt(0, 96, 1),
      gap(-1, 120),
    ],
  ],
  [
    '冻河渡口',
    'drill',
    false,
    [
      skyfall(0, 67),
      gap(1, 37),
      belt(0, 56, -1),
      cache(-1, 78, 'frost'),
      bridge(1, 102),
      coil(0, 123),
    ],
  ],
  [
    '浮冰长堤',
    'engine',
    true,
    [cache(-1, 35, 'reserve'), bridge(1, 54), coil(-1, 74), belt(0, 94, -1), gap(1, 119)],
  ],
  [
    '冰脊双索',
    'warden',
    false,
    [
      skyfall(1, 64),
      skyfall(-1, 107),
      bridge(-1, 34),
      cache(1, 52, 'engineer'),
      gap(0, 72),
      bridge(1, 94),
      gap(-1, 124),
      cache(-1, 143, 'squad'),
    ],
  ],
  [
    '极地风廊',
    'kestrel',
    true,
    [belt(1, 35, -1), coil(0, 55), belt(-1, 75, 1), cache(1, 95, 'medic'), bridge(0, 121)],
  ],
  [
    '冰峡最后一跨',
    'diver',
    true,
    [
      skyfall(1, 65),
      skyfall(0, 104),
      gap(-1, 34),
      cache(1, 52, 'engineer'),
      bridge(0, 72),
      gap(1, 93),
      coil(-1, 114),
      cache(1, 134, 'reserve'),
    ],
  ],
  [
    '灰烬封锁线',
    'bruiser',
    false,
    [
      skyfall(1, 65),
      cache(1, 35, 'reserve'),
      bridge(-1, 55),
      belt(0, 75, 1),
      coil(1, 95),
      bridge(1, 115),
      gap(-1, 134),
    ],
  ],
  [
    '熔岩竖井',
    'drill',
    true,
    [
      skyfall(1, 62),
      skyfall(-1, 105),
      coil(-1, 33),
      cache(0, 51, 'frost'),
      gap(1, 72),
      belt(-1, 91, 1),
      bridge(1, 112),
      cache(-1, 132, 'medic'),
    ],
  ],
  [
    '黑曜断崖',
    'kestrel',
    true,
    [
      gap(1, 33),
      belt(-1, 51, 1),
      bridge(0, 73),
      cache(-1, 92, 'engineer'),
      gap(0, 114),
      belt(1, 136, -1),
    ],
  ],
  [
    '红炉三线',
    'warden',
    false,
    [
      skyfall(0, 64),
      skyfall(-1, 108),
      bridge(1, 35),
      coil(-1, 53),
      cache(0, 73, 'reserve'),
      gap(-1, 93),
      bridge(0, 114),
      coil(1, 135),
    ],
  ],
  [
    '熔心终桥',
    'engine',
    true,
    [
      skyfall(0, 63),
      skyfall(-1, 101),
      skyfall(0, 142),
      cache(-1, 34, 'engineer'),
      gap(1, 52),
      bridge(-1, 72),
      coil(0, 91),
      belt(1, 110, -1),
      bridge(1, 132),
      cache(-1, 151, 'medic'),
    ],
  ],
];
// Pressure affects bodies per rank, breathing space, boss endurance and the cost of
// optional destructive routes together. Stage ten is a single siege, not a permanent jump.
const openingPressure = [0.45, 0.68, 0.53, 0.6, 0.65, 0.7, 0.76, 0.81, 0.93, 1.62];
export const campaign = routes.map(([name, boss, vault, features], i) => {
  const number = i + 1;
  const chapter = chapters[Math.floor(i / 5)];
  const pressure = openingPressure[i] ?? 0.87 + (number - 11) * 0.019;
  const siege = number === 10;
  const rowSpacing = 0.565 / Math.sqrt(pressure);
  const restLength = 6.4 / pressure;
  // Work backwards from deck length. A tutorial with sparse ranks should not last longer.
  const approachLength = number <= 3 ? [135, 154, 144][i] : 151 + i * 2.55 + (siege ? 15 : 0);
  const restEvery = siege ? 60 : 44;
  const finale = Math.round(approachLength / (rowSpacing + 0.38 / 11 + restLength / restEvery));
  return {
    number,
    name,
    chapter,
    theme: chapter.theme,
    boss,
    vault,
    features,
    pressure,
    siege,
    rowSpacing,
    restEvery,
    restLength,
    finale,
    bossHP: Math.round(3800 + (385 + i * 26) * pressure * (siege ? 6.45 : 2.2)),
    wallHP: Math.round((72 + i * 1.55) * Math.min(1.35, pressure)),
    contactGrace: 1.24 / Math.sqrt(pressure),
  };
});
export const lastStage = campaign.length;
export function terrainPiece(spec, stage) {
  const coverHP = { glass: 21, crates: 49, shutter: 78 };
  const baseHP =
    spec.kind === 'cover'
      ? coverHP[spec.variant]
      : spec.kind === 'cache'
        ? 60
        : spec.kind === 'bridge'
          ? 42
          : 29;
  const hp = Math.round(
    (0.56 + 0.44 * campaign[stage - 1].pressure) *
      (baseHP + (stage - 1) * (spec.kind === 'cover' ? 0.75 : 1.15)),
  );
  return {
    ...spec,
    x: laneCenter(spec.lane),
    z: -spec.at,
    hp,
    maxHp: hp,
    state: 'ready',
    age: 0,
    flash: 0,
    half: spec.kind === 'cover' ? 1.94 : spec.kind === 'cache' ? 1.67 : 0.74,
    depth: spec.kind === 'cover' ? 0.46 : spec.kind === 'cache' ? 0.38 : 0.34,
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
