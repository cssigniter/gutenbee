import CountUp from 'countup';

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.getElementsByClassName(
    'wp-block-gutenbee-countup-number',
  );

  [...elements].forEach(element => {
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
    }
  });
});
