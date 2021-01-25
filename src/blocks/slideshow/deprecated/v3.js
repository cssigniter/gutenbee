import classNames from 'classnames';

import { LINKTO } from '../../../components/gallery/constants';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import Rule from '../../../components/stylesheet/Rule';
import StyleSheet from '../../../components/stylesheet';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';

const SlideshowStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    dotsBackgroundColor,
    arrowsBackgroundColor,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-slideshow.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-slideshow.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={dotsBackgroundColor}
        rule=".wp-block-gutenbee-slideshow.[root] .slick-dots { background-color: %s; }"
      />
      <Rule
        value={arrowsBackgroundColor}
        rule=".wp-block-gutenbee-slideshow.[root] button.slick-arrow { background-color: %s; }"
      />
      {children}
    </StyleSheet>
  );
};

const v3 = {
  supports: {
    anchor: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
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
    arrowsBackgroundColor: {
      type: 'string',
    },
    dotsColor: {
      type: 'string',
      default: '#FFFFFF',
    },
    dotsBackgroundColor: {
      type: 'string',
    },
    size: {
      type: 'string',
      default: 'full',
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    backgroundColor: {
      type: 'string',
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  migrate: attributes => {
    return attributes;
  },
  save({ className, attributes }) {
    const {
      uniqueId,
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
      arrowsColor,
      dotsColor,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
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
        )}
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
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        data-dots-color={dotsColor}
        data-arrows-color={arrowsColor}
      >
        <SlideshowStyle attributes={attributes} />
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
};

export default v3;
