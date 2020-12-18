import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import ReviewItemEdit from './edit';
// import ReviewItemBlockIcon from './block-icon';
import { getDefaultResponsiveValue } from '../../../components/controls/responsive-control/default-values';
import ReviewItemStyle from './style';
import getBlockId from '../../../util/getBlockId';

const ReviewItem = ({ className, attributes }) => {
  const {
    uniqueId,
    innerTitle,
    percentage,
    displayPercentage,
    textColor,
    barBackgroundColor,
    progressBackgroundColor,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div id={blockId} className={classNames(className, blockId)}>
      <ReviewItemStyle attributes={attributes} />

      <div
        className="wp-block-gutenbee-review-item-outer"
        style={{
          backgroundColor: barBackgroundColor || undefined,
        }}
      >
        <div
          className="wp-block-gutenbee-review-item-inner"
          style={{
            width: `${percentage * 10}%`,
            backgroundColor: progressBackgroundColor || undefined,
            color: textColor || undefined,
          }}
        >
          {!RichText.isEmpty(innerTitle) && (
            <RichText.Content
              tagName="span"
              value={innerTitle}
              className="wp-block-gutenbee-review-item-inner-title"
            />
          )}

          {displayPercentage && (
            <span className="wp-block-gutenbee-review-item-percentage">
              {percentage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

registerBlockType('gutenbee/review-item', {
  title: __('GutenBee Review Item'),
  description: __('Create review items'),
  icon: 'smiley',
  category: 'gutenbee',
  parent: ['gutenbee/review'],
  keywords: [__('review'), __('review item')],
  supports: {
    anchor: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },

    innerTitle: {
      source: 'html',
      selector: '.wp-block-gutenbee-review-item-inner-title',
    },
    percentage: {
      type: 'number',
      default: 5,
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

    innerTitleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 14 }),
    },
  },
  edit: ReviewItemEdit,
  save: ({ className, attributes }) => (
    <ReviewItem className={className} attributes={attributes} />
  ),
});
