import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { Fragment } from 'wp.element';
import {
  InspectorControls,
  RichText,
  useBlockProps,
  __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from 'wp.blockEditor';
import { PanelBody, RangeControl } from 'wp.components';
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
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
};

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
        <div className="entry-rating-final-score">
          <strong>{score}</strong>
          <RichText
            tagName="p"
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
          />
        </div>
        <div {...innerBlocksProps} />
      </div>
      <ReviewStyle attributes={attributes} />

      <InspectorControls>
        <PanelBody title={__('Block Appearance')} initialOpen>
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

          <RangeControl
            label={__('Bar height (px)')}
            min={30}
            max={120}
            value={barHeight}
            onChange={value => setAttributes({ barHeight: value })}
            step={1}
          />

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
