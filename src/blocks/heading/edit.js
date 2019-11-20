import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { PanelBody } from 'wp.components';
import {
  AlignmentToolbar,
  BlockControls,
  InspectorControls,
  RichText,
  PanelColorSettings,
} from 'wp.blockEditor';

import HeadingToolbar from './heading-toolbar';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import MarginControls from '../../components/controls/margin-controls';
import HeadingStyle from './style';
import getBlockId from '../../util/getBlockId';

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
      <HeadingStyle attributes={attributes} />

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
          className={classNames(className, {
            [`has-text-align-${align}`]: align,
          })}
          placeholder={placeholder || __('Write heading…')}
        />
      </div>

      <BlockControls>
        <HeadingToolbar
          minLevel={2}
          maxLevel={5}
          selectedLevel={level}
          onChange={newLevel => setAttributes({ level: newLevel })}
        />
        <AlignmentToolbar
          value={align}
          onChange={nextAlign => {
            setAttributes({ align: nextAlign });
          }}
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

        <PanelColorSettings
          title={__('Color Settings')}
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
        />
      </InspectorControls>
    </Fragment>
  );
}

HeadingEdit.propTypes = propTypes;

export default HeadingEdit;
