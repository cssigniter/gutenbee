/**
 * Justified Gallery block
 */

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
import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';

registerBlockType('gutenbee/justified-gallery', {
  title: __('GutenBee Gallery'),
  description: __(
    'Create high quality columnized or justified image galleries.',
  ),
  icon: JustifiedGalleryBlockIcon,
  category: 'gutenbee',
  keywords: [__('justified'), __('gallery')],
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
  },
  deprecated,
  edit: JustifiedGalleryEdit,
  save({ attributes }) {
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
    } = attributes;

    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        className={classNames({
          'wp-block-gutenbee-gallery-columns': type === GALLERY_TYPE.COLUMNS,
          'wp-block-gutenbee-gallery-justified':
            type === GALLERY_TYPE.JUSTIFIED,
          [`gutenbee-columns-${columns}`]: type === GALLERY_TYPE.COLUMNS,
        })}
        data-gallery-type={type}
        data-row-height={rowHeight}
        data-margins={margins}
        data-last-row={lastRow}
        data-randomize={randomize}
        style={{
          backgroundColor: backgroundColor || undefined,
        }}
      >
        <GalleryStyle attributes={attributes} />
        <div className="wp-block-gutenbee-gallery-content">
          {images.map(image => {
            let href;

            switch (linkTo) {
              case LINKTO.MEDIA:
                href = image.url;
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
                className="wp-block-gutenbee-gallery-item-image"
              />
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
                  </a>
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
