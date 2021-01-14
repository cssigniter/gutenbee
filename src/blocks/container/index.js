/**
 * Container block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import ContainerBlockEdit from './edit';
import { getDefaultResponsiveBackgroundImageValue } from '../../components/controls/background-controls/helpers';
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
import { getVideoProviderInfoByUrl } from '../../util/video/providers';
import VideoBackgroundFrontEnd from '../../util/video/components/VideoBackgroundFrontend';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

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
  },
  deprecated,
  getEditWrapperProps(attributes) {
    const { themeGrid } = attributes;

    if (themeGrid) {
      return { 'data-theme-grid': themeGrid };
    }
  },
  variations,
  edit: ContainerBlockEdit,
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
    } = attributes;

    const { parallax, parallaxSpeed, zoom } = backgroundImageEffects;

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
});
