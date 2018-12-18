import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __, sprintf } from 'wp.i18n';
import { IconButton, Toolbar, PanelBody, SelectControl } from 'wp.components';
import { MediaUpload, InspectorControls, BlockControls } from 'wp.editor';
import { withSelect } from 'wp.data';
import startCase from 'lodash.startcase';
import classNames from 'classnames';

import ImagePlaceholder from '../../components/image-placeholder/ImagePlaceholder';
import GalleryItem from './GalleryItem';
import { LINKTO } from './constants';

class Gallery extends Component {
  static propTypes = {
    attributes: PropTypes.shape({
      size: PropTypes.string,
      linkTo: PropTypes.string,
      images: PropTypes.array.isRequired,
    }).isRequired,
    setAttributes: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    className: PropTypes.string,
    images: PropTypes.array,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    label: PropTypes.string.isRequired,
  };

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

  onSelectImages = images => {
    this.props.setAttributes({
      images: images.map(attributes => ({
        ...attributes,
        caption: attributes.caption ? [attributes.caption] : [],
      })),
    });
  };

  setImageAttributes = (index, attributes) => {
    const {
      attributes: { images },
      setAttributes,
    } = this.props;

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

  componentDidUpdate(prevProps) {
    // Deselect images when deselecting the block
    if (!this.props.isSelected && prevProps.isSelected) {
      this.setState({
        selectedImage: null,
      });
    }
  }

  updateImageURLs = newSize => {
    const { setAttributes, attributes, images: propImages } = this.props;
    const { images } = attributes;

    setAttributes({
      size: newSize,
      images: images.map(image => ({
        ...image,
        url: propImages.find(({ id }) => image.id === id).sizes[newSize]
          .source_url,
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
      children,
      label,
      style,
    } = this.props;
    const { images, linkTo, size } = attributes;

    const [availableSizes] = propImages || [];
    const galleryComponentClasses = classNames({
      'gutenbee-gallery-component': true,
      [className]: true,
    });

    const controls = isSelected && (
      <BlockControls key="controls">
        {!!images.length && (
          <Toolbar>
            <MediaUpload
              onSelect={this.onSelectImages}
              allowedTypes={['image']}
              multiple
              gallery
              value={images.map(img => img.id)}
              render={({ open }) => (
                <IconButton
                  className="components-toolbar__control"
                  label={sprintf(__('Edit %s'), label)}
                  icon="edit"
                  onClick={open}
                />
              )}
            />
          </Toolbar>
        )}
      </BlockControls>
    );

    if (images.length === 0) {
      return (
        <Fragment>
          {controls}
          <div style={style}>
            <ImagePlaceholder
              className={className}
              icon="format-gallery"
              label={label}
              onSelectImage={this.onSelectImages}
              multiple
            />
          </div>
        </Fragment>
      );
    }

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
                    onChange={this.updateImageURLs}
                  />
                )}
              </PanelBody>
            )}
          </InspectorControls>
        )}

        <div className={galleryComponentClasses} style={style}>
          {images.map((img, index) => (
            <div key={img.id || img.url} className="gutenbee-gallery-item">
              <GalleryItem
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
      ? imageIds.map(id => {
          const image = getMedia(id);

          return {
            id,
            sizes: image && image.media_details.sizes,
          };
        })
      : null,
  };
})(Gallery);
