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
      prevArrow:
        '<button class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"/></svg></button>',
      nextArrow:
        '<button class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/></svg></button>',
      customPaging: () => {
        return jQuery('<button type="button" />').css({
          backgroundColor: $this.data('dots-color'),
        });
      },
    });
  });
});
