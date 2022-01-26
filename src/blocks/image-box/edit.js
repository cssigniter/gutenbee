import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
import { __ } from 'wp.i18n';
import classNames from 'classnames';
import {
  InspectorControls,
  BlockControls,
  RichText,
  MediaUpload,
  AlignmentToolbar,
} from 'wp.blockEditor';
import {
  PanelBody,
  Button,
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
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

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
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const availableSizes = image && image.media_details.sizes;
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <ImageBoxStyle attributes={attributes} />
      <div
        id={blockId}
        className={classNames(className, blockId, {
          [`wp-block-gutenbee-imagebox-align-${imageAlign}`]: true,
          [`wp-block-gutenbee-imagebox-content-align-${contentAlign}`]: !!contentAlign,
        })}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <figure className="wp-block-gutenbee-imagebox-figure">
          {url ? (
            <img src={url} alt={alt} />
          ) : (
            <ImagePlaceholder
              icon="format-image"
              label={__('Image')}
              style={{
                width: imageWidth.desktop
                  ? `${imageWidth.desktop}px`
                  : undefined,
              }}
              onSelectImage={uploadedImage => {
                setAttributes({
                  id: uploadedImage.id,
                  url: uploadedImage.url,
                  alt: uploadedImage.alt,
                });
              }}
            />
          )}
        </figure>

        <div className="wp-block-gutenbee-imagebox-content">
          <RichText
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            onChange={value => setAttributes({ titleContent: value })}
            className="wp-block-gutenbee-imagebox-title"
            placeholder={__('Write heading…')}
            style={{
              color: titleColor || undefined,
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
            className="wp-block-gutenbee-imagebox-text"
            placeholder={__('Write content…')}
            style={{
              color: textColor || undefined,
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
                  <Button
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

              <ResponsiveControl>
                {breakpoint => (
                  <RangeControl
                    className="range-control-size"
                    label={__('Image Width')}
                    value={imageWidth[breakpoint]}
                    onChange={value =>
                      setAttributes({
                        imageWidth: {
                          ...imageWidth,
                          [breakpoint]: value || '',
                        },
                      })
                    }
                    allowReset
                    min={10}
                    max={2000}
                    beforeIcon="format-image"
                    afterIcon="format-image"
                  />
                )}
              </ResponsiveControl>

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
                value={contentAlign}
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

              <ResponsiveControl>
                {breakpoint => (
                  <FontSizePickerLabel
                    value={titleFontSize[breakpoint]}
                    label={__('Heading Font Size')}
                    onChange={value =>
                      setAttributes({
                        titleFontSize: {
                          ...titleFontSize,
                          [breakpoint]: value || '',
                        },
                      })
                    }
                  />
                )}
              </ResponsiveControl>

              <RangeControl
                label={__('Heading Bottom Margin')}
                value={titleBottomSpacing}
                onChange={value => {
                  setAttributes({
                    titleBottomSpacing: value != null ? value : undefined,
                  });
                }}
                allowReset
                min={0}
                max={200}
              />

              <ResponsiveControl>
                {breakpoint => (
                  <FontSizePickerLabel
                    value={textFontSize[breakpoint]}
                    label={__('Text Font Size')}
                    onChange={value =>
                      setAttributes({
                        textFontSize: {
                          ...textFontSize,
                          [breakpoint]: value || '',
                        },
                      })
                    }
                  />
                )}
              </ResponsiveControl>
            </PanelBody>

            <PanelBody title={__('Block Appearance')} initialOpen={false}>
              <PopoverColorControl
                label={__('Title Color')}
                value={titleColor || ''}
                defaultValue={titleColor || ''}
                onChange={value => setAttributes({ titleColor: value })}
              />

              <PopoverColorControl
                label={__('Content Text Color')}
                value={textColor || ''}
                defaultValue={textColor || ''}
                onChange={value => setAttributes({ textColor: value })}
              />

              <PopoverColorControl
                label={__('Block Background Color')}
                value={backgroundColor || ''}
                defaultValue={backgroundColor || ''}
                onChange={value => setAttributes({ backgroundColor: value })}
              />

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
            </PanelBody>

            <PanelBody title={__('Visibility Settings')} initialOpen={false}>
              <BreakpointVisibilityControl
                values={blockBreakpointVisibility}
                onChange={values => {
                  setAttributes({
                    blockBreakpointVisibility: values,
                  });
                }}
              />

              <AuthVisibilityControl
                values={blockAuthVisibility}
                onChange={values => {
                  setAttributes({
                    blockAuthVisibility: values,
                  });
                }}
              />
            </PanelBody>
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
