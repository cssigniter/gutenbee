import CountdownTimer from '../../util/CountdownTimer';

document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.querySelectorAll('.wp-block-gutenbee-countdown');

  [...countdown].forEach(element => {
    const date = element.dataset.date || '1900-01-01T00:00:00';

    // eslint-disable-next-line no-new
    new CountdownTimer(element, date);
  });
});
