import PropTypes from 'prop-types';
import { FontSizePicker } from 'wp.blockEditor';

const propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

const FontSizePickerLabel = ({ value, onChange, ...props }) => {
  return (
    <div className="gutenbee-font-size-picker-label">
      <FontSizePicker label="" value={value} onChange={onChange} {...props} />
    </div>
  );
};

FontSizePickerLabel.propTypes = propTypes;

export default FontSizePickerLabel;
