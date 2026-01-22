import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText, useBlockProps } from 'wp.blockEditor';
import classNames from 'classnames';

import ReviewItemEdit from './edit';
import getBlockId from '../../../util/getBlockId';
import ReviewItemBlockIcon from './block-icon';
import deprecated from './deprecated';

registerBlockType('gutenbee/review-item', {
  apiVersion: 3,
  title: __('GutenBee Review Item'),
  description: __('Create review items'),
  icon: ReviewItemBlockIcon,
  category: 'gutenbee',
  parent: ['gutenbee/review'],
  keywords: [__('review'), __('review item')],
  supports: {
    anchor: true,
    splitting: true,
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
  deprecated,
  edit: ReviewItemEdit,
  save: ({ attributes }) => {
    const { uniqueId, innerTitle, percentage, displayPercentage } = attributes;
    const blockId = getBlockId(uniqueId);
    const blockProps = useBlockProps.save({
      id: blockId,
      className: classNames(blockId),
    });

    return (
      <div {...blockProps}>
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
  },
});
