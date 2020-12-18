import { Fragment, useState } from 'wp.element';
import { __ } from 'wp.i18n';
import { ToggleControl, RangeControl, PanelBody } from 'wp.components';
import { InspectorControls, RichText } from 'wp.blockEditor';
import { useSelect, useDispatch } from 'wp.data';
import { createBlock } from 'wp.blocks';
import classNames from 'classnames';

import useUniqueId from '../../../hooks/useUniqueId';
import ReviewItemStyle from './style';
import ResponsiveControl from '../../../components/controls/responsive-control/ResponsiveControl';
import FontSizePickerLabel from '../../../components/controls/text-controls/FontSizePickerLabel';
import getBlockId from '../../../util/getBlockId';
import PopoverColorControl from '../../../components/controls/advanced-color-control/PopoverColorControl';

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

  const {
    uniqueId,
    innerTitle,
    percentage,
    displayPercentage,
    barBackgroundColor,
    progressBackgroundColor,
    textColor,
    innerTitleFontSize,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  const { innerBlocks, parentId } = useSelect(select => {
    const parentId = select('core/block-editor').getBlockParentsByBlockName(
      clientId,
      'gutenbee/review',
    );
    const parent = select('core/block-editor').getBlock(parentId);
    const { innerBlocks } = parent;
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
            <RichText
              key="innerTitle"
              tagName="span"
              value={innerTitle}
              multiline={false}
              disableLineBreaks={true}
              onChange={value => setAttributes({ innerTitle: value })}
              className="wp-block-gutenbee-review-item-inner-title"
              placeholder={__('Write inner title…')}
              isSelected={isSelected && editable === 'innerTitle'}
              onFocus={() => setEditable('innerTitle')}
              onRemove={onRemove}
              onReplace={onReplace}
              onSplit={value => {
                if (!value) {
                  return createBlock('gutenbee/review-item', {
                    barBackgroundColor: barBackgroundColor || undefined,
                    progressBackgroundColor:
                      progressBackgroundColor || undefined,
                    textColor: textColor || undefined,
                    displayPercentage: displayPercentage,
                  });
                }
                return createBlock('gutenbee/review-item', {
                  ...attributes,
                  innerTitle: value,
                  barBackgroundColor: barBackgroundColor || undefined,
                  progressBackgroundColor: progressBackgroundColor || undefined,
                  textColor: textColor || undefined,
                  displayPercentage: displayPercentage,
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

            <ToggleControl
              label={__('Display rating')}
              checked={displayPercentage}
              onChange={value => setAttributes({ displayPercentage: value })}
            />

            <ResponsiveControl>
              {breakpoint => (
                <FontSizePickerLabel
                  label={__('Bar Text Font Size')}
                  value={innerTitleFontSize[breakpoint]}
                  onChange={value =>
                    setAttributes({
                      innerTitleFontSize: {
                        ...innerTitleFontSize,
                        [breakpoint]: value != null ? value : '',
                      },
                    })
                  }
                />
              )}
            </ResponsiveControl>
          </PanelBody>

          <PanelBody title={__('Block Appearance')} initialOpen={false}>
            <PopoverColorControl
              label={__('Bar Text Color')}
              value={textColor || ''}
              defaultValue={textColor || ''}
              onChange={value => setAttributes({ textColor: value })}
            />

            <PopoverColorControl
              label={__('Progress Background Color')}
              value={progressBackgroundColor || ''}
              defaultValue={progressBackgroundColor || ''}
              onChange={value =>
                setAttributes({ progressBackgroundColor: value })
              }
            />

            <PopoverColorControl
              label={__('Bar Background Color')}
              value={barBackgroundColor || ''}
              defaultValue={barBackgroundColor || ''}
              onChange={value => setAttributes({ barBackgroundColor: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
    </Fragment>
  );
};

export default ReviewItemEdit;
