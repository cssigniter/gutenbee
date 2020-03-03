import PropTypes from 'prop-types';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { PanelBody, SelectControl } from 'wp.components';
import {
  BlockControls,
  InspectorControls,
  RichText,
  PanelColorSettings,
} from 'wp.blockEditor';
import { createBlock } from 'wp.blocks';

import HeadingToolbar from './heading-toolbar';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import MarginControls from '../../components/controls/margin-controls';
import HeadingStyle from './style';
import getBlockId from '../../util/getBlockId';
import FontSizePickerLabel from '../../components/controls/text-controls/FontSizePickerLabel';
import Rule from '../../components/stylesheet/Rule';

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
  } = attributes;
  const tagName = 'h' + level;

  useUniqueId({
    attributes,
    setAttributes,
    clientId,
  });

  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <HeadingStyle attributes={attributes}>
        <Rule
          value={fontSize}
          rule={` ${tagName} { font-size: %s !important; }`}
          unit="px"
        />
      </HeadingStyle>

      <div
        id={blockId}
        style={{
          color: textColor ? textColor : undefined,
          backgroundColor: backgroundColor ? backgroundColor : undefined,
        }}
        className="gutenbee-heading-wrap"
      >
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
        />
      </div>

      <BlockControls>
        <HeadingToolbar
          minLevel={1}
          maxLevel={7}
          selectedLevel={level}
          onChange={newLevel => setAttributes({ level: newLevel })}
        />
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Heading Settings')}>
          <p>{__('Level')}</p>
          <HeadingToolbar
            isCollapsed={false}
            minLevel={1}
            maxLevel={7}
            selectedLevel={level}
            onChange={newLevel => setAttributes({ level: newLevel })}
          />

          <ResponsiveControl>
            {breakpoint => (
              <FontSizePickerLabel
                label={__('Font Size')}
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

          <ResponsiveControl>
            {breakpoint => (
              <SelectControl
                label={__('Text Alignment')}
                value={align[breakpoint]}
                options={[
                  { value: '', label: __('') },
                  { value: 'left', label: __('Left') },
                  { value: 'center', label: __('Center') },
                  { value: 'right', label: __('Right') },
                ]}
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

        <PanelColorSettings
          title={__('Block Appearance')}
          initialOpen={false}
          colorSettings={[
            {
              value: textColor,
              onChange: value => setAttributes({ textColor: value }),
              label: __('Text Color'),
            },
            {
              value: backgroundColor,
              onChange: value => setAttributes({ backgroundColor: value }),
              label: __('Background Color'),
            },
          ]}
          onChange={value => setAttributes({ backgroundColor: value })}
        >
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
    </Fragment>
  );
}

HeadingEdit.propTypes = propTypes;

export default HeadingEdit;
