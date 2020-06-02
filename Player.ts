import { Equipment, MeleeWeapon, Weapon } from './Equipment'
import { dist, V2 } from './util'
import Brain from './Brain'

export type PlayerState = {
  name: string;
  position: V2;
  health: number;
};

export class Player {
  private name: string;
  private brain: Brain;
  readonly position: V2;
  private health: number;
  private equipment: Equipment;
  // note @jonas: size is, for now, the radius of a player
  readonly size = 1

  constructor(name: string, position: V2, armor = 0, brain: Brain) {
    this.name = name;
    this.position = position;
    this.health = 100;
    this.equipment = new Equipment(armor, new MeleeWeapon(50, 1));
    this.brain = brain;
  }
  
  move(delta: V2 = { x: 0, y: 0 }) {
    this.position.x += delta.x;
    this.position.y += delta.y;
  }

  takeDamage(incomingDamage: number) {
    this.health -= Math.max(0.0, incomingDamage * (1.2 - this.equipment.getArmorRatio()));
  }

  // perform a "Swing" and return how much damage it would do
  // to other players
  swing(otherPlayers: Player[]): { [playerName:string]: number } {
    const playersInRange = otherPlayers
      .filter(p => dist(p.position, this.position) - 0.5*p.size < this.equipment.rightHand.length)
    return playersInRange.reduce((acc, p) => ({
      ...acc,
      [p.name]: this.equipment.rightHand.damage
    }), {})
  }

  isAlive() {
    return this.health > 0;
  }

  getPlayerState(): PlayerState {
    return {
      name: this.name,
      position: { ...this.position },
      health: this.health,
    };
  }
}

export default Player;