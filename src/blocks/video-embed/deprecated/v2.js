import classNames from 'classnames';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { getVideoProviderInfoByUrl } from '../../../util/video/providers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import VideoEmbedStyle from '../style';

const v2 = {
  supports: {
    anchor: true,
  },
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
    sticky: {
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
    blockBreakpointVisibility: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: false,
        tablet: false,
        mobile: false,
      }),
    },
    blockAuthVisibility: {
      type: 'object',
      default: {
        loggedIn: false,
        loggedOut: false,
      },
    },
  },
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      lazyLoad,
      videoUrl,
      coverImage,
      controls,
      autoplay,
      mute,
      loop,
      sticky,
      branding,
      startTime,
      endTime,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    if (!videoUrl) {
      return null;
    }

    const videoInfo = getVideoProviderInfoByUrl(videoUrl);

    return (
      <div
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
          'gutenbee-video-embed-block-wrapper',
          sticky && 'wp-block-gutenbee-video-embed-sticky',
        )}
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

export default v2;
