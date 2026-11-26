// All distances, including the bridge apertures, are in the same road space as combat.
export const laneWidth = 4.4;
export const laneCenter = (lane) => laneWidth * lane;
export const laneName = (lane) => ['左路', '中路', '右路'][lane + 1];
export const landscapes = {
  quay: {
    floor: '#c6bac1',
    joint: '#a699a6',
    line: '#8e7f8f',
    rim: '#fff2dc',
    deep: '#1e5368',
    glint: '#73b3b0',
    frame: '#517180',
  },
  timber: {
    floor: '#c69968',
    joint: '#956c49',
    line: '#785940',
    rim: '#ffe2a4',
    deep: '#28564e',
    glint: '#95bea0',
    frame: '#816448',
  },
  quarry: {
    floor: '#d4af8a',
    joint: '#ad8867',
    line: '#966d4d',
    rim: '#ffe9b1',
    deep: '#814e3f',
    glint: '#d99b68',
    frame: '#986f58',
  },
  forge: {
    floor: '#a0acb5',
    joint: '#728290',
    line: '#485f74',
    rim: '#f5cf83',
    deep: '#293b4e',
    glint: '#85afaf',
    frame: '#546a79',
  },
  ice: {
    floor: '#c2dce5',
    joint: '#94b8ce',
    line: '#769bb7',
    rim: '#f9ffff',
    deep: '#245779',
    glint: '#a5e7e7',
    frame: '#6e96ad',
  },
  cinder: {
    floor: '#a59aa3',
    joint: '#786d7c',
    line: '#675969',
    rim: '#ffd392',
    deep: '#512c3c',
    glint: '#fa9452',
    frame: '#6e5261',
  },
};
const gap = (lane, at, length = 3.6) => ({ kind: 'gap', lane, at, length });
const bridge = (lane, at) => ({ kind: 'bridge', lane, at, length: 4.4 });
const cache = (lane, at, reward = 'reserve') => ({ kind: 'cache', lane, at, reward });
const coil = (lane, at) => ({ kind: 'coil', lane, at });
const belt = (lane, at, direction) => ({ kind: 'belt', lane, at, direction, length: 8.2 });

