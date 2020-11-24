import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withSelect, withDispatch } from 'wp.data';
import { compose } from 'wp.compose';

const propTypes = {
  children: PropTypes.func.isRequired,
  activeBreakpoint: PropTypes.string.isRequired,
  setActiveBreakpoint: PropTypes.func.isRequired,
};

const ResponsiveControl = ({
  activeBreakpoint,
  setActiveBreakpoint,
  children,
}) => {
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

  return (
    <div className="gutenbee-responsive-control-wrap">
      <div className="gutenbee-responsive-control-wrap-buttons">
        {breakpoints.map(breakpoint => (
          <button
            key={breakpoint}
            onClick={() => setActiveBreakpoint(breakpoint.value)}
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

export default compose(
  withSelect(select => {
    const activeBreakpoint = select('gutenbee-breakpoints').getBreakpoint();

    return {
      activeBreakpoint,
    };
  }),
  withDispatch(dispatch => {
    const { onBreakpointSet } = dispatch('gutenbee-breakpoints');

    return {
      setActiveBreakpoint: onBreakpointSet,
    };
  }),
)(ResponsiveControl);
