import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../../util/getBlockId';

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

const v1 = {
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
  save: ({ className, attributes }) => (
    <ReviewItem className={className} attributes={attributes} />
  ),
};

export default v1;
