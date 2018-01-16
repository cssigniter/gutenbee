/* global wp */

/**
 * Spacer Block
 *
 * Provide vertical spacing between elements
 * with a range control input setting
 */

const { __ } = wp.i18n;
const {
  registerBlockType,
  InspectorControls,
  BlockDescription,
} = wp.blocks;

registerBlockType('gutenbee/spacer', {
  title: __('GutenBee Spacer'),
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
  edit({ className, attributes, setAttributes, focus }) {
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
      focus && (
        <InspectorControls key="inspector">
          <BlockDescription>
            <p>{__('Easily add vertical spacing between elements.')}</p>
          </BlockDescription>

          <InspectorControls.RangeControl
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
