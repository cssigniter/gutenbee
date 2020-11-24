import jQuery from 'jquery';

import {
  maybeLoadVimeoApi,
  maybeLoadYouTubeApi,
} from '../../util/video/providers';

jQuery($ => {
  const $window = $(window);

  /* -----------------------------------------
	 Video Backgrounds
	 ----------------------------------------- */
  const $videoBg = $(
    '.wp-block-gutenbee-container .wp-block-gutenbee-video-bg',
  );
  const $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');

  // YouTube videos
  function onYouTubeApiReady($videoBg) {
    const $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    const videoId = $videoBg
      .parents('.wp-block-gutenbee-video-bg-wrapper')
      .data('video-id');
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
  function onVimeoApiReady($videoBg) {
    const $videoWrap = $videoBg.parents('.wp-block-gutenbee-video-bg-wrapper');
    const videoId = $videoBg
      .parents('.wp-block-gutenbee-video-bg-wrapper')
      .data('video-id');

    const player = new window.Vimeo.Player($videoBg, {
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

  let videoResizeTimer;

  $window.on('resize.ciVideo', function() {
    clearTimeout(videoResizeTimer);
    videoResizeTimer = setTimeout(function() {
      $videoWrap.each(function() {
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
      height: isWidthFixed ? ratioWidth : containerHeight,
    };
  }

  function adjustVideoSize($videoWrap) {
    const size = getVideoSize($videoWrap);

    $videoWrap.find('iframe, video').css({
      width: size.width + 'px',
      height: size.height + 'px',
    });
  }

  if ($videoBg.length && window.innerWidth > 1080) {
    $videoBg.each(async function() {
      const $this = $(this);
      const videoType = $this
        .parents('.wp-block-gutenbee-video-bg-wrapper')
        .data('video-type');

      if (videoType === 'youtube') {
        await maybeLoadYouTubeApi();
        onYouTubeApiReady($this);
      } else if (videoType === 'vimeo') {
        await maybeLoadVimeoApi();
        onVimeoApiReady($this);
      } else if (videoType === 'self') {
        $videoWrap.addClass('visible');
        adjustVideoSize($videoWrap);
      }
    });
  }
});
