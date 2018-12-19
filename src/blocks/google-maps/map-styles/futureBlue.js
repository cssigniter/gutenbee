export default [
  { featureType: 'all', elementType: 'all', stylers: [{ hue: '#0026ff' }] },
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#1c2d8d' }],
  },
  {
    featureType: 'all',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      { gamma: 0.01 },
      { lightness: 20 },
      { visibility: 'on' },
      { color: '#99a6e0' },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      { saturation: -31 },
      { lightness: -33 },
      { weight: 2 },
      { gamma: 0.8 },
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#1b50ab' }],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ lightness: 30 }, { saturation: 30 }, { color: '#1c2d8d' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ saturation: 20 }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ lightness: 20 }, { saturation: -20 }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ lightness: 10 }, { saturation: -30 }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ saturation: 25 }, { lightness: 25 }],
  },
  { featureType: 'water', elementType: 'all', stylers: [{ lightness: -20 }] },
];
