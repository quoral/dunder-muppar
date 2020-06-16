import Brain from './Brain';
import { V2 } from './util';
import { SubjectiveGameState } from './GameState';
import { MOVE } from './actionTypes';

class StupidBrain implements Brain {
  private name: string;

  constructor(name: string = 'Stupid') {
    this.name = name;
  }

  getName() { return this.name; }
  
  step(state: SubjectiveGameState) {
    const { x: maxX, y: maxY } = state.boardSize;
    const { position: { x, y }, size } = state.myState;
    // I want to go to maxX and maxY
    const dx = (x + size < maxX) ? 1 : 0;
    const dy = (y + size < maxY) ? 1 : 0;
    const direction: V2 = { x: dx, y: dy };
    return {
      type: MOVE,
      payload: {
        direction
      },
    };
  }
}

export default StupidBrain;
