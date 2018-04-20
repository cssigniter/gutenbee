/**
 * Icon Block
 */

import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  registerBlockType,
  InspectorControls,
  AlignmentToolbar,
  ColorPalette,
} from 'wp.blocks';
import {
  PanelBody,
  RangeControl,
  SelectControl,
} from 'wp.components';
import classNames from 'classnames';
import startCase from 'lodash.startcase';

import icons from './icons';

const VIEWS = {
  DEFAULT: 'default',
  STACKED: 'stacked',
  FRAMED: 'framed',
};

const SHAPES = {
  CIRCLE: 'circle',
  SQUARE: 'square',
};

const Icon = ({
  className,
  view,
  shape,
  icon,
  size,
  padding,
  borderWidth,
  align,
  colorPrimary,
  colorSecondary,
}) => {
  const wrapperClasses = classNames({
    [className]: !!className,
    [`align-${align}`]: !!align,
    [`${className}-${view}`]: !!view,
    [`${className}-shape-${shape}`]: !!shape && view !== VIEWS.DEFAULT, // Ignore shape if we are on the default view
  });

  const iconClasses = classNames({
    'ep-icon-module': true,
    [`${className}-icon`]: !!className,
    [`ep-icon-module-${icon}`]: !!icon,
  });

  let color = colorPrimary;
  let backgroundColor = 'transparent';
  let borderColor = 'transparent';
  let pad;

  if (view === VIEWS.STACKED) {
    color = colorSecondary;
    backgroundColor = colorPrimary;
    pad = padding;
  }

  if (view === VIEWS.FRAMED) {
    backgroundColor = colorSecondary;
    borderColor = colorPrimary;
    pad = padding;
  }

  return (
    <div className={wrapperClasses}>
      <span
        className={`${className}-icon-wrap`}
        style={{
          fontSize: `${size}px`,
          color,
          backgroundColor,
          borderColor,
          width: pad ? `${pad}em` : 'auto',
          height: pad ? `${pad}em` : 'auto',
          borderWidth,
        }}
      >
        <span
          className={iconClasses}
        />
      </span>
    </div>
  );
};

registerBlockType('gutenbee/icon', {
  title: __('GutenBee Icon'),
  description: __('A flexible icon block'),
  icon: 'star-empty',
  category: 'layout',
  keywords: [
    __('icons'),
  ],
  attributes: {
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
      default: 'center',
    },
    colorPrimary: {
      type: 'string',
      default: '#0085ba',
    },
    colorSecondary: {
      type: 'string',
      default: '#FFFFFF',
    },
  },
  edit({ className, attributes, setAttributes, focus }) {
    const {
      view,
      shape,
      icon,
      size,
      padding,
      borderWidth,
      align,
      colorPrimary,
      colorSecondary,
    } = attributes;

    return (
      <Fragment>
        <Icon
          className={className}
          {...attributes}
        />
        {focus && (
          <InspectorControls key="inspector">
            <SelectControl
              label={__('Icon')}
              value={icon}
              onChange={value => setAttributes({ icon: value })}
              options={icons.map(value => ({ value, label: startCase(value) }))}
            />

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
              label="Icon Size"
              min={1}
              max={100}
              value={size}
              onChange={value => setAttributes({ size: value })}
            />

            {view !== VIEWS.DEFAULT && (
              <RangeControl
                label="Padding"
                min={1}
                max={10}
                step={0.1}
                value={padding}
                onChange={value => setAttributes({ padding: value })}
              />
            )}

            {view === VIEWS.FRAMED && (
              <RangeControl
                label="Border Size"
                min={1}
                max={50}
                step={1}
                value={borderWidth}
                onChange={value => setAttributes({ borderWidth: value })}
              />
            )}

            <p>{__('Alignment')}</p>
            <AlignmentToolbar
              value={align}
              onChange={value => setAttributes({ align: value })}
            />

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
          </InspectorControls>
        )}
      </Fragment>
    );
  },
  save({ className, attributes }) {
    return (
      <Icon
        className={className}
        {...attributes}
      />
    );
  },
});
