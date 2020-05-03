import AccentTypography from './accent-typography';

const title = document.querySelector(`.intro__title`);
const date = document.querySelector(`.intro__date`);

const titleAccentTypography = new AccentTypography(
    title,
    `transform`,
    650,
    {min: 0, max: 150},
    `active`,
);
const dateAccentTypography = new AccentTypography(
    date,
    `transform`,
    350,
    {min: 0, max: 200},
    `active`,
);

export {
  titleAccentTypography,
  dateAccentTypography
};
