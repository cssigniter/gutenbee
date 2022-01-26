import CountUp from 'countup';

import isElementInViewport from '../../util/isElementInViewport';

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.getElementsByClassName(
    'wp-block-gutenbee-countup-number',
  );

  const countupInit = element => {
    const separator = element.dataset.separator;
    const options = {
      useGrouping: !!separator,
      separator,
      prefix: element.dataset.prefix,
      suffix: element.dataset.suffix,
    };

    const countup = new CountUp(
      element,
      element.dataset.start,
      element.dataset.end,
      0,
      element.dataset.animationDuration,
      options,
    );

    if (!countup.error) {
      countup.start();
      element.dataset.started = true;
    }
  };

  [...elements].forEach(element => {
    if (element.dataset.inviewport === 'true') {
      const handler = () =>
        window.requestAnimationFrame(() => {
          if (isElementInViewport(element, 100) && !element.dataset.started) {
            countupInit(element);
          }
        });

      handler();
      window.addEventListener('scroll', handler);
    } else {
      countupInit(element);
    }
  });
});
