/**
 * Accordion block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.editor';
import { Fragment } from 'wp.element';
import { PanelBody, ToggleControl } from 'wp.components';
import { InspectorControls } from 'wp.editor';

import AccordionBlockIcon from './block-icon';
import MarginControls from '../../components/controls/margin-controls';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';

registerBlockType('gutenbee/accordion', {
  title: __('GutenBee Accordion'),
  description: __('Display fancy accordions'),
  icon: AccordionBlockIcon,
  category: 'gutenbee',
  keywords: [
    __('accordion'),
    __('tab'),
  ],
  attributes: {
    collapseOthers: {
      type: 'boolean',
      default: true,
    },
    blockMargin: {
      type: 'object',
      default: {},
    },
  },
  edit({ attributes, isSelected, setAttributes, className }) {
    const {
      collapseOthers,
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
          <InnerBlocks allowedBlocks={['gutenbee/accordion-item']} />
        </div>

        {isSelected && (
          <InspectorControls>
            <PanelBody title={__('Settings')} initialOpen>
              <ToggleControl
                label={__('Collapse others on click')}
                checked={collapseOthers}
                onChange={value => setAttributes({ collapseOthers: value })}
              />
            </PanelBody>

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
      collapseOthers,
      blockMargin,
    } = attributes;

    return (
      <div
        className={className}
        data-collapse-others={collapseOthers}
        style={{
          margin: getMarginSettingStyles(blockMargin),
        }}
      >
        <InnerBlocks.Content />
      </div>
    );
  },
});
