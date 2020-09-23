import GameState from './GameState';
import Action from './Action';
import * as actionTypes from './actionTypes';
import {
  normalizeV2,
  addV2,
  subtractV2,
  rotateV2,
  crossV2,
  dotV2,
  length2V2,
  Segment,
} from './util';

interface Reducer {
  reduce: (state: GameState, action: Action) => GameState;
}

const chainReducers = (reducers: Reducer[]): Reducer => {
  return {
    reduce: (state: GameState, action: Action) => {
      let result = state;
      for (const reducer of reducers) {
        result = reducer.reduce(result, action);
      }
      return result;
    },
  };
};

const replaceAt = (idx: number, arr: any[], obj: any) =>
  arr.map((el, i) => (i === idx ? obj : el));

const handleTurn: Reducer = {
  reduce(state: GameState, action: Action): GameState {
    const player = state.players[state.playerTurn];
    if (!player.alive) return state;
    if (!action?.type) return state;
    switch (action.type) {
      case actionTypes.TURN_CLOCKWISE:
      case actionTypes.TURN_COUNTERCLOCKWISE:
      default: {
        const maxSpeed = state.constants.maxSpeed; // TODO: Adjust based on powerups etc.
        const lastSegment = player.segments[player.segments.length - 1];
        const currentDirection = normalizeV2(
          subtractV2(lastSegment.p1, lastSegment.p0)
        );
        const turn =
          {
            [actionTypes.TURN_CLOCKWISE]: state.constants.maxTurnSpeed,
            [actionTypes.TURN_COUNTERCLOCKWISE]: -state.constants.maxTurnSpeed,
          }[action.type] || 0; // TODO: Adjust based powerups etc.
        const newDirection = rotateV2(currentDirection, turn);
        const nosePosition = lastSegment.p1;
        const newSegment: Segment = {
          p0: nosePosition,
          p1: addV2(nosePosition, normalizeV2(newDirection, maxSpeed)),
        };
        return {
          ...state,
          players: replaceAt(state.playerTurn, state.players, {
            ...player,
            segments: [...player.segments, newSegment],
          }),
        };
      }
    }
  },
};

const isColliding = (s0: Segment, s1: Segment): boolean => {
  const v0 = subtractV2(s0.p1, s0.p0);
  const v1 = subtractV2(s1.p1, s1.p0);

  // https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
  // q => s0.p0
  // p => s1.p0
  // s => v0
  // r => v1
  // t, u \in [0, 1]

  //t = (q − p) × s / (r × s)
  // u = (q − p) × r / (r × s)
  const crossProduct = crossV2(v1, v0);

  if (crossProduct === 0) {
    if (crossV2(subtractV2(s0.p0, s1.p0), v1) === 0) {
      // Colinear
      const oppositeDirections = dotV2(v0, v1) < 0;
      const t0 = dotV2(subtractV2(s0.p0, s1.p0), v1) / length2V2(v1);
      if (oppositeDirections ? t0 < 0 : t0 > 1) {
        return false;
      }
      // t1 = t0 + s · r / (r · r)
      const t1 = t0 + dotV2(v0, v1) / length2V2(v1);
      return oppositeDirections ? t1 <= 1 : t1 >= 0;
    } else {
      // Parallel and non-intersecting
      return false;
    }
  } else {
    const t = crossV2(subtractV2(s0.p0, s1.p0), v0) / crossProduct;
    const u = crossV2(subtractV2(s0.p0, s1.p0), v1) / crossProduct;
    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
  }
};

const checkCollisions: Reducer = {
  reduce(state: GameState): GameState {
    const player = state.players[state.playerTurn];
    const [playerHead, , ...playerTail] = [...player.segments].reverse();

    const {
      p1: { x, y },
    } = playerHead;
    if (
      x < 0 ||
      x > state.constants.boardSize.x ||
      y < 0 ||
      y > state.constants.boardSize.y
    ) {
      return {
        ...state,
        players: replaceAt(state.playerTurn, state.players, {
          ...player,
          alive: false,
          killedBy: player.id,
        }),
      };
    }

    if (playerTail.some((segment) => isColliding(playerHead, segment))) {
      // Collided with self
      return {
        ...state,
        players: replaceAt(state.playerTurn, state.players, {
          ...player,
          alive: false,
          killedBy: player.id,
        }),
      };
    }

    const enemies = state.players.filter((p, idx) => idx !== state.playerTurn);
    for (const enemy of enemies) {
      if (enemy.segments.some((segment) => isColliding(playerHead, segment))) {
        return {
          ...state,
          players: replaceAt(state.playerTurn, state.players, {
            ...player,
            alive: false,
            killedBy: enemy.id,
          }),
        };
      }
    }

    return state;
  },
};

const stepTurn: Reducer = {
  reduce: (state: GameState): GameState => {
    return {
      ...state,
      playerTurn: (state.playerTurn + 1) % state.players.length,
    };
  },
};

const reducer = chainReducers([handleTurn, checkCollisions, stepTurn]);

export default reducer;
