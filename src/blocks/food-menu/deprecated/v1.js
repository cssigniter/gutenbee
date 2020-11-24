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
import getBlockId from '../../../util/getBlockId';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const FoodMenuStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, gutter } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule value={gutter} rule="{ grid-gap: %s; }" unit="px" />
      {children}
    </StyleSheetV1>
  );
};

const v1 = {
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
  },
  migrate: attributes => {
    return {
      ...attributes,
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
    };
  },
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
};

export default v1;
