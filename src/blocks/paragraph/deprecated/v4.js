/**
 * Deprecated v4 - Handles blocks saved with the old ensureValueUnit bug.
 */
import { Fragment } from 'wp.element';
import { RichText, getColorClassName, useBlockProps } from 'wp.blockEditor';
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

const OldParagraphStyle = ({ attributes, children }) => {
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
        rule=".wp-block-gutenbee-paragraph.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-paragraph.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={fontSize}
        rule=".wp-block-gutenbee-paragraph.[root] { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={lineHeight}
        rule=".wp-block-gutenbee-paragraph.[root] { line-height: %s; }"
        unit=""
      />
      <Rule
        value={letterSpacing}
        rule=".wp-block-gutenbee-paragraph.[root] { letter-spacing: %s; }"
        unit=""
      />
      <Rule
        value={textTransform}
        rule=".wp-block-gutenbee-paragraph.[root] { text-transform: %s; }"
        unit=""
      />
      <Rule
        value={textDecoration}
        rule=".wp-block-gutenbee-paragraph.[root] { text-decoration: %s; }"
        unit=""
      />
      <Rule
        value={align}
        rule=".wp-block-gutenbee-paragraph.[root] { text-align: %s; }"
        unit=""
      />

      {children}
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
      selector: 'p',
      default: '',
    },
    dropCap: {
      type: 'boolean',
      default: false,
    },
    placeholder: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    customBackgroundColor: {
      type: 'string',
    },
    ...typographyControlAttributes(),
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
      dropCap,
      backgroundColor,
      textColor,
      customBackgroundColor,
      customTextColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    const textClass = getColorClassName('color', textColor);
    const backgroundClass = getColorClassName(
      'background-color',
      backgroundColor,
    );

    const blockProps = useBlockProps.save({
      id: blockId,
      className: classNames(
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
        {
          'has-text-color': textColor || customTextColor,
          'has-drop-cap': dropCap,
          [textClass]: textClass,
          [backgroundClass]: backgroundClass,
        },
      ),
      style: {
        backgroundColor: backgroundClass ? undefined : customBackgroundColor,
        color: textClass ? undefined : customTextColor,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      },
      ...getAnimationControlDataAttributes(attributes.animation),
    });

    return (
      <Fragment>
        <RichText.Content {...blockProps} tagName="p" value={content} />
        <OldParagraphStyle attributes={attributes} />
      </Fragment>
    );
  },
};

export default v4;
