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
 * @param {HTMLElement} videoElement The element which will host the video embed.
 */
export const onVimeoApiReady = videoElement => {
  const dataset = videoElement.dataset;

  new window.Vimeo.Player(videoElement, {
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
