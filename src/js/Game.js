import Board from './Board';
import Cursor from './Cursor';
import Level from './Level';

export default class Game {
  constructor(canvasId) {
    var canvas = document.getElementById(canvasId);
    this.width = canvas.width = 640;
    this.height = canvas.height = 480;

    this.context = canvas.getContext('2d');

    var trunk = "#7F5908";
    var leaf = "#36A31D";
    var apple = "#DE2E32";
    var goalBoard = new Array(9);
    for (let i = 0; i < goalBoard.length; i++)
      goalBoard[i] = new Array(9).fill(null);
    goalBoard[0][2] = leaf;
    goalBoard[0][3] = leaf;
    goalBoard[0][4] = leaf;
    goalBoard[0][5] = leaf;
    goalBoard[0][6] = leaf;
    goalBoard[1][1] = leaf;
    goalBoard[1][7] = leaf;
    goalBoard[2][1] = leaf;
    goalBoard[2][7] = leaf;
    goalBoard[3][2] = leaf;
    goalBoard[3][3] = leaf;
    goalBoard[3][5] = leaf;
    goalBoard[3][6] = leaf;
    goalBoard[3][6] = leaf;
    goalBoard[1][3] = apple;
    goalBoard[2][6] = apple;
    goalBoard[3][4] = trunk;
    goalBoard[4][4] = trunk;
    goalBoard[5][4] = trunk;
    goalBoard[6][4] = trunk;
    goalBoard[7][4] = trunk;
    goalBoard[8][4] = trunk;
    goalBoard[4][3] = trunk;
    goalBoard[4][5] = trunk;
    goalBoard[8][3] = trunk;
    goalBoard[8][5] = trunk;

    this.level = new Level(this.width, this.height, goalBoard);
  }

  update() {
    this.level.update();
  }

  draw() {
    this.level.draw(this.context);
  }

  run() {
    var self = this;
    var tick = function() {
      self.update();
      self.draw();
      requestAnimationFrame(tick);
    }
    tick();
  }
}
