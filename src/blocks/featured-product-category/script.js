import jQuery from 'jquery';
import 'slick-carousel';

jQuery(window).on('load', () => {
  const $sliders = jQuery(
    '.wp-block-gutenbee-featured-product-category__slider .wp-block-gutenbee-featured-product-category__content',
  );

  if ($sliders.length) {
    $sliders.each(function() {
      const $this = jQuery(this);

      const $columns = $this.data('columns');
      const $slides = $this.find('> div');

      if ($slides.length < $columns) {
        return;
      }

      $this.slick({
        arrows: true,
        dots: false,
        slidesToScroll: $columns,
        slidesToShow: $columns,
        prevArrow:
          '<button class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"/></svg></button>',
        nextArrow:
          '<button class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/></svg></button>',
        infinite: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: false,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              centerMode: true,
              centerPadding: '60px',
              slidesToShow: 1,
            },
          },
        ],
      });

      var $height = $this.find('.slick-slide').height();
      var $card = $this.find(
        '.wp-block-gutenbee-featured-product-category__card-wrap',
      );

      $card.height($height);

      let element = jQuery('body');

      let observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.target === element[0]) {
            var $height = $this.find('.slick-slide').height();
            $card.height($height);
          }
        }
      });

      observer.observe(element[0]);
    });
  }
});
