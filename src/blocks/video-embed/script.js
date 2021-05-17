import jQuery from 'jquery';

import {
  maybeLoadVimeoApi,
  maybeLoadYouTubeApi,
} from '../../util/video/providers';

jQuery($ => {
  const $videoEmbed = $('.gutenbee-video-embed');
  const $videoWrap = $videoEmbed.parents('.gutenbee-video-embed-wrapper');

  const attrState = attr => {
    return 'true' === attr ? 1 : 0;
  };

  // YouTube videos
  const onYouTubeApiReady = videoEmbed => {
    const $dataset = videoEmbed[0].dataset;
    const $video = $(videoEmbed)
      .find('div')
      .get(0);
    const $overlay = $(videoEmbed).siblings('.gutenbee-video-embed-overlay');

    // eslint-disable-next-line no-unused-vars
    const ytPlayer = new window.YT.Player($video, {
      videoId: $dataset.videoId,
      playerVars: {
        autoplay: $dataset.videoAutoplay
          ? attrState($dataset.videoAutoplay)
          : 0,
        controls: $dataset.videoControls
          ? attrState($dataset.videoControls)
          : 0,
        showinfo: 0,
        modestbranding: $dataset.videoBranding
          ? attrState($dataset.videoBranding)
          : 0,
        loop: $dataset.videoLoop ? attrState($dataset.videoLoop) : 0,
        playlist: $dataset.videoId,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 0,
        mute: $dataset.videoMute ? attrState($dataset.videoMute) : 0,
        start: parseInt($dataset.videoStart, 10) || undefined,
        end: parseInt($dataset.videoEnd, 10) || undefined,
      },
      events: {
        onReady: event => {
          if ('true' === $dataset.videoAutoplay) {
            event.target.playVideo();
          }

          if ('true' === $dataset.videoAutoplay && $overlay.length) {
            $overlay.fadeOut();
          } else if (
            'false' === $dataset.videoAutoplay &&
            $overlay.length &&
            'true' === $dataset.videoLazy
          ) {
            $overlay.fadeOut;
            ytPlayer.playVideo();
          } else if ('false' === $dataset.videoAutoplay && $overlay.length) {
            $overlay.on('click', function() {
              $overlay
                .find('div')
                .addClass('gutenbee-spinner')
                .removeClass('play-button');
              ytPlayer.playVideo();
            });
          }
        },
        onStateChange: event => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            $overlay.fadeOut();
          }
        },
      },
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
      muted: $dataset.videoMute ? attrState($dataset.videoMute) : 0,
    });

    if ($dataset.videoStart) {
      player.setCurrentTime($dataset.videoStart);
    }

    player.on('loaded', function() {
      if ('true' === $dataset.videoAutoplay && $overlay.length) {
        $overlay.fadeOut();
      } else if (
        'false' === $dataset.videoAutoplay &&
        $overlay.length &&
        'true' === $dataset.videoLazy
      ) {
        player.play();
        player.on('play', function() {
          $overlay.fadeOut();
        });
      } else if ('false' === $dataset.videoAutoplay && $overlay.length) {
        $overlay.on('click', function() {
          $overlay
            .find('div')
            .addClass('gutenbee-spinner')
            .removeClass('play-button');
          player.play();
          player.on('play', function() {
            $overlay.fadeOut();
          });
        });
      }
    });
  };

  const createEmbed = async (firstScript, videoType, videoEmbed) => {
    if (videoType === 'youtube') {
      await maybeLoadYouTubeApi();
      onYouTubeApiReady(videoEmbed);
    }

    if (videoType === 'vimeo') {
      await maybeLoadVimeoApi();
      onVimeoApiReady(videoEmbed);
    }
  };

  $videoWrap.on('click', function() {
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

  $videoEmbed.each(function() {
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
    $window.on('scroll', function() {
      var windowScrollTop = $window.scrollTop();
      var videoBottom = videoWrapHeight + $stickyWrap.offset().top;

      if (windowScrollTop > videoBottom + offset) {
        if (
          !$stickyVideoWrap.hasClass('closed') &&
          !$stickyVideoWrap.hasClass('stuck')
        ) {
          $stickyWrap.height(videoWrapHeight);
          $stickyVideoWrap.addClass('stuck');
          $stickyVideoWrap.append('<span class="close">×</span>');
          var $close = $($stickyVideoWrap).find('.close');
          $close.on('click', function() {
            var $videoId = $(this)
              .siblings('.gutenbee-video-embed')
              .find('iframe')
              .attr('id');
            document
              .getElementById($videoId)
              .contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                '*',
              );
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
