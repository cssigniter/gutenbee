import { Component, Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { mediaUpload } from 'wp.utils';
import {
  IconButton,
  ToggleControl,
  RangeControl,
  RadioControl,
  Toolbar,
} from 'wp.components';
import {
  MediaUpload,
  InspectorControls,
  BlockControls,
} from 'wp.blocks';

import ImagePlaceholder from '../../components/image-placeholder/ImagePlaceholder';
import GalleryImage from './GalleryImage';

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

  addFiles = (files) => {
    const currentImages = this.props.attributes.images || [];
    const { setAttributes } = this.props;

    mediaUpload(
      files,
      (images) => {
        setAttributes({
          images: [...currentImages, ...images],
        });
      },
    );
  };

  componentWillReceiveProps(nextProps) {
    // Deselect images when deselecting the block
    if (!nextProps.isSelected && this.props.isSelected) {
      this.setState({
        selectedImage: null,
      });
    }
  }

  render() {
    const {
      attributes,
      isSelected,
      className,
      setAttributes,
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
    } = attributes;

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

export default GalleryBlock;
