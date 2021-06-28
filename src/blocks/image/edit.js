import PropTypes from 'prop-types';
import { Fragment, useState, useEffect } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  BlockAlignmentToolbar,
  BlockControls,
  InspectorControls,
  MediaPlaceholder,
  RichText,
  BlockIcon,
  useBlockProps,
} from 'wp.blockEditor';
import {
  PanelBody,
  SelectControl,
  TextControl,
  TextareaControl,
  RangeControl,
  Toolbar,
  Button,
} from 'wp.components';
import { useSelect } from 'wp.data';
import { pick, get, map, isEmpty } from 'lodash';
import classNames from 'classnames';
import { image as imageIcon } from '@wordpress/icons';

import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import ImageStyle from './style';
import { getDefaultResponsiveValue } from '../../components/controls/responsive-control/default-values';
import MarginControls from '../../components/controls/margin-controls';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

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

/**
 * @enum LINK_DESTINATION
 * @type {{ATTACHMENT: string, CUSTOM: string, MEDIA: string, NONE: string}}
 */
const LINK_DESTINATION = {
  NONE: 'none',
  MEDIA: 'media',
  ATTACHMENT: 'attachment',
  CUSTOM: 'custom',
};

const ImageEdit = ({
  attributes,
  setAttributes,
  className,
  clientId,
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
    blockBreakpointVisibility,
    blockAuthVisibility,
    linkDestination,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  const { image, imageSizes } = useSelect(
    select => {
      const { getMedia } = select('core');
      const { getSettings } = select('core/block-editor');
      const { imageSizes } = getSettings();

      return {
        image: id && isSelected ? getMedia(id) : null,
        imageSizes,
      };
    },
    [id, isSelected],
  );

  const onImageLinkDestinationChange = destination => {
    if (destination === LINK_DESTINATION.NONE) {
      setAttributes({
        href: '',
        linkDestination: destination,
      });

      return;
    }

    if (destination === LINK_DESTINATION.MEDIA) {
      setAttributes({
        href: image.source_url ?? '',
        linkDestination: destination,
      });

      return;
    }

    if (destination === LINK_DESTINATION.ATTACHMENT) {
      setAttributes({
        href: image.link ?? '',
        linkDestination: destination,
      });

      return;
    }

    if (destination === LINK_DESTINATION.CUSTOM) {
      setAttributes({
        href: href ?? '',
        linkDestination: destination,
      });

      return;
    }
  };

  useEffect(() => {
    // For backwards compatibility
    if (linkDestination === LINK_DESTINATION.NONE && !!href) {
      setAttributes({
        linkDestination: LINK_DESTINATION.CUSTOM,
      });
    }
  }, []);

  useEffect(
    () => {
      if (image && isSelected) {
        onImageLinkDestinationChange(linkDestination);
      }
    },
    [image],
  );

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

  const blockProps = useBlockProps({
    id: blockId,
    className: classNames(className, blockId),
    style: {
      backgroundColor: backgroundColor || undefined,
    },
  });

  const blockControls = (
    <BlockControls>
      <BlockAlignmentToolbar value={align} onChange={onAlignmentUpdate} />

      {url && (
        <Fragment>
          <Toolbar>
            <Button
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
      icon={<BlockIcon icon={imageIcon} />}
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
      <div {...blockProps}>
        {blockControls}
        {mediaUploader}
      </div>
    );
  }

  return (
    <figure {...blockProps}>
      <img
        src={url}
        alt={alt}
        onDoubleClick={toggleIsEditing}
        onClick={onImageClick}
        style={{
          ...getBorderCSSValue({ attributes, prefix: 'image' }),
          ...getBoxShadowCSSValue({ attributes, prefix: 'image' }),
        }}
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

      <ImageStyle attributes={attributes} />
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
                allowReset
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

          {image && (
            <SelectControl
              label={__('Image Link')}
              value={linkDestination}
              options={[
                { value: LINK_DESTINATION.NONE, label: 'None' },
                { value: LINK_DESTINATION.MEDIA, label: __('Media') },
                { value: LINK_DESTINATION.ATTACHMENT, label: __('Attachment') },
                { value: LINK_DESTINATION.CUSTOM, label: __('Custom URL') },
              ]}
              onChange={onImageLinkDestinationChange}
            />
          )}

          {linkDestination === LINK_DESTINATION.CUSTOM && (
            <TextControl
              type="url"
              label={__('Custom URL')}
              value={href}
              onChange={value => setAttributes({ href: value })}
              placeholder="https://"
            />
          )}
        </PanelBody>

        <PanelBody title={__('Block Appearance')} initialOpen={false}>
          <PopoverColorControl
            label={__('Background Color')}
            value={backgroundColor || ''}
            defaultValue={backgroundColor || ''}
            onChange={value => setAttributes({ backgroundColor: value })}
          />

          <BorderControls
            attributes={attributes}
            setAttributes={setAttributes}
            attributePrefix="image"
          />

          <BoxShadowControls
            attributes={attributes}
            setAttributes={setAttributes}
            attributePrefix="image"
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
    </figure>
  );
};

ImageEdit.propTypes = propTypes;

export default ImageEdit;
