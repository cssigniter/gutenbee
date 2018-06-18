import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  InspectorControls,
  MediaUpload,
} from 'wp.editor';
import {
  IconButton,
  RangeControl,
  PanelBody,
} from 'wp.components';

import ImagePlaceholder from '../../components/image-placeholder/ImagePlaceholder';

class ImageComparisonEdit extends Component {
  static propTypes = {
    attributes: PropTypes.shape({
      idA: PropTypes.number,
      urlA: PropTypes.string,
      idB: PropTypes.number,
      urlB: PropTypes.string,
      offset: PropTypes.number,
    }),
    className: PropTypes.string.isRequired,
    setAttributes: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
  };

  render() {
    const {
      className,
      attributes,
      setAttributes,
      isSelected,
    } = this.props;

    const {
      urlA,
      idA,
      urlB,
      idB,
      offset,
    } = attributes;

    return (
      <Fragment>
        <div className={className}>
          <div className={`${className}-pane`}>
            {urlA && idA ? (
              <figure className={`${className}-figure`}>
                <img src={urlA} alt="" />

                <MediaUpload
                  onSelect={(uploadedImage) => {
                    setAttributes({
                      idA: uploadedImage.id,
                      urlA: uploadedImage.url,
                    });
                  }}
                  type="image"
                  value={idA}
                  render={({ open }) => (
                    <IconButton
                      className="components-toolbar__control"
                      label={__('Edit Image')}
                      icon="format-image"
                      onClick={open}
                    />
                  )}
                />
              </figure>
            ) : (
              <ImagePlaceholder
                icon="format-image"
                label={__('Image A')}
                onSelectImage={(uploadedImage) => {
                  setAttributes({
                    idA: uploadedImage.id,
                    urlA: uploadedImage.url,
                  });
                }}
              />
            )}
          </div>

          <div className={`${className}-pane`}>
            {urlB && idB ? (
              <figure className={`${className}-figure`}>
                <img src={urlB} alt="" />

                <MediaUpload
                  onSelect={(uploadedImage) => {
                    setAttributes({
                      idB: uploadedImage.id,
                      urlB: uploadedImage.url,
                    });
                  }}
                  type="image"
                  value={idB}
                  render={({ open }) => (
                    <IconButton
                      className="components-toolbar__control"
                      label={__('Edit Image')}
                      icon="format-image"
                      onClick={open}
                    />
                  )}
                />
              </figure>
            ) : (
              <ImagePlaceholder
                icon="format-image"
                label={__('Image B')}
                onSelectImage={(uploadedImage) => {
                  setAttributes({
                    idB: uploadedImage.id,
                    urlB: uploadedImage.url,
                  });
                }}
              />
            )}
          </div>
        </div>

        {isSelected && (
          <InspectorControls>
            <PanelBody>
              <RangeControl
                label={__('Default Offset')}
                min={1}
                max={100}
                value={offset}
                onChange={value => setAttributes({ offset: value })}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  }
}

export default ImageComparisonEdit;
