import Brain from '../Brain';
import { V2, subtractV2, normalizeV2, crossV2 } from '../util';
import { SubjectiveGameState } from '../GameState';
import { TURN_CLOCKWISE, TURN_COUNTERCLOCKWISE } from '../actionTypes';

class SwedishBrain implements Brain {
  private name: string;
  private goal: V2;

  constructor(name: string = 'Swede') {
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
      x: maxX - 1,
      y: maxY / 2,
    });
    const goalDirection = normalizeV2(pToGoal);

    //x: Math.random() * (maxX / 2),
    //Math.random() > 0.5 ? new StupidBrain(letter) : new IdiotBrain(letter)

    const goalAngle = crossV2(dpNorm, goalDirection);

    return {
      type: goalAngle > 0 ? TURN_CLOCKWISE : TURN_COUNTERCLOCKWISE,
    };
  }
}

export default SwedishBrain;
