import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  PanelBody,
  ToggleControl,
  RangeControl,
  TextControl,
  SelectControl,
  TextareaControl,
  Notice,
  Button,
} from 'wp.components';
import { InspectorControls, MediaUpload, useBlockProps } from 'wp.blockEditor';
import get from 'lodash.get';

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
import { isGoogleMapsApiLoaded } from './helpers';
import AnimationControls from '../../components/controls/animation-controls/AnimationControls';

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
  setAttributes,
  clientId,
}) => {
  const {
    uniqueId,
    latitude,
    longitude,
    zoom,
    height,
    preventScroll,
    styleId,
    infoWindow,
    markerImageUrl,
    markerImageId,
    mapId,
    backgroundColor,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const apiKey = get(window, '__GUTENBEE_SETTINGS__.google_maps_api_key');
  const blockId = getBlockId(uniqueId);

  // Determine re-initialization key to force remount when mapId or colorScheme changes.
  // We force Advanced Usage which requires mapId.
  const reinitKey = `${mapId || 'DEMO_MAP_ID'}-${attributes.colorScheme}`;

  const predefinedMapStyle = mapStyles.find(({ id }) => id === styleId);
  const mapStyle = get(predefinedMapStyle, 'style');

  const blockProps = useBlockProps({
    className: blockId,
    style: {
      backgroundColor: backgroundColor || undefined,
      ...getBorderCSSValue({ attributes }),
      ...getBoxShadowCSSValue({ attributes }),
    },
  });

  return (
    <Fragment>
      <div {...blockProps}>
        <GoogleMapsStyle attributes={attributes} />
        {isGoogleMapsApiLoaded() || apiKey ? (
          <Map
            key={reinitKey}
            googleMapURL={
              apiKey && !isGoogleMapsApiLoaded()
                ? `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=marker`
                : undefined
            }
            style={{
              height: '100%',
            }}
            styles={mapStyle}
            latitude={latitude}
            longitude={longitude}
            zoom={zoom}
            preventScroll={preventScroll}
            infoWindow={infoWindow}
            icon={markerImageUrl}
            mapId={mapId || 'DEMO_MAP_ID'}
            colorScheme={attributes.colorScheme}
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
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />

            <TextControl
              label={__('Longitude')}
              type="number"
              value={longitude}
              onChange={value => setAttributes({ longitude: value })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />

            <RangeControl
              label={__('Zoom')}
              min={0}
              max={20}
              value={zoom}
              onChange={value => setAttributes({ zoom: value })}
              step={1}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
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
                  __nextHasNoMarginBottom
                  __next40pxDefaultSize
                />
              )}
            </ResponsiveControl>

            <ToggleControl
              label={__('Prevent Scroll')}
              checked={preventScroll}
              onChange={value => setAttributes({ preventScroll: value })}
              __nextHasNoMarginBottom
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
                    variant="secondary"
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
              __nextHasNoMarginBottom
            />
          </PanelBody>

          <PanelBody title={__('Map Appearance')} initialOpen={false}>
            <SelectControl
              label={__('Color Scheme')}
              value={attributes.colorScheme}
              options={[
                { value: 'FOLLOW_SYSTEM', label: __('Follow System') },
                { value: 'LIGHT', label: __('Light') },
                { value: 'DARK', label: __('Dark') },
              ]}
              onChange={value => setAttributes({ colorScheme: value })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
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
              help={__(
                'Select a JSON style for the map. This works alongside Advanced Markers.',
              )}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />

            <TextControl
              label={__('Map ID')}
              value={mapId}
              onChange={value => setAttributes({ mapId: value })}
              help={__(
                'Enter your Google Maps Map ID from Google Cloud Console.',
              )}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
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

          {__GUTENBEE_SETTINGS__.plugin.settings[
            'active_animation-controls'
          ] && (
              <PanelBody
                icon={!!attributes.animation?.type && 'saved'}
                title={__('Animation')}
                initialOpen={false}
              >
                <AnimationControls
                  attributes={attributes.animation}
                  setAttributes={setAttributes}
                />
              </PanelBody>
            )}
        </InspectorControls>
      )}
    </Fragment>
  );
};

GoogleMapsEdit.propTypes = propTypes;

export default GoogleMapsEdit;
