import classnames from 'classnames';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { PanelBody } from 'wp.components';
import {
  AlignmentToolbar,
  BlockControls,
  InspectorControls,
  RichText,
} from 'wp.blockEditor';

import HeadingToolbar from './heading-toolbar';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import MarginControls from '../../components/controls/margin-controls';
import HeadingStyle from './style';
import getBlockId from '../../util/getBlockId';

function HeadingEdit({
  attributes,
  setAttributes,
  mergeBlocks,
  onReplace,
  className,
  clientId,
}) {
  const { align, content, level, placeholder, uniqueId } = attributes;
  const tagName = 'h' + level;

  useUniqueId({
    attributes,
    setAttributes,
    clientId,
  });

  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
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
        </PanelBody>

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
      </InspectorControls>

      <HeadingStyle attributes={attributes} />

      <div id={blockId}>
        <RichText
          identifier="content"
          tagName={tagName}
          value={content}
          onChange={value => setAttributes({ content: value })}
          onMerge={mergeBlocks}
          onReplace={onReplace}
          onRemove={() => onReplace([])}
          className={classnames(className, {
            [`has-text-align-${align}`]: align,
          })}
          placeholder={placeholder || __('Write heading…')}
        />
      </div>
    </Fragment>
  );
}

export default HeadingEdit;
