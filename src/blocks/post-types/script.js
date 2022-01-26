import jQuery from 'jquery';

jQuery($ => {
  const $loadMoreButtons = $('.wp-block-gutenbee-post-types-load-more-button');

  $loadMoreButtons.each(function() {
    const $this = $(this);
    const $block = $this.closest('.wp-block-gutenbee-post-types');
    const $items = $block.find('[class*="row-items"]');
    const blockId = $block.attr('id');
    let nextLink = $block.find('.navigation .page-numbers.next').attr('href');

    if (!nextLink) {
      $this.hide();
    }

    $this.on('click', () => {
      $block.addClass('gutenbee-block-is-loading');
      $this.addClass('gutenbee-button-is-loading');

      $.get(nextLink, function(data) {
        const $body = $(data);
        const $newBlock = $body.find(`#${blockId}`);
        const $newItems = $newBlock.find('[class*="row-items"] > div');

        // Update the link so that we fetch the next page.
        nextLink = $newBlock
          .find('.navigation .page-numbers.next')
          .attr('href');

        if (!nextLink) {
          $this.fadeOut('fast');
        }

        $items.append($newItems);
        $block.removeClass('gutenbee-block-is-loading');
        $this.removeClass('gutenbee-button-is-loading');
        $('body').trigger('gutenbee.posts-loaded', [$newItems]);
      });
    });
  });
});
