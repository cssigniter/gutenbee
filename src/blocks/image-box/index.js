/* global wp */

/**
 * Image Box
 *
 * Image with title, description, and link
 */

import Image from './Image';

const { __, sprintf } = wp.i18n;
const {
  registerBlockType,
  InspectorControls,
  BlockDescription,
  AlignmentToolbar,
  Editable,
} = wp.blocks;
const {
  Toolbar,
} = wp.components;

registerBlockType('gutenbee/image-box', {
  title: __('GutenBee Image Box'),
  icon: 'format-image',
  category: 'common',
  keywords: [
    __('image'),
    __('image box'),
    __('media'),
  ],
  attributes: {
    titleTag: {
      type: 'string',
      source: 'prop',
      selector: 'h1, h2, h3, h4, h5, h6',
      prop: 'nodeName',
      default: 'H3',
    },
    titleText: {
      type: 'array',
      source: 'children',
      selector: 'h1, h2, h3, h4, h5, h6',
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
    description: {
      source: 'children',
      selector: 'p',
    },
    align: {
      type: 'string',
      default: 'center',
    },
  },
  edit({ className, attributes, setAttributes, focus, setFocus }) {
    const {
      titleTag,
      titleText,
      align,
      description,
    } = attributes;

    return [
      <div key="image-box" className={className}>
        <Editable
          tagName={titleTag.toLowerCase()}
          value={titleText}
          onFocus={setFocus}
          onChange={value => setAttributes({ titleText: value })}
          placeholder={__('Title')}
        />

        <Image {...arguments[0]} />

        <Editable
          tagName="p"
          value={description}
          onFocus={setFocus}
          onChange={value => setAttributes({ description: value })}
          placeholder={__('Description')}
        />
      </div>,
      focus && (
        <InspectorControls key="inspector">
          <BlockDescription>
            <p>{__('An image box with title, description, and optional link.')}</p>
          </BlockDescription>

          <p>{__('Title size')}</p>
          <Toolbar
            controls={
              [1, 2, 3, 4, 5, 6].map(level => ({
                icon: 'heading',
                title: sprintf(__('Heading %s'), level),
                isActive: `H${level}` === titleTag,
                onClick: () => setAttributes({ titleTag: `H${level}` }),
                subscript: level,
              }))
            }
          />

          <p>{__('Alignment')}</p>
          <AlignmentToolbar
            value={align}
            onChange={value => setAttributes({ align: value })}
          />
        </InspectorControls>
      ),
    ];
  },
  save({ className, attributes: {
    titleTag,
    titleText,
    description,
    url,
    alt,
  } }) {
    const HeadingTag = titleTag.toLowerCase();

    return (
      <div className={className}>
        {titleText && (
          <HeadingTag>
            {titleText}
          </HeadingTag>
        )}

        <figure>
          <img src={url} alt={alt || ''} />
        </figure>

        {description && (
          <p>{description}</p>
        )}
      </div>
    );
  },
});
