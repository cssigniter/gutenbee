import {
  getDefaultBackgroundImageValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const BORDER_STYLES = {
  SOLID: 'solid',
  DOTTED: 'dotted',
  DASHED: 'dashed',
  DOUBLE: 'double',
};

const DividerStyle = ({ attributes, children }) => {
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

const Divider = ({ className, attributes, ...props }) => {
  const {
    height,
    style,
    weight,
    width,
    align,
    color,
    uniqueId,
    backgroundColor,
    backgroundImage,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <div
      className={`${className} align-${align}`}
      id={blockId}
      style={{
        height,
        backgroundColor: backgroundColor || undefined,
        ...getBackgroundImageStyle(backgroundImage),
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
      {...props}
    >
      <DividerStyle attributes={attributes} />
      <div
        className="wp-block-gutenbee-divider-inner"
        style={{
          borderTopStyle: style,
          borderTopWidth: weight,
          borderTopColor: color,
          width: `${width}%`,
        }}
      />
    </div>
  );
};

const v2 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    style: {
      type: 'string',
      default: BORDER_STYLES.SOLID,
    },
    weight: {
      type: 'number',
      default: 1,
    },
    width: {
      type: 'number',
      default: 100,
    },
    height: {
      type: 'number',
      default: 10,
    },
    align: {
      type: 'string',
      default: 'center',
    },
    color: {
      type: 'string',
      default: '#000000',
    },
    backgroundColor: {
      type: 'string',
    },
    backgroundImage: {
      type: 'object',
      default: getDefaultBackgroundImageValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  migrate: attributes => {
    return {
      ...attributes,
      backgroundImage: {
        desktop: {
          url: attributes.backgroundImage.url,
          repeat: attributes.backgroundImage.repeat,
          size: attributes.backgroundImage.size,
          position: attributes.backgroundImage.position,
          attachment: attributes.backgroundImage.attachment,
        },
        tablet: {
          url: '',
          repeat: 'no-repeat',
          size: 'cover',
          position: 'top center',
          attachment: 'scroll',
        },
        mobile: {
          url: '',
          repeat: 'no-repeat',
          size: 'cover',
          position: 'top center',
          attachment: 'scroll',
        },
      },
      backgroundImageEffects: {
        zoom: attributes.backgroundImage?.zoom ?? false,
        parallax: attributes.backgroundImage?.parallax ?? false,
        parallaxSpeed: attributes.backgroundImage?.parallaxSpeed ?? 0.3,
      },
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
  save({ className, attributes }) {
    return <Divider className={className} attributes={attributes} />;
  },
};

export default v2;
