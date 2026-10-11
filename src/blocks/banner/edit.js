import { Fragment, useRef } from 'wp.element';
import classNames from 'classnames';
import { __ } from 'wp.i18n';
import {
  InspectorControls,
  InnerBlocks,
  MediaUpload,
  useBlockProps,
} from 'wp.blockEditor';
import {
  PanelBody,
  RangeControl,
  SelectControl,
  TextControl,
  ToggleControl,
  Button,
} from 'wp.components';
import { useSelect } from 'wp.data';

import useUniqueId from '../../hooks/useUniqueId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../components/controls/margin-controls';
import BackgroundControls from '../../components/controls/background-controls/BackgroundControls';
import getBlockId from '../../util/getBlockId';
import BorderControls from '../../components/controls/border-controls';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import { useVideoEmbed } from '../../util/video/useVideoEmbed';
import VideoBackgroundEditor from '../../util/video/components/VideoBackgroundEditor';
import { onVimeoApiReady, onYouTubeApiReady } from './utils';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';
import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import URLPicker, { canUseURLPicker } from '../../components/url-picker';
import AnimationControls from '../../components/controls/animation-controls/AnimationControls';

const BannerEditStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    bannerHeight,
    blockPadding,
    blockMargin,
    verticalContentAlignment,
    horizontalContentAlignment,
    backgroundImage,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={bannerHeight}
        rule=".wp-block-gutenbee-banner.[root] { height: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100vh',
        }}
      />
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-banner.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-banner.[root] > .wp-block-gutenbee-banner-inner { padding: %s; }"
        unit="px"
      />
      <Rule
        value={horizontalContentAlignment}
        rule=".wp-block-gutenbee-banner.[root] > .wp-block-gutenbee-banner-inner { align-items: %s; }"
      />
      <Rule
        value={verticalContentAlignment}
        rule=".wp-block-gutenbee-banner.[root] > .wp-block-gutenbee-banner-inner { justify-content: %s; }"
      />
      <Rule
        value={backgroundImage}
        rule=".wp-block-gutenbee-banner.[root] > .wp-block-gutenbee-banner-background { %s }"
      />
      {children}
    </StyleSheet>
  );
};

