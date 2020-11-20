import { __ } from 'wp.i18n';
import { registerBlockType, getBlockDefaultClassName } from 'wp.blocks';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';
import { Fragment } from 'wp.element';

import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
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
import { getVideoInfo } from './utils';

registerBlockType('gutenbee/banner', {
  title: __('GutenBee Banner'),
  description: __('A versatile block for creating banners of any kind.'),
  icon: 'smiley',
  category: 'gutenbee',
  keywords: [__('banner'), __('hero'), __('section')],
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
    containerHeight: {
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
  },
  edit: BannerBlockEdit,
  save: ({ attributes }) => {
    const {
      uniqueId,
      bannerUrl,
      newTab,
      textColor,
      backgroundColor,
      backgroundVideoURL,
      backgroundImage,
      overlayBackgroundColor,
    } = attributes;

    const className = getBlockDefaultClassName('gutenbee/banner');

    const { parallax, parallaxSpeed } = backgroundImage;

    const videoInfo = backgroundVideoURL
      ? getVideoInfo(backgroundVideoURL)
      : null;

    const bannerInner = (
      <div className={`${className}-inner`}>
        <InnerBlocks.Content />
      </div>
    );

    const bannerBackground = (
      <Fragment>
        {overlayBackgroundColor && (
          <div
            className={`${className}-background-overlay`}
            style={{
              backgroundColor: overlayBackgroundColor,
            }}
          />
        )}
        <div
          className={classNames(`${className}-background`, {
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
      </Fragment>
    );

    return (
      <div
        className={classNames(className, getBlockId(uniqueId), {
          'has-parallax': parallax,
        })}
        style={{
          color: textColor,
        }}
      >
        {bannerUrl && (
          <a
            href={bannerUrl}
            target={newTab && '_blank'}
            rel={newTab && 'noopener noreferrer'}
            className={`${className}-link`}
          />
        )}
        {bannerInner}
        {bannerBackground}
        <BannerStyle attributes={attributes} />
      </div>
    );
  },
});
