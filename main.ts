import Renderer from './Renderer';
import Game from './Game';
import { initialize } from './GameState';
import Player from './Player';
import stupidBrain from './StupidBrain';

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
  const BOARD_SIZE = 20;

  let players = [
    {
      name: 'Inho',
      position: { x: 0, y: 0 },
      health: 100,
      size: 1,
      equipment: null,
    },
    {
      name: 'Kölle',
      position: { x: BOARD_SIZE / 2, y: BOARD_SIZE / 2 },
      health: 100,
      size: 1,
      equipment: null,
    },
    {
      name: 'Jumpern',
      position: { x: 0, y: BOARD_SIZE },
      health: 100,
      size: 1,
      equipment: null,
    },
    {
      name: 'Trump',
      position: { x: BOARD_SIZE, y: BOARD_SIZE },
      health: 100,
      size: 1,
      equipment: null,
    },
  ];

  let gameState = initialize();
  gameState.players = players;

  const game = new Game(gameState);
  game.start();
}

main();
