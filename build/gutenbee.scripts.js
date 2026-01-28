/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/accordion/script.js":
/*!****************************************!*\
  !*** ./src/blocks/accordion/script.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

jquery__WEBPACK_IMPORTED_MODULE_0___default()($ => {
  const expandedClass = 'wp-block-gutenbee-accordion-item-expanded';
  const $titles = $('.wp-block-gutenbee-accordion-item-title');
  const $defaultExpanded = $(`.${expandedClass}`);
  $defaultExpanded.find('.wp-block-gutenbee-accordion-item-content-wrap').slideDown(350);
  $titles.on('click', function () {
    const $this = $(this);
    const $accordion = $this.parents('.wp-block-gutenbee-accordion');
    const $item = $this.parent('.wp-block-gutenbee-accordion-item');
    const $content = $item.find('.wp-block-gutenbee-accordion-item-content-wrap');
    const collapseOthers = $accordion.data('collapse-others');
    if ($item.hasClass(expandedClass)) {
      $content.slideUp(350);
      $item.removeClass(expandedClass);
    } else {
      if (collapseOthers) {
        $item.siblings().removeClass(expandedClass).find('.wp-block-gutenbee-accordion-item-content-wrap').slideUp(350);
      }
      $content.slideDown(350);
      $item.addClass(expandedClass);
    }
  });
});

/***/ }),

/***/ "./src/blocks/banner/script.js":
/*!*************************************!*\
  !*** ./src/blocks/banner/script.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_video_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/video/providers */ "./src/util/video/providers.js");


jquery__WEBPACK_IMPORTED_MODULE_0___default()($ => {
  const $window = $(window);

  /* -----------------------------------------
  Video Backgrounds
  ----------------------------------------- */
  const $videoBg = $('.wp-block-gutenbee-banner .wp-block-gutenbee-video-bg');
  const $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');

  // YouTube videos
  function onYouTubeAPIReady($videoBg) {
    const $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    const $block = $videoWrap.closest('.wp-block-gutenbee-banner');
    const videoId = $videoWrap.data('video-id');
    const startTime = $videoWrap.data('video-start');
    const video = $videoBg.attr('id');
    new window.YT.Player(video, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        loop: 1,
        playlist: videoId,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 0,
        start: startTime || undefined
      },
      events: {
        onReady: function (event) {
          event.target.mute();
          event.target.playVideo();
        },
        onStateChange: function (event) {
          if (event.data === window.YT.PlayerState.PLAYING) {
            adjustVideoSize($videoWrap);
            $videoWrap.addClass('visible');
            $block.addClass('gutenbee-video-loaded');
          }
        }
      }
    });
  }

  // Vimeo videos
  function onVimeoAPIReady($videoBg) {
    const $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    const $block = $videoWrap.closest('.wp-block-gutenbee-banner');
    const videoId = $videoWrap.data('video-id');
    const startTime = $videoWrap.data('video-start');
    const player = new window.Vimeo.Player($videoBg, {
      id: videoId,
      loop: true,
      autoplay: true,
      byline: false,
      title: false,
      autopause: false,
      muted: true
    });
    player.setVolume(0);
    if (startTime) {
      player.setCurrentTime(startTime);
    }
    player.on('play', function () {
      adjustVideoSize($videoWrap);
      $videoWrap.addClass('visible');
      $block.addClass('gutenbee-video-loaded');
    });
  }
  let videoResizeTimer;
  $window.on('resize.ciVideo', function () {
    clearTimeout(videoResizeTimer);
    videoResizeTimer = setTimeout(function () {
      $videoWrap.each(function () {
        const $this = $(this);
        adjustVideoSize($this);
      });
    }, 350);
  });
  function getVideoSize($videoWrap) {
    const containerWidth = $videoWrap.outerWidth();
    const containerHeight = $videoWrap.outerHeight();
    const aspectRatio = 16 / 9;
    const ratioWidth = containerWidth / aspectRatio;
    const ratioHeight = containerHeight * aspectRatio;
    const isWidthFixed = containerWidth / containerHeight > aspectRatio;
    return {
      width: isWidthFixed ? containerWidth : ratioHeight,
      height: isWidthFixed ? ratioWidth : containerHeight
    };
  }
  function adjustVideoSize($videoWrap) {
    const size = getVideoSize($videoWrap);
    $videoWrap.find('iframe, video').css({
      width: size.width + 'px',
      height: size.height + 'px'
    });
  }
  if ($videoBg.length && window.innerWidth > 1080) {
    $videoBg.each(async function () {
      const $this = $(this);
      const videoType = $this.parents('.wp-block-gutenbee-video-bg-wrapper').data('video-type');
      const $videoWrap = $this.parents('.wp-block-gutenbee-video-bg-wrapper');
      const $block = $this.closest('.wp-block-gutenbee-banner');
      if (videoType === 'youtube') {
        await (0,_util_video_providers__WEBPACK_IMPORTED_MODULE_1__.maybeLoadYouTubeApi)();
        onYouTubeAPIReady($this);
      } else if (videoType === 'vimeo') {
        await (0,_util_video_providers__WEBPACK_IMPORTED_MODULE_1__.maybeLoadVimeoApi)();
        onVimeoAPIReady($this);
      } else if (videoType === 'self') {
        $videoWrap.find('video').on('play', () => {
          $videoWrap.addClass('visible');
          $block.addClass('gutenbee-video-loaded');
        });
      }
    });
  }
});

/***/ }),

/***/ "./src/blocks/container/script.js":
/*!****************************************!*\
  !*** ./src/blocks/container/script.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_video_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/video/providers */ "./src/util/video/providers.js");


jquery__WEBPACK_IMPORTED_MODULE_0___default()($ => {
  const $window = $(window);

  /* -----------------------------------------
  Video Backgrounds
  ----------------------------------------- */
  const $videoBg = $('.wp-block-gutenbee-container .wp-block-gutenbee-video-bg');
  const $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');

  // YouTube videos
  function onYouTubeApiReady($videoBg) {
    const $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    const $block = $videoWrap.closest('.wp-block-gutenbee-container');
    const videoId = $videoWrap.data('video-id');
    const startTime = $videoWrap.data('video-start');
    const video = $videoBg.attr('id');
    new window.YT.Player(video, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        loop: 1,
        playlist: videoId,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 0,
        start: startTime || undefined
      },
      events: {
        onReady: function (event) {
          event.target.mute();
          event.target.playVideo();
        },
        onStateChange: function (event) {
          if (event.data === window.YT.PlayerState.PLAYING) {
            adjustVideoSize($videoWrap);
            $videoWrap.addClass('visible');
            $block.addClass('gutenbee-video-loaded');
          }
        }
      }
    });
  }

  // Vimeo videos
  function onVimeoApiReady($videoBg) {
    const $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    const $block = $videoWrap.closest('.wp-block-gutenbee-container');
    const videoId = $videoWrap.data('video-id');
    const startTime = $videoWrap.data('video-start');
    const player = new window.Vimeo.Player($videoBg, {
      id: videoId,
      loop: true,
      autoplay: true,
      byline: false,
      title: false,
      autopause: false,
      muted: true
    });
    player.setVolume(0);
    if (startTime) {
      player.setCurrentTime(startTime);
    }
    player.on('playing', function () {
      adjustVideoSize($videoWrap);
      $videoWrap.addClass('visible');
      $block.addClass('gutenbee-video-loaded');
    });
  }
  let videoResizeTimer;
  $window.on('resize.ciVideo', function () {
    clearTimeout(videoResizeTimer);
    videoResizeTimer = setTimeout(function () {
      $videoWrap.each(function () {
        const $this = $(this);
        adjustVideoSize($this);
      });
    }, 350);
  });
  function getVideoSize($videoWrap) {
    const containerWidth = $videoWrap.outerWidth();
    const containerHeight = $videoWrap.outerHeight();
    const aspectRatio = 16 / 9;
    const ratioWidth = containerWidth / aspectRatio;
    const ratioHeight = containerHeight * aspectRatio;
    const isWidthFixed = containerWidth / containerHeight > aspectRatio;
    return {
      width: isWidthFixed ? containerWidth : ratioHeight,
      height: isWidthFixed ? ratioWidth : containerHeight
    };
  }
  function adjustVideoSize($videoWrap) {
    const size = getVideoSize($videoWrap);
    $videoWrap.find('iframe, video').css({
      width: size.width + 'px',
      height: size.height + 'px'
    });
  }
  if ($videoBg.length && window.innerWidth > 1080) {
    $videoBg.each(async function () {
      const $this = $(this);
      const videoType = $this.parents('.wp-block-gutenbee-video-bg-wrapper').data('video-type');
      const $videoWrap = $this.parents('.wp-block-gutenbee-video-bg-wrapper');
      const $block = $this.closest('.wp-block-gutenbee-container');
      if (videoType === 'youtube') {
        await (0,_util_video_providers__WEBPACK_IMPORTED_MODULE_1__.maybeLoadYouTubeApi)();
        onYouTubeApiReady($this);
      } else if (videoType === 'vimeo') {
        await (0,_util_video_providers__WEBPACK_IMPORTED_MODULE_1__.maybeLoadVimeoApi)();
        onVimeoApiReady($this);
      } else if (videoType === 'self') {
        $videoWrap.find('video').on('play', () => {
          $videoWrap.addClass('visible');
          $block.addClass('gutenbee-video-loaded');
        });
      }
    });
  }
});

/***/ }),

/***/ "./src/blocks/countdown/script.js":
/*!****************************************!*\
  !*** ./src/blocks/countdown/script.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_CountdownTimer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/CountdownTimer */ "./src/util/CountdownTimer.js");

document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.querySelectorAll('.wp-block-gutenbee-countdown');
  [...countdown].forEach(element => {
    const date = element.dataset.date || '1900-01-01T00:00:00';

    // eslint-disable-next-line no-new
    new _util_CountdownTimer__WEBPACK_IMPORTED_MODULE_0__["default"](element, date);
  });
});

/***/ }),

/***/ "./src/blocks/countup/script.js":
/*!**************************************!*\
  !*** ./src/blocks/countup/script.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var countup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! countup */ "./node_modules/countup/dist/countUp.min.js");
/* harmony import */ var countup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(countup__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.es.mjs");
/* harmony import */ var _util_isElementInViewport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/isElementInViewport */ "./src/util/isElementInViewport.js");



document.addEventListener('DOMContentLoaded', () => {
  const elements = document.getElementsByClassName('wp-block-gutenbee-countup-number');
  const countupInit = element => {
    const separator = element.dataset.separator;
    const options = {
      useGrouping: !!separator,
      separator,
      prefix: dompurify__WEBPACK_IMPORTED_MODULE_1__["default"].sanitize(element.dataset.prefix || '', {
        ALLOWED_TAGS: []
      }),
      suffix: dompurify__WEBPACK_IMPORTED_MODULE_1__["default"].sanitize(element.dataset.suffix || '', {
        ALLOWED_TAGS: []
      })
    };
    const countup = new (countup__WEBPACK_IMPORTED_MODULE_0___default())(element, element.dataset.start, element.dataset.end, 0, element.dataset.animationDuration, options);
    if (!countup.error) {
      countup.start();
      element.dataset.started = true;
    }
  };
  [...elements].forEach(element => {
    if (element.dataset.inviewport === 'true') {
      const handler = () => window.requestAnimationFrame(() => {
        if ((0,_util_isElementInViewport__WEBPACK_IMPORTED_MODULE_2__["default"])(element, 100) && !element.dataset.started) {
          countupInit(element);
        }
      });
      handler();
      window.addEventListener('scroll', handler);
    } else {
      countupInit(element);
    }
  });
});

/***/ }),

/***/ "./src/blocks/google-maps/script.js":
/*!******************************************!*\
  !*** ./src/blocks/google-maps/script.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.es.mjs");


jquery__WEBPACK_IMPORTED_MODULE_0___default()(async $ => {
  const google = window.google;
  if (typeof google === 'undefined') {
    return;
  }
  const {
    Map
  } = await google.maps.importLibrary('maps');
  const {
    ColorScheme
  } = await google.maps.importLibrary('core');
  const {
    AdvancedMarkerElement
  } = await google.maps.importLibrary('marker');
  const $maps = $('.wp-block-gutenbee-google-maps > div, .wp-block-gutenbee-google-maps');
  $maps.each(function () {
    const $this = $(this);
    const location = {
      lat: parseFloat($this.data('latitude')),
      lng: parseFloat($this.data('longitude'))
    };
    const info = $this.data('info-window');
    const mapIdAttr = $this.data('map-id');
    const colorSchemeAttr = $this.data('color-scheme');
    const stylesAttr = $this.data('map-style');
    if (!location.lat || !location.lng) {
      return;
    }

    // Google Maps API limitation: mapId and custom styles are mutually exclusive
    // - With mapId: Cannot set custom styles (must use Cloud Console)
    // - Without mapId: Can set custom styles, but AdvancedMarkerElement has limited features
    // Prioritize custom styles when provided
    const hasCustomStyles = stylesAttr && Array.isArray(stylesAttr) && stylesAttr.length > 0;

    // Resolve ColorScheme
    let mapColorScheme = ColorScheme.FOLLOW_SYSTEM;
    if (colorSchemeAttr === 'LIGHT') {
      mapColorScheme = ColorScheme.LIGHT;
    } else if (colorSchemeAttr === 'DARK') {
      mapColorScheme = ColorScheme.DARK;
    }
    const mapOptions = {
      zoom: $this.data('zoom'),
      center: location,
      scrollwheel: !$this.data('prevent-scroll'),
      colorScheme: mapColorScheme
    };

    // Only use mapId when NO custom styles are present
    if (!hasCustomStyles) {
      mapOptions.mapId = mapIdAttr || 'DEMO_MAP_ID';
    }

    // Apply custom styles when present (only works without mapId)
    if (hasCustomStyles) {
      mapOptions.styles = stylesAttr;
    }
    const map = new Map($this.get(0), mapOptions);

    // Always use AdvancedMarkerElement
    const iconUrl = $this.data('marker-icon');
    let content = null;
    if (iconUrl) {
      const img = document.createElement('img');
      img.src = iconUrl;
      content = img;
    }
    const marker = new AdvancedMarkerElement({
      position: location,
      map,
      content
    });
    const infoWindow = new google.maps.InfoWindow({
      content: '<div class="wp-block-gutenbee-google-maps-info-window">' + (info ? dompurify__WEBPACK_IMPORTED_MODULE_1__["default"].sanitize(String(info)) : '') + '</div>',
      maxWidth: 350
    });
    if (info) {
      marker.addEventListener('gmp-click', () => {
        infoWindow.open({
          anchor: marker,
          map
        });
      });
    }
  });
});

/***/ }),

