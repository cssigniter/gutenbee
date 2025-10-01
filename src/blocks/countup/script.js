import CountUp from 'countup';
import DOMPurify from 'dompurify';

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
      prefix: DOMPurify.sanitize(element.dataset.prefix || '', {
        ALLOWED_TAGS: [],
      }),
      suffix: DOMPurify.sanitize(element.dataset.suffix || '', {
        ALLOWED_TAGS: [],
      }),
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
