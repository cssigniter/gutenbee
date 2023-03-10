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
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('gutenbee/product-tabs', {
  title: __('GutenBee Product Tabs'),
  description: __('Create post listings in a tabbed layout.'),
  icon: 'smiley',
  category: 'gutenbee',
  keywords: [__('tabs'), __('product'), __('woocommerce')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    categoryIds: {
      type: 'array',
      default: [],
    },
    tabIndices: {
      type: 'array',
      default: [],
    },
    activeTabIndex: {
      type: 'integer',
      default: 0,
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
    tabButtonAlignment: {
      type: 'string',
      default: 'left',
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
    buttonTextColor: {
      type: 'string',
      default: '',
    },
    buttonBgColor: {
      type: 'string',
      default: '',
    },
    buttonBorderColor: {
      type: 'string',
      default: '',
    },
    activeButtonTextColor: {
      type: 'string',
      default: '',
    },
    activeButtonBgColor: {
      type: 'string',
      default: '',
    },
    activeButtonBorderColor: {
      type: 'string',
      default: '',
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
  save,
});
