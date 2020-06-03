/**
 * Icon Box Block
 */

import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import {
  RichText,
  InspectorControls,
  PanelColorSettings,
} from 'wp.blockEditor';
import { PanelBody, SelectControl, RangeControl } from 'wp.components';
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
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BorderControls from '../../components/controls/border-controls';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import HeadingToolbar from '../heading/heading-toolbar';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';

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
    titleColor,
    textColor,
    backgroundColor,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={classNames({
        [className]: true,
        [`wp-block-gutenbee-iconbox-align-${align}`]: true,
        [`wp-block-gutenbee-iconbox-content-align-${contentAlign}`]: !!contentAlign,
      })}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
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
      <div className="wp-block-gutenbee-iconbox-content">
        {!RichText.isEmpty(titleContent) && (
          <RichText.Content
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            className="wp-block-gutenbee-iconbox-title"
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
            className="wp-block-gutenbee-iconbox-text"
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
    titleColor,
    textColor,
    backgroundColor,
  } = attributes;
  const setActiveEditable = newEditable => setState({ editable: newEditable });

  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div
        id={blockId}
        className={classNames({
          [className]: true,
          [`wp-block-gutenbee-iconbox-align-${align}`]: true,
          [`wp-block-gutenbee-iconbox-content-align-${contentAlign}`]: !!contentAlign,
        })}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
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
        <div className="wp-block-gutenbee-iconbox-content">
          <RichText
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            onChange={value => setAttributes({ titleContent: value })}
            className="wp-block-gutenbee-iconbox-title"
            placeholder={__('Write heading…')}
            isSelected={isSelected && editable === 'title'}
            onFocus={() => setActiveEditable('title')}
            style={{
              color: titleColor || undefined,
              fontSize: titleFontSize ? `${titleFontSize}px` : undefined,
              marginBottom:
                titleBottomSpacing != null
                  ? `${titleBottomSpacing}px`
                  : undefined,
            }}
          />

          <RichText
            tagName="p"
            value={textContent}
            onChange={value => setAttributes({ textContent: value })}
            className="wp-block-gutenbee-iconbox-text"
            placeholder={__('Write content…')}
            isSelected={isSelected && editable === 'text'}
            onFocus={() => setActiveEditable('text')}
            style={{
              color: textColor || undefined,
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
            <HeadingToolbar
              isCollapsed={false}
              minLevel={1}
              maxLevel={7}
              selectedLevel={titleNodeLevel}
              onChange={newLevel => setAttributes({ titleNodeLevel: newLevel })}
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

          <PanelColorSettings
            title={__('Block Appearance')}
            initialOpen={false}
            colorSettings={[
              {
                value: titleColor,
                onChange: value => setAttributes({ titleColor: value }),
                label: __('Title Color'),
              },
              {
                value: textColor,
                onChange: value => setAttributes({ textColor: value }),
                label: __('Content Text Color'),
              },
              {
                value: backgroundColor,
                onChange: value => setAttributes({ backgroundColor: value }),
                label: __('Block Background Color'),
              },
            ]}
            onChange={value => setAttributes({ backgroundColor: value })}
          >
            <BorderControls
              attributes={attributes}
              setAttributes={setAttributes}
            />

            <BoxShadowControls
              attributes={attributes}
              setAttributes={setAttributes}
            />

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
          </PanelColorSettings>
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
  deprecated,
  edit: withState({ editable: null })(IconBoxEditBlock),
  save({ className, attributes }) {
    return <IconBox className={className} attributes={attributes} />;
  },
});
