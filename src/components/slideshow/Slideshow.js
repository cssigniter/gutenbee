import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { withSelect } from 'wp.data';
import { Button, Toolbar, PanelBody, SelectControl } from 'wp.components';
import {
  MediaPlaceholder,
  MediaUpload,
  InspectorControls,
  BlockControls,
  BlockIcon,
} from 'wp.blockEditor';
import SlickSlider from 'react-slick';
import startCase from 'lodash.startcase';
import { gallery as galleryIcon } from '@wordpress/icons';

import { LINKTO } from '../gallery/constants';

const propTypes = {
  attributes: PropTypes.shape({
    size: PropTypes.string,
    linkTo: PropTypes.string,
    images: PropTypes.array.isRequired,
    arrowNav: PropTypes.bool,
    dotNav: PropTypes.bool,
    autoplay: PropTypes.bool,
    animationStyle: PropTypes.string,
    infinite: PropTypes.bool,
    speed: PropTypes.number,
    autoplaySpeed: PropTypes.number,
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.number,
    pauseOnHover: PropTypes.bool,
    arrowsColor: PropTypes.string,
    dotsColor: PropTypes.string,
  }),
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string,
  images: PropTypes.array,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  id: PropTypes.string,
};

const Slideshow = ({
  className,
  attributes,
  isSelected,
  setAttributes,
  images: propImages,
  style,
  children,
  id,
}) => {
  const onSelectImages = images => {
    setAttributes({
      images: images.map(attributes => ({
        ...attributes,
        caption: attributes.caption ? [attributes.caption] : [],
      })),
    });
  };

  const updateImageURLs = newSize => {
    const { images } = attributes;

    const getImageUrl = image => {
      const imageSizeUrl = propImages.find(({ id }) => image.id === id).sizes[
        newSize
      ]?.source_url; // eslint-disable-line camelcase

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

  const {
    images,
    linkTo,
    size,
    arrowNav,
    dotNav,
    autoplay,
    animationStyle,
    infinite,
    speed,
    autoplaySpeed,
    slidesToShow,
    slidesToScroll,
    pauseOnHover,
    arrowsColor,
    dotsColor,
  } = attributes;
  const [availableSizes] = propImages || [];

  if (images.length === 0) {
    return (
      <div id={id} style={style}>
        <MediaPlaceholder
          icon={<BlockIcon icon={galleryIcon} />}
          labels={{
            title: !images?.length ? __('Slideshow') : __('Edit Slideshow'),
            instructions: __(
              'Select images or upload new ones from your library.',
            ),
          }}
          onSelect={onSelectImages}
          accept="image/*"
          allowedTypes={['image']}
          value={images}
          multiple
        />
      </div>
    );
  }

  return (
    <Fragment>
      <div
        id={id}
        className={className}
        style={{
          ...style,
          color: arrowsColor,
        }}
      >
        <SlickSlider
          dots={dotNav}
          arrows={arrowNav}
          infinite={infinite}
          autoplay={autoplay}
          autoplaySpeed={autoplaySpeed}
          slidesToShow={slidesToShow}
          slidesToScroll={slidesToScroll}
          speed={speed}
          pauseOnHover={pauseOnHover}
          fade={animationStyle === 'fade'}
          className="wp-block-gutenbee-slideshow-slider"
          customPaging={() => <button style={{ backgroundColor: dotsColor }} />}
        >
          {images.map(image => {
            return (
              <div key={image?.id} className="wp-block-gutenbee-slideshow-item">
                <img src={image.url} alt={image.alt} />
              </div>
            );
          })}
        </SlickSlider>
      </div>

      {isSelected && (
        <Fragment>
          <BlockControls key="slideshow-controls">
            {!!images.length && (
              <Toolbar>
                <MediaUpload
                  onSelect={onSelectImages}
                  allowedTypes={['image']}
                  multiple
                  gallery
                  value={images.map(img => img.id)}
                  render={({ open }) => (
                    <Button
                      className="components-toolbar__control"
                      label={__('Edit Slideshow')}
                      icon="edit"
                      onClick={open}
                    />
                  )}
                />
              </Toolbar>
            )}
          </BlockControls>
          {children}
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
                  />
                )}
              </PanelBody>
            )}
          </InspectorControls>
        </Fragment>
      )}
    </Fragment>
  );
};

Slideshow.propTypes = propTypes;

export default withSelect((select, props) => {
  const { getMedia } = select('core');
  const imageIds = props.attributes.images.map(({ id }) => id);

  return {
    images: imageIds.length
      ? imageIds.map(id => {
          const image = getMedia(id);

          return {
            id,
            sizes: image && image.media_details.sizes,
          };
        })
      : null,
  };
})(Slideshow);
