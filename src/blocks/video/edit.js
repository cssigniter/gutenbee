import { Fragment, useRef, useEffect, useState } from 'wp.element';
import {
  BaseControl,
  Disabled,
  Button,
  PanelBody,
  SelectControl,
  ToggleControl,
  Toolbar,
  withNotices,
} from 'wp.components';
import {
  BlockControls,
  BlockIcon,
  InspectorControls,
  MediaPlaceholder,
  MediaUpload,
  MediaUploadCheck,
  RichText,
} from 'wp.blockEditor';
import { __, sprintf } from 'wp.i18n';
import { compose, withInstanceId } from 'wp.compose';
import { withSelect } from 'wp.data';
import classNames from 'classnames';

import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import VideoStyle from './style';
import VideoBlockIcon from './block-icon';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const ALLOWED_MEDIA_TYPES = ['video'];
const VIDEO_POSTER_ALLOWED_MEDIA_TYPES = ['image'];

const VideoEdit = ({
  className,
  instanceId,
  isSelected,
  noticeUI,
  setAttributes,
  attributes,
  clientId,
  noticeOperations,
}) => {
  const {
    uniqueId,
    autoplay,
    caption,
    controls,
    loop,
    muted,
    playsInline,
    poster,
    preload,
    src,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  const videoPlayerRef = useRef();
  const posterImageButtonRef = useRef();
  const [editing, setEditing] = useState(!src);

  useEffect(
    () => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.load();
      }
    },
    [poster],
  );

  useUniqueId({ attributes, setAttributes, clientId });

  const toggleAttribute = attribute => {
    return newValue => {
      setAttributes({ [attribute]: newValue });
    };
  };

  const onSelectPoster = image => {
    setAttributes({ poster: image.url });
  };

  const onRemovePoster = () => {
    setAttributes({ poster: '' });

    // Move focus back to the Media Upload button.
    posterImageButtonRef.current.focus();
  };

  const onUploadError = message => {
    noticeOperations.removeAllNotices();
    noticeOperations.createErrorNotice(message);
  };

  const getAutoplayHelp = checked => {
    return checked
      ? __(
          'Note: Autoplaying videos may cause usability issues for some visitors.',
        )
      : null;
  };

  const switchToEditing = () => {
    setEditing(true);
  };

  const onSelectVideo = media => {
    if (!media || !media.url) {
      // in this case there was an error and we should continue in the editing state
      // previous attributes should be removed because they may be temporary blob urls
      setAttributes({ src: undefined, id: undefined });
      switchToEditing();
      return;
    }
    // sets the block's attribute and updates the edit component from the
    // selected media, then switches off the editing UI
    setAttributes({ src: media.url, id: media.id });
    setEditing(false);
  };

  const videoPosterDescription = `video-block__poster-image-description-${instanceId}`;
  const blockId = getBlockId(uniqueId);

  if (editing) {
    return (
      <MediaPlaceholder
        icon={<BlockIcon icon={VideoBlockIcon} />}
        className={className}
        onSelect={onSelectVideo}
        accept="video/*"
        allowedTypes={ALLOWED_MEDIA_TYPES}
        value={attributes}
        notices={noticeUI}
        onError={onUploadError}
        labels={{
          instructions: __(
            'Upload a video file, or pick one from your media library.',
          ),
          title: __('GutenBee Video'),
        }}
      />
    );
  }

  return (
    <Fragment>
      <BlockControls>
        <Toolbar>
          <Button
            className="components-icon-button components-toolbar__control"
            label={__('Edit video')}
            onClick={switchToEditing}
            icon="edit"
          />
        </Toolbar>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Video Settings')}>
          <ToggleControl
            label={__('Autoplay')}
            onChange={toggleAttribute('autoplay')}
            checked={autoplay}
            help={getAutoplayHelp}
          />

          <ToggleControl
            label={__('Loop')}
            onChange={toggleAttribute('loop')}
            checked={loop}
          />

          <ToggleControl
            label={__('Muted')}
            onChange={toggleAttribute('muted')}
            checked={muted}
          />

          <ToggleControl
            label={__('Playback Controls')}
            onChange={toggleAttribute('controls')}
            checked={controls}
          />

          <ToggleControl
            label={__('Play inline')}
            onChange={toggleAttribute('playsInline')}
            checked={playsInline}
          />

          <SelectControl
            label={__('Preload')}
            value={preload}
            onChange={value => setAttributes({ preload: value })}
            options={[
              { value: 'auto', label: __('Auto') },
              { value: 'metadata', label: __('Metadata') },
              { value: 'none', label: __('None') },
            ]}
          />

          <MediaUploadCheck>
            <BaseControl className="editor-video-poster-control">
              <BaseControl.VisualLabel>
                {__('Poster Image')}
              </BaseControl.VisualLabel>

              <MediaUpload
                title={__('Select Poster Image')}
                onSelect={onSelectPoster}
                allowedTypes={VIDEO_POSTER_ALLOWED_MEDIA_TYPES}
                render={({ open }) => (
                  <Button
                    isPrimary
                    onClick={open}
                    ref={posterImageButtonRef}
                    aria-describedby={videoPosterDescription}
                  >
                    {!poster ? __('Select') : __('Replace')}
                  </Button>
                )}
              />
              <p id={videoPosterDescription} hidden>
                {poster
                  ? sprintf(__('The current poster image url is %s'), poster)
                  : __('There is no poster image currently selected')}
              </p>
              {!!poster && (
                <Button onClick={onRemovePoster} isDestructive isTertiary>
                  {__('Remove')}
                </Button>
              )}
            </BaseControl>
          </MediaUploadCheck>
        </PanelBody>

        <PanelBody title={__('Block Appearance')} initialOpen={false}>
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

      <VideoStyle attributes={attributes} />
      <figure
        blockId={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
        )}
        style={{
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        {/*
  						Disable the video tag so the user clicking on it won't play the
  						video when the controls are enabled.
  					*/}
        <Disabled>
          <video
            controls={controls}
            poster={poster}
            src={src}
            ref={videoPlayerRef}
          />
        </Disabled>
        {(!RichText.isEmpty(caption) || isSelected) && (
          <RichText
            tagName="figcaption"
            placeholder={__('Write caption…')}
            value={caption}
            onChange={value => setAttributes({ caption: value })}
            inlineToolbar
          />
        )}
      </figure>
    </Fragment>
  );
};

export default compose([
  withSelect(select => {
    const { getSettings } = select('core/block-editor');
    const { mediaUpload } = getSettings();
    return { mediaUpload };
  }),
  withNotices,
  withInstanceId,
])(VideoEdit);
