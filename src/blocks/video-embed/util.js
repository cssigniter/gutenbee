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
 * @param {HTMLElement} videoElement The element which will host the video embed.
 */
export const onYouTubeApiReady = videoElement => {
  const dataset = videoElement.dataset;

  new window.YT.Player(videoElement, {
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
 * @param {HTMLElement} videoElement The element which will host the video embed.
 */
export const onVimeoApiReady = videoElement => {
  const dataset = videoElement.dataset;

  const player = new window.Vimeo.Player(videoElement, {
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
