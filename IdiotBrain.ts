import Brain from './Brain';
import { V2, subtractV2, normalizeV2, crossV2 } from './util';
import { SubjectiveGameState } from './GameState';
import { TURN_CLOCKWISE, TURN_COUNTERCLOCKWISE } from './actionTypes';

class IdiotBrain implements Brain {
  private name: string;

  constructor(name: string = 'Idiot') {
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
    const pToGoal = subtractV2(lastSegment.p1, {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
    const goalDirection = normalizeV2(pToGoal);

    //Math.random() > 0.5 ? new StupidBrain(letter) : new IdiotBrain(letter)

    const goalAngle = crossV2(dpNorm, goalDirection);

    return {
      type: goalAngle > 0 ? TURN_CLOCKWISE : TURN_COUNTERCLOCKWISE,
    };
  }
}

export default IdiotBrain;
