import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
import { __ } from 'wp.i18n';
import {
  InspectorControls,
  PanelColorSettings,
  ContrastChecker,
  InnerBlocks,
} from 'wp.editor';
import { PanelBody, SelectControl, RangeControl } from 'wp.components';
import { withSelect } from 'wp.data';
import MarginControls from '../../components/controls/margin-controls';
import BackgroundControls from '../../components/controls/background-controls/BackgroundControl';
import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import ContainerStyle from './style';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  className: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  hasInnerBlocks: PropTypes.bool.isRequired,
  clientId: PropTypes.string.isRequired,
};

const ContainerBlockEdit = ({
  className,
  attributes,
  setAttributes,
  isSelected,
  hasInnerBlocks,
  clientId,
}) => {
  const {
    uniqueId,
    textColor,
    backgroundColor,
    backgroundImage,
    innerContentWidth,
    containerHeight,
    verticalContentAlignment,
    horizontalContentAlignment,
  } = attributes;

  useUniqueId({
    attributes,
    setAttributes,
    clientId,
  });

  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <ContainerStyle attributes={attributes} />

      <div
        id={blockId}
        className={className}
        style={{
          color: textColor,
          justifyContent: horizontalContentAlignment,
          alignItems: verticalContentAlignment,
        }}
      >
        <div className={`${className}-inner`}>
          <InnerBlocks
            renderAppender={!hasInnerBlocks && InnerBlocks.ButtonBlockAppender}
          />
        </div>
        <div
          className={`${className}-background`}
          style={{
            backgroundColor,
            ...getBackgroundImageStyle(backgroundImage),
          }}
        />
      </div>

      {isSelected && (
        <Fragment>
          <InspectorControls>
            <PanelBody>
              <ResponsiveControl>
                {breakpoint => (
                  <Fragment>
                    <RangeControl
                      label={__('Container Height (px)')}
                      min={-1}
                      max={1200}
                      value={containerHeight[breakpoint]}
                      onChange={value =>
                        setAttributes({
                          containerHeight: {
                            ...containerHeight,
                            [breakpoint]: value,
                          },
                        })
                      }
                      step={10}
                    />
                    <span className={`${className}-description`}>
                      {__(
                        'Leave blank for auto height or set to -1 for full viewport height.',
                      )}
                    </span>
                  </Fragment>
                )}
              </ResponsiveControl>

              <ResponsiveControl>
                {breakpoint => (
                  <Fragment>
                    <RangeControl
                      label={__('Content Width (px)')}
                      min={-1}
                      max={2500}
                      value={innerContentWidth[breakpoint]}
                      onChange={value =>
                        setAttributes({
                          innerContentWidth: {
                            ...innerContentWidth,
                            [breakpoint]: value,
                          },
                        })
                      }
                      step={1}
                    />

                    <span className={`${className}-description`}>
                      {__('Set to -1 for 100% width.')}
                    </span>
                  </Fragment>
                )}
              </ResponsiveControl>

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

              <SelectControl
                label={__('Vertical Content Alignment')}
                value={verticalContentAlignment}
                options={[
                  { value: 'flex-start', label: __('Top') },
                  { value: 'center', label: __('Middle') },
                  { value: 'flex-end', label: __('Bottom') },
                ]}
                onChange={value =>
                  setAttributes({ verticalContentAlignment: value })
                }
              />

              <SelectControl
                label={__('Horizontal Content Alignment')}
                value={horizontalContentAlignment}
                options={[
                  { value: 'flex-start', label: __('Left') },
                  { value: 'center', label: __('Center') },
                  { value: 'flex-end', label: __('Right') },
                ]}
                onChange={value =>
                  setAttributes({ horizontalContentAlignment: value })
                }
              />

              <span className={`${className}-description`}>
                {__(
                  'The content alignment settings apply when Container Height and/or the Content Width are set.',
                )}
              </span>

              <BackgroundControls
                label={__('Background Image')}
                setAttributes={setAttributes}
                attributes={attributes}
                attributeKey="backgroundImage"
                supportsParallax
              />
            </PanelBody>

            <PanelColorSettings
              title={__('Color Settings')}
              initialOpen={false}
              colorSettings={[
                {
                  value: backgroundColor,
                  onChange: value => setAttributes({ backgroundColor: value }),
                  label: __('Background Color'),
                },
                {
                  value: textColor,
                  onChange: value => setAttributes({ textColor: value }),
                  label: __('Text Color'),
                },
              ]}
              onChange={value => setAttributes({ backgroundColor: value })}
            >
              <ContrastChecker
                isLargeText={false}
                textColor={textColor}
                backgroundColor={backgroundColor}
              />
            </PanelColorSettings>
          </InspectorControls>
        </Fragment>
      )}
    </Fragment>
  );
};

ContainerBlockEdit.propTypes = propTypes;

const withInnerBlocksCheck = withSelect((select, { clientId }) => {
  const { getBlock } = select('core/block-editor');
  const block = getBlock(clientId);

  return {
    hasInnerBlocks: !!(block && block.innerBlocks.length),
  };
});

export default compose(withInnerBlocksCheck)(ContainerBlockEdit);
