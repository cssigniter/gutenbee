import classNames from 'classnames';
import { InnerBlocks } from 'wp.blockEditor';

import { getDefaultResponsiveBackgroundImageValue } from '../../../components/controls/background-controls/helpers';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getVideoProviderInfoByUrl } from '../../../util/video/providers';
import getBlockId from '../../../util/getBlockId';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';

const VideoBackgroundFrontEnd = ({ id, className, videoInfo }) => {
  return (
    <div
      className={classNames(className, 'wp-block-gutenbee-video-bg-wrapper')}
      data-video-id={videoInfo?.id}
      data-video-type={videoInfo?.provider}
    >
      {videoInfo.provider === 'self' ? (
        <video
          id={`video-${id}`}
          src={videoInfo.url}
          className="wp-block-gutenbee-video-bg"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div id={`video-${id}`} className="wp-block-gutenbee-video-bg" />
      )}
    </div>
  );
};
const ContainerStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    containerHeight,
    innerContentWidth,
    blockPadding,
    blockMargin,
    verticalContentAlignment,
    horizontalContentAlignment,
    backgroundImage,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={containerHeight}
        rule=".wp-block-gutenbee-container.[root] { height: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100vh',
        }}
      />
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-container.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-container.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={innerContentWidth}
        rule=".wp-block-gutenbee-container.[root] > .wp-block-gutenbee-container-inner { width: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100%',
        }}
      />
      <Rule
        value={verticalContentAlignment}
        rule=".wp-block-gutenbee-container.[root] { align-items: %s; }"
      />
      <Rule
        value={horizontalContentAlignment}
        rule=".wp-block-gutenbee-container.[root] { justify-content: %s; }"
      />
      <Rule
        value={backgroundImage}
        rule=".wp-block-gutenbee-container.[root] > .wp-block-gutenbee-container-background { %s }"
      />
      {children}
    </StyleSheet>
  );
};

const v5 = {
  supports: {
    align: ['wide', 'full'],
    anchor: false,
    html: false,
  },
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
      default: getDefaultResponsiveBackgroundImageValue(),
    },
    backgroundImageEffects: {
      type: 'object',
      default: {
        zoom: false,
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
    overflow: {
      type: 'boolean',
      default: false,
    },
  },
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      textColor,
      backgroundColor,
      backgroundVideoURL,
      backgroundImageEffects,
      gutter,
      overlayBackgroundColor,
      themeGrid,
      columnDirection,
      blockBreakpointVisibility,
      blockAuthVisibility,
      overflow,
    } = attributes;

    const { parallax, parallaxSpeed, zoom } = backgroundImageEffects ?? {};

    const videoInfo = backgroundVideoURL
      ? getVideoProviderInfoByUrl(backgroundVideoURL)
      : null;

    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
          {
            'has-parallax': parallax,
            'gutenbee-zoom': zoom && !parallax,
            'theme-grid': themeGrid,
            'row-reverse-desktop': columnDirection.desktop === 'row-reverse',
            'row-reverse-tablet': columnDirection.tablet === 'row-reverse',
            'row-reverse-mobile': columnDirection.mobile === 'row-reverse',
            'gutenbee-overflow-hidden': overflow,
          },
        )}
        style={{
          color: textColor,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
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
            ...getBoxShadowCSSValue({ attributes }),
          }}
        >
          {backgroundVideoURL &&
            !['unsupported'].includes(videoInfo.provider) && (
              <VideoBackgroundFrontEnd id={blockId} videoInfo={videoInfo} />
            )}
        </div>
      </div>
    );
  },
};

export default v5;
