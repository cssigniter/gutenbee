import jQuery from 'jquery';
import 'justifiedGallery';

jQuery($ => {
  const $justifiedGallery = $('.wp-block-gutenbee-gallery-justified');

  $justifiedGallery.each(function() {
    const $this = $(this);
    const $content = $this.find('.wp-block-gutenbee-gallery-content');
    const $type = $this.data('gallery-type');

    if ($type !== 'justified') {
      return;
    }

    $content.justifiedGallery({
      rowHeight: $this.data('row-height'),
      margins: $this.data('margins'),
      lastRow: $this.data('last-row'),
      randomize: $this.data('randomize'),
    });
  });
});
