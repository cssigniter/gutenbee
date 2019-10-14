import { useState } from 'wp.element';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.func.isRequired,
};

const ResponsiveControl = ({ children }) => {
  const breakpoints = [
    {
      value: 'desktop',
      icon: 'desktop',
    },
    {
      value: 'tablet',
      icon: 'tablet',
    },
    {
      value: 'mobile',
      icon: 'smartphone',
    },
  ];
  const [activeBreakpoint, setActiveBreakpont] = useState(breakpoints[0].value);

  return (
    <div className="gutenbee-responsive-control-wrap">
      <div className="gutenbee-responsive-control-wrap-buttons">
        {breakpoints.map(breakpoint => (
          <button
            onClick={() => setActiveBreakpont(breakpoint.value)}
            className={classNames({
              'gutenbee-responsive-control-wrap-button': true,
              active: breakpoint.value === activeBreakpoint,
            })}
          >
            <span className={`dashicons dashicons-${breakpoint.icon}`} />
          </button>
        ))}
      </div>

      {children(activeBreakpoint)}
    </div>
  );
};

ResponsiveControl.propTypes = propTypes;

export default ResponsiveControl;
