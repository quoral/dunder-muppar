import Renderer from './Renderer';
import Game from './Game';
import Player from './Player';
import StupidBrain from './StupidBrain';
import Brain from './Brain';

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
  const brains: Brain[] = ['A', 'B', 'C', 'D'].map(
    (letter) => new StupidBrain(letter)
  );

  const game = new Game(brains, process.argv.includes('debug'));
  game.start();
}

main();
