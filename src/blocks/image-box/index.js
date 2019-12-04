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
import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import ImageBoxStyle from './style';
import getBlockId from '../../util/getBlockId';
import deprecated from './deprecated';

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
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={classNames({
        [className]: true,
        [`${className}-align-${imageAlign}`]: true,
        [`${className}-content-align-${contentAlign}`]: !!contentAlign,
      })}
    >
      <ImageBoxStyle attributes={attributes} />
      <figure className={`${className}-figure`}>
        <img
          src={url}
          alt={alt}
          style={{
            width: imageWidth ? `${imageWidth}px` : undefined,
          }}
        />
      </figure>

      <div className={`${className}-content`}>
        {!RichText.isEmpty(titleContent) && (
          <RichText.Content
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            className={`${className}-title`}
            style={{
              fontSize: titleFontSize ? `${titleFontSize}px` : undefined,
              marginBottom: titleBottomSpacing
                ? `${titleBottomSpacing}px`
                : undefined,
            }}
          />
        )}

        {!RichText.isEmpty(textContent) && (
          <RichText.Content
            tagName="p"
            value={textContent}
            className={`${className}-text`}
            style={{
              fontSize: textFontSize ? `${textFontSize}px` : undefined,
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
  keywords: [__('image'), __('image box'), __('media')],
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
      default: null,
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
      default: 16,
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
  },
  deprecated,
  edit: ImageBoxEditBlock,
  save({ className, attributes }) {
    return <ImageBox className={className} attributes={attributes} />;
  },
});
