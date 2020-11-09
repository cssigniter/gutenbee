import { useState, useCallback } from 'wp.element';
import { useVideoEmbed } from './hooks';

const VideoBackground = ({ videoInfo }) => {
  const [videoEmbedRef, setVideoEmbedRef] = useState(null);

  const onVideoEmbedRef = useCallback(node => {
    if (node !== null) {
      setVideoEmbedRef(node);
    }
  }, []);

  useVideoEmbed(videoEmbedRef, videoInfo);

  return (
    <div className="gutenbee-video-bg-wrapper">
      <div
        className="gutenbee-video-bg"
        data-video-id={videoInfo.id}
        data-video-type={videoInfo.provider}
        ref={onVideoEmbedRef}
      >
        <div />
      </div>
    </div>
  );
};

export default VideoBackground;
