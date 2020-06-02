import { SubjectiveGameState } from './GameState';
import Action from './Action';

interface Brain {
  step: (gameState: SubjectiveGameState) => Action
}

export default Brain;
