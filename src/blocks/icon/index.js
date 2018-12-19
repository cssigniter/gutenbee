/**
 * Icon Block
 */

import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InspectorControls, AlignmentToolbar, ColorPalette } from 'wp.editor';
import {
  PanelBody,
  RangeControl,
  SelectControl,
  BaseControl,
} from 'wp.components';
import startCase from 'lodash.startcase';
import ReactSelect from 'react-select';

import { VIEWS, SHAPES } from './constants';
import icons from './icons';
import Icon from './Icon';
import IconSelectValue from './IconSelectValue';
import IconBlockIcon from './block-icon';
import MarginControls from '../../components/controls/margin-controls';

export const iconAttributes = {
  view: {
    type: 'string',
    default: VIEWS.DEFAULT,
  },
  shape: {
    type: 'string',
    default: SHAPES.CIRCLE,
  },
  icon: {
    type: 'string',
    default: icons[0],
  },
  size: {
    type: 'number',
    default: 40,
  },
  padding: {
    type: 'number',
    default: 2,
  },
  borderWidth: {
    type: 'number',
    default: 3,
  },
  align: {
    type: 'string',
    default: 'left',
  },
  colorPrimary: {
    type: 'string',
  },
  colorSecondary: {
    type: 'string',
  },
  blockMargin: {
    type: 'object',
    default: {},
  },
};

export const IconSettings = ({
  className,
  setAttributes,
  view,
  shape,
  icon,
  size,
  padding,
  borderWidth,
  align,
  colorPrimary,
  colorSecondary,
  excludeAlignment,
  children,
  blockMargin,
}) => (
  <Fragment>
    <BaseControl id="icon-select" label={__('Icon')}>
      <ReactSelect
        aria-labelledby="icon-select"
        onChange={value => setAttributes({ icon: value })}
        value={icon}
        options={icons.map(value => ({ value, label: startCase(value) }))}
        simpleValue
        valueRenderer={({ value, label }) => (
          <IconSelectValue value={value} label={label} />
        )}
        optionRenderer={({ value, label }) => (
          <IconSelectValue value={value} label={label} className={className} />
        )}
      />
    </BaseControl>

    <SelectControl
      label={__('View')}
      value={view}
      onChange={value => setAttributes({ view: value })}
      options={[
        { value: VIEWS.DEFAULT, label: __('Default') },
        { value: VIEWS.STACKED, label: __('Stacked') },
        { value: VIEWS.FRAMED, label: __('Framed') },
      ]}
    />

    {view !== VIEWS.DEFAULT && (
      <SelectControl
        label={__('Shape')}
        value={shape}
        onChange={value => setAttributes({ shape: value })}
        options={[
          { value: SHAPES.CIRCLE, label: __('Circle') },
          { value: SHAPES.SQUARE, label: __('Square') },
        ]}
      />
    )}

    <RangeControl
      label={__('Icon Size (px)')}
      min={1}
      max={100}
      value={size}
      onChange={value => setAttributes({ size: value })}
    />

    {view !== VIEWS.DEFAULT && (
      <RangeControl
        label={__('Padding (em)')}
        min={1}
        max={10}
        step={0.1}
        value={padding}
        onChange={value => setAttributes({ padding: value })}
      />
    )}

    {view === VIEWS.FRAMED && (
      <RangeControl
        label={__('Border Size (px)')}
        min={1}
        max={50}
        step={1}
        value={borderWidth}
        onChange={value => setAttributes({ borderWidth: value })}
      />
    )}

    {!excludeAlignment && (
      <Fragment>
        <p>{__('Alignment')}</p>
        <AlignmentToolbar
          value={align}
          onChange={value => setAttributes({ align: value || 'left' })}
        />
      </Fragment>
    )}

    {children}

    <PanelBody title={__('Primary Color')}>
      <ColorPalette
        value={colorPrimary}
        onChange={value => setAttributes({ colorPrimary: value })}
      />
    </PanelBody>

    {view !== VIEWS.DEFAULT && (
      <PanelBody title={__('Secondary Color')}>
        <ColorPalette
          value={colorSecondary}
          onChange={value => setAttributes({ colorSecondary: value })}
        />
      </PanelBody>
    )}

    {blockMargin && (
      <PanelBody title={__('Block Appearance')} initialOpen={false}>
        <MarginControls
          attributeKey="blockMargin"
          attributes={{
            blockMargin,
          }}
          setAttributes={setAttributes}
        />
      </PanelBody>
    )}
  </Fragment>
);

registerBlockType('gutenbee/icon', {
  title: __('GutenBee Icon'),
  description: __('A flexible icon block'),
  icon: IconBlockIcon,
  category: 'gutenbee',
  keywords: [__('icons')],
  attributes: iconAttributes,
  edit({ className, attributes, setAttributes, isSelected }) {
    return (
      <Fragment>
        <Icon className={className} {...attributes} />
        {isSelected && (
          <InspectorControls>
            <IconSettings
              className={className}
              setAttributes={setAttributes}
              {...attributes}
            />
          </InspectorControls>
        )}
      </Fragment>
    );
  },
  save({ className, attributes }) {
    return <Icon className={className} {...attributes} />;
  },
});
