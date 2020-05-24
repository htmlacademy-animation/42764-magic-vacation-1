class GameTimer {
  constructor(fps) {
    this.fpsInterval = 1000 / fps;

    this.elementMinutes = document.querySelector(`.js-game-counter-minutes`);
    this.elementSeconds = document.querySelector(`.js-game-counter-seconds`);
  }

  addLeadingZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  draw(passedTime) {
    const minutes = passedTime.getMinutes();
    const seconds = passedTime.getSeconds();

    this.elementMinutes.innerHTML = this.addLeadingZero(minutes);
    this.elementSeconds.innerHTML = this.addLeadingZero(seconds);
  }

  tick() {
    this.requestId = requestAnimationFrame(this.tick.bind(this));
    this.now = Date.now();

    const passedFromLastTime = this.now - this.then;

    if (passedFromLastTime > this.fpsInterval) {
      this.then = this.now - (passedFromLastTime % this.fpsInterval);

      const passedFromStart = new Date(this.now - this.start);

      this.draw(passedFromStart);
    }
  }

  runTimer() {
    this.start = Date.now();

    this.now = this.start;
    this.then = this.start;

    this.requestId = requestAnimationFrame(this.tick.bind(this));
  }

  resetTimer() {
    cancelAnimationFrame(this.requestId);

    this.elementMinutes.innerHTML = `00`;
    this.elementSeconds.innerHTML = `00`;
  }
}

const gameTimer = new GameTimer(12);

export {
  gameTimer
};
