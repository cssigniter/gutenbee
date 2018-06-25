/**
 * Google Maps block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import GoogleMapsEdit from './edit';
import mapStyles from './map-styles';
import get from 'lodash.get';

registerBlockType('gutenbee/google-maps', {
  title: __('GutenBee Google Maps'),
  description: __('Create fancy Google Maps'),
  icon: 'location',
  category: 'common',
  keywords: [
    __('maps'),
    __('google'),
  ],
  attributes: {
    latitude: {
      type: 'number',
      default: 37.585636,
    },
    longitude: {
      type: 'number',
      default: 26.127548,
    },
    zoom: {
      type: 'number',
      default: 10,
    },
    height: {
      type: 'number',
      default: 280,
    },
    preventScroll: {
      type: 'boolean',
      default: true,
    },
    styleId: {
      type: 'string',
      default: '',
    },
    infoWindow: {
      type: 'string',
      default: '',
    },
    customStyles: {
      type: 'string',
      default: '',
    },
  },
  edit: GoogleMapsEdit,
  save: ({ className, attributes }) => {
    const {
      latitude,
      longitude,
      zoom,
      height,
      preventScroll,
      styleId,
      infoWindow,
      customStyles,
    } = attributes;

    const getCustomStyles = () => {
      try {
        return JSON.parse(customStyles);
      } catch (error) {
        return undefined;
      }
    };

    const predefinedMapStyle = mapStyles.find(({ id }) => id === styleId);
    const mapStyle = customStyles
      ? getCustomStyles()
      : get(predefinedMapStyle, 'style');

    return (
      <div
        className={className}
        data-latitude={latitude}
        data-longitude={longitude}
        data-zoom={zoom}
        data-prevent-scroll={preventScroll}
        data-map-style={mapStyle && JSON.stringify(mapStyle)}
        data-info-window={infoWindow}
        style={{
          height: `${height}px`,
        }}
      />
    );
  },
});
