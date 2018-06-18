import CountUp from 'countup';

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.getElementsByClassName('wp-block-gutenbee-countup');

  [...elements].forEach((element) => {
    const separator = element.dataset.separator;
    const options = {
      useGrouping: !!separator,
      separator,
      decimal: element.dataset.decimal,
      prefix: element.dataset.prefix,
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


