import jQuery from 'jquery';
import DOMPurify from 'dompurify';

jQuery(async $ => {
  const google = window.google;

  if (typeof google === 'undefined') {
    return;
  }

  const { Map } = await google.maps.importLibrary('maps');
  const { ColorScheme } = await google.maps.importLibrary('core');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  const $maps = $(
    '.wp-block-gutenbee-google-maps > div, .wp-block-gutenbee-google-maps',
  );

  $maps.each(function () {
    const $this = $(this);
    const location = {
      lat: parseFloat($this.data('latitude')),
      lng: parseFloat($this.data('longitude')),
    };
    const info = $this.data('info-window');
    const mapIdAttr = $this.data('map-id');
    const colorSchemeAttr = $this.data('color-scheme');
    const stylesAttr = $this.data('map-style');

    if (!location.lat || !location.lng) {
      return;
    }

    // Google Maps API limitation: mapId and custom styles are mutually exclusive
    // - With mapId: Cannot set custom styles (must use Cloud Console)
    // - Without mapId: Can set custom styles, but AdvancedMarkerElement has limited features
    // Prioritize custom styles when provided
    const hasCustomStyles = stylesAttr && Array.isArray(stylesAttr) && stylesAttr.length > 0;

    // Resolve ColorScheme
    let mapColorScheme = ColorScheme.FOLLOW_SYSTEM;
    if (colorSchemeAttr === 'LIGHT') {
      mapColorScheme = ColorScheme.LIGHT;
    } else if (colorSchemeAttr === 'DARK') {
      mapColorScheme = ColorScheme.DARK;
    }

    const mapOptions = {
      zoom: $this.data('zoom'),
      center: location,
      scrollwheel: !$this.data('prevent-scroll'),
      colorScheme: mapColorScheme,
    };

    // Only use mapId when NO custom styles are present
    if (!hasCustomStyles) {
      mapOptions.mapId = mapIdAttr || 'DEMO_MAP_ID';
    }

    // Apply custom styles when present (only works without mapId)
    if (hasCustomStyles) {
      mapOptions.styles = stylesAttr;
    }

    const map = new Map($this.get(0), mapOptions);

    // Always use AdvancedMarkerElement
    const iconUrl = $this.data('marker-icon');
    let content = null;

    if (iconUrl) {
      const img = document.createElement('img');
      img.src = iconUrl;
      content = img;
    }

    const marker = new AdvancedMarkerElement({
      position: location,
      map,
      content,
    });

    const infoWindow = new google.maps.InfoWindow({
      content:
        '<div class="wp-block-gutenbee-google-maps-info-window">' +
        (info ? DOMPurify.sanitize(String(info)) : '') +
        '</div>',
      maxWidth: 350,
    });

    if (info) {
      marker.addEventListener('gmp-click', () => {
        infoWindow.open({
          anchor: marker,
          map,
        });
      });
    }
  });
});
