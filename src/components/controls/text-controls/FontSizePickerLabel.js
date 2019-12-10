import PropTypes from 'prop-types';
import { FontSizePicker } from 'wp.blockEditor';

const propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
};

const FontSizePickerLabel = ({ value, onChange, label, ...props }) => {
  return (
    <div className="gutenbee-font-size-picker-label">
      <p className="components-base-control__label">{label}</p>
      <FontSizePicker label="" value={value} onChange={onChange} {...props} />
    </div>
  );
};

FontSizePickerLabel.propTypes = propTypes;

export default FontSizePickerLabel;
