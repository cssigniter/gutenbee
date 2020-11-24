import { Fragment } from 'wp.element';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const ImageStyle = ({ attributes, children }) => {
  const { uniqueId, width, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={width} rule="img { width: %s; }" unit="px" />
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      {children}
    </StyleSheetV1>
  );
};

const v1 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    align: {
      type: 'string',
    },
    url: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
    },
    alt: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'alt',
      default: '',
    },
    caption: {
      type: 'string',
      source: 'html',
      selector: 'figcaption',
    },
    title: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'title',
    },
    href: {
      type: 'string',
      source: 'attribute',
      selector: 'figure > a',
      attribute: 'href',
    },
    rel: {
      type: 'string',
      source: 'attribute',
      selector: 'figure > a',
      attribute: 'rel',
    },
    linkClass: {
      type: 'string',
      source: 'attribute',
      selector: 'figure > a',
      attribute: 'class',
    },
    id: {
      type: 'number',
    },
    width: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    sizeSlug: {
      type: 'string',
    },
    linkDestination: {
      type: 'string',
      default: 'none',
    },
    linkTarget: {
      type: 'string',
      source: 'attribute',
      selector: 'figure > a',
      attribute: 'target',
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
    ...borderControlAttributes('image'),
    ...boxShadowControlAttributes('image'),
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
  save: ({ attributes }) => {
    const {
      uniqueId,
      url,
      alt,
      caption,
      align,
      href,
      rel,
      linkClass,
      id,
      linkTarget,
      sizeSlug,
      title,
      backgroundColor,
    } = attributes;

    const newRel = isEmpty(rel) ? undefined : rel;

    const classes = classNames({
      [`align${align}`]: align,
      [`size-${sizeSlug}`]: sizeSlug,
    });

    const blockId = getBlockId(uniqueId);

    if (!url) {
      return null;
    }

    const image = (
      <img
        src={url}
        alt={alt}
        className={id ? `wp-image-${id}` : null}
        title={title}
        style={{
          ...getBorderCSSValue({ attributes, prefix: 'image' }),
          ...getBoxShadowCSSValue({ attributes, prefix: 'image' }),
        }}
      />
    );

    const style = {
      backgroundColor: backgroundColor || undefined,
    };

    const figure = (
      <Fragment>
        {href ? (
          <a
            className={linkClass}
            href={href}
            target={linkTarget}
            rel={newRel}
            style={style}
          >
            {image}
          </a>
        ) : (
          image
        )}
        {!RichText.isEmpty(caption) && (
          <RichText.Content tagName="figcaption" value={caption} />
        )}
      </Fragment>
    );

    if ('left' === align || 'right' === align || 'center' === align) {
      return (
        <div id={blockId} style={style}>
          <ImageStyle attributes={attributes} />
          <figure className={classes}>{figure}</figure>
        </div>
      );
    }

    return (
      <figure id={blockId} className={classes} style={style}>
        <ImageStyle attributes={attributes} />
        {figure}
      </figure>
    );
  },
};

export default v1;
