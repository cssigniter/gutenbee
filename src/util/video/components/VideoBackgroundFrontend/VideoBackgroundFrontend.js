import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  videoInfo: PropTypes.shape({
    id: PropTypes.string,
    provider: PropTypes.string,
  }),
};

const VideoBackgroundFrontEnd = ({ id, className, videoInfo }) => {
  return (
    <div
      className={classNames(className, 'wp-block-gutenbee-video-bg-wrapper')}
      data-video-id={videoInfo?.id}
      data-video-type={videoInfo?.provider}
      data-video-start={videoInfo?.start || undefined}
    >
      {videoInfo.provider === 'self' ? (
        <video
          id={`video-${id}`}
          src={videoInfo.url}
          className="wp-block-gutenbee-video-bg"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div id={`video-${id}`} className="wp-block-gutenbee-video-bg" />
      )}
    </div>
  );
};

VideoBackgroundFrontEnd.propTypes = propTypes;

export default VideoBackgroundFrontEnd;
