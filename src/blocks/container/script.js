import jQuery from 'jquery';

jQuery($ => {
  var $window = $(window);

  /* -----------------------------------------
	 Video Backgrounds
	 ----------------------------------------- */
  var $videoBg = $('.wp-block-gutenbee-container-background');
  var $videoWrap = $videoBg.parents('.wp-block-gutenbee-container');

  // YouTube videos
  function onYouTubeAPIReady($videoBg) {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      return setTimeout(onYouTubeAPIReady.bind(null, $videoBg), 333);
    }

    var videoId = $videoBg
      .parents('.wp-block-gutenbee-container')
      .data('video-id');
    var $video = $videoBg.find('div').get(0);
    // eslint-disable-next-line no-unused-vars
    var ytPlayer = new YT.Player($video, {
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
          if (event.data === YT.PlayerState.PLAYING) {
            $videoWrap.addClass('visible');
            adjustVideoSize();
          }
        },
      },
    });
  }

  // Vimeo videos
  function onVimeoAPIReady($videoBg) {
    if (typeof Vimeo === 'undefined' || typeof Vimeo.Player === 'undefined') {
      return setTimeout(onVimeoAPIReady.bind(null, $videoBg), 333);
    }

    var videoId = $videoBg
      .parents('.wp-block-gutenbee-container')
      .data('video-id');

    var player = new Vimeo.Player($videoBg, {
      id: videoId,
      loop: true,
      autoplay: true,
      byline: false,
      title: false,
      autopause: false,
      muted: true,
    });

    player.setVolume(0);

    // Cuepoints seem to be the best way to determine
    // if the video is actually playing or not
    player.addCuePoint(0.1).catch(function() {
      $videoWrap.addClass('visible');
      adjustVideoSize();
    });

    player.on('cuepoint', function() {
      $videoWrap.addClass('visible');
      adjustVideoSize();
    });
  }

  var videoResizeTimer;

  $window.on('resize.ciVideo', function() {
    clearTimeout(videoResizeTimer);
    videoResizeTimer = setTimeout(function() {
      adjustVideoSize();
    }, 350);
  });

  function getVideoSize() {
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

  function adjustVideoSize() {
    var size = getVideoSize();

    $videoBg.find('iframe').css({
      width: size.width + 'px',
      height: size.height + 'px',
    });
  }

  if ($videoBg.length && window.innerWidth > 1080) {
    $videoBg.each(function() {
      var $this = $(this);
      var firstScript = $('script');
      var videoType = $this
        .parents('.wp-block-gutenbee-container')
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
