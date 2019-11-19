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

registerBlockType('gutenbee/image', {
  title: __('GutenBee Image'),
  description: __('Insert an image to make a visual statement.'),
  icon: 'I',
  category: 'gutenbee',
  keywords: ['img', __('photo')],
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
      object: 'number',
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
    } = attributes;

    const newRel = isEmpty(rel) ? undefined : rel;

    const classes = classNames({
      [`align${align}`]: align,
      [`size-${sizeSlug}`]: sizeSlug,
    });

    const blockId = getBlockId(uniqueId);

    const image = (
      <img
        src={url}
        alt={alt}
        className={id ? `wp-image-${id}` : null}
        title={title}
      />
    );

    const figure = (
      <Fragment>
        {href ? (
          <a className={linkClass} href={href} target={linkTarget} rel={newRel}>
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
        <Fragment>
          <ImageStyle attributes={attributes} />
          <div id={blockId}>
            <figure className={classes}>{figure}</figure>
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <ImageStyle attributes={attributes} />
        <figure id={blockId} className={classes}>
          {figure}
        </figure>
      </Fragment>
    );
  },
});
