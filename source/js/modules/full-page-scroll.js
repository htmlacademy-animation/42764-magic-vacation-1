import throttle from 'lodash/throttle';
import {titleAccentTypography, dateAccentTypography} from './intro';
import {historyTitleAccentTypography} from './history';
import {gameTimer, casesCounter, codesCounter} from './game';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.fillScreen = document.querySelector(`.fill-screen`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
    this.changePageDisplay();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
    this.handleAnimations();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    const isPrizesScreenActive = this.activeScreen === 2;

    if (isPrizesScreenActive) {
      this.screenElements.forEach((screen) => {
        this.fillScreen.classList.add(`active`);
        setTimeout(() => this.hideScreen(screen), 650);
      });

      this.fillScreen.classList.add(`active`);
      setTimeout(() => this.showScreen(this.screenElements[this.activeScreen]), 650);
    } else {
      this.screenElements.forEach((screen) => {
        this.fillScreen.classList.remove(`active`);
        this.hideScreen(screen);
      });

      this.fillScreen.classList.remove(`active`);
      this.showScreen(this.screenElements[this.activeScreen]);
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }

  hideScreen(screen) {
    screen.classList.add(`screen--hidden`);
    screen.classList.remove(`active`);
  }

  showScreen(screen) {
    screen.classList.remove(`screen--hidden`);
    screen.classList.add(`active`);
  }

  handleAnimations() {
    const isIntroPage = this.activeScreen === 0;
    const isHistoryPage = this.activeScreen === 1;
    const isPrizesPage = this.activeScreen === 2;
    const isGamePage = this.activeScreen === 4;

    if (isIntroPage) {
      setTimeout(() => titleAccentTypography.runAnimation(), 500);
      setTimeout(() => dateAccentTypography.runAnimation(), 1300);
    } else {
      titleAccentTypography.destroyAnimation();
      dateAccentTypography.destroyAnimation();
    }

    if (isHistoryPage) {
      setTimeout(() => historyTitleAccentTypography.runAnimation(), 100);
    } else {
      historyTitleAccentTypography.destroyAnimation();
    }

    const casesDescElement = document.querySelector(`.js-prizes-cases-desc`);
    const codesDescElement = document.querySelector(`.js-prizes-codes-desc`);

    if (isPrizesPage) {
      setTimeout(() => {
        casesDescElement.classList.add(`active`);
        casesCounter.runCounter();
      }, 5000);

      setTimeout(() => {
        codesDescElement.classList.add(`active`);
        codesCounter.runCounter();
      }, 6000);
    } else {
      casesDescElement.classList.remove(`active`);
      codesDescElement.classList.remove(`active`);

      casesCounter.resetCounter();
      codesCounter.resetCounter();
    }

    if (isGamePage) {
      gameTimer.runTimer();
    } else {
      gameTimer.resetTimer();
    }
  }
}
