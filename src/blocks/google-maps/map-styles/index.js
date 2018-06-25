import { __ } from 'wp.i18n';

export default [
  {
    id: 'apple-maps-esque',
    label: __('Apple Maps-esque'),
    style: require('./appleMapsEsque').default,
  },
  {
    id: 'assassins-creed',
    label: __('Assassin\'s Creed IV'),
    style: require('./assassinsCreed').default,
  },
  {
    id: 'blue-water',
    label: __('Blue Water'),
    style: require('./blueWater').default,
  },
  {
    id: 'captor',
    label: __('Captor'),
    style: require('./captor').default,
  },
  {
    id: 'dark',
    label: __('Dark'),
    style: require('./dark').default,
  },
  {
    id: 'dark-yellow',
    label: __('Dark Yellow'),
    style: require('./darkYellow').default,
  },
];
