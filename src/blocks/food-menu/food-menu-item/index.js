import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import FoodMenuItemStyle from './style';
import getBlockId from '../../../util/getBlockId';
import FoodMenuItemEdit from './edit';

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
    verticalContentAlignment: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
  },
  edit: FoodMenuItemEdit,
  save: ({ attributes, className }) => {
    const { uniqueId, backgroundColor } = attributes;

    return (
      <div
        id={getBlockId(uniqueId)}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        className={classNames(className, {
          'wp-block-gutenbee-food-menu-item': true,
        })}
      >
        <FoodMenuItemStyle attributes={attributes} />
        <InnerBlocks.Content />
      </div>
    );
  },
});
