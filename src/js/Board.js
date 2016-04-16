export default class Board {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.grid = new Array(row);
    this.grid.fill(new Array(col));
  }
}
