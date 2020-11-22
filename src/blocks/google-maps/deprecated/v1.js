import get from 'lodash.get';

import mapStyles from '../map-styles';
import { getMarginSettingStyles } from '../../../components/controls/margin-controls/margin-settings';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';

const v1 = {
  attributes: {
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
    markerImageUrl: {
      type: 'string',
      default: '',
    },
    markerImageId: {
      type: 'number',
    },
    blockMargin: {
      type: 'object',
      default: {},
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
      height: getDefaultResponsiveValue({
        desktop: attributes.height,
        tablet: attributes.height,
        mobile: attributes.height,
      }),
      blockPadding: getDefaultSpacingValue(),
      blockMargin: {
        desktop: {
          top: attributes.blockMargin.top || '',
          right: attributes.blockMargin.right || '',
          bottom: attributes.blockMargin.bottom || '',
          left: attributes.blockMargin.left || '',
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
    };
  },
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
      markerImageUrl,
      blockMargin,
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
        data-marker-icon={markerImageUrl}
        style={{
          height: `${height}px`,
          margin: getMarginSettingStyles(blockMargin),
        }}
      />
    );
  },
};

export default v1;
