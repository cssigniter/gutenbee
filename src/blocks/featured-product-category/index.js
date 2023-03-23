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
registerBlockType('gutenbee/featured-product-category', {
  title: __('GutenBee Featured Product Category'),
  description: __('Showcase a specific product category.'),
  icon: 'smiley',
  category: 'gutenbee',
  keywords: [__('featured product category'), __('product'), __('woocommerce')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    categoryId: {
      type: 'integer',
    },
    numberColumns: {
      type: 'integer',
      default: 3,
    },
    numberProducts: {
      type: 'integer',
      default: 3,
    },
    handpickedProducts: {
      type: 'array',
      default: [],
    },
    showCat: {
      type: 'boolean',
      default: true,
    },
    showRating: {
      type: 'boolean',
      default: true,
    },
    showPrice: {
      type: 'boolean',
      default: true,
    },
    showStock: {
      type: 'boolean',
      default: true,
    },
    showButton: {
      type: 'boolean',
      default: true,
    },
    layout: {
      type: 'string',
      default: 'grid',
    },
  },
  /**
   * @see ./edit.js
   */
  edit: Edit,

  /**
   * @see ./save.js
   */
  save: () => null,
});
