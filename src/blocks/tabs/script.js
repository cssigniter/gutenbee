import jQuery from 'jquery';

jQuery(($) => {
  const $tabs = $('.wp-block-gutenbee-tabs');

  $tabs.each(function () {
    const $this = $(this);
    const $tabTitles = $this.find('.wp-block-gutenbee-tabs-item-title');
    const $tabContents = $this.find('.wp-block-gutenbee-tabs-item');
    const $titleWrap = $('<div />', {
      class: 'wp-block-gutenbee-tabs-titles',
    });

    $titleWrap.append($tabTitles);
    $this.prepend($titleWrap);

    const $titles = $this.find('.wp-block-gutenbee-tabs-titles')
      .find('.wp-block-gutenbee-tabs-item-title');

    $titles
      .eq(0)
      .addClass('wp-block-gutenbee-tabs-item-title-active');
    $tabContents
      .eq(0)
      .addClass('wp-block-gutenbee-tabs-item-active');

    $titles.on('click', function () {
      const $that = $(this);

      $titles.removeClass('wp-block-gutenbee-tabs-item-title-active');
      $that.addClass('wp-block-gutenbee-tabs-item-title-active');
      $tabContents.removeClass('wp-block-gutenbee-tabs-item-active');
      $tabContents.eq($that.index()).addClass('wp-block-gutenbee-tabs-item-active');
    });
  });
});
