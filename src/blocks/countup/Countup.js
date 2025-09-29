import PropTypes from 'prop-types';
import { safeHTML } from '@wordpress/dom';

import formatNumber from '../../util/formatNumber';

const propTypes = {
  startNumber: PropTypes.number.isRequired,
  endNumber: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
  separator: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  className: PropTypes.string.isRequired,
};

const Countup = ({
  startNumber,
  endNumber,
  animationDuration,
  separator,
  textColor,
  prefix,
  suffix,
  inViewport,
  className,
}) => {
  const sanitizedPrefix = prefix ? safeHTML(prefix) : '';
  const sanitizedSuffix = suffix ? safeHTML(suffix) : '';
  return (
    <span
      className={className}
      style={{
        color: textColor ? textColor : undefined,
      }}
      data-start={startNumber}
      data-end={endNumber}
      data-animation-duration={animationDuration}
      data-separator={separator}
      data-prefix={sanitizedPrefix}
      data-suffix={sanitizedSuffix}
      data-inviewport={inViewport}
    >
      {formatNumber(startNumber, separator, sanitizedPrefix, sanitizedSuffix)}
    </span>
  );
};

Countup.propTypes = propTypes;

export default Countup;
