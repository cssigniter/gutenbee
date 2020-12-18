import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';

import getBlockId from '../../util/getBlockId';
import ReviewEdit from './edit';
import ReviewStyle from './style';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

registerBlockType('gutenbee/review', {
  title: __('GutenBee Review'),
  description: __('Creates reviews.'),
  category: 'gutenbee',
  keywords: [__('review'), __('rating')],
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
      selector: '.entry-rating-final-score p',
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
  edit: ReviewEdit,
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      score,
      scoreColor,
      contentColor,
      backgroundColor,
      content,
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
        <div className="entry-rating-final-score">
          <strong style={{ color: scoreColor ? scoreColor : undefined }}>
            {score}
          </strong>
          <RichText.Content
            tagName="p"
            style={{ color: contentColor ? contentColor : undefined }}
            value={content}
          />
        </div>
        <div className="entry-rating-scores">
          <InnerBlocks.Content />
        </div>
        <ReviewStyle attributes={attributes} />
      </div>
    );
  },
});
