const createElementWithAttr = (el, attrs) => {
  const htmlEl = document.createElement(el);
  const attrKeys = Object.keys(attrs);

  if (attrKeys.length) {
    attrKeys.forEach((key) => {
      htmlEl.setAttribute(key, attrs[key]);
    });
  }

  return htmlEl;
};

const tick = (hand) => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const handWidth = 250;

  hand.style.transform = `rotate(${((360 / 24 * hours - 90)) % 360}deg) translate(0, -50%)`;
  hand.style.width = `${handWidth / 60 * minutes}px`;
};

const main = () => {
  const clock = document.querySelector('.clock_i');
  const hand = createElementWithAttr('div', { class: 'hand' });

  const circles = new Array(6).fill(null).map((c) => {
    return createElementWithAttr('div', { class: 'circle' });
  });

  const hourMarks = new Array(24).fill(null).map((_, ind, arr) => {
    const hourDegree = (360 / arr.length * ind);

    return createElementWithAttr('div', { class: `hour-mark ${ind}`, style: `transform: rotate(${hourDegree}deg) translate(0, -50%); transform-origin: 0 0` })
  });

  const hourDots = new Array(24).fill(null).map((_, ind, arr) => {
    const hourDegree = (360 / arr.length * ind) * Math.PI / 180;

    return createElementWithAttr('div', { class: `hour-dot ${ind}`, style: `left: ${Math.sin(hourDegree) * 250 + 250}px; top: ${Math.cos(hourDegree) * 250 + 250}px; transform: translate(-50%, -50%); transform-origin: 0 0` })
  });

  clock.append(...circles, ...hourMarks, hand, ...hourDots);

  tick(hand);

  const timer = setInterval(() => {
    tick(hand);
  }, 1000);
};

main();
