import PropTypes from 'prop-types';
import { compose } from 'wp.element';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  scrollwheel: PropTypes.bool.isRequired,
  styles: PropTypes.array,
  infoWindow: PropTypes.string,
};

const Map = ({
  latitude,
  longitude,
  zoom,
  preventScroll,
  styles,
  infoWindow,
}) => {
  const position = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  return (
    <GoogleMap
      zoom={zoom}
      center={position}
      options={{
        styles,
        scrollwheel: !preventScroll,
      }}
    >
      <Marker
        position={position}
      >
        {infoWindow && (
          <InfoWindow>
            <span>{infoWindow}</span>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  );
};

Map.propTypes = propTypes;

export default compose(
  withScriptjs,
  withGoogleMap,
)(Map);
