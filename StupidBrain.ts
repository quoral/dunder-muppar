import Brain from './Brain';
import { V2 } from './util';
import { SubjectiveGameState } from './GameState';
import { MOVE } from './actionTypes';

const stupid : Brain = {
  step: (state: SubjectiveGameState) => {
    const { x: maxX } = state.boardSize;
    const { position: { x, y }, size } = state.myState;
    // I want to go to maxX and minY
    const dx = (x + size < maxX) ? 1 : 0;
    const dy = y - size > 0 ? -1 : 0;
    const direction: V2 = { x: dx, y: dy };
    return {
      type: MOVE,
      payload: {
        direction
      },
    };
  }
}

export default stupid;
