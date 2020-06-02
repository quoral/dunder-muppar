import { PlayerState } from './Player';
import { V2 } from './util';

type GameState = {
  boardSize: V2;
  players: PlayerState[];
};

export default GameState;