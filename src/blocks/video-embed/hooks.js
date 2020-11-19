import { onYouTubeAPIReady, onVimeoAPIReady } from './util';
import { useEffect } from 'wp.element';

const createYouTubeApiScript = () => {
  const tag = document.createElement('script');
  tag.id = 'youtube-api-script';
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

const createVimeoApiScript = () => {
  const tag = document.createElement('script');
  tag.id = 'vimeo-api-script';
  tag.src = 'https://player.vimeo.com/api/player.js';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

const useVideoEmbed = (videoEmbedRef, videoInfo) => {
  useEffect(
    () => {
      if (!videoEmbedRef) {
        return;
      }

      if (videoInfo.provider === 'youtube' && videoInfo.id) {
        if (!document.getElementById('youtube-api-script')) {
          createYouTubeApiScript();
        }
        onYouTubeAPIReady(videoEmbedRef);
      }

      if (videoInfo.provider === 'vimeo' && videoInfo.id) {
        if (!document.getElementById('vimeo-api-script')) {
          createVimeoApiScript();
        }
        onVimeoAPIReady(videoEmbedRef);
      }
    },
    [videoEmbedRef],
  );
};

export { useVideoEmbed };
