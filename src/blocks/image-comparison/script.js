import jQuery from 'jquery';
import 'zurb-twentytwenty/js/jquery.event.move';
import 'zurb-twentytwenty/js/jquery.twentytwenty';

jQuery($ => {
  $(window).load(() => {
    $('.wp-block-gutenbee-image-comparison').each(function() {
      const $this = $(this);

      $this.twentytwenty({
        default_offset_pct: $this.data('offset') / 100,
      });
    });
  });
});
