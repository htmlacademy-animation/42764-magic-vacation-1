export default class AccentTypography {
  constructor(element, property, timer, delay, classForActivate) {
    this.element = element;
    this.property = property;
    this.timer = timer;
    this.delay = delay;
    this.classForActivate = classForActivate;

    this.prepareText();
  }

  createElement(letter) {
    const span = document.createElement(`span`);

    span.className = `letter`;
    span.textContent = letter;
    span.style.transition = `${this.property} ${this.timer}ms ease ${this.getTimeOffset()}ms`;

    return span;
  }

  prepareText() {
    if (!this.element) {
      return;
    }

    const text = this.element.textContent.trim().split(` `).filter((latter) => latter !== ``);

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, latter) => {
        fragment.appendChild(this.createElement(latter));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);

      wordContainer.classList.add(`word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.appendChild(content);
  }

  getTimeOffset() {
    return Math.floor(Math.random() * (this.delay.max - this.delay.min + 1)) + this.delay.min;
  }

  runAnimation() {
    if (!this.element) {
      return;
    }
    this.element.classList.add(this.classForActivate);
  }

  destroyAnimation() {
    this.element.classList.remove(this.classForActivate);
  }
}
