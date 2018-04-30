/**
 * Icon Box Block
 */

import { Fragment } from 'wp.element';
import { __, sprintf } from 'wp.i18n';
import {
  registerBlockType,
  InspectorControls,
  RichText,
  AlignmentToolbar,
} from 'wp.blocks';
import {
  PanelBody,
  Toolbar,
  withState,
} from 'wp.components';
import classNames from 'classnames';

import { iconAttributes, IconSettings } from '../icon';
import Icon from '../icon/Icon';
import TextControls from '../../components/controls/TextControls';

const IconBox = ({ className, attributes }) => {
  const {
    titleNodeName,
    titleContent,
    titleFontSize,
    textContent,
    textFontSize,
    align,
    contentAlign,
  } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
        [`${className}-align-${align}`]: true,
        [`${className}-content-align-${contentAlign}`]: true,
      })}
    >
      <Icon {...attributes} />
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

const IconBoxEditBlock = ({
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
    align,
    contentAlign,
  } = attributes;

  const setActiveEditable = newEditable => setState({ editable: newEditable });

  return (
    <Fragment>
      <div
        className={classNames({
          [className]: true,
          [`${className}-align-${align}`]: true,
          [`${className}-content-align-${contentAlign}`]: true,
        })}
      >
        <Icon {...attributes} />
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
      {isSelected && (
        <InspectorControls>
          <PanelBody title={__('Icon Settings')} initialOpen={false}>
            <IconSettings
              className={className}
              setAttributes={setAttributes}
              excludeAlignment
              {...attributes}
            >
              <p>{__('Alignment')}</p>
              <AlignmentToolbar
                value={align}
                onChange={value => setAttributes({ align: value })}
              />
            </IconSettings>
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
      )}
    </Fragment>
  );
};

registerBlockType('gutenbee/iconbox', {
  title: __('GutenBee Iconbox'),
  description: __('A flexible icon box block'),
  icon: 'star-filled',
  category: 'layout',
  keywords: [
    __('icon'),
  ],
  attributes: {
    ...iconAttributes,
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
    align: {
      type: 'string',
      default: 'left',
    },
    contentAlign: {
      type: 'string',
      default: null,
    },
  },
  edit: withState({ editable: null })(IconBoxEditBlock),
  save({ className, attributes }) {
    return (
      <IconBox
        className={className}
        attributes={attributes}
      />
    );
  },
});
