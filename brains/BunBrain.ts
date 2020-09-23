import Brain from '../Brain';
import { SubjectiveGameState } from '../GameState';
import { TURN_CLOCKWISE } from '../actionTypes';
import { V2, dotV2, lengthV2, subtractV2, normalizeV2 } from '../util';

const EPSILON = 0.00001;

class BunBrain implements Brain {
  private name: string;
  private startDir: V2;
  private dRadius: number;
  private goalQuadrant: number;
  private prevDiff: number;
  private approaching: boolean;
  private straights: number;

  constructor(name: string = 'Bun') {
    this.name = name;
    this.dRadius = 0;
    this.goalQuadrant = 1;
    this.prevDiff = Math.PI;
    this.straights = 0;
    this.approaching = true;
  }

  getName() {
    return this.name;
  }

  getAngleToStart(state: SubjectiveGameState): number {
    const { segments } = state.myState;
    if (!this.startDir) {
      const tail = segments[0];
      this.startDir = normalizeV2(subtractV2(tail.p1, tail.p0));
    }
    const head = segments[segments.length - 1];
    const currentDir = normalizeV2(subtractV2(head.p1, head.p0));
    const dot = Math.max(-1, Math.min(1, dotV2(currentDir, this.startDir)));
    return Math.acos(dot);
  }

  adjustRadius(state: SubjectiveGameState) {
    const currentAngle = this.getAngleToStart(state);
    const goalAngle =
      ((this.goalQuadrant <= 2 ? this.goalQuadrant : 4 - this.goalQuadrant) *
        Math.PI) /
      2;
    const currentDiff = Math.abs(currentAngle - goalAngle);
    if (this.approaching) {
      if (currentDiff - this.prevDiff > EPSILON) {
        this.approaching = false;
        this.goalQuadrant = (this.goalQuadrant + 1) % 4;
        this.dRadius++;
        this.straights = this.dRadius * 3;
      }
    } else {
      if (this.prevDiff - currentDiff > EPSILON) {
        this.approaching = true;
      }
    }
    this.prevDiff = currentDiff;
  }

  step(state: SubjectiveGameState) {
    this.adjustRadius(state);
    if (this.straights > 0) {
      this.straights--;
      return { type: 'STRAIGHT' };
    }
    return { type: TURN_CLOCKWISE };
  }
}

export default BunBrain;
