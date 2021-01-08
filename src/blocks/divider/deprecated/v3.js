import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  getDefaultBackgroundImageValue,
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';

const DividerStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-divider.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-divider.[root] { padding: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

export const BORDER_STYLES = {
  SOLID: 'solid',
  DOTTED: 'dotted',
  DASHED: 'dashed',
  DOUBLE: 'double',
};

export const Divider = ({ className, attributes, ...props }) => {
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
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={classNames(
        className,
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
        {
          [`align-${align}`]: true,
        },
      )}
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

const v3 = {
  supports: {
    anchor: true,
  },
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
  migrate(attributes) {
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
    };
  },
  save({ className, attributes }) {
    return <Divider className={className} attributes={attributes} />;
  },
};

export default v3;