// Three positions per beat leave at least one safe lane. Repeated mechanisms switch
// sides, change neighbours or play a different role in the next encounter.
const routes = [
  ['港口外桥', 'quay', 'bruiser', false, [cache(-1, 59, 'squad')]],
  ['断木栈桥', 'timber', 'diver', true, [gap(1, 42), cache(-1, 75, 'engineer')]],
  ['吊索码头', 'quay', 'warden', false, [bridge(1, 49), cache(-1, 83, 'medic')]],
  ['采石岔道', 'quarry', 'drill', false, [cache(1, 37, 'reserve'), gap(-1, 65), coil(0, 94)]],
  ['结冰的货线', 'ice', 'kestrel', true, [belt(-1, 41, 1), gap(1, 69), cache(0, 89, 'frost')]],
  ['铸铁船坞', 'forge', 'engine', false, [coil(-1, 39), bridge(1, 68), cache(-1, 96, 'engineer')]],
  [
    '林间浮桥',
    'timber',
    'bruiser',
    true,
    [gap(-1, 35), cache(1, 53, 'engineer'), gap(1, 82), belt(0, 104, -1)],
  ],
  [
    '盐仓闸口',
    'quay',
    'diver',
    false,
    [cache(1, 37, 'medic'), bridge(-1, 60), coil(1, 82), gap(0, 105)],
  ],
  [
    '双壁矿廊',
    'quarry',
    'warden',
    false,
    [cache(-1, 35, 'reserve'), cache(1, 55, 'frost'), gap(0, 80), bridge(-1, 105)],
  ],
  [
    '炉前急弯',
    'cinder',
    'drill',
    true,
    [belt(1, 39, -1), coil(0, 61), bridge(-1, 86), cache(1, 107, 'reserve')],
  ],
  [
    '冰河渡口',
    'ice',
    'diver',
    true,
    [gap(0, 37), bridge(1, 60), cache(-1, 84, 'engineer'), gap(-1, 107)],
  ],
  [
    '钢梁接力',
    'forge',
    'warden',
    false,
    [belt(0, 34, 1), cache(1, 53, 'medic'), bridge(-1, 77), coil(0, 106)],
  ],
  [
    '树海救援',
    'timber',
    'kestrel',
    false,
    [cache(-1, 33, 'medic'), gap(1, 58), belt(0, 80, -1), cache(-1, 105, 'reserve')],
  ],
  [
    '潮汐双闸',
    'quay',
    'engine',
    true,
    [bridge(-1, 36), coil(1, 54), bridge(1, 81), cache(0, 108, 'frost')],
  ],
  [
    '碎石运河',
    'quarry',
    'drill',
    true,
    [coil(1, 35), gap(-1, 57), cache(0, 78, 'engineer'), gap(1, 99), belt(-1, 116, 1)],
  ],
  [
    '灰烬转运站',
    'cinder',
    'bruiser',
    false,
    [belt(-1, 38, 1), cache(0, 52, 'reserve'), coil(1, 75), bridge(-1, 97), gap(1, 119)],
  ],
  [
    '霜镜弯桥',
    'ice',
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
    'forge',
    'engine',
    false,
    [cache(1, 36, 'frost'), belt(-1, 55, 1), bridge(1, 75), coil(0, 98), cache(-1, 121, 'reserve')],
  ],
  [
    '悬木货架',
    'timber',
    'warden',
    true,
    [bridge(1, 37), gap(-1, 56), cache(0, 79, 'medic'), gap(1, 101), coil(-1, 123)],
  ],
  [
    '灯塔夜航',
    'quay',
    'diver',
    true,
    [coil(0, 34), cache(-1, 54, 'engineer'), bridge(1, 77), belt(0, 96, 1), gap(-1, 120)],
  ],
  [
    '深井折返',
    'quarry',
    'drill',
    false,
    [gap(1, 37), belt(0, 56, -1), cache(-1, 78, 'frost'), bridge(1, 102), coil(0, 123)],
  ],
  [
    '炉渣长堤',
    'cinder',
    'engine',
    true,
    [cache(-1, 35, 'reserve'), bridge(1, 54), coil(-1, 74), belt(0, 94, -1), gap(1, 119)],
  ],
  [
    '冰脊双索',
    'ice',
    'warden',
    false,
    [
      bridge(-1, 34),
      cache(1, 52, 'engineer'),
      gap(0, 72),
      bridge(1, 94),
      gap(-1, 124),
      cache(-1, 143, 'squad'),
    ],
  ],
  [
    '风轮工场',
    'forge',
    'kestrel',
    true,
    [belt(1, 35, -1), coil(0, 55), belt(-1, 75, 1), cache(1, 95, 'medic'), bridge(0, 121)],
  ],
  [
    '林谷最后一跨',
    'timber',
    'diver',
    true,
    [
      gap(-1, 34),
      cache(1, 52, 'engineer'),
      bridge(0, 72),
      gap(1, 93),
      coil(-1, 114),
      cache(1, 134, 'reserve'),
    ],
  ],
  [
    '外港封锁线',
    'quay',
    'bruiser',
    false,
    [
      cache(1, 35, 'reserve'),
      bridge(-1, 55),
      belt(0, 75, 1),
      coil(1, 95),
      bridge(1, 115),
      gap(-1, 134),
    ],
  ],
  [
    '连锁矿井',
    'quarry',
    'drill',
    true,
    [
      coil(-1, 33),
      cache(0, 51, 'frost'),
      gap(1, 72),
      belt(-1, 91, 1),
      bridge(1, 112),
      cache(-1, 132, 'medic'),
    ],
  ],
  [
    '极夜冰堤',
    'ice',
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
    'forge',
    'warden',
    false,
    [
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
    'cinder',
    'engine',
    true,
    [
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
export const campaign = routes.map(([name, theme, boss, vault, features], i) => ({
  number: i + 1,
  name,
  theme,
  boss,
  vault,
  features,
  finale: 226 + i * 4 + [0, 8, 3, 12, 5][i % 5],
  restEvery: [44, 40, 48, 42, 46][i % 5],
  restLength: 5.75 + [0.4, 1.2, 0.15, 0.7, 1.1][i % 5],
}));
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
  const hp = Math.round(baseHP + (stage - 1) * (spec.kind === 'cover' ? 0.75 : 1.15));
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
