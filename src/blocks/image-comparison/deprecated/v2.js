import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const ImageComparisonStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      {children}
    </StyleSheetV1>
  );
};

const v2 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    urlA: {
      type: 'string',
      source: 'attribute',
      selector: '.img-1',
      attribute: 'src',
    },
    idA: {
      type: 'number',
    },
    urlB: {
      type: 'string',
      source: 'attribute',
      selector: '.img-2',
      attribute: 'src',
    },
    idB: {
      type: 'number',
    },
    offset: {
      type: 'number',
      default: 50,
    },
    imageSize: {
      type: 'string',
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    backgroundColor: {
      type: 'string',
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
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
    const { uniqueId, urlA, urlB, offset, backgroundColor } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        className={className}
      >
        <div className="wp-block-gutenbee-comparison-wrap" data-offset={offset}>
          <ImageComparisonStyle attributes={attributes} />

          {urlA && <img className="img-1" src={urlA} alt="" />}
          {urlB && <img className="img-2" src={urlB} alt="" />}
        </div>
      </div>
    );
  },
};

export default v2;
