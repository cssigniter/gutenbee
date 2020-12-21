import { Fragment, useState } from 'wp.element';
import { __ } from 'wp.i18n';
import { RangeControl, PanelBody } from 'wp.components';
import { InspectorControls, RichText } from 'wp.blockEditor';
import { useSelect, useDispatch } from 'wp.data';
import { createBlock } from 'wp.blocks';
import classNames from 'classnames';

import useUniqueId from '../../../hooks/useUniqueId';
import getBlockId from '../../../util/getBlockId';

const ReviewItemEdit = ({
  attributes,
  isSelected,
  className,
  setAttributes,
  clientId,
  onReplace,
  onRemove,
}) => {
  const [editable, setEditable] = useState('');
  useUniqueId({ attributes, setAttributes, clientId });

  const { uniqueId, innerTitle, percentage, displayPercentage } = attributes;

  const blockId = getBlockId(uniqueId);

  const { innerBlocks, parentId } = useSelect(select => {
    const parentId = select('core/block-editor').getBlockParentsByBlockName(
      clientId,
      'gutenbee/review',
    );
    const currentBlock = select('core/block-editor').getBlock(clientId);
    const parent = select('core/block-editor').getBlock(parentId);
    const { innerBlocks } = parent;

    if (
      currentBlock.attributes.displayPercentage !==
      parent.attributes.displayPercentage
    ) {
      setAttributes({ displayPercentage: parent.attributes.displayPercentage });
    }
    return {
      innerBlocks,
      parentId,
    };
  });

  const averageScore = () => {
    let totalScore = innerBlocks.reduce(
      (acc, currVal) => acc + currVal.attributes.percentage,
      0,
    );

    let average = (totalScore / innerBlocks.length).toFixed(1);
    return average;
  };

  const { updateBlockAttributes } = useDispatch('core/block-editor');

  return (
    <Fragment>
      <div id={blockId} className={classNames(className, blockId)}>
        <div className="wp-block-gutenbee-review-item-outer">
          <div
            className="wp-block-gutenbee-review-item-inner"
            style={{
              width: `${percentage * 10}%`,
            }}
          >
            <RichText
              key="innerTitle"
              tagName="span"
              value={innerTitle}
              multiline={false}
              disableLineBreaks={true}
              onChange={value => setAttributes({ innerTitle: value })}
              className="wp-block-gutenbee-review-item-inner-title"
              placeholder={__('Review Category')}
              isSelected={isSelected && editable === 'innerTitle'}
              onFocus={() => setEditable('innerTitle')}
              onRemove={innerBlocks.length > 1 ? onRemove : false}
              onReplace={onReplace}
              onSplit={value => {
                if (!value) {
                  return createBlock('gutenbee/review-item', {
                    ...attributes,
                    innerTitle: undefined,
                  });
                }
                return createBlock('gutenbee/review-item', {
                  ...attributes,
                  innerTitle: value,
                });
              }}
            />

            {displayPercentage && (
              <span className="wp-block-gutenbee-review-item-percentage">
                {percentage}
              </span>
            )}
          </div>
        </div>
      </div>

      {isSelected && (
        <InspectorControls>
          <PanelBody>
            <RangeControl
              label={__('Rating')}
              min={0}
              max={10}
              value={percentage}
              onChange={value => {
                setAttributes({ percentage: value }),
                  updateBlockAttributes(parentId, { score: averageScore() });
              }}
              step={0.1}
            />
          </PanelBody>
        </InspectorControls>
      )}
    </Fragment>
  );
};

export default ReviewItemEdit;
