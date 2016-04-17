export default class Board {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.grid = new Array(row);
    for (let i = 0; i < this.grid.length; i++)
      this.grid[i] = new Array(col).fill(0);
  }

  getIndex(x, y) {
    return this.grid[y][x];
  }

  setIndex(x, y, val) {
    this.grid[y][x] = val;
  }

  setAll(indices, val) {
    for (let pair of indices)
      this.setIndex(pair.x, pair.y, val);
  }

  addCursor(c) {
    this.cursor = c;
  }

  draw(context, x, y, w, h) {
    context.strokeStyle = "gray";
    context.lineWidth = 1;
    context.fillStyle = "black";
    var cellWidth = w / this.col;
    var cellHeight = h / this.row;
    for (let i = 0; i < this.col; i++) {
      for (let j = 0; j < this.row; j++) {
        if (this.getIndex(i, j) === 1)
          context.fillRect(x + i*cellWidth, y + j*cellHeight, cellWidth, cellHeight);
        context.strokeRect(x + i*cellWidth, y + j*cellHeight, cellWidth, cellHeight);
      }
    }
    if (typeof this.cursor !== 'undefined')
      this.cursor.draw(context, x, y, cellWidth, cellHeight);
  }

  update() {
    if (typeof this.cursor !== 'undefined')
      this.cursor.update();
  }
}
