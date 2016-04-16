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
}
