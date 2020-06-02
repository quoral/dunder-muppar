import Renderer from './Renderer';
import Game from './Game';
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

*/

function main() {
  let players =[
    new Player("Inho", {x: 1, y: 1}, 0, stupidBrain),
    new Player("Kölle", {x: 1, y: 2}, 0, stupidBrain),
    new Player("Jumpern", {x: 2, y: 2}, 0, stupidBrain),
    new Player("Trump", {x: 3, y: 3}, 0, stupidBrain)
  ]
  const game = new Game(players);
  game.start();
}

main();