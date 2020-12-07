import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import Rule from '../../../components/stylesheet/Rule';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import iconV3, { IconV3 } from '../../icon/deprecated/v3';

const IconBoxStyle = ({ attributes, children }) => {
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

const IconBox = ({ className, attributes }) => {
  const {
    uniqueId,
    titleNodeLevel,
    titleContent,
    titleFontSize,
    textContent,
    textFontSize,
    align,
    contentAlign,
    iconMargin,
    iconPadding,
    titleBottomSpacing,
    titleColor,
    textColor,
    backgroundColor,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={classNames({
        [className]: true,
        [`wp-block-gutenbee-iconbox-align-${align}`]: true,
        [`wp-block-gutenbee-iconbox-content-align-${contentAlign}`]: !!contentAlign,
      })}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
    >
      <IconBoxStyle attributes={attributes} />
      <IconV3
        id={`${blockId}-icon`}
        {...{
          ...attributes,
          blockMargin: iconMargin,
          blockPadding: iconPadding,
        }}
      />
      <div className="wp-block-gutenbee-iconbox-content">
        {!RichText.isEmpty(titleContent) && (
          <RichText.Content
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            className="wp-block-gutenbee-iconbox-title"
            style={{
              color: titleColor || undefined,
              fontSize: titleFontSize ? `${titleFontSize}px` : undefined,
              marginBottom:
                titleBottomSpacing != null
                  ? `${titleBottomSpacing}px`
                  : undefined,
            }}
          />
        )}

        {!RichText.isEmpty(textContent) && (
          <RichText.Content
            tagName="p"
            value={textContent}
            className="wp-block-gutenbee-iconbox-text"
            style={{
              color: textColor || undefined,
              fontSize: textFontSize ? `${textFontSize}px` : undefined,
            }}
          />
        )}
      </div>
    </div>
  );
};

const deprecated = {
  attributes: {
    ...iconV3.attributes,
    uniqueId: {
      type: 'string',
    },
    titleBottomSpacing: {
      type: 'number',
    },
    titleContent: {
      source: 'html',
      selector: 'h1,h2,h3,h4,h5,h6',
      default: '',
    },
    titleNodeLevel: {
      type: 'number',
      default: 3,
    },
    titleFontSize: {
      type: 'number',
      default: null,
    },
    textContent: {
      source: 'html',
      selector: 'p',
      default: '',
    },
    textFontSize: {
      type: 'number',
      default: 16,
    },
    align: {
      type: 'string',
      default: 'left',
    },
    contentAlign: {
      type: 'string',
      default: null,
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    iconMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    iconPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
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
  migrate(attributes) {
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
      size: {
        desktop: attributes.size || 40,
        tablet: '',
        mobile: '',
      },
      textFontSize: {
        desktop: attributes.textFontSize || '',
        tablet: '',
        mobile: '',
      },
      titleFontSize: {
        desktop: attributes.titleFontSize || '',
        tablet: '',
        mobile: '',
      },
    };
  },
  save({ className, attributes }) {
    return <IconBox className={className} attributes={attributes} />;
  },
};

export default deprecated;
