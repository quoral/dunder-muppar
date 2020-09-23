import Brain from '../Brain';
import { V2, subtractV2, normalizeV2, crossV2 } from '../util';
import { SubjectiveGameState } from '../GameState';
import { TURN_CLOCKWISE, TURN_COUNTERCLOCKWISE } from '../actionTypes';

class ZBrain implements Brain {
  private name: string;
  private turn = 0;
  private goal: V2;

  constructor(name: string = 'Stupid') {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  step(state: SubjectiveGameState) {
    const { x: maxX, y: maxY } = state.boardSize;

    this.goal =
      this.turn % 10
        ? { x: 0, y: maxY }
        : this.turn % 5
        ? { x: maxX, y: maxY }
        : this.goal || { x: maxX, y: maxY };

    const { segments } = state.myState;
    const lastSegment = segments[segments.length - 1];

    const dp: V2 = subtractV2(lastSegment.p1, lastSegment.p0);
    const dpNorm = normalizeV2(dp);
    const pToGoal = subtractV2(lastSegment.p1, this.goal);
    const goalDirection = normalizeV2(pToGoal);

    const goalAngle = crossV2(dpNorm, goalDirection);

    this.turn++;

    return {
      type:
        this.turn % Math.min(0, 100 - this.turn) === 0
          ? TURN_CLOCKWISE
          : TURN_COUNTERCLOCKWISE,
    };
  }
}

export default ZBrain;
