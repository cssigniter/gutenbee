import jQuery from 'jquery';

jQuery($ => {
  const google = window.google;

  if (typeof google === 'undefined') {
    return;
  }

  const $maps = $(
    '.wp-block-gutenbee-google-maps > div, .wp-block-gutenbee-google-maps',
  );

  $maps.each(function() {
    const $this = $(this);
    const location = {
      lat: parseFloat($this.data('latitude')),
      lng: parseFloat($this.data('longitude')),
    };
    const info = $this.data('info-window');

    if (!location.lat || !location.lng) {
      return;
    }

    const map = new google.maps.Map($this.get(0), {
      zoom: $this.data('zoom'),
      center: location,
      scrollwheel: !$this.data('prevent-scroll'),
      styles: $this.data('map-style'),
    });

    const marker = new google.maps.Marker({
      position: location,
      icon: $this.data('marker-icon'),
      map,
    });

    const infoWindow = new google.maps.InfoWindow({
      content:
        '<div class="wp-block-gutenbee-google-maps-info-window">' +
        info +
        '</div>',
      maxWidth: 350,
    });

    if (info) {
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    }
  });
});
