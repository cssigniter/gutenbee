import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';

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
import Countup from '../Countup';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const CountupStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    textFontSize,
    titleFontSize,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={textFontSize}
        rule=".wp-block-gutenbee-countup-number { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={titleFontSize}
        rule=".wp-block-gutenbee-countup-title { font-size: %s; }"
        unit="px"
      />

      {children}
    </StyleSheetV1>
  );
};

const CountupRender = ({ attributes, className }) => {
  const {
    titleContent,
    align,
    titleColor,
    backgroundColor,
    titleTopMargin,
    uniqueId,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={classNames({
        [className]: true,
        [`wp-block-gutenbee-countup-align-${align}`]: !!align,
      })}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
    >
      <CountupStyle attributes={attributes} />

      <Countup {...attributes} className="wp-block-gutenbee-countup-number" />

      {!RichText.isEmpty(titleContent) && (
        <RichText.Content
          tagName="p"
          value={titleContent}
          className="wp-block-gutenbee-countup-title"
          style={{
            color: titleColor || undefined,
            marginTop:
              titleTopMargin != null ? `${titleTopMargin}px` : undefined,
          }}
        />
      )}
    </div>
  );
};

const v2 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    startNumber: {
      type: 'string',
      default: '0',
    },
    endNumber: {
      type: 'string',
      default: '999',
    },
    animationDuration: {
      type: 'number',
      default: 2.5,
    },
    separator: {
      type: 'string',
      default: ',',
    },
    prefix: {
      type: 'string',
    },
    suffix: {
      type: 'string',
    },
    textFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 16 }),
    },
    titleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 16 }),
    },
    titleContent: {
      source: 'html',
      selector: 'p',
    },
    align: {
      type: 'string',
      default: 'left',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    titleTopMargin: {
      type: 'number',
    },
    textColor: {
      type: 'string',
    },
    titleColor: {
      type: 'string',
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
  save({ attributes, className }) {
    return <CountupRender attributes={attributes} className={className} />;
  },
};

export default v2;
