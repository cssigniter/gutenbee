import { LAST_ROW } from '../constants';
import { LINKTO } from '../../../components/gallery/constants';
import { GALLERY_TYPE } from '../edit';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import { getMarginSettingStyles } from '../../../components/controls/margin-controls/margin-settings';

const v1 = {
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
  migrate(attributes) {
    return {
      ...attributes,
      type: GALLERY_TYPE.JUSTIFIED,
      blockMargin: {
        desktop: {
          top: attributes.blockMargin.top || '',
          right: attributes.blockMargin.right || '',
          bottom: attributes.blockMargin.bottom || '',
          left: attributes.blockMargin.left || '',
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
      blockPadding: getDefaultSpacingValue(),
    };
  },
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
};

export default v1;
