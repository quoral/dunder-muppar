import Player from './Player';
import { V2, Segment, addV2, normalizeV2, subtractV2 } from './util';
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

const createPlayers = (brains: Brain[], boardSize: V2): Player[] => {
  const { x: maxX, y: maxY } = boardSize;
  return brains.map((brain, idx) => {
    let p0: V2 = {
      x: Math.random(),
      y: Math.random(),
    };
    p0 = {
      x: p0.x > 0.5 ? p0.x * 0.4 : 1 - (1 - p0.x) * 0.4,
      y: p0.y > 0.5 ? p0.y * 0.4 : 1 - (1 - p0.y) * 0.4,
    };
    p0 = {
      x: p0.x * maxX,
      y: p0.y * maxY,
    };
    const p1: V2 = subtractV2({ x: maxX / 2, y: maxY / 2 }, p0);
    return {
      id: idx,
      name: brain.getName() || `Bot ${idx}`,
      segments: [createSegment(p0, p1)],
      alive: true,
      size: 1,
      equipment: null,
    };
  });
};

export const initialize = (brains: Brain[]): GameState => {
  const boardSize = { x: 600, y: 600 };
  return {
    constants: {
      maxSpeed: 1,
      boardSize,
      maxTurnSpeed: 2,
    },
    playerTurn: 0,
    players: createPlayers(brains, boardSize),
  };
};

export default GameState;
