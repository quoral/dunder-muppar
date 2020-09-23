import Brain from '../Brain';
import Player from '../Player';
import { V2, subtractV2, normalizeV2, crossV2 } from '../util';
import { SubjectiveGameState } from '../GameState';
import { TURN_CLOCKWISE, TURN_COUNTERCLOCKWISE } from '../actionTypes';

class WorkplaceBrain implements Brain {
  private name: string;
  private targetId: number;

  constructor(name: string = 'WorkWork') {
    this.name = name;
    this.targetId = null;
  }

  getName() {
    return this.name;
  }

  findValidTarget(enemyStates: Player[]) {
    if (this.targetId === null) {
      this.targetId = enemyStates[0].id;
    }
    let target: Player = enemyStates.find(
      (player) => player.id == this.targetId
    );
    if (!target.alive) {
      target = enemyStates.find(
        (player) => player.id != this.targetId && player.alive
      );
      this.targetId = target.id;
    }
    return target;
  }

  step(state: SubjectiveGameState) {
    const target = this.findValidTarget(state.enemyStates);
    const { segments } = state.myState;
    const lastSegment = segments[segments.length - 1];

    const targetSegments = target.segments;
    const lastTargetSegment = targetSegments[segments.length - 1];

    // I want to go to maxX and maxY
    const dp: V2 = subtractV2(lastSegment.p1, lastSegment.p0);
    const dpNorm = normalizeV2(dp);
    const pToGoal = subtractV2(lastSegment.p1, {
      x: lastTargetSegment.p1.x,
      y: lastTargetSegment.p1.y,
    });
    const goalDirection = normalizeV2(pToGoal);

    const goalAngle = crossV2(dpNorm, goalDirection);

    //Math.random() > 0.5 ? new StupidBrain(letter) : new IdiotBrain(letter)

    return {
      type: goalAngle < 0 ? TURN_CLOCKWISE : TURN_COUNTERCLOCKWISE,
    };
  }
}

export default WorkplaceBrain;
