import { useState, useCallback, useRef } from 'wp.element';
import { useVideoEmbed } from './hooks';
import useComponentSize from '../../util/useComponentSize';

const VideoBackground = ({ videoInfo }) => {
  const [videoEmbedRef, setVideoEmbedRef] = useState(null);

  const onVideoEmbedRef = useCallback(node => {
    if (node !== null) {
      setVideoEmbedRef(node);
    }
  }, []);

  useVideoEmbed(videoEmbedRef, videoInfo);

  const videoBgWrapperRef = useRef();

  const { width, height } = useComponentSize(videoBgWrapperRef);
  var aspectRatio = 16 / 9;
  var ratioWidth = width / aspectRatio;
  var ratioHeight = height * aspectRatio;
  var isWidthFixed = width / height > aspectRatio;
  var videoWidth = isWidthFixed ? width : ratioHeight;
  var videoHeight = isWidthFixed ? ratioWidth : height;

  return (
    <div className="gutenbee-video-bg-wrapper" ref={videoBgWrapperRef}>
      <div
        className="gutenbee-video-bg-inner-wrapper"
        style={{
          width: `${videoWidth}px`,
          height: `${videoHeight}px`,
        }}
      >
        <div
          className="gutenbee-video-bg"
          data-video-id={videoInfo.id}
          data-video-type={videoInfo.provider}
          ref={onVideoEmbedRef}
          style={{
            width: `${videoWidth}px`,
            height: `${videoHeight}px`,
          }}
        />

        <div />
      </div>
    </div>
  );
};

export default VideoBackground;
