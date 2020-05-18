export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);

        animateResultSvg(targetEl[0]);
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }

  function animateResultSvg(element) {
    const resultTitle = element.querySelector(`.result__title`);
    const svg = resultTitle.querySelector(`svg`);
    const svgClone = svg.cloneNode(true);
    const pathes = svgClone.querySelectorAll(`path`);

    svg.remove();

    [].slice.call(pathes).forEach((path, index) => {
      const pathTotalLength = path.getTotalLength();

      path.setAttribute(`stroke-dashoffset`, 0);
      path.setAttribute(`stroke-dasharray`, `${pathTotalLength / 24} ${7 * pathTotalLength / 24}`);

      const strokeDasharrayAnimate = path.querySelector(`#strokeDasharrayAnimate`);
      const transformAnimate = path.querySelector(`#transformAnimate`);

      if (strokeDasharrayAnimate) {
        strokeDasharrayAnimate.setAttribute(`from`, `${pathTotalLength / 24} ${7 * pathTotalLength / 24}`);
        strokeDasharrayAnimate.setAttribute(`to`, `${pathTotalLength / 3} 0`);
        strokeDasharrayAnimate.setAttribute(`dur`, `0.5s`);

        if (transformAnimate) {
          strokeDasharrayAnimate.setAttribute(`begin`, `${(index + 1) * 100}ms`);
          strokeDasharrayAnimate.setAttribute(`dur`, `0.1s`);
        }
      }

      if (transformAnimate) {
        transformAnimate.setAttribute(`values`, `0 0; 0 100; 0 80; 0 100`);
        transformAnimate.setAttribute(`begin`, `${(index + 1) * 100}ms`);
        transformAnimate.setAttribute(`dur`, `0.75s`);
      }
    });

    resultTitle.appendChild(svgClone);
  }
};
