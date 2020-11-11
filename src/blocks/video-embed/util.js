/**
 * Returns the Vimeo video ID based on the URL provided.
 *
 * @param {string} url Vimeo video URL.
 *
 * @return {string} The video ID.
 */
const GetVimeoIDbyUrl = url => {
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

const ytPattern = [
  /^https?:\/\/((m|www)\.)?youtube\.com\/.+/i,
  /^https?:\/\/youtu\.be\/.+/i,
];

const vimeoPattern = [/^https?:\/\/(www\.)?vimeo\.com\/.+/i];

/**
 * Returns the video info based on the video URL provided.
 *
 * @param {string} url The video URL.
 * @param {array} patterns An array of URL patterns to match.
 *
 * @return {boolean} Whether a pattern was matched.
 */
const matchesPatterns = (url, patterns = []) =>
  patterns.some(pattern => url.match(pattern));

/**
 * Returns the video info based on the video URL provided.
 *
 * @param {string} url The video URL.
 *
 * @return {Object<string,string|undefined>} Video provider and id if available.
 */
const getVideoInfo = url => {
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
  } else if (url) {
    return {
      provider: 'unsupported',
    };
  }
};

/**
 * Translates true/false string values to 1 or 0.
 *
 * @param {string} attr The value of an attribute.
 *
 * @return {number} 1 or 0.
 */
const attrState = attr => {
  return attr === 'true' ? 1 : 0;
};

/**
 * Creates the YouTube video embed.
 *
 * @param {Object} videoEmbed The element which will host the video embed.
 *
 */
const onYouTubeAPIReady = videoEmbed => {
  if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
    return setTimeout(onYouTubeAPIReady.bind(null, videoEmbed), 333);
  }

  const dataset = videoEmbed.dataset;
  // eslint-disable-next-line no-unused-vars
  const ytPlayer = new YT.Player(videoEmbed, {
    videoId: dataset.videoId,
    playerVars: {
      autoplay: 0,
      controls: dataset.videoControls ? attrState(dataset.videoControls) : 0,
      showinfo: 0,
      modestbranding: dataset.videoBranding
        ? attrState(dataset.videoBranding)
        : 0,
      loop: dataset.videoLoop ? attrState(dataset.videoLoop) : 0,
      playlist: dataset.videoId,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0,
      mute: dataset.videoMute ? attrState(dataset.videoMute) : 0,
      start: parseInt(dataset.videoStart, 10) || undefined,
      end: parseInt(dataset.videoEnd, 10) || undefined,
    },
    events: {},
  });
};

/**
 * Creates the Vimeo video embed.
 *
 * @param {Object} videoEmbed The element which will host the video embed.
 *
 */
const onVimeoAPIReady = videoEmbed => {
  if (typeof Vimeo === 'undefined' || typeof Vimeo.Player === 'undefined') {
    return setTimeout(onVimeoAPIReady.bind(null, videoEmbed), 333);
  }

  const dataset = videoEmbed.dataset;

  const player = new Vimeo.Player(videoEmbed, {
    id: dataset.videoId,
    loop: dataset.videoLoop ? attrState(dataset.videoLoop) : 0,
    autoplay: 0,
    controls: dataset.videoControls ? attrState(dataset.videoControls) : 0,
    byline: false,
    title: false,
    autopause: false,
    muted: dataset.videoMute ? attrState(dataset.videoMute) : 0,
  });

  if (dataset.videoStart) {
    player.setCurrentTime(dataset.videoStart);
  }
};

export { getVideoInfo, onVimeoAPIReady, onYouTubeAPIReady };
