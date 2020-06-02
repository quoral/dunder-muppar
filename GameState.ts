import Player from './Player';
import { V2 } from './util';

type Constants = {
  boardSize: V2;
  maxSpeed: number;
};

type Result = {
  winnerId: 0
}

type GameState = {
  constants: Constants
  playerTurn: number;
  players: Player[];
};

export type SubjectiveGameState = {
  boardSize: V2;
  myState: Player;
  enemyStates: Player[];
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export const subjectify = (
  objectiveState: GameState,
  brainIndex: number
): SubjectiveGameState => ({
  boardSize: objectiveState.constants.boardSize,
  myState: deepCopy(objectiveState.players[brainIndex]),
  enemyStates: deepCopy(objectiveState.players.filter((_, idx) => idx !== brainIndex))
})

/*
export const playerEqual = (beforePlayer: Player, afterPlayer: Player) => {

}

export const equalIsh = (beforeState: GameState, afterState: GameState): boolean => {
  players = beforeState.players.map((player, index) => player.health == afterState.players[index])
}
*/

export const initialize = (): GameState => ({
  constants: {
    maxSpeed: 1,
    boardSize: {x: 10, y: 10}
  },
  playerTurn: 0,
  players: []
})

export default GameState;

