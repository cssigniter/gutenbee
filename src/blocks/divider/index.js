/**
 * Divider Block
 *
 * Provide thematic content spacing with a fancy divider
 */

import { __, sprintf } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { PanelBody, Toolbar, RangeControl } from 'wp.components';
import { InspectorControls, AlignmentToolbar, ColorPalette } from 'wp.editor';

import DividerBlockIcon from './block-icon';

const BORDER_STYLES = {
  SOLID: 'solid',
  DOTTED: 'dotted',
  DASHED: 'dashed',
  DOUBLE: 'double',
};

const Divider = ({ className, height, style, weight, width, align, color }) => (
  <div
    key="divider"
    className={`${className} align-${align}`}
    style={{
      height,
    }}
  >
    <div
      className={`${className}-inner`}
      style={{
        borderTopStyle: style,
        borderTopWidth: weight,
        borderTopColor: color,
        width: `${width}%`,
      }}
    />
  </div>
);

registerBlockType('gutenbee/divider', {
  title: __('GutenBee Divider'),
  description: __(
    'A divider to indicate a thematic change in the content in style.',
  ),
  icon: DividerBlockIcon,
  category: 'gutenbee',
  keywords: [__('divider'), __('horizontal-line'), 'hr'],
  attributes: {
    style: {
      type: 'string',
      default: BORDER_STYLES.SOLID,
    },
    weight: {
      type: 'number',
      default: 1,
    },
    width: {
      type: 'number',
      default: 100,
    },
    height: {
      type: 'number',
      default: 10,
    },
    align: {
      type: 'string',
      default: 'center',
    },
    color: {
      type: 'string',
      default: '#000000',
    },
  },
  edit({ className, attributes, setAttributes, isSelected }) {
    const { style, weight, width, height, align, color } = attributes;

    return [
      <Divider className={className} {...attributes} />,
      isSelected && (
        <InspectorControls key="inspector">
          <p>{__('Style')}</p>
          <Toolbar
            controls={Object.values(BORDER_STYLES).map(
              (borderStyle, index) => ({
                icon: 'admin-appearance',
                title: sprintf(__('Style %s'), borderStyle),
                isActive: style === borderStyle,
                onClick: () => setAttributes({ style: borderStyle }),
                subscript: index + 1,
              }),
            )}
          />

          <RangeControl
            label={__('Weight (thickness)')}
            min={1}
            max={50}
            value={weight}
            onChange={value => setAttributes({ weight: value })}
          />

          <RangeControl
            label={__('Width (%)')}
            min={1}
            max={100}
            value={width}
            onChange={value => setAttributes({ width: value })}
          />

          <RangeControl
            label={__('Height (px)')}
            min={10}
            max={500}
            onChange={value => setAttributes({ height: value })}
            value={height}
          />

          <p>{__('Alignment')}</p>
          <AlignmentToolbar
            value={align}
            onChange={value => setAttributes({ align: value || 'left' })}
          />

          <PanelBody title={__('Color')}>
            <ColorPalette
              value={color}
              onChange={value => setAttributes({ color: value })}
            />
          </PanelBody>
        </InspectorControls>
      ),
    ];
  },
  save({ className, attributes }) {
    return <Divider className={className} {...attributes} />;
  },
});