/***/ "./src/blocks/image-comparison/script.js":
/*!***********************************************!*\
  !*** ./src/blocks/image-comparison/script.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zurb_twentytwenty_js_jquery_event_move__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zurb-twentytwenty/js/jquery.event.move */ "./node_modules/zurb-twentytwenty/js/jquery.event.move.js");
/* harmony import */ var zurb_twentytwenty_js_jquery_event_move__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zurb_twentytwenty_js_jquery_event_move__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var zurb_twentytwenty_js_jquery_twentytwenty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zurb-twentytwenty/js/jquery.twentytwenty */ "./node_modules/zurb-twentytwenty/js/jquery.twentytwenty.js");
/* harmony import */ var zurb_twentytwenty_js_jquery_twentytwenty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(zurb_twentytwenty_js_jquery_twentytwenty__WEBPACK_IMPORTED_MODULE_2__);



jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('load', () => {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.wp-block-gutenbee-comparison-wrap').each(function () {
    const $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    $this.twentytwenty({
      default_offset_pct: $this.data('offset') / 100,
      before_label: window.gutenbeeStrings.image_comparison_before_label,
      after_label: window.gutenbeeStrings.image_comparison_after_label
    });
  });
});

/***/ }),

/***/ "./src/blocks/justified-gallery/script.js":
/*!************************************************!*\
  !*** ./src/blocks/justified-gallery/script.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var justifiedGallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! justifiedGallery */ "./node_modules/justifiedGallery/dist/js/jquery.justifiedGallery.js");
/* harmony import */ var justifiedGallery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(justifiedGallery__WEBPACK_IMPORTED_MODULE_1__);


jquery__WEBPACK_IMPORTED_MODULE_0___default()($ => {
  const $justifiedGallery = $('.wp-block-gutenbee-gallery-justified');
  $justifiedGallery.each(function () {
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
      randomize: $this.data('randomize')
    });
  });
});

/***/ }),

/***/ "./src/blocks/post-types/script.js":
/*!*****************************************!*\
  !*** ./src/blocks/post-types/script.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

jquery__WEBPACK_IMPORTED_MODULE_0___default()($ => {
  const $loadMoreButtons = $('.wp-block-gutenbee-post-types-load-more-button');
  $loadMoreButtons.each(function () {
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
      $.get(nextLink, function (data) {
        const $body = $(data);
        const $newBlock = $body.find(`#${blockId}`);
        const $newItems = $newBlock.find('[class*="row-items"] > div');

        // Update the link so that we fetch the next page.
        nextLink = $newBlock.find('.navigation .page-numbers.next').attr('href');
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

/***/ }),

/***/ "./src/blocks/slideshow/script.js":
/*!****************************************!*\
  !*** ./src/blocks/slideshow/script.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_1__);


jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('load', () => {
  const $slideshow = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.wp-block-gutenbee-slideshow');
  $slideshow.each(function () {
    const $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
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
      rows: 0,
      prevArrow: '<button class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"/></svg></button>',
      nextArrow: '<button class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/></svg></button>',
      customPaging: () => {
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()('<button type="button" />').css({
          backgroundColor: $this.data('dots-color')
        });
      }
    });
  });
});

/***/ }),

/***/ "./src/blocks/tabs/script.js":
/*!***********************************!*\
  !*** ./src/blocks/tabs/script.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

jquery__WEBPACK_IMPORTED_MODULE_0___default()($ => {
  const prefix = 'wp-block-gutenbee-tabs';
  const $tabs = $(`.${prefix}`);
  $tabs.each(function () {
    const $this = $(this);
    const $titles = $this.find(`.${prefix}-nav-item`);
    const $tabContents = $this.find(`.${prefix}-tab-content`);
    $titles.on('click', function (event) {
      event.preventDefault();
      const $title = $(this);
      const index = $title.index();
      $title.addClass(`${prefix}-nav-item-active`).siblings().removeClass(`${prefix}-nav-item-active`);
      $tabContents.hide();
      $tabContents.eq(index).fadeIn('fast');
    });
  });
});

/***/ }),

/***/ "./src/blocks/video-embed/script.js":
/*!******************************************!*\
  !*** ./src/blocks/video-embed/script.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_video_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/video/providers */ "./src/util/video/providers.js");


jquery__WEBPACK_IMPORTED_MODULE_0___default()($ => {
  const $videoEmbed = $('.gutenbee-video-embed');
  const $videoWrap = $videoEmbed.parents('.gutenbee-video-embed-wrapper');
  const attrState = attr => {
    return 'true' === attr ? 1 : 0;
  };

  // YouTube videos
  const onYouTubeApiReady = videoEmbed => {
    const $dataset = videoEmbed[0].dataset;
    const $video = $(videoEmbed).find('div').get(0);
    const $overlay = $(videoEmbed).siblings('.gutenbee-video-embed-overlay');

    // eslint-disable-next-line no-unused-vars
    const ytPlayer = new window.YT.Player($video, {
      videoId: $dataset.videoId,
      playerVars: {
        autoplay: $dataset.videoAutoplay ? attrState($dataset.videoAutoplay) : 0,
        controls: $dataset.videoControls ? attrState($dataset.videoControls) : 0,
        showinfo: 0,
        modestbranding: $dataset.videoBranding ? attrState($dataset.videoBranding) : 0,
        loop: $dataset.videoLoop ? attrState($dataset.videoLoop) : 0,
        playlist: $dataset.videoId,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 0,
        mute: $dataset.videoMute ? attrState($dataset.videoMute) : 0,
        start: parseInt($dataset.videoStart, 10) || undefined,
        end: parseInt($dataset.videoEnd, 10) || undefined
      },
      events: {
        onReady: event => {
          if ('true' === $dataset.videoAutoplay) {
            event.target.playVideo();
          }
          if ('true' === $dataset.videoAutoplay && $overlay.length) {
            $overlay.fadeOut();
          } else if ('false' === $dataset.videoAutoplay && $overlay.length && 'true' === $dataset.videoLazy) {
            $overlay.fadeOut;
            ytPlayer.playVideo();
          } else if ('false' === $dataset.videoAutoplay && $overlay.length) {
            $overlay.on('click', function () {
              $overlay.find('div').addClass('gutenbee-spinner').removeClass('play-button');
              ytPlayer.playVideo();
            });
          }
        },
        onStateChange: event => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            $overlay.fadeOut();
          }
        }
      }
    });
  };

  // Vimeo videos
  const onVimeoApiReady = videoEmbed => {
    const $dataset = videoEmbed[0].dataset;
    const $overlay = $(videoEmbed).siblings('.gutenbee-video-embed-overlay');
    const player = new window.Vimeo.Player(videoEmbed, {
      id: $dataset.videoId,
      loop: $dataset.videoLoop ? attrState($dataset.videoLoop) : 0,
      autoplay: $dataset.videoAutoplay ? attrState($dataset.videoAutoplay) : 0,
      controls: $dataset.videoControls ? attrState($dataset.videoControls) : 0,
      byline: false,
      title: false,
      autopause: false,
      muted: $dataset.videoMute ? attrState($dataset.videoMute) : 0
    });
    if ($dataset.videoStart) {
      player.setCurrentTime($dataset.videoStart);
    }
    player.on('loaded', function () {
      if ('true' === $dataset.videoAutoplay && $overlay.length) {
        $overlay.fadeOut();
      } else if ('false' === $dataset.videoAutoplay && $overlay.length && 'true' === $dataset.videoLazy) {
        player.play();
        player.on('play', function () {
          $overlay.fadeOut();
        });
      } else if ('false' === $dataset.videoAutoplay && $overlay.length) {
        $overlay.on('click', function () {
          $overlay.find('div').addClass('gutenbee-spinner').removeClass('play-button');
          player.play();
          player.on('play', function () {
            $overlay.fadeOut();
          });
        });
      }
    });
  };
  const createEmbed = async (firstScript, videoType, videoEmbed) => {
    if (videoType === 'youtube') {
      await (0,_util_video_providers__WEBPACK_IMPORTED_MODULE_1__.maybeLoadYouTubeApi)();
      onYouTubeApiReady(videoEmbed);
    }
    if (videoType === 'vimeo') {
      await (0,_util_video_providers__WEBPACK_IMPORTED_MODULE_1__.maybeLoadVimeoApi)();
      onVimeoApiReady(videoEmbed);
    }
  };
  $videoWrap.on('click', function () {
    const $this = $(this);
    const embedLoaded = $this.find('iframe').length;
    const $overlay = $this.find('.gutenbee-video-embed-overlay');
    const $videoEmbed = $this.find('.gutenbee-video-embed');
    const $firstScript = $('script');
    const videoType = $videoEmbed.data('video-type');
    if (embedLoaded) {
      return;
    }
    $overlay.find('div').removeClass('play-button');
    $overlay.find('div').addClass('gutenbee-spinner');
    createEmbed($firstScript, videoType, $videoEmbed);
  });
  $videoEmbed.each(function () {
    const $this = $(this);
    const firstScript = $('script');
    const $dataset = $this[0].dataset;
    const $overlay = $this.siblings('.gutenbee-video-embed-overlay');
    if (1 === $overlay.length && 'false' === $dataset.videoAutoplay) {
      $overlay.find('div').addClass('play-button');
    } else if (1 === $overlay.length && 'true' === $dataset.videoAutoplay) {
      $overlay.find('div').addClass('gutenbee-spinner');
    }
    if (0 === $overlay.length || 'false' === $dataset.videoLazy) {
      createEmbed(firstScript, $dataset.videoType, $this);
    }
  });
  var $window = $(window);
  var $stickyWrap = $('.wp-block-gutenbee-video-embed-sticky');
  var $stickyVideoWrap = $stickyWrap.find('.gutenbee-video-embed-wrapper');
  var videoWrapHeight = $stickyWrap.outerHeight();
  var offset = 50;
  if ($stickyWrap.length) {
    $window.on('scroll', function () {
      var windowScrollTop = $window.scrollTop();
      var videoBottom = videoWrapHeight + $stickyWrap.offset().top;
      if (windowScrollTop > videoBottom + offset) {
        if (!$stickyVideoWrap.hasClass('closed') && !$stickyVideoWrap.hasClass('stuck')) {
          $stickyWrap.height(videoWrapHeight);
          $stickyVideoWrap.addClass('stuck');
          $stickyVideoWrap.append('<span class="close">×</span>');
          var $close = $($stickyVideoWrap).find('.close');
          $close.on('click', function () {
            var $videoId = $(this).siblings('.gutenbee-video-embed').find('iframe').attr('id');
            document.getElementById($videoId).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            $stickyVideoWrap.removeClass('stuck');
            $stickyVideoWrap.addClass('closed');
          });
        }
      } else {
        $stickyVideoWrap.removeClass('stuck');
        $stickyVideoWrap.find('.close').remove();
      }
    });
  }
});

/***/ }),

/***/ "./src/components/controls/background-controls/script.js":
/*!***************************************************************!*\
  !*** ./src/components/controls/background-controls/script.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

jquery__WEBPACK_IMPORTED_MODULE_0___default()($ => {
  var $window = $(window);
  $.fn.gutenbeeParallax = function (opts) {
    var options = $.extend({}, {
      speed: null,
      direction: null
    }, opts);
    var $elements = this.each(function () {
      var $this = $(this);
      var speed = options.speed || $this.data('parallax-speed');
      $this.css({
        height: 100 + speed * 100 + '%'
      });
    });
    function update() {
      var wheight = $window.height();
      var wscroll = $window.scrollTop();
      $elements.each(function () {
        var $this = $(this);
        var $parent = $this.parent();
        var elHeight = $parent.outerHeight();
        var heightDelta = $this.outerHeight() - elHeight;
        var elTop = $parent.offset().top + elHeight;
        var scrollPercentage = (elTop - wscroll) / (wheight + elHeight);
        var ypos = (scrollPercentage - 1) * heightDelta;
        $this.css({
          transform: 'translateY(' + ypos + 'px)'
        });
      });
    }
    var requestParallaxUpdate = function () {
      window.requestAnimationFrame(update);
    };
    $window.on('scroll', requestParallaxUpdate).on('resize', requestParallaxUpdate);
    update();
    $.fn.gutenbeeParallax.destroy = function () {
      $elements.each(function () {
        var $this = $(this);
        $this.css({
          height: '100%',
          transform: 'none'
        });
      });
      $window.off('scroll', requestParallaxUpdate).off('resize', requestParallaxUpdate);
    };
    return $elements;
  };
  $('.gutenbee-parallax').gutenbeeParallax();
});

/***/ }),

/***/ "./src/util/CountdownTimer.js":
/*!************************************!*\
  !*** ./src/util/CountdownTimer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class CountdownTimer {
  /**
   * @constructor
   *
   * @param {HTMLElement} element HTML Element to attach the timer on
   * @param {string} endTime The end time
   */
  constructor(element, endTime) {
    this.clock = element;
    this.updateClock(endTime);
    this.interval = setInterval(() => {
      this.updateClock(endTime);
    }, 1000);
  }

  /**
   * Calculates remaining time from the present moment to `endDate`
   *
   * @static
   * @param {string} endTime The end time
   * @returns {{total: number, days: number, hours: number, minutes: number, seconds: number}} Total time remaining
   */
  static getRemainingTime = endTime => {
    const t = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor(t / 1000 % 60);
    const minutes = Math.floor(t / 1000 / 60 % 60);
    const hours = Math.floor(t / (1000 * 60 * 60) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days <= 0 ? 0 : days,
      hours: hours <= 0 ? 0 : hours,
      minutes: minutes <= 0 ? 0 : minutes,
      seconds: seconds <= 0 ? 0 : seconds
    };
  };

  /**
   * Updates the HTML element
   *
   * @param {string} endTime The end time
   * @returns {undefined}
   * @returns {undefined}
   */
  updateClock(endTime) {
    const daysSpan = this.clock.querySelector('.gutenbee-countdown-days');
    const hoursSpan = this.clock.querySelector('.gutenbee-countdown-hours');
    const minutesSpan = this.clock.querySelector('.gutenbee-countdown-minutes');
    const secondsSpan = this.clock.querySelector('.gutenbee-countdown-seconds');
    const t = CountdownTimer.getRemainingTime(endTime);
    if (daysSpan) {
      daysSpan.innerHTML = t.days;
    }
    if (hoursSpan) {
      hoursSpan.innerHTML = `0${t.hours}`.slice(-2);
    }
    if (minutesSpan) {
      minutesSpan.innerHTML = `0${t.minutes}`.slice(-2);
    }
    if (secondsSpan) {
      secondsSpan.innerHTML = `0${t.seconds}`.slice(-2);
    }
    if (t.total <= 0) {
      this.stop();
    }
  }

  /**
   * Stops the countdown
   *
   * @returns {undefined}
   */
  stop() {
    clearInterval(this.interval);
  }

  /**
   * "Destroys" the instance
   *
   * @returns {undefined}
   */
  destroy() {
    this.stop();
    this.clock = null;
    this.interval = null;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CountdownTimer);

