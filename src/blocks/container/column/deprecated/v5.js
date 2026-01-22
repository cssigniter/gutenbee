/**
 * Column block deprecated V5
 */
import classNames from 'classnames';
import { InnerBlocks } from 'wp.blockEditor';

import { getDefaultResponsiveBackgroundImageValue } from '../../../../components/controls/background-controls/helpers';
import Rule from '../../../../components/stylesheet/Rule';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../../../components/controls/border-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../../components/controls/animation-controls/helpers';
import getBlockId from '../../../../util/getBlockId';
import StyleSheet from '../../../../components/stylesheet';

const ColumnStyle = ({ attributes, children }) => {
  const { blockPadding, blockMargin, uniqueId } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-column.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-column.[root] > .wp-block-gutenbee-column-content { padding: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

const v5 = {
  attributes: {
    uniqueId: {
      type: 'string',
      default: '',
    },
    width: {
      type: 'object',
      default: {
        desktop: '',
        tablet: 100,
        mobile: 100,
      },
    },
    columnHeight: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    textColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    backgroundImage: {
      type: 'object',
      default: getDefaultResponsiveBackgroundImageValue(),
    },
    backgroundImageEffects: {
      type: 'object',
      default: {
        zoom: false,
        parallax: false,
        parallaxSpeed: 0.3,
      },
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    verticalContentAlignment: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    horizontalContentAlignment: {
      type: 'object',
      default: getDefaultResponsiveValue(),
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
    ...animationControlAttributes(),
  },
  save({ attributes, className }) {
    const {
      width,
      uniqueId,
      textColor,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    return (
      <div
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
          {
            'wp-block-gutenbee-column': true,
          },
        )}
        {...getAnimationControlDataAttributes(attributes.animation)}
      >
        <ColumnStyle attributes={attributes}>
          <Rule
            value={width}
            rule=".wp-block-gutenbee-column.[root] { flex-basis: %s; }"
            unit="%"
          />
        </ColumnStyle>

        <div
          className="wp-block-gutenbee-column-content"
          style={{
            color: textColor,
            backgroundColor,
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
        >
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
};

export default v5;
