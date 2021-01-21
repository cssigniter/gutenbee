import { InnerBlocks, RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import Rule from '../../../components/stylesheet/Rule';
import getBlockId from '../../../util/getBlockId';
import StyleSheet from '../../../components/stylesheet';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';

const ReviewStyle = ({ attributes, children }) => {
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
    <StyleSheet id={blockId}>
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
        rule=".wp-block-gutenbee-review.[root] .wp-block-gutenbee-review-rating-final-score strong { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={contentSize}
        rule=".wp-block-gutenbee-review.[root] .wp-block-gutenbee-review-rating-final-score p { font-size: %s; }"
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
    </StyleSheet>
  );
};

const v1 = {
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
      selector: '.wp-block-gutenbee-review-rating-final-score p',
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
  },
  migrate(attributes) {
    return attributes;
  },
  save: ({ attributes, className }) => {
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

    return (
      <div
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
        )}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <div className="wp-block-gutenbee-review-rating-final-score">
          <strong style={{ color: scoreColor ? scoreColor : undefined }}>
            {score}
          </strong>
          {content && (
            <RichText.Content
              tagName="p"
              style={{ color: contentColor ? contentColor : undefined }}
              value={content}
            />
          )}
        </div>
        <div className="wp-block-gutenbee-review-rating-scores">
          <InnerBlocks.Content />
        </div>
        <ReviewStyle attributes={attributes}>
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
        </ReviewStyle>
      </div>
    );
  },
};

export default v1;
