import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../../../components/controls/border-controls/helpers';
import FoodMenuItemStyle from '../style';
import getBlockId from '../../../../util/getBlockId';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../../components/controls/animation-controls/helpers';

export default {
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
    ...animationControlAttributes(),
  },
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
        {...getAnimationControlDataAttributes(attributes.animation)}
      >
        <FoodMenuItemStyle attributes={attributes} />
        <InnerBlocks.Content />
      </div>
    );
  },
};
