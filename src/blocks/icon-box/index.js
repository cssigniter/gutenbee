/**
 * Icon Box Block
 */

import { Fragment } from 'wp.element';
import { __, sprintf } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText, InspectorControls } from 'wp.blockEditor';
import { PanelBody, Toolbar, SelectControl, RangeControl } from 'wp.components';
import { withState } from 'wp.compose';
import classNames from 'classnames';
import omit from 'lodash.omit';

import { iconAttributes, IconSettings } from '../icon';
import Icon from '../icon/Icon';
import IconBoxBlockIcon from './block-icon';
import MarginControls from '../../components/controls/margin-controls';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';
import deprecated from './deprecated';
import IconBoxStyle from './style';
import ImageBoxStyle from '../image-box/style';
import { capitalize } from '../../util/text';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';

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
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={classNames({
        [className]: true,
        [`${className}-align-${align}`]: true,
        [`${className}-content-align-${contentAlign}`]: !!contentAlign,
      })}
    >
      <ImageBoxStyle attributes={attributes} />
      <Icon
        id={`${blockId}-icon`}
        {...{
          ...attributes,
          blockMargin: iconMargin,
          blockPadding: iconPadding,
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

const IconBoxEditBlock = ({
  className,
  attributes,
  setAttributes,
  isSelected,
  editable,
  setState,
  clientId,
}) => {
  const {
    uniqueId,
    titleContent,
    titleNodeLevel,
    titleFontSize,
    textContent,
    textFontSize,
    align,
    contentAlign,
    iconMargin,
    iconPadding,
    titleBottomSpacing,
  } = attributes;
  const setActiveEditable = newEditable => setState({ editable: newEditable });

  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div
        className={classNames({
          [className]: true,
          [`${className}-align-${align}`]: true,
          [`${className}-content-align-${contentAlign}`]: !!contentAlign,
        })}
      >
        <IconBoxStyle attributes={attributes} />

        <Icon
          id={`${blockId}-icon`}
          {...{
            ...attributes,
            blockMargin: iconMargin,
            blockPadding: iconPadding,
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
              marginBottom: titleBottomSpacing
                ? `${titleBottomSpacing}px`
                : undefined,
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
              attributes={{
                ...omit(attributes, ['blockMargin', 'blockPadding']),
              }}
            >
              <ResponsiveControl>
                {breakpoint => (
                  <MarginControls
                    label={__('Padding (px)')}
                    attributeKey="iconPadding"
                    attributes={attributes}
                    setAttributes={setAttributes}
                    breakpoint={breakpoint}
                  />
                )}
              </ResponsiveControl>

              <ResponsiveControl>
                {breakpoint => (
                  <MarginControls
                    label={__('Margin (px)')}
                    attributeKey="iconMargin"
                    attributes={attributes}
                    setAttributes={setAttributes}
                    breakpoint={breakpoint}
                  />
                )}
              </ResponsiveControl>
            </IconSettings>
          </PanelBody>

          <PanelBody title={__('Content Settings')} initialOpen={false}>
            <SelectControl
              label={__('Content Text Alignment')}
              value={contentAlign}
              options={['', 'left', 'center', 'right'].map(option => ({
                value: option,
                label: option ? capitalize(option) : 'None',
              }))}
              onChange={value => {
                setAttributes({ contentAlign: value || undefined });
              }}
            />

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

            <FontSizePickerLabel
              value={titleFontSize}
              label={__('Heading Font Size')}
              onChange={value => setAttributes({ titleFontSize: value })}
            />

            <RangeControl
              label={__('Heading Bottom Margin')}
              value={titleBottomSpacing}
              onChange={value => {
                setAttributes({
                  titleBottomSpacing: value != null ? value : undefined,
                });
              }}
              min={0}
              max={200}
            />

            <FontSizePickerLabel
              value={textFontSize}
              label={__('Text Font Size')}
              onChange={value => setAttributes({ textFontSize: value })}
            />
          </PanelBody>

          <PanelBody title={__('Block Appearance')} initialOpen={false}>
            <ResponsiveControl>
              {breakpoint => (
                <MarginControls
                  label={__('Padding (px)')}
                  attributeKey="blockPadding"
                  attributes={attributes}
                  setAttributes={setAttributes}
                  breakpoint={breakpoint}
                />
              )}
            </ResponsiveControl>

            <ResponsiveControl>
              {breakpoint => (
                <MarginControls
                  label={__('Margin (px)')}
                  attributeKey="blockMargin"
                  attributes={attributes}
                  setAttributes={setAttributes}
                  breakpoint={breakpoint}
                />
              )}
            </ResponsiveControl>
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
  },
  deprecated,
  edit: withState({ editable: null })(IconBoxEditBlock),
  save({ className, attributes }) {
    return <IconBox className={className} attributes={attributes} />;
  },
});
