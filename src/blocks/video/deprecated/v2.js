import { RichText } from 'wp.blockEditor';
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
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import VideoStyle from '../style';

const v2 = {
  supports: {
    anchor: true,
    align: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    autoplay: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'autoplay',
    },
    caption: {
      type: 'string',
      source: 'html',
      selector: 'figcaption',
    },
    controls: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'controls',
      default: true,
    },
    id: {
      type: 'number',
    },
    loop: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'loop',
    },
    muted: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'muted',
    },
    poster: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'poster',
    },
    preload: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'preload',
      default: 'metadata',
    },
    src: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'src',
    },
    playsInline: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'playsinline',
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
      autoplay,
      caption,
      controls,
      loop,
      muted,
      poster,
      preload,
      src,
      playsInline,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <figure
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
        )}
        style={{
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <VideoStyle attributes={attributes} />
        {src && (
          <video
            autoPlay={autoplay}
            controls={controls}
            loop={loop}
            muted={muted}
            poster={poster}
            preload={preload !== 'metadata' ? preload : undefined}
            src={src}
            playsInline={playsInline}
          />
        )}
        {!RichText.isEmpty(caption) && (
          <RichText.Content tagName="figcaption" value={caption} />
        )}
      </figure>
    );
  },
};

export default v2;
