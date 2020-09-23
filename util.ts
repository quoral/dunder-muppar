export type V2 = {
  x: number;
  y: number;
};

export type Segment = {
  p0: V2;
  p1: V2;
};

export const dist = (p0: V2, p1: V2): number =>
  Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2));

export const clamp = (x: number, min: number, max: number) =>
  Math.max(min, Math.min(x, max));

export const length2V2 = (v: V2) => v.x * v.x + v.y * v.y;
export const lengthV2 = (v: V2): number => Math.sqrt(length2V2(v));
export const normalizeV2 = (v: V2, toLength: number = 1) => {
  // TODO: https://en.wikipedia.org/wiki/Fast_inverse_square_root
  const len = lengthV2(v);
  if (len === 0)
    throw new Error(`Cannot normalize vector of length 0 (${v.x}, ${v.y})`);
  const multiplier = toLength / len;
  return { x: v.x * multiplier, y: v.y * multiplier };
};
export const multiplyV2 = (v: V2, multiplier: number) => {
  return { x: v.x * multiplier, y: v.y * multiplier };
};
export const equalsV2 = (v: V2, w: V2) => {
  return v.x === w.x && v.y === w.y;
};
export const addV2 = (v: V2, w: V2) => {
  return { x: v.x + w.x, y: v.y + w.y };
};
export const subtractV2 = (v: V2, w: V2) => {
  return { x: v.x - w.x, y: v.y - w.y };
};
export const rotateV2 = ({ x, y }: V2, angleDeg: number) => {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: x * Math.cos(angleRad) - y * Math.sin(angleRad),
    y: x * Math.sin(angleRad) + y * Math.cos(angleRad),
  };
};
export const dotV2 = (a: V2, b: V2) => a.x * b.x + a.y * b.y;
export const crossV2 = (a: V2, b: V2) => a.x * b.y - a.y * b.x;

export const projectV2 = (a: V2, b: V2) => {
  const t = dotV2(a, b) / length2V2(b);
  return { x: b.x * t, y: b.y * t };
};

export async function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// usage:
// await sleep(1000);
