import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { SelectControl, RangeControl } from 'wp.components';

import PopoverColorControl from '../advanced-color-control/PopoverColorControl';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  attributePrefix: PropTypes.string,
  defaultValues: PropTypes.shape({
    color: PropTypes.string,
    radius: PropTypes.string,
    width: PropTypes.string,
  }),
};

const BorderControls = ({
  attributes,
  setAttributes,
  attributePrefix = 'block',
  defaultValues = {},
}) => {
  const color = attributePrefix
    ? attributes[`${attributePrefix}BorderColor`]
    : attributes.borderColor;
  const width = attributePrefix
    ? attributes[`${attributePrefix}BorderWidth`]
    : attributes.borderWidth;
  const style = attributePrefix
    ? attributes[`${attributePrefix}BorderStyle`]
    : attributes.borderStyle;
  const radius = attributePrefix
    ? attributes[`${attributePrefix}BorderRadius`]
    : attributes.borderRadius;

  return (
    <Fragment>
      <SelectControl
        label={__('Border', 'gutenbee')}
        value={style}
        options={[
          { value: 'none', label: __('None', 'gutenbee') },
          { value: 'solid', label: __('Solid', 'gutenbee') },
          { value: 'dotted', label: __('Dotted', 'gutenbee') },
          { value: 'dashed', label: __('Dashed', 'gutenbee') },
          { value: 'double', label: __('Double', 'gutenbee') },
          { value: 'groove', label: __('Groove', 'gutenbee') },
          { value: 'ridge', label: __('Ridge', 'gutenbee') },
        ]}
        onChange={value => {
          const updates = {};

          // Set border style
          if (attributePrefix) {
            updates[`${attributePrefix}BorderStyle`] = value;
          } else {
            updates.borderStyle = value;
          }

          // If enabling border for the first time, set default color and width
          if (value !== 'none' && (style === 'none' || !style)) {
            const colorKey = attributePrefix
              ? `${attributePrefix}BorderColor`
              : 'borderColor';
            const widthKey = attributePrefix
              ? `${attributePrefix}BorderWidth`
              : 'borderWidth';

            if (!color) {
              updates[colorKey] = defaultValues.color || '#000000';
            }
            if (width == null) {
              updates[widthKey] = defaultValues.width || 3;
            }
          }

          setAttributes(updates);
        }}
        __next40pxDefaultSize
        __nextHasNoMarginBottom
      />

      {style !== 'none' && !!style && (
        <Fragment>
          <PopoverColorControl
            value={color || '#000000'}
            defaultValue={defaultValues.color || '#000000'}
            label={__('Border color', 'gutenbee')}
            disableAlpha={false}
            onChange={value => {
              if (attributePrefix) {
                setAttributes({ [`${attributePrefix}BorderColor`]: value });
              } else {
                setAttributes({ borderColor: value });
              }
            }}
          />

          <RangeControl
            label={__('Border Width (px)', 'gutenbee')}
            min={0}
            max={100}
            value={width}
            onChange={value => {
              if (attributePrefix) {
                setAttributes({ [`${attributePrefix}BorderWidth`]: value });
              } else {
                setAttributes({ borderWidth: value });
              }
            }}
            step={1}
            initialPosition={defaultValues.width || 3}
            allowReset
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
        </Fragment>
      )}

      <RangeControl
        label={__('Border Radius (px)', 'gutenbee')}
        min={0}
        max={100}
        value={radius}
        onChange={value => {
          if (attributePrefix) {
            setAttributes({ [`${attributePrefix}BorderRadius`]: value });
          } else {
            setAttributes({ borderRadius: value });
          }
        }}
        step={1}
        initialPosition={defaultValues.radius || 0}
        allowReset
        __next40pxDefaultSize
        __nextHasNoMarginBottom
      />
    </Fragment>
  );
};

BorderControls.propTypes = propTypes;

export default BorderControls;
