import { useRef } from 'wp.element';
import PropTypes from 'prop-types';

import useComponentSize from '../../../useComponentSize';

const propTypes = {
  videoInfo: PropTypes.shape({
    id: PropTypes.string,
    provider: PropTypes.string.isRequired,
  }),
  videoEmbedRef: PropTypes.func,
};

const VideoBackgroundEditor = ({ videoInfo, videoEmbedRef }) => {
  const videoBgWrapperRef = useRef();

  const { width, height } = useComponentSize(videoBgWrapperRef);
  const aspectRatio = 16 / 9;
  const ratioWidth = width / aspectRatio;
  const ratioHeight = height * aspectRatio;
  const isWidthFixed = width / height > aspectRatio;
  const videoWidth = isWidthFixed ? width : ratioHeight;
  const videoHeight = isWidthFixed ? ratioWidth : height;

  return (
    <div className="wp-block-gutenbee-video-bg-wrapper" ref={videoBgWrapperRef}>
      <div
        className="gutenbee-video-bg-inner-wrapper"
        style={{
          width: `${videoWidth}px`,
          height: `${videoHeight}px`,
        }}
      >
        <video
          className="gutenbee-video-bg"
          src={videoInfo.url}
          loop
          muted
          playsInline
          style={{
            display: videoInfo?.provider === 'self' ? 'block' : 'none',
          }}
        />
        <div
          className="gutenbee-video-bg"
          data-video-id={videoInfo.id}
          data-video-type={videoInfo.provider}
          data-video-start={videoInfo.start}
          ref={videoEmbedRef}
          style={{
            width: `${videoWidth}px`,
            height: `${videoHeight}px`,
            display:
              !!videoInfo?.provider &&
              videoInfo.provider !== 'self' &&
              videoInfo.provider !== 'unsupported'
                ? 'block'
                : 'none',
          }}
        />
        <div />
      </div>
    </div>
  );
};

VideoBackgroundEditor.propTypes = propTypes;

export default VideoBackgroundEditor;
