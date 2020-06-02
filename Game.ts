import Brain from './Brain';
import GameState, { subjectify } from './GameState';
import Renderer from './Renderer';
import actionReducer from './ActionReducer';
import judge from './Judge';

import { V2 } from './util';

class Game {
  private brains: Brain[];
  private gameState: GameState;

  private renderer: Renderer;

  private started = false;
  private ended: boolean = false;

  constructor(gameState: GameState) {
    this.gameState = gameState;
    this.renderer = new Renderer();
  }

  private run() {
    while (!this.ended) {
      this.step();
    }
  }

  private step() {
    /*Pipeline:
      current player gets SubjectiveGameState through process:
        (ObjectiveState, playerId) -> SubjectiveState
      current player returns an Action through Brain interface
        SubjectiveState -> Action
      Reducer receives action and player id and generates a new GameState
        (Previous GameState, PlayerId, Action) -> (New GameState, bool gameOver)
      Renderer renders the board
        GameState -> void (outputs to screen)
      */

    const turn = this.gameState.playerTurn;
    const subjectiveState = subjectify(this.gameState, turn);
    const brain = this.brains[turn];
    const action = brain.step(subjectiveState);
    const newState = actionReducer.reduce(this.gameState, turn, action);

    const gameOver = judge.isGameOver(newState);
    const stale = judge.isStale(this.gameState, newState);

    this.renderer.render(newState);
    this.ended = stale || gameOver;
    this.gameState = newState;
  }
}



export default Game;
