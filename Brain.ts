import { SubjectiveGameState } from './GameState';
import Action from './Action';
import { Equipment } from './Equipment';

interface Brain {
  getName: () => string;
  step: (gameState: SubjectiveGameState) => Action
}

export default Brain;
