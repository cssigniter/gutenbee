/**
 * Justified Gallery block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import JustifiedGalleryEdit from './edit';
import { LINKTO } from '../../components/gallery/constants';
import { LAST_ROW } from './constants';
import JustifiedGalleryBlockIcon from './block-icon';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';

registerBlockType('gutenbee/justified-gallery', {
  title: __('GutenBee Justified Gallery'),
  description: __('Create high quality justified image galleries'),
  icon: JustifiedGalleryBlockIcon,
  category: 'gutenbee',
  keywords: [__('justified'), __('gallery')],
  attributes: {
    images: {
      type: 'array',
      default: [],
      source: 'query',
      selector:
        '.wp-block-gutenbee-justified-gallery .gutenbee-justified-gallery-item',
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
    blockMargin: {
      type: 'object',
      default: {},
    },
  },
  edit: JustifiedGalleryEdit,
  save({ className, attributes }) {
    const {
      images,
      rowHeight,
      margins,
      lastRow,
      randomize,
      linkTo,
      blockMargin,
    } = attributes;

    return (
      <div
        className={className}
        data-row-height={rowHeight}
        data-margins={margins}
        data-last-row={lastRow}
        data-randomize={randomize}
        style={{
          margin: getMarginSettingStyles(blockMargin),
        }}
      >
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
              className="gutenbee-justified-gallery-item-image"
            />
          );

          return (
            <div
              className="gutenbee-justified-gallery-item"
              key={image.id || image.url}
            >
              {!!href ? (
                <a className="gutenbee-justified-gallery-item-link" href={href}>
                  {img}
                </a>
              ) : (
                img
              )}
            </div>
          );
        })}
      </div>
    );
  },
});
