import Board from './Board';
import Cursor from './Cursor';

export default class Game {
  constructor(canvasId) {
    var canvas = document.getElementById(canvasId);
    canvas.width = 640;
    canvas.height = 480;

    this.context = canvas.getContext('2d');

    this.board = new Board(20, 20);
    this.board.setAll([
      {x: 1, y: 3},
      {x: 19, y: 3},
      {x: 1, y: 10},
      {x: 11, y: 18},
      {x: 0, y: 0}
    ], 1);
    this.board.addCursor(new Cursor(this.board, 3, 3, Cursor.side.LEFT));
  }

  update() {}

  draw() {
    this.board.draw(this.context, 10, 20, 500, 400);
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
