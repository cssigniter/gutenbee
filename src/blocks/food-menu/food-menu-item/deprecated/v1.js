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
import getBlockId from '../../../../util/getBlockId';
import { getBorderCSSValue } from '../../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../../components/stylesheet/deprecated/v1';
import Rule from '../../../../components/stylesheet/Rule';

const FoodMenuItemStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    verticalContentAlignment,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule value={verticalContentAlignment} rule="{ align-items: %s; }" />
      {children}
    </StyleSheetV1>
  );
};

const v1 = {
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
};

export default v1;
