import jQuery from 'jquery';
import 'slick-carousel';

jQuery(window).on('load', () => {
  const $slideshow = jQuery('.wp-block-gutenbee-slideshow');

  $slideshow.each(function() {
    const $this = jQuery(this);

    $this.slick({
      arrows: $this.data('arrows'),
      dots: $this.data('dots'),
      autoplay: $this.data('autoplay'),
      fade: $this.data('fade'),
      infinite: $this.data('infinite'),
      speed: $this.data('speed'),
      autoplaySpeed: $this.data('autoplay-speed'),
      slidesToScroll: $this.data('slides-to-scroll'),
      slidesToShow: $this.data('slides-to-show'),
      pauseOnHover: $this.data('pause-on-hover'),
      slide: '.gutenbee-slideshow-item',
      customPaging: () => {
        return jQuery('<button type="button" />').css({
          backgroundColor: $this.data('dots-color'),
        });
      },
    });
  });
});
