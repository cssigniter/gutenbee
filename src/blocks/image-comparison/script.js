import jQuery from 'jquery';
import 'zurb-twentytwenty/js/jquery.event.move';
import 'zurb-twentytwenty/js/jquery.twentytwenty';

jQuery(window).on('load', () => {
  jQuery('.wp-block-gutenbee-comparison-wrap').each(function() {
    const $this = jQuery(this);

    $this.twentytwenty({
      default_offset_pct: $this.data('offset') / 100,
      before_label: window.gutenbeeStrings.image_comparison_before_label,
      after_label: window.gutenbeeStrings.image_comparison_after_label,
    });
  });
});
