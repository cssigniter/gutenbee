import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
import { __ } from 'wp.i18n';
import { InspectorControls, MediaUpload } from 'wp.blockEditor';
import { Button, RangeControl, SelectControl, PanelBody } from 'wp.components';
import { withSelect } from 'wp.data';
import startCase from 'lodash.startcase';
import get from 'lodash.get';
import classNames from 'classnames';

import ImagePlaceholder from '../../components/image-placeholder/ImagePlaceholder';
import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import ImageComparisonStyle from './style';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const propTypes = {
  attributes: PropTypes.shape({
    uniaueId: PropTypes.string,
    idA: PropTypes.number,
    urlA: PropTypes.string,
    idB: PropTypes.number,
    urlB: PropTypes.string,
    offset: PropTypes.number,
    blockMargin: PropTypes.object,
    blockPadding: PropTypes.object,
    backgroundColor: PropTypes.string,
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
  clientId: PropTypes.string.isRequired,
};

const ImageComparisonEdit = ({
  className,
  attributes,
  setAttributes,
  isSelected,
  imageA,
  imageB,
  clientId,
}) => {
  const {
    uniqueId,
    urlA,
    idA,
    urlB,
    idB,
    offset,
    backgroundColor,
    imageSize,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;
  const availableSizes = get(imageA, 'media_details.sizes');

  useUniqueId({ attributes, setAttributes, clientId });

  const onSetImageSize = size => {
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

  const getImageAttributes = image => {
    const url = get(image, `sizes[${imageSize}].url`, image.url);

    return { url, id: image.id };
  };

  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
        )}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <ImageComparisonStyle attributes={attributes} />
        <div className="wp-block-gutenbee-image-comparison-pane">
          {urlA && idA ? (
            <figure className="wp-block-gutenbee-image-comparison-figure">
              <img src={urlA} alt="" />

              <MediaUpload
                onSelect={image => {
                  const { id, url } = getImageAttributes(image);

                  setAttributes({
                    idA: id,
                    urlA: url,
                  });
                }}
                allowedTypes={['image']}
                value={idA}
                render={({ open }) => (
                  <Button
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
                const { id, url } = getImageAttributes(image);

                setAttributes({
                  idA: id,
                  urlA: url,
                });
              }}
            />
          )}
        </div>

        <div className="wp-block-gutenbee-image-comparison-pane">
          {urlB && idB ? (
            <figure className="wp-block-gutenbee-image-comparison-figure">
              <img src={urlB} alt="" />

              <MediaUpload
                onSelect={image => {
                  const { id, url } = getImageAttributes(image);

                  setAttributes({
                    idB: id,
                    urlB: url,
                  });
                }}
                allowedTypes={['image']}
                value={idB}
                render={({ open }) => (
                  <Button
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
                const { id, url } = getImageAttributes(image);

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
              allowReset
            />

            {imageA && imageB && availableSizes && (
              <SelectControl
                label={__('Source Image Size')}
                value={imageSize}
                options={Object.keys(availableSizes).map(name => {
                  const size = availableSizes[name];

                  return {
                    value: name,
                    label: `${startCase(name)} - ${size.width}×${size.height}`,
                  };
                })}
                onChange={onSetImageSize}
              />
            )}
          </PanelBody>

          <PanelBody title={__('Block Appearance')} initialOpen={false}>
            <PopoverColorControl
              label={__('Background Color')}
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
      )}
    </Fragment>
  );
};

ImageComparisonEdit.propTypes = propTypes;

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
