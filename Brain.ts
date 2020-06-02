import GameState from './GameState';
import Action from './Action';

interface Brain {
  name: string,
  step: (gameState: GameState) => Action
}

export default Brain;