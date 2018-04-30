/**
 * Spacer Block
 *
 * Provide vertical spacing between elements
 * with a range control input setting
 */

import { __ } from 'wp.i18n';
import { registerBlockType, InspectorControls } from 'wp.blocks';
import { RangeControl } from 'wp.components';

registerBlockType('gutenbee/spacer', {
  title: __('GutenBee Spacer'),
  description: __('Easily add vertical spacing between elements.'),
  icon: 'minus',
  category: 'layout',
  keywords: [
    __('divider'),
    __('spacer'),
    'hr',
  ],
  attributes: {
    height: {
      type: 'number',
      default: 10,
    },
  },
  edit({ className, attributes, setAttributes, isSelected }) {
    const updateSpacerHeight = (value) => {
      setAttributes({ height: value });
    };

    return [
      <div
        key="spacer"
        className={className}
        style={{
          height: attributes.height,
        }}
      />,
      isSelected && (
        <InspectorControls key="inspector">
          <RangeControl
            label="Height"
            min={10}
            max={1000}
            onChange={updateSpacerHeight}
            value={attributes.height}
          />
        </InspectorControls>
      ),
    ];
  },
  save({ className, attributes }) {
    return (
      <div
        className={className}
        style={{
          height: attributes.height,
        }}
      />
    );
  },
});
