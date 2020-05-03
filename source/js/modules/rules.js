export default () => {
  const rulesItems = document.querySelectorAll(`.rules__item`);

  if (rulesItems.length) {
    const lastRulesItem = rulesItems[rulesItems.length - 1];

    lastRulesItem.addEventListener(`animationend`, () => {
      const rulesLink = document.querySelector(`.rules__link`);

      rulesLink.classList.add(`active`);
    });
  }
};
