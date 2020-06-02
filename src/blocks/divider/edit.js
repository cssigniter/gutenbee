import { Fragment } from 'wp.element';
import { __, sprintf } from 'wp.i18n';
import { PanelBody, Toolbar, RangeControl } from 'wp.components';
import {
  InspectorControls,
  AlignmentToolbar,
  PanelColorSettings,
} from 'wp.blockEditor';

import { BORDER_STYLES, Divider } from './index';
import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import BackgroundControls from '../../components/controls/background-controls';
import useUniqueId from '../../hooks/useUniqueId';
import BorderControls from '../../components/controls/border-controls';
import BoxShadowControls from '../../components/controls/box-shadow-controls';

const DividerEdit = ({
  className,
  attributes,
  setAttributes,
  isSelected,
  clientId,
}) => {
  const {
    style,
    weight,
    width,
    height,
    align,
    color,
    backgroundColor,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  return (
    <Fragment>
      <Divider className={className} attributes={attributes} />

      {isSelected && (
        <InspectorControls key="inspector">
          <PanelBody>
            <p>{__('Style')}</p>
            <Toolbar
              controls={Object.values(BORDER_STYLES).map(
                (borderStyle, index) => ({
                  icon: 'admin-appearance',
                  title: sprintf(__('Style %s'), borderStyle),
                  isActive: style === borderStyle,
                  onClick: () => setAttributes({ style: borderStyle }),
                  subscript: index + 1,
                }),
              )}
            />

            <RangeControl
              label={__('Weight (thickness)')}
              min={1}
              max={50}
              value={weight}
              onChange={value => setAttributes({ weight: value })}
            />

            <RangeControl
              label={__('Width (%)')}
              min={1}
              max={100}
              value={width}
              onChange={value => setAttributes({ width: value })}
            />

            <RangeControl
              label={__('Height (px)')}
              min={10}
              max={500}
              onChange={value => setAttributes({ height: value })}
              value={height}
            />

            <p>{__('Alignment')}</p>
            <AlignmentToolbar
              value={align}
              onChange={value => setAttributes({ align: value || 'left' })}
              isCollapsed={false}
            />
          </PanelBody>

          <PanelColorSettings
            title={__('Block Appearance')}
            initialOpen={false}
            colorSettings={[
              {
                value: color,
                onChange: value => setAttributes({ color: value }),
                label: __('Color'),
              },
              {
                value: backgroundColor,
                onChange: value => setAttributes({ backgroundColor: value }),
                label: __('Background Color'),
              },
            ]}
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
          </PanelColorSettings>
        </InspectorControls>
      )}
    </Fragment>
  );
};

export default DividerEdit;
