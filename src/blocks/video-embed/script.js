import jQuery from 'jquery';

jQuery($ => {
  const $videoEmbed = $('.gutenbee-video-embed');
  const $videoWrap = $videoEmbed.parents('.gutenbee-video-embed-wrapper');

  const attrState = attr => {
    return 'true' === attr ? 1 : 0;
  };

  // YouTube videos
  const onYouTubeAPIReady = videoEmbed => {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      return setTimeout(onYouTubeAPIReady.bind(null, videoEmbed), 333);
    }

    const $dataset = videoEmbed[0].dataset;
    const $video = $(videoEmbed)
      .find('div')
      .get(0);
    const $overlay = $(videoEmbed).siblings('.gutenbee-video-embed-overlay');

    // eslint-disable-next-line no-unused-vars
    const ytPlayer = new YT.Player($video, {
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
        onReady: () => {
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
          if (event.data === YT.PlayerState.PLAYING) {
            $overlay.fadeOut();
          }
        },
      },
    });
  };

  // Vimeo videos
  const onVimeoAPIReady = videoEmbed => {
    if (typeof Vimeo === 'undefined' || typeof Vimeo.Player === 'undefined') {
      return setTimeout(onVimeoAPIReady.bind(null, videoEmbed), 333);
    }

    const $dataset = videoEmbed[0].dataset;
    const $overlay = $(videoEmbed).siblings('.gutenbee-video-embed-overlay');

    const player = new Vimeo.Player(videoEmbed, {
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

  const createEmbed = (firstScript, videoType, videoEmbed) => {
    if (videoType === 'youtube') {
      if (!$('#youtube-api-script').length) {
        const tag = $('<script />', { id: 'youtube-api-script' });
        tag.attr('src', 'https://www.youtube.com/player_api');
        firstScript.parent().prepend(tag);
      }
      onYouTubeAPIReady(videoEmbed);
    } else if (videoType === 'vimeo') {
      if (!$('#vimeo-api-script').length) {
        const tag = $('<script />', { id: 'vimeo-api-script' });
        tag.attr('src', 'https://player.vimeo.com/api/player.js');
        firstScript.parent().prepend(tag);
      }
      onVimeoAPIReady(videoEmbed);
    }
  };

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
});
