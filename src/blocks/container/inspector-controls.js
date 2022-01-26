import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { InspectorControls, MediaUpload, BlockIcon } from 'wp.blockEditor';
import {
  PanelBody,
  SelectControl,
  RangeControl,
  CheckboxControl,
  TextControl,
  Button,
} from 'wp.components';
import { help as helpIcon } from '@wordpress/icons';
import ReactTooltip from 'react-tooltip';

import MarginControls from '../../components/controls/margin-controls';
import BackgroundControls from '../../components/controls/background-controls/BackgroundControls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import BorderControls from '../../components/controls/border-controls';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const ContainerInspectorControls = ({
  attributes,
  setAttributes,
  updateColumns,
  columnCount,
  videoInfo,
  handleBackgroundVideoUrlChange,
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
    backgroundVideoURL,
    blockBreakpointVisibility,
    blockAuthVisibility,
    backgroundImage,
    backgroundImageEffects,
    overflow,
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
            <div className="components-base-control components-base-control-with-help-icon">
              <CheckboxControl
                label={__('Enable theme grid')}
                value="on"
                checked={themeGrid}
                onChange={value => setAttributes({ themeGrid: value })}
              />
              <div
                className="components-base-control-help-icon"
                data-tip="When used in combination with a Full Width template or the Full width block alignment it matches the width of the container's contents to the width of the theme. Useful when creating full viewport sections."
                data-effect="solid"
              >
                <BlockIcon icon={helpIcon} />
              </div>
            </div>
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

          <div className="components-base-control components-base-control-with-help-icon">
            <CheckboxControl
              label={__('Disable outside gutters')}
              value="on"
              checked={overflow}
              onChange={() => setAttributes({ overflow: !overflow })}
            />
            <div
              className="components-base-control-help-icon"
              data-tip="Eliminates the left and right padding of the container's contents. Useful when creating full viewport sections and columns that have their own background."
              data-effect="solid"
            >
              <BlockIcon icon={helpIcon} />
            </div>
          </div>

          <ResponsiveControl>
            {breakpoint => (
              <Fragment>
                <RangeControl
                  label={__('Container Height (px)')}
                  min={-1}
                  max={1200}
                  value={containerHeight[breakpoint]}
                  allowReset
                  onChange={value => {
                    setAttributes({
                      containerHeight: {
                        ...containerHeight,
                        [breakpoint]: value != null ? value : '',
                      },
                    });
                  }}
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
                  allowReset
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

        <PanelBody title={__('Block Appearance')} initialOpen={false}>
          <PopoverColorControl
            value={textColor}
            defaultValue={textColor || ''}
            label={__('Text Color')}
            onChange={value => {
              setAttributes({ textColor: value });
            }}
          />

          <PopoverColorControl
            value={backgroundColor}
            defaultValue={backgroundColor || ''}
            label={__('Background Color')}
            onChange={value => {
              setAttributes({ backgroundColor: value });
            }}
          />

          <PopoverColorControl
            label={__('Background Overlay Color')}
            value={overlayBackgroundColor || ''}
            defaultValue={overlayBackgroundColor || ''}
            onChange={value => setAttributes({ overlayBackgroundColor: value })}
          />

          <ResponsiveControl>
            {breakpoint => {
              return (
                <BackgroundControls
                  label={__('Background Image')}
                  backgroundImageValue={backgroundImage[breakpoint]}
                  onBackgroundImageChange={value =>
                    setAttributes({
                      backgroundImage: {
                        ...backgroundImage,
                        [breakpoint]: value,
                      },
                    })
                  }
                  zoomValue={backgroundImageEffects.zoom}
                  onZoomChange={value =>
                    setAttributes({
                      backgroundImageEffects: {
                        ...backgroundImageEffects,
                        zoom: value,
                      },
                    })
                  }
                  parallaxValue={{
                    parallax: backgroundImageEffects.parallax,
                    parallaxSpeed: backgroundImageEffects.parallaxSpeed,
                  }}
                  onParallaxChange={value =>
                    setAttributes({
                      backgroundImageEffects: {
                        ...backgroundImageEffects,
                        ...value,
                      },
                    })
                  }
                  backgroundVideoUrlValue={backgroundVideoURL}
                />
              );
            }}
          </ResponsiveControl>

          {backgroundVideoURL &&
            !['youtube', 'vimeo', 'self'].includes(videoInfo.provider) && (
              <span className="gutenbee-embed-error">
                {__(
                  'Embed URL error. Please enter a YouTube, Vimeo, or self hosted video URL.',
                )}
              </span>
            )}

          <div className="gutenbee-video-bg-control-input-wrap">
            <TextControl
              label={__('Video Background URL')}
              onChange={handleBackgroundVideoUrlChange}
              type="text"
              value={backgroundVideoURL}
            />

            <MediaUpload
              onSelect={video => {
                handleBackgroundVideoUrlChange(
                  `${video?.url}?w=${video?.width}&h=${video?.height}`,
                );
              }}
              allowedTypes={['video']}
              render={({ open }) => (
                <Button
                  isSecondary
                  className="components-toolbar__control"
                  label={__('Select video')}
                  icon="format-video"
                  onClick={open}
                />
              )}
            />
          </div>

          {backgroundVideoURL && (
            <span className="gutenbee-controls-notice">
              {__(
                'Make sure you set a background image above when using this option. The image will appear before the video starts playing and on mobile devices where background videos are not available.',
              )}
            </span>
          )}

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

        <ReactTooltip className="gutenbee-tooltip" />
      </InspectorControls>
    </Fragment>
  );
};

export default ContainerInspectorControls;
