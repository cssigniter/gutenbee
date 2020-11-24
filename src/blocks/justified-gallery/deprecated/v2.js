import classNames from 'classnames';

import { GALLERY_TYPE } from '../edit';
import { LAST_ROW } from '../constants';
import { LINKTO } from '../../../components/gallery/constants';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const GalleryStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />

      {children}
    </StyleSheetV1>
  );
};

const v2 = {
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
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  migrate: attributes => {
    return {
      ...attributes,
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
    };
  },
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
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
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
};

export default v2;
