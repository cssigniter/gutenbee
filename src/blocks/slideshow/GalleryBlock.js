import { Component, Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  IconButton,
  ToggleControl,
  RangeControl,
  RadioControl,
  Toolbar,
  PanelBody,
  SelectControl,
} from 'wp.components';
import {
  MediaUpload,
  InspectorControls,
  BlockControls,
  ColorPalette,
} from 'wp.editor';
import { withSelect } from 'wp.data';
import startCase from 'lodash.startcase';

import ImagePlaceholder from '../../components/image-placeholder/ImagePlaceholder';
import GalleryImage from './GalleryImage';
import { LINKTO } from './constants';

class GalleryBlock extends Component {
  state = {
    selectedImage: null,
  };

  onSelectImage = index => () => {
    if (this.state.selectedImage !== index) {
      this.setState({
        selectedImage: index,
      });
    }
  };

  onRemoveImage = index => () => {
    const images = this.props.attributes.images.filter((img, i) => index !== i);

    this.setState({ selectedImage: null });
    this.props.setAttributes({
      images,
    });
  };

  onSelectImages = (images) => {
    this.props.setAttributes({
      images: images.map(attributes => ({
        ...attributes,
        caption: attributes.caption ? [attributes.caption] : [],
      })),
    });
  };

  setImageAttributes = (index, attributes) => {
    const { attributes: { images }, setAttributes } = this.props;

    if (!images[index]) {
      return;
    }

    setAttributes({
      images: [
        ...images.slice(0, index),
        {
          ...images[index],
          ...attributes,
        },
        ...images.slice(index + 1),
      ],
    });
  };

  componentWillReceiveProps(nextProps) {
    // Deselect images when deselecting the block
    if (!nextProps.isSelected && this.props.isSelected) {
      this.setState({
        selectedImage: null,
      });
    }
  }

  updateImageURLs = (newSize) => {
    const {
      setAttributes,
      attributes,
      images: propImages,
    } = this.props;
    const { images } = attributes;

    setAttributes({
      size: newSize,
      images: images.map(image => ({
        ...image,
        url: propImages.find(({ id }) => image.id === id).sizes[newSize].source_url,
      })),
    });
  };

  render() {
    const {
      attributes,
      isSelected,
      className,
      setAttributes,
      images: propImages,
    } = this.props;
    const {
      images,
      arrowNav,
      dotNav,
      autoplay,
      animationStyle,
      infinite,
      speed,
      autoplaySpeed,
      color,
      linkTo,
      size,
    } = attributes;

    const [availableSizes] = propImages || [];

    const controls = (
      isSelected && (
        <BlockControls key="controls">
          {!!images.length && (
            <Toolbar>
              <MediaUpload
                onSelect={this.onSelectImages}
                type="image"
                multiple
                gallery
                value={images.map(img => img.id)}
                render={({ open }) => (
                  <IconButton
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
      )
    );

    if (images.length === 0) {
      return (
        <Fragment>
          {controls}
          <ImagePlaceholder
            className={className}
            icon="format-gallery"
            label={__('Slideshow')}
            onSelectImage={this.onSelectImages}
            multiple
          />
        </Fragment>
      );
    }

    return (
      <Fragment>
        {controls}
        {isSelected && (
          <InspectorControls>
            <h2>{__('Slideshow Settings')}</h2>
            <ToggleControl
              label={__('Autoplay')}
              checked={autoplay}
              onChange={() => {
                setAttributes({ autoplay: !autoplay });
              }}
            />
            <ToggleControl
              label={__('Infinite Slide')}
              checked={infinite}
              onChange={() => {
                setAttributes({ infinite: !infinite });
              }}
            />
            <ToggleControl
              label={__('Arrow Navigation')}
              checked={arrowNav}
              onChange={() => {
                setAttributes({ arrowNav: !arrowNav });
              }}
            />
            <ToggleControl
              label={__('Dot Navigation')}
              checked={dotNav}
              onChange={() => {
                setAttributes({ dotNav: !dotNav });
              }}
            />
            <SelectControl
              label={__('Link to')}
              value={linkTo}
              onChange={(value) => {
                setAttributes({ linkTo: value });
              }}
              options={[
                { value: LINKTO.ATTACHMENT, label: __('Attachment Page') },
                { value: LINKTO.MEDIA, label: __('Media File') },
                { value: LINKTO.NONE, label: __('None') },
              ]}
            />

            {availableSizes && availableSizes.sizes && (
              <SelectControl
                label={__('Image Size')}
                value={size}
                options={Object.keys(availableSizes.sizes).map(name => ({
                  value: name,
                  label: startCase(name),
                }))}
                onChange={this.updateImageURLs}
              />
            )}

            <h2>{__('Animation Settings')}</h2>
            <RadioControl
              label="Animation Style"
              selected={animationStyle}
              options={[
                { label: 'Fade', value: 'fade' },
                { label: 'Slide', value: 'slide' },
              ]}
              onChange={(value) => {
                setAttributes({ animationStyle: value });
              }}
            />
            <RangeControl
              label="Animation Speed (ms)"
              min={50}
              max={5000}
              value={speed}
              onChange={(value) => {
                setAttributes({ speed: value });
              }}
              step={10}
            />
            <RangeControl
              label="Autoplay Speed (ms)"
              min={500}
              max={10000}
              value={autoplaySpeed}
              onChange={(value) => {
                setAttributes({ autoplaySpeed: value });
              }}
              step={10}
            />

            <PanelBody title={__('Arrow and Dots Color')}>
              <ColorPalette
                value={color}
                onChange={value => setAttributes({ color: value })}
              />
            </PanelBody>
          </InspectorControls>
        )}

        <div className={className}>
          {images.map((img, index) => (
            <div
              key={img.id || img.url}
              className="gutenbee-gallery-item blocks-gallery-item"
            >
              <GalleryImage
                url={img.url}
                alt={img.alt}
                id={img.id}
                isSelected={isSelected && this.state.selectedImage === index}
                onRemove={this.onRemoveImage(index)}
                onSelect={this.onSelectImage(index)}
                setAttributes={attrs => this.setImageAttributes(index, attrs)}
                caption={img.caption}
              />
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default withSelect((select, props) => {
  const { getMedia } = select('core');
  const imageIds = props.attributes.images.map(({ id }) => id);

  return {
    images: imageIds.length
      ? imageIds.map((id) => {
        const image = getMedia(id);

        return {
          id,
          sizes: image && image.media_details.sizes,
        };
      })
      : null,
  };
})(GalleryBlock);
