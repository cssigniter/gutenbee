/**
 * Image Box
 *
 * Image with title, description, and link
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import ImageBoxEditBlock from './edit';
import ImageBoxBlockIcon from './block-icon';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import ImageBoxStyle from './style';
import getBlockId from '../../util/getBlockId';
import deprecated from './deprecated';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

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

registerBlockType('gutenbee/imagebox', {
  title: __('GutenBee Image Box'),
  description: __('An image box with a title and a description.'),
  icon: ImageBoxBlockIcon,
  category: 'gutenbee',
  keywords: [
    __('image'),
    __('image box'),
    __('media'),
    'gutenbeeimage',
    'imagegutenbee',
  ],
  supports: {
    anchor: true,
  },
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
  },
  deprecated,
  edit: ImageBoxEditBlock,
  save({ className, attributes }) {
    return <ImageBox className={className} attributes={attributes} />;
  },
});
