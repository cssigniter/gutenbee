import { useState, useEffect, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __, sprintf } from 'wp.i18n';
import {
  ToolbarGroup,
  ToolbarButton,
  PanelBody,
  SelectControl,
} from 'wp.components';
import {
  MediaPlaceholder,
  MediaUpload,
  InspectorControls,
  BlockControls,
  BlockIcon,
} from 'wp.blockEditor';
import { gallery as galleryIcon } from '@wordpress/icons';
import { useSelect } from 'wp.data';
import { useMemo } from 'wp.element';
import startCase from 'lodash.startcase';
import classNames from 'classnames';

import GalleryItem from './GalleryItem';
import { LINKTO } from './constants';

const propTypes = {
  attributes: PropTypes.shape({
    size: PropTypes.string,
    linkTo: PropTypes.string,
    images: PropTypes.array.isRequired,
    captions: PropTypes.bool,
  }).isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  label: PropTypes.string.isRequired,
};

const Gallery = ({
  attributes,
  isSelected,
  className,
  setAttributes,
  children,
  label,
  style,
  id,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesAttachments = useSelect(
    select => {
      const { getEntityRecord } = select('core');
      return attributes.images.map(img =>
        getEntityRecord('postType', 'attachment', img.id),
      );
    },
    [attributes.images],
  );

  const propImages = useMemo(() => {
    return attributes.images.map((img, index) => {
      const attachment = imagesAttachments?.[index];
      return {
        id: img.id,
        sizes: attachment?.media_details?.sizes,
      };
    });
  }, [attributes.images, imagesAttachments]);

  // Deselect images when deselecting the block
  useEffect(() => {
    if (!isSelected) {
      setSelectedImage(null);
    }
  }, [isSelected]);

  const onSelectImage = index => () => {
    if (selectedImage !== index) {
      setSelectedImage(index);
    }
  };

  const onRemoveImage = index => () => {
    const images = attributes.images.filter((img, i) => index !== i);

    setSelectedImage(null);
    setAttributes({
      images,
    });
  };

  const onSelectImages = images => {
    setAttributes({
      images: images.map(item => ({
        ...item,
        caption: item.caption ? item.caption : '',
        sourceUrl: item.sizes?.full?.url ?? '',
      })),
    });
  };

  const setImageAttributes = (index, fnAttributes) => {
    if (!propImages?.[index]) {
      return;
    }

    setAttributes({
      images: [
        ...propImages.slice(0, index),
        {
          ...propImages[index],
          ...fnAttributes,
        },
        ...propImages.slice(index + 1),
      ],
    });
  };

  const updateImageURLs = newSize => {
    const { images } = attributes;

    const getImageUrl = image => {
      const imageSizeUrl = propImages.find(
        ({ id: imgId }) => image.id === imgId,
      ).sizes[newSize]?.source_url; // eslint-disable-line camelcase

      return imageSizeUrl || image?.url;
    };

    setAttributes({
      size: newSize,
      images: images.map(image => ({
        ...image,
        url: getImageUrl(image),
      })),
    });
  };

  const { images, linkTo, size } = attributes;

  const [availableSizes] = propImages || [];
  const galleryComponentClasses = classNames({
    'gutenbee-gallery-component': true,
    [className]: true,
  });

  const controls = isSelected && (
    <BlockControls key="controls">
      {!!images.length && (
        <ToolbarGroup>
          <MediaUpload
            onSelect={onSelectImages}
            allowedTypes={['image']}
            multiple
            gallery
            value={images.map(img => img.id)}
            render={({ open }) => (
              <ToolbarButton
                label={sprintf(__('Edit %s'), label)}
                icon="edit"
                onClick={open}
              />
            )}
          />
        </ToolbarGroup>
      )}
    </BlockControls>
  );

  return (
    <Fragment>
      {controls}
      {children}
      {isSelected && (
        <InspectorControls>
          {(linkTo || size) && (
            <PanelBody title={__('Image Settings')} initialOpen={false}>
              {linkTo && (
                <SelectControl
                  label={__('Link to')}
                  value={linkTo}
                  onChange={value => {
                    setAttributes({ linkTo: value });
                  }}
                  options={[
                    {
                      value: LINKTO.ATTACHMENT,
                      label: __('Attachment Page'),
                    },
                    { value: LINKTO.MEDIA, label: __('Media File') },
                    { value: LINKTO.NONE, label: __('None') },
                  ]}
                  __next40pxDefaultSize
                  __nextHasNoMarginBottom
                />
              )}

              {availableSizes && availableSizes.sizes && (
                <SelectControl
                  label={__('Image Size')}
                  value={size}
                  options={Object.keys(availableSizes.sizes).map(name => ({
                    value: name,
                    label: startCase(name),
                  }))}
                  onChange={updateImageURLs}
                  __next40pxDefaultSize
                  __nextHasNoMarginBottom
                />
              )}
            </PanelBody>
          )}
        </InspectorControls>
      )}

      <div className="gallery-component-wrap">
        {images.length > 0 && (
          <div id={id} className={galleryComponentClasses} style={style}>
            {images.map((img, index) => {
              return (
                <div key={img.id || img.url} className="gutenbee-gallery-item">
                  <GalleryItem
                    url={img.url}
                    alt={img.alt}
                    id={img.id}
                    caption={img.caption}
                    isSelected={isSelected && selectedImage === index}
                    onRemove={onRemoveImage(index)}
                    onSelect={onSelectImage(index)}
                    setAttributes={attrs => setImageAttributes(index, attrs)}
                    captions={attributes.captions}
                  />
                </div>
              );
            })}
          </div>
        )}

        <MediaPlaceholder
          addToGallery={images?.length > 0}
          isAppender={images?.length > 0}
          icon={<BlockIcon icon={galleryIcon} />}
          labels={{
            title: !images?.length ? __('Gallery') : __('Edit Gallery'),
            instructions: __(
              'Select images or upload new ones from your library.',
            ),
          }}
          onSelect={onSelectImages}
          accept="image/*"
          allowedTypes={['image']}
          value={images}
          multiple
          disableMediaButtons={images?.length > 0 && !isSelected}
        />
      </div>
    </Fragment>
  );
};

Gallery.propTypes = propTypes;

export default Gallery;
