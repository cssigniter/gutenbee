/**
 * Accordion block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.editor';
import { Fragment } from 'wp.element';
import {
  PanelBody,
  ToggleControl,
} from 'wp.components';
import {
  InspectorControls,
} from 'wp.editor';
import AccordionBlockIcon from './block-icon';

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
  },
  edit({ attributes, isSelected, setAttributes, className }) {
    const {
      collapseOthers,
    } = attributes;

    return (
      <Fragment>
        <div className={className}>
          <InnerBlocks />
        </div>

        {isSelected && (
          <InspectorControls>
            <PanelBody>
              <ToggleControl
                label={__('Collapse others on click')}
                checked={collapseOthers}
                onChange={value => setAttributes({ collapseOthers: value })}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  },
  save({ attributes, className }) {
    const { collapseOthers } = attributes;

    return (
      <div
        className={className}
        data-collapse-others={collapseOthers}
      >
        <InnerBlocks.Content />
      </div>
    );
  },
});
