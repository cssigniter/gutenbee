import jQuery from 'jquery';

jQuery($ => {
  var $window = $(window);

  $.fn.gutenbeeParallax = function(opts) {
    var options = $.extend(
      {},
      {
        speed: null,
        direction: null,
      },
      opts,
    );

    var $elements = this.each(function() {
      var $this = $(this);
      var speed = options.speed || $this.data('parallax-speed');

      $this.css({ height: 100 + speed * 100 + '%' });
    });

    function update() {
      var wheight = $window.height();
      var wscroll = $window.scrollTop();

      $elements.each(function() {
        var $this = $(this);
        var $parent = $this.parent();
        var elHeight = $parent.outerHeight();
        var heightDelta = $this.outerHeight() - elHeight;
        var elTop = $parent.offset().top + elHeight;

        var scrollPercentage = (elTop - wscroll) / (wheight + elHeight);
        var ypos = (scrollPercentage - 1) * heightDelta;

        $this.css({
          transform: 'translateY(' + ypos + 'px)',
        });
      });
    }

    var requestParallaxUpdate = function() {
      window.requestAnimationFrame(update);
    };

    $window
      .on('scroll', requestParallaxUpdate)
      .on('resize', requestParallaxUpdate);

    update();

    $.fn.gutenbeeParallax.destroy = function() {
      $elements.each(function() {
        var $this = $(this);
        $this.css({ height: '100%', transform: 'none' });
      });

      $window
        .off('scroll', requestParallaxUpdate)
        .off('resize', requestParallaxUpdate);
    };

    return $elements;
  };

  $('.gutenbee-parallax').gutenbeeParallax();
});
