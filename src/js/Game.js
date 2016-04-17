import Board from './Board';
import Cursor from './Cursor';

export default class Game {
  constructor(canvasId) {
    var canvas = document.getElementById(canvasId);
    this.width = canvas.width = 640;
    this.height = canvas.height = 480;

    this.context = canvas.getContext('2d');

    this.boards = [];
    // Board 1: Top left
    // Board 2: Top right
    // Board 3: Bottom right
    // Board 4: Bottom left
    var board1 = new Board(9, 9);
    var board2 = new Board(9, 1);
    var board3 = new Board(9, 9);
    var board4 = new Board(1, 9);

    var cursor1 = new Cursor(board1, 0, 0, Cursor.side.UP);
    var cursor2 = new Cursor(board2, 0, 0, Cursor.side.UP);
    var cursor3 = new Cursor(board3, 0, 0, Cursor.side.UP);
    var cursor4 = new Cursor(board4, 0, 0, Cursor.side.LEFT);
    cursor1.next = cursor2;
    cursor2.next = cursor3;
    cursor3.next = cursor4;
    cursor4.next = cursor1;

    cursor2.moveX = false;
    cursor4.moveY = false;

    board1.addCursor(cursor1);
    board2.addCursor(cursor2);
    board3.addCursor(cursor3);
    board4.addCursor(cursor4);

    board1.setAll([
      {x: 1, y: 3},
      {x: 9, y: 3},
      {x: 1, y: 0},
      {x: 1, y: 8},
      {x: 0, y: 0}
    ], 1);

    this.boards.push({
      board: board1,
      x: 10,
      y: 10,
      w: 180,
      h: 180
    }, {
      board: board2,
      x: 280,
      y: 10,
      w: 20,
      h: 180
    }, {
      board: board3,
      x: 200,
      y: 200,
      w: 180,
      h: 180
    }, {
      board: board4,
      x: 10,
      y: 280,
      w: 180,
      h: 20
    });
  }

  update() {
    for (let b of this.boards)
      b.board.update();
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (let b of this.boards)
      b.board.draw(this.context, b.x, b.y, b.w, b.h);
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
