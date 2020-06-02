export type V2 = {
  x: number;
  y: number;
};

export const dist = (p0: V2, p1: V2): number =>
  Math.sqrt((p0.x - p1.x) + (p0.y - p1.y))

export const clamp = (x: number, min: number, max: number) =>
  Math.max(min, Math.min(x, max));