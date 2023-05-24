/**
 * Justified Gallery block
 */

import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';

import JustifiedGalleryEdit, { GALLERY_TYPE } from './edit';
import { LINKTO } from '../../components/gallery/constants';
import JustifiedGalleryBlockIcon from './block-icon';
import getBlockId from '../../util/getBlockId';
import GalleryStyle from './style';
import deprecated from './deprecated';
import { LAST_ROW } from './constants';
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
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../components/controls/animation-controls/helpers';

registerBlockType('gutenbee/justified-gallery', {
  title: __('GutenBee Gallery'),
  description: __(
    'Create high quality columnized or justified image galleries.',
  ),
  icon: JustifiedGalleryBlockIcon,
  category: 'gutenbee',
  keywords: [__('justified'), __('gallery')],
  supports: {
    anchor: false,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    type: {
      type: 'string',
      default: GALLERY_TYPE.COLUMNS,
    },
    images: {
      type: 'array',
      default: [],
      source: 'query',
      selector: '.wp-block-gutenbee-gallery-item',
      query: {
        url: {
          source: 'attribute',
          selector: 'img',
          attribute: 'src',
        },
        alt: {
          source: 'attribute',
          selector: 'img',
          attribute: 'alt',
          default: '',
        },
        id: {
          source: 'attribute',
          selector: 'img',
          attribute: 'data-id',
        },
        link: {
          source: 'attribute',
          selector: 'img',
          attribute: 'data-link',
        },
        sourceUrl: {
          source: 'attribute',
          selector: 'img',
          attribute: 'data-source-url',
        },
        caption: {
          source: 'html',
          selector: '.wp-block-gutenbee-gallery-item-caption',
        },
      },
    },
    columns: {
      type: 'number',
      default: 3,
    },
    rowHeight: {
      type: 'number',
      default: 120,
    },
    margins: {
      type: 'number',
      default: 1,
    },
    lastRow: {
      type: 'string',
      default: LAST_ROW.NO_JUSTIFY,
    },
    randomize: {
      type: 'boolean',
      default: false,
    },
    captions: {
      type: 'boolean',
      default: false,
    },
    linkTo: {
      type: 'string',
      default: LINKTO.NONE,
    },
    size: {
      type: 'string',
      default: 'full',
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
  deprecated,
  edit: JustifiedGalleryEdit,
  save({ attributes, className }) {
    const {
      uniqueId,
      type,
      columns,
      images,
      rowHeight,
      margins,
      lastRow,
      randomize,
      linkTo,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
      captions,
    } = attributes;

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
            'wp-block-gutenbee-gallery-columns': type === GALLERY_TYPE.COLUMNS,
            'wp-block-gutenbee-gallery-justified':
              type === GALLERY_TYPE.JUSTIFIED,
            [`gutenbee-columns-${columns}`]: type === GALLERY_TYPE.COLUMNS,
          },
        )}
        data-gallery-type={type}
        data-row-height={rowHeight}
        data-margins={margins}
        data-last-row={lastRow}
        data-randomize={randomize}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        {...getAnimationControlDataAttributes(attributes.animation)}
      >
        <GalleryStyle attributes={attributes} />
        <div className="wp-block-gutenbee-gallery-content">
          {images.map(image => {
            let href;

            switch (linkTo) {
              case LINKTO.MEDIA:
                href = image.sourceUrl || image.url;
                break;
              case LINKTO.ATTACHMENT:
                href = image.link;
                break;
              default:
                break;
            }

            const img = (
              <img
                src={image.url}
                alt={image.alt || ''}
                data-id={image.id}
                data-link={image.link}
                data-source-url={image.sourceUrl}
                className="wp-block-gutenbee-gallery-item-image"
              />
            );

            const imageWithCaption = (
              <Fragment>
                {img}
                <span className="wp-block-gutenbee-gallery-item-caption">
                  {image.caption}
                </span>
              </Fragment>
            );

            return (
              <div
                className="wp-block-gutenbee-gallery-item"
                key={image.id || image.url}
              >
                {!!href ? (
                  <a
                    className="wp-block-gutenbee-gallery-item-link"
                    href={href}
                  >
                    {img}
                    {captions && !!image.caption && (
                      <span className="wp-block-gutenbee-gallery-item-caption">
                        {image.caption}
                      </span>
                    )}
                  </a>
                ) : captions && !!image.caption ? (
                  imageWithCaption
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});