/***/ }),

/***/ "./src/util/isElementInViewport.js":
/*!*****************************************!*\
  !*** ./src/util/isElementInViewport.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Checks if element is in viewport.
 *
 * @param {HTMLElement} el The element.
 * @param {number} offset The offset in pixels.
 * @returns {boolean}
 */
const isElementInViewport = (el, offset = 0) => {
  const scroll = window.scrollY || window.pageYOffset;
  const boundsTop = el.getBoundingClientRect().top + scroll;
  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight
  };
  const bounds = {
    top: boundsTop + offset,
    bottom: boundsTop + el.clientHeight + offset
  };
  return bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom || bounds.top <= viewport.bottom && bounds.top >= viewport.top;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isElementInViewport);

/***/ }),

/***/ "./src/util/video/providers.js":
/*!*************************************!*\
  !*** ./src/util/video/providers.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVideoProviderInfoByUrl": () => (/* binding */ getVideoProviderInfoByUrl),
/* harmony export */   "maybeLoadVimeoApi": () => (/* binding */ maybeLoadVimeoApi),
/* harmony export */   "maybeLoadYouTubeApi": () => (/* binding */ maybeLoadYouTubeApi)
/* harmony export */ });
/**
 * Checks whether the YouTube API is loaded.
 *
 * @returns {boolean}
 */
const youTubeApiLoaded = () => {
  return typeof window.YT?.Player !== 'undefined';
};

/**
 * Checks whether the Vimeo API is loaded.
 *
 * @returns {boolean}
 */
const vimeoApiLoaded = () => {
  return typeof window.Vimeo?.Player !== 'undefined';
};

/**
 * Loads the YouTube API if it's not already loaded.
 *
 * @returns {Promise<boolean>}
 */
const maybeLoadYouTubeApi = () => {
  if (!document.getElementById('gutenbee-youtube-api-script') && !youTubeApiLoaded()) {
    const tag = document.createElement('script');
    tag.id = 'gutenbee-youtube-api-script';
    tag.src = 'https://www.youtube.com/player_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  const apiLoaded = resolve => {
    if (!youTubeApiLoaded()) {
      setTimeout(() => apiLoaded(resolve), 350);
      return;
    }
    resolve(true);
  };
  return new Promise((resolve, reject) => {
    apiLoaded(resolve, reject);
  });
};

/**
 * Loads the Vimeo API if it's not already loaded.
 *
 * @returns {Promise<boolean>}
 */
const maybeLoadVimeoApi = async () => {
  if (!document.getElementById('gutenbee-vimeo-api-script') && !vimeoApiLoaded()) {
    const tag = document.createElement('script');
    tag.id = 'gutenbee-vimeo-api-script';
    tag.src = 'https://player.vimeo.com/api/player.js';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  const apiLoaded = resolve => {
    if (!vimeoApiLoaded()) {
      setTimeout(() => apiLoaded(resolve), 350);
      return;
    }
    resolve(true);
  };
  return new Promise((resolve, reject) => {
    apiLoaded(resolve, reject);
  });
};

/**
 * Matches a particular array of patterns on a string.
 *
 * @param {string} str The string to be matched.
 * @param {Array} patterns An array of URL patterns to match.
 * @returns {boolean} Whether a pattern was matched.
 */
const matchesPatterns = (str, patterns = []) => patterns.some(pattern => str.match(pattern));

/**
 * YouTube URL patterns.
 *
 * @type {RegExp[]}
 */
const youTubeUrlPatterns = [/^https?:\/\/((m|www)\.)?youtube\.com\/.+/i, /^https?:\/\/youtu\.be\/.+/i];

/**
 * Vimeo URL patterns.
 *
 * @type {RegExp[]}
 */
const vimeoUrlPatterns = [/^https?:\/\/(www\.)?vimeo\.com\/.+/i];

/**
 * Self hosted video URL patterns.
 *
 * @type {RegExp[]}
 */
const selfHostedVideoUrlPatterns = [/([a-zA-Z0-9\s_\\.\-\(\):])+(.webm|.mkv|.avi|.mov|.mp4|.ogg)/i];

/**
 * Returns the Vimeo video ID based on the URL provided.
 * @see https://gist.github.com/takien/4077195#gistcomment-3410228
 *
 * @param {string} url The YouTube video URL.
 * @returns {string}
 */
const getYouTubeIdByUrl = url => {
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
};

/**
 * Returns the Vimeo video ID based on the URL provided.
 *
 * @param {string} url Vimeo video URL.
 * @returns {string} The video ID.
 */
const getVimeoIdByUrl = url => {
  let id = null;
  const request = new XMLHttpRequest();
  request.open('GET', 'https://vimeo.com/api/oembed.json?url=' + url, false);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const response = JSON.parse(request.responseText);
      if (response.video_id) {
        id = response.video_id;
      }
    }
  };
  request.send();
  return id;
};

/**
 * Attempts to extract the video start time from a YouTube URL.
 *
 * @param url The YouTube URL.
 * @returns {string}
 */
const getYouTubeStartTimeFromUrl = url => {
  if (!url) {
    return;
  }
  const params = new URL(url).searchParams;
  const time = params.get('t');
  return time;
};

/**
 * Attempts to extract the video start time from a Vimeo URL.
 *
 * @param url The Vimeo URL.
 * @returns {string}
 */
const getVimeoStartTimeFromUrl = url => {
  if (!url) {
    return;
  }
  // Vimeo URLs are in the format of https://vimeo.com/546117812#t=10s
  // so we convert the hash to a query param
  const replaced = url.replace('#', '?');
  const params = new URL(replaced).searchParams;
  const time = params.get('t');
  return time?.replace('s', '') ?? undefined;
};

/**
 * Takes in a URL and returns the matched provider's info (if any).
 *
 * @param {string} url The URL.
 * @returns {{provider: string, id: string}|null|{provider: string, id: null}}
 */
const getVideoProviderInfoByUrl = (url = '') => {
  if (!url) {
    return null;
  }
  if (matchesPatterns(url, youTubeUrlPatterns)) {
    return {
      id: getYouTubeIdByUrl(url),
      provider: 'youtube',
      url,
      start: getYouTubeStartTimeFromUrl(url)
    };
  }
  if (matchesPatterns(url, vimeoUrlPatterns)) {
    return {
      id: getVimeoIdByUrl(url),
      provider: 'vimeo',
      url,
      start: getVimeoStartTimeFromUrl(url)
    };
  }
  if (matchesPatterns(url, selfHostedVideoUrlPatterns)) {
    return {
      id: url,
      provider: 'self',
      url
    };
  }
  return {
    id: null,
    provider: 'unsupported'
  };
};

/***/ }),

/***/ "./node_modules/countup/dist/countUp.min.js":
/*!**************************************************!*\
  !*** ./node_modules/countup/dist/countUp.min.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(a,t){ true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0}(this,function(a,t,n){var e=function(a,t,n,e,i,r){for(var o=0,s=["webkit","moz","ms","o"],m=0;m<s.length&&!window.requestAnimationFrame;++m)window.requestAnimationFrame=window[s[m]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[m]+"CancelAnimationFrame"]||window[s[m]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a,t){var n=(new Date).getTime(),e=Math.max(0,16-(n-o)),i=window.setTimeout(function(){a(n+e)},e);return o=n+e,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});var u=this;u.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:null,formattingFn:null};for(var l in r)r.hasOwnProperty(l)&&(u.options[l]=r[l]);""===u.options.separator&&(u.options.useGrouping=!1),u.options.prefix||(u.options.prefix=""),u.options.suffix||(u.options.suffix=""),u.d="string"==typeof a?document.getElementById(a):a,u.startVal=Number(t),u.endVal=Number(n),u.countDown=u.startVal>u.endVal,u.frameVal=u.startVal,u.decimals=Math.max(0,e||0),u.dec=Math.pow(10,u.decimals),u.duration=1e3*Number(i)||2e3,u.formatNumber=function(a){a=a.toFixed(u.decimals),a+="";var t,n,e,i;if(t=a.split("."),n=t[0],e=t.length>1?u.options.decimal+t[1]:"",i=/(\d+)(\d{3})/,u.options.useGrouping)for(;i.test(n);)n=n.replace(i,"$1"+u.options.separator+"$2");return u.options.prefix+n+e+u.options.suffix},u.easeOutExpo=function(a,t,n,e){return n*(-Math.pow(2,-10*a/e)+1)*1024/1023+t},u.easingFn=u.options.easingFn?u.options.easingFn:u.easeOutExpo,u.formattingFn=u.options.formattingFn?u.options.formattingFn:u.formatNumber,u.version=function(){return"1.7.1"},u.printValue=function(a){var t=u.formattingFn(a);"INPUT"===u.d.tagName?this.d.value=t:"text"===u.d.tagName||"tspan"===u.d.tagName?this.d.textContent=t:this.d.innerHTML=t},u.count=function(a){u.startTime||(u.startTime=a),u.timestamp=a;var t=a-u.startTime;u.remaining=u.duration-t,u.options.useEasing?u.countDown?u.frameVal=u.startVal-u.easingFn(t,0,u.startVal-u.endVal,u.duration):u.frameVal=u.easingFn(t,u.startVal,u.endVal-u.startVal,u.duration):u.countDown?u.frameVal=u.startVal-(u.startVal-u.endVal)*(t/u.duration):u.frameVal=u.startVal+(u.endVal-u.startVal)*(t/u.duration),u.countDown?u.frameVal=u.frameVal<u.endVal?u.endVal:u.frameVal:u.frameVal=u.frameVal>u.endVal?u.endVal:u.frameVal,u.frameVal=Math.round(u.frameVal*u.dec)/u.dec,u.printValue(u.frameVal),t<u.duration?u.rAF=requestAnimationFrame(u.count):u.callback&&u.callback()},u.start=function(a){return u.callback=a,u.rAF=requestAnimationFrame(u.count),!1},u.pauseResume=function(){u.paused?(u.paused=!1,delete u.startTime,u.duration=u.remaining,u.startVal=u.frameVal,requestAnimationFrame(u.count)):(u.paused=!0,cancelAnimationFrame(u.rAF))},u.reset=function(){u.paused=!1,delete u.startTime,u.startVal=t,cancelAnimationFrame(u.rAF),u.printValue(u.startVal)},u.update=function(a){cancelAnimationFrame(u.rAF),u.paused=!1,delete u.startTime,u.startVal=u.frameVal,u.endVal=Number(a),u.countDown=u.startVal>u.endVal,u.rAF=requestAnimationFrame(u.count)},u.printValue(u.startVal)};return e});

/***/ }),

/***/ "./node_modules/justifiedGallery/dist/js/jquery.justifiedGallery.js":
/*!**************************************************************************!*\
  !*** ./node_modules/justifiedGallery/dist/js/jquery.justifiedGallery.js ***!
  \**************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * justifiedGallery - v3.7.0
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2018 Miro Mannino
 * Licensed under the MIT license.
 */
