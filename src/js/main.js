import Board from './Board';
import Cursor from './Cursor';

var canvas = document.getElementById('canvas');
canvas.height = 480;
canvas.width = 640;
var context = canvas.getContext('2d');

function drawGrid(cellSize) {
  context.strokeStyle = "gray";
  context.fillStyle = "black";
  for (let i = 0; i < canvas.width / cellSize; i++) {
    for (let j = 0; j < canvas.height / cellSize; j++) {
      if (b.getIndex(i, j) === 1) {
        context.fillRect(i*cellSize, j*cellSize, cellSize, cellSize);
      } else {
        context.strokeRect(i*cellSize, j*cellSize, cellSize, cellSize);
      }
    }
  }
}

function drawCursor(cursor, cellSize) {
  var xCorner = cellSize * cursor.x;
  var yCorner = cellSize * cursor.y;
  switch (cursor.side) {
    case Cursor.side.LEFT:
      var xStart = xCorner + 1;
      var yStart = yCorner + 1;
      var xEnd = xStart;
      var yEnd = yCorner + cellSize - 1;
      break;
    case Cursor.side.RIGHT:
      var xStart = xCorner + cellSize - 1;
      var yStart = yCorner + 1;
      var xEnd = xStart;
      var yEnd = yCorner + cellSize - 1;
      break;
    case Cursor.side.DOWN:
      var xStart = xCorner + 1;
      var yStart = yCorner + cellSize - 1;
      var xEnd = xCorner + cellSize - 1;
      var yEnd = yStart;
      break;
    case Cursor.side.UP:
      var xStart = xCorner + 1;
      var yStart = yCorner + 1;
      var xEnd = xCorner + cellSize - 1;
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

var b = new Board(32, 24, [
  {x: 1, y: 3},
  {x: 20, y: 3},
  {x: 1, y: 10},
  {x: 31, y: 23},
  {x: 0, y: 0}
]);

var c = new Cursor(b, 1, 1, Cursor.side.UP);

drawGrid(20);
drawCursor(c, 20);
