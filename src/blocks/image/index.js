import { __, _x } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import ImageEdit from './edit';

registerBlockType('gutenbee/image', {
  title: __('Image'),
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
      type: 'number',
    },
    height: {
      type: 'number',
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
      default: {
        desktop: {
          top: '',
          right: '',
          bottom: '',
          left: '',
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
    },
    blockMargin: {
      type: 'object',
      default: {
        desktop: {
          top: '',
          right: '',
          bottom: '',
          left: '',
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
  save: () => {},
});