(function (factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(function ($) {

  /**
   * Justified Gallery controller constructor
   *
   * @param $gallery the gallery to build
   * @param settings the settings (the defaults are in JustifiedGallery.defaults)
   * @constructor
   */
  var JustifiedGallery = function ($gallery, settings) {
  
    this.settings = settings;
    this.checkSettings();
  
    this.imgAnalyzerTimeout = null;
    this.entries = null;
    this.buildingRow = {
      entriesBuff : [],
      width : 0,
      height : 0,
      aspectRatio : 0
    };
    this.lastFetchedEntry = null;
    this.lastAnalyzedIndex = -1;
    this.yield = {
      every : 2, // do a flush every n flushes (must be greater than 1)
      flushed : 0 // flushed rows without a yield
    };
    this.border = settings.border >= 0 ? settings.border : settings.margins;
    this.maxRowHeight = this.retrieveMaxRowHeight();
    this.suffixRanges = this.retrieveSuffixRanges();
    this.offY = this.border;
    this.rows = 0;
    this.spinner = {
      phase : 0,
      timeSlot : 150,
      $el : $('<div class="spinner"><span></span><span></span><span></span></div>'),
      intervalId : null
    };
    this.scrollBarOn = false;
    this.checkWidthIntervalId = null;
    this.galleryWidth = $gallery.width();
    this.$gallery = $gallery;
  
  };
  
  /** @returns {String} the best suffix given the width and the height */
  JustifiedGallery.prototype.getSuffix = function (width, height) {
    var longestSide, i;
    longestSide = (width > height) ? width : height;
    for (i = 0; i < this.suffixRanges.length; i++) {
      if (longestSide <= this.suffixRanges[i]) {
        return this.settings.sizeRangeSuffixes[this.suffixRanges[i]];
      }
    }
    return this.settings.sizeRangeSuffixes[this.suffixRanges[i - 1]];
  };
  
  /**
   * Remove the suffix from the string
   *
   * @returns {string} a new string without the suffix
   */
  JustifiedGallery.prototype.removeSuffix = function (str, suffix) {
    return str.substring(0, str.length - suffix.length);
  };
  
  /**
   * @returns {boolean} a boolean to say if the suffix is contained in the str or not
   */
  JustifiedGallery.prototype.endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };
  
  /**
   * Get the used suffix of a particular url
   *
   * @param str
   * @returns {String} return the used suffix
   */
  JustifiedGallery.prototype.getUsedSuffix = function (str) {
    for (var si in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(si)) {
        if (this.settings.sizeRangeSuffixes[si].length === 0) continue;
        if (this.endsWith(str, this.settings.sizeRangeSuffixes[si])) return this.settings.sizeRangeSuffixes[si];
      }
    }
    return '';
  };
  
  /**
   * Given an image src, with the width and the height, returns the new image src with the
   * best suffix to show the best quality thumbnail.
   *
   * @returns {String} the suffix to use
   */
  JustifiedGallery.prototype.newSrc = function (imageSrc, imgWidth, imgHeight, image) {
    var newImageSrc;
  
    if (this.settings.thumbnailPath) {
      newImageSrc = this.settings.thumbnailPath(imageSrc, imgWidth, imgHeight, image);
    } else {
      var matchRes = imageSrc.match(this.settings.extension);
      var ext = (matchRes !== null) ? matchRes[0] : '';
      newImageSrc = imageSrc.replace(this.settings.extension, '');
      newImageSrc = this.removeSuffix(newImageSrc, this.getUsedSuffix(newImageSrc));
      newImageSrc += this.getSuffix(imgWidth, imgHeight) + ext;
    }
  
    return newImageSrc;
  };
  
  /**
   * Shows the images that is in the given entry
   *
   * @param $entry the entry
   * @param callback the callback that is called when the show animation is finished
   */
  JustifiedGallery.prototype.showImg = function ($entry, callback) {
    if (this.settings.cssAnimation) {
      $entry.addClass('entry-visible');
      if (callback) callback();
    } else {
      $entry.stop().fadeTo(this.settings.imagesAnimationDuration, 1.0, callback);
      $entry.find(this.settings.imgSelector).stop().fadeTo(this.settings.imagesAnimationDuration, 1.0, callback);
    }
  };
  
  /**
   * Extract the image src form the image, looking from the 'safe-src', and if it can't be found, from the
   * 'src' attribute. It saves in the image data the 'jg.originalSrc' field, with the extracted src.
   *
   * @param $image the image to analyze
   * @returns {String} the extracted src
   */
  JustifiedGallery.prototype.extractImgSrcFromImage = function ($image) {
    var imageSrc = (typeof $image.data('safe-src') !== 'undefined') ? $image.data('safe-src') : $image.attr('src');
    $image.data('jg.originalSrc', imageSrc);
    return imageSrc;
  };
  
  /** @returns {jQuery} the image in the given entry */
  JustifiedGallery.prototype.imgFromEntry = function ($entry) {
    var $img = $entry.find(this.settings.imgSelector);
    return $img.length === 0 ? null : $img;
  };
  
  /** @returns {jQuery} the caption in the given entry */
  JustifiedGallery.prototype.captionFromEntry = function ($entry) {
    var $caption = $entry.find('> .caption');
    return $caption.length === 0 ? null : $caption;
  };
  
  /**
   * Display the entry
   *
   * @param {jQuery} $entry the entry to display
   * @param {int} x the x position where the entry must be positioned
   * @param y the y position where the entry must be positioned
   * @param imgWidth the image width
   * @param imgHeight the image height
   * @param rowHeight the row height of the row that owns the entry
   */
  JustifiedGallery.prototype.displayEntry = function ($entry, x, y, imgWidth, imgHeight, rowHeight) {
    $entry.width(imgWidth);
    $entry.height(rowHeight);
    $entry.css('top', y);
    $entry.css('left', x);
  
    var $image = this.imgFromEntry($entry);
    if ($image !== null) {
      $image.css('width', imgWidth);
      $image.css('height', imgHeight);
      $image.css('margin-left', - imgWidth / 2);
      $image.css('margin-top', - imgHeight / 2);
  
      // Image reloading for an high quality of thumbnails
      var imageSrc = $image.attr('src');
      var newImageSrc = this.newSrc(imageSrc, imgWidth, imgHeight, $image[0]);
  
      $image.one('error', function () {
        $image.attr('src', $image.data('jg.originalSrc')); //revert to the original thumbnail, we got it.
      });
  
      var loadNewImage = function () {
        if (imageSrc !== newImageSrc) { //load the new image after the fadeIn
          $image.attr('src', newImageSrc);
        }
      };
  
      if ($entry.data('jg.loaded') === 'skipped') {
        this.onImageEvent(imageSrc, $.proxy(function() {
          this.showImg($entry, loadNewImage);
          $entry.data('jg.loaded', true);
        }, this));
      } else {
        this.showImg($entry, loadNewImage);
      }
  
    } else {
      this.showImg($entry);
    }
  
    this.displayEntryCaption($entry);
  };
  
  /**
   * Display the entry caption. If the caption element doesn't exists, it creates the caption using the 'alt'
   * or the 'title' attributes.
   *
   * @param {jQuery} $entry the entry to process
   */
  JustifiedGallery.prototype.displayEntryCaption = function ($entry) {
    var $image = this.imgFromEntry($entry);
    if ($image !== null && this.settings.captions) {
      var $imgCaption = this.captionFromEntry($entry);
  
      // Create it if it doesn't exists
      if ($imgCaption === null) {
        var caption = $image.attr('alt');
        if (!this.isValidCaption(caption)) caption = $entry.attr('title');
        if (this.isValidCaption(caption)) { // Create only we found something
          $imgCaption = $('<div class="caption">' + caption + '</div>');
          $entry.append($imgCaption);
          $entry.data('jg.createdCaption', true);
        }
      }
  
      // Create events (we check again the $imgCaption because it can be still inexistent)
      if ($imgCaption !== null) {
        if (!this.settings.cssAnimation) $imgCaption.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity);
        this.addCaptionEventsHandlers($entry);
      }
    } else {
      this.removeCaptionEventsHandlers($entry);
    }
  };
  
  /**
   * Validates the caption
   *
   * @param caption The caption that should be validated
   * @return {boolean} Validation result
   */
  JustifiedGallery.prototype.isValidCaption = function (caption) {
    return (typeof caption !== 'undefined' && caption.length > 0);
  };
  
  /**
   * The callback for the event 'mouseenter'. It assumes that the event currentTarget is an entry.
   * It shows the caption using jQuery (or using CSS if it is configured so)
   *
   * @param {Event} eventObject the event object
   */
  JustifiedGallery.prototype.onEntryMouseEnterForCaption = function (eventObject) {
    var $caption = this.captionFromEntry($(eventObject.currentTarget));
    if (this.settings.cssAnimation) {
      $caption.addClass('caption-visible').removeClass('caption-hidden');
    } else {
      $caption.stop().fadeTo(this.settings.captionSettings.animationDuration,
          this.settings.captionSettings.visibleOpacity);
    }
  };
  
  /**
   * The callback for the event 'mouseleave'. It assumes that the event currentTarget is an entry.
   * It hides the caption using jQuery (or using CSS if it is configured so)
   *
   * @param {Event} eventObject the event object
   */
  JustifiedGallery.prototype.onEntryMouseLeaveForCaption = function (eventObject) {
    var $caption = this.captionFromEntry($(eventObject.currentTarget));
    if (this.settings.cssAnimation) {
      $caption.removeClass('caption-visible').removeClass('caption-hidden');
    } else {
      $caption.stop().fadeTo(this.settings.captionSettings.animationDuration,
          this.settings.captionSettings.nonVisibleOpacity);
    }
  };
  
  /**
   * Add the handlers of the entry for the caption
   *
   * @param $entry the entry to modify
   */
  JustifiedGallery.prototype.addCaptionEventsHandlers = function ($entry) {
    var captionMouseEvents = $entry.data('jg.captionMouseEvents');
    if (typeof captionMouseEvents === 'undefined') {
      captionMouseEvents = {
        mouseenter: $.proxy(this.onEntryMouseEnterForCaption, this),
        mouseleave: $.proxy(this.onEntryMouseLeaveForCaption, this)
      };
      $entry.on('mouseenter', undefined, undefined, captionMouseEvents.mouseenter);
      $entry.on('mouseleave', undefined, undefined, captionMouseEvents.mouseleave);
      $entry.data('jg.captionMouseEvents', captionMouseEvents);
    }
  };
  
  /**
   * Remove the handlers of the entry for the caption
   *
   * @param $entry the entry to modify
   */
  JustifiedGallery.prototype.removeCaptionEventsHandlers = function ($entry) {
    var captionMouseEvents = $entry.data('jg.captionMouseEvents');
    if (typeof captionMouseEvents !== 'undefined') {
      $entry.off('mouseenter', undefined, captionMouseEvents.mouseenter);
      $entry.off('mouseleave', undefined, captionMouseEvents.mouseleave);
      $entry.removeData('jg.captionMouseEvents');
    }
  };
  
  /**
   * Clear the building row data to be used for a new row
   */
  JustifiedGallery.prototype.clearBuildingRow = function () {
    this.buildingRow.entriesBuff = [];
    this.buildingRow.aspectRatio = 0;
    this.buildingRow.width = 0;
  };
  
  /**
   * Justify the building row, preparing it to
   *
   * @param isLastRow
   * @returns a boolean to know if the row has been justified or not
   */
  JustifiedGallery.prototype.prepareBuildingRow = function (isLastRow) {
    var i, $entry, imgAspectRatio, newImgW, newImgH, justify = true;
    var minHeight = 0;
    var availableWidth = this.galleryWidth - 2 * this.border - (
        (this.buildingRow.entriesBuff.length - 1) * this.settings.margins);
    var rowHeight = availableWidth / this.buildingRow.aspectRatio;
    var defaultRowHeight = this.settings.rowHeight;
    var justifiable = this.buildingRow.width / availableWidth > this.settings.justifyThreshold;
  
    //Skip the last row if we can't justify it and the lastRow == 'hide'
    if (isLastRow && this.settings.lastRow === 'hide' && !justifiable) {
      for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
        $entry = this.buildingRow.entriesBuff[i];
        if (this.settings.cssAnimation)
          $entry.removeClass('entry-visible');
        else {
          $entry.stop().fadeTo(0, 0.1);
          $entry.find('> img, > a > img').fadeTo(0, 0);
        }
      }
      return -1;
    }
  
    // With lastRow = nojustify, justify if is justificable (the images will not become too big)
    if (isLastRow && !justifiable && this.settings.lastRow !== 'justify' && this.settings.lastRow !== 'hide') {
      justify = false;
  
      if (this.rows > 0) {
        defaultRowHeight = (this.offY - this.border - this.settings.margins * this.rows) / this.rows;
        justify = defaultRowHeight * this.buildingRow.aspectRatio / availableWidth > this.settings.justifyThreshold;
      }
    }
  
    for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
      $entry = this.buildingRow.entriesBuff[i];
      imgAspectRatio = $entry.data('jg.width') / $entry.data('jg.height');
  
      if (justify) {
        newImgW = (i === this.buildingRow.entriesBuff.length - 1) ? availableWidth : rowHeight * imgAspectRatio;
        newImgH = rowHeight;
      } else {
        newImgW = defaultRowHeight * imgAspectRatio;
        newImgH = defaultRowHeight;
      }
  
      availableWidth -= Math.round(newImgW);
      $entry.data('jg.jwidth', Math.round(newImgW));
      $entry.data('jg.jheight', Math.ceil(newImgH));
      if (i === 0 || minHeight > newImgH) minHeight = newImgH;
    }
  
    this.buildingRow.height = minHeight;
    return justify;
  };
  
  /**
   * Flush a row: justify it, modify the gallery height accordingly to the row height
   *
   * @param isLastRow
   */
  JustifiedGallery.prototype.flushRow = function (isLastRow) {
    var settings = this.settings;
    var $entry, buildingRowRes, offX = this.border, i;
  
    buildingRowRes = this.prepareBuildingRow(isLastRow);
    if (isLastRow && settings.lastRow === 'hide' && buildingRowRes === -1) {
      this.clearBuildingRow();
      return;
    }
  
    if(this.maxRowHeight) {
      if(this.maxRowHeight < this.buildingRow.height)  this.buildingRow.height = this.maxRowHeight;
    }
  
    //Align last (unjustified) row
    if (isLastRow && (settings.lastRow === 'center' || settings.lastRow === 'right')) {
      var availableWidth = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * settings.margins;
  
      for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
        $entry = this.buildingRow.entriesBuff[i];
        availableWidth -= $entry.data('jg.jwidth');
      }
  
      if (settings.lastRow === 'center')
        offX += availableWidth / 2;
      else if (settings.lastRow === 'right')
        offX += availableWidth;
    }
  
    var lastEntryIdx = this.buildingRow.entriesBuff.length - 1;
    for (i = 0; i <= lastEntryIdx; i++) {
      $entry = this.buildingRow.entriesBuff[ this.settings.rtl ? lastEntryIdx - i : i ];
      this.displayEntry($entry, offX, this.offY, $entry.data('jg.jwidth'), $entry.data('jg.jheight'), this.buildingRow.height);
      offX += $entry.data('jg.jwidth') + settings.margins;
    }
  
    //Gallery Height
    this.galleryHeightToSet = this.offY + this.buildingRow.height + this.border;
    this.setGalleryTempHeight(this.galleryHeightToSet + this.getSpinnerHeight());
  
    if (!isLastRow || (this.buildingRow.height <= settings.rowHeight && buildingRowRes)) {
      //Ready for a new row
      this.offY += this.buildingRow.height + settings.margins;
      this.rows += 1;
      this.clearBuildingRow();
      this.settings.triggerEvent.call(this, 'jg.rowflush');
    }
  };
  
  
  // Scroll position not restoring: https://github.com/miromannino/Justified-Gallery/issues/221
  var galleryPrevStaticHeight = 0;
  
  JustifiedGallery.prototype.rememberGalleryHeight = function () {
    galleryPrevStaticHeight = this.$gallery.height();
    this.$gallery.height(galleryPrevStaticHeight);
  };
  
  // grow only
  JustifiedGallery.prototype.setGalleryTempHeight = function (height) {
    galleryPrevStaticHeight = Math.max(height, galleryPrevStaticHeight);
    this.$gallery.height(galleryPrevStaticHeight);
  };
  
  JustifiedGallery.prototype.setGalleryFinalHeight = function (height) {
    galleryPrevStaticHeight = height;
    this.$gallery.height(height);
  };
  
  /**
   * @returns {boolean} a boolean saying if the scrollbar is active or not
   */
  function hasScrollBar() {
    return $("body").height() > $(window).height();
  }
  
  /**
   * Checks the width of the gallery container, to know if a new justification is needed
   */
  JustifiedGallery.prototype.checkWidth = function () {
    this.checkWidthIntervalId = setInterval($.proxy(function () {
  
      // if the gallery is not currently visible, abort.
      if (!this.$gallery.is(":visible")) return;
  
      var galleryWidth = parseFloat(this.$gallery.width());
      if (hasScrollBar() === this.scrollBarOn) {
        if (Math.abs(galleryWidth - this.galleryWidth) > this.settings.refreshSensitivity) {
          this.galleryWidth = galleryWidth;
          this.rewind();
  
          this.rememberGalleryHeight();
  
          // Restart to analyze
          this.startImgAnalyzer(true);
        }
      } else {
        this.scrollBarOn = hasScrollBar();
        this.galleryWidth = galleryWidth;
      }
    }, this), this.settings.refreshTime);
  };
  
  /**
   * @returns {boolean} a boolean saying if the spinner is active or not
   */
  JustifiedGallery.prototype.isSpinnerActive = function () {
    return this.spinner.intervalId !== null;
  };
  
  /**
   * @returns {int} the spinner height
   */
  JustifiedGallery.prototype.getSpinnerHeight = function () {
    return this.spinner.$el.innerHeight();
  };
  
  /**
   * Stops the spinner animation and modify the gallery height to exclude the spinner
   */
  JustifiedGallery.prototype.stopLoadingSpinnerAnimation = function () {
    clearInterval(this.spinner.intervalId);
    this.spinner.intervalId = null;
    this.setGalleryTempHeight(this.$gallery.height() - this.getSpinnerHeight());
    this.spinner.$el.detach();
  };
  
  /**
   * Starts the spinner animation
   */
  JustifiedGallery.prototype.startLoadingSpinnerAnimation = function () {
    var spinnerContext = this.spinner;
    var $spinnerPoints = spinnerContext.$el.find('span');
    clearInterval(spinnerContext.intervalId);
    this.$gallery.append(spinnerContext.$el);
    this.setGalleryTempHeight(this.offY + this.buildingRow.height + this.getSpinnerHeight());
    spinnerContext.intervalId = setInterval(function () {
      if (spinnerContext.phase < $spinnerPoints.length) {
        $spinnerPoints.eq(spinnerContext.phase).fadeTo(spinnerContext.timeSlot, 1);
      } else {
        $spinnerPoints.eq(spinnerContext.phase - $spinnerPoints.length).fadeTo(spinnerContext.timeSlot, 0);
      }
      spinnerContext.phase = (spinnerContext.phase + 1) % ($spinnerPoints.length * 2);
    }, spinnerContext.timeSlot);
  };
  
  /**
   * Rewind the image analysis to start from the first entry.
   */
  JustifiedGallery.prototype.rewind = function () {
    this.lastFetchedEntry = null;
    this.lastAnalyzedIndex = -1;
    this.offY = this.border;
    this.rows = 0;
    this.clearBuildingRow();
  };
  
  /**
   * Update the entries searching it from the justified gallery HTML element
   *
   * @param norewind if norewind only the new entries will be changed (i.e. randomized, sorted or filtered)
   * @returns {boolean} true if some entries has been founded
   */
  JustifiedGallery.prototype.updateEntries = function (norewind) {
    var newEntries;
  
    if (norewind && this.lastFetchedEntry != null) {
      newEntries = $(this.lastFetchedEntry).nextAll(this.settings.selector).toArray();
    } else {
      this.entries = [];
      newEntries = this.$gallery.children(this.settings.selector).toArray();
    }
  
    if (newEntries.length > 0) {
  
      // Sort or randomize
      if ($.isFunction(this.settings.sort)) {
        newEntries = this.sortArray(newEntries);
      } else if (this.settings.randomize) {
        newEntries = this.shuffleArray(newEntries);
      }
      this.lastFetchedEntry = newEntries[newEntries.length - 1];
  
      // Filter
      if (this.settings.filter) {
        newEntries = this.filterArray(newEntries);
      } else {
        this.resetFilters(newEntries);
      }
  
    }
  
    this.entries = this.entries.concat(newEntries);
    return true;
  };
  
  /**
   * Apply the entries order to the DOM, iterating the entries and appending the images
   *
   * @param entries the entries that has been modified and that must be re-ordered in the DOM
   */
  JustifiedGallery.prototype.insertToGallery = function (entries) {
    var that = this;
    $.each(entries, function () {
      $(this).appendTo(that.$gallery);
    });
  };
  
  /**
   * Shuffle the array using the Fisher-Yates shuffle algorithm
   *
   * @param a the array to shuffle
   * @return the shuffled array
   */
  JustifiedGallery.prototype.shuffleArray = function (a) {
    var i, j, temp;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    this.insertToGallery(a);
    return a;
  };
  
  /**
   * Sort the array using settings.comparator as comparator
   *
   * @param a the array to sort (it is sorted)
   * @return the sorted array
   */
  JustifiedGallery.prototype.sortArray = function (a) {
    a.sort(this.settings.sort);
    this.insertToGallery(a);
    return a;
  };
  
  /**
   * Reset the filters removing the 'jg-filtered' class from all the entries
   *
   * @param a the array to reset
   */
  JustifiedGallery.prototype.resetFilters = function (a) {
    for (var i = 0; i < a.length; i++) $(a[i]).removeClass('jg-filtered');
  };
  
  /**
   * Filter the entries considering theirs classes (if a string has been passed) or using a function for filtering.
   *
   * @param a the array to filter
   * @return the filtered array
   */
  JustifiedGallery.prototype.filterArray = function (a) {
    var settings = this.settings;
    if ($.type(settings.filter) === 'string') {
      // Filter only keeping the entries passed in the string
      return a.filter(function (el) {
        var $el = $(el);
        if ($el.is(settings.filter)) {
          $el.removeClass('jg-filtered');
          return true;
        } else {
          $el.addClass('jg-filtered').removeClass('jg-visible');
          return false;
        }
      });
    } else if ($.isFunction(settings.filter)) {
      // Filter using the passed function
      var filteredArr = a.filter(settings.filter);
      for (var i = 0; i < a.length; i++) {
        if (filteredArr.indexOf(a[i]) === -1) {
          $(a[i]).addClass('jg-filtered').removeClass('jg-visible');
        } else {
          $(a[i]).removeClass('jg-filtered');
        }
      }
      return filteredArr;
    }
  };
  
  /**
   * Destroy the Justified Gallery instance.
   *
   * It clears all the css properties added in the style attributes. We doesn't backup the original
   * values for those css attributes, because it costs (performance) and because in general one
   * shouldn't use the style attribute for an uniform set of images (where we suppose the use of
   * classes). Creating a backup is also difficult because JG could be called multiple times and
   * with different style attributes.
   */
  JustifiedGallery.prototype.destroy = function () {
    clearInterval(this.checkWidthIntervalId);
  
    $.each(this.entries, $.proxy(function(_, entry) {
      var $entry = $(entry);
  
      // Reset entry style
      $entry.css('width', '');
      $entry.css('height', '');
      $entry.css('top', '');
      $entry.css('left', '');
      $entry.data('jg.loaded', undefined);
      $entry.removeClass('jg-entry');
  
      // Reset image style
      var $img = this.imgFromEntry($entry);
      $img.css('width', '');
      $img.css('height', '');
      $img.css('margin-left', '');
      $img.css('margin-top', '');
      $img.attr('src', $img.data('jg.originalSrc'));
      $img.data('jg.originalSrc', undefined);
  
      // Remove caption
      this.removeCaptionEventsHandlers($entry);
      var $caption = this.captionFromEntry($entry);
      if ($entry.data('jg.createdCaption')) {
        // remove also the caption element (if created by jg)
        $entry.data('jg.createdCaption', undefined);
        if ($caption !== null) $caption.remove();
      } else {
        if ($caption !== null) $caption.fadeTo(0, 1);
      }
  
    }, this));
  
    this.$gallery.css('height', '');
    this.$gallery.removeClass('justified-gallery');
    this.$gallery.data('jg.controller', undefined);
  };
  
  /**
   * Analyze the images and builds the rows. It returns if it found an image that is not loaded.
   *
   * @param isForResize if the image analyzer is called for resizing or not, to call a different callback at the end
   */
  JustifiedGallery.prototype.analyzeImages = function (isForResize) {
    for (var i = this.lastAnalyzedIndex + 1; i < this.entries.length; i++) {
      var $entry = $(this.entries[i]);
      if ($entry.data('jg.loaded') === true || $entry.data('jg.loaded') === 'skipped') {
        var availableWidth = this.galleryWidth - 2 * this.border - (
            (this.buildingRow.entriesBuff.length - 1) * this.settings.margins);
        var imgAspectRatio = $entry.data('jg.width') / $entry.data('jg.height');
        if (availableWidth / (this.buildingRow.aspectRatio + imgAspectRatio) < this.settings.rowHeight) {
          this.flushRow(false);
  
          if(++this.yield.flushed >= this.yield.every) {
            this.startImgAnalyzer(isForResize);
            return;
          }
        }
  
        this.buildingRow.entriesBuff.push($entry);
        this.buildingRow.aspectRatio += imgAspectRatio;
        this.buildingRow.width += imgAspectRatio * this.settings.rowHeight;
        this.lastAnalyzedIndex = i;
  
      } else if ($entry.data('jg.loaded') !== 'error') {
        return;
      }
    }
  
    // Last row flush (the row is not full)
    if (this.buildingRow.entriesBuff.length > 0) this.flushRow(true);
  
    if (this.isSpinnerActive()) {
      this.stopLoadingSpinnerAnimation();
    }
  
    /* Stop, if there is, the timeout to start the analyzeImages.
     This is because an image can be set loaded, and the timeout can be set,
     but this image can be analyzed yet.
     */
    this.stopImgAnalyzerStarter();
  
    //On complete callback
    this.settings.triggerEvent.call(this, isForResize ? 'jg.resize' : 'jg.complete');
    this.setGalleryFinalHeight(this.galleryHeightToSet);
  };
  
  /**
   * Stops any ImgAnalyzer starter (that has an assigned timeout)
   */
  JustifiedGallery.prototype.stopImgAnalyzerStarter = function () {
    this.yield.flushed = 0;
    if (this.imgAnalyzerTimeout !== null) {
      clearTimeout(this.imgAnalyzerTimeout);
      this.imgAnalyzerTimeout = null;
    }
  };
  
  /**
   * Starts the image analyzer. It is not immediately called to let the browser to update the view
   *
   * @param isForResize specifies if the image analyzer must be called for resizing or not
   */
  JustifiedGallery.prototype.startImgAnalyzer = function (isForResize) {
    var that = this;
    this.stopImgAnalyzerStarter();
    this.imgAnalyzerTimeout = setTimeout(function () {
      that.analyzeImages(isForResize);
    }, 0.001); // we can't start it immediately due to a IE different behaviour
  };
  
  /**
   * Checks if the image is loaded or not using another image object. We cannot use the 'complete' image property,
   * because some browsers, with a 404 set complete = true.
   *
   * @param imageSrc the image src to load
   * @param onLoad callback that is called when the image has been loaded
   * @param onError callback that is called in case of an error
   */
  JustifiedGallery.prototype.onImageEvent = function (imageSrc, onLoad, onError) {
    if (!onLoad && !onError) return;
  
    var memImage = new Image();
    var $memImage = $(memImage);
    if (onLoad) {
      $memImage.one('load', function () {
        $memImage.off('load error');
        onLoad(memImage);
      });
    }
    if (onError) {
      $memImage.one('error', function() {
        $memImage.off('load error');
        onError(memImage);
      });
    }
    memImage.src = imageSrc;
  };
  
  /**
   * Init of Justified Gallery controlled
   * It analyzes all the entries starting theirs loading and calling the image analyzer (that works with loaded images)
   */
  JustifiedGallery.prototype.init = function () {
    var imagesToLoad = false, skippedImages = false, that = this;
    $.each(this.entries, function (index, entry) {
      var $entry = $(entry);
      var $image = that.imgFromEntry($entry);
  
      $entry.addClass('jg-entry');
  
      if ($entry.data('jg.loaded') !== true && $entry.data('jg.loaded') !== 'skipped') {
  
        // Link Rel global overwrite
        if (that.settings.rel !== null) $entry.attr('rel', that.settings.rel);
  
        // Link Target global overwrite
        if (that.settings.target !== null) $entry.attr('target', that.settings.target);
  
        if ($image !== null) {
  
          // Image src
          var imageSrc = that.extractImgSrcFromImage($image);
          $image.attr('src', imageSrc);
  
          /* If we have the height and the width, we don't wait that the image is loaded, but we start directly
           * with the justification */
          if (that.settings.waitThumbnailsLoad === false) {
            var width = parseFloat($image.prop('width'));
            var height = parseFloat($image.prop('height'));
            if (!isNaN(width) && !isNaN(height)) {
              $entry.data('jg.width', width);
              $entry.data('jg.height', height);
              $entry.data('jg.loaded', 'skipped');
              skippedImages = true;
              that.startImgAnalyzer(false);
              return true; // continue
            }
          }
  
          $entry.data('jg.loaded', false);
          imagesToLoad = true;
  
          // Spinner start
          if (!that.isSpinnerActive()) that.startLoadingSpinnerAnimation();
  
          that.onImageEvent(imageSrc, function (loadImg) { // image loaded
            $entry.data('jg.width', loadImg.width);
            $entry.data('jg.height', loadImg.height);
            $entry.data('jg.loaded', true);
            that.startImgAnalyzer(false);
          }, function () { // image load error
            $entry.data('jg.loaded', 'error');
            that.startImgAnalyzer(false);
          });
  
        } else {
          $entry.data('jg.loaded', true);
          $entry.data('jg.width', $entry.width() | parseFloat($entry.css('width')) | 1);
          $entry.data('jg.height', $entry.height() | parseFloat($entry.css('height')) | 1);
        }
  
      }
  
    });
  
    if (!imagesToLoad && !skippedImages) this.startImgAnalyzer(false);
    this.checkWidth();
  };
  
  /**
   * Checks that it is a valid number. If a string is passed it is converted to a number
   *
   * @param settingContainer the object that contains the setting (to allow the conversion)
   * @param settingName the setting name
   */
  JustifiedGallery.prototype.checkOrConvertNumber = function (settingContainer, settingName) {
    if ($.type(settingContainer[settingName]) === 'string') {
      settingContainer[settingName] = parseFloat(settingContainer[settingName]);
    }
  
    if ($.type(settingContainer[settingName]) === 'number') {
      if (isNaN(settingContainer[settingName])) throw 'invalid number for ' + settingName;
    } else {
      throw settingName + ' must be a number';
    }
  };
  
  /**
   * Checks the sizeRangeSuffixes and, if necessary, converts
   * its keys from string (e.g. old settings with 'lt100') to int.
   */
  JustifiedGallery.prototype.checkSizeRangesSuffixes = function () {
    if ($.type(this.settings.sizeRangeSuffixes) !== 'object') {
      throw 'sizeRangeSuffixes must be defined and must be an object';
    }
  
    var suffixRanges = [];
    for (var rangeIdx in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(rangeIdx)) suffixRanges.push(rangeIdx);
    }
  
    var newSizeRngSuffixes = {0: ''};
    for (var i = 0; i < suffixRanges.length; i++) {
      if ($.type(suffixRanges[i]) === 'string') {
        try {
          var numIdx = parseInt(suffixRanges[i].replace(/^[a-z]+/, ''), 10);
          newSizeRngSuffixes[numIdx] = this.settings.sizeRangeSuffixes[suffixRanges[i]];
        } catch (e) {
          throw 'sizeRangeSuffixes keys must contains correct numbers (' + e + ')';
        }
      } else {
        newSizeRngSuffixes[suffixRanges[i]] = this.settings.sizeRangeSuffixes[suffixRanges[i]];
      }
    }
  
    this.settings.sizeRangeSuffixes = newSizeRngSuffixes;
  };
  
  /**
   * check and convert the maxRowHeight setting
   * requires rowHeight to be already set
   * TODO: should be always called when only rowHeight is changed
   * @return number or null
   */
  JustifiedGallery.prototype.retrieveMaxRowHeight = function () {
    var newMaxRowHeight = null;
    var rowHeight = this.settings.rowHeight;
  
    if ($.type(this.settings.maxRowHeight) === 'string') {
      if (this.settings.maxRowHeight.match(/^[0-9]+%$/)) {
        newMaxRowHeight = rowHeight * parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1]) / 100;
      } else {
        newMaxRowHeight = parseFloat(this.settings.maxRowHeight);
      }
    } else if ($.type(this.settings.maxRowHeight) === 'number') {
      newMaxRowHeight = this.settings.maxRowHeight;
    } else if (this.settings.maxRowHeight === false || this.settings.maxRowHeight == null) {
      return null;
    } else {
      throw 'maxRowHeight must be a number or a percentage';
    }
  
    // check if the converted value is not a number
    if (isNaN(newMaxRowHeight)) throw 'invalid number for maxRowHeight';
  
    // check values, maxRowHeight must be >= rowHeight
    if (newMaxRowHeight < rowHeight) newMaxRowHeight = rowHeight;
  
    return newMaxRowHeight;
  };
  
  /**
   * Checks the settings
   */
  JustifiedGallery.prototype.checkSettings = function () {
    this.checkSizeRangesSuffixes();
  
    this.checkOrConvertNumber(this.settings, 'rowHeight');
    this.checkOrConvertNumber(this.settings, 'margins');
    this.checkOrConvertNumber(this.settings, 'border');
  
    var lastRowModes = [
      'justify',
      'nojustify',
      'left',
      'center',
      'right',
      'hide'
    ];
    if (lastRowModes.indexOf(this.settings.lastRow) === -1) {
      throw 'lastRow must be one of: ' + lastRowModes.join(', ');
    }
  
    this.checkOrConvertNumber(this.settings, 'justifyThreshold');
    if (this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) {
      throw 'justifyThreshold must be in the interval [0,1]';
    }
    if ($.type(this.settings.cssAnimation) !== 'boolean') {
      throw 'cssAnimation must be a boolean';
    }
  
    if ($.type(this.settings.captions) !== 'boolean') throw 'captions must be a boolean';
    this.checkOrConvertNumber(this.settings.captionSettings, 'animationDuration');
  
    this.checkOrConvertNumber(this.settings.captionSettings, 'visibleOpacity');
    if (this.settings.captionSettings.visibleOpacity < 0 ||
        this.settings.captionSettings.visibleOpacity > 1) {
      throw 'captionSettings.visibleOpacity must be in the interval [0, 1]';
    }
  
    this.checkOrConvertNumber(this.settings.captionSettings, 'nonVisibleOpacity');
    if (this.settings.captionSettings.nonVisibleOpacity < 0 ||
        this.settings.captionSettings.nonVisibleOpacity > 1) {
      throw 'captionSettings.nonVisibleOpacity must be in the interval [0, 1]';
    }
  
    this.checkOrConvertNumber(this.settings, 'imagesAnimationDuration');
    this.checkOrConvertNumber(this.settings, 'refreshTime');
    this.checkOrConvertNumber(this.settings, 'refreshSensitivity');
    if ($.type(this.settings.randomize) !== 'boolean') throw 'randomize must be a boolean';
    if ($.type(this.settings.selector) !== 'string') throw 'selector must be a string';
  
    if (this.settings.sort !== false && !$.isFunction(this.settings.sort)) {
      throw 'sort must be false or a comparison function';
    }
  
    if (this.settings.filter !== false && !$.isFunction(this.settings.filter) &&
        $.type(this.settings.filter) !== 'string') {
      throw 'filter must be false, a string or a filter function';
    }
  };
  
  /**
   * It brings all the indexes from the sizeRangeSuffixes and it orders them. They are then sorted and returned.
   * @returns {Array} sorted suffix ranges
   */
  JustifiedGallery.prototype.retrieveSuffixRanges = function () {
    var suffixRanges = [];
    for (var rangeIdx in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(rangeIdx)) suffixRanges.push(parseInt(rangeIdx, 10));
    }
    suffixRanges.sort(function (a, b) { return a > b ? 1 : a < b ? -1 : 0; });
    return suffixRanges;
  };
  
  /**
   * Update the existing settings only changing some of them
   *
   * @param newSettings the new settings (or a subgroup of them)
   */
  JustifiedGallery.prototype.updateSettings = function (newSettings) {
    // In this case Justified Gallery has been called again changing only some options
    this.settings = $.extend({}, this.settings, newSettings);
    this.checkSettings();
  
    // As reported in the settings: negative value = same as margins, 0 = disabled
    this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins;
  
    this.maxRowHeight = this.retrieveMaxRowHeight();
    this.suffixRanges = this.retrieveSuffixRanges();
  };
  
  JustifiedGallery.prototype.defaults = {
    sizeRangeSuffixes: { }, /* e.g. Flickr configuration
        {
          100: '_t',  // used when longest is less than 100px
          240: '_m',  // used when longest is between 101px and 240px
          320: '_n',  // ...
          500: '',
          640: '_z',
          1024: '_b'  // used as else case because it is the last
        }
    */
    thumbnailPath: undefined, /* If defined, sizeRangeSuffixes is not used, and this function is used to determine the
    path relative to a specific thumbnail size. The function should accept respectively three arguments:
    current path, width and height */
    rowHeight: 120, // required? required to be > 0?
    maxRowHeight: false, // false or negative value to deactivate. Positive number to express the value in pixels,
                         // A string '[0-9]+%' to express in percentage (e.g. 300% means that the row height
                         // can't exceed 3 * rowHeight)
    margins: 1,
    border: -1, // negative value = same as margins, 0 = disabled, any other value to set the border
  
    lastRow: 'nojustify', // … which is the same as 'left', or can be 'justify', 'center', 'right' or 'hide'
  
    justifyThreshold: 0.90, /* if row width / available space > 0.90 it will be always justified
                             * (i.e. lastRow setting is not considered) */
    waitThumbnailsLoad: true,
    captions: true,
    cssAnimation: true,
    imagesAnimationDuration: 500, // ignored with css animations
    captionSettings: { // ignored with css animations
      animationDuration: 500,
      visibleOpacity: 0.7,
      nonVisibleOpacity: 0.0
    },
    rel: null, // rewrite the rel of each analyzed links
    target: null, // rewrite the target of all links
    extension: /\.[^.\\/]+$/, // regexp to capture the extension of an image
    refreshTime: 200, // time interval (in ms) to check if the page changes its width
    refreshSensitivity: 0, // change in width allowed (in px) without re-building the gallery
    randomize: false,
    rtl: false, // right-to-left mode
    sort: false, /*
      - false: to do not sort
      - function: to sort them using the function as comparator (see Array.prototype.sort())
    */
    filter: false, /*
      - false, null or undefined: for a disabled filter
      - a string: an entry is kept if entry.is(filter string) returns true
                  see jQuery's .is() function for further information
      - a function: invoked with arguments (entry, index, array). Return true to keep the entry, false otherwise.
                    It follows the specifications of the Array.prototype.filter() function of JavaScript.
    */
    selector: 'a, div:not(.spinner)', // The selector that is used to know what are the entries of the gallery
    imgSelector: '> img, > a > img', // The selector that is used to know what are the images of each entry
    triggerEvent: function (event) { // This is called to trigger events, the default behavior is to call $.trigger
      this.$gallery.trigger(event);  // Consider that 'this' is this set to the JustifiedGallery object, so it can
    }                                // access to fields such as $gallery, useful to trigger events with jQuery.
  };

  /**
   * Justified Gallery plugin for jQuery
   *
   * Events
   *  - jg.complete : called when all the gallery has been created
   *  - jg.resize : called when the gallery has been resized
   *  - jg.rowflush : when a new row appears
   *
   * @param arg the action (or the settings) passed when the plugin is called
   * @returns {*} the object itself
   */
  $.fn.justifiedGallery = function (arg) {
    return this.each(function (index, gallery) {

      var $gallery = $(gallery);
      $gallery.addClass('justified-gallery');

      var controller = $gallery.data('jg.controller');
      if (typeof controller === 'undefined') {
        // Create controller and assign it to the object data
        if (typeof arg !== 'undefined' && arg !== null && $.type(arg) !== 'object') {
          if (arg === 'destroy') return; // Just a call to an unexisting object
          throw 'The argument must be an object';
        }
        controller = new JustifiedGallery($gallery, $.extend({}, JustifiedGallery.prototype.defaults, arg));
        $gallery.data('jg.controller', controller);
      } else if (arg === 'norewind') {
        // In this case we don't rewind: we analyze only the latest images (e.g. to complete the last unfinished row
        // ... left to be more readable
      } else if (arg === 'destroy') {
        controller.destroy();
        return;
      } else {
        // In this case Justified Gallery has been called again changing only some options
        controller.updateSettings(arg);
        controller.rewind();
      }

      // Update the entries list
      if (!controller.updateEntries(arg === 'norewind')) return;

      // Init justified gallery
      controller.init();

    });
  };

}));

