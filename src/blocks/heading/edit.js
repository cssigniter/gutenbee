import PropTypes from 'prop-types';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { PanelBody } from 'wp.components';
import {
  BlockControls,
  InspectorControls,
  RichText,
  AlignmentToolbar,
  useBlockProps,
} from 'wp.blockEditor';
import { createBlock } from 'wp.blocks';
import classNames from 'classnames';

import HeadingToolbar from './heading-toolbar';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import MarginControls from '../../components/controls/margin-controls';
import HeadingStyle from './style';
import getBlockId from '../../util/getBlockId';
import Rule from '../../components/stylesheet/Rule';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import BorderControls from '../../components/controls/border-controls';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import BoxShadowControls from '../../components/controls/box-shadow-controls';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';
import TypographyControls from '../../components/controls/text-controls/TypographyControls';
import AnimationControls from '../../components/controls/animation-controls/AnimationControls';

const propTypes = {
  attribute: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  onReplace: PropTypes.func,
  className: PropTypes.string,
  clientId: PropTypes.string.isRequired,
};

function HeadingEdit({
  attributes,
  setAttributes,
  mergeBlocks,
  onReplace,
  className,
  clientId,
}) {
  const {
    align,
    content,
    level,
    placeholder,
    uniqueId,
    textColor,
    backgroundColor,
    fontSize,
    lineHeight,
    letterSpacing,
    textTransform,
    textDecoration,
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;
  const tagName = 'h' + level;

  useUniqueId({
    attributes,
    setAttributes,
    clientId,
  });

  const blockId = getBlockId(uniqueId);
  const blockProps = useBlockProps({
    className: classNames(blockId, 'gutenbee-heading-wrap'),
    id: blockId,
    style: {
      backgroundColor: backgroundColor ? backgroundColor : undefined,
      ...getBorderCSSValue({ attributes }),
      ...getBoxShadowCSSValue({ attributes }),
    },
  });

  return (
    <Fragment>
      <HeadingStyle attributes={attributes}>
        <Rule
          value={fontSize}
          rule={`.wp-block-gutenbee-heading.[root] ${tagName} { font-size: %s !important; }`}
          unit="px"
        />
        <Rule
          value={lineHeight}
          rule={`.wp-block-gutenbee-heading.[root] ${tagName} { line-height: %s; }`}
          unit=""
        />
        <Rule
          value={letterSpacing}
          rule={`.wp-block-gutenbee-heading.[root] ${tagName} { letter-spacing: %s; }`}
          unit=""
        />
        <Rule
          value={textTransform}
          rule={`.wp-block-gutenbee-heading.[root] ${tagName} { text-transform: %s; }`}
          unit=""
        />
        <Rule
          value={textDecoration}
          rule={`.wp-block-gutenbee-heading.[root] ${tagName} { text-decoration: %s; }`}
          unit=""
        />
      </HeadingStyle>

      <div {...blockProps}>
        <RichText
          identifier="content"
          tagName={tagName}
          value={content}
          onChange={value => setAttributes({ content: value })}
          onMerge={mergeBlocks}
          onReplace={onReplace}
          onRemove={() => onReplace([])}
          onSplit={value => {
            if (!value) {
              return createBlock('gutenbee/paragraph');
            }

            return createBlock('gutenbee/heading', {
              ...attributes,
              content: value,
            });
          }}
          className={className}
          placeholder={placeholder || __('Write heading…')}
          style={{
            color: textColor ? textColor : undefined,
          }}
        />
      </div>

      <BlockControls group="block">
        <HeadingToolbar
          minLevel={1}
          maxLevel={7}
          selectedLevel={level}
          onChange={newLevel => setAttributes({ level: newLevel })}
        />
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Heading Settings')}>
          <ResponsiveControl>
            {breakpoint => {
              return (
                <TypographyControls
                  attributes={{
                    fontSize: fontSize[breakpoint],
                    lineHeight: lineHeight?.[breakpoint],
                    letterSpacing: letterSpacing?.[breakpoint],
                    textTransform: textTransform?.[breakpoint],
                    textDecoration: textDecoration?.[breakpoint],
                  }}
                  onFontSizeChange={value => {
                    setAttributes({
                      fontSize: {
                        ...fontSize,
                        [breakpoint]: value != null ? value : '',
                      },
                    });
                  }}
                  onLineHeightChange={value => {
                    setAttributes({
                      lineHeight: {
                        ...lineHeight,
                        [breakpoint]: value != null ? value : '',
                      },
                    });
                  }}
                  onLetterSpacingChange={value => {
                    setAttributes({
                      letterSpacing: {
                        ...letterSpacing,
                        [breakpoint]: value != null ? value : '',
                      },
                    });
                  }}
                  onTextDecorationChange={value => {
                    setAttributes({
                      textDecoration: {
                        ...textDecoration,
                        [breakpoint]: value != null ? value : '',
                      },
                    });
                  }}
                  onTextTransformChange={value => {
                    setAttributes({
                      textTransform: {
                        ...textTransform,
                        [breakpoint]: value != null ? value : '',
                      },
                    });
                  }}
                  label={__('Heading Font Size')}
                />
              );
            }}
          </ResponsiveControl>

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
            value={textColor || ''}
            defaultValue={textColor || ''}
            onChange={value => setAttributes({ textColor: value })}
          />

          <PopoverColorControl
            label={__('Background Color')}
            value={backgroundColor || ''}
            defaultValue={backgroundColor || ''}
            onChange={value => setAttributes({ backgroundColor: value })}
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

        {__GUTENBEE_SETTINGS__.plugin.settings['active_animation-controls'] && (
          <PanelBody
            icon={!!attributes.animation?.type && 'saved'}
            title={__('Animation')}
            initialOpen={false}
          >
            <AnimationControls
              attributes={attributes.animation}
              setAttributes={setAttributes}
            />
          </PanelBody>
        )}
      </InspectorControls>
    </Fragment>
  );
}

HeadingEdit.propTypes = propTypes;

export default HeadingEdit;
