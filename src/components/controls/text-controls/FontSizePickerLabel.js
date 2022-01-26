import PropTypes from 'prop-types';
import { FontSizePicker } from 'wp.blockEditor';

const propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.node,
};

/**
 * Custom sanitizer attempting to address how the native <FontSizePicker>
 *   control works which is as follows:
 *   - When choosing a font size from the dropdown it returns a Number
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

  if (value?.includes?.('px')) {
    return parseInt(value.replace('px', ''), 10);
  }

  return value;
};

const FontSizePickerLabel = ({ value, onChange, label, ...props }) => {
  return (
    <div className="gutenbee-font-size-picker-label">
      {label && <p className="components-base-control__label">{label}</p>}
      <FontSizePicker
        label=""
        value={value ? `${sanitizeFontSizeValue(value)}px` : undefined}
        onChange={newValue => {
          onChange(sanitizeFontSizeValue(newValue));
        }}
        {...props}
      />
    </div>
  );
};

FontSizePickerLabel.propTypes = propTypes;

export default FontSizePickerLabel;
