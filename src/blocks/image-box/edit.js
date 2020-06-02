import { Fragment, useState } from 'wp.element';
import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
import { __ } from 'wp.i18n';
import classNames from 'classnames';
import {
  InspectorControls,
  BlockControls,
  RichText,
  MediaUpload,
  PanelColorSettings,
  AlignmentToolbar,
} from 'wp.blockEditor';
import {
  PanelBody,
  IconButton,
  SelectControl,
  RangeControl,
  Toolbar,
} from 'wp.components';
import { withSelect } from 'wp.data';
import startCase from 'lodash.startcase';

import ImagePlaceholder from '../../components/image-placeholder/ImagePlaceholder';
import { capitalize } from '../../util/text';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ImageBoxStyle from './style';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../components/controls/margin-controls';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import BorderControls from '../../components/controls/border-controls';
import HeadingToolbar from '../heading/heading-toolbar';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';

const propTypes = {
  className: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  image: PropTypes.object,
  clientId: PropTypes.string.isRequired,
};

const ImageBoxEditBlock = ({
  className,
  attributes,
  setAttributes,
  isSelected,
  image,
  clientId,
}) => {
  const [editable, setActiveEditable] = useState(null);
  const {
    uniqueId,
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
    titleBottomSpacing,
    textColor,
    titleColor,
    backgroundColor,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const availableSizes = image && image.media_details.sizes;
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <ImageBoxStyle attributes={attributes} />
      <div
        id={blockId}
        className={classNames({
          [className]: true,
          [`${className}-align-${imageAlign}`]: true,
          [`${className}-content-align-${contentAlign}`]: !!contentAlign,
        })}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <figure className={`${className}-figure`}>
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
            onFocus={() => setActiveEditable('title')}
            style={{
              color: titleColor || undefined,
              fontSize: titleFontSize ? `${titleFontSize}px` : undefined,
              marginBottom:
                titleBottomSpacing != null
                  ? `${titleBottomSpacing}px`
                  : undefined,
            }}
          />

          <RichText
            tagName="p"
            value={textContent}
            onChange={value => setAttributes({ textContent: value })}
            className={`${className}-text`}
            placeholder={__('Write content…')}
            isSelected={isSelected && editable === 'text'}
            onFocus={() => setActiveEditable('text')}
            style={{
              color: textColor || undefined,
              fontSize: textFontSize ? `${textFontSize}px` : undefined,
            }}
          />
        </div>
      </div>

      {isSelected && (
        <Fragment>
          <BlockControls>
            <Toolbar>
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
            </Toolbar>
          </BlockControls>

          <InspectorControls>
            <PanelBody title={__('Image Settings')} initialOpen={false}>
              <SelectControl
                label={__('Image Alignment')}
                value={imageAlign}
                options={['left', 'center', 'right'].map(option => ({
                  value: option,
                  label: capitalize(option),
                }))}
                onChange={value => {
                  setAttributes({ imageAlign: value });
                }}
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
                max={2000}
                beforeIcon="format-image"
                afterIcon="format-image"
              />

              <ResponsiveControl>
                {breakpoint => (
                  <MarginControls
                    label={__('Margin (px)')}
                    attributeKey="imageMargin"
                    attributes={attributes}
                    setAttributes={setAttributes}
                    breakpoint={breakpoint}
                  />
                )}
              </ResponsiveControl>
            </PanelBody>

            <PanelBody title={__('Content Settings')} initialOpen={false}>
              <AlignmentToolbar
                align={contentAlign}
                onChange={value => {
                  setAttributes({ contentAlign: value || undefined });
                }}
                isCollapsed={false}
              />

              <p>{__('Heading Element')}</p>
              <HeadingToolbar
                isCollapsed={false}
                minLevel={1}
                maxLevel={7}
                selectedLevel={titleNodeLevel}
                onChange={newLevel =>
                  setAttributes({ titleNodeLevel: newLevel })
                }
              />

              <FontSizePickerLabel
                value={titleFontSize}
                label={__('Heading Font Size')}
                onChange={value => setAttributes({ titleFontSize: value })}
              />

              <RangeControl
                label={__('Heading Bottom Margin')}
                value={titleBottomSpacing}
                onChange={value => {
                  setAttributes({
                    titleBottomSpacing: value != null ? value : undefined,
                  });
                }}
                min={0}
                max={200}
              />

              <FontSizePickerLabel
                value={textFontSize}
                label={__('Text Font Size')}
                onChange={value => setAttributes({ textFontSize: value })}
              />
            </PanelBody>

            <PanelColorSettings
              title={__('Block Appearance')}
              initialOpen={false}
              colorSettings={[
                {
                  value: titleColor,
                  onChange: value => setAttributes({ titleColor: value }),
                  label: __('Title Color'),
                },
                {
                  value: textColor,
                  onChange: value => setAttributes({ textColor: value }),
                  label: __('Content Text Color'),
                },
                {
                  value: backgroundColor,
                  onChange: value => setAttributes({ backgroundColor: value }),
                  label: __('Block Background Color'),
                },
              ]}
              onChange={value => setAttributes({ backgroundColor: value })}
            >
              <BorderControls
                attributes={attributes}
                setAttributes={setAttributes}
              />

              <BoxShadowControls
                attributes={attributes}
                setAttributes={setAttributes}
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
            </PanelColorSettings>
          </InspectorControls>
        </Fragment>
      )}
    </Fragment>
  );
};

ImageBoxEditBlock.propTypes = propTypes;

export default compose([
  withSelect((select, props) => {
    const { getMedia } = select('core');
    const { id } = props.attributes;

    return {
      image: id ? getMedia(id) : null,
    };
  }),
])(ImageBoxEditBlock);