/***/ }),

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/slick-carousel/slick/slick.js":
/*!****************************************************!*\
  !*** ./node_modules/slick-carousel/slick/slick.js ***!
  \****************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));


/***/ }),

/***/ "./node_modules/zurb-twentytwenty/js/jquery.event.move.js":
/*!****************************************************************!*\
  !*** ./node_modules/zurb-twentytwenty/js/jquery.event.move.js ***!
  \****************************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// DOM.event.move
//
// 2.0.0
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:     Page coordinates of pointer.
// startX:
// startY:    Page coordinates of pointer at movestart.
// distX:
// distY:     Distance the pointer has moved since movestart.
// deltaX:
// deltaY:    Distance the finger has moved since last event.
// velocityX:
// velocityY: Average velocity over last few events.


(function(fn) {
	if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (fn),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(function(){
	var assign = Object.assign || window.jQuery && jQuery.extend;

	// Number of pixels a pressed pointer travels before movestart
	// event is fired.
	var threshold = 8;

	// Shim for requestAnimationFrame, falling back to timer. See:
	// see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	var requestFrame = (function(){
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(fn, element){
				return window.setTimeout(function(){
					fn();
				}, 25);
			}
		);
	})();
	
	// Shim for customEvent
	// see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
	(function () {
		if ( typeof window.CustomEvent === "function" ) return false;
		function CustomEvent ( event, params ) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent( 'CustomEvent' );
			evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
			return evt;
		}
		
		CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = CustomEvent;
	})();

	var ignoreTags = {
			textarea: true,
			input: true,
			select: true,
			button: true
		};

	var mouseevents = {
		move:   'mousemove',
		cancel: 'mouseup dragstart',
		end:    'mouseup'
	};

	var touchevents = {
		move:   'touchmove',
		cancel: 'touchend',
		end:    'touchend'
	};

	var rspaces = /\s+/;


	// DOM Events

	var eventOptions = { bubbles: true, cancelable: true };

	var eventsSymbol = typeof Symbol === "function" ? Symbol('events') : {};

	function createEvent(type) {
		return new CustomEvent(type, eventOptions);
	}

	function getEvents(node) {
		return node[eventsSymbol] || (node[eventsSymbol] = {});
	}

	function on(node, types, fn, data, selector) {
		types = types.split(rspaces);

		var events = getEvents(node);
		var i = types.length;
		var handlers, type;

		function handler(e) { fn(e, data); }

		while (i--) {
			type = types[i];
			handlers = events[type] || (events[type] = []);
			handlers.push([fn, handler]);
			node.addEventListener(type, handler);
		}
	}

	function off(node, types, fn, selector) {
		types = types.split(rspaces);

		var events = getEvents(node);
		var i = types.length;
		var type, handlers, k;

		if (!events) { return; }

		while (i--) {
			type = types[i];
			handlers = events[type];
			if (!handlers) { continue; }
			k = handlers.length;
			while (k--) {
				if (handlers[k][0] === fn) {
					node.removeEventListener(type, handlers[k][1]);
					handlers.splice(k, 1);
				}
			}
		}
	}

	function trigger(node, type, properties) {
		// Don't cache events. It prevents you from triggering an event of a
		// given type from inside the handler of another event of that type.
		var event = createEvent(type);
		if (properties) { assign(event, properties); }
		node.dispatchEvent(event);
	}


	// Constructors

	function Timer(fn){
		var callback = fn,
		    active = false,
		    running = false;

		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}

		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};

		this.end = function(fn) {
			var cb = callback;

			if (!fn) { return; }

			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } :
					fn ;

				active = true;
			}
		};
	}


	// Functions

	function noop() {}

	function preventDefault(e) {
		e.preventDefault();
	}

	function isIgnoreTag(e) {
		return !!ignoreTags[e.target.tagName.toLowerCase()];
	}

	function isPrimaryButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}

		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...

		i = -1;
		l = touchList.length;

		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, data) {
		var touch = identifiedTouch(e.changedTouches, data.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === data.pageX && touch.pageY === data.pageY) { return; }

		return touch;
	}


	// Handlers that decide when the first movestart is triggered

	function mousedown(e){
		// Ignore non-primary buttons
		if (!isPrimaryButton(e)) { return; }

		// Ignore form and interactive elements
		if (isIgnoreTag(e)) { return; }

		on(document, mouseevents.move, mousemove, e);
		on(document, mouseevents.cancel, mouseend, e);
	}

	function mousemove(e, data){
		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e, data) {
		removeMouse();
	}

	function removeMouse() {
		off(document, mouseevents.move, mousemove);
		off(document, mouseevents.cancel, mouseend);
	}

	function touchstart(e) {
		// Don't get in the way of interaction with form elements
		if (ignoreTags[e.target.tagName.toLowerCase()]) { return; }

		var touch = e.changedTouches[0];

		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so we must copy the data. This object acts as a template for
		// movestart, move and moveend event objects.
		var data = {
			target:     touch.target,
			pageX:      touch.pageX,
			pageY:      touch.pageY,
			identifier: touch.identifier,

			// The only way to make handlers individually unbindable is by
			// making them unique.
			touchmove:  function(e, data) { touchmove(e, data); },
			touchend:   function(e, data) { touchend(e, data); }
		};

		on(document, touchevents.move, data.touchmove, data);
		on(document, touchevents.cancel, data.touchend, data);
	}

	function touchmove(e, data) {
		var touch = changedTouch(e, data);
		if (!touch) { return; }
		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e, data) {
		var touch = identifiedTouch(e.changedTouches, data.identifier);
		if (!touch) { return; }
		removeTouch(data);
	}

	function removeTouch(data) {
		off(document, touchevents.move, data.touchmove);
		off(document, touchevents.cancel, data.touchend);
	}

	function checkThreshold(e, data, touch, fn) {
		var distX = touch.pageX - data.pageX;
		var distY = touch.pageY - data.pageY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		triggerStart(e, data, touch, distX, distY, fn);
	}

	function triggerStart(e, data, touch, distX, distY, fn) {
		var touches = e.targetTouches;
		var time = e.timeStamp - data.timeStamp;

		// Create a movestart object with some special properties that
		// are passed only to the movestart handlers.
		var template = {
			altKey:     e.altKey,
			ctrlKey:    e.ctrlKey,
			shiftKey:   e.shiftKey,
			startX:     data.pageX,
			startY:     data.pageY,
			distX:      distX,
			distY:      distY,
			deltaX:     distX,
			deltaY:     distY,
			pageX:      touch.pageX,
			pageY:      touch.pageY,
			velocityX:  distX / time,
			velocityY:  distY / time,
			identifier: data.identifier,
			targetTouches: touches,
			finger: touches ? touches.length : 1,
			enableMove: function() {
				this.moveEnabled = true;
				this.enableMove = noop;
				e.preventDefault();
			}
		};

		// Trigger the movestart event.
		trigger(data.target, 'movestart', template);

		// Unbind handlers that tracked the touch or mouse up till now.
		fn(data);
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e, data) {
		var timer  = data.timer;

		data.touch = e;
		data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeMouseend(e, data) {
		var target = data.target;
		var event  = data.event;
		var timer  = data.timer;

		removeActiveMouse();

		endEvent(target, event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				off(target, 'click', preventDefault);
			}, 0);
		});
	}

	function removeActiveMouse() {
		off(document, mouseevents.move, activeMousemove);
		off(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e, data) {
		var event = data.event;
		var timer = data.timer;
		var touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		data.touch = touch;
		data.timeStamp = e.timeStamp;

		timer.kick();
	}

	function activeTouchend(e, data) {
		var target = data.target;
		var event  = data.event;
		var timer  = data.timer;
		var touch  = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(data);
		endEvent(target, event, timer);
	}

	function removeActiveTouch(data) {
		off(document, touchevents.move, data.activeTouchmove);
		off(document, touchevents.end, data.activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp) {
		var time = timeStamp - event.timeStamp;

		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;

		// Average the velocity of the last few events using a decay
		// curve to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;
	}

	function endEvent(target, event, timer, fn) {
		timer.end(function(){
			trigger(target, 'moveend', event);
			return fn && fn();
		});
	}


	// Set up the DOM

	function movestart(e) {
		if (e.defaultPrevented) { return; }
		if (!e.moveEnabled) { return; }

		var event = {
			startX:        e.startX,
			startY:        e.startY,
			pageX:         e.pageX,
			pageY:         e.pageY,
			distX:         e.distX,
			distY:         e.distY,
			deltaX:        e.deltaX,
			deltaY:        e.deltaY,
			velocityX:     e.velocityX,
			velocityY:     e.velocityY,
			identifier:    e.identifier,
			targetTouches: e.targetTouches,
			finger:        e.finger
		};

		var data = {
			target:    e.target,
			event:     event,
			timer:     new Timer(update),
			touch:     undefined,
			timeStamp: e.timeStamp
		};

		function update(time) {
			updateEvent(event, data.touch, data.timeStamp);
			trigger(data.target, 'move', event);
		}

		if (e.identifier === undefined) {
			// We're dealing with a mouse event.
			// Stop clicks from propagating during a move
			on(e.target, 'click', preventDefault);
			on(document, mouseevents.move, activeMousemove, data);
			on(document, mouseevents.end, activeMouseend, data);
		}
		else {
			// In order to unbind correct handlers they have to be unique
			data.activeTouchmove = function(e, data) { activeTouchmove(e, data); };
			data.activeTouchend = function(e, data) { activeTouchend(e, data); };

			// We're dealing with a touch.
			on(document, touchevents.move, data.activeTouchmove, data);
			on(document, touchevents.end, data.activeTouchend, data);
		}
	}

	on(document, 'mousedown', mousedown);
	on(document, 'touchstart', touchstart);
	on(document, 'movestart', movestart);


	// jQuery special events
	//
	// jQuery event objects are copies of DOM event objects. They need
	// a little help copying the move properties across.

	if (!window.jQuery) { return; }

	var properties = ("startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY").split(' ');

	function enableMove1(e) { e.enableMove(); }
	function enableMove2(e) { e.enableMove(); }
	function enableMove3(e) { e.enableMove(); }

	function add(handleObj) {
		var handler = handleObj.handler;

		handleObj.handler = function(e) {
			// Copy move properties across from originalEvent
			var i = properties.length;
			var property;

			while(i--) {
				property = properties[i];
				e[property] = e.originalEvent[property];
			}

			handler.apply(this, arguments);
		};
	}

	jQuery.event.special.movestart = {
		setup: function() {
			// Movestart must be enabled to allow other move events
			on(this, 'movestart', enableMove1);

			// Do listen to DOM events
			return false;
		},

		teardown: function() {
			off(this, 'movestart', enableMove1);
			return false;
		},

		add: add
	};

	jQuery.event.special.move = {
		setup: function() {
			on(this, 'movestart', enableMove2);
			return false;
		},

		teardown: function() {
			off(this, 'movestart', enableMove2);
			return false;
		},

		add: add
	};

	jQuery.event.special.moveend = {
		setup: function() {
			on(this, 'movestart', enableMove3);
			return false;
		},

		teardown: function() {
			off(this, 'movestart', enableMove3);
			return false;
		},

		add: add
	};
});


/***/ }),

