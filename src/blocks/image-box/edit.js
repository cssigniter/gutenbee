import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
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
import TextControls from '../../components/controls/text-controls/TextControls';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import MarginControls from '../../components/controls/margin-controls';

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

  setActiveEditable = editable => {
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
      titleNodeLevel,
      titleFontSize,
      textContent,
      textFontSize,
      url,
      alt,
      id,
      imageAlign,
      imageWidth,
      contentAlign,
      blockMargin,
      imageMargin,
    } = attributes;

    const availableSizes = image && image.media_details.sizes;

    return (
      <Fragment>
        <div
          className={classNames({
            [className]: true,
            [`${className}-align-${imageAlign}`]: true,
            [`${className}-content-align-${contentAlign}`]: !!contentAlign,
          })}
          style={{
            margin: getMarginSettingStyles(blockMargin),
          }}
        >
          <figure
            className={`${className}-figure`}
            style={{ margin: getMarginSettingStyles(imageMargin) }}
          >
            {url ? (
              <img
                src={url}
                alt={alt}
                style={{
                  width: imageWidth ? `${imageWidth}px` : undefined,
                }}
              />
            ) : (
              <ImagePlaceholder
                icon="format-image"
                label={__('Image')}
                onSelectImage={uploadedImage => {
                  setAttributes({
                    id: uploadedImage.id,
                    url: uploadedImage.url,
                    alt: uploadedImage.alt,
                  });
                }}
                style={{
                  width: imageWidth ? `${imageWidth}px` : undefined,
                }}
              />
            )}
          </figure>

          <div className={`${className}-content`}>
            <RichText
              tagName={`h${titleNodeLevel}`}
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
              isSelected={isSelected && editable === 'text'}
              onFocus={() => this.setActiveEditable('text')}
              style={{
                fontSize: textFontSize ? `${textFontSize}px` : undefined,
              }}
            />
          </div>
        </div>

        {isSelected && (
          <Fragment>
            <BlockControls>
              <MediaUpload
                onSelect={uploadedImage => {
                  setAttributes({
                    id: uploadedImage.id,
                    url: uploadedImage.url,
                    alt: uploadedImage.alt,
                  });
                }}
                allowedTypes={['image']}
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
                  onChange={value =>
                    setAttributes({ imageAlign: value || 'left' })
                  }
                />

                {availableSizes && (
                  <SelectControl
                    label={__('Source Size')}
                    value={url}
                    options={Object.keys(availableSizes).map(name => ({
                      value: availableSizes[name].source_url,
                      label: startCase(name),
                    }))}
                    onChange={newImageUrl => {
                      setAttributes({ url: newImageUrl });
                    }}
                  />
                )}

                <RangeControl
                  className="range-control-size"
                  label={__('Image Width')}
                  value={imageWidth}
                  initialPosition={160}
                  onChange={value => {
                    setAttributes({ imageWidth: value });
                  }}
                  min={10}
                  max={1000}
                  beforeIcon="format-image"
                  afterIcon="format-image"
                />

                <MarginControls
                  attributeKey="imageMargin"
                  attributes={attributes}
                  setAttributes={setAttributes}
                  label={__('Image Margin')}
                />
              </PanelBody>

              <PanelBody title={__('Title Settings')} initialOpen={false}>
                <p>{__('Heading element')}</p>
                <Toolbar
                  controls={'23456'
                    .split('')
                    .map(Number)
                    .map(controlLevel => ({
                      icon: 'heading',
                      title: sprintf(__('Heading %s'), controlLevel),
                      isActive: controlLevel === titleNodeLevel,
                      onClick: () =>
                        setAttributes({ titleNodeLevel: controlLevel }),
                      subscript: controlLevel,
                    }))}
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

              <PanelBody title={__('Appearance')} initialOpen={false}>
                <MarginControls
                  attributeKey="blockMargin"
                  attributes={attributes}
                  setAttributes={setAttributes}
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
