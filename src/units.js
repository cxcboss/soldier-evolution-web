/**
 * 我方多级兵种与融合合成体系定义：
 * - 开局无队长，纯由基础小兵起家；
 * - 支持基础兵 + 特色兵种（重盾/火焰/电磁）多线融合合成大兵，大兵再合重炮队长与终极指挥官；
 * - 阶梯越低越靠外围/前排承伤，高阶大兵与队长位于阵型核心受到保护。
 */

export const UNIT_DEFS = {
  // === T1 基础小兵与特色特种兵 ===
  rifle: {
    id: 'rifle',
    name: '蓝盔步兵',
    short: '步兵',
    tier: 1,
    hp: 1,
    scale: 0.98,
    damage: 3.1,
    fireRate: 1.0,
    weapon: 'rifle',
    role: 'base',
    color: '#38b6ff',
    frontBias: 0,
  },
  shield: {
    id: 'shield',
    name: '重盾卫兵',
    short: '重盾',
    tier: 1,
    hp: 3,
    scale: 1.12,
    damage: 3.8,
    fireRate: 0.88,
    weapon: 'pulse',
    role: 'tank',
    color: '#9ad4ff',
    frontBias: 1, // 严格优先站阵型最前排吸收敌兵冲撞
  },
  flame: {
    id: 'flame',
    name: '烈焰兵',
    short: '火焰',
    tier: 1,
    hp: 1,
    scale: 1.04,
    damage: 5.5,
    fireRate: 0.76,
    weapon: 'flame',
    role: 'special',
    color: '#ff8a34',
    frontBias: 0,
  },
  tesla: {
    id: 'tesla',
    name: '电磁工兵',
    short: '电磁',
    tier: 1,
    hp: 1,
    scale: 1.04,
    damage: 5.8,
    fireRate: 0.82,
    weapon: 'tesla',
    role: 'special',
    color: '#4ef2ff',
    frontBias: 0,
  },

  // === T2 合成大兵（普通合大兵 / 特色融合大兵） ===
  assault: {
    id: 'assault',
    name: '双枪突击兵',
    short: '突击',
    tier: 2,
    hp: 3,
    scale: 1.34,
    damage: 7.4,
    fireRate: 1.32,
    weapon: 'twin',
    role: 'heavy',
    color: '#47d1ff',
    frontBias: -1,
  },
  pyro: {
    id: 'pyro',
    name: '烈焰火箭兵',
    short: '炎炮',
    tier: 2,
    hp: 3,
    scale: 1.38,
    damage: 18,
    fireRate: 0.62,
    weapon: 'miniRocket',
    role: 'heavy',
    color: '#ff7029',
    frontBias: -1,
  },
  storm: {
    id: 'storm',
    name: '雷霆电浆兵',
    short: '雷霆',
    tier: 2,
    hp: 3,
    scale: 1.38,
    damage: 13.5,
    fireRate: 0.92,
    weapon: 'chainArc',
    role: 'heavy',
    color: '#52f7ff',
    frontBias: -1,
  },

  // === T3 高阶大兵：通过两尊 T2 大兵融合诞生的战地重炮队长 ===
  captain: {
    id: 'captain',
    name: '重炮队长',
    short: '队长',
    tier: 3,
    hp: 6,
    scale: 1.78,
    damage: 38,
    fireRate: 0.52,
    weapon: 'cannon',
    role: 'captain',
    color: '#ffd238',
    frontBias: -2,
  },

  // === T4 终极形态：双队长或高阶融合诞生的钢铁堡垒指挥官 ===
  titan: {
    id: 'titan',
    name: '钢铁指挥官',
    short: '泰坦',
    tier: 4,
    hp: 10,
    scale: 2.16,
    damage: 66,
    fireRate: 0.62,
    weapon: 'titanCannon',
    role: 'titan',
    color: '#ffec70',
    frontBias: -3,
  },
};