/***/ "./node_modules/zurb-twentytwenty/js/jquery.twentytwenty.js":
/*!******************************************************************!*\
  !*** ./node_modules/zurb-twentytwenty/js/jquery.twentytwenty.js ***!
  \******************************************************************/
/***/ (() => {

(function($){

  $.fn.twentytwenty = function(options) {
    var options = $.extend({
      default_offset_pct: 0.5,
      orientation: 'horizontal',
      before_label: 'Before',
      after_label: 'After',
      no_overlay: false,
      move_slider_on_hover: false,
      move_with_handle_only: true,
      click_to_move: false
    }, options);

    return this.each(function() {

      var sliderPct = options.default_offset_pct;
      var container = $(this);
      var sliderOrientation = options.orientation;
      var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
      var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';


      container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
      if(!options.no_overlay) {
        container.append("<div class='twentytwenty-overlay'></div>");
        var overlay = container.find(".twentytwenty-overlay");
        overlay.append("<div class='twentytwenty-before-label' data-content='"+options.before_label+"'></div>");
        overlay.append("<div class='twentytwenty-after-label' data-content='"+options.after_label+"'></div>");
      }
      var beforeImg = container.find("img:first");
      var afterImg = container.find("img:last");
      container.append("<div class='twentytwenty-handle'></div>");
      var slider = container.find(".twentytwenty-handle");
      slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
      slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
      container.addClass("twentytwenty-container");
      beforeImg.addClass("twentytwenty-before");
      afterImg.addClass("twentytwenty-after");
      
      var calcOffset = function(dimensionPct) {
        var w = beforeImg.width();
        var h = beforeImg.height();
        return {
          w: w+"px",
          h: h+"px",
          cw: (dimensionPct*w)+"px",
          ch: (dimensionPct*h)+"px"
        };
      };

      var adjustContainer = function(offset) {
      	if (sliderOrientation === 'vertical') {
          beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
          afterImg.css("clip", "rect("+offset.ch+","+offset.w+","+offset.h+",0)");
      	}
      	else {
          beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h+",0)");
          afterImg.css("clip", "rect(0,"+offset.w+","+offset.h+","+offset.cw+")");
    	}
        container.css("height", offset.h);
      };

      var adjustSlider = function(pct) {
        var offset = calcOffset(pct);
        slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
        adjustContainer(offset);
      };

      // Return the number specified or the min/max number if it outside the range given.
      var minMaxNumber = function(num, min, max) {
        return Math.max(min, Math.min(max, num));
      };

      // Calculate the slider percentage based on the position.
      var getSliderPercentage = function(positionX, positionY) {
        var sliderPercentage = (sliderOrientation === 'vertical') ?
          (positionY-offsetY)/imgHeight :
          (positionX-offsetX)/imgWidth;

        return minMaxNumber(sliderPercentage, 0, 1);
      };


      $(window).on("resize.twentytwenty", function(e) {
        adjustSlider(sliderPct);
      });

      var offsetX = 0;
      var offsetY = 0;
      var imgWidth = 0;
      var imgHeight = 0;
      var onMoveStart = function(e) {
        if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
          e.preventDefault();
        }
        else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
          e.preventDefault();
        }
        container.addClass("active");
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width(); 
        imgHeight = beforeImg.height();          
      };
      var onMove = function(e) {
        if (container.hasClass("active")) {
          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        }
      };
      var onMoveEnd = function() {
          container.removeClass("active");
      };

      var moveTarget = options.move_with_handle_only ? slider : container;
      moveTarget.on("movestart",onMoveStart);
      moveTarget.on("move",onMove);
      moveTarget.on("moveend",onMoveEnd);

      if (options.move_slider_on_hover) {
        container.on("mouseenter", onMoveStart);
        container.on("mousemove", onMove);
        container.on("mouseleave", onMoveEnd);
      }

      slider.on("touchmove", function(e) {
        e.preventDefault();
      });

      container.find("img").on("mousedown", function(event) {
        event.preventDefault();
      });

      if (options.click_to_move) {
        container.on('click', function(e) {
          offsetX = container.offset().left;
          offsetY = container.offset().top;
          imgWidth = beforeImg.width();
          imgHeight = beforeImg.height();

          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        });
      }

      $(window).trigger("resize.twentytwenty");
    });
  };

})(jQuery);


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["jQuery"];

