import Board from './Board';
import Cursor from './Cursor';

export default class Level {
  constructor(width, height, goal) {
    this.width = width;
    this.height = height;
    var boardHeight = goal.length;
    var boardWidth = goal[0].length;

    // Board 1: Top left
    // Board 2: Top right
    // Board 3: Bottom right
    // Board 4: Bottom left
    var board1 = new Board(boardHeight, boardWidth);
    var board2 = new Board(boardHeight, 1);
    var board3 = new Board(boardHeight, boardWidth, goal);
    var board4 = new Board(1, boardWidth);

    function shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    }

    function* startingBoardFrom(goal) {
      var vals = [];
      // Grab all non-null elements of goal board
      for (let row of goal)
        for (let cell of row)
          if (cell !== null)
            vals.push(cell);
      // Generate all possible coordinate pairs
      var pairs = [];
      for (let i = 0; i < goal.length; i++)
        for (let j = 0; j < goal[0].length; j++)
          pairs.push({ x: j, y: i });
      // Randomize their order
      shuffle(vals);
      shuffle(pairs);
      // Yield them back until finished
      for (let val of vals) {
        let ret = pairs.pop();
        ret.val = val;
        yield ret;
      }
    }

    board1.setAll(Array.from(startingBoardFrom(goal)));

    var cursor1 = new Cursor(board1, 0, 0, Cursor.side.UP);
    var cursor2 = new Cursor(board2, 0, 0, Cursor.side.UP);
    var cursor3 = new Cursor(board3, 0, 0, Cursor.side.UP);
    var cursor4 = new Cursor(board4, 0, 0, Cursor.side.LEFT);
    cursor1.setNext(cursor2, Cursor.side.UP, Cursor.side.DOWN);
    cursor1.setNext(cursor4, Cursor.side.LEFT, Cursor.side.RIGHT);
    cursor2.setNext(cursor3);
    cursor4.setNext(cursor3);
    cursor3.setNext(cursor1);

    cursor2.moveX = false;
    cursor4.moveY = false;

    board1.addCursor(cursor1);
    board2.addCursor(cursor2);
    board3.addCursor(cursor3);
    board4.addCursor(cursor4);

    var margin = 10;
    var boardLength = (Math.min(width, height) - 3 * margin) / 2;
    var cellWidth = boardLength / boardWidth;
    var cellHeight = boardLength / boardHeight;

    this.boards = [
      {
        board: board1,
        x: margin,
        y: margin,
        w: boardLength,
        h: boardLength
      }, {
        board: board2,
        x: boardLength + 2 * margin + 0.5 * (boardLength - cellWidth),
        y: margin,
        w: cellWidth,
        h: boardLength
      }, {
        board: board3,
        x: boardLength + 2 * margin,
        y: boardLength + 2 * margin,
        w: boardLength,
        h: boardLength
      }, {
        board: board4,
        x: margin,
        y: boardLength + 2 * margin + 0.5 * (boardLength - cellHeight),
        w: boardLength,
        h: cellHeight
      }
    ];
  }

  update() {
    for (let b of this.boards)
      b.board.update();
  }

  draw(context) {
    context.clearRect(0, 0, this.width, this.height);
    for (let b of this.boards)
      b.board.draw(context, b.x, b.y, b.w, b.h);
  }
}
