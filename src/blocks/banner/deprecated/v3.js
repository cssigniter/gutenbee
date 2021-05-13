import { getBlockDefaultClassName } from 'wp.blocks';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';
import { Fragment } from 'wp.element';

import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import getBlockId from '../../../util/getBlockId';
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
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';

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

const BannerStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    bannerHeight,
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
        value={bannerHeight}
        rule=".wp-block-gutenbee-banner.[root] { height: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100vh',
        }}
      />
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-banner.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-banner.[root] > .wp-block-gutenbee-banner-inner { padding: %s; }"
        unit="px"
      />
      <Rule
        value={verticalContentAlignment}
        rule=".wp-block-gutenbee-banner.[root] { align-items: %s; }"
      />
      <Rule
        value={horizontalContentAlignment}
        rule=".wp-block-gutenbee-banner.[root] { justify-content: %s; }"
      />
      <Rule
        value={backgroundImage}
        rule=".wp-block-gutenbee-banner.[root] > .wp-block-gutenbee-banner-background { %s }"
      />
      {children}
    </StyleSheet>
  );
};

const v3 = {
  supports: {
    anchor: false,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    bannerUrl: {
      type: 'string',
    },
    newTab: {
      type: 'boolean',
      default: false,
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
    bannerHeight: {
      type: 'object',
      default: getDefaultResponsiveValue(),
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
  },
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      bannerUrl,
      newTab,
      textColor,
      backgroundColor,
      backgroundVideoURL,
      backgroundImageEffects,
      overlayBackgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const blockId = getBlockId(uniqueId);
    const baseClass = getBlockDefaultClassName('gutenbee/banner');

    const { parallax, parallaxSpeed, zoom } = backgroundImageEffects ?? {};

    const videoInfo = backgroundVideoURL
      ? getVideoProviderInfoByUrl(backgroundVideoURL)
      : null;

    const bannerInner = (
      <div className={`${baseClass}-inner`}>
        <div className={`${baseClass}-inner-wrapper`}>
          <InnerBlocks.Content />
        </div>
      </div>
    );

    const bannerBackground = (
      <Fragment>
        {overlayBackgroundColor && (
          <div
            className={`${baseClass}-background-overlay`}
            style={{
              backgroundColor: overlayBackgroundColor,
            }}
          />
        )}
        <div
          className={classNames(`${baseClass}-background`, {
            'gutenbee-parallax': parallax,
          })}
          data-parallax-speed={parallaxSpeed}
          style={{
            backgroundColor,
          }}
        >
          {backgroundVideoURL &&
            !['unsupported'].includes(videoInfo.provider) && (
              <VideoBackgroundFrontEnd id={blockId} videoInfo={videoInfo} />
            )}
        </div>
      </Fragment>
    );

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
          },
        )}
        style={{
          color: textColor,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        {bannerUrl && (
          <a
            href={bannerUrl}
            target={newTab && '_blank'}
            rel={newTab && 'noopener'}
            className={`${baseClass}-link`}
          />
        )}
        {bannerInner}
        {bannerBackground}
        <BannerStyle attributes={attributes} />
      </div>
    );
  },
};

export default v3;
