import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
} from 'wp.blockEditor';

import FoodMenuItemIcon from '../food-menu-item/block-icon';

registerBlockType('gutenbee/food-menu-wrapper', {
  apiVersion: 3,
  title: __('GutenBee Food Menu Group', 'gutenbee'),
  description: __('Wrapper for the Food Menu block.', 'gutenbee'),
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
            placeholder: __('Menu item name...', 'gutenbee'),
            level: 5,
            fontSize: {
              desktop: '22',
              tablet: '',
              mobile: '',
            },
          },
        ],
        [
          'gutenbee/paragraph',
          {
            placeholder: __('Price', 'gutenbee'),
            className: 'wp-block-gutenbee-food-menu-item-price',
          },
        ],
        [
          'gutenbee/paragraph',
          {
            placeholder: __(
              'Write a description for your menu item...',
              'gutenbee',
            ),
          },
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
      <div
        {...useBlockProps.save({
          className: 'wp-block-gutenbee-food-menu-item-wrapper',
        })}
      >
        <InnerBlocks.Content />
      </div>
    );
  },
});
