import Player from './Player';
import Renderer from './Renderer';
import { V2 } from './util';

class Game {
  private players: Player[];
  private boardSize: V2;
  private renderer: Renderer;
  private renderInterval: number;
  private playerTurn: number = 0;
  private started = false;
  private ended: boolean = false;

  constructor(players: Player[], boardSize: V2 = { x: 10, y: 10 }, renderInterval: number = 1) {
    this.players = players;
    this.boardSize = boardSize;
    this.renderer = new Renderer();
    this.renderInterval = Math.round(renderInterval);
  }

  public start() {
    if (this.started) return;
    this.started = true;
    this.step();
  }

  public end() {
    this.ended = true;
    this.renderer.render({ players: this.players.map(p => p.getPlayerState()), boardSize: { ...this.boardSize } });
  }

  private step() {
    if (this.playerTurn === undefined || this.ended) return;
    const player = this.players[this.playerTurn];

    if (this.players.filter(p => p.isAlive()).length < 2) {
      this.end();
    }
    
    if (this.playerTurn++ === this.players.length) {
      // Next step
      this.playerTurn = 0;
      this.step();
    }
  }
}

export default Game;