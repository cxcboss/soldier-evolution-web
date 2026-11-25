// One cycle advances two steps. During stance the sole moves backwards at road speed
// relative to the body, so a planted foot follows the bridge beneath it.
export const strideLength = 0.68;
export const stanceFraction = 0.55;
export const footReach = (strideLength * stanceFraction) / 2;
const tau = Math.PI * 2;

function reach(phase) {
  if (phase < stanceFraction) return 1 - (2 * phase) / stanceFraction;
  const t = (phase - stanceFraction) / (1 - stanceFraction);
  const eased = t * t * (3 - 2 * t);
  const carry = ((2 * (1 - stanceFraction)) / stanceFraction) * t * (1 - t) * (1 - 2 * t);
  return -1 + 2 * eased - carry;
}

export function sampleFeet(angle, amount, out) {
  const left = (angle / tau) % 1;
  const right = (left + 0.5) % 1;
  out[0] = reach(left) * amount;
  out[1] = reach(right) * amount;
  // Only one foot can be airborne. The sign identifies which one.
  const swing = Math.max(left, right);
  const lift =
    swing > stanceFraction
      ? Math.sin((Math.PI * (swing - stanceFraction)) / (1 - stanceFraction)) ** 2
      : 0;
  out[2] = (swing === left ? 1 : -1) * lift * amount;
  return out;
}

export function marchAngle(unit) {
  return unit.phase + (tau * unit.marched) / (strideLength * unit.size);
}