/***/ }),

/***/ "./node_modules/dompurify/dist/purify.es.mjs":
/*!***************************************************!*\
  !*** ./node_modules/dompurify/dist/purify.es.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ purify)
/* harmony export */ });
/*! @license DOMPurify 3.2.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.7/LICENSE */

const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object; // eslint-disable-line import/no-mutable-exports
let {
  apply,
  construct
} = typeof Reflect !== 'undefined' && Reflect;
if (!freeze) {
  freeze = function freeze(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
/**
 * Creates a new function that calls the given function with a specified thisArg and arguments.
 *
 * @param func - The function to be wrapped and called.
 * @returns A new function that calls the given function with a specified thisArg and arguments.
 */
function unapply(func) {
  return function (thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
/**
 * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
 *
 * @param func - The constructor function to be wrapped and called.
 * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
 */
function unconstruct(Func) {
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
/**
 * Add properties to a lookup table
 *
 * @param set - The set to which elements will be added.
 * @param array - The array containing elements to be added to the set.
 * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
 * @returns The modified set with added elements.
 */
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === 'string') {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
/**
 * Clean up an array to harden against CSPP
 *
 * @param array - The array to be cleaned.
 * @returns The cleaned version of the array
 */
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
/**
 * Shallow clone an object
 *
 * @param object - The object to be cloned.
 * @returns A new object that copies the original.
 */
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === 'object' && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
/**
 * This method automatically checks if the prop is function or getter and behaves accordingly.
 *
 * @param object - The object to look up the getter function in its prototype chain.
 * @param prop - The property name for which to find the getter function.
 * @returns The getter function found in the prototype chain or a fallback function.
 */
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === 'function') {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}

const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'search', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);
const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'enterkeyhint', 'exportparts', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'inputmode', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'part', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'slot', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);
// List of SVG elements that are disallowed by default.
// We still need to know them so that we can do namespace
// checks properly in case one wants to add them to
// allow-list.
const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);
// Similarly to SVG, we want to know all MathML elements,
// even those that we disallow by default.
const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
const text = freeze(['#text']);

const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'exportparts', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inert', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'part', 'pattern', 'placeholder', 'playsinline', 'popover', 'popovertarget', 'popovertargetaction', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'slot', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'wrap', 'xmlns', 'slot']);
const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'amplitude', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'exponent', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'slope', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'tablevalues', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

// eslint-disable-next-line unicorn/better-regex
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm); // eslint-disable-line unicorn/better-regex
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);

var EXPRESSIONS = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ARIA_ATTR: ARIA_ATTR,
  ATTR_WHITESPACE: ATTR_WHITESPACE,
  CUSTOM_ELEMENT: CUSTOM_ELEMENT,
  DATA_ATTR: DATA_ATTR,
  DOCTYPE_NAME: DOCTYPE_NAME,
  ERB_EXPR: ERB_EXPR,
  IS_ALLOWED_URI: IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR: MUSTACHE_EXPR,
  TMPLIT_EXPR: TMPLIT_EXPR
});

/* eslint-disable @typescript-eslint/indent */
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
const NODE_TYPE = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12 // Deprecated
};
const getGlobal = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};
/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param trustedTypes The policy factory.
 * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
 * @return The policy created (or null, if Trusted Types
 * are not supported or creating the policy failed).
 */
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  }
  // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.
  let suffix = null;
  const ATTR_NAME = 'data-tt-policy-suffix';
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html) {
        return html;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};
