import Keyboarder from "./Keyboarder";

export default class Cursor {
  constructor(board, x = 0, y = 0, side = Cursor.side.LEFT) {
    // The board that this cursor occupies
    this.board = board;
    // The cursor's location
    this.x = x;
    this.y = y;
    this.side = side;
    // The cursors that this cursor feeds
    this.next = {};
    // Keyboard input
    this.kb = new Keyboarder();
    this.takingInput = false;
    // Storage space for any blocks being passed in from other cursors
    this.blockReceived = null;
    // Allowed movements
    this.moveX = this.moveY = true;
    this.disabled = false;
  }

  setNext(cursor, ...sides) {
    if (sides.length === 0)
      sides = Cursor.side;
    for (let s in sides)
      this.next[sides[s].name] = cursor;
  }

  move(side) {
    // Don't move if a key is being held down
    if (this.takingInput)
      return;
    // Don't move if the move is not allowed
    if (!this.moveX && (
        side === Cursor.side.RIGHT ||
        side === Cursor.side.LEFT)) {
      this.disabled = true;
      return;
    }
    if (!this.moveY && (
        side === Cursor.side.UP ||
        side === Cursor.side.DOWN)) {
      this.disabled = true;
      return;
    }
    // Motions to different grid squares
    if (side === this.side) {
      // If returning from disabled state, delay a move so that other
      // cursors can "catch up"
      if (this.disabled) {
        this.disabled = false;
        return;
      }
      switch (side) {
        case Cursor.side.LEFT:
          if (this.x > 0) {
            this.x--;
            this.passOver(side);
          }
          break;
        case Cursor.side.RIGHT:
          if (this.x < this.board.col - 1) {
            this.x++;
            this.passOver(side);
          }
          break;
        case Cursor.side.DOWN:
          if (this.y < this.board.row - 1) {
            this.y++;
            this.passOver(side);
          }
          break;
        case Cursor.side.UP:
          if (this.y > 0) {
            this.y--;
            this.passOver(side);
          }
          break;
      }
      // this.passOver(side);
    } else {
      // Motions within a square
      if (side === this.side.opposite)
        this.passOver(side);
      this.disabled = false;
      this.side = side;
    }
  }

  passOver(side) {
    var block = this.board.getIndex(this.x, this.y);
    if (block !== null)
      if (this.next[side.name] !== undefined)
        this.next[side.name].blockReceived = block;
    this.board.setIndex(this.x, this.y, null);
  }

  update() {
    if (this.kb.isDown(Keyboarder.key.LEFT)) {
      this.move(Cursor.side.LEFT);
      this.takingInput = true;
    } else if (this.kb.isDown(Keyboarder.key.RIGHT)) {
      this.move(Cursor.side.RIGHT);
      this.takingInput = true;
    } else if (this.kb.isDown(Keyboarder.key.UP)) {
      this.move(Cursor.side.UP);
      this.takingInput = true;
    } else if (this.kb.isDown(Keyboarder.key.DOWN)) {
      this.move(Cursor.side.DOWN);
      this.takingInput = true;
    } else {
      this.takingInput = false;
    }
    if (this.blockReceived !== null) {
      this.board.setIndex(this.x, this.y, this.blockReceived);
      this.blockReceived = null;
    }
  }

  draw(context, x, y, cellWidth, cellHeight) {
    var xCorner = x + cellWidth * this.x;
    var yCorner = y + cellHeight * this.y;
    switch (this.side) {
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
