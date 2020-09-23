import Brain from '../Brain';
import { SubjectiveGameState } from '../GameState';
import { TURN_CLOCKWISE, TURN_COUNTERCLOCKWISE } from '../actionTypes';

class SBrain implements Brain {
  private name: string;
  private time: number;

  constructor(name: string = 'S') {
    this.name = name;
    this.time = 0;
  }

  getName() {
    return this.name;
  }

  step(state: SubjectiveGameState) {
    const bias = 0.9 * Math.cos(this.time++ * 0.005);
    const rand = Math.random() * 2 - 1;
    return {
      type:
        bias > 0
          ? rand < bias
            ? TURN_COUNTERCLOCKWISE
            : 'DO_NOTHING'
          : rand > bias
          ? TURN_CLOCKWISE
          : 'DO_NOTHING',
    };
  }
}

export default SBrain;
