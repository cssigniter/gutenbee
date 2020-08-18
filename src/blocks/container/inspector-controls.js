import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { InspectorControls, PanelColorSettings } from 'wp.blockEditor';
import {
  PanelBody,
  SelectControl,
  RangeControl,
  CheckboxControl,
} from 'wp.components';

import MarginControls from '../../components/controls/margin-controls';
import BackgroundControls from '../../components/controls/background-controls/BackgroundControl';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import AdvancedColorControl from '../../components/controls/advanced-color-control/AdvancedColorControl';
import BorderControls from '../../components/controls/border-controls';
import BoxShadowControls from '../../components/controls/box-shadow-controls';

const ContainerInspectorControls = ({
  attributes,
  setAttributes,
  updateColumns,
  columnCount,
}) => {
  const supports =
    window.__GUTENBEE_SETTINGS__.theme_supports['container'] || {};

  const {
    textColor,
    backgroundColor,
    innerContentWidth,
    containerHeight,
    verticalContentAlignment,
    horizontalContentAlignment,
    gutter,
    columnDirection,
    themeGrid,
    overlayBackgroundColor,
    overlayBackgroundColorOpacity,
  } = attributes;

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Layout Settings')} initialOpen>
          <RangeControl
            label={__('Columns')}
            min={1}
            max={9}
            value={columnCount}
            onChange={value => updateColumns(columnCount, value)}
          />

          {supports.themeGrid && (
            <CheckboxControl
              label={__('Enable theme grid')}
              value="on"
              checked={themeGrid}
              onChange={value => setAttributes({ themeGrid: value })}
            />
          )}

          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('Column Direction')}
                value={columnDirection[breakpoint]}
                options={[
                  { value: '', label: __('Normal') },
                  { value: 'row-reverse', label: __('Reverse') },
                ]}
                onChange={value =>
                  setAttributes({
                    columnDirection: {
                      ...columnDirection,
                      [breakpoint]: value,
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>

          <SelectControl
            label={__('Gutter Width')}
            value={gutter}
            options={[
              { value: 'none', label: __('No gutter (0px)') },
              { value: 'sm', label: __('Small (10px)') },
              { value: 'md', label: __('Medium (20px)') },
              { value: 'lg', label: __('Large (30px)') },
              { value: 'xl', label: __('Extra Large (40px)') },
            ]}
            onChange={value => setAttributes({ gutter: value })}
          />

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
                        [breakpoint]: value != null ? value : '',
                      },
                    })
                  }
                  step={1}
                  help={__(
                    'Leave blank for auto height or set to -1 for full viewport height.',
                  )}
                />
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
                  onChange={value => {
                    setAttributes({
                      innerContentWidth: {
                        ...innerContentWidth,
                        [breakpoint]: value != null ? value : '',
                      },
                    });
                  }}
                  step={1}
                  help={__('Set to -1 for 100% width.')}
                />
              </Fragment>
            )}
          </ResponsiveControl>

          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('Vertical Content Alignment')}
                value={verticalContentAlignment[breakpoint]}
                options={[
                  { value: '', label: '' },
                  { value: 'flex-start', label: __('Top') },
                  { value: 'center', label: __('Middle') },
                  { value: 'flex-end', label: __('Bottom') },
                ]}
                onChange={value =>
                  setAttributes({
                    verticalContentAlignment: {
                      ...verticalContentAlignment,
                      [breakpoint]: value,
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>

          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('Horizontal Content Alignment')}
                value={horizontalContentAlignment[breakpoint]}
                options={[
                  { value: '', label: '' },
                  { value: 'flex-start', label: __('Left') },
                  { value: 'center', label: __('Center') },
                  { value: 'flex-end', label: __('Right') },
                ]}
                onChange={value =>
                  setAttributes({
                    horizontalContentAlignment: {
                      ...horizontalContentAlignment,
                      [breakpoint]: value,
                    },
                  })
                }
                help={__(
                  'The content alignment settings apply when Container Height and/or the Content Width are set.',
                )}
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        <PanelColorSettings
          title={__('Block Appearance')}
          initialOpen={false}
          colorSettings={[
            {
              value: textColor,
              onChange: value => setAttributes({ textColor: value }),
              label: __('Text Color'),
            },
            {
              value: backgroundColor,
              onChange: value => setAttributes({ backgroundColor: value }),
              label: __('Background Color'),
            },
          ]}
          onChange={value => setAttributes({ backgroundColor: value })}
        >
          <AdvancedColorControl
            label={__('Background Overlay Color')}
            colorValue={overlayBackgroundColor || ''}
            colorDefault=""
            onColorChange={value =>
              setAttributes({ overlayBackgroundColor: value })
            }
            opacityValue={overlayBackgroundColorOpacity}
            onOpacityChange={value =>
              setAttributes({ overlayBackgroundColorOpacity: value })
            }
          />

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
    </Fragment>
  );
};

export default ContainerInspectorControls;
