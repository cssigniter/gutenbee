import { Fragment, useRef, useState, useEffect } from 'wp.element';
import {
  BaseControl,
  Button,
  PanelBody,
  Placeholder,
  ToggleControl,
  TextControl,
  ToolbarButton,
  ToolbarGroup,
} from 'wp.components';
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  BlockControls,
  useBlockProps,
} from 'wp.blockEditor';
import { __, _x, sprintf } from 'wp.i18n';
import classNames from 'classnames';

import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';
import VideoEmbedStyle from './style';
import { onVimeoApiReady, onYouTubeApiReady } from './util';
import { useVideoEmbed } from '../../util/video/useVideoEmbed';
import AnimationControls from '../../components/controls/animation-controls/AnimationControls';

const VIDEO_POSTER_ALLOWED_MEDIA_TYPES = ['image'];

const VideoEmbedEdit = ({
  attributes,
  setAttributes,
  instanceId,
  clientId,
  isSelected,
  className,
}) => {
  const {
    uniqueId,
    lazyLoad,
    videoUrl,
    coverImage,
    startTime,
    endTime,
    controls,
    autoplay,
    mute,
    loop,
    sticky,
    branding,
    backgroundColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const blockId = getBlockId(uniqueId);

  const [hideOnClick, setHideOnClick] = useState(false);
  const [editing, setEditing] = useState(!videoUrl);
  const [interactive, setInteractive] = useState(false);
  const coverImageImageButtonRef = useRef();
  const overlayRef = useRef();

  const { videoInfo, handleVideoUrlChange, videoEmbedRef } = useVideoEmbed({
    url: videoUrl,
    onVideoUrlChange: url => {
      setAttributes({
        videoUrl: url,
      });
    },
    onYouTubeApiReady,
    onVimeoApiReady,
  });

  const onCoverImageSelect = image => {
    setAttributes({ coverImage: image.url });
    setHideOnClick(false);
  };

  const onCoverImageRemove = () => {
    setAttributes({ coverImage: '', lazyLoad: false });

    // Move focus back to the Media Upload button.
    coverImageImageButtonRef.current.focus();
  };

  const videoCoverImageDescription = `video-block__coverImage-image-description-${instanceId}`;

  useEffect(() => {
    if (!isSelected) {
      setInteractive(false);
    }
  }, [isSelected]);

  const blockProps = useBlockProps({
    id: blockId,
    className: classNames(
      className,
      blockId,
      getBreakpointVisibilityClassNames(blockBreakpointVisibility),
      getAuthVisibilityClasses(blockAuthVisibility),
      'gutenbee-video-embed-block-wrapper',
    ),
    style: {
      backgroundColor: backgroundColor ? backgroundColor : undefined,
      ...getBorderCSSValue({ attributes }),
      ...getBoxShadowCSSValue({ attributes }),
    },
  });

  if (editing) {
    return (
      <Placeholder
        label={__('GutenBee Video Embed.', 'gutenbee')}
        className="wp-block-embed"
        instructions={__(
          'Paste a YouTube or Vimeo video URL to embed on your site.',
          'gutenbee',
        )}
      >
        <form
          onSubmit={event => {
            event?.preventDefault();
            setEditing(false);
          }}
        >
          <input
            type="url"
            value={videoUrl || ''}
            className="components-placeholder__input"
            aria-label={__('embed-url', 'gutenbee')}
            placeholder={__('Enter URL to embed here…', 'gutenbee')}
            onChange={event => handleVideoUrlChange(event.target.value)}
          />
          {videoUrl && 'unsupported' !== videoInfo.provider && (
            <Button variant="primary" type="submit">
              {_x('Embed', 'button label', 'gutenbee')}
            </Button>
          )}

          {videoInfo?.provider === 'unsupported' && (
            <div className="components-placeholder__error">
              <div className="components-placeholder__instructions">
                {__(
                  'Embed URL error. Please enter a valid YouTube or Vimeo URL.',
                  'gutenbee',
                )}
              </div>
            </div>
          )}
        </form>
      </Placeholder>
    );
  }

  return (
    <Fragment>
      <div {...blockProps}>
        <VideoEmbedStyle attributes={attributes} />

        <div className="gutenbee-video-embed-wrapper">
          <div
            className="gutenbee-video-embed"
            data-video-lazy={lazyLoad}
            data-video-id={videoInfo.id}
            data-video-controls={controls}
            data-video-autoplay={autoplay}
            data-video-mute={mute}
            data-video-loop={loop}
            data-video-branding={branding}
            data-video-start={startTime}
            data-video-end={endTime}
            data-video-type={videoInfo.provider}
            ref={videoEmbedRef}
          >
            <div id={`video-${blockId}`} />
          </div>

          {coverImage && !hideOnClick && (
            <div
              ref={overlayRef}
              className="gutenbee-video-embed-overlay"
              style={{ backgroundImage: 'url(' + coverImage + ')' }}
              onClick={() => setHideOnClick(true)}
            >
              <div className="play-button" />
            </div>
          )}
        </div>
        {!interactive && (
          <div
            className="gutenbee-embed__interactive-overlay"
            onMouseUp={() => setInteractive(true)}
          />
        )}
      </div>

      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            className="components-icon-button components-toolbar__control"
            label={__('Change video URL', 'gutenbee')}
            onClick={() => setEditing(true)}
            icon="edit"
          />
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Video Options', 'gutenbee')}>
          <MediaUploadCheck>
            <BaseControl
              className="editor-video-coverImage-control"
              __nextHasNoMarginBottom={true}
            >
              <BaseControl.VisualLabel>
                {__('Cover Image', 'gutenbee')}
              </BaseControl.VisualLabel>

              <MediaUpload
                title={__('Select Cover Image', 'gutenbee')}
                onSelect={onCoverImageSelect}
                allowedTypes={VIDEO_POSTER_ALLOWED_MEDIA_TYPES}
                render={({ open }) => (
                  <Button
                    variant="secondary"
                    onClick={open}
                    ref={coverImageImageButtonRef}
                    aria-describedby={videoCoverImageDescription}
                  >
                    {!coverImage
                      ? __('Select Cover Image', 'gutenbee')
                      : __('Replace image', 'gutenbee')}
                  </Button>
                )}
              />
              <p id={videoCoverImageDescription} hidden>
                {coverImage
                  ? sprintf(
                      // translators: %s: The URL of the video's cover image.
                      __('The current cover image url is %s', 'gutenbee'),
                      coverImage,
                    )
                  : __(
                      'There is no cover image currently selected',
                      'gutenbee',
                    )}
              </p>
              {!!coverImage && (
                <Button
                  onClick={onCoverImageRemove}
                  variant="link"
                  isDestructive
                >
                  {__('Remove Cover Image', 'gutenbee')}
                </Button>
              )}
            </BaseControl>
          </MediaUploadCheck>
          <ToggleControl
            label={__('Show Controls', 'gutenbee')}
            checked={controls}
            onChange={value => setAttributes({ controls: value })}
            __nextHasNoMarginBottom={true}
          />
          <ToggleControl
            label={__('Enable Autoplay', 'gutenbee')}
            checked={autoplay}
            onChange={value => {
              setAttributes({ autoplay: value });
              if (value) {
                setAttributes({ mute: true });
              }
              setAttributes({ lazyLoad: value === true ? false : lazyLoad });
            }}
            __nextHasNoMarginBottom={true}
          />
          <ToggleControl
            label={__('Mute', 'gutenbee')}
            checked={mute}
            onChange={value => setAttributes({ mute: value })}
            disabled={autoplay}
            __nextHasNoMarginBottom={true}
          />
          <ToggleControl
            label={__('Loop', 'gutenbee')}
            checked={loop}
            onChange={value => setAttributes({ loop: value })}
            __nextHasNoMarginBottom={true}
          />
          {videoInfo.provider === 'youtube' && (
            <ToggleControl
              label={__('Modest Branding', 'gutenbee')}
              checked={branding}
              onChange={value => setAttributes({ branding: value })}
              __nextHasNoMarginBottom={true}
            />
          )}
          {coverImage && !autoplay && (
            <ToggleControl
              label={__('Lazy Load', 'gutenbee')}
              checked={lazyLoad}
              onChange={value => setAttributes({ lazyLoad: value })}
              __nextHasNoMarginBottom={true}
            />
          )}
          <ToggleControl
            label={__('Stick to bottom on scroll', 'gutenbee')}
            checked={sticky}
            onChange={value => setAttributes({ sticky: value })}
            __nextHasNoMarginBottom={true}
          />
          <TextControl
            label={__('Start time in seconds.', 'gutenbee')}
            onChange={value => setAttributes({ startTime: value })}
            type="number"
            value={startTime || ''}
            __next40pxDefaultSize={true}
            __nextHasNoMarginBottom={true}
          />
          {videoInfo.provider === 'youtube' && (
            <TextControl
              label={__('End time in seconds.', 'gutenbee')}
              onChange={value => setAttributes({ endTime: value })}
              type="number"
              value={endTime || ''}
              __next40pxDefaultSize={true}
              __nextHasNoMarginBottom={true}
            />
          )}
        </PanelBody>
        <PanelBody
          title={__('Block Appearance', 'gutenbee')}
          initialOpen={false}
        >
          <PopoverColorControl
            value={backgroundColor}
            defaultValue={backgroundColor || ''}
            label={__('Background Color', 'gutenbee')}
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

export default VideoEmbedEdit;
