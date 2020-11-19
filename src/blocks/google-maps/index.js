/**
 * Google Maps block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';

import GoogleMapsEdit from './edit';
import mapStyles from './map-styles';
import get from 'lodash.get';
import GoogleMapsBlockIcon from './block-icon';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import GoogleMapsStyle from './style';
import deprecated from './deprecated';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';

registerBlockType('gutenbee/google-maps', {
  title: __('GutenBee Google Maps'),
  description: __('Create fancy Google Maps'),
  icon: GoogleMapsBlockIcon,
  category: 'gutenbee',
  keywords: [__('maps'), __('google')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    latitude: {
      type: 'string',
      default: '37.585636',
    },
    longitude: {
      type: 'string',
      default: '26.127548',
    },
    zoom: {
      type: 'number',
      default: 10,
    },
    height: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: 280,
        tablet: 280,
        mobile: 280,
      }),
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
    markerImageUrl: {
      type: 'string',
      default: '',
    },
    markerImageId: {
      type: 'number',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    backgroundColor: {
      type: 'string',
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  deprecated,
  edit: GoogleMapsEdit,
  save: ({ className, attributes }) => {
    const {
      uniqueId,
      latitude,
      longitude,
      zoom,
      preventScroll,
      styleId,
      infoWindow,
      customStyles,
      markerImageUrl,
      backgroundColor,
    } = attributes;

    const blockId = getBlockId(uniqueId);

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
        className={classNames(className, blockId)}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <GoogleMapsStyle attributes={attributes} />

        <div
          data-latitude={latitude}
          data-longitude={longitude}
          data-zoom={zoom}
          data-prevent-scroll={preventScroll}
          data-map-style={mapStyle && JSON.stringify(mapStyle)}
          data-info-window={infoWindow}
          data-marker-icon={markerImageUrl}
        />
      </div>
    );
  },
});
