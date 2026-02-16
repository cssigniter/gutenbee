/**
 * Deprecated v4 - Handles blocks saved with the old ensureValueUnit bug.
 */
import classNames from 'classnames';
import { RichText, useBlockProps } from 'wp.blockEditor';

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
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../components/controls/animation-controls/helpers';

const OldProgressBarStyle = ({ attributes }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    titleFontSize,
    innerTitleFontSize,
    height,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <OldStyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-progress-bar.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-progress-bar.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={titleFontSize}
        rule=".wp-block-gutenbee-progress-bar.[root] .wp-block-gutenbee-progress-bar-title { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={innerTitleFontSize}
        rule=".wp-block-gutenbee-progress-bar.[root] .wp-block-gutenbee-progress-bar-inner-title { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={height}
        rule=".wp-block-gutenbee-progress-bar.[root] .wp-block-gutenbee-progress-bar-outer { height: %s; }"
        unit="px"
      />
    </OldStyleSheet>
  );
};

const OldProgressBar = ({ attributes }) => {
  const {
    uniqueId,
    title,
    innerTitle,
    percentage,
    displayPercentage,
    textColor,
    backgroundColor,
    barBackgroundColor,
    titleTextColor,
    progressBackgroundColor,
    titleBottomMargin,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  const blockProps = useBlockProps.save({
    id: blockId,
    className: classNames(
      blockId,
      getBreakpointVisibilityClassNames(blockBreakpointVisibility),
      getAuthVisibilityClasses(blockAuthVisibility),
    ),
    style: {
      backgroundColor: backgroundColor || undefined,
      ...getBorderCSSValue({ attributes }),
      ...getBoxShadowCSSValue({ attributes }),
    },
    ...getAnimationControlDataAttributes(attributes.animation),
  });

  return (
    <div {...blockProps}>
      <OldProgressBarStyle attributes={attributes} />

      {!RichText.isEmpty(title) && (
        <RichText.Content
          tagName="p"
          value={title}
          className="wp-block-gutenbee-progress-bar-title"
          style={{
            color: titleTextColor || undefined,
            marginBottom:
              titleBottomMargin == null ? undefined : `${titleBottomMargin}px`,
          }}
        />
      )}

      <div
        className="wp-block-gutenbee-progress-bar-outer"
        style={{
          backgroundColor: barBackgroundColor || undefined,
        }}
      >
        <div
          className="wp-block-gutenbee-progress-bar-inner"
          style={{
            width: `${percentage}%`,
            backgroundColor: progressBackgroundColor || undefined,
            color: textColor || undefined,
          }}
        >
          {!RichText.isEmpty(innerTitle) && (
            <RichText.Content
              tagName="span"
              value={innerTitle}
              className="wp-block-gutenbee-progress-bar-inner-title"
            />
          )}

          {displayPercentage && (
            <span className="wp-block-gutenbee-progress-bar-percentage">
              {percentage}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const v4 = {
  supports: {
    anchor: false,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    title: {
      source: 'html',
      selector: '.wp-block-gutenbee-progress-bar-title',
    },
    innerTitle: {
      source: 'html',
      selector: '.wp-block-gutenbee-progress-bar-inner-title',
    },
    percentage: {
      type: 'number',
      default: 50,
    },
    height: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    displayPercentage: {
      type: 'boolean',
      default: true,
    },
    textColor: {
      type: 'string',
    },
    barBackgroundColor: {
      type: 'string',
    },
    progressBackgroundColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    titleTextColor: {
      type: 'string',
    },
    titleBottomMargin: {
      type: 'number',
    },
    titleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 16 }),
    },
    innerTitleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 14 }),
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
    ...animationControlAttributes(),
  },
  save: ({ attributes }) => <OldProgressBar attributes={attributes} />,
};

export default v4;
