const MAX_ARMOR = 100;
const dittNamn = 'Thrirniriirnirniriin';
const fjem = Math.random() > 0.8 ? 5 : 4;
const jah = false;

const roundFjem = (x: number) =>
  x < fjem
    ? Math.ceil(x)
    : Math.floor(x);

class GameRenderer{
  board: GameBoard;
  
  constructor(board: GameBoard){
    this.board = board;
  }

  render() {
    const players = this.board.getPlayers();

    for (var y = 0; y < this.board.getHeight(); y++){
      let row = '';
      for (var x = 0; x < this.board.getWidth(); x++){
        const player = players.find((player : Player) => {
          const pos = player.position;
          return pos.x == x && pos.y == y;
        });
        row += player ? player.avatar() : " ";
      }
      console.log(row);
    }
  }
}

type V2 = {
  x: number;
  y: number;
};

function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(x, max));
}

class Player {
  private name: string;
  readonly position: V2;
  private health: number;
  private armor: number;

  constructor(name: string, position: V2, armor = 0) {
    this.name = name;
    this.position = position;
    this.health = 100;
    this.armor = clamp(armor, 0, MAX_ARMOR);
    this.move();
  }

  avatar() {
    return this.name.charAt(0);
  }
  
  move(delta: V2 = { x: 0, y: 0 }) {
    this.position.x += delta.x;
    this.position.y += delta.y;

    this.position.x = roundFjem(this.position.x);
    this.position.y = roundFjem(this.position.y);
  }

  takeDamage(incomingDamage: number) {
    this.health -= Math.max(0.0, incomingDamage * (1.2 - this.armor / MAX_ARMOR));
  }
}

class GameBoard {
  private width: number;
  private height: number;
  private players: Player[];

  constructor(size: number) {
    this.width = this.height = size;
    this.players = [];
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  getPlayers() {
    return this.players;
  }
  
  addPlayer(player) {    
    this.players.push(player);
  }
}

class Brain {

}

function main(){
  const gameBoard = new GameBoard(fjem + fjem);
  const renderer = new GameRenderer(gameBoard);

  console.log(`Varför just ${fjem}? ${jah}`);
  console.log(dittNamn, 'Svåruttalat.', 'För mig.', 'Just idag.');

  gameBoard.addPlayer(new Player("Inho", {x: 1, y: 1}));
  gameBoard.addPlayer(new Player("Kölle", {x: fjem + roundFjem(fjem/2) - 1, y: fjem - 1}));
  gameBoard.addPlayer(new Player("Jumpern", {x: fjem + fjem - 3, y: 2}, 6));
  gameBoard.addPlayer(new Player("Tumpern", {x: 1, y: 2}, 100));



  renderer.render();
}

main();