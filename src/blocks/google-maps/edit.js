import { Component, Fragment } from 'wp.element';
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
import { InspectorControls, MediaUpload } from 'wp.editor';
import get from 'lodash.get';

import Map from './Map';
import mapStyles from './map-styles';
import ImagePreview from '../../components/image-preview/ImagePreview';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import MarginControls from '../../components/controls/margin-controls';

class GoogleMapsEdit extends Component {
  static propTypes = {
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

  state = {
    customStylesError: '',
  };

  onSetCustomStyles = customStyles => {
    const { setAttributes } = this.props;

    this.setState(() => ({ customStylesError: '' }));
    setAttributes({ customStyles });

    try {
      JSON.parse(customStyles);
    } catch (error) {
      this.setState(() => ({
        customStylesError:
          'There was an error parsing your custom styles, please check them and try again.',
      }));
    }
  };

  getCustomStyles = () => {
    const {
      attributes: { customStyles },
    } = this.props;

    try {
      return JSON.parse(customStyles);
    } catch (error) {
      return undefined;
    }
  };

  render() {
    const { customStylesError } = this.state;
    const { attributes, isSelected, className, setAttributes } = this.props;
    const {
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
      blockMargin,
    } = attributes;

    const predefinedMapStyle = mapStyles.find(({ id }) => id === styleId);
    const mapStyle = customStyles
      ? this.getCustomStyles()
      : get(predefinedMapStyle, 'style');
    const apiKey = get(window, '__GUTENBEE_SETTINGS__.google_maps_api_key');

    return (
      <Fragment>
        <div
          className={className}
          style={{
            margin: getMarginSettingStyles(blockMargin),
          }}
        >
          {apiKey ? (
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
              loadingElement={
                <div
                  className={`${className}-loading`}
                  style={{ height: `${height}px` }}
                >
                  <Spinner />
                </div>
              }
              containerElement={<div style={{ height: `${height}px` }} />}
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

              <RangeControl
                label={__('Height')}
                min={40}
                max={1440}
                value={height}
                onChange={value => setAttributes({ height: value })}
                step={10}
              />

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
                help={__('This text will appear as a popup on the map marker.')}
              />
            </PanelBody>

            <PanelBody title={__('Appearance')} initialOpen={false}>
              {customStylesError && (
                <Notice status="error" isDismissible={false}>
                  {customStylesError}
                </Notice>
              )}

              <TextareaControl
                label={__('Custom Snazzy Maps Styles')}
                value={customStyles}
                onChange={this.onSetCustomStyles}
                help={__(
                  'This will override any predefined map styles selected above.',
                )}
              />

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

export default GoogleMapsEdit;
