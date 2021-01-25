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
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import Rule from '../../../components/stylesheet/Rule';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { SHAPES, VIEWS } from '../../icon/constants';
import StyleSheet from '../../../components/stylesheet';

const IconStyle = ({ id, attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, size } = attributes;
  const blockId = id || getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-icon.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-icon.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={size}
        rule=".gutenbee-icon-block.[root] .gutenbee-icon-block-icon-wrap { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={size}
        rule=".gutenbee-icon-block.[root] svg { width: %s; }"
        unit="px"
      />
      <Rule
        value={size}
        rule=".gutenbee-icon-block.[root] svg { height: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

const IconBoxStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    textFontSize,
    titleFontSize,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-iconbox.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-iconbox.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={textFontSize}
        rule=".wp-block-gutenbee-iconbox.[root] .wp-block-gutenbee-iconbox-text { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={titleFontSize}
        rule=".wp-block-gutenbee-iconbox.[root] .wp-block-gutenbee-iconbox-title { font-size: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

const IconV5 = ({
  id,
  uniqueId,
  className,
  view,
  shape,
  icon,
  size,
  padding,
  borderWidth,
  align,
  colorPrimary,
  colorSecondary,
  blockMargin,
  blockPadding,
  blockBreakpointVisibility,
  blockAuthVisibility,
  ...attributes
}) => {
  const IconComponent = require(`../../icon/svg/${icon}.svg`).default;

  const wrapperClasses = classNames(
    className,
    id,
    getBreakpointVisibilityClassNames(blockBreakpointVisibility),
    getAuthVisibilityClasses(blockAuthVisibility),
    {
      'gutenbee-icon-block': true,
      [`align-${align || 'left'}`]: true,
      [`gutenbee-icon-block-${view}`]: !!view,
      [`gutenbee-icon-block-shape-${shape}`]: !!shape && view !== VIEWS.DEFAULT, // Ignore shape if we are on the default view
    },
  );

  const iconClasses = classNames({
    [`${className}-icon`]: !!className,
  });

  let color = colorPrimary;
  let backgroundColor = 'transparent';
  let borderColor = 'transparent';
  let pad;

  if (view === VIEWS.STACKED) {
    color = colorSecondary;
    backgroundColor = colorPrimary;
    pad = padding;
  }

  if (view === VIEWS.FRAMED) {
    backgroundColor = colorSecondary;
    borderColor = colorPrimary;
    pad = padding;
  }

  return (
    <div id={id} className={wrapperClasses}>
      <IconStyle
        id={id}
        attributes={{ uniqueId, blockMargin, blockPadding, size }}
      />
      <span
        className="gutenbee-icon-block-icon-wrap"
        style={{
          color,
          backgroundColor,
          borderColor,
          width: pad ? `${pad}em` : 'auto',
          height: pad ? `${pad}em` : 'auto',
          borderWidth,
          ...getBoxShadowCSSValue({ attributes, prefix: 'icon' }),
        }}
      >
        <IconComponent
          className={iconClasses}
          preserveAspectRatio="xMidYMid meet"
        />
      </span>
    </div>
  );
};

const iconV5DeprecationAttributes = {
  uniqueId: {
    type: 'string',
  },
  view: {
    type: 'string',
    default: VIEWS.DEFAULT,
  },
  shape: {
    type: 'string',
    default: SHAPES.CIRCLE,
  },
  icon: {
    type: 'string',
    default: 'add-bag',
  },
  size: {
    type: 'object',
    default: getDefaultResponsiveValue({
      desktop: 40,
      tablet: '',
      mobile: '',
    }),
  },
  padding: {
    type: 'number',
    default: 2,
  },
  borderWidth: {
    type: 'number',
    default: 3,
  },
  align: {
    type: 'string',
    default: 'left',
  },
  colorPrimary: {
    type: 'string',
  },
  colorSecondary: {
    type: 'string',
  },
  blockMargin: {
    type: 'object',
    default: getDefaultSpacingValue(),
  },
  blockPadding: {
    type: 'object',
    default: getDefaultSpacingValue(),
  },
  ...boxShadowControlAttributes('icon'),
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
};

const IconBox = ({ className, attributes }) => {
  const {
    uniqueId,
    titleNodeLevel,
    titleContent,
    textContent,
    align,
    contentAlign,
    iconMargin,
    iconPadding,
    titleBottomSpacing,
    titleColor,
    textColor,
    backgroundColor,
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
          [`wp-block-gutenbee-iconbox-align-${align}`]: true,
          [`wp-block-gutenbee-iconbox-content-align-${contentAlign}`]: !!contentAlign,
        },
      )}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
    >
      <IconBoxStyle attributes={attributes} />
      <IconV5
        id={`${blockId}-icon`}
        {...{
          ...attributes,
          blockMargin: iconMargin,
          blockPadding: iconPadding,
        }}
      />
      <div className="wp-block-gutenbee-iconbox-content">
        {!RichText.isEmpty(titleContent) && (
          <RichText.Content
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            className="wp-block-gutenbee-iconbox-title"
            style={{
              color: titleColor || undefined,
              marginBottom:
                titleBottomSpacing != null
                  ? `${titleBottomSpacing}px`
                  : undefined,
            }}
          />
        )}

        {!RichText.isEmpty(textContent) && (
          <RichText.Content
            tagName="p"
            value={textContent}
            className="wp-block-gutenbee-iconbox-text"
            style={{
              color: textColor || undefined,
            }}
          />
        )}
      </div>
    </div>
  );
};

const v5 = {
  supports: {
    anchor: true,
  },
  attributes: {
    ...iconV5DeprecationAttributes,
    uniqueId: {
      type: 'string',
    },
    titleBottomSpacing: {
      type: 'number',
    },
    titleContent: {
      source: 'html',
      selector: 'h1,h2,h3,h4,h5,h6',
      default: '',
    },
    titleNodeLevel: {
      type: 'number',
      default: 3,
    },
    titleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    textContent: {
      source: 'html',
      selector: 'p',
      default: '',
    },
    textFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    align: {
      type: 'string',
      default: 'left',
    },
    contentAlign: {
      type: 'string',
      default: null,
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    iconMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    iconPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    textColor: {
      type: 'string',
    },
    titleColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
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
    return attributes;
  },
  save({ className, attributes }) {
    return <IconBox className={className} attributes={attributes} />;
  },
};

export default v5;
