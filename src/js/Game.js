import Board from './Board';
import Cursor from './Cursor';
import Level from './Level';

export default class Game {
  constructor(canvasId) {
    var canvas = document.getElementById(canvasId);
    this.width = canvas.width = 640;
    this.height = canvas.height = 480;

    this.context = canvas.getContext('2d');

    var goalBoard = new Array(9);
    for (let i = 0; i < goalBoard.length; i++)
      goalBoard[i] = new Array(9).fill(null);
    goalBoard[2][3] = "#FF0000";
    goalBoard[6][3] = "#FF00FF";
    goalBoard[2][7] = "#FF0F0F";
    goalBoard[8][6] = "#FFFF00";

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
