import { useState, useEffect, useCallback } from 'wp.element';

import {
  maybeLoadYouTubeApi,
  maybeLoadVimeoApi,
  getVideoProviderInfoByUrl,
} from './providers';

const useVideoEmbed = ({
  url,
  onVideoUrlChange,
  onYouTubeApiReady,
  onVimeoApiReady,
}) => {
  const [ref, setRef] = useState(null);
  const [videoInfo, setVideoInfo] = useState(getVideoProviderInfoByUrl(url));

  /**
   * The video embed's ref callback.
   */
  const videoEmbedRef = useCallback(node => {
    if (node != null) {
      setRef(node);
    }
  }, []);

  /**
   * Handles video embed ref changes / refreshes the video embed on ref change.
   *
   * @returns {Promise<void>}
   */
  const onVideoEmbedRefChange = async () => {
    if (!ref) {
      return;
    }

    if (videoInfo.provider === 'youtube' && videoInfo.id && onYouTubeApiReady) {
      await maybeLoadYouTubeApi();
      onYouTubeApiReady(ref);
    }

    if (videoInfo.provider === 'vimeo' && videoInfo.id && onVimeoApiReady) {
      await maybeLoadVimeoApi();
      onVimeoApiReady(ref);
    }
  };

  /**
   * Handles the video URL changes.
   *
   * @param {string} newUrl The new video URL.
   */
  const handleVideoUrlChange = newUrl => {
    setVideoInfo(getVideoProviderInfoByUrl(newUrl));
    onVideoUrlChange?.(newUrl);
  };

  useEffect(
    () => {
      onVideoEmbedRefChange();
    },
    [ref],
  );

  return {
    videoInfo,
    handleVideoUrlChange,
    videoEmbedRef,
  };
};

export { useVideoEmbed };
