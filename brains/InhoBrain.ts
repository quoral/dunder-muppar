import Brain from '../Brain';
import { V2, subtractV2, normalizeV2, crossV2 } from '../util';
import { SubjectiveGameState } from '../GameState';
import { Segment } from '../util';
import { TURN_CLOCKWISE, TURN_COUNTERCLOCKWISE } from '../actionTypes';

let bias = 0.5;
let time = 0;

class InhoBrain implements Brain {
  private name: string;

  constructor(name: string = 'Inho') {}

  getName() {
    return this.name;
  }

  step(state: SubjectiveGameState) {
    const { x: maxX, y: maxY } = state.boardSize;

    const { segments } = state.myState;
    let allSegments = segments.slice(0, -10);
    for (const enemy of state.enemyStates) {
      allSegments = allSegments.concat(allSegments, enemy.segments);
    }

    const scale = 1 / 10;

    const width = Math.floor(state.boardSize.x * scale);
    const height = Math.floor(state.boardSize.y * scale);

    let grid: number[][] = new Array(height);

    const lastSegment =
      state.myState.segments[state.myState.segments.length - 1];
    const position = lastSegment.p1;
    const direction = Math.atan2(
      lastSegment.p1.y - lastSegment.p0.y,
      lastSegment.p1.x - lastSegment.p0.x
    );

    for (let y = 0; y < height; ++y) {
      grid[y] = new Array(width);
      grid[y].fill(0);
    }
    for (const segment of allSegments) {
      const x = Math.floor((scale * (segment.p0.x + segment.p1.x)) / 2);
      const y = Math.floor((scale * (segment.p0.y + segment.p1.y)) / 2);
      grid[y][x] += 1;
    }

    //const lastSegment = segments[segments.length - 1];

    //const goalAngle = crossV2(dpNorm, goalDirection);

    bias -= 0.001;
    time++;

    return {
      type: direction < bias ? TURN_CLOCKWISE : TURN_COUNTERCLOCKWISE,
    };
    /*
    return {
      type: Math.random() < bias ? TURN_CLOCKWISE : TURN_COUNTERCLOCKWISE, // THANKS TO AAAAALL THE EFFORT, WE CAN FINALLY TURN RIGHT.
    };*/
  }
}

export default InhoBrain;
