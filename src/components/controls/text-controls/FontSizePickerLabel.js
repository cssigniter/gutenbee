import PropTypes from 'prop-types';
import { FontSizePicker } from 'wp.blockEditor';

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.node,
};

/**
 * Checks whether a string value already contains a CSS unit.
 *
 * @param {string} value The value to check.
 * @returns {boolean}
 */
const hasNonPxUnit = value =>
  typeof value === 'string' &&
  /^-?\d*\.?\d+\s*(rem|em|%|vh|vw|vmin|vmax|pt|cm|mm)$/i.test(value.trim());

/**
 * Custom sanitizer attempting to address how the native <FontSizePicker>
 *   control works which is as follows:
 *   - When choosing a font size from the dropdown it may return a Number
 *     or a string with a unit (e.g. "1.75rem" from theme.json presets).
 *   - When editing the font size from the input box it returns a string with "px" appended (ie. "14px").
 *   - When removing the font size (deleting it entirely) it returns the string "px".
 *
 * @param {*} value The value.
 * @returns {string|number|*}
 */
const sanitizeFontSizeValue = value => {
  if (!value || value === 'px') {
    return '';
  }

  if (hasNonPxUnit(value)) {
    return value;
  }

  if (value?.includes?.('px')) {
    return parseInt(value.replace('px', ''), 10);
  }

  return value;
};

/**
 * Formats a value for the FontSizePicker display.
 * Numbers get "px" appended; strings with units (rem, em, etc.) are passed as-is.
 *
 * @param {number|string|undefined} value The raw value.
 * @returns {string|undefined}
 */
const formatDisplayValue = value => {
  if (!value && value !== 0) return undefined;

  const sanitized = sanitizeFontSizeValue(value);
  if (sanitized === '' || sanitized == null) return undefined;

  if (hasNonPxUnit(sanitized)) {
    return sanitized;
  }

  return `${sanitized}px`;
};

const FontSizePickerLabel = ({ value, onChange, label, ...props }) => {
  return (
    <div className="gutenbee-font-size-picker-label">
      {label && <p className="components-base-control__label">{label}</p>}
      <FontSizePicker
        label=""
        value={formatDisplayValue(value)}
        onChange={newValue => {
          onChange(sanitizeFontSizeValue(newValue));
        }}
        __nextHasNoMarginBottom
        __next40pxDefaultSize
        {...props}
      />
    </div>
  );
};

FontSizePickerLabel.propTypes = propTypes;

export default FontSizePickerLabel;
