import classNames from 'classnames';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { InspectorControls, PanelColorSettings } from 'wp.blockEditor';
import { RangeControl, PanelBody, ResizableBox } from 'wp.components';
import { compose, withInstanceId } from 'wp.compose';
import { withDispatch } from 'wp.data';

import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
import getBlockId from '../../util/getBlockId';
import SpacerStyle from './style';
import BackgroundControls from '../../components/controls/background-controls';
import MarginControls from '../../components/controls/margin-controls';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';

const SpacerEdit = ({
  attributes,
  isSelected,
  setAttributes,
  instanceId,
  onResizeStart,
  onResizeStop,
  clientId,
}) => {
  const { height, backgroundColor, backgroundImage, uniqueId } = attributes;
  const id = `block-spacer-height-input-${instanceId}`;

  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <SpacerStyle attributes={attributes} />
      <div>
        <ResizableBox
          id={blockId}
          style={{
            backgroundColor: backgroundColor || undefined,
            ...getBackgroundImageStyle(backgroundImage),
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
          className={classNames('block-library-spacer__resize-container', {
            'is-selected': isSelected,
          })}
          size={{
            height: height.desktop,
          }}
          minHeight="20"
          enable={{
            top: false,
            right: false,
            bottom: true,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          onResizeStart={onResizeStart}
          onResizeStop={(event, direction, elt, delta) => {
            onResizeStop();
            const spacerHeight = parseInt(height.desktop + delta.height, 10);

            setAttributes({
              height: {
                ...height,
                desktop: spacerHeight,
              },
            });
          }}
        />
      </div>

      <InspectorControls>
        <PanelBody title={__('Spacer Settings')}>
          <ResponsiveControl>
            {breakpoint => (
              <RangeControl
                id={id}
                label={__('Height in pixels')}
                onChange={value =>
                  setAttributes({
                    height: {
                      ...height,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
                min={10}
                max={500}
                step={1}
                value={height[breakpoint]}
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        <PanelColorSettings
          title={__('Block Appearance')}
          initialOpen={false}
          colorSettings={[
            {
              value: backgroundColor,
              onChange: value => setAttributes({ backgroundColor: value }),
              label: __('Background Color'),
            },
          ]}
          onChange={value => setAttributes({ backgroundColor: value })}
        >
          <BackgroundControls
            label={__('Background Image')}
            setAttributes={setAttributes}
            attributes={attributes}
            attributeKey="backgroundImage"
            supportsParallax
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
                label={__('Margin (px)')}
                attributeKey="blockMargin"
                attributes={attributes}
                setAttributes={setAttributes}
                breakpoint={breakpoint}
              />
            )}
          </ResponsiveControl>
        </PanelColorSettings>
      </InspectorControls>
    </Fragment>
  );
};

export default compose(
  withDispatch(dispatch => {
    const { toggleSelection } = dispatch('core/block-editor');

    return {
      onResizeStart: () => toggleSelection(false),
      onResizeStop: () => toggleSelection(true),
    };
  }),
  withInstanceId,
)(SpacerEdit);