const _createHooksMap = function _createHooksMap() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
  const DOMPurify = root => createDOMPurify(root);
  DOMPurify.version = '3.2.7';
  DOMPurify.removed = [];
  if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document
  } = window;
  const originalDocument = document;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
  const remove = lookupGetter(ElementPrototype, 'remove');
  const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
  const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
  const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.
  if (typeof HTMLTemplateElement === 'function') {
    const template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = '';
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  /**
   * Expose whether this browser supports running the full DOMPurify.
   */
  DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
  const {
    MUSTACHE_EXPR,
    ERB_EXPR,
    TMPLIT_EXPR,
    DATA_ATTR,
    ARIA_ATTR,
    IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE,
    CUSTOM_ELEMENT
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */
  /* allowed element names */
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  /* Allowed attribute names */
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  /*
   * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
   * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
   * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
   * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
   */
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  let FORBID_TAGS = null;
  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  let FORBID_ATTR = null;
  /* Decide if ARIA attributes are okay */
  let ALLOW_ARIA_ATTR = true;
  /* Decide if custom data attributes are okay */
  let ALLOW_DATA_ATTR = true;
  /* Decide if unknown protocols are okay */
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  /* Decide if self-closing tags in attributes are allowed.
   * Usually removed due to a mXSS issue in jQuery 3.0 */
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  let SAFE_FOR_TEMPLATES = false;
  /* Output should be safe even for XML used within HTML and alike.
   * This means, DOMPurify removes comments when containing risky content.
   */
  let SAFE_FOR_XML = true;
  /* Decide if document with <html>... should be returned */
  let WHOLE_DOCUMENT = false;
  /* Track whether config is already set on this instance of DOMPurify. */
  let SET_CONFIG = false;
  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  let FORCE_BODY = false;
  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  let RETURN_DOM = false;
  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */
  let RETURN_DOM_FRAGMENT = false;
  /* Try to return a Trusted Type object instead of a string, return a string in
   * case Trusted Types are not supported  */
  let RETURN_TRUSTED_TYPE = false;
  /* Output should be free from DOM clobbering attacks?
   * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
   */
  let SANITIZE_DOM = true;
  /* Achieve full DOM Clobbering protection by isolating the namespace of named
   * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
   *
   * HTML/DOM spec rules that enable DOM Clobbering:
   *   - Named Access on Window (§7.3.3)
   *   - DOM Tree Accessors (§3.1.5)
   *   - Form Element Parent-Child Relations (§4.10.3)
   *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
   *   - HTMLCollection (§4.2.10.2)
   *
   * Namespace isolation is implemented by prefixing `id` and `name` attributes
   * with a constant string, i.e., `user-content-`
   */
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
  /* Keep element content when removing element? */
  let KEEP_CONTENT = true;
  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */
  let IN_PLACE = false;
  /* Allow usage of profiles like html, svg and mathMl */
  let USE_PROFILES = {};
  /* Tags to ignore content of when KEEP_CONTENT is true */
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
  /* Tags that are safe for data: URIs */
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
  /* Attributes safe for values like "javascript:" */
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
  const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  /* Document namespace */
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  /* Allowed XHTML+XML namespaces */
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
  let HTML_INTEGRATION_POINTS = addToSet({}, ['annotation-xml']);
  // Certain elements are allowed in both SVG and HTML
  // namespace. We need to specify them explicitly
  // so that they don't get erroneously deleted from
  // HTML namespace.
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
  /* Parsing of strict XHTML documents */
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
  const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
  let transformCaseFunc = null;
  /* Keep a reference to config to pass to hooks */
  let CONFIG = null;
  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */
  const formElement = document.createElement('form');
  const isRegexOrFunction = function isRegexOrFunction(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  /**
   * _parseConfig
   *
   * @param cfg optional config literal
   */
  // eslint-disable-next-line complexity
  const _parseConfig = function _parseConfig() {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    /* Shield configuration object from tampering */
    if (!cfg || typeof cfg !== 'object') {
      cfg = {};
    }
    /* Shield configuration object from prototype pollution */
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE =
    // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
    transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
    /* Set configuration parameters */
    ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
    IN_PLACE = cfg.IN_PLACE || false; // Default false
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    /* Merge configuration parameters */
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }
    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
    }
    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      // Overwrite existing TrustedTypes policy.
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      // Sign local variables required by `sanitize`.
      emptyHTML = trustedTypesPolicy.createHTML('');
    } else {
      // Uninitialized policy, attempt to initialize the internal dompurify policy.
      if (trustedTypesPolicy === undefined) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      // If creating the internal policy succeeded sign internal variables.
      if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
        emptyHTML = trustedTypesPolicy.createHTML('');
      }
    }
    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  /* Keep track of all possible SVG and MathML tags
   * so that we can perform the namespace checks
   * correctly. */
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  /**
   * @param element a DOM element whose namespace is being checked
   * @returns Return false if the element has a
   *  namespace that a spec-compliant parser would never
   *  return. Return true otherwise.
   */
  const _checkValidNamespace = function _checkValidNamespace(element) {
    let parent = getParentNode(element);
    // In JSDOM, if we're inside shadow DOM, then parentNode
    // can be null. We just simulate parent in this case.
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: 'template'
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      // The only way to switch from HTML namespace to SVG
      // is via <svg>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'svg';
      }
      // The only way to switch from MathML to SVG is via`
      // svg if parent is either <annotation-xml> or MathML
      // text integration points.
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      // We only allow elements that are defined in SVG
      // spec. All others are disallowed in SVG namespace.
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      // The only way to switch from HTML namespace to MathML
      // is via <math>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'math';
      }
      // The only way to switch from SVG to MathML is via
      // <math> and HTML integration points
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
      }
      // We only allow elements that are defined in MathML
      // spec. All others are disallowed in MathML namespace.
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      // The only way to switch from SVG to HTML is via
      // HTML integration points, and from MathML to HTML
      // is via MathML text integration points
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      // We disallow tags that are specific for MathML
      // or SVG and should never appear in HTML namespace
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    // For XHTML and XML documents that support custom namespaces
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    // The code should never reach this place (this means
    // that the element somehow got namespace that is not
    // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
    // Return false just in case.
    return false;
  };
  /**
   * _forceRemove
   *
   * @param node a DOM node
   */
  const _forceRemove = function _forceRemove(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      getParentNode(node).removeChild(node);
    } catch (_) {
      remove(node);
    }
  };
  /**
   * _removeAttribute
   *
   * @param name an Attribute name
   * @param element a DOM node
   */
  const _removeAttribute = function _removeAttribute(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    // We void attribute values for unremovable "is" attributes
    if (name === 'is') {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {}
      } else {
        try {
          element.setAttribute(name, '');
        } catch (_) {}
      }
    }
  };
  /**
   * _initDocument
   *
   * @param dirty - a string of dirty markup
   * @return a DOM, filled with the dirty markup
   */
  const _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
      // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    /*
     * Use the DOMParser API by default, fallback later if needs be
     * DOMParser not work for svg when has multiple root element.
     */
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {}
    }
    /* Use createHTMLDocument in case DOMParser is not available */
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, 'template', null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
        // Syntax error if dirtyPayload is invalid xml
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    /* Work on whole document or just its body */
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  /**
   * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
   *
   * @param root The root element or node to start traversing on.
   * @return The created NodeIterator
   */
  const _createNodeIterator = function _createNodeIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root,
    // eslint-disable-next-line no-bitwise
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
  };
  /**
   * _isClobbered
   *
   * @param element element to check for clobbering attacks
   * @return true if clobbered, false if safe
   */
  const _isClobbered = function _isClobbered(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function');
  };
  /**
   * Checks whether the given object is a DOM node.
   *
   * @param value object to check whether it's a DOM node
   * @return true is object is a DOM node
   */
  const _isNode = function _isNode(value) {
    return typeof Node === 'function' && value instanceof Node;
  };
  function _executeHooks(hooks, currentNode, data) {
    arrayForEach(hooks, hook => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   * @param currentNode to check for permission to exist
   * @return true if node was killed, false if left alive
   */
  const _sanitizeElements = function _sanitizeElements(currentNode) {
    let content = null;
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Now let's check the element's type and name */
    const tagName = transformCaseFunc(currentNode.nodeName);
    /* Execute a hook if present */
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    /* Detect mXSS attempts abusing namespace confusion */
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove any occurrence of processing instructions */
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove any kind of possibly harmful comments */
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove element if anything forbids its presence */
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      /* Check if we have a custom element to handle */
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      /* Keep content except for bad-listed elements */
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    /* Check whether element has a valid namespace */
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Make sure that older browsers don't get fallback-tag mXSS */
    if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      /* Get the element's text content */
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        content = stringReplace(content, expr, ' ');
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  /**
   * _isValidAttribute
   *
   * @param lcTag Lowercase tag name of containing element.
   * @param lcName Lowercase attribute name.
   * @param value Attribute value.
   * @return Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity
  const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }
    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
      // First condition does a very basic check if a) it's basically a valid custom element tagname AND
      // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
      _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) ||
      // Alternative, second condition checks if it's an `is`-attribute, AND
      // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
        return false;
      }
      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
      return false;
    } else ;
    return true;
  };
  /**
   * _isBasicCustomElement
   * checks if at least one dash is included in tagName, and it's not the first char
   * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
   *
   * @param tagName name of the tag of the node to sanitize
   * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
   */
  const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
    return tagName !== 'annotation-xml' && stringMatch(tagName, CUSTOM_ELEMENT);
  };
  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param currentNode to sanitize
   */
  const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    /* Check if we have attributes; if not we might have a text node */
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: undefined
    };
    let l = attributes.length;
    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === 'value' ? initValue : stringTrim(initValue);
      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Full DOM Clobbering protection via namespace isolation,
       * Prefix id and name attributes with `user-content-`
       */
      if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
        // Remove the attribute with this value
        _removeAttribute(name, currentNode);
        // Prefix the value and later re-create the attribute with the sanitized value
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      /* Work around a security issue with comments inside attributes */
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title|textarea)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Make sure we cannot easily use animated hrefs, even if animations are allowed */
      if (lcName === 'attributename' && stringMatch(value, 'href')) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Did the hooks approve of the attribute? */
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Work around a security issue in jQuery 3.0 */
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          value = stringReplace(value, expr, ' ');
        });
      }
      /* Is `value` valid for this attribute? */
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Handle attributes that require Trusted Types */
      if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
        if (namespaceURI) ; else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case 'TrustedHTML':
              {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
            case 'TrustedScriptURL':
              {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
          }
        }
      }
      /* Handle invalid data-* attribute set by try-catching it */
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  /**
   * _sanitizeShadowDOM
   *
   * @param fragment to iterate over recursively
   */
  const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      /* Sanitize tags and elements */
      _sanitizeElements(shadowNode);
      /* Check attributes next */
      _sanitizeAttributes(shadowNode);
      /* Deep shadow DOM detected */
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(shadowNode.content);
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = '<!-->';
    }
    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      if (typeof dirty.toString === 'function') {
        dirty = dirty.toString();
        if (typeof dirty !== 'string') {
          throw typeErrorCreate('dirty is not a string, aborting');
        }
      } else {
        throw typeErrorCreate('toString is not a function');
      }
    }
    /* Return dirty HTML if DOMPurify cannot run */
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    /* Assign config vars */
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    /* Clean up removed elements */
    DOMPurify.removed = [];
    /* Check if dirty is correctly typed for IN_PLACE */
    if (typeof dirty === 'string') {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      /* Do some early pre-sanitization to avoid unsafe root nodes */
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
        }
      }
    } else if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!---->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
      // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf('<') === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      /* Initialize the document to work on */
      body = _initDocument(dirty);
      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
      }
    }
    /* Remove first element node (ours) if FORCE_BODY is set */
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    /* Get node iterator */
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    /* Now start iterating over the created document */
    while (currentNode = nodeIterator.nextNode()) {
      /* Sanitize tags and elements */
      _sanitizeElements(currentNode);
      /* Check attributes next */
      _sanitizeAttributes(currentNode);
      /* Shadow DOM detected, sanitize it */
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
    }
    /* If we sanitized `dirty` in-place, return it. */
    if (IN_PLACE) {
      return dirty;
    }
    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        /*
          AdoptNode() is not used because internal state is not reset
          (e.g. the past names map of a HTMLFormElement), this is safe
          in theory but we would rather not risk another attack vector.
          The state that is cloned by importNode() is explicitly defined
          by the specs.
        */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    /* Serialize doctype if allowed */
    if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
    }
    /* Sanitize final string template-safe */
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        serializedHTML = stringReplace(serializedHTML, expr, ' ');
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function () {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function (entryPoint, hookFunction) {
    if (hookFunction !== undefined) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function (entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function () {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();


//# sourceMappingURL=purify.es.mjs.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.scss */ "./src/styles/style.scss");
/* harmony import */ var _components_controls_background_controls_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/controls/background-controls/script */ "./src/components/controls/background-controls/script.js");
/* harmony import */ var _blocks_slideshow_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/slideshow/script */ "./src/blocks/slideshow/script.js");
/* harmony import */ var _blocks_countup_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks/countup/script */ "./src/blocks/countup/script.js");
/* harmony import */ var _blocks_justified_gallery_script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blocks/justified-gallery/script */ "./src/blocks/justified-gallery/script.js");
/* harmony import */ var _blocks_google_maps_script__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./blocks/google-maps/script */ "./src/blocks/google-maps/script.js");
/* harmony import */ var _blocks_countdown_script__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blocks/countdown/script */ "./src/blocks/countdown/script.js");
/* harmony import */ var _blocks_image_comparison_script__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./blocks/image-comparison/script */ "./src/blocks/image-comparison/script.js");
/* harmony import */ var _blocks_accordion_script__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./blocks/accordion/script */ "./src/blocks/accordion/script.js");
/* harmony import */ var _blocks_tabs_script__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./blocks/tabs/script */ "./src/blocks/tabs/script.js");
/* harmony import */ var _blocks_video_embed_script__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./blocks/video-embed/script */ "./src/blocks/video-embed/script.js");
/* harmony import */ var _blocks_container_script__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./blocks/container/script */ "./src/blocks/container/script.js");
/* harmony import */ var _blocks_banner_script__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./blocks/banner/script */ "./src/blocks/banner/script.js");
/* harmony import */ var _blocks_post_types_script__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./blocks/post-types/script */ "./src/blocks/post-types/script.js");
//
// Stylesheets
//


//
// Control scripts
//


//
// Block scripts
//












// import './blocks/tab-slider/script';
})();

(window.wp = window.wp || {})["gutenbee.scripts"] = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=gutenbee.scripts.js.map