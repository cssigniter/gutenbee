import { getBlockDefaultClassName } from 'wp.blocks';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';
import { Fragment } from 'wp.element';

import getBlockId from '../../../util/getBlockId';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
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
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import VideoBackgroundFrontEnd from '../../../util/video/components/VideoBackgroundFrontend';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';

const BannerStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    bannerHeight,
    blockPadding,
    blockMargin,
    verticalContentAlignment,
    horizontalContentAlignment,
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
        rule=".wp-block-gutenbee-banner.[root] .wp-block-gutenbee-banner-inner { padding: %s; }"
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
      {children}
    </StyleSheet>
  );
};

const v1 = {
  supports: {
    anchor: true,
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
  migrate(attributes) {
    return {
      ...attributes,
      backgroundImage: {
        desktop: {
          url: attributes.backgroundImage.url,
          repeat: attributes.backgroundImage.repeat,
          size: attributes.backgroundImage.size,
          position: attributes.backgroundImage.position,
          attachment: attributes.backgroundImage.attachment,
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
    };
  },
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      bannerUrl,
      newTab,
      textColor,
      backgroundColor,
      backgroundVideoURL,
      backgroundImage,
      overlayBackgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const blockId = getBlockId(uniqueId);
    const baseClass = getBlockDefaultClassName('gutenbee/banner');

    const { parallax, parallaxSpeed, zoom } = backgroundImage;

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
            ...getBackgroundImageStyle(backgroundImage),
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
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
        }}
      >
        {bannerUrl && (
          <a
            href={bannerUrl}
            target={newTab && '_blank'}
            rel={newTab && 'noopener noreferrer'}
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

export default v1;
