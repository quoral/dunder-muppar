import Game from './Game';
import Brain from './Brain';
import {
  EdgeBrain,
  InhoBrain,
  SwedishBrain,
  WorkplaceBrain,
  ZBrain,
  BunBrain,
  SBrain,
} from './brains';

/*
  type GameState
    owns players
  type Action
    type: string
    payload: any
  Player
    brain: step(gameState) => action
  Game
    owns renderer
    owns players
    owns playerTurn
    step()
  Renderer
    render(gameState)


  SubjectiveGameState
    Player
    n x EnemyState

  GameState

*/

function main() {
  const brains: Brain[] = [
    new EdgeBrain('E'),
    new InhoBrain('I'),
    new SwedishBrain('S'),
    new WorkplaceBrain('W'),
    new ZBrain('Z'),
    new BunBrain('B'),
    new SBrain('S'),
  ];

  const game = new Game(brains, process.argv.includes('debug'));
  game.start();
}

main();
