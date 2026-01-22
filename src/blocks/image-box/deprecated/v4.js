import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import StyleSheet from '../../../components/stylesheet';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../components/controls/animation-controls/helpers';

const ImageBoxStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    imageMargin,
    titleFontSize,
    textFontSize,
    imageWidth,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-imagebox.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-imagebox.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={imageMargin}
        rule=".wp-block-gutenbee-imagebox.[root] .wp-block-gutenbee-imagebox-figure { margin: %s; }"
        unit="px"
      />
      <Rule
        value={titleFontSize}
        rule=".wp-block-gutenbee-imagebox.[root] .wp-block-gutenbee-imagebox-title { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={textFontSize}
        rule=".wp-block-gutenbee-imagebox.[root] .wp-block-gutenbee-imagebox-text { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={imageWidth}
        rule=".wp-block-gutenbee-imagebox.[root] .wp-block-gutenbee-imagebox-figure img { width: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

const ImageBox = ({ className, attributes }) => {
  const {
    uniqueId,
    titleContent,
    titleNodeLevel,
    textContent,
    url,
    alt,
    imageAlign,
    contentAlign,
    titleBottomSpacing,
    textColor,
    titleColor,
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
          [`wp-block-gutenbee-imagebox-align-${imageAlign}`]: true,
          [`wp-block-gutenbee-imagebox-content-align-${contentAlign}`]: !!contentAlign,
        },
      )}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
      {...getAnimationControlDataAttributes(attributes.animation)}
    >
      <ImageBoxStyle attributes={attributes} />

      {url && (
        <figure className="wp-block-gutenbee-imagebox-figure">
          <img src={url} alt={alt} />
        </figure>
      )}

      <div className="wp-block-gutenbee-imagebox-content">
        {!RichText.isEmpty(titleContent) && (
          <RichText.Content
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            className="wp-block-gutenbee-imagebox-title"
            style={{
              color: titleColor || undefined,
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
            }}
          />
        )}
      </div>
    </div>
  );
};

const v4 = {
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
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: undefined,
        tablet: undefined,
        mobile: undefined,
      }),
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
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: undefined,
        tablet: undefined,
        mobile: undefined,
      }),
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
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: 160,
        tablet: undefined,
        mobile: undefined,
      }),
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
    ...animationControlAttributes(),
  },
  save({ className, attributes }) {
    return <ImageBox className={className} attributes={attributes} />;
  },
};

export default v4;
