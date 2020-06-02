export type V2 = {
  x: number;
  y: number;
};

export const dist = (p0: V2, p1: V2): number =>
  Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2))

export const clamp = (x: number, min: number, max: number) =>
  Math.max(min, Math.min(x, max));

export const lengthV2 = (v: V2): number => Math.sqrt(v.x*v.x + v.y*v.y);
export const normalizeV2 = (v: V2, toLength: number = 1) => {
  // TODO: https://en.wikipedia.org/wiki/Fast_inverse_square_root
  const len = lengthV2(v);
  if (len === 0) throw new Error(`Cannot normalize vector of length 0 (${v.x}, ${v.y})`);
  const multiplier = toLength / len;
  return { x: v.x * multiplier, y: v.y * multiplier };
};
export const addV2 = (v: V2, w: V2) => {
  return { x: v.x + w.x, y: v.y + w.y };
};
