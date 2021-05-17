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
export const getVideoProviderInfoByUrl = (url = '') => {
  if (!url) {
    return null;
  }

  if (matchesPatterns(url, youTubeUrlPatterns)) {
    return {
      id: getYouTubeIdByUrl(url),
      provider: 'youtube',
      url,
      start: getYouTubeStartTimeFromUrl(url),
    };
  }

  if (matchesPatterns(url, vimeoUrlPatterns)) {
    return {
      id: getVimeoIdByUrl(url),
      provider: 'vimeo',
      url,
      start: getVimeoStartTimeFromUrl(url),
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
