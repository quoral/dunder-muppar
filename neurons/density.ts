import { SubjectiveGameState } from '../GameState';
import { TURN_CLOCKWISE, TURN_COUNTERCLOCKWISE } from '../actionTypes';
import Action from '../Action';
import { V2, subtractV2, normalizeV2, crossV2 } from '../util';

/**
 * @returns a grid cell from a board space vector
 */
const mapToCell = (resolution: V2, boardSize: V2, vector: V2): V2 => {
  const x = Math.floor((resolution.x * vector.x) / boardSize.x);
  const y = Math.floor((resolution.y * vector.y) / boardSize.y);
  return { x: x, y: y };
};

/**
 * @returns a 2D array where each cell is either occupied (true) or unoccupied (false)
 */
const stateToDensityMap = (
  resolution: V2,
  state: SubjectiveGameState
): boolean[][] =>
  state.enemyStates.reduce(
    (acc, player) =>
      player.segments.reduce((accc, segment) => {
        const cell0 = mapToCell(resolution, state.boardSize, segment.p0);
        const cell1 = mapToCell(resolution, state.boardSize, segment.p1);
        accc[cell0.x][cell0.y] = accc[cell1.x][cell1.y] = true;
        return accc;
      }, acc),
    Array(resolution.x).fill(Array(resolution.y).fill(false))
  );

export const turnToLowestDensity = (state: SubjectiveGameState): Action => {
  // check player position in relation to density map and choose to turn towards closest unoccupied space
  const dmRes = { x: 64, y: 64 };
  const densityMap = stateToDensityMap(dmRes, state);

  const playerHead = state.myState.segments[state.myState.segments.length - 1];
  const playerDmCoords = mapToCell(dmRes, state.boardSize, playerHead.p1);

  // TODO: här borde man göra nåt _smartare_
  for (let y = -1; y < 1; ++y) {
    for (let x = -1; x < 1; ++x) {
      if (
        densityMap[playerDmCoords.x - x][playerDmCoords.y - y] === true &&
        x !== 0 &&
        y !== 0
      ) {
        const dp: V2 = subtractV2(playerHead.p1, playerHead.p0);
        const dpNorm = normalizeV2(dp);
        const pToGoal = subtractV2(playerDmCoords, {
          x: playerDmCoords.x - x,
          y: playerDmCoords.y - y,
        });
        const goalDirection = normalizeV2(pToGoal);
        const goalAngle = crossV2(dpNorm, goalDirection);
        return {
          type: goalAngle < Math.PI ? TURN_CLOCKWISE : TURN_COUNTERCLOCKWISE,
        };
      }
    }
  }
  return null;
};
