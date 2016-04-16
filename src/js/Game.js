export default class Game {
  constructor(canvasId) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext('2d');
    var gameSize = { x: 640, y: 480 };
    ({x: canvas.width, y: canvas.height} = gameSize);
  }

  tick() {
    this.update();
    this.draw();
    requestAnimationFrame(tick);
  }

  run() {
    this.tick();
  }
}
