import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import ReviewItemEdit from './edit';
import getBlockId from '../../../util/getBlockId';
import ReviewItemBlockIcon from './block-icon';

const ReviewItem = ({ className, attributes }) => {
  const { uniqueId, innerTitle, percentage, displayPercentage } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div id={blockId} className={classNames(className, blockId)}>
      <div className="wp-block-gutenbee-review-item-outer">
        <div
          className="wp-block-gutenbee-review-item-inner"
          style={{
            width: `${percentage * 10}%`,
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
  icon: ReviewItemBlockIcon,
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
  },
  edit: ReviewItemEdit,
  save: ({ className, attributes }) => (
    <ReviewItem className={className} attributes={attributes} />
  ),
});
