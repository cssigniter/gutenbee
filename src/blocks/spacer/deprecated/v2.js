import {
  getDefaultBackgroundImageValue,
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import getBlockId from '../../../util/getBlockId';
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import Rule from '../../../components/stylesheet/Rule';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';

const SpacerStyle = ({ attributes, children }) => {
  const { uniqueId, height, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={height} rule="{ height: %s; }" unit="px" />
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      {children}
    </StyleSheetV1>
  );
};

export default {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    height: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 100 }),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    backgroundColor: {
      type: 'string',
    },
    backgroundImage: {
      type: 'object',
      default: getDefaultBackgroundImageValue(),
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  migrate(attributes) {
    return attributes;
  },
  save: ({ attributes, className }) => {
    const { uniqueId, backgroundColor, backgroundImage } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        className={className}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBackgroundImageStyle(backgroundImage),
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        aria-hidden
      >
        <SpacerStyle attributes={attributes} />
      </div>
    );
  },
};
