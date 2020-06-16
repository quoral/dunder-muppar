import Brain from './Brain';

import GameState, { subjectify, initialize } from './GameState';
import Renderer from './Renderer';
import actionReducer from './ActionReducer';
import Judge, { FairJudge } from './Judge';

import { sleep, V2 } from './util';

class Game {
  private brains: Brain[];
  private stateHistory: GameState[];
  private gameState: GameState;
  private judge: Judge;

  private renderer: Renderer;

  private started = false;
  private ended: boolean = false;

  constructor(brains: Brain[]) {
    this.gameState = initialize(brains);
    this.stateHistory = [this.gameState];
    this.renderer = new Renderer();
    this.judge = new FairJudge();
    this.brains = brains;
  }

  public async start() {
    if (this.started) return;
    this.started = true;
    while (!this.ended) {
      await sleep(500);
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

    const gameOver = this.judge.isGameOver(newState);

    const oldStateIndex = this.stateHistory.length - this.brains.length;
    let stale = false;
    if (oldStateIndex >= 0) {
      const oldState = this.stateHistory[oldStateIndex];
      stale = this.judge.isStale(oldState, newState);
    }
    this.stateHistory.push(newState);

    this.renderer.render(newState);
    this.ended = stale || gameOver;
    this.gameState = newState;
  }
}

export default Game;
