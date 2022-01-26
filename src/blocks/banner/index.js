import { __ } from 'wp.i18n';
import { registerBlockType, getBlockDefaultClassName } from 'wp.blocks';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';
import { Fragment } from 'wp.element';

import { getDefaultResponsiveBackgroundImageValue } from '../../components/controls/background-controls/helpers';
import BannerStyle from './style';
import getBlockId from '../../util/getBlockId';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import BannerBlockEdit from './edit';
import BannerBlockIcon from './block-icon';
import { getVideoProviderInfoByUrl } from '../../util/video/providers';
import VideoBackgroundFrontEnd from '../../util/video/components/VideoBackgroundFrontend';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import deprecated from './deprecated';

registerBlockType('gutenbee/banner', {
  title: __('GutenBee Banner'),
  description: __('A versatile block for creating banners of any kind.'),
  icon: BannerBlockIcon,
  category: 'gutenbee',
  keywords: [__('banner'), __('hero'), __('section')],
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
      default: '#F8F8F8',
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
      default: getDefaultResponsiveValue({
        desktop: 450,
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
  },
  deprecated,
  edit: BannerBlockEdit,
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
      backgroundImage,
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
            'has-background-image': !!backgroundImage?.desktop?.url,
            'has-background-video': !!videoInfo?.url,
            'has-background-overlay': !!overlayBackgroundColor,
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

        {!!videoInfo?.url && (
          <div
            style={{
              backgroundColor: overlayBackgroundColor || undefined,
            }}
            className="gutenbee-block-spinner"
          />
        )}
      </div>
    );
  },
});
