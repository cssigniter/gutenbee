import { Fragment, useRef, useState, useEffect, useCallback } from 'wp.element';
import {
  BaseControl,
  Button,
  PanelBody,
  Placeholder,
  ToggleControl,
  __experimentalNumberControl as NumberControl,
  IconButton,
  Toolbar,
} from 'wp.components';
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  BlockControls,
} from 'wp.blockEditor';
import { __, _x } from 'wp.i18n';

import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import VideoEmbedStyle from './style';
import { getVideoInfo } from './util';

const VIDEO_POSTER_ALLOWED_MEDIA_TYPES = ['image'];

const VideoEmbedEdit = ({
  attributes,
  setAttributes,
  instanceId,
  clientId,
  isSelected,
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
    branding,
    backgroundColor,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const blockId = getBlockId(uniqueId);

  const [hideOnClick, setHideOnClick] = useState(false);
  const [editing, setEditing] = useState(!videoUrl);
  const [interactive, setInteractive] = useState(false);
  const coverImageImageButtonRef = useRef();
  const overlayRef = useRef();
  const [videoEmbedRef, setVideoEmbedRef] = useState(null);
  const [videoInfo, setVideoInfo] = useState(
    videoUrl ? getVideoInfo(videoUrl) : null,
  );

  const onVideoEmbedRef = useCallback(node => {
    if (node !== null) {
      setVideoEmbedRef(node);
    }
  }, []);

  const onHideOnClick = () => {
    setHideOnClick(true);
  };

  const onChangeVideoUrl = newUrl => {
    setAttributes({
      videoUrl: newUrl,
    });
    setVideoInfo(getVideoInfo(newUrl));
  };

  const onSelectCoverImage = image => {
    setAttributes({ coverImage: image.url });
    setHideOnClick(false);
  };

  const onRemoveCoverImage = () => {
    setAttributes({ coverImage: '', lazyLoad: false });

    // Move focus back to the Media Upload button.
    coverImageImageButtonRef.current.focus();
  };

  const switchToEditing = () => {
    setEditing(true);
  };

  const hideOverlay = () => {
    setInteractive(true);
  };

  const videoCoverImageDescription = `video-block__coverImage-image-description-${instanceId}`;

  const divStyle = {
    backgroundImage: 'url(' + coverImage + ')',
  };

  if (!isSelected && interactive) {
    setInteractive(false);
  }

  useEffect(() => {
    if (videoEmbedRef) {
      if ('youtube' === videoInfo.provider && videoInfo.id) {
        if (!document.getElementById('youtube-api-script')) {
          const tag = document.createElement('script');
          tag.id = 'youtube-api-script';
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        onYouTubeAPIReady(videoEmbedRef);
      } else if ('vimeo' === videoInfo.provider && videoInfo.id) {
        if (!document.getElementById('vimeo-api-script')) {
          const tag = document.createElement('script');
          tag.id = 'vimeo-api-script';
          tag.src = 'https://player.vimeo.com/api/player.js';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        onVimeoAPIReady(videoEmbedRef);
      }
    }
  }, [videoEmbedRef]);

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
            if (event) {
              event.preventDefault();
            }
            setEditing(false);
          }}
        >
          {videoUrl && 'unsupported' === videoInfo.provider && (
            <span className="gutenbee-embed-error">
              {__('Embed URL error. Please enter a YouTube or Vimeo URL.')}
            </span>
          )}
          <input
            type="url"
            value={videoUrl}
            className="components-placeholder__input"
            aria-label={__('embed-url')}
            placeholder={__('Enter URL to embed here…')}
            onChange={event => onChangeVideoUrl(event.target.value)}
          />
          {videoUrl && 'unsupported' !== videoInfo.provider && (
            <Button isPrimary type="submit">
              {_x('Embed', 'button label')}
            </Button>
          )}
        </form>
      </Placeholder>
    );
  }

  const attrState = attr => {
    return 'true' === attr ? 1 : 0;
  };

  const onYouTubeAPIReady = videoEmbed => {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      return setTimeout(onYouTubeAPIReady.bind(null, videoEmbed), 333);
    }

    const dataset = videoEmbed.dataset;

    // eslint-disable-next-line no-unused-vars
    const ytPlayer = new YT.Player('video-' + blockId, {
      videoId: dataset.videoId,
      playerVars: {
        autoplay: 0,
        controls: dataset.videoControls ? attrState(dataset.videoControls) : 0,
        showinfo: 0,
        modestbranding: dataset.videoBranding
          ? attrState(dataset.videoBranding)
          : 0,
        loop: dataset.videoLoop ? attrState(dataset.videoLoop) : 0,
        playlist: dataset.videoId,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 0,
        mute: dataset.videoMute ? attrState(dataset.videoMute) : 0,
        start: parseInt(dataset.videoStart, 10) || undefined,
        end: parseInt(dataset.videoEnd, 10) || undefined,
      },
      events: {},
    });
  };

  const onVimeoAPIReady = videoEmbed => {
    if (typeof Vimeo === 'undefined' || typeof Vimeo.Player === 'undefined') {
      return setTimeout(onVimeoAPIReady.bind(null, videoEmbed), 333);
    }

    const dataset = videoEmbed.dataset;

    const player = new Vimeo.Player(videoEmbed, {
      id: dataset.videoId,
      loop: dataset.videoLoop ? attrState(dataset.videoLoop) : 0,
      autoplay: 0,
      controls: dataset.videoControls ? attrState(dataset.videoControls) : 0,
      byline: false,
      title: false,
      autopause: false,
      muted: dataset.videoMute ? attrState(dataset.videoMute) : 0,
    });

    if (dataset.videoStart) {
      player.setCurrentTime(dataset.videoStart);
    }
  };

  return (
    <Fragment>
      <div
        id={blockId}
        className="gutenbee-video-embed-block-wrapper"
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <div className="gutenbee-video-embed-wrapper">
          <VideoEmbedStyle attributes={attributes} />
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
            ref={onVideoEmbedRef}
          >
            <div id={`video-${blockId}`} />
          </div>
          {coverImage && !hideOnClick && (
            <div
              ref={overlayRef}
              className="gutenbee-video-embed-overlay"
              style={divStyle}
              onClick={onHideOnClick}
            >
              <div className="play-button" />
            </div>
          )}
        </div>
        {!interactive && (
          <div
            className="gutenbee-embed__interactive-overlay"
            onMouseUp={hideOverlay}
          />
        )}
      </div>
      <BlockControls>
        <Toolbar>
          <IconButton
            className="components-icon-button components-toolbar__control"
            label={__('Change video URL')}
            onClick={switchToEditing}
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
                onSelect={onSelectCoverImage}
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
                <Button onClick={onRemoveCoverImage} isLink isDestructive>
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
              setAttributes({ lazyLoad: true === value ? false : lazyLoad });
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
          {'youtube' === videoInfo.provider && (
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
          <NumberControl
            label={__('Start time in seconds.')}
            onChange={value => setAttributes({ startTime: value })}
            value={startTime}
          />
          {'youtube' === videoInfo.provider && (
            <NumberControl
              label={__('End time in seconds.')}
              onChange={value => setAttributes({ endTime: value })}
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
      </InspectorControls>
    </Fragment>
  );
};

export default VideoEmbedEdit;
