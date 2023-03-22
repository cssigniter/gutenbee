/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('gutenbee/product-category-list', {
  title: __('GutenBee Product Category List'),
  description: __('Create product category grids or sliders.'),
  icon: 'smiley',
  category: 'gutenbee',
  keywords: [__('category'), __('product'), __('woocommerce')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    numberColumns: {
      type: 'integer',
      default: 3,
    },
    showTitle: {
      type: 'boolean',
      default: true,
    },
    showCount: {
      type: 'boolean',
      default: true,
    },
    buttonText: {
      type: 'string',
      default: __('All products'),
    },
    buttonLink: {
      type: 'string',
      default: '',
    },
    buttonAlignment: {
      type: 'string',
      default: 'left',
    },
    buttonNewTab: {
      type: 'boolean',
      default: false,
    },
    layout: {
      type: 'string',
      default: 'grid',
    },
    items: {
      type: 'array',
      default: [{ productCat: '', customImage: '' }],
    },
  },
  /**
   * @see ./edit.js
   */
  edit: Edit,

  save: () => null,
});
