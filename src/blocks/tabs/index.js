/**
 * Tabs block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.editor';
import { Fragment } from 'wp.element';
import { PanelBody } from 'wp.components';
import { InspectorControls } from 'wp.editor';

import TabsBlockIcon from './block-icon';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import MarginControls from '../../components/controls/margin-controls';

registerBlockType('gutenbee/tabs', {
  title: __('GutenBee Tabs'),
  description: __('Display fancy tabs'),
  icon: TabsBlockIcon,
  category: 'gutenbee',
  keywords: [
    __('tabs'),
  ],
  attributes: {
    blockMargin: {
      type: 'object',
      default: {},
    },
  },
  edit({ attributes, className, isSelected, setAttributes }) {
    const {
      blockMargin,
    } = attributes;

    return (
      <Fragment>
        <div
          className={className}
          style={{
            margin: getMarginSettingStyles(blockMargin),
          }}
        >
          <InnerBlocks />
        </div>

        {isSelected && (
          <InspectorControls>
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
  },
  save({ attributes, className }) {
    const {
      blockMargin,
    } = attributes;

    return (
      <div
        className={className}
        style={{
          margin: getMarginSettingStyles(blockMargin),
        }}
      >
        <InnerBlocks.Content />
      </div>
    );
  },
});
