import { RichText } from 'wp.blockEditor';

import getBlockId from '../../../util/getBlockId';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const VideoStyle = ({ attributes, children }) => {
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
      autoplay,
      caption,
      controls,
      loop,
      muted,
      poster,
      preload,
      src,
      playsInline,
    } = attributes;
    return (
      <figure
        id={getBlockId(uniqueId)}
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

export default v1;
