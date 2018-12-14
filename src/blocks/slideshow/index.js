/**
 * Slideshow block
 *
 * A basic image gallery slideshow
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import SlideshowEdit from './edit';
import { LINKTO } from '../../components/gallery/constants';
import SlideshowBlockIcon from './block-icon';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';

registerBlockType('gutenbee/slideshow', {
  title: __('GutenBee Slideshow'),
  description: __('A slideshow block'),
  icon: SlideshowBlockIcon,
  category: 'gutenbee',
  keywords: [__('slideshow'), __('gallery')],
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
    slidesToShow: {
      type: 'number',
      default: 1,
    },
    slidesToScroll: {
      type: 'number',
      default: 1,
    },
    pauseOnHover: {
      type: 'boolean',
      default: true,
    },
    linkTo: {
      type: 'string',
      default: LINKTO.NONE,
    },
    arrowsColor: {
      type: 'string',
      default: '#FFFFFF',
    },
    dotsColor: {
      type: 'string',
      default: '#FFFFFF',
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
  edit: SlideshowEdit,
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
      linkTo,
      slidesToShow,
      slidesToScroll,
      pauseOnHover,
      blockMargin,
      arrowsColor,
      dotsColor,
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
        data-slides-to-show={slidesToShow}
        data-slides-to-scroll={slidesToScroll}
        data-pause-on-hover={pauseOnHover}
        style={{
          color: arrowsColor,
          margin: getMarginSettingStyles(blockMargin),
        }}
        data-dots-color={dotsColor}
        data-arrows-color={arrowsColor}
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
              {href ? (
                <a className="gutenbee-slideshow-item-link" href={href}>
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
