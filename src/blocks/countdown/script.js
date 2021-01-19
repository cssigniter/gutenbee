import jQuery from 'jquery';

import CountdownTimer from '../../util/CountdownTimer';

jQuery($ => {
  const $countdown = $('.wp-block-gutenbee-countdown');

  $countdown.each(function() {
    const $this = $(this);
    const date = $this.data('date') || '1900-01-01T00:00:00';

    // eslint-disable-next-line no-new
    new CountdownTimer($this.get(0), date);
  });
});
