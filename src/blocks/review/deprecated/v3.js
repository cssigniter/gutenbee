/**
 * Deprecated v3 - Handles blocks saved with the old ensureValueUnit bug.
 */
import { InnerBlocks, RichText, useBlockProps } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import OldStyleSheet from '../../../components/stylesheet/OldStyleSheet';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../components/controls/animation-controls/helpers';

const OldReviewStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    scoreSize,
    contentSize,
    barHeight,
    reviewItemFontSize,
    blockPadding,
    blockMargin,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <OldStyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-review.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-review.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={scoreSize}
        rule=".wp-block-gutenbee-review.[root] .wp-block-gutenbee-review-rating-final-score-value { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={contentSize}
        rule=".wp-block-gutenbee-review.[root] .wp-block-gutenbee-review-rating-final-score-subtitle { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={barHeight}
        rule=".wp-block-gutenbee-review.[root] .wp-block-gutenbee-review-item-outer { height: %s; }"
        unit="px"
      />
      <Rule
        value={reviewItemFontSize}
        rule=".wp-block-gutenbee-review.[root] .wp-block-gutenbee-review-item-outer { font-size: %s; }"
        unit="px"
      />
      {children}
    </OldStyleSheet>
  );
};

const v3 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    score: {
      type: 'string',
      default: '5.0',
    },
    scoreSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '70',
        tablet: '',
        mobile: '',
      }),
    },
    scoreColor: {
      type: 'string',
    },
    content: {
      type: 'string',
      source: 'html',
      selector: '.wp-block-gutenbee-review-rating-final-score-subtitle',
      default: '',
    },
    contentSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '12',
        tablet: '',
        mobile: '',
      }),
    },
    contentColor: {
      type: 'string',
    },
    barHeight: {
      type: 'number',
    },
    barTextColor: {
      type: 'string',
    },
    displayPercentage: {
      type: 'boolean',
      default: true,
    },
    reviewItemFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '12',
        tablet: '',
        mobile: '',
      }),
    },
    progressBackgroundColor: {
      type: 'string',
    },
    barBackgroundColor: {
      type: 'string',
    },
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
      score,
      scoreColor,
      contentColor,
      backgroundColor,
      content,
      barTextColor,
      progressBackgroundColor,
      barBackgroundColor,
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
        backgroundColor: backgroundColor ? backgroundColor : undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      },
      ...getAnimationControlDataAttributes(attributes.animation),
    });

    return (
      <div {...blockProps}>
        <div className="wp-block-gutenbee-review-rating-final-score">
          <p
            className="wp-block-gutenbee-review-rating-final-score-value"
            style={{ color: scoreColor ? scoreColor : undefined }}
          >
            {score}
          </p>
          {content && (
            <RichText.Content
              tagName="p"
              className="wp-block-gutenbee-review-rating-final-score-subtitle"
              style={{ color: contentColor ? contentColor : undefined }}
              value={content}
            />
          )}
        </div>
        <div className="wp-block-gutenbee-review-rating-scores">
          <InnerBlocks.Content />
        </div>
        <OldReviewStyle attributes={attributes}>
          <Rule
            value={barTextColor}
            rule=".wp-block-gutenbee-review.[root] .wp-block-gutenbee-review-item-inner { color: %s; }"
            unit=""
          />
          <Rule
            value={progressBackgroundColor}
            rule=".wp-block-gutenbee-review.[root] .wp-block-gutenbee-review-item-inner { background-color: %s; }"
            unit=""
          />
          <Rule
            value={barBackgroundColor}
            rule=".wp-block-gutenbee-review.[root] .wp-block-gutenbee-review-item-outer { background-color: %s; }"
            unit=""
          />
        </OldReviewStyle>
      </div>
    );
  },
};

export default v3;
