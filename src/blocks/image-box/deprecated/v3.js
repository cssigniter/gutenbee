import { RichText } from 'wp.blockEditor';
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

const ImageBoxStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, imageMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={imageMargin}
        rule=".wp-block-gutenbee-imagebox-figure { margin: %s; }"
        unit="px"
      />
      {children}
    </StyleSheetV1>
  );
};

const ImageBox = ({ className, attributes }) => {
  const {
    uniqueId,
    titleContent,
    titleNodeLevel,
    titleFontSize,
    textContent,
    textFontSize,
    url,
    alt,
    imageAlign,
    imageWidth,
    contentAlign,
    titleBottomSpacing,
    textColor,
    titleColor,
    backgroundColor,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={classNames({
        [className]: true,
        [`wp-block-gutenbee-imagebox-align-${imageAlign}`]: true,
        [`wp-block-gutenbee-imagebox-content-align-${contentAlign}`]: !!contentAlign,
      })}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
    >
      <ImageBoxStyle attributes={attributes} />
      <figure className="wp-block-gutenbee-imagebox-figure">
        <img
          src={url}
          alt={alt}
          style={{
            width: imageWidth ? `${imageWidth}px` : undefined,
          }}
        />
      </figure>

      <div className="wp-block-gutenbee-imagebox-content">
        {!RichText.isEmpty(titleContent) && (
          <RichText.Content
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            className="wp-block-gutenbee-imagebox-title"
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
            className="wp-block-gutenbee-imagebox-text"
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

const v3 = {
  attributes: {
    uniqueId: {
      type: 'string',
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
    },
    titleBottomSpacing: {
      type: 'number',
    },
    textContent: {
      source: 'html',
      selector: 'p',
      default: '',
    },
    textFontSize: {
      type: 'number',
    },
    url: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
    },
    alt: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'alt',
      default: '',
    },
    id: {
      type: 'number',
    },
    imageAlign: {
      type: 'string',
      default: 'left',
    },
    imageWidth: {
      type: 'number',
      default: 160,
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
    imageMargin: {
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
      titleFontSize: attributes.titleFontSize
        ? {
            desktop: attributes.titleFontSize,
            tablet: attributes.titleFontSize,
            mobile: attributes.titleFontSize,
          }
        : getDefaultResponsiveValue(),
      textFontSize: attributes.textFontSize
        ? {
            desktop: attributes.textFontSize,
            tablet: attributes.textFontSize,
            mobile: attributes.textFontSize,
          }
        : getDefaultResponsiveValue(),
      imageWidth: attributes.imageWidth
        ? {
            desktop: attributes.imageWidth,
            tablet: attributes.imageWidth,
            mobile: attributes.imageWidth,
          }
        : getDefaultResponsiveValue(),
    };
  },
  save({ className, attributes }) {
    return <ImageBox className={className} attributes={attributes} />;
  },
};

export default v3;
