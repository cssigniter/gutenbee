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
export const maybeLoadYouTubeApi = () => {
  if (
    !document.getElementById('gutenbee-youtube-api-script') &&
    !youTubeApiLoaded()
  ) {
    const tag = document.createElement('script');
    tag.id = 'gutenbee-youtube-api-script';
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  const apiLoaded = resolve => {
    if (!youTubeApiLoaded()) {
      setTimeout(() => apiLoaded(resolve), 333);
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
export const maybeLoadVimeoApi = async () => {
  if (
    !document.getElementById('gutenbee-vimeo-api-script') &&
    !vimeoApiLoaded()
  ) {
    const tag = document.createElement('script');
    tag.id = 'gutenbee-vimeo-api-script';
    tag.src = 'https://player.vimeo.com/api/player.js';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  const apiLoaded = resolve => {
    if (!vimeoApiLoaded()) {
      setTimeout(() => apiLoaded(resolve), 333);
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
const matchesPatterns = (str, patterns = []) =>
  patterns.some(pattern => str.match(pattern));

/**
 * YouTube URL patterns.
 *
 * @type {RegExp[]}
 */
const youTubeUrlPatterns = [
  /^https?:\/\/((m|www)\.)?youtube\.com\/.+/i,
  /^https?:\/\/youtu\.be\/.+/i,
];

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
const selfHostedVideoUrlPatterns = [
  /([a-zA-Z0-9\s_\\.\-\(\):])+(.webm|.mkv|.avi|.mov|.mp4|.ogg)/i,
];

/**
 * Returns the Vimeo video ID based on the URL provided.
 *
 * @param {string} url The YouTube video URL.
 * @returns {string}
 */
const getYouTubeIdByUrl = url => {
  return url.split('v=').pop();
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

  request.onload = function() {
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
 * Takes in a URL and returns the matched provider's info (if any).
 *
 * @param {string} url The URL.
 * @returns {{provider: string, id: string}|null|{provider: string, id: null}}
 */
export const getVideoProviderInfoByUrl = (url = '') => {
  if (!url) {
    return null;
  }

  if (matchesPatterns(url, youTubeUrlPatterns)) {
    return {
      id: getYouTubeIdByUrl(url),
      provider: 'youtube',
      url,
    };
  }

  if (matchesPatterns(url, vimeoUrlPatterns)) {
    return {
      id: getVimeoIdByUrl(url),
      provider: 'vimeo',
      url,
    };
  }

  if (matchesPatterns(url, selfHostedVideoUrlPatterns)) {
    return {
      id: url,
      provider: 'self',
      url,
    };
  }

  return {
    id: null,
    provider: 'unsupported',
  };
};
