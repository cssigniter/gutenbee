/**
 * Image Box
 *
 * Image with title, description, and link
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.editor';
import classNames from 'classnames';

import ImageBoxEditBlock from './edit';
import ImageBoxBlockIcon from './block-icon';

const ImageBox = ({ className, attributes }) => {
  const {
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
  } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
        [`${className}-align-${imageAlign}`]: true,
        [`${className}-content-align-${contentAlign}`]: true,
      })}
    >
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
        <RichText.Content
          tagName={`h${titleNodeLevel}`}
          value={titleContent}
          className={`${className}-title`}
          style={{
            fontSize: titleFontSize ? `${titleFontSize}px` : undefined,
          }}
        />

        <RichText.Content
          tagName="p"
          value={textContent}
          className={`${className}-text`}
          style={{
            fontSize: textFontSize ? `${textFontSize}px` : undefined,
          }}
        />
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
  ],
  attributes: {
    titleContent: {
      type: 'array',
      source: 'children',
      selector: 'h1,h2,h3,h4,h5,h6',
      default: [],
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
      type: 'array',
      source: 'children',
      selector: 'p',
      default: [],
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
  },
  edit: ImageBoxEditBlock,
  save({ className, attributes }) {
    return (
      <ImageBox
        className={className}
        attributes={attributes}
      />
    );
  },
});
