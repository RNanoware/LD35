export default class Board {
  constructor(row, col, goal = null) {
    this.row = row;
    this.col = col;
    this.grid = new Array(row);
    for (let i = 0; i < this.grid.length; i++)
      this.grid[i] = new Array(col).fill(null);
    this.goal = goal;
  }

  getIndex(x, y) {
    return this.grid[y][x];
  }

  getGoalIndex(x, y) {
    return this.goal ? this.goal[y][x] : null;
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
    var cellWidth = w / this.col;
    var cellHeight = h / this.row;
    for (let i = 0; i < this.col; i++) {
      for (let j = 0; j < this.row; j++) {
        if (this.getIndex(i, j) !== null) {
          context.fillStyle = this.getIndex(i, j);
          context.fillRect(x + i*cellWidth, y + j*cellHeight, cellWidth, cellHeight);
        } else if (this.getGoalIndex(i, j) !== null) {
          context.fillStyle = this.hexToRgb(this.getGoalIndex(i, j));
          context.fillRect(x + i*cellWidth, y + j*cellHeight, cellWidth, cellHeight);
        }
        context.strokeRect(x + i*cellWidth, y + j*cellHeight, cellWidth, cellHeight);
      }
    }
    if (typeof this.cursor !== 'undefined')
      this.cursor.draw(context, x, y, cellWidth, cellHeight);
  }

  hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var resultArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var resultObj = {
      r: parseInt(resultArray[1], 16),
      g: parseInt(resultArray[2], 16),
      b: parseInt(resultArray[3], 16)
    };
    return `rgba(${resultObj.r},${resultObj.g},${resultObj.b},0.25)`;
  }

  update() {
    if (typeof this.cursor !== 'undefined')
      this.cursor.update();
  }
}
