import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';

import getBlockId from '../../../util/getBlockId';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import formatNumber from '../../../util/formatNumber';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';

const CountupStyle = ({ attributes, children }) => {
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
        rule=".wp-block-gutenbee-countup.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-countup.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={textFontSize}
        rule=".wp-block-gutenbee-countup.[root] .wp-block-gutenbee-countup-number { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={titleFontSize}
        rule=".wp-block-gutenbee-countup.[root] .wp-block-gutenbee-countup-title { font-size: %s; }"
        unit="px"
      />

      {children}
    </StyleSheet>
  );
};

const Countup = ({
  startNumber,
  endNumber,
  animationDuration,
  separator,
  textColor,
  prefix,
  suffix,
  className,
}) => {
  return (
    <span
      className={className}
      style={{
        color: textColor ? textColor : undefined,
      }}
      data-start={startNumber}
      data-end={endNumber}
      data-animation-duration={animationDuration}
      data-separator={separator}
      data-prefix={prefix}
      data-suffix={suffix}
    >
      {formatNumber(startNumber, separator, prefix, suffix)}
    </span>
  );
};

const CountupRender = ({ attributes, className }) => {
  const {
    titleContent,
    align,
    titleColor,
    backgroundColor,
    titleTopMargin,
    uniqueId,
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
          [`wp-block-gutenbee-countup-align-${align}`]: !!align,
        },
      )}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
    >
      <CountupStyle attributes={attributes} />

      <Countup {...attributes} className="wp-block-gutenbee-countup-number" />

      {!RichText.isEmpty(titleContent) && (
        <RichText.Content
          tagName="p"
          value={titleContent}
          className="wp-block-gutenbee-countup-title"
          style={{
            color: titleColor || undefined,
            marginTop:
              titleTopMargin != null ? `${titleTopMargin}px` : undefined,
          }}
        />
      )}
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
    startNumber: {
      type: 'string',
      default: '0',
    },
    endNumber: {
      type: 'string',
      default: '999',
    },
    animationDuration: {
      type: 'number',
      default: 2.5,
    },
    separator: {
      type: 'string',
      default: ',',
    },
    prefix: {
      type: 'string',
    },
    suffix: {
      type: 'string',
    },
    textFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 16 }),
    },
    titleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 16 }),
    },
    titleContent: {
      source: 'html',
      selector: 'p',
    },
    align: {
      type: 'string',
      default: 'left',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    titleTopMargin: {
      type: 'number',
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
  migrate: attributes => {
    return {
      ...attributes,
      inViewport: false,
    };
  },
  save({ attributes, className }) {
    return <CountupRender attributes={attributes} className={className} />;
  },
};

export default v3;
