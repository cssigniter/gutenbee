import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
import { __ } from 'wp.i18n';
import { InspectorControls, MediaUpload } from 'wp.editor';
import {
  IconButton,
  RangeControl,
  SelectControl,
  PanelBody,
} from 'wp.components';
import { withSelect } from 'wp.data';
import startCase from 'lodash.startcase';
import get from 'lodash.get';

import ImagePlaceholder from '../../components/image-placeholder/ImagePlaceholder';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import MarginControls from '../../components/controls/margin-controls';

class ImageComparisonEdit extends Component {
  static propTypes = {
    attributes: PropTypes.shape({
      idA: PropTypes.number,
      urlA: PropTypes.string,
      idB: PropTypes.number,
      urlB: PropTypes.string,
      offset: PropTypes.number,
      blockMargin: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
      }),
      imageSize: PropTypes.string,
    }),
    className: PropTypes.string.isRequired,
    setAttributes: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    imageA: PropTypes.shape({
      media_details: PropTypes.shape({
        sizes: PropTypes.object,
      }),
    }),
    imageB: PropTypes.shape({
      media_details: PropTypes.shape({
        sizes: PropTypes.object,
      }),
    }),
  };

  onSetImageSize = size => {
    const { setAttributes, imageA, imageB, attributes } = this.props;
    const { urlA, urlB } = attributes;

    const imageASizes = get(imageA, 'media_details.sizes');
    const imageBSizes = get(imageB, 'media_details.sizes');
    const newUrlA = get(imageASizes[size], 'source_url', urlA);
    const newUrlB = get(imageBSizes[size], 'source_url', urlB);

    setAttributes({
      imageSize: size,
      urlA: newUrlA,
      urlB: newUrlB,
    });
  };

  getImageAttributes = image => {
    const { attributes } = this.props;
    const { imageSize } = attributes;
    const url = get(image, `sizes[${imageSize}].url`, image.url);

    return { url, id: image.id };
  };

  render() {
    const {
      className,
      attributes,
      setAttributes,
      isSelected,
      imageA,
      imageB,
    } = this.props;

    const { urlA, idA, urlB, idB, offset, blockMargin, imageSize } = attributes;

    const availableSizes = get(imageA, 'media_details.sizes');

    return (
      <Fragment>
        <div
          className={className}
          style={{
            margin: getMarginSettingStyles(blockMargin),
          }}
        >
          <div className={`${className}-pane`}>
            {urlA && idA ? (
              <figure className={`${className}-figure`}>
                <img src={urlA} alt="" />

                <MediaUpload
                  onSelect={image => {
                    const { id, url } = this.getImageAttributes(image);

                    setAttributes({
                      idA: id,
                      urlA: url,
                    });
                  }}
                  allowedTypes={['image']}
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
                onSelectImage={image => {
                  const { id, url } = this.getImageAttributes(image);

                  setAttributes({
                    idA: id,
                    urlA: url,
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
                  onSelect={image => {
                    const { id, url } = this.getImageAttributes(image);

                    setAttributes({
                      idB: id,
                      urlB: url,
                    });
                  }}
                  allowedTypes={['image']}
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
                onSelectImage={image => {
                  const { id, url } = this.getImageAttributes(image);

                  setAttributes({
                    idB: id,
                    urlB: url,
                  });
                }}
              />
            )}
          </div>
        </div>

        {isSelected && (
          <InspectorControls>
            <PanelBody title={__('Settings')} initialOpen>
              <RangeControl
                label={__('Default Offset')}
                min={1}
                max={100}
                value={offset}
                onChange={value => setAttributes({ offset: value })}
              />

              {imageA && imageB && availableSizes && (
                <SelectControl
                  label={__('Source Image Size')}
                  value={imageSize}
                  options={Object.keys(availableSizes).map(name => {
                    const size = availableSizes[name];

                    return {
                      value: name,
                      label: `${startCase(name)} - ${size.width}×${
                        size.height
                      }`,
                    };
                  })}
                  onChange={this.onSetImageSize}
                />
              )}
            </PanelBody>

            <PanelBody title={__('Appearance')} initialOpen={false}>
              <MarginControls
                attributeKey="blockMargin"
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select, props) => {
    const { getMedia } = select('core');
    const { idA, idB } = props.attributes;

    return {
      imageA: idA ? getMedia(idA) : null,
      imageB: idB ? getMedia(idB) : null,
    };
  }),
])(ImageComparisonEdit);
