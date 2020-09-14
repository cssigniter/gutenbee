import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { InnerBlocks, __experimentalBlock as Block } from 'wp.blockEditor';

registerBlockType('gutenbee/food-menu-wrapper', {
  title: __('GutenBee Food Menu Item Wrapper'),
  // TODO update description
  description: __('A wrapper block or food menu items.'),
  // TODO add icon
  // icon: ButtonsBlockIcon,
  parent: ['gutenbee/food-menu-item'],
  category: 'gutenbee',
  keywords: [__('food'), __('menu')],
  attributes: {},
  edit: () => (
    <div className="wp-block-gutenbee-food-menu-item-wrapper">
      <InnerBlocks
        __experimentalTagName={Block.div}
        template={[
          ['gutenbee/heading', { placeholder: 'Menu item name...', level: 5 }],
          ['gutenbee/paragraph', { placeholder: 'Price' }],
          [
            'gutenbee/paragraph',
            { placeholder: 'Write a description for your menu item...' },
          ],
        ]}
        templateLock="all"
      />
    </div>
  ),
  save: () => {
    return (
      <div className="wp-block-gutenbee-food-menu-item-wrapper">
        <InnerBlocks.Content />
      </div>
    );
  },
});
