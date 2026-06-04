export function normalizeAngle(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

export function lerpAngle(current: number, target: number, t: number) {
  const diff = normalizeAngle(target - current);
  return current + diff * t;
}