import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

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
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';
import { getVideoProviderInfoByUrl } from '../../../util/video/providers';

const ContainerStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    containerHeight,
    innerContentWidth,
    blockPadding,
    blockMargin,
    verticalContentAlignment,
    horizontalContentAlignment,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
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

const v2 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    gutter: {
      type: 'string',
      default: 'lg',
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
    backgroundVideoURL: {
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
  migrate: attributes => {
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
    };
  },
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      textColor,
      backgroundColor,
      backgroundVideoURL,
      backgroundImage,
      gutter,
      overlayBackgroundColor,
      themeGrid,
      columnDirection,
    } = attributes;

    const { parallax, parallaxSpeed } = backgroundImage;

    const videoInfo = backgroundVideoURL
      ? getVideoProviderInfoByUrl(backgroundVideoURL)
      : null;

    return (
      <div
        id={getBlockId(uniqueId)}
        className={classNames(className, {
          'has-parallax': parallax,
          'theme-grid': themeGrid,
          'row-reverse-desktop': columnDirection.desktop === 'row-reverse',
          'row-reverse-tablet': columnDirection.tablet === 'row-reverse',
          'row-reverse-mobile': columnDirection.mobile === 'row-reverse',
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
                backgroundColor: overlayBackgroundColor,
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
        >
          {backgroundVideoURL && !['unsupported'].includes(videoInfo.provider) && (
            <div
              className="wp-block-gutenbee-video-bg-wrapper"
              data-video-id={videoInfo && videoInfo.id}
              data-video-type={videoInfo && videoInfo.provider}
            >
              <div
                id={`video-${getBlockId(uniqueId)}`}
                className="wp-block-gutenbee-video-bg"
              />
            </div>
          )}
        </div>
      </div>
    );
  },
};

export default v2;
