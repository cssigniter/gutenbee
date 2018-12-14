import jQuery from 'jquery';

jQuery($ => {
  const expandedClass = 'wp-block-gutenbee-accordion-item-expanded';
  const $titles = $('.wp-block-gutenbee-accordion-item-title');
  const $defaultExpanded = $(`.${expandedClass}`);

  $defaultExpanded
    .find('.wp-block-gutenbee-accordion-item-content-wrap')
    .slideDown(350);

  $titles.on('click', function() {
    const $this = $(this);
    const $accordion = $this.parents('.wp-block-gutenbee-accordion');
    const $item = $this.parent('.wp-block-gutenbee-accordion-item');
    const $content = $item.find(
      '.wp-block-gutenbee-accordion-item-content-wrap',
    );
    const collapseOthers = $accordion.data('collapse-others');

    if ($item.hasClass(expandedClass)) {
      $content.slideUp(350);
      $item.removeClass(expandedClass);
    } else {
      if (collapseOthers) {
        $item
          .siblings()
          .removeClass(expandedClass)
          .find('.wp-block-gutenbee-accordion-item-content-wrap')
          .slideUp(350);
      }
      $content.slideDown(350);
      $item.addClass(expandedClass);
    }
  });
});
