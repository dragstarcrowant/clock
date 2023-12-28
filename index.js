const HAND_WIDTH = 250;

const calcHandTransform = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return {
    handTransform: `rotate(${((360 / 24 * hours - 90)) % 360}deg) translate(0, -50%)`,
    handWidth: `${HAND_WIDTH / 60 * (minutes || 1)}px`
  }
};

const calcSecondsSize = () => {
  const date = new Date();
  const seconds = date.getSeconds();

  return `${(seconds + 1) / 60 * 100}%`;
}

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

const tick = (hand, secondsCircle) => {
  const { handTransform, handWidth } = calcHandTransform();
  const secondsSize = calcSecondsSize();

  hand.style.transform = handTransform;
  hand.style.width = handWidth;

  secondsCircle.style.width = secondsSize;
  secondsCircle.style.height = secondsSize;
};

const main = () => {
  const clock = document.querySelector('.clock_i');
  const hand = createElementWithAttr('div', { class: 'hand' });
  const secondsCircle = createElementWithAttr('div', { class: 'seconds-circle' });

  const circles = new Array(6).fill(null).map((c) => {
    return createElementWithAttr('div', { class: 'circle' });
  });

  const hourLines = new Array(24).fill(null).map((_, ind, arr) => {
    const hourDegree = (360 / arr.length * ind);

    return createElementWithAttr('div', { class: `hour-line hour-line_${ind}`, style: `transform: rotate(${hourDegree - 90}deg) translate(0, -50%); transform-origin: 0 0`, 'data-hour': ind })
  });

  clock.append(...circles, ...hourLines, hand, secondsCircle);

  tick(hand, secondsCircle);

  const timer = setInterval(() => {
    tick(hand, secondsCircle);
  }, 1000);
};

main();
