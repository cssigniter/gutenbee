import classnames from 'classnames';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { PanelBody, ToggleControl, withFallbackStyles } from 'wp.components';
import {
  withColors,
  AlignmentToolbar,
  BlockControls,
  ContrastChecker,
  FontSizePicker,
  InspectorControls,
  PanelColorSettings,
  RichText,
} from 'wp.blockEditor';
import { compose } from 'wp.compose';
import useUniqueId from '../../hooks/useUniqueId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import MarginControls from '../../components/controls/margin-controls';
import getBlockId from '../../util/getBlockId';
import ParagraphStyle from './style';

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
}) {
  return (
    <PanelColorSettings
      title={__('Color Settings')}
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
      <BlockControls>
        <AlignmentToolbar
          value={align}
          onChange={newAlign => setAttributes({ align: newAlign })}
        />
      </BlockControls>

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

        <ParagraphPanelColor
          backgroundColor={backgroundColor.color}
          fallbackBackgroundColor={fallbackBackgroundColor}
          fallbackTextColor={fallbackTextColor}
          setBackgroundColor={setBackgroundColor}
          setTextColor={setTextColor}
          textColor={textColor.color}
        />
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
          }}
          value={content}
          onChange={newContent => setAttributes({ content: newContent })}
          onMerge={mergeBlocks}
          onReplace={onReplace}
          onRemove={onReplace ? () => onReplace([]) : undefined}
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
