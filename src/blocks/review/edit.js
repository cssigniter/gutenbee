import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { Fragment } from 'wp.element';
import {
  InspectorControls,
  RichText,
  useBlockProps,
  __experimentalUseInnerBlocksProps,
  useInnerBlocksProps as currentUseInnerBlockProps,
} from 'wp.blockEditor';
import { PanelBody, RangeControl, ToggleControl } from 'wp.components';
import { useSelect } from 'wp.data';
import classNames from 'classnames';

import getBlockId from '../../util/getBlockId';
import useUniqueId from '../../hooks/useUniqueId';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../components/controls/margin-controls';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import BorderControls from '../../components/controls/border-controls';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import ReviewStyle from './style';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import Rule from '../../components/stylesheet/Rule';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};

const useInnerBlocksProps =
  __experimentalUseInnerBlocksProps ?? currentUseInnerBlockProps;

const ReviewEdit = ({ attributes, setAttributes, className, clientId }) => {
  const {
    uniqueId,
    score,
    scoreSize,
    scoreColor,
    content,
    contentSize,
    contentColor,
    barHeight,
    barTextColor,
    displayPercentage,
    reviewItemFontSize,
    progressBackgroundColor,
    barBackgroundColor,
    backgroundColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  const innerBlocksProps = useInnerBlocksProps(useBlockProps(), {
    allowedBlocks: ['gutenbee/review-item'],
    template: [['gutenbee/review-item']],
    __experimentalUIParts: { hasSelectedUI: false },
    __experimentalMoverDirection: 'vertical',
    orientation: 'vertical',
  });

  useSelect(select => {
    const [parent] = select('core/block-editor').getBlocksByClientId(clientId);

    const { innerBlocks } = parent;

    const averageScore = () => {
      if (innerBlocks.length === 0) {
        return false;
      }

      let totalScore = innerBlocks.reduce(
        (acc, currVal) => acc + currVal.attributes.percentage,
        0,
      );

      let average = (totalScore / innerBlocks.length).toFixed(1);
      return average;
    };

    if (averageScore() !== false && score !== averageScore()) {
      setAttributes({ score: averageScore() });
    }
  });

  return (
    <Fragment>
      <div
        id={blockId}
        className={classNames(className, blockId)}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <div className="wp-block-gutenbee-review-rating-final-score">
          <p
            className="wp-block-gutenbee-review-rating-final-score-value"
            style={{
              color: scoreColor,
            }}
          >
            {score}
          </p>
          <RichText
            tagName="p"
            className="wp-block-gutenbee-review-rating-final-score-subtitle"
            identifier="value"
            multiline={false}
            disableLineBreaks={true}
            value={content}
            onChange={nextContent =>
              setAttributes({
                content: nextContent,
              })
            }
            onRemove
            placeholder={
              // translators: placeholder text used for the review verdict
              __('Verdict')
            }
            style={{
              color: contentColor,
            }}
          />
        </div>
        <div {...innerBlocksProps} />
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

      <InspectorControls>
        <PanelBody title={__('Score & Verdict Options')} initialOpen>
          <ResponsiveControl>
            {breakpoint => (
              <FontSizePickerLabel
                label={__('Score Font Size')}
                value={scoreSize[breakpoint]}
                onChange={value =>
                  setAttributes({
                    scoreSize: {
                      ...scoreSize,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>
          <PopoverColorControl
            value={scoreColor}
            defaultValue={scoreColor || ''}
            label={__('Score Color')}
            onChange={value => {
              setAttributes({ scoreColor: value });
            }}
          />
          <ResponsiveControl>
            {breakpoint => (
              <FontSizePickerLabel
                label={__('Verdict Font Size')}
                value={contentSize[breakpoint]}
                onChange={value =>
                  setAttributes({
                    contentSize: {
                      ...contentSize,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>
          <PopoverColorControl
            value={contentColor}
            defaultValue={contentColor || ''}
            label={__('Verdict Color')}
            onChange={value => {
              setAttributes({ contentColor: value });
            }}
          />
        </PanelBody>
        <PanelBody title={__('Review Item Options')} initialOpen={false}>
          <ToggleControl
            label={__('Display rating')}
            checked={displayPercentage}
            onChange={value => {
              setAttributes({ displayPercentage: value });
            }}
          />

          <ResponsiveControl>
            {breakpoint => (
              <FontSizePickerLabel
                label={__('Bar Text Font Size')}
                value={reviewItemFontSize[breakpoint]}
                onChange={value =>
                  setAttributes({
                    reviewItemFontSize: {
                      ...reviewItemFontSize,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>

          <RangeControl
            label={__('Bar height (px)')}
            min={30}
            max={120}
            value={barHeight}
            onChange={value => setAttributes({ barHeight: value })}
            step={1}
          />

          <PopoverColorControl
            label={__('Bar Text Color')}
            value={barTextColor || ''}
            defaultValue={barTextColor || ''}
            onChange={value => setAttributes({ barTextColor: value })}
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
        <PanelBody title={__('Block Appearance')} initialOpen={false}>
          <PopoverColorControl
            value={backgroundColor}
            defaultValue={backgroundColor || ''}
            label={__('Background Color')}
            onChange={value => {
              setAttributes({ backgroundColor: value });
            }}
          />

          <BorderControls
            attributes={attributes}
            setAttributes={setAttributes}
          />

          <BoxShadowControls
            attributes={attributes}
            setAttributes={setAttributes}
          />

          <ResponsiveControl>
            {breakpoint => (
              <MarginControls
                label={__('Padding (px)')}
                attributeKey="blockPadding"
                attributes={attributes}
                setAttributes={setAttributes}
                breakpoint={breakpoint}
              />
            )}
          </ResponsiveControl>

          <ResponsiveControl>
            {breakpoint => (
              <MarginControls
                label={__('Margin (px)')}
                attributeKey="blockMargin"
                attributes={attributes}
                setAttributes={setAttributes}
                breakpoint={breakpoint}
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        <PanelBody title={__('Visibility Settings')} initialOpen={false}>
          <BreakpointVisibilityControl
            values={blockBreakpointVisibility}
            onChange={values => {
              setAttributes({
                blockBreakpointVisibility: values,
              });
            }}
          />

          <AuthVisibilityControl
            values={blockAuthVisibility}
            onChange={values => {
              setAttributes({
                blockAuthVisibility: values,
              });
            }}
          />
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
};

ReviewEdit.propTypes = propTypes;

export default ReviewEdit;
