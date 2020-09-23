import GameState from './GameState';
import Renderer from './Renderer';

const http = require('http');

class HttpJsonRenderer implements Renderer {
  private history: GameState[];

  constructor(debug: boolean) {
    this.history = [];
  }
  render(state: GameState) {
    this.history.push(state);
  }

  finalize() {
    http
      .createServer(function (req, res) {
        res.write(JSON.stringify(this.history));
        res.end();
      })
      .listen(8080);
  }
}
