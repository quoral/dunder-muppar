import GameState from './GameState';

interface Renderer {
  render: (state: GameState) => void;
}

export default Renderer;
