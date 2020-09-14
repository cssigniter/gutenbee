import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import FoodMenuEdit from './edit';
import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import FoodMenuStyle from './style';
import getBlockId from '../../util/getBlockId';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';

registerBlockType('gutenbee/food-menu', {
  title: __('GutenBee Food Menu'),
  description: __('List your favorite dishes.'),
  // TODO add icon
  // icon: ButtonsBlockIcon,
  category: 'gutenbee',
  keywords: [__('food'), __('menu')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    columns: {
      type: 'object',
      default: {
        desktop: 1,
        tablet: 1,
        mobile: 1,
      },
    },
    backgroundColor: {
      type: 'string',
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
  edit: FoodMenuEdit,
  save: ({ className, attributes }) => {
    const { uniqueId, columns, backgroundColor } = attributes;

    return (
      <div
        id={getBlockId(uniqueId)}
        className={classNames(className, {
          'wp-block-gutenbee-food-menu': true,
          [`gutenbee-food-menu-columns-desktop-${columns.desktop}`]: true,
          [`gutenbee-food-menu-columns-tablet-${columns.tablet}`]: true,
          [`gutenbee-food-menu-columns-mobile-${columns.mobile}`]: true,
        })}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <FoodMenuStyle attributes={attributes} />
        <InnerBlocks.Content />
      </div>
    );
  },
});
