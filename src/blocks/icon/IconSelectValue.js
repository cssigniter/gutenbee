/**
 * Icon select value component
 */
import PropTypes from 'prop-types';

const propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const IconSelectValue = ({ value, label }) => {
  const IconComponent = require(`./svg/${value}.svg`).default;
  return (
    <div className="gutenbee-icon-block-select-value">
      <IconComponent preserveAspectRatio="xMidYMid meet" />
      {label}
    </div>
  );
};

IconSelectValue.propTypes = propTypes;

export default IconSelectValue;
