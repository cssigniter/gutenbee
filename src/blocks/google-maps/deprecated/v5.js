import classNames from 'classnames';
import get from 'lodash.get';
import DOMPurify from 'dompurify';

import mapStyles from '../map-styles';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import getBlockId from '../../../util/getBlockId';
import GoogleMapsStyle from '../style';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../components/controls/animation-controls/helpers';

const v5 = {
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
    mapId: {
      type: 'string',
      default: 'DEMO_MAP_ID',
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
    blockBreakpointVisibility: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: false,
        tablet: false,
        mobile: false,
      }),
    },
    blockAuthVisibility: {
      type: 'object',
      default: {
        loggedIn: false,
        loggedOut: false,
      },
    },
    ...animationControlAttributes(),
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
      mapId,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
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
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
        )}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        {...getAnimationControlDataAttributes(attributes.animation)}
      >
        <GoogleMapsStyle attributes={attributes} />

        <div
          data-latitude={latitude}
          data-longitude={longitude}
          data-zoom={zoom}
          data-prevent-scroll={preventScroll}
          data-map-style={mapStyle && JSON.stringify(mapStyle)}
          data-info-window={DOMPurify.sanitize(infoWindow)}
          data-marker-icon={markerImageUrl}
          data-map-id={mapId}
        />
      </div>
    );
  },
};

export default v5;
