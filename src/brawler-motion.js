/** Boss 连续举手砸地动作时间轴常数（单锤周期约 0.86 秒，紧凑凶猛） */
export const slamWindup = 0.54; // 高举蓄力并显示地面拳印预警
export const slamStrike = 0.62; // 双拳/重臂砸中地面瞬间
export const slamCycle = 0.86; // 单次砸击完整周期，紧接着抬手连砸下一锤
export const slamRadius = 2.05;

// 兼容导出供旧引用平稳过渡
export const takeoff = 0.22;
export const touchdown = slamStrike;
export const attackDuration = slamCycle;

export function smoothRange(value, low, high) {
  const t = Math.max(0, Math.min(1, (value - low) / (high - low)));
  return t * t * (3 - 2 * t);
}

/** 单锤高举权重（0→1 举至最高点，砸地时迅速归零） */
export function slamRaiseWeight(t) {
  return smoothRange(t, 0.04, 0.42) * (1 - smoothRange(t, 0.48, slamStrike));
}

/** 单锤猛砸下压权重（砸地瞬间飙升至 1，随后回弹） */
export function slamDownWeight(t) {
  return smoothRange(t, 0.48, slamStrike) * (1 - smoothRange(t, 0.66, slamCycle));
}

export function jumpProgress(time) {
  return Math.max(0, Math.min(1, (time - takeoff) / (touchdown - takeoff)));
}
