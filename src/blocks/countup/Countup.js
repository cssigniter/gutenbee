import PropTypes from 'prop-types';
import { getColorClass } from 'wp.editor';
import classNames from 'classnames';

import formatNumber from '../../util/formatNumber';

const propTypes = {
  startNumber: PropTypes.number.isRequired,
  endNumber: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  separator: PropTypes.string.isRequired,
  decimal: PropTypes.string.isRequired,
  textFontSize: PropTypes.number,
  textColor: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  className: PropTypes.string.isRequired,
};

const Countup = ({
  startNumber,
  endNumber,
  animationDuration,
  separator,
  decimal,
  textFontSize,
  textColor,
  customTextColor,
  prefix,
  suffix,
  className,
}) => {
  const textClass = getColorClass('color', textColor);
  const classes = classNames({
    [className]: true,
    [textClass]: !!textClass,
  });

  return (
    <span
      className={classes}
      style={{
        fontSize: `${textFontSize}px`,
        color: textClass ? undefined : customTextColor,
      }}
      data-start={startNumber}
      data-end={endNumber}
      data-animation-duration={animationDuration}
      data-separator={separator}
      data-decimal={decimal}
      data-prefix={prefix}
    >
      {formatNumber(startNumber, separator, decimal, prefix, suffix)}
    </span>
  );
};

Countup.propTypes = propTypes;

export default Countup;
