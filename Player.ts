import { Segment } from './util';
import { Equipment } from './Equipment';

export type Player = {
  id: number;
  name: string;
  segments: Segment[];
  equipment: Equipment | null;
  size: number;
  alive: boolean;
  killedBy?: string;
};

export default Player;
