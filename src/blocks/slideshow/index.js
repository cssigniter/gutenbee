/**
 * Slideshow block
 *
 * A basic image gallery slideshow
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import GalleryBlock from './GalleryBlock';
import { LINKTO } from './constants';

registerBlockType('gutenbee/slideshow', {
  title: __('GutenBee Slideshow'),
  description: __('A slideshow block'),
  icon: 'slides',
  category: 'common',
  keywords: [
    __('slideshow'),
    __('gallery'),
  ],
  attributes: {
    images: {
      type: 'array',
      default: [],
      source: 'query',
      selector: '.wp-block-gutenbee-slideshow .gutenbee-slideshow-item',
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
        caption: {
          type: 'array',
          source: 'children',
          selector: 'figcaption',
        },
      },
    },
    animationStyle: {
      type: 'string',
      default: 'fade',
    },
    arrowNav: {
      type: 'boolean',
      default: true,
    },
    dotNav: {
      type: 'boolean',
      default: true,
    },
    autoplay: {
      type: 'boolean',
      default: true,
    },
    infinite: {
      type: 'boolean',
      default: true,
    },
    speed: {
      type: 'number',
      default: 300,
    },
    autoplaySpeed: {
      type: 'number',
      default: 3000,
    },
    linkTo: {
      type: 'string',
      default: LINKTO.NONE,
    },
    color: {
      type: 'string',
      default: '#FFFFFF',
    },
    size: {
      type: 'string',
      default: 'full',
    },
  },
  edit: GalleryBlock,
  save({ className, attributes }) {
    const {
      images,
      animationStyle,
      autoplay,
      arrowNav,
      dotNav,
      infinite,
      speed,
      autoplaySpeed,
      color,
      linkTo,
    } = attributes;

    return (
      <div
        className={className}
        data-fade={animationStyle === 'fade'}
        data-autoplay={autoplay}
        data-arrows={arrowNav}
        data-dots={dotNav}
        data-infinite={infinite}
        data-speed={speed}
        data-autoplay-speed={autoplaySpeed}
        style={{ color }}
      >
        {images.map((image, index) => {
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
            />
          );

          return (
            <div key={image.id || index} className="gutenbee-slideshow-item">
              {href
                ? <a className="gutenbee-slideshow-item-link" href={href}>{img}</a>
                : img}
            </div>
          );
        })}
      </div>
    );
  },
});
