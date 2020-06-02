import classnames from 'classnames';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { PanelBody, ToggleControl, withFallbackStyles } from 'wp.components';
import {
  withColors,
  ContrastChecker,
  FontSizePicker,
  InspectorControls,
  PanelColorSettings,
  RichText,
  AlignmentToolbar,
} from 'wp.blockEditor';
import { createBlock } from 'wp.blocks';
import { compose } from 'wp.compose';
import useUniqueId from '../../hooks/useUniqueId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../components/controls/margin-controls';
import getBlockId from '../../util/getBlockId';
import ParagraphStyle from './style';
import BorderControls from '../../components/controls/border-controls';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';

const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles((node, ownProps) => {
  const { textColor, backgroundColor } = ownProps.attributes;
  const editableNode = node.querySelector('[contenteditable="true"]');
  //verify if editableNode is available, before using getComputedStyle.
  const computedStyles = editableNode ? getComputedStyle(editableNode) : null;
  return {
    fallbackBackgroundColor:
      backgroundColor || !computedStyles
        ? undefined
        : computedStyles.backgroundColor,
    fallbackTextColor:
      textColor || !computedStyles ? undefined : computedStyles.color,
  };
});

function ParagraphPanelColor({
  backgroundColor,
  fallbackBackgroundColor,
  fallbackTextColor,
  setBackgroundColor,
  setTextColor,
  textColor,
  children,
}) {
  return (
    <PanelColorSettings
      title={__('Block Appearance')}
      initialOpen={false}
      colorSettings={[
        {
          value: textColor,
          onChange: setTextColor,
          label: __('Text Color'),
        },
        {
          value: backgroundColor,
          onChange: setBackgroundColor,
          label: __('Background Color'),
        },
      ]}
    >
      <ContrastChecker
        {...{
          textColor,
          backgroundColor,
          fallbackTextColor,
          fallbackBackgroundColor,
        }}
      />
      {children}
    </PanelColorSettings>
  );
}

const ParagraphBlock = ({
  attributes,
  backgroundColor,
  className,
  fallbackBackgroundColor,
  fallbackTextColor,
  mergeBlocks,
  onReplace,
  setAttributes,
  setBackgroundColor,
  setTextColor,
  textColor,
  clientId,
}) => {
  const {
    uniqueId,
    align,
    content,
    dropCap,
    placeholder,
    fontSize,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Text Settings')} className="blocks-font-size">
          <ResponsiveControl>
            {breakpoint => (
              <FontSizePicker
                value={fontSize[breakpoint]}
                onChange={value =>
                  setAttributes({
                    fontSize: {
                      ...fontSize,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>

          <ToggleControl
            label={__('Drop Cap')}
            checked={!!dropCap}
            onChange={() => setAttributes({ dropCap: !dropCap })}
            help={
              dropCap
                ? __('Showing large initial letter.')
                : __('Toggle to show a large initial letter.')
            }
          />

          <ResponsiveControl>
            {breakpoint => (
              <AlignmentToolbar
                isCollapsed={false}
                value={align[breakpoint]}
                onChange={value =>
                  setAttributes({
                    align: {
                      ...align,
                      [breakpoint]: value != null ? value : '',
                    },
                  })
                }
              />
            )}
          </ResponsiveControl>
        </PanelBody>

        <ParagraphPanelColor
          backgroundColor={backgroundColor.color}
          fallbackBackgroundColor={fallbackBackgroundColor}
          fallbackTextColor={fallbackTextColor}
          setBackgroundColor={setBackgroundColor}
          setTextColor={setTextColor}
          textColor={textColor.color}
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
        </ParagraphPanelColor>
      </InspectorControls>

      <ParagraphStyle attributes={attributes} />

      <div
        id={blockId}
        className={classnames({
          'gutenbee-block-paragraph': true,
          [backgroundColor.class]: backgroundColor.class,
          [textColor.class]: textColor.class,
        })}
        style={{
          backgroundColor: backgroundColor.color,
          color: textColor.color,
        }}
      >
        <RichText
          identifier="content"
          tagName="p"
          className={classnames('gutenbee-block-paragraph', className, {
            'has-drop-cap': dropCap,
            [`has-text-align-${align}`]: align,
          })}
          style={{
            fontSize: fontSize.desktop ? fontSize.desktop + 'px' : undefined,
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
          value={content}
          onChange={newContent => setAttributes({ content: newContent })}
          onMerge={mergeBlocks}
          onReplace={onReplace}
          onRemove={onReplace ? () => onReplace([]) : undefined}
          onSplit={value => {
            if (!value) {
              return createBlock('gutenbee/paragraph');
            }

            return createBlock('gutenbee/paragraph', {
              ...attributes,
              content: value,
            });
          }}
          aria-label={__('Paragraph block')}
          placeholder={placeholder || __('Start writing…')}
          __unstableEmbedURLOnPaste
        />
      </div>
    </Fragment>
  );
};

const ParagraphEdit = compose([
  withColors('backgroundColor', { textColor: 'color' }),
  applyFallbackStyles,
])(ParagraphBlock);

export default ParagraphEdit;
