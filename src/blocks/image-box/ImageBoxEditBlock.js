import { Component, Fragment, compose } from 'wp.element';
import PropTypes from 'prop-types';
import { __, sprintf } from 'wp.i18n';
import { Toolbar } from 'wp.components';
import classNames from 'classnames';
import {
  InspectorControls,
  BlockControls,
  RichText,
  MediaUpload,
  AlignmentToolbar,
} from 'wp.editor';
import {
  PanelBody,
  IconButton,
  SelectControl,
  RangeControl,
} from 'wp.components';
import { withSelect } from 'wp.data';
import startCase from 'lodash.startcase';

import ImagePlaceholder from '../../components/image-placeholder/ImagePlaceholder';
import TextControls from '../../components/controls/TextControls';

class ImageBoxEditBlock extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    attributes: PropTypes.object.isRequired,
    setAttributes: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
  };

  state = {
    editable: null,
  };

  setActiveEditable = (editable) => {
    this.setState(() => ({ editable }));
  };

  render() {
    const { editable } = this.state;
    const {
      className,
      attributes,
      setAttributes,
      isSelected,
      image,
    } = this.props;
    const {
      titleContent,
      titleNodeName,
      titleFontSize,
      textContent,
      textFontSize,
      url,
      alt,
      id,
      imageAlign,
      imageWidth,
      contentAlign,
    } = attributes;

    const availableSizes = image && image.media_details.sizes;

    return (
      <Fragment>
        {!url ? (
          <ImagePlaceholder
            icon="format-image"
            label={__('Image')}
            onSelectImage={(uploadedImage) => {
              setAttributes({
                id: uploadedImage.id,
                url: uploadedImage.url,
                alt: uploadedImage.alt,
              });
            }}
          />
        ) : (
          <div
            className={classNames({
              [className]: true,
              [`${className}-align-${imageAlign}`]: true,
              [`${className}-content-align-${contentAlign}`]: true,
            })}
          >
            <figure className={`${className}-figure`}>
              <img
                src={url}
                alt={alt}
                style={{
                  width: imageWidth ? `${imageWidth}px` : undefined,
                }}
              />
            </figure>

            <div className={`${className}-content`}>
              <RichText
                tagName={titleNodeName.toLowerCase()}
                value={titleContent}
                onChange={value => setAttributes({ titleContent: value })}
                className={`${className}-title`}
                placeholder={__('Write heading…')}
                isSelected={isSelected && editable === 'title'}
                onFocus={() => this.setActiveEditable('title')}
                style={{
                  fontSize: titleFontSize ? `${titleFontSize}px` : undefined,
                }}
              />

              <RichText
                tagName="p"
                value={textContent}
                onChange={value => setAttributes({ textContent: value })}
                className={`${className}-text`}
                placeholder={__('Write content…')}
                multiline="p"
                isSelected={isSelected && editable === 'text'}
                onFocus={() => this.setActiveEditable('text')}
                style={{
                  fontSize: textFontSize ? `${textFontSize}px` : undefined,
                }}
              />
            </div>
          </div>
        )}

        {isSelected && url && (
          <Fragment>
            <BlockControls>
              <MediaUpload
                onSelect={(uploadedImage) => {
                  setAttributes({
                    id: uploadedImage.id,
                    url: uploadedImage.url,
                    alt: uploadedImage.alt,
                  });
                }}
                type="image"
                value={id}
                render={({ open }) => (
                  <IconButton
                    className="components-toolbar__control"
                    label={__('Edit Image')}
                    icon="format-image"
                    onClick={open}
                  />
                )}
              />
            </BlockControls>
            <InspectorControls>
              <PanelBody title={__('Image Settings')} initialOpen={false}>
                <p>{__('Alignment')}</p>
                <AlignmentToolbar
                  value={imageAlign}
                  onChange={value => setAttributes({ imageAlign: value })}
                />

                {availableSizes && (
                  <SelectControl
                    label={__('Source Size')}
                    value={url}
                    options={Object.keys(availableSizes).map(name => ({
                      value: availableSizes[name].source_url,
                      label: startCase(name),
                    }))}
                    onChange={(newImageUrl) => {
                      setAttributes({ url: newImageUrl });
                    }}
                  />
                )}

                <RangeControl
                  className="range-control-size"
                  label={__('Image Width')}
                  value={imageWidth}
                  initialPosition={160}
                  onChange={(value) => {
                    setAttributes({ imageWidth: value });
                  }}
                  min={10}
                  max={1000}
                  beforeIcon="format-image"
                  afterIcon="format-image"
                />
              </PanelBody>

              <PanelBody title={__('Title Settings')} initialOpen={false}>
                <p>{__('Heading element')}</p>
                <Toolbar
                  controls={
                    '23456'.split('').map(level => ({
                      icon: 'heading',
                      title: sprintf(__('Heading %s'), level),
                      isActive: `H${level}` === titleNodeName,
                      onClick: () => setAttributes({ titleNodeName: `H${level}` }),
                      subscript: level,
                    }))
                  }
                />

                <TextControls
                  setAttributes={setAttributes}
                  attributeKey="title"
                  attributes={attributes}
                  defaultFontSize={null}
                />
              </PanelBody>

              <PanelBody title={__('Text Settings')} initialOpen={false}>
                <TextControls
                  setAttributes={setAttributes}
                  attributeKey="text"
                  attributes={attributes}
                />
              </PanelBody>

              <PanelBody title={__('Content Settings')} initialOpen={false}>
                <p>{__('Alignment')}</p>
                <AlignmentToolbar
                  value={contentAlign}
                  onChange={value => setAttributes({ contentAlign: value })}
                />
              </PanelBody>
            </InspectorControls>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default compose([
  withSelect((select, props) => {
    const { getMedia } = select('core');
    const { id } = props.attributes;

    return {
      image: id ? getMedia(id) : null,
    };
  }),
])(ImageBoxEditBlock);
