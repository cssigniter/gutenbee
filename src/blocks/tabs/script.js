import jQuery from 'jquery';

jQuery($ => {
  const prefix = 'wp-block-gutenbee-tabs';
  const $tabs = $(`.${prefix}`);

  $tabs.each(function() {
    const $this = $(this);
    const $titles = $this.find(`.${prefix}-nav-item`);
    const $tabContents = $this.find(`.${prefix}-tab-content`);

    $titles.on('click', function(event) {
      event.preventDefault();
      const $title = $(this);
      const index = $title.index();

      $title
        .addClass(`${prefix}-nav-item-active`)
        .siblings()
        .removeClass(`${prefix}-nav-item-active`);
      $tabContents.hide();
      $tabContents.eq(index).fadeIn('fast');
    });
  });
});
