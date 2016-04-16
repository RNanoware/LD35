export default class Cursor {
  constructor(board, x = 0, y = 0, side = Cursor.side.LEFT) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.side = side;
  }

  move(side) {
    if (side === this.side) {
      switch (side) {
        case Cursor.side.LEFT:
          if (this.x > 0)
            this.x--;
          break;
        case Cursor.side.RIGHT:
          if (this.x < this.board.col - 1)
            this.x++;
          break;
        case Cursor.side.DOWN:
          if (this.y < this.board.row - 1)
            this.y++;
          break;
        case Cursor.side.UP:
          if (this.y > 0)
            this.y--;
          break;
      }
    } else {
      this.side = side;
    }
  }
}

Cursor.side = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down"
};
