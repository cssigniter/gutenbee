import jQuery from 'jquery';
import 'slick-carousel';

jQuery(($) => {
  const $slideshow = $('.wp-block-gutenbee-slideshow');

  $slideshow.each(function () {
    const $this = $(this);

    $this.slick({
      arrows: $this.data('arrows'),
      dots: $this.data('dots'),
      autoplay: $this.data('autoplay'),
      fade: $this.data('fade'),
      infinite: $this.data('infinite'),
      speed: $this.data('speed'),
      autoplaySpeed: $this.data('autoplay-speed'),
    });
  });
});
