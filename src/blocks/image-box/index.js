/**
 * Image Box
 *
 * Image with title, description, and link
 */

import { Fragment } from 'wp.element';
import { __, sprintf } from 'wp.i18n';
import { Toolbar } from 'wp.components';
import {
  registerBlockType,
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  RichText,
  MediaUpload,
} from 'wp.blocks';
import {
  PanelBody,
  IconButton,
  withState,
} from 'wp.components';
import classNames from 'classnames';

import TextControls from '../../components/controls/TextControls';
import ImagePlaceholder from '../../components/image-placeholder/ImagePlaceholder';

const ImageBox = ({ className, attributes }) => {
  const {
    titleContent,
    titleNodeName,
    titleFontSize,
    textContent,
    textFontSize,
    url,
    alt,
    imageAlign,
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
        <img src={url} alt={alt} />
      </figure>

      <div className={`${className}-content`}>
        <RichText.Content
          tagName={titleNodeName.toLowerCase()}
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

const ImageBoxEditBlock = ({
  className,
  attributes,
  setAttributes,
  isSelected,
  editable,
  setState,
}) => {
  const {
    titleContent,
    titleNodeName,
    titleFontSize,
    textContent,
    textFontSize,
    url,
    alt,
    id,
    imageAlign,
    contentAlign,
  } = attributes;
  const setActiveEditable = newEditable =>
    setState({ editable: newEditable });

  return (
    <Fragment>
      {!url ? (
        <ImagePlaceholder
          icon="format-image"
          label={__('Image')}
          onSelectImage={(image) => {
            setAttributes({
              url: image.url,
              alt: image.alt,
            });
          }}
        />
      ) : (
        <div
          className={classNames({
            [className]: true,
            [`${className}-align-${imageAlign}`]: true,
            [`${className}-content-align-${contentAlign}`]: true,
          })}
        >
          <figure className={`${className}-figure`}>
            <img src={url} alt={alt} />
          </figure>

          <div className={`${className}-content`}>
            <RichText
              tagName={titleNodeName.toLowerCase()}
              value={titleContent}
              onChange={value => setAttributes({ titleContent: value })}
              className={`${className}-title`}
              placeholder={__('Write heading…')}
              isSelected={isSelected && editable === 'title'}
              onFocus={() => setActiveEditable('title')}
              style={{
                fontSize: titleFontSize ? `${titleFontSize}px` : undefined,
              }}
            />

            <RichText
              tagName="p"
              value={textContent}
              onChange={value => setAttributes({ textContent: value })}
              className={`${className}-text`}
              placeholder={__('Write content…')}
              multiline="p"
              isSelected={isSelected && editable === 'text'}
              onFocus={() => setActiveEditable('text')}
              style={{
                fontSize: textFontSize ? `${textFontSize}px` : undefined,
              }}
            />
          </div>
        </div>
      )}

      {isSelected && url && (
        <Fragment>
          <BlockControls>
            <MediaUpload
              onSelect={(image) => {
                setAttributes({
                  url: image.url,
                  alt: image.alt,
                });
              }}
              type="image"
              value={id}
              render={({ open }) => (
                <IconButton
                  className="components-toolbar__control"
                  label={__('Edit Image')}
                  icon="edit"
                  onClick={open}
                />
              )}
            />
          </BlockControls>
          <InspectorControls>
            <PanelBody title={__('Image Settings')} initialOpen={false}>
              <p>{__('Alignment')}</p>
              <AlignmentToolbar
                value={imageAlign}
                onChange={value => setAttributes({ imageAlign: value })}
              />
            </PanelBody>

            <PanelBody title={__('Title Settings')} initialOpen={false}>
              <p>{__('Heading element')}</p>
              <Toolbar
                controls={
                  '23456'.split('').map(level => ({
                    icon: 'heading',
                    title: sprintf(__('Heading %s'), level),
                    isActive: `H${level}` === titleNodeName,
                    onClick: () => setAttributes({ titleNodeName: `H${level}` }),
                    subscript: level,
                  }))
                }
              />

              <TextControls
                setAttributes={setAttributes}
                attributeKey="title"
                attributes={attributes}
                defaultFontSize={null}
              />
            </PanelBody>

            <PanelBody title={__('Text Settings')} initialOpen={false}>
              <TextControls
                setAttributes={setAttributes}
                attributeKey="text"
                attributes={attributes}
              />
            </PanelBody>

            <PanelBody title={__('Content Settings')} initialOpen={false}>
              <p>{__('Alignment')}</p>
              <AlignmentToolbar
                value={contentAlign}
                onChange={value => setAttributes({ contentAlign: value })}
              />
            </PanelBody>
          </InspectorControls>
        </Fragment>
      )}
    </Fragment>
  );
};

registerBlockType('gutenbee/imagebox', {
  title: __('GutenBee Image Box'),
  description: __('An image box with a title and a description.'),
  icon: 'format-image',
  category: 'common',
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
    titleNodeName: {
      type: 'string',
      source: 'property',
      selector: 'h1,h2,h3,h4,h5,h6',
      property: 'nodeName',
      default: 'H3',
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
    contentAlign: {
      type: 'string',
      default: null,
    },
  },
  edit: withState({ editable: null })(ImageBoxEditBlock),
  save({ className, attributes }) {
    return (
      <ImageBox
        className={className}
        attributes={attributes}
      />
    );
  },
});
