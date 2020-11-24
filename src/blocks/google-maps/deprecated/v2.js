import get from 'lodash.get';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import mapStyles from '../map-styles';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const GoogleMapsStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, height } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule value={height} rule="{ height: %s; }" unit="px" />
      {children}
    </StyleSheetV1>
  );
};

const v2 = {
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
  migrate: attributes => {
    return {
      ...attributes,
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
    };
  },
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
        id={blockId}
        className={className}
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
};

export default v2;
