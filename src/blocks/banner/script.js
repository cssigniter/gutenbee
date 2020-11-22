import jQuery from 'jquery';

jQuery($ => {
  var $window = $(window);

  /* -----------------------------------------
	 Video Backgrounds
	 ----------------------------------------- */
  var $videoBg = $('.wp-block-gutenbee-banner .wp-block-gutenbee-video-bg');
  var $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');

  // YouTube videos
  function onYouTubeAPIReady($videoBg) {
    if (
      typeof window.YT === 'undefined' ||
      typeof window.YT.Player === 'undefined'
    ) {
      return setTimeout(onYouTubeAPIReady.bind(null, $videoBg), 333);
    }

    var $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    var videoId = $videoBg
      .parents('.wp-block-gutenbee-video-bg-wrapper')
      .data('video-id');
    var video = $videoBg.attr('id');
    // eslint-disable-next-line no-unused-vars
    var ytPlayer = new window.YT.Player(video, {
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
      },
      events: {
        onReady: function(event) {
          event.target.mute();
        },
        onStateChange: function(event) {
          if (event.data === window.YT.PlayerState.PLAYING) {
            $videoWrap.addClass('visible');
            adjustVideoSize($videoWrap);
          }
        },
      },
    });
  }

  // Vimeo videos
  function onVimeoAPIReady($videoBg) {
    if (
      typeof Vimeo === 'undefined' ||
      typeof window.Vimeo.Player === 'undefined'
    ) {
      return setTimeout(onVimeoAPIReady.bind(null, $videoBg), 333);
    }

    var $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    var videoId = $videoBg
      .parents('.wp-block-gutenbee-video-bg-wrapper')
      .data('video-id');

    var player = new window.Vimeo.Player($videoBg, {
      id: videoId,
      loop: true,
      autoplay: true,
      byline: false,
      title: false,
      autopause: false,
      muted: true,
    });

    player.setVolume(0);

    player.on('play', function() {
      $videoWrap.addClass('visible');
      adjustVideoSize($videoWrap);
    });
  }

  var videoResizeTimer;

  $window.on('resize.ciVideo', function() {
    clearTimeout(videoResizeTimer);
    videoResizeTimer = setTimeout(function() {
      $videoWrap.each(function() {
        var $this = $(this);
        adjustVideoSize($this);
      });
    }, 350);
  });

  function getVideoSize($videoWrap) {
    var containerWidth = $videoWrap.outerWidth();
    var containerHeight = $videoWrap.outerHeight();
    var aspectRatio = 16 / 9;
    var ratioWidth = containerWidth / aspectRatio;
    var ratioHeight = containerHeight * aspectRatio;
    var isWidthFixed = containerWidth / containerHeight > aspectRatio;

    return {
      width: isWidthFixed ? containerWidth : ratioHeight,
      height: isWidthFixed ? ratioWidth : containerHeight,
    };
  }

  function adjustVideoSize($videoWrap) {
    var size = getVideoSize($videoWrap);

    $videoWrap.find('iframe').css({
      width: size.width + 'px',
      height: size.height + 'px',
    });
  }

  if ($videoBg.length && window.innerWidth > 1080) {
    $videoBg.each(function() {
      var $this = $(this);
      var firstScript = $('script');
      var videoType = $this
        .parents('.wp-block-gutenbee-video-bg-wrapper')
        .data('video-type');

      if (videoType === 'youtube') {
        if (!$('#youtube-api-script').length) {
          var tag = $('<script />', { id: 'youtube-api-script' });
          tag.attr('src', 'https://www.youtube.com/player_api');
          firstScript.parent().prepend(tag);
        }
        onYouTubeAPIReady($this);
      } else if (videoType === 'vimeo') {
        if (!$('#vimeo-api-script').length) {
          var tag = $('<script />', { id: 'vimeo-api-script' });
          tag.attr('src', 'https://player.vimeo.com/api/player.js');
          firstScript.parent().prepend(tag);
        }
        onVimeoAPIReady($this);
      }
    });
  }
});
