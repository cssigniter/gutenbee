import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';
import { getVideoProviderInfoByUrl } from '../../../util/video/providers';

const VideoEmbedStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />

      {children}
    </StyleSheetV1>
  );
};

const v1 = {
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
  migrate: attributes => {
    return {
      ...attributes,
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
    };
  },
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

    if (!videoUrl) {
      return null;
    }

    const videoInfo = getVideoProviderInfoByUrl(videoUrl);

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
            <div
              className="gutenbee-video-embed-overlay"
              style={{ backgroundImage: 'url(' + coverImage + ')' }}
            >
              <div />
            </div>
          )}
        </div>
      </div>
    );
  },
};

export default v1;
