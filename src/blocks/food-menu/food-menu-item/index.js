import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { InnerBlocks, __experimentalBlock as Block } from 'wp.blockEditor';

import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';

registerBlockType('gutenbee/food-menu-item', {
  title: __('GutenBee Food Menu Item'),
  // TODO update description
  description: __('List your favorite dishes.'),
  // TODO add icon
  // icon: ButtonsBlockIcon,
  category: 'gutenbee',
  keywords: [__('food'), __('menu')],
  parent: ['gutenbee/food-menu'],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
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
  edit: () => (
    <InnerBlocks
      template={[
        [
          'gutenbee/image',
          {
            caption: '',
            width: {
              desktop: 180,
              tablet: '',
              mobile: '',
            },
          },
        ],
        ['gutenbee/food-menu-wrapper', {}],
      ]}
      templateLock="all"
      __experimentalTagName={Block.div}
    />
  ),
  save: () => {
    return (
      <div className="wp-block-gutenbee-food-menu-item">
        <InnerBlocks.Content />
      </div>
    );
  },
});
