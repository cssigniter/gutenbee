import classNames from 'classnames';

import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import getBlockId from '../../../util/getBlockId';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { GALLERY_TYPE } from '../edit';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import { LINKTO } from '../../../components/gallery/constants';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import { LAST_ROW } from '../constants';

const GalleryStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-justified-gallery.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-justified-gallery.[root] { padding: %s; }"
        unit="px"
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
  migrate(attributes) {
    return attributes;
  },
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

export default v3;
