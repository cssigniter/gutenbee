/**
 * Deprecated v4 - Handles blocks saved with the old ensureValueUnit bug.
 */
import { Fragment } from 'wp.element';
import { RichText, useBlockProps } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import OldStyleSheet from '../../../components/stylesheet/OldStyleSheet';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import typographyControlAttributes from '../../../components/controls/text-controls/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../components/controls/animation-controls/helpers';

const OldHeadingStyle = ({ attributes }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    fontSize,
    lineHeight,
    letterSpacing,
    textTransform,
    textDecoration,
    align,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <OldStyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-heading.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-heading.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={fontSize}
        rule=".wp-block-gutenbee-heading.[root] { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={lineHeight}
        rule=".wp-block-gutenbee-heading.[root] { line-height: %s; }"
        unit=""
      />
      <Rule
        value={letterSpacing}
        rule=".wp-block-gutenbee-heading.[root] { letter-spacing: %s; }"
        unit=""
      />
      <Rule
        value={textTransform}
        rule=".wp-block-gutenbee-heading.[root] { text-transform: %s; }"
        unit=""
      />
      <Rule
        value={textDecoration}
        rule=".wp-block-gutenbee-heading.[root] { text-decoration: %s; }"
        unit=""
      />
      <Rule
        value={align}
        rule=".wp-block-gutenbee-heading.[root] { text-align: %s; }"
        unit=""
      />
    </OldStyleSheet>
  );
};

const v4 = {
  supports: {
    className: true,
    anchor: false,
    splitting: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    align: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'h1,h2,h3,h4,h5,h6',
      default: '',
    },
    level: {
      type: 'number',
      default: 2,
    },
    placeholder: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    ...typographyControlAttributes(),
    backgroundColor: {
      type: 'string',
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
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
  save: ({ attributes }) => {
    const {
      uniqueId,
      content,
      level,
      textColor,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;
    const tagName = 'h' + level;

    const blockId = getBlockId(uniqueId);

    const classes = classNames(
      blockId,
      getBreakpointVisibilityClassNames(blockBreakpointVisibility),
      getAuthVisibilityClasses(blockAuthVisibility),
      {
        'has-text-color': !!textColor,
        'has-background-color': !!backgroundColor,
      },
    );

    const blockProps = useBlockProps.save({
      id: blockId,
      className: classes,
      style: {
        color: textColor ? textColor : undefined,
        backgroundColor: backgroundColor ? backgroundColor : undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      },
      ...getAnimationControlDataAttributes(attributes.animation),
    });

    return (
      <Fragment>
        <RichText.Content tagName={tagName} value={content} {...blockProps} />
        <OldHeadingStyle attributes={attributes} />
      </Fragment>
    );
  },
};

export default v4;
