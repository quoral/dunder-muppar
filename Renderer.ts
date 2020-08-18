import GameState from './GameState';

interface Renderer {
  render: (state: GameState) => void;
  finalize: (result: string) => void;
}

export default Renderer;
