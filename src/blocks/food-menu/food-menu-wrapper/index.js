import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import {
  InnerBlocks,
  useBlockProps,
  __experimentalUseInnerBlocksProps,
  useInnerBlocksProps as currentUseInnerBlockProps,
} from 'wp.blockEditor';

import FoodMenuItemIcon from '../food-menu-item/block-icon';

const useInnerBlocksProps =
  __experimentalUseInnerBlocksProps ?? currentUseInnerBlockProps;

registerBlockType('gutenbee/food-menu-wrapper', {
  title: __('GutenBee Food Menu Group'),
  description: __('Wrapper for the Food Menu block.'),
  icon: FoodMenuItemIcon,
  parent: ['gutenbee/food-menu-item'],
  category: 'gutenbee',
  keywords: [],
  attributes: {},
  edit: () => {
    const innerBlocksProps = useInnerBlocksProps(useBlockProps(), {
      template: [
        [
          'gutenbee/heading',
          {
            placeholder: 'Menu item name...',
            level: 5,
            fontSize: {
              desktop: 22,
              tablet: '',
              mobile: '',
            },
          },
        ],
        [
          'gutenbee/paragraph',
          {
            placeholder: 'Price',
            className: 'wp-block-gutenbee-food-menu-item-price',
          },
        ],
        [
          'gutenbee/paragraph',
          { placeholder: 'Write a description for your menu item...' },
        ],
      ],
      templateLock: 'all',
    });

    return (
      <div className="wp-block-gutenbee-food-menu-item-wrapper">
        <div {...innerBlocksProps} />
      </div>
    );
  },
  save: () => {
    return (
      <div className="wp-block-gutenbee-food-menu-item-wrapper">
        <InnerBlocks.Content />
      </div>
    );
  },
});
