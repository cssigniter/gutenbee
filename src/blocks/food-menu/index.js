import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import FoodMenuEdit from './edit';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import FoodMenuStyle from './style';
import getBlockId from '../../util/getBlockId';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import FoodMenuIcon from './block-icon';
import deprecated from './deprecated';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

registerBlockType('gutenbee/food-menu', {
  title: __('GutenBee Food Menu'),
  description: __('List your favorite dishes.'),
  icon: FoodMenuIcon,
  category: 'gutenbee',
  keywords: [__('food'), __('menu')],
  supports: {
    anchor: false,
  },
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
    gutter: {
      type: 'object',
      default: getDefaultResponsiveValue(),
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
    blockBreakpointVisibility: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: false,
        tablet: false,
        mobile: false,
      }),
    },
    blockAuthVisibility: {
      type: 'object',
      default: {
        loggedIn: false,
        loggedOut: false,
      },
    },
  },
  deprecated,
  edit: FoodMenuEdit,
  save: ({ className, attributes }) => {
    const {
      uniqueId,
      columns,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
          {
            'wp-block-gutenbee-food-menu': true,
            [`gutenbee-food-menu-columns-desktop-${columns.desktop}`]: true,
            [`gutenbee-food-menu-columns-tablet-${columns.tablet}`]: true,
            [`gutenbee-food-menu-columns-mobile-${columns.mobile}`]: true,
          },
        )}
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
