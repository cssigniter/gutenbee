import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import getBlockId from '../../util/getBlockId';
import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import VideoEmbedEdit from './edit';
import VideoEmbedStyle from './style';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import { getVideoInfo } from './util';
import VideoEmbedBlockIcon from './block-icon';

registerBlockType('gutenbee/video-embed', {
  title: __('GutenBee Video Embed'),
  description: __('Embed a video from YouTube or Vimeo.'),
  icon: VideoEmbedBlockIcon,
  category: 'gutenbee',
  keywords: [__('video'), __('movie'), __('embed'), __('YouTube'), __('Vimeo')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    videoUrl: {
      type: 'string',
    },
    lazyLoad: {
      type: 'boolean',
      default: false,
    },
    coverImage: {
      type: 'string',
    },
    startTime: {
      type: 'string',
    },
    endTime: {
      type: 'string',
    },
    controls: {
      type: 'boolean',
      default: true,
    },
    autoplay: {
      type: 'boolean',
      default: false,
    },
    mute: {
      type: 'boolean',
      default: false,
    },
    loop: {
      type: 'boolean',
      default: false,
    },
    branding: {
      type: 'boolean',
      default: true,
    },
    backgroundColor: {
      type: 'string',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  edit: VideoEmbedEdit,
  save: ({ attributes }) => {
    const {
      uniqueId,
      lazyLoad,
      videoUrl,
      coverImage,
      controls,
      autoplay,
      mute,
      loop,
      branding,
      startTime,
      endTime,
      backgroundColor,
    } = attributes;

    const blockId = getBlockId(uniqueId);
    const divStyle = {
      backgroundImage: 'url(' + coverImage + ')',
    };

    if (!videoUrl) {
      return;
    }

    const videoInfo = getVideoInfo(videoUrl);

    return (
      <div
        id={blockId}
        className="gutenbee-video-embed-block-wrapper"
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <div className="gutenbee-video-embed-wrapper">
          <VideoEmbedStyle attributes={attributes} />
          <div
            className="gutenbee-video-embed"
            data-video-lazy={lazyLoad}
            data-video-id={videoInfo.id}
            data-video-controls={controls}
            data-video-autoplay={autoplay}
            data-video-mute={mute}
            data-video-loop={loop}
            data-video-branding={branding}
            data-video-start={startTime}
            data-video-end={endTime}
            data-video-type={videoInfo.provider}
          >
            <div id={`video-${blockId}`} />
            <div className="gutenbee-spinner" />
          </div>
          {coverImage && (
            <div className="gutenbee-video-embed-overlay" style={divStyle}>
              <div />
            </div>
          )}
        </div>
      </div>
    );
  },
});
