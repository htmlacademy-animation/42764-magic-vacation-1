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

class Counter {
  constructor(fps, elementSelector, {startNumber, endNumber, step}) {
    this.fpsInterval = 1000 / fps;

    this.prizesCasesElement = document.querySelector(elementSelector);
    this.startNumber = startNumber;
    this.endNumber = endNumber;
    this.step = step;


    this.currentNumber = this.startNumber;
  }

  draw() {
    this.currentNumber = Math.min(this.currentNumber + this.step, this.endNumber);

    this.prizesCasesElement.innerHTML = this.currentNumber;
  }

  tick() {
    this.requestId = requestAnimationFrame(this.tick.bind(this));

    this.now = Date.now();

    const passedFromLastTime = this.now - this.then;

    if (passedFromLastTime > this.fpsInterval) {
      this.then = this.now - (passedFromLastTime % this.fpsInterval);

      this.draw();
    }

    if (this.currentNumber >= this.endNumber) {
      this.stopCounter();
    }
  }

  runCounter() {
    this.now = Date.now();
    this.then = this.now;

    this.requestId = requestAnimationFrame(this.tick.bind(this));
  }

  stopCounter() {
    cancelAnimationFrame(this.requestId);
  }

  resetCounter() {
    cancelAnimationFrame(this.requestId);

    this.prizesCasesElement.innerHTML = this.startNumber;
  }

}

const gameTimer = new GameTimer(12);
const casesCounter = new Counter(12, `.js-prizes-cases-number`, {startNumber: 1, endNumber: 7, step: 1});
const codesCounter = new Counter(12, `.js-prizes-codes-number`, {startNumber: 11, endNumber: 900, step: 148});

export {
  gameTimer,
  casesCounter,
  codesCounter
};
