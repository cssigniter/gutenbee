/**
 * Returns the Vimeo video ID based on the URL provided.
 *
 * @param {string} url Vimeo video URL.
 *
 * @return {string} The video ID.
 */
export const GetVimeoIDbyUrl = url => {
  var id = false;
  var request = new XMLHttpRequest();
  request.open('GET', 'https://vimeo.com/api/oembed.json?url=' + url, false);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var response = JSON.parse(request.responseText);
      if (response.video_id) {
        id = response.video_id;
      }
    }
  };
  request.send();
  return id;
};

export const ytPattern = [
  /^https?:\/\/((m|www)\.)?youtube\.com\/.+/i,
  /^https?:\/\/youtu\.be\/.+/i,
];

export const vimeoPattern = [/^https?:\/\/(www\.)?vimeo\.com\/.+/i];

/**
 * Returns the video info based on the video URL provided.
 *
 * @param {string} url The video URL.
 * @param {array} patterns An array of URL patterns to match.
 *
 * @return {boolean} Whether a pattern was matched.
 */
export const matchesPatterns = (url, patterns = []) =>
  patterns.some(pattern => url.match(pattern));

/**
 * Returns the video info based on the video URL provided.
 *
 * @param {string} url The video URL.
 *
 * @return {Object<string,string|undefined>} Video provider and id if available.
 */
export const getVideoInfo = url => {
  if (matchesPatterns(url, ytPattern)) {
    return {
      provider: 'youtube',
      id: url.split('v=').pop(),
    };
  } else if (matchesPatterns(url, vimeoPattern)) {
    return {
      provider: 'vimeo',
      id: GetVimeoIDbyUrl(url),
    };
  } else {
    return {
      provider: 'unsupported',
      id: undefined,
    };
  }
};

/**
 * Creates the YouTube video embed.
 *
 * @param {Object} videoEmbed The element which will host the video embed.
 *
 */
export const onYouTubeAPIReady = videoEmbed => {
  if (typeof YT === 'undefined' || typeof window.YT.Player === 'undefined') {
    return setTimeout(onYouTubeAPIReady.bind(null, videoEmbed), 333);
  }

  const dataset = videoEmbed.dataset;
  new window.YT.Player(videoEmbed, {
    videoId: dataset.videoId,
    playerVars: {
      autoplay: 0,
      controls: 0,
      showinfo: 0,
      modestbranding: 0,
      loop: 0,
      playlist: dataset.videoId,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0,
      mute: 1,
      start: parseInt(dataset.videoStart, 10) || undefined,
      end: parseInt(dataset.videoEnd, 10) || undefined,
    },
  });
};

/**
 * Creates the Vimeo video embed.
 *
 * @param {Object} videoEmbed The element which will host the video embed.
 *
 */
export const onVimeoAPIReady = videoEmbed => {
  if (
    typeof Vimeo === 'undefined' ||
    typeof window.Vimeo.Player === 'undefined'
  ) {
    return setTimeout(onVimeoAPIReady.bind(null, videoEmbed), 333);
  }

  const dataset = videoEmbed.dataset;

  new window.Vimeo.Player(videoEmbed, {
    id: dataset.videoId,
    loop: 0,
    autoplay: 0,
    controls: 0,
    byline: false,
    title: false,
    autopause: false,
    muted: 1,
  });
};
