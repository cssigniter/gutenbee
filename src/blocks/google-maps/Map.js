/* eslint-disable no-console */
import { useRef, useEffect, useState } from 'wp.element';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

// Track if the Google Maps script is being loaded or has been loaded
let googleMapsScriptLoading = false;
let googleMapsScriptLoaded = false;

// Cache for imported libraries to avoid re-registration warnings
let cachedLibraries = null;

const loadGoogleMapsLibraries = async () => {
  if (cachedLibraries) {
    return cachedLibraries;
  }

  const [mapsLib, coreLib, markerLib] = await Promise.all([
    window.google.maps.importLibrary('maps'),
    window.google.maps.importLibrary('core'),
    window.google.maps.importLibrary('marker'),
  ]);

  cachedLibraries = {
    Map: mapsLib.Map,
    ColorScheme: coreLib.ColorScheme,
    AdvancedMarkerElement: markerLib.AdvancedMarkerElement,
  };

  return cachedLibraries;
};

const propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  preventScroll: PropTypes.bool,
  styles: PropTypes.array,
  infoWindow: PropTypes.string,
  icon: PropTypes.string,
  mapId: PropTypes.string,
  googleMapURL: PropTypes.string,
  colorScheme: PropTypes.string,
};

const Map = ({
  latitude,
  longitude,
  zoom,
  preventScroll,
  infoWindow,
  icon,
  mapId,
  googleMapURL,
  colorScheme,
  id,
  className,
  style,
  styles,
}) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [markerInstance, setMarkerInstance] = useState(null);
  const [infoWindowInstance, setInfoWindowInstance] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(
    typeof window.google !== 'undefined' &&
      typeof window.google.maps !== 'undefined',
  );

  // Load Google Maps API
  useEffect(() => {
    if (apiLoaded || googleMapsScriptLoaded) {
      if (!apiLoaded) {
        setApiLoaded(true);
      }
      return;
    }

    if (
      typeof window.google !== 'undefined' &&
      typeof window.google.maps !== 'undefined'
    ) {
      googleMapsScriptLoaded = true;
      setApiLoaded(true);
      return;
    }

    // Check if script is already being loaded
    if (googleMapsScriptLoading) {
      // Wait for the script to load
      const checkInterval = setInterval(() => {
        if (
          typeof window.google !== 'undefined' &&
          typeof window.google.maps !== 'undefined'
        ) {
          clearInterval(checkInterval);
          googleMapsScriptLoaded = true;
          setApiLoaded(true);
        }
      }, 100);
      return;
    }

    // Check if the script tag already exists
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com/maps/api/js"]',
    );
    if (existingScript) {
      googleMapsScriptLoading = true;
      existingScript.addEventListener('load', () => {
        googleMapsScriptLoaded = true;
        setApiLoaded(true);
      });
      // If already loaded
      if (
        typeof window.google !== 'undefined' &&
        typeof window.google.maps !== 'undefined'
      ) {
        googleMapsScriptLoaded = true;
        setApiLoaded(true);
      }
      return;
    }

    if (googleMapURL) {
      googleMapsScriptLoading = true;
      const script = document.createElement('script');
      script.src = googleMapURL;
      script.async = false;
      script.defer = false;
      script.onload = () => {
        googleMapsScriptLoaded = true;
        googleMapsScriptLoading = false;
        setApiLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, [googleMapURL, apiLoaded]);

  // Initialize Map
  useEffect(() => {
    if (
      !apiLoaded ||
      !mapRef.current ||
      mapInstance ||
      typeof window.google === 'undefined' ||
      typeof window.google.maps === 'undefined' ||
      typeof window.google.maps.importLibrary !== 'function'
    ) {
      return;
    }

    const initMap = async () => {
      try {
        // Import Libraries (cached to avoid re-registration warnings)
        const {
          Map: GoogleMap,
          ColorScheme,
          AdvancedMarkerElement,
        } = await loadGoogleMapsLibraries();

        const location = {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        };

        // Google Maps API limitation: mapId and custom styles are mutually exclusive
        // - With mapId: Cannot set custom styles (must use Cloud Console)
        // - Without mapId: Can set custom styles, but AdvancedMarkerElement has limited features
        // Prioritize custom styles when provided
        const hasCustomStyles =
          styles && Array.isArray(styles) && styles.length > 0;

        // Resolve ColorScheme
        // data-color-scheme attribute values are: FOLLOW_SYSTEM, LIGHT, DARK
        let mapColorScheme = ColorScheme.FOLLOW_SYSTEM;
        if (colorScheme === 'LIGHT') {
          mapColorScheme = ColorScheme.LIGHT;
        } else if (colorScheme === 'DARK') {
          mapColorScheme = ColorScheme.DARK;
        }

        const mapOptions = {
          zoom,
          center: location,
          scrollwheel: !preventScroll,
          colorScheme: mapColorScheme,
        };

        // Only use mapId when NO custom styles are present
        if (!hasCustomStyles) {
          mapOptions.mapId = mapId || 'DEMO_MAP_ID';
        }

        // Apply custom styles when present (only works without mapId)
        if (hasCustomStyles) {
          mapOptions.styles = styles;
        }

        const map = new GoogleMap(mapRef.current, mapOptions);

        setMapInstance(map);

        // Create InfoWindow
        const infowindow = new window.google.maps.InfoWindow({
          content:
            '<div class="wp-block-gutenbee-google-maps-info-window">' +
            (infoWindow ? DOMPurify.sanitize(String(infoWindow)) : '') +
            '</div>',
          maxWidth: 350,
        });

        setInfoWindowInstance(infowindow);

        // Always use AdvancedMarkerElement
        let content = null;
        if (icon) {
          const img = document.createElement('img');
          img.src = icon;
          content = img;
        }

        const marker = new AdvancedMarkerElement({
          map,
          position: location,
          content,
        });

        setMarkerInstance(marker);

        // Add Click Listener
        marker.addEventListener('gmp-click', () => {
          if (infowindow.getContent()) {
            infowindow.open({
              anchor: marker,
              map,
            });
          }
        });
      } catch (error) {
        console.error('Error inside initMap:', error);
      }
    };

    initMap();
  }, [apiLoaded, mapInstance]); // Run once when API loads

  // Update Map Options
  useEffect(() => {
    if (!mapInstance) {
      return;
    }

    const updateMapOptions = async () => {
      const location = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      };

      // Google Maps API limitation: mapId and custom styles are mutually exclusive
      // - With mapId: Cannot set custom styles (must use Cloud Console)
      // - Without mapId: Can set custom styles, but AdvancedMarkerElement has limited features
      // Prioritize custom styles when provided
      const hasCustomStyles =
        styles && Array.isArray(styles) && styles.length > 0;

      // Access ColorScheme from cached libraries
      const { ColorScheme } = await loadGoogleMapsLibraries();

      let mapColorScheme = ColorScheme.FOLLOW_SYSTEM;

      if (colorScheme === 'LIGHT') {
        mapColorScheme = ColorScheme.LIGHT;
      } else if (colorScheme === 'DARK') {
        mapColorScheme = ColorScheme.DARK;
      }

      mapInstance.setCenter(location);
      mapInstance.setZoom(zoom);

      const mapOptions = {
        scrollwheel: !preventScroll,
        colorScheme: mapColorScheme,
      };

      // Only use mapId when NO custom styles are present
      if (!hasCustomStyles) {
        mapOptions.mapId = mapId || 'DEMO_MAP_ID';
      }

      // Apply custom styles when present (only works without mapId)
      if (hasCustomStyles) {
        mapOptions.styles = styles;
      }

      mapInstance.setOptions(mapOptions);
    };

    updateMapOptions();
  }, [
    mapInstance,
    latitude,
    longitude,
    zoom,
    preventScroll,
    mapId,
    colorScheme,
    styles,
  ]);

  // Update Marker Position and Icon
  useEffect(() => {
    if (!markerInstance || !mapInstance) {
      return;
    }
    const location = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

    // Always using AdvancedMarkerElement - use properties
    markerInstance.position = location;

    if (icon) {
      const img = document.createElement('img');
      img.src = icon;
      markerInstance.content = img;
    } else {
      markerInstance.content = null;
    }
  }, [markerInstance, mapInstance, latitude, longitude, icon, zoom]);

  // Update InfoWindow Content
  useEffect(() => {
    if (!infoWindowInstance || !markerInstance || !mapInstance) {
      return;
    }

    const contentString =
      '<div class="wp-block-gutenbee-google-maps-info-window">' +
      (infoWindow ? DOMPurify.sanitize(String(infoWindow)) : '') +
      '</div>';

    infoWindowInstance.setContent(contentString);

    if (!infoWindow) {
      infoWindowInstance.close();
    }
  }, [infoWindowInstance, markerInstance, mapInstance, infoWindow]);

  return (
    <div
      ref={mapRef}
      id={id}
      className={className}
      style={{ ...style, width: '100%' }}
    />
  );
};

Map.propTypes = propTypes;

export default Map;
