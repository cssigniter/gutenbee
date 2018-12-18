/**
 * Icon Box Block
 */

import { Fragment } from 'wp.element';
import { __, sprintf } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText, InspectorControls, AlignmentToolbar } from 'wp.editor';
import { PanelBody, Toolbar } from 'wp.components';
import { withState } from 'wp.compose';
import classNames from 'classnames';
import omit from 'lodash.omit';

import { iconAttributes, IconSettings } from '../icon';
import Icon from '../icon/Icon';
import TextControls from '../../components/controls/text-controls/TextControls';
import IconBoxBlockIcon from './block-icon';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import MarginControls from '../../components/controls/margin-controls';

const IconBox = ({ className, attributes }) => {
  const {
    titleNodeLevel,
    titleContent,
    titleFontSize,
    textContent,
    textFontSize,
    align,
    contentAlign,
    blockMargin,
    iconMargin,
  } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
        [`${className}-align-${align}`]: true,
        [`${className}-content-align-${contentAlign}`]: !!contentAlign,
      })}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
      <Icon
        {...{
          ...attributes,
          blockMargin: iconMargin,
        }}
      />
      <div className={`${className}-content`}>
        {!RichText.isEmpty(titleContent) && (
          <RichText.Content
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            className={`${className}-title`}
            style={{
              fontSize: titleFontSize ? `${titleFontSize}px` : undefined,
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
    titleNodeLevel,
    titleFontSize,
    textContent,
    textFontSize,
    align,
    contentAlign,
    blockMargin,
    iconMargin,
  } = attributes;
  const setActiveEditable = newEditable => setState({ editable: newEditable });

  return (
    <Fragment>
      <div
        className={classNames({
          [className]: true,
          [`${className}-align-${align}`]: true,
          [`${className}-content-align-${contentAlign}`]: !!contentAlign,
        })}
        style={{
          margin: getMarginSettingStyles(blockMargin),
        }}
      >
        <Icon
          {...{
            ...attributes,
            blockMargin: iconMargin,
          }}
        />
        <div className={`${className}-content`}>
          <RichText
            tagName={`h${titleNodeLevel}`}
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
              {...omit(attributes, ['blockMargin'])}
            >
              <p>{__('Alignment')}</p>
              <AlignmentToolbar
                value={align}
                onChange={value => setAttributes({ align: value || 'left' })}
              />

              <MarginControls
                attributeKey="iconMargin"
                attributes={attributes}
                setAttributes={setAttributes}
                label={__('Icon Margin')}
              />
            </IconSettings>
          </PanelBody>

          <PanelBody title={__('Title Settings')} initialOpen={false}>
            <p>{__('Heading element')}</p>
            <Toolbar
              controls={'23456'
                .split('')
                .map(Number)
                .map(controlLevel => ({
                  icon: 'heading',
                  title: sprintf(__('Heading %s'), controlLevel),
                  isActive: titleNodeLevel === controlLevel,
                  onClick: () =>
                    setAttributes({ titleNodeLevel: controlLevel }),
                  subscript: controlLevel,
                }))}
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

          <PanelBody title={__('Appearance')} initialOpen={false}>
            <MarginControls
              attributeKey="blockMargin"
              attributes={attributes}
              setAttributes={setAttributes}
            />
          </PanelBody>
        </InspectorControls>
      )}
    </Fragment>
  );
};

registerBlockType('gutenbee/iconbox', {
  title: __('GutenBee Icon Box'),
  description: __('A flexible icon box block'),
  icon: IconBoxBlockIcon,
  category: 'gutenbee',
  keywords: [__('icon')],
  attributes: {
    ...iconAttributes,
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
      default: {},
    },
    iconMargin: {
      type: 'object',
      default: {},
    },
  },
  edit: withState({ editable: null })(IconBoxEditBlock),
  save({ className, attributes }) {
    return <IconBox className={className} attributes={attributes} />;
  },
});
