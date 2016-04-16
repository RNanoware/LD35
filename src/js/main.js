import Board from './Board';

var canvas = document.getElementById('canvas');
canvas.height = 480;
canvas.width = 640;
var context = canvas.getContext('2d');

var b = new Board(32, 24, [
  {x: 1, y: 3},
  {x: 20, y: 3},
  {x: 1, y: 10},
  {x: 31, y: 23},
  {x: 0, y: 0}
]);

function drawGrid(cellSize) {
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

drawGrid(20);
