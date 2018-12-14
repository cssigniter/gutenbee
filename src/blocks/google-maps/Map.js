import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
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
  icon: PropTypes.string,
};

const Map = ({
  latitude,
  longitude,
  zoom,
  preventScroll,
  styles,
  infoWindow,
  icon,
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
      <Marker position={position} icon={icon}>
        {infoWindow && (
          <InfoWindow
            options={{
              maxWidth: 350,
            }}
          >
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
