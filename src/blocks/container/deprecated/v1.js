import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import Rule from '../../../components/stylesheet/Rule';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';

export const hexToRGBA = (hex, alpha) => {
  if (hex == null || hex === '') {
    return '';
  }

  hex = hex.replace('#', '');
  const r = parseInt(
    hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2),
    16,
  );
  const g = parseInt(
    hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4),
    16,
  );
  const b = parseInt(
    hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6),
    16,
  );
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
};

const ContainerStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    containerHeight,
    innerContentWidth,
    blockPadding,
    blockMargin,
    columnDirection,
    verticalContentAlignment,
    horizontalContentAlignment,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule
        value={columnDirection}
        rule=".wp-block-gutenbee-container-row { flex-direction: %s; }"
      />
      <Rule
        value={containerHeight}
        rule="{ height: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100vh',
        }}
      />
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={innerContentWidth}
        rule=".wp-block-gutenbee-container-inner { width: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100%',
        }}
      />
      <Rule value={verticalContentAlignment} rule="{ align-items: %s; }" />
      <Rule
        value={horizontalContentAlignment}
        rule="{ justify-content: %s; }"
      />
      {children}
    </StyleSheetV1>
  );
};

const v1 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    gutter: {
      type: 'string',
      default: 'md',
    },
    columnDirection: {
      type: 'object',
      default: {
        desktop: '',
        tablet: '',
        mobile: '',
      },
    },
    textColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    backgroundImage: {
      type: 'object',
      default: {
        url: '',
        image: null,
        repeat: 'no-repeat',
        size: 'cover',
        position: 'top center',
        attachment: 'scroll',
        parallax: false,
        parallaxSpeed: 0.3,
      },
    },
    overlayBackgroundColor: {
      type: 'string',
    },
    overlayBackgroundColorOpacity: {
      type: 'number',
      default: 1,
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    wideAlign: {
      type: 'boolean',
      default: false,
    },
    themeGrid: {
      type: 'boolean',
      default: false,
    },
    containerHeight: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    innerContentWidth: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '',
        tablet: '',
        mobile: '',
      }),
    },
    verticalContentAlignment: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    horizontalContentAlignment: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  migrate(attributes) {
    const {
      overlayBackgroundColorOpacity,
      overlayBackgroundColor,
    } = attributes;

    return {
      ...attributes,
      backgroundImage: {
        desktop: {
          url: attributes.backgroundImage.url ?? '',
          repeat: attributes.backgroundImage.repeat ?? 'no-repeat',
          size: attributes.backgroundImage.size ?? 'cover',
          position: attributes.backgroundImage.position ?? 'top center',
          attachment: attributes.backgroundImage.attachment ?? 'scroll',
        },
        tablet: {
          url: '',
          repeat: 'no-repeat',
          size: 'cover',
          position: 'top center',
          attachment: 'scroll',
        },
        mobile: {
          url: '',
          repeat: 'no-repeat',
          size: 'cover',
          position: 'top center',
          attachment: 'scroll',
        },
      },
      backgroundImageEffects: {
        zoom: attributes.backgroundImage?.zoom ?? false,
        parallax: attributes.backgroundImage?.parallax ?? false,
        parallaxSpeed: attributes.backgroundImage?.parallaxSpeed ?? 0.3,
      },
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
      overlayBackgroundColor: overlayBackgroundColor
        ? hexToRGBA(overlayBackgroundColor, overlayBackgroundColorOpacity)
        : undefined,
      gutter: attributes.gutter,
    };
  },
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      textColor,
      backgroundColor,
      backgroundImage,
      gutter,
      overlayBackgroundColor,
      overlayBackgroundColorOpacity,
      themeGrid,
    } = attributes;

    const { parallax, parallaxSpeed } = backgroundImage;

    return (
      <div
        id={getBlockId(uniqueId)}
        className={classNames(className, {
          'has-parallax': parallax,
          'theme-grid': themeGrid,
        })}
        style={{
          color: textColor,
        }}
      >
        <ContainerStyle attributes={attributes} />
        <div className="wp-block-gutenbee-container-inner">
          <div
            className={classNames({
              'wp-block-gutenbee-container-row': true,
              [`wp-block-gutenbee-container-${gutter}`]: true,
            })}
          >
            <InnerBlocks.Content />
          </div>

          {overlayBackgroundColor && (
            <div
              className="wp-block-gutenbee-container-background-overlay"
              style={{
                backgroundColor: hexToRGBA(
                  overlayBackgroundColor,
                  overlayBackgroundColorOpacity,
                ),
              }}
            />
          )}
        </div>

        <div
          className={classNames({
            'wp-block-gutenbee-container-background': true,
            'gutenbee-parallax': parallax,
          })}
          data-parallax-speed={parallaxSpeed}
          style={{
            backgroundColor,
            ...getBackgroundImageStyle(backgroundImage),
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
        />
      </div>
    );
  },
};

export default v1;
