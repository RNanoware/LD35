export default class Keyboarder {
  constructor() {
    this.keyState = {};
    window.onkeydown = e => this.keyState[e.keyCode] = true;
    window.onkeyup = e => this.keyState[e.keyCode] = false;
  }

  isDown(keyCode) {
    return this.keyState[keyCode] === true;
  }
}

Keyboarder.KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}
