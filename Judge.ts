import GameState from './GameState';

interface Judge {
  isStale(previousState: GameState, nextState: GameState): boolean;
  isGameOver(state: GameState): boolean;
  getResult(state: GameState): string;
}

export class FairJudge implements Judge {
  isStale(prevState: GameState, nextState: GameState) {
    const playersMoved = prevState.players.some((prev, idx) => {
      const next = nextState.players[idx];
      return prev.segments.length != next.segments.length;
    });
    if (playersMoved) {
      return false;
    }
    return true;
  }

  getAlivePlayers(state: GameState) {
    return state.players.filter((player) => player.alive);
  }

  isGameOver(state: GameState) {
    return this.getAlivePlayers(state).length <= 1;
  }

  getResult(state: GameState) {
    if (!this.isGameOver(state)) {
      return null;
    }

    const alivePlayers = this.getAlivePlayers(state);
    if (alivePlayers.length === 1) {
      return `Winner: ${alivePlayers[0].name}`;
    }

    return `Draw! Players alive: ${alivePlayers
      .map((player) => player.name)
      .join(', ')}`;
  }
}

export default Judge;
