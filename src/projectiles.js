// Distance is measured along the road. The lift only changes height, never heading.
export const rifleRound = { speed: 27, lift: 0, tail: 1.05 };
export const pulseRound = { speed: 23, lift: 0.34, tail: 1.35 };
export const cannonRound = { speed: 20, lift: 0.78, tail: 2.05 };
export const plasmaRound = { speed: 40, lift: 0.08, tail: 4.15 };
export const shotRange = 22;
export const extendedRange = 30;

export function flightHeight(shot, distance) {
  const t = Math.min(1, distance / shot.aimDistance);
  return shot.startY + (shot.endY - shot.startY) * t + 4 * shot.lift * t * (1 - t);
}

export function sampleFlight(shot, distance, out) {
  out.x = shot.startX + shot.headingX * distance;
  out.y = flightHeight(shot, distance);
  out.z = shot.startZ + shot.headingZ * distance;
  return out;
}
