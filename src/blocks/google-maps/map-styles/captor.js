export default [
  { featureType: 'water', stylers: [{ color: '#0e171d' }] },
  {
    featureType: 'landscape',
    stylers: [{ color: '#1e303d' }],
  },
  { featureType: 'road', stylers: [{ color: '#1e303d' }] },
  {
    featureType: 'poi.park',
    stylers: [{ color: '#1e303d' }],
  },
  {
    featureType: 'transit',
    stylers: [{ color: '#182731' }, { visibility: 'simplified' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [{ color: '#f0c514' }, { visibility: 'off' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1e303d' }, { visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e77e24' }, { visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#94a5a6' }],
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }, { color: '#e84c3c' }],
  },
  {
    featureType: 'poi',
    stylers: [{ color: '#e84c3c' }, { visibility: 'off' }],
  },
];
