import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { InspectorControls, InnerBlocks, PanelColorSettings } from 'wp.editor';
import { PanelBody, RangeControl } from 'wp.components';
import { compose } from 'wp.compose';
import { withSelect } from 'wp.data';

import useUniqueId from '../../../hooks/useUniqueId';
import ResponsiveControl from '../../../components/controls/responsive-control/ResponsiveControl';
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import MarginControls from '../../../components/controls/margin-controls';
import ColumnStyle from './style';
import BackgroundControls from '../../../components/controls/background-controls';
import getBlockId from '../../../util/getBlockId';

const propTypes = {
  className: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  hasInnerBlocks: PropTypes.bool.isRequired,
};

const ColumnBlockEdit = ({
  className,
  attributes,
  setAttributes,
  hasInnerBlocks,
  clientId,
}) => {
  useUniqueId({ attributes, setAttributes, clientId });
  const {
    uniqueId,
    width,
    textColor,
    backgroundColor,
    backgroundImage,
  } = attributes;

  const updateWidth = (value, breakpoint) =>
    setAttributes({
      width: {
        ...width,
        [breakpoint]: value,
      },
    });

  return (
    <Fragment>
      <ColumnStyle attributes={attributes} />

      <div id={getBlockId(uniqueId)} className={className}>
        <div
          className={`${className}-content`}
          style={{
            color: textColor,
            backgroundColor,
            ...getBackgroundImageStyle(backgroundImage),
          }}
        >
          <InnerBlocks
            templateLock={false}
            renderAppender={
              hasInnerBlocks
                ? undefined
                : () => <InnerBlocks.ButtonBlockAppender />
            }
          />
        </div>
      </div>
      <InspectorControls>
        <PanelBody>
          <ResponsiveControl>
            {breakpoint => (
              <RangeControl
                label={__('Width (%)')}
                value={width[breakpoint] || ''}
                onChange={value => updateWidth(value, breakpoint)}
                min={0}
                max={100}
                required
                allowReset
              />
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

          <BackgroundControls
            label={__('Background Image')}
            setAttributes={setAttributes}
            attributes={attributes}
            attributeKey="backgroundImage"
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
        />
      </InspectorControls>
    </Fragment>
  );
};

ColumnBlockEdit.propTypes = propTypes;

const withInnerBlocksCheck = withSelect((select, { clientId }) => {
  const { getBlock } = select('core/block-editor');
  const block = getBlock(clientId);

  return {
    hasInnerBlocks: !!(block && block.innerBlocks.length),
  };
});

export default compose(withInnerBlocksCheck)(ColumnBlockEdit);
