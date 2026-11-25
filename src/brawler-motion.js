export const takeoff = 0.3;
export const touchdown = 0.91;
export const attackDuration = 1.48;
export const slamRadius = 2.15;

export function smoothRange(value, low, high) {
  const t = Math.max(0, Math.min(1, (value - low) / (high - low)));
  return t * t * (3 - 2 * t);
}

export function jumpProgress(time) {
  return Math.max(0, Math.min(1, (time - takeoff) / (touchdown - takeoff)));
}
