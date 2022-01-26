import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import FoodMenuItemStyle from './style';
import getBlockId from '../../../util/getBlockId';
import FoodMenuItemEdit from './edit';
import FoodMenuItemIcon from './block-icon';
import deprecated from './deprecated';

registerBlockType('gutenbee/food-menu-item', {
  title: __('GutenBee Food Menu Item'),
  description: __('Single food menu item.'),
  icon: FoodMenuItemIcon,
  category: 'gutenbee',
  keywords: [__('food'), __('menu')],
  parent: ['gutenbee/food-menu'],
  getEditWrapperProps(attributes) {
    const { verticalContentAlignment } = attributes;

    if (verticalContentAlignment.desktop) {
      return { 'data-vertical-align': verticalContentAlignment.desktop };
    }
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    verticalContentAlignment: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: 'flex-start',
        tablet: '',
        mobile: '',
      }),
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
  deprecated,
  edit: FoodMenuItemEdit,
  save: ({ attributes, className }) => {
    const { uniqueId, backgroundColor } = attributes;

    return (
      <div
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        className={classNames(className, getBlockId(uniqueId), {
          'wp-block-gutenbee-food-menu-item': true,
        })}
      >
        <FoodMenuItemStyle attributes={attributes} />
        <InnerBlocks.Content />
      </div>
    );
  },
});
