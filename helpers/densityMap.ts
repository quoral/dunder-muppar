import GameState from '../GameState';
import { V2 } from '../util';

type DensityQuad = {
  p0: V2;
  p1: V2;
  density: number;
  children?: DensityQuad[][];
};

const generateQuad = (state: GameState, p0: V2, p1: V2, depth: number) => {
  const x0 = p0.x;
  const x1 = Math.floor((p0.x + p1.x) / 2);
  const x2 = p1.x;
  const y0 = p0.y;
  const y1 = Math.floor((p0.y + p1.y) / 2);
  const y2 = p1.y;

  const pointInQuad = (p: V2) =>
    p.x >= p0.x && p.x < p1.x && p.y >= p0.y && p.y < p1.y;

  const density = state.players
    .map(
      (player) =>
        player.segments.filter(
          (segment) => pointInQuad(segment.p0) || pointInQuad(segment.p1)
        ).length
    )
    .reduce((acc, cur) => acc + cur, 0);

  if (!depth) {
    return { p0, p1, density };
  }

  return {
    p0,
    p1,
    density,
    children: [
      [
        generateQuad(state, { x: x0, y: y0 }, { x: x1, y: y1 }, depth - 1),
        generateQuad(state, { x: x1, y: y0 }, { x: x2, y: y1 }, depth - 1),
      ],
      [
        generateQuad(state, { x: x0, y: y1 }, { x: x1, y: y2 }, depth - 1),
        generateQuad(state, { x: x1, y: y1 }, { x: x2, y: y2 }, depth - 1),
      ],
    ],
  };
};

export default (state: GameState): DensityQuad =>
  generateQuad(state, { x: 0, y: 0 }, state.constants.boardSize, 6);
