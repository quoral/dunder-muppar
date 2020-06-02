import GameState from './GameState';

class Renderer {
  render(state: GameState) {
    const { x: width, y: height } = state.boardSize;
    const board : string[][] = (new Array(height)).map(() => (new Array(width)).map(() => " "));
    
    for (const player of state.players) {
      const y = Math.floor(player.position.y);
      const x = Math.floor(player.position.x);
      board[y][x] = player.name.charAt(0);
    }
    console.log(board.map(c => c.join('')).join('\n'));
  }
}

export default Renderer;