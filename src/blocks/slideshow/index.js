/**
 * Slideshow block
 *
 * A basic image gallery slideshow
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import GalleryBlock from './GalleryBlock';

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
        caption: {
          type: 'array',
          source: 'children',
          selector: 'figcaption',
        },
      },
    },
    fade: {
      type: 'boolean',
      default: true,
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
  },
  edit: GalleryBlock,
  save({ className, attributes }) {
    const {
      images,
      fade,
      autoplay,
      arrowNav,
      dotNav,
      infinite,
      speed,
      autoplaySpeed,
    } = attributes;

    return (
      <div
        className={className}
        data-fade={fade}
        data-autoplay={autoplay}
        data-arrows={arrowNav}
        data-dots={dotNav}
        data-infinite={infinite}
        data-speed={speed}
        data-autoplay-speed={autoplaySpeed}
      >
        {images.map((image, index) => (
          <div key={image.id || index} className="gutenbee-slideshow-item">
            <img src={image.url} alt={image.alt || ''} />
          </div>
        ))}
      </div>
    );
  },
});
