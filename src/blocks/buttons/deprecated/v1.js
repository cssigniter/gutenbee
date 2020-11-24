import { InnerBlocks } from 'wp.blockEditor';

import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';

const ButtonsStyle = ({ attributes, children }) => {
  const { uniqueId, align, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule value={align} rule="{ justify-content: %s; }" unit="" />

      {children}
    </StyleSheetV1>
  );
};

const v1 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    align: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: 'flex-start',
        tablet: '',
        mobile: '',
      }),
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
  save: ({ attributes }) => {
    const { uniqueId, backgroundColor } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        style={{
          backgroundColor: backgroundColor || undefined,
        }}
      >
        <ButtonsStyle attributes={attributes} />
        <InnerBlocks.Content />
      </div>
    );
  },
};

export default v1;
