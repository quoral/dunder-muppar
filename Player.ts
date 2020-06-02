import { V2 } from './util';
import { Equipment } from './Equipment';

export type Player = {
  name: string;
  position: V2;
  health: number;
  equipment: Equipment | null;
  size: number;
};

export default Player;
