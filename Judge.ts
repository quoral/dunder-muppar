import GameState from './GameState';

interface Judge {
  isStale(previousState: GameState, nextState: GameState): boolean;
  isGameOver(state: GameState): boolean;
  getResult(state: GameState): string;
}

export class FairJudge implements Judge {
  isStale(prevState: GameState, nextState: GameState) {
    return false;
  }
  isGameOver(state: GameState) {
    return false;
  }
  getResult(state: GameState) {
    if (!this.isGameOver(state)) {
      return null;
    }
    return 'Winner: Tomas';
  }
}

export default Judge;
