import { Fragment } from 'wp.element';
import { __, _x } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import ImageEdit from './edit';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import ImageStyle from './style';
import ImageBlockIcon from './block-icon';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';

registerBlockType('gutenbee/image', {
  title: __('GutenBee Image'),
  description: __('Insert an image to make a visual statement.'),
  icon: ImageBlockIcon,
  category: 'gutenbee',
  keywords: ['img', __('photo')],
  supports: {
    anchor: false,
  },
  example: {
    attributes: {
      sizeSlug: 'large',
      url: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg',
      caption: __('Mont Blanc appears—still, snowy, and serene.'),
    },
  },
  styles: [
    { name: 'default', label: _x('Default', 'block style'), isDefault: true },
    { name: 'circle-mask', label: _x('Circle Mask', 'block style') },
  ],
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
  getEditWrapperProps(attributes) {
    const { align, width } = attributes;
    if (
      'left' === align ||
      'center' === align ||
      'right' === align ||
      'wide' === align ||
      'full' === align
    ) {
      return { 'data-align': align, 'data-resized': !!width };
    }
  },
  edit: ImageEdit,
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
});
