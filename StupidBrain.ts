import Brain from './Brain';
import { V2, subtractV2, normalizeV2, crossV2 } from './util';
import { SubjectiveGameState } from './GameState';
import { TURN_CLOCKWISE, TURN_COUNTERCLOCKWISE } from './actionTypes';

class StupidBrain implements Brain {
  private name: string;

  constructor(name: string = 'Stupid') {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  step(state: SubjectiveGameState) {
    const { x: maxX, y: maxY } = state.boardSize;
    const { segments } = state.myState;
    const lastSegment = segments[segments.length - 1];

    // I want to go to maxX and maxY
    const dp: V2 = subtractV2(lastSegment.p1, lastSegment.p0);
    const dpNorm = normalizeV2(dp);
    const pToGoal = subtractV2(lastSegment.p1, { x: maxX, y: maxY });
    const goalDirection = normalizeV2(pToGoal);

    const goalAngle = crossV2(dpNorm, goalDirection);

    return {
      type: goalAngle > 0 ? TURN_CLOCKWISE : TURN_COUNTERCLOCKWISE,
    };
  }
}

export default StupidBrain;