/**
 * 合成优先级配方表（从高阶融合到基础升级）：
 * 每次触发「合成进化」门或军团人数达到拥挤自动合成阈值时按此表匹配执行。
 */
export const MERGE_RECIPES = [
  // 2 × 重炮队长 -> 1 × T4 钢铁指挥官
  { inputs: ['captain', 'captain'], output: 'titan', label: '终极合成 · 钢铁指挥官!' },
  // 2 × T2 大兵（任意大兵两两融合）-> 1 × T3 重炮队长
  { anyTier: 2, count: 2, output: 'captain', label: '进阶合成 · 重炮队长!' },
  // 1 × 火焰兵 + 2 × 基础兵 -> 1 × T2 烈焰火箭兵
  { special: 'flame', baseCount: 2, output: 'pyro', label: '融合进化 · 烈焰火箭兵!' },
  // 2 × 火焰兵 -> 1 × T2 烈焰火箭兵
  { inputs: ['flame', 'flame'], output: 'pyro', label: '融合进化 · 烈焰火箭兵!' },
  // 1 × 电磁工兵 + 2 × 基础兵 -> 1 × T2 雷霆电浆兵
  { special: 'tesla', baseCount: 2, output: 'storm', label: '融合进化 · 雷霆电浆兵!' },
  // 2 × 电磁工兵 -> 1 × T2 雷霆电浆兵
  { inputs: ['tesla', 'tesla'], output: 'storm', label: '融合进化 · 雷霆电浆兵!' },
  // 3 × 蓝盔步兵 -> 1 × T2 双枪突击兵
  { inputs: ['rifle', 'rifle', 'rifle'], output: 'assault', label: '合兵升级 · 双枪突击兵!' },
  // 3 × 任意 T1 兵（含重盾/火焰/电磁兜底合成）-> 1 × T2 双枪突击兵
  { anyTier: 1, count: 3, output: 'assault', label: '合兵升级 · 双枪突击兵!' },
];

/** 尝试在当前队列中匹配一条合成配方，返回 { consumedIndices, output, label } 或 null */
export function findMergeRecipe(squad, allowAutoOnly = false) {
  for (const recipe of MERGE_RECIPES) {
    // 自动拥挤合成时，保留至少 4 名外围小兵当护卫，不把全部小兵耗光
    if (allowAutoOnly && recipe.output === 'titan' && squad.filter((u) => u.kind === 'captain').length < 2)
      continue;
    if (recipe.inputs) {
      const used = [];
      let ok = true;
      for (const need of recipe.inputs) {
        const idx = squad.findIndex((u, i) => u.kind === need && !used.includes(i));
        if (idx < 0) {
          ok = false;
          break;
        }
        used.push(idx);
      }
      if (ok) return { consumedIndices: used, output: recipe.output, label: recipe.label };
    } else if (recipe.special) {
      const spIdx = squad.findIndex((u) => u.kind === recipe.special);
      if (spIdx < 0) continue;
      const bases = [];
      for (let i = 0; i < squad.length && bases.length < recipe.baseCount; i++) {
        if (i !== spIdx && squad[i].kind === 'rifle') bases.push(i);
      }
      if (bases.length === recipe.baseCount) {
        return {
          consumedIndices: [spIdx, ...bases],
          output: recipe.output,
          label: recipe.label,
        };
      }
    } else if (recipe.anyTier) {
      const found = [];
      for (let i = 0; i < squad.length && found.length < recipe.count; i++) {
        if (UNIT_DEFS[squad[i].kind].tier === recipe.anyTier) found.push(i);
      }
      if (found.length === recipe.count) {
        return { consumedIndices: found, output: recipe.output, label: recipe.label };
      }
    }
  }
  return null;
}

