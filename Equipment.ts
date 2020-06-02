import { clamp } from './util'

const MAX_ARMOR = 100;

export interface Weapon {
  damage: number
  length: number
}

export class MeleeWeapon implements Weapon {
  constructor(damage: number, length: number) {
    this.damage = damage
    this.length = length
  }
  damage: number;
  length: number;
}

export class Equipment {
  private armor: number;
  readonly rightHand: Weapon

  constructor(armor: number, weapon: Weapon) {
    this.armor = clamp(armor, 0, MAX_ARMOR);
    this.rightHand = weapon;
  }

  public getArmor() {
    return this.armor;
  }

  public getArmorRatio() {
    return this.getArmor() / MAX_ARMOR;
  }

  public getWeight() {
    var armorWeight = this.armor * 1000;
    var weaponWeight = (this.rightHand.length ^ 2 * 500);
    // Weird constants - Armor makes you heavier and more damage makes you heavier.
    // TODO: Maybe make this more intelligent?
    return armorWeight + weaponWeight;
  }
}
