import { Fragment } from 'wp.element';
import classNames from 'classnames';
import { __ } from 'wp.i18n';
import { PanelBody, ToggleControl, withFallbackStyles } from 'wp.components';
import {
  withColors,
  InspectorControls,
  RichText,
  AlignmentToolbar,
  useBlockProps,
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
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';

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

const ParagraphBlock = ({
  attributes,
  backgroundColor,
  className,
  mergeBlocks,
  onReplace,
  setAttributes,
  textColor,
  clientId,
  setBackgroundColor,
  setTextColor,
}) => {
  const {
    uniqueId,
    align,
    content,
    dropCap,
    placeholder,
    fontSize,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const blockId = getBlockId(uniqueId);
  const blockProps = useBlockProps({
    id: blockId,
    className: classNames(
      className,
      blockId,
      getBreakpointVisibilityClassNames(blockBreakpointVisibility),
      getAuthVisibilityClasses(blockAuthVisibility),
      {
        'gutenbee-block-paragraph': true,
        [backgroundColor.class]: backgroundColor.class,
        [textColor.class]: textColor.class,
      },
    ),
    style: {
      backgroundColor: backgroundColor.color,
      color: textColor.color,
      ...getBorderCSSValue({ attributes }),
      ...getBoxShadowCSSValue({ attributes }),
    },
  });

  return (
    <Fragment>
      <div {...blockProps}>
        <RichText
          identifier="content"
          tagName="p"
          className={classNames('gutenbee-block-paragraph', {
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
      <ParagraphStyle attributes={attributes} />

      <InspectorControls>
        <PanelBody title={__('Text Settings')} className="blocks-font-size">
          <ResponsiveControl>
            {breakpoint => (
              <FontSizePickerLabel
                label={__('Text Font Size')}
                value={fontSize[breakpoint]}
                onChange={value => {
                  setAttributes({
                    fontSize: {
                      ...fontSize,
                      [breakpoint]: value != null ? value : '',
                    },
                  });
                }}
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

        <PanelBody title={__('Block Appearance')} initialOpen={false}>
          <PopoverColorControl
            label={__('Text Color')}
            value={textColor.color || ''}
            defaultValue={textColor.color || ''}
            onChange={setTextColor}
          />

          <PopoverColorControl
            label={__('Background Color')}
            value={backgroundColor.color || ''}
            defaultValue={backgroundColor.color || ''}
            onChange={setBackgroundColor}
          />

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
        </PanelBody>

        <PanelBody title={__('Visibility Settings')} initialOpen={false}>
          <BreakpointVisibilityControl
            values={blockBreakpointVisibility}
            onChange={values => {
              setAttributes({
                blockBreakpointVisibility: values,
              });
            }}
          />

          <AuthVisibilityControl
            values={blockAuthVisibility}
            onChange={values => {
              setAttributes({
                blockAuthVisibility: values,
              });
            }}
          />
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
};

const ParagraphEdit = compose([
  withColors('backgroundColor', { textColor: 'color' }),
  applyFallbackStyles,
])(ParagraphBlock);

export default ParagraphEdit;
