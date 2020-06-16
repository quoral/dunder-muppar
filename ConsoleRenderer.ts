import GameState from './GameState';
import Renderer from './Renderer';

type Logger = (msg: string, row: number) => void;

const logReprint = (msg: string, row: number) => {
  process.stdout.cursorTo(0, row + 1);
  process.stdout.clearLine(0);
  process.stdout.write(msg);
};

const logPrint = (msg: string, row: number) => {
  console.log(msg);
};

class ConsoleRenderer implements Renderer {
  private logger: Logger;

  constructor(debug: boolean) {
    this.logger = debug ? logPrint : logReprint;
    clearConsole();
  }

  render(state: GameState) {
    const { x: width, y: height } = state.constants.boardSize;

    const board = [];
    for (let j = 0; j < height; ++j) {
      const row = [];
      for (let i = 0; i < width; ++i) {
        row.push(' ');
      }
      board.push(row);
    }

    for (const player of state.players) {
      const y = Math.floor(player.position.y);
      const x = Math.floor(player.position.x);
      board[y][x] = colorstring(
        defaultColors[player.id],
        player.name.charAt(0)
      );
    }

    board
      .map((c) => c.join(''))
      .forEach((line, lineNumber) => this.logger(line, lineNumber));
  }
}

const clearConsole = () => {
  var lines = process.stdout.getWindowSize()[1];
  for (var i = 0; i < lines; i++) {
    console.log('\r\n');
  }
};

const colors = {
  fgRed: '\x1b[31m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgBlue: '\x1b[34m',
  fgMagenta: '\x1b[35m',
  fgCyan: '\x1b[36m',
  fgWhite: '\x1b[37m',

  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};

const defaultColors = [
  'fgRed',
  'fgGreen',
  'fgYellow',
  'fgBlue',
  'fgMagenta',
  'fgCyan',
  'fgWhite',
];

const resetColor = '\x1b[0m';

const colorstring = (color: string, s: string) => {
  return `${colors[color] || colors['fgWhite']}${s}${resetColor}`;
};

export default ConsoleRenderer;
