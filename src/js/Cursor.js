import Keyboarder from "./Keyboarder";

export default class Cursor {
  constructor(board, x = 0, y = 0, side = Cursor.side.LEFT) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.side = side;
    this.next = null;
    this.kb = new Keyboarder();
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
      passOver();
    } else {
      if (side === this.side.opposite)
        passOver();
      this.side = side;
    }
  }

  passOver(x = this.x, y = this.y) {
    if (this.board.getIndex(x, y) === 1)
      if (this.next !== null)
        this.next.writeLastCell();
    this.board.setIndex(x, y, 0);
  }

  writeLastCell() {
    this.board.setIndex(this.x, this.y, 1);
  }

  update() {
    if (this.kb.isDown(Keyboarder.keys.LEFT)) {
      this.move(Cursor.side.LEFT);
    } else if (this.kb.isDown(Keyboarder.keys.RIGHT)) {
      this.move(Cursor.side.RIGHT);
    } else if (this.kb.isDown(Keyboarder.keys.UP)) {
      this.move(Cursor.side.UP);
    } else if (this.kb.isDown(Keyboarder.keys.DOWN)) {
      this.move(Cursor.side.DOWN);
    }
  }

  draw(context, x, y, cellWidth, cellHeight) {
    var xCorner = x + cellWidth * this.x;
    var yCorner = y + cellHeight * this.y;
    switch (cursor.side) {
      case Cursor.side.LEFT:
        var xStart = xCorner;
        var yStart = yCorner;
        var xEnd = xStart;
        var yEnd = yCorner + cellHeight;
        break;
      case Cursor.side.RIGHT:
        var xStart = xCorner + cellWidth;
        var yStart = yCorner;
        var xEnd = xStart;
        var yEnd = yCorner + cellHeight;
        break;
      case Cursor.side.DOWN:
        var xStart = xCorner;
        var yStart = yCorner + cellHeight;
        var xEnd = xCorner + cellWidth;
        var yEnd = yStart;
        break;
      case Cursor.side.UP:
        var xStart = xCorner;
        var yStart = yCorner;
        var xEnd = xCorner + cellWidth;
        var yEnd = yStart;
        break;
    }
    context.strokeStyle = "red";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(xStart, yStart);
    context.lineTo(xEnd, yEnd);
    context.closePath();
    context.stroke();
  }
}

Cursor.side = {
  LEFT: {
    name: "left"
  },
  RIGHT: {
    name: "right"
  },
  UP: {
    name: "up"
  },
  DOWN: {
    name: "down"
  }
};
Cursor.side.LEFT.opposite = Cursor.side.RIGHT;
Cursor.side.RIGHT.opposite = Cursor.side.LEFT;
Cursor.side.UP.opposite = Cursor.side.DOWN;
Cursor.side.DOWN.opposite = Cursor.side.UP;