/** 根据兵种阶梯与职责计算队列的理想相对站位（核心大兵居中受保护，重盾在前，步兵在外围护卫） */
export function assignSquadPositions(squad) {
  // 按核心度降序：T4 > T3 > T2 > T1(普通/特兵) > T1(重盾排最前弧)
  const core = [];
  const mid = [];
  const frontShields = [];
  const outer = [];

  for (const u of squad) {
    const def = UNIT_DEFS[u.kind];
    if (def.tier >= 3) core.push(u);
    else if (def.tier === 2) mid.push(u);
    else if (u.kind === 'shield') frontShields.push(u);
    else outer.push(u);
  }

  // 1. 核心高阶（T3 队长 / T4 指挥官）：居中稳坐阵列核心
  const coreSpacing = 1.05;
  core.forEach((u, i) => {
    const offset = (i - (core.length - 1) / 2) * coreSpacing;
    u.formX = offset;
    u.formZ = 0.08 + Math.abs(offset) * 0.14;
  });

  // 2. T2 大兵环：紧绕核心左右及稍前侧输出
  const midRadius = core.length ? 1.18 : 0.62;
  mid.forEach((u, i) => {
    if (!core.length && mid.length === 1) {
      u.formX = 0;
      u.formZ = 0;
      return;
    }
    const spread = mid.length <= 4 ? Math.PI * 1.15 : Math.PI * 1.65;
    const angle =
      mid.length === 1
        ? -Math.PI / 2
        : -Math.PI / 2 + ((i / (mid.length - 1)) - 0.5) * spread;
    const r = midRadius + Math.floor(i / 6) * 0.62;
    u.formX = Math.cos(angle) * r * 1.08;
    u.formZ = Math.sin(angle) * r * 0.62 + 0.05;
  });

  // 3. T1 重盾卫兵：固定排在阵型最前端的弧形盾墙，第一时间挡住冲锋红兵
  const shieldArcR = core.length ? 1.72 : mid.length ? 1.38 : 0.92;
  frontShields.forEach((u, i) => {
    const t = frontShields.length === 1 ? 0 : i / (frontShields.length - 1) - 0.5;
    const angle = -Math.PI / 2 + t * Math.min(Math.PI * 0.72, frontShields.length * 0.28);
    u.formX = Math.cos(angle) * shieldArcR * 1.12;
    u.formZ = Math.sin(angle) * shieldArcR * 0.72 - 0.26;
  });

  // 4. T1 步兵/火焰/电磁：围绕外圈舒展排布，确保每个小兵的脚步与 3D 挂件清爽不拥挤
  const baseOuterR = core.length ? 1.85 : mid.length ? 1.42 : 0.78;
  let slot = 0;
  for (const u of outer) {
    if (!core.length && !mid.length && outer.length <= 3) {
      const idx = slot++;
      u.formX = (idx - (outer.length - 1) / 2) * 0.88;
      u.formZ = idx === 1 && outer.length === 3 ? -0.32 : 0.16;
      continue;
    }
    let ring = 0;
    let rem = slot++;
    let cap = 6;
    while (rem >= cap) {
      rem -= cap;
      ring++;
      cap = 6 + ring * 5;
    }
    const angle = (Math.PI * 2 * rem) / cap - Math.PI / 2 + ring * 0.32;
    const r = baseOuterR + ring * 0.68;
    u.formX = Math.cos(angle) * r * 1.08;
    u.formZ = Math.sin(angle) * r * 0.88;
  }
}

/** 汇总军团实时兵种统计（用于 HUD 编成显示） */
export function squadSummary(squad) {
  let t1 = 0,
    t2 = 0,
    t3 = 0,
    t4 = 0,
    power = 0;
  for (const u of squad) {
    const def = UNIT_DEFS[u.kind];
    if (def.tier === 1) t1++;
    else if (def.tier === 2) t2++;
    else if (def.tier === 3) t3++;
    else t4++;
    power += Math.round(def.damage * def.fireRate);
  }
  return { total: squad.length, t1, t2, t3, t4, power };
}
