import { useState } from 'wp.element';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'wp.components';

const propTypes = {
  className: PropTypes.string,
  states: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.func,
};

const StateTabs = ({
  className,
  states = ['', 'Hover', 'Active'],
  children,
}) => {
  const classes = classNames({
    'gutenbee-state-tabs': true,
    [className]: !!className,
  });
  const [activeState, setActiveState] = useState(states[0]);

  return (
    <div className={classes}>
      <div className="gutenbee-state-tabs-nav">
        {states.map(state => (
          <Button
            key={state}
            onClick={() => setActiveState(state)}
            isSmall
            isPrimary={state === activeState}
          >
            {state === '' ? 'Default' : state}
          </Button>
        ))}
      </div>
      <div className="gutenbee-state-tabs-content">{children(activeState)}</div>
    </div>
  );
};

StateTabs.propTypes = propTypes;

export default StateTabs;
