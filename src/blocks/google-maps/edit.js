import { Fragment, useState } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  PanelBody,
  ToggleControl,
  RangeControl,
  TextControl,
  SelectControl,
  TextareaControl,
  Spinner,
  Notice,
  Button,
} from 'wp.components';
import { InspectorControls, MediaUpload } from 'wp.blockEditor';
import get from 'lodash.get';
import classNames from 'classnames';

import Map from './Map';
import mapStyles from './map-styles';
import ImagePreview from '../../components/image-preview/ImagePreview';
import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import GoogleMapsStyle from './style';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BorderControls from '../../components/controls/border-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';

const propTypes = {
  attributes: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    preventScroll: PropTypes.bool.isRequired,
    styleId: PropTypes.array,
    infoWindow: PropTypes.string,
    customStyles: PropTypes.string,
    markerImageUrl: PropTypes.string,
    markerImageId: PropTypes.number,
    blockMargin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  setAttributes: PropTypes.func.isRequired,
};

const GoogleMapsEdit = ({
  attributes,
  isSelected,
  className,
  setAttributes,
  clientId,
}) => {
  const [customStylesError, setCustomStylesError] = useState('');
  const {
    uniqueId,
    latitude,
    longitude,
    zoom,
    height,
    preventScroll,
    styleId,
    infoWindow,
    customStyles,
    markerImageUrl,
    markerImageId,
    backgroundColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const onSetCustomStyles = customStyles => {
    setCustomStylesError('');
    setAttributes({ customStyles });

    try {
      JSON.parse(customStyles);
    } catch (error) {
      setCustomStylesError(
        'There was an error parsing your custom styles, please check them and try again.',
      );
    }
  };

  const getCustomStyles = () => {
    try {
      return JSON.parse(customStyles);
    } catch (error) {
      return undefined;
    }
  };

  const predefinedMapStyle = mapStyles.find(({ id }) => id === styleId);
  const mapStyle = customStyles
    ? getCustomStyles()
    : get(predefinedMapStyle, 'style');
  const apiKey = get(window, '__GUTENBEE_SETTINGS__.google_maps_api_key');
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div>
        <GoogleMapsStyle attributes={attributes} />
        {apiKey ? (
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
            loadingElement={
              <div
                className="wp-block-gutenbee-google-maps-loading"
                style={{ height: `${height.desktop}px` }}
              >
                <Spinner />
              </div>
            }
            containerElement={
              <div
                id={blockId}
                className={classNames(className, blockId)}
                style={{
                  backgroundColor: backgroundColor || undefined,
                  ...getBorderCSSValue({ attributes }),
                  ...getBoxShadowCSSValue({ attributes }),
                }}
              />
            }
            mapElement={<div style={{ height: '100%' }} />}
            latitude={latitude}
            longitude={longitude}
            zoom={zoom}
            preventScroll={preventScroll}
            styles={mapStyle}
            infoWindow={infoWindow}
            icon={markerImageUrl}
          />
        ) : (
          <Notice status="error" isDismissible={false}>
            {__(
              "The Google Maps block requires a valid Google Maps API key, please add one in GutenBee's settings page.",
            )}
          </Notice>
        )}
      </div>

      {isSelected && (
        <InspectorControls>
          <PanelBody>
            <TextControl
              label={__('Latitude')}
              type="number"
              value={latitude}
              onChange={value => setAttributes({ latitude: value })}
            />

            <TextControl
              label={__('Longitude')}
              type="number"
              value={longitude}
              onChange={value => setAttributes({ longitude: value })}
            />

            <RangeControl
              label={__('Zoom')}
              min={0}
              max={20}
              value={zoom}
              onChange={value => setAttributes({ zoom: value })}
              step={1}
            />

            <ResponsiveControl>
              {breakpoint => (
                <RangeControl
                  label={__('Height (px)')}
                  min={40}
                  max={1440}
                  value={height[breakpoint]}
                  onChange={value =>
                    setAttributes({
                      height: {
                        ...height,
                        [breakpoint]: value,
                      },
                    })
                  }
                  step={1}
                />
              )}
            </ResponsiveControl>

            <ToggleControl
              label={__('Prevent Scroll')}
              checked={preventScroll}
              onChange={value => setAttributes({ preventScroll: value })}
            />

            <SelectControl
              label={__('Map Style')}
              value={styleId}
              onChange={value => setAttributes({ styleId: value })}
              options={[
                { value: '', label: __('Default') },
                ...mapStyles.map(style => ({
                  value: style.id,
                  label: style.label,
                })),
              ]}
            />

            <p>{__('Custom Marker')}</p>
            {markerImageUrl && (
              <ImagePreview
                src={markerImageUrl}
                onDismiss={() =>
                  setAttributes({
                    markerImageId: null,
                    markerImageUrl: '',
                  })
                }
              />
            )}

            <MediaUpload
              onSelect={uploadedImage => {
                setAttributes({
                  markerImageId: uploadedImage.id,
                  markerImageUrl: uploadedImage.url,
                });
              }}
              allowedTypes={['image']}
              value={markerImageId}
              render={({ open }) => (
                <p>
                  <Button
                    onClick={open}
                    isDefault
                    style={{ width: '100%', display: 'block' }}
                  >
                    Upload Custom Marker
                  </Button>
                </p>
              )}
            />

            <TextareaControl
              label={__('Info Window Text')}
              value={infoWindow}
              onChange={value => setAttributes({ infoWindow: value })}
              help={__(
                'This text will appear as a popup on the map marker. Accepts basic HTML.',
              )}
            />
          </PanelBody>

          <PanelBody title={__('Map Appearance')} initialOpen={false}>
            {customStylesError && (
              <Notice status="error" isDismissible={false}>
                {customStylesError}
              </Notice>
            )}

            <TextareaControl
              label={__('Custom Snazzy Maps Styles')}
              value={customStyles}
              onChange={onSetCustomStyles}
              help={__(
                'This will override any predefined map styles selected above.',
              )}
            />
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

GoogleMapsEdit.propTypes = propTypes;

export default GoogleMapsEdit;
