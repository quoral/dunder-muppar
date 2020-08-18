import Player from './Player';
import { V2, Segment, addV2, normalizeV2 } from './util';
import Brain from './Brain';

type Constants = {
  boardSize: V2;
  maxSpeed: number;
  maxTurnSpeed: number;
};

type Result = {
  winnerId: 0;
};

type GameState = {
  constants: Constants;
  playerTurn: number;
  players: Player[];
};

export type SubjectiveGameState = {
  boardSize: V2;
  myState: Player;
  enemyStates: Player[];
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const subjectify = (
  objectiveState: GameState,
  brainIndex: number
): SubjectiveGameState => ({
  boardSize: objectiveState.constants.boardSize,
  myState: deepCopy(objectiveState.players[brainIndex]),
  enemyStates: deepCopy(
    objectiveState.players.filter((_, idx) => idx !== brainIndex)
  ),
});

/*
export const playerEqual = (beforePlayer: Player, afterPlayer: Player) => {

}

export const equalIsh = (beforeState: GameState, afterState: GameState): boolean => {
  players = beforeState.players.map((player, index) => player.health == afterState.players[index])
}
*/

const epsilon = 0.0001;
const createSegment = (position: V2, direction: V2): Segment => ({
  p0: position,
  p1: addV2(position, normalizeV2(direction, epsilon)),
});

const createPlayers = (brains: Brain[]): Player[] => {
  return brains.map((brain, idx) => ({
    id: idx,
    name: brain.getName() || `Bot ${idx}`,
    segments: [createSegment({ x: 20 * idx, y: 0 }, { x: 1, y: 1 })],
    alive: true,
    size: 1,
    equipment: null,
  }));
};

export const initialize = (brains: Brain[]): GameState => ({
  constants: {
    maxSpeed: 1,
    boardSize: { x: 100, y: 100 },
    maxTurnSpeed: 1,
  },
  playerTurn: 0,
  players: createPlayers(brains),
});

export default GameState;
