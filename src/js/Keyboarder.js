export default class Keyboarder {
  constructor() {
    this.keyState = {};
    window.addEventListener("keydown", e => this.keyState[e.keyCode] = true);
    window.addEventListener("keyup", e => this.keyState[e.keyCode] = false);
  }

  isDown(keyCode) {
    return this.keyState[keyCode] === true;
  }
}

Keyboarder.key = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
