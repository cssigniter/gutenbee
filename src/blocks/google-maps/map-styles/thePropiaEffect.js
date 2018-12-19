export default [
  {
    featureType: 'landscape',
    stylers: [
      { visibility: 'simplified' },
      { color: '#2b3f57' },
      { weight: 0.1 },
    ],
  },
  {
    featureType: 'administrative',
    stylers: [
      { visibility: 'on' },
      { hue: '#ff0000' },
      { weight: 0.4 },
      { color: '#ffffff' },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [{ weight: 1.3 }, { color: '#FFFFFF' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#f55f77' }, { weight: 3 }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#f55f77' }, { weight: 1.1 }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#f55f77' }, { weight: 0.4 }],
  },
  {},
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [{ weight: 0.8 }, { color: '#ffffff' }, { visibility: 'on' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels',
    stylers: [{ color: '#ffffff' }, { weight: 0.7 }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  { featureType: 'poi', stylers: [{ color: '#6c5b7b' }] },
  { featureType: 'water', stylers: [{ color: '#f3b191' }] },
  { featureType: 'transit.line', stylers: [{ visibility: 'on' }] },
];
