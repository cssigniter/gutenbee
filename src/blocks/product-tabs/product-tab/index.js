import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';

import Edit from './edit';
import save from './save';

registerBlockType('gutenbee/product-tab', {
  title: __('GutenBee Product Tab'),
  description: __('Inner block of GutenBee Product Tabs.'),
  icon: 'smiley',
  category: 'gutenbee',
  keywords: [__('tabs'), __('post')],
  parent: ['gutenbee/product-tabs'],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    content: {
      type: 'string',
      source: 'html',
      selector: '.wp-block-gutenbee-product-tab',
      default: '',
    },
    termId: {
      type: 'string',
      default: '',
    },
    tabIndex: {
      type: 'integer',
      default: 0,
    },
    selectedProducts: {
      type: 'array',
      default: [],
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
