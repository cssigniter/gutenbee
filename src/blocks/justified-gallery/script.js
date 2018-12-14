import jQuery from 'jquery';
import 'justifiedGallery';

jQuery($ => {
  const $justifiedGallery = $('.wp-block-gutenbee-justified-gallery');

  $justifiedGallery.each(function() {
    const $this = $(this);

    $this.justifiedGallery({
      rowHeight: $this.data('row-height'),
      margins: $this.data('margins'),
      lastRow: $this.data('last-row'),
      randomize: $this.data('randomize'),
    });
  });
});
