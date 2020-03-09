import PropTypes from 'prop-types';
import { Fragment, useState } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  BlockAlignmentToolbar,
  BlockControls,
  InspectorControls,
  MediaPlaceholder,
  RichText,
  PanelColorSettings,
} from 'wp.blockEditor';
import {
  PanelBody,
  SelectControl,
  TextControl,
  TextareaControl,
  RangeControl,
  Toolbar,
  IconButton,
} from 'wp.components';
import { compose } from 'wp.compose';
import { withSelect } from 'wp.data';
import { pick, get, map, isEmpty } from 'lodash';
import classNames from 'classnames';

import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import ImageStyle from './style';
import { getDefaultResponsiveValue } from '../../components/controls/responsive-control/default-values';
import MarginControls from '../../components/controls/margin-controls';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string,
  imageSizes: PropTypes.object,
  image: PropTypes.object,
};

export const pickRelevantMediaFiles = image => {
  const imageProps = pick(image, ['alt', 'id', 'link', 'caption']);
  imageProps.url =
    get(image, ['sizes', 'large', 'url']) ||
    get(image, ['media_details', 'sizes', 'large', 'source_url']) ||
    image.url;

  return imageProps;
};

const ImageEdit = ({
  attributes,
  setAttributes,
  className,
  clientId,
  imageSizes,
  image,
  isSelected,
}) => {
  const {
    uniqueId,
    id,
    url,
    alt,
    sizeSlug,
    width,
    align,
    caption,
    backgroundColor,
    href,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const blockId = getBlockId(uniqueId);

  const [isEditing, setIsEditing] = useState(!url);
  const toggleIsEditing = () => setIsEditing(prev => !prev);

  const [captionFocused, setCaptionFocused] = useState(false);

  const labels = {
    title: !url ? __('Image') : __('Edit image'),
    instructions: __('Pick an image file from your media library.'),
  };

  const onImageSelect = media => {
    if (!media || !media.url) {
      setAttributes({
        url: undefined,
        alt: undefined,
        id: undefined,
        title: undefined,
        caption: undefined,
      });

      return;
    }

    setIsEditing(false);

    const mediaAttributes = pickRelevantMediaFiles(media);

    // Reset the dimension attributes if changing to a different image.
    if (!media.id || media.id !== id) {
      setAttributes({
        ...mediaAttributes,
        width: getDefaultResponsiveValue(),
        sizeSlug: 'large',
      });
    } else {
      setAttributes({
        ...mediaAttributes,
        url,
      });
    }
  };

  const onImageSizeUpdate = sizeSlug => {
    const url = get(image, ['media_details', 'sizes', sizeSlug, 'source_url']);

    if (!url) {
      return null;
    }

    setAttributes({
      url,
      width: getDefaultResponsiveValue(),
      sizeSlug,
    });
  };

  const onImageClick = () => {};

  const onAlignmentUpdate = value => {
    const extraUpdatedAttributes =
      ['wide', 'full'].indexOf(value) !== -1
        ? { width: getDefaultResponsiveValue() }
        : {};
    setAttributes({ ...extraUpdatedAttributes, align: value });
  };

  const imageSizeOptions = (() => {
    return map(imageSizes, ({ name, slug }) => ({ value: slug, label: name }));
  })();

  const blockControls = (
    <BlockControls>
      <BlockAlignmentToolbar value={align} onChange={onAlignmentUpdate} />

      {url && (
        <Fragment>
          <Toolbar>
            <IconButton
              className={classNames(
                'components-icon-button components-toolbar__control',
                { 'is-active': isEditing },
              )}
              label={__('Edit image')}
              aria-pressed={isEditing}
              onClick={toggleIsEditing}
              icon="format-image"
            />
          </Toolbar>
        </Fragment>
      )}
    </BlockControls>
  );

  const mediaPreview = !!url && (
    <img
      alt={__('Edit image')}
      title={__('Edit image')}
      className="edit-image-preview"
      src={url}
    />
  );

  const mediaUploader = (
    <MediaPlaceholder
      icon="format-image"
      labels={labels}
      onSelect={onImageSelect}
      allowedTypes={['image']}
      value={{ id, src: url }}
      mediaPreview={mediaPreview}
      disableMediaButtons={!isEditing && url}
      onDoubleClick={toggleIsEditing}
      onCancel={!!url && toggleIsEditing}
    />
  );

  if (isEditing || !url) {
    return (
      <Fragment>
        {blockControls}
        {mediaUploader}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ImageStyle attributes={attributes} />

      <figure
        id={blockId}
        className={className}
        style={{
          backgroundColor: backgroundColor || undefined,
        }}
      >
        <img
          src={url}
          alt={alt}
          onDoubleClick={toggleIsEditing}
          onClick={onImageClick}
        />

        {(!RichText.isEmpty(caption) || isSelected) && (
          <RichText
            tagName="figcaption"
            placeholder={__('Write caption…')}
            value={caption}
            unstableOnFocus={() => setCaptionFocused(true)}
            onChange={value => setAttributes({ caption: value })}
            isSelected={captionFocused}
            inlineToolbar
          />
        )}
      </figure>

      {blockControls}

      <InspectorControls>
        <PanelBody title={__('Image Settings')} defaultOpen>
          <ResponsiveControl>
            {breakpoint => (
              <RangeControl
                className="range-control-size"
                label={__('Image Width')}
                value={width[breakpoint]}
                onChange={value => {
                  setAttributes({
                    width: {
                      ...width,
                      [breakpoint]: value != null ? value : '',
                    },
                  });
                }}
                min={10}
                max={2000}
                beforeIcon="format-image"
                afterIcon="format-image"
              />
            )}
          </ResponsiveControl>

          <TextareaControl
            label={__('Alt Text (Alternative Text)')}
            value={alt}
            onChange={value => setAttributes({ alt: value })}
          />

          {!isEmpty(imageSizeOptions) && (
            <SelectControl
              label={__('Image Size')}
              value={sizeSlug}
              options={imageSizeOptions}
              onChange={onImageSizeUpdate}
            />
          )}

          <TextControl
            type="url"
            label={__('Image Link')}
            value={href}
            onChange={value => setAttributes({ href: value })}
            placeholder="https://"
          />
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

ImageEdit.propTypes = propTypes;

export default compose(
  withSelect((select, props) => {
    const { getMedia } = select('core');
    const { getSettings } = select('core/block-editor');
    const {
      attributes: { id },
      isSelected,
    } = props;
    const { mediaUpload, imageSizes, isRTL, maxWidth } = getSettings();

    return {
      image: id && isSelected ? getMedia(id) : null,
      maxWidth,
      isRTL,
      imageSizes,
      mediaUpload,
    };
  }),
)(ImageEdit);
