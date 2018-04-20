/**
 * Icon select value component
 */
import PropTypes from 'prop-types';

const propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const IconSelectValue = ({ value, label, className }) => (
  <div className={`${className}-select-value`}>
    <span className={`ep-icon-module ep-icon-module-${value}`} />
    {label}
  </div>
);

IconSelectValue.propTypes = propTypes;

export default IconSelectValue;