const BannerBlockEdit = ({
  attributes,
  setAttributes,
  clientId,
  className,
  isSelected,
}) => {
  useUniqueId({ attributes, setAttributes, clientId });
  const {
    uniqueId,
    bannerUrl,
    newTab,
    textColor,
    backgroundColor,
    backgroundVideoURL,
    backgroundImage,
    backgroundImageEffects,
    overlayBackgroundColor,
    bannerHeight,
    verticalContentAlignment,
    horizontalContentAlignment,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  const hasInnerBlocks = useSelect(
    select => {
      const { getBlock } = select('core/block-editor');
      const block = getBlock(clientId);
      return !!(block && block.innerBlocks.length);
    },
    [clientId],
  );

  const ref = useRef();

  const { zoom, parallax } = backgroundImageEffects ?? {};

  const blockId = getBlockId(uniqueId);
  const classes = classNames(blockId, className, {
    'gutenbee-zoom': zoom && !parallax,
  });
  const baseClass = 'wp-block-gutenbee-banner';

  const { videoInfo, videoEmbedRef, handleVideoUrlChange } = useVideoEmbed({
    url: backgroundVideoURL,
    onVideoUrlChange: url => {
      setAttributes({
        backgroundVideoURL: url,
      });
    },
    onYouTubeApiReady,
    onVimeoApiReady,
  });

  const blockProps = useBlockProps({
    id: blockId,
    className: classes,
    style: {
      color: textColor,
      ...getBorderCSSValue({ attributes }),
      ...getBoxShadowCSSValue({ attributes }),
    },
    ref: ref,
  });

  return (
    <Fragment>
      <div {...blockProps}>
        {bannerUrl && <span className={`${baseClass}-link-placeholder`} />}
        <div className={`${baseClass}-inner`}>
          <InnerBlocks
            templateLock={false}
            renderAppender={
              hasInnerBlocks
                ? undefined
                : () => <InnerBlocks.ButtonBlockAppender />
            }
          />
        </div>
        {overlayBackgroundColor && (
          <div
            className={`${baseClass}-background-overlay`}
            style={{
              backgroundColor: overlayBackgroundColor,
            }}
          />
        )}
        <div
          className={`${baseClass}-background`}
          style={{
            backgroundColor,
          }}
        >
          {backgroundVideoURL &&
            !['unsupported'].includes(videoInfo.provider) && (
              <VideoBackgroundEditor
                key={backgroundVideoURL}
                videoInfo={videoInfo}
                videoEmbedRef={videoEmbedRef}
              />
            )}
        </div>
        <BannerEditStyle attributes={attributes} />
      </div>

      {canUseURLPicker() && (
        <URLPicker
          isSelected={isSelected}
          anchorRef={ref}
          url={bannerUrl}
          opensInNewTab={newTab}
          onChange={values => {
            setAttributes({
              bannerUrl: values.url,
              newTab: values.opensInNewTab,
            });
          }}
        />
      )}

      <InspectorControls>
        <PanelBody title={__('Layout Settings', 'gutenbee')} initialOpen>
          <ResponsiveControl>
            {breakpoint => (
              <Fragment>
                <RangeControl
                  label={__('Banner Height (px)', 'gutenbee')}
                  min={-1}
                  max={1200}
                  value={bannerHeight[breakpoint]}
                  allowReset
                  onChange={value => {
                    setAttributes({
                      bannerHeight: {
                        ...bannerHeight,
                        [breakpoint]: value != null ? value : '',
                      },
                    });
                  }}
                  step={1}
                  help={__(
                    'Leave blank for auto height or set to -1 for full viewport height.',
                    'gutenbee',
                  )}
                  __next40pxDefaultSize
                  __nextHasNoMarginBottom
                />
              </Fragment>
            )}
          </ResponsiveControl>

          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('Vertical Content Alignment', 'gutenbee')}
                value={verticalContentAlignment[breakpoint]}
                options={[
                  { value: '', label: '' },
                  { value: 'flex-start', label: __('Top', 'gutenbee') },
                  { value: 'center', label: __('Middle', 'gutenbee') },
                  { value: 'flex-end', label: __('Bottom', 'gutenbee') },
                ]}
                onChange={value =>
                  setAttributes({
                    verticalContentAlignment: {
                      ...verticalContentAlignment,
                      [breakpoint]: value,
                    },
                  })
                }
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            )}
          </ResponsiveControl>

          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('Horizontal Content Alignment', 'gutenbee')}
                value={horizontalContentAlignment[breakpoint]}
                options={[
                  { value: '', label: '' },
                  { value: 'flex-start', label: __('Left', 'gutenbee') },
                  { value: 'center', label: __('Center', 'gutenbee') },
                  { value: 'flex-end', label: __('Right', 'gutenbee') },
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
                  'The content alignment settings apply when Banner Height is set.',
                  'gutenbee',
                )}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        {!canUseURLPicker() && (
          <PanelBody
            title={__('Link Settings', 'gutenbee')}
            initialOpen={false}
          >
            <TextControl
              label={__('Banner URL', 'gutenbee')}
              value={bannerUrl}
              onChange={value => setAttributes({ bannerUrl: value })}
              type="url"
              placeholder="https://"
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
            <ToggleControl
              label={__('Open in new tab', 'gutenbee')}
              checked={!!newTab}
              onChange={() => setAttributes({ newTab: !newTab })}
              help={
                newTab
                  ? __('Opens link in new tab.', 'gutenbee')
                  : __('Toggle to open link in new tab.', 'gutenbee')
              }
              __nextHasNoMarginBottom
            />
          </PanelBody>
        )}

        <PanelBody
          title={__('Block Appearance', 'gutenbee')}
          initialOpen={false}
        >
          <PopoverColorControl
            value={textColor}
            defaultValue={textColor || ''}
            label={__('Text Color', 'gutenbee')}
            onChange={value => {
              setAttributes({ textColor: value });
            }}
          />

          <PopoverColorControl
            value={backgroundColor}
            defaultValue={backgroundColor || ''}
            label={__('Background Color', 'gutenbee')}
            onChange={value => {
              setAttributes({ backgroundColor: value ?? '' });
            }}
          />

          <PopoverColorControl
            label={__('Background Overlay Color', 'gutenbee')}
            value={overlayBackgroundColor || ''}
            defaultValue={overlayBackgroundColor || ''}
            onChange={value => setAttributes({ overlayBackgroundColor: value })}
          />

          <ResponsiveControl>
            {breakpoint => {
              return (
                <BackgroundControls
                  label={__('Background Image', 'gutenbee')}
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
                  'gutenbee',
                )}
              </span>
            )}

          <div className="gutenbee-video-bg-control-input-wrap">
            <TextControl
              label={__('Video Background URL', 'gutenbee')}
              onChange={handleVideoUrlChange}
              type="text"
              value={backgroundVideoURL}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />

            <MediaUpload
              onSelect={video => {
                handleVideoUrlChange(
                  `${video?.url}?w=${video?.width}&h=${video?.height}`,
                );
              }}
              allowedTypes={['video']}
              render={({ open }) => (
                <Button
                  variant="secondary"
                  className="components-toolbar__control"
                  label={__('Select video', 'gutenbee')}
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
                'gutenbee',
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
                label={__('Padding (px)', 'gutenbee')}
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
                label={__('Margin (px)', 'gutenbee')}
                attributeKey="blockMargin"
                attributes={attributes}
                setAttributes={setAttributes}
                breakpoint={breakpoint}
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        <PanelBody
          title={__('Visibility Settings', 'gutenbee')}
          initialOpen={false}
        >
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

        {__GUTENBEE_SETTINGS__.plugin.settings['active_animation-controls'] && (
          <PanelBody
            icon={!!attributes.animation?.type && 'saved'}
            title={__('Animation', 'gutenbee')}
            initialOpen={false}
          >
            <AnimationControls
              attributes={{
                ...attributes.animation,
                duration:
                  attributes.animation?.duration !== undefined &&
                  attributes.animation?.duration !== ''
                    ? Number(attributes.animation.duration)
                    : undefined,
                delay:
                  attributes.animation?.delay !== undefined &&
                  attributes.animation?.delay !== ''
                    ? Number(attributes.animation.delay)
                    : undefined,
              }}
              setAttributes={setAttributes}
            />
          </PanelBody>
        )}
      </InspectorControls>
    </Fragment>
  );
};

export default BannerBlockEdit;
