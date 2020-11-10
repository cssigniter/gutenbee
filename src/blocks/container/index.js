/**
 * Container block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

// This is a check to see if we are in Gutenberg 7.x which supports
// this and load the appropriate Edit component
import { __experimentalBlockVariationPicker } from 'wp.blockEditor';

import ContainerBlockEditLegacy from './edit-legacy';
import ContainerBlockEdit from './edit';
import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
import ContainerStyle from './style';
import ContainerBlockIcon from './block-icon';
import getBlockId from '../../util/getBlockId';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import variations from './variations';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import deprecated from './deprecated';
import { getVideoInfo } from '../video-embed/util';

registerBlockType('gutenbee/container', {
  title: __('GutenBee Container'),
  description: __('A versatile container for your blocks.'),
  icon: ContainerBlockIcon,
  category: 'gutenbee',
  keywords: [__('container'), __('wrapper'), __('row'), __('section')],
  supports: {
    align: ['wide', 'full'],
    anchor: false,
    html: false,
  },
  isMultiBlock: true,
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
  deprecated,
  getEditWrapperProps(attributes) {
    const { themeGrid } = attributes;

    if (themeGrid) {
      return { 'data-theme-grid': themeGrid };
    }
  },
  variations,
  edit: !!__experimentalBlockVariationPicker
    ? ContainerBlockEdit
    : ContainerBlockEditLegacy,
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
      ? getVideoInfo(backgroundVideoURL)
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
          {backgroundVideoURL && videoInfo && (
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
});
