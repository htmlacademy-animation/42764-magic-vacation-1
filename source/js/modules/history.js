import AccentTypography from './accent-typography';

const screenStory = document.querySelector(`.screen--story`);
const title = screenStory.querySelector(`.slider__item-title`);

const historyTitleAccentTypography = new AccentTypography(
    title,
    `transform`,
    650,
    {min: 0, max: 150},
    `active`,
);

export {
  historyTitleAccentTypography
};
