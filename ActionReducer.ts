import GameState from './GameState';
import Action from './Action';
import * as actionTypes from './actionTypes';
import { lengthV2, normalizeV2, addV2 } from './util';

interface ActionReducer {
  reduce(state: GameState, playerId: number, action: Action): GameState;
}

const replaceAt = (idx: number, arr: any[], obj: any) =>
  arr.map((el, i) => (i === idx ? obj : el));

const reducer: ActionReducer = {
  reduce(prevState: GameState, playerId: number, action: Action): GameState {
    const state = {
      ...prevState,
      playerTurn: (prevState.playerTurn + 1) % prevState.players.length,
    };
    console.log(state.playerTurn);
    let player = state.players[playerId];
    switch (action.type) {
      case actionTypes.MOVE: {
        if (!action.payload.direction) return state;
        const { x, y } = action.payload.direction;
        if (x === undefined || y === undefined) return state;
        const length = lengthV2(action.payload.direction);
        const maxSpeed = state.constants.maxSpeed; // TODO: Adjust subjective max speed based on armor, health etc.
        let dp = action.payload.direction;
        if (length > maxSpeed) {
          dp = normalizeV2(action.payload.direction, maxSpeed);
        }
        return {
          ...state,
          players: replaceAt(playerId, state.players, {
            ...player,
            position: addV2(player.position, dp),
          }),
        };
      }
      default:
        return state;
    }
  },
};

export default reducer;
