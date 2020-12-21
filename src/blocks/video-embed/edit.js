import { Fragment, useRef, useState } from 'wp.element';
import {
  BaseControl,
  Button,
  PanelBody,
  Placeholder,
  ToggleControl,
  TextControl,
  Toolbar,
} from 'wp.components';
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  BlockControls,
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

  if (!isSelected && interactive) {
    setInteractive(false);
  }

  if (editing) {
    return (
      <Placeholder
        label={__('GutenBee Video Embed.')}
        className="wp-block-embed"
        instructions={__(
          'Paste a YouTube or Vimeo video URL to embed on your site.',
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
            value={videoUrl}
            className="components-placeholder__input"
            aria-label={__('embed-url')}
            placeholder={__('Enter URL to embed here…')}
            onChange={event => handleVideoUrlChange(event.target.value)}
          />
          {videoUrl && 'unsupported' !== videoInfo.provider && (
            <Button isPrimary type="submit">
              {_x('Embed', 'button label')}
            </Button>
          )}

          {videoInfo?.provider === 'unsupported' && (
            <div className="components-placeholder__error">
              <div className="components-placeholder__instructions">
                {__(
                  'Embed URL error. Please enter a valid YouTube or Vimeo URL.',
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
      <div
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
          'gutenbee-video-embed-block-wrapper',
        )}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
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
        <Toolbar>
          <Button
            className="components-icon-button components-toolbar__control"
            label={__('Change video URL')}
            onClick={() => setEditing(true)}
            icon="edit"
          />
        </Toolbar>
      </BlockControls>
      <InspectorControls>
        <PanelBody title={__('Video Options')}>
          <MediaUploadCheck>
            <BaseControl className="editor-video-coverImage-control">
              <BaseControl.VisualLabel>
                {__('Cover Image')}
              </BaseControl.VisualLabel>

              <MediaUpload
                title={__('Select Cover Image')}
                onSelect={onCoverImageSelect}
                allowedTypes={VIDEO_POSTER_ALLOWED_MEDIA_TYPES}
                render={({ open }) => (
                  <Button
                    isDefault
                    onClick={open}
                    ref={coverImageImageButtonRef}
                    aria-describedby={videoCoverImageDescription}
                  >
                    {!coverImage
                      ? __('Select Cover Image')
                      : __('Replace image')}
                  </Button>
                )}
              />
              <p id={videoCoverImageDescription} hidden>
                {coverImage
                  ? sprintf(__('The current cover image url is %s'), coverImage)
                  : __('There is no cover image currently selected')}
              </p>
              {!!coverImage && (
                <Button onClick={onCoverImageRemove} isLink isDestructive>
                  {__('Remove Cover Image')}
                </Button>
              )}
            </BaseControl>
          </MediaUploadCheck>
          <ToggleControl
            label={__('Show Controls')}
            checked={controls}
            onChange={value => setAttributes({ controls: value })}
          />
          <ToggleControl
            label={__('Enable Autoplay')}
            checked={autoplay}
            onChange={value => {
              setAttributes({ autoplay: value });
              setAttributes({ lazyLoad: value === true ? false : lazyLoad });
            }}
          />
          <ToggleControl
            label={__('Mute')}
            checked={mute}
            onChange={value => setAttributes({ mute: value })}
          />
          <ToggleControl
            label={__('Loop')}
            checked={loop}
            onChange={value => setAttributes({ loop: value })}
          />
          {videoInfo.provider === 'youtube' && (
            <ToggleControl
              label={__('Modest Branding')}
              checked={branding}
              onChange={value => setAttributes({ branding: value })}
            />
          )}
          {coverImage && !autoplay && (
            <ToggleControl
              label={__('Lazy Load')}
              checked={lazyLoad}
              onChange={value => setAttributes({ lazyLoad: value })}
            />
          )}
          <ToggleControl
            label={__('Stick to bottom on scroll')}
            checked={sticky}
            onChange={value => setAttributes({ sticky: value })}
          />
          <TextControl
            label={__('Start time in seconds.')}
            onChange={value => setAttributes({ startTime: value })}
            type="number"
            value={startTime}
          />
          {videoInfo.provider === 'youtube' && (
            <TextControl
              label={__('End time in seconds.')}
              onChange={value => setAttributes({ endTime: value })}
              type="number"
              value={endTime}
            />
          )}
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

export default VideoEmbedEdit;
