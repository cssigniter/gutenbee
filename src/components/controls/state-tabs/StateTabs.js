import { useState } from 'wp.element';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'wp.components';
import { __ } from 'wp.i18n';

const propTypes = {
  className: PropTypes.string,
  states: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.func,
};

const stateLabels = {
  '': __('Default', 'gutenbee'),
  Hover: __('Hover', 'gutenbee'),
  Active: __('Active', 'gutenbee'),
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
            variant={activeState === state ? 'primary' : 'secondary'}
            onClick={() => setActiveState(state)}
            size="small"
          >
            {stateLabels[state] ?? state}
          </Button>
        ))}
      </div>
      <div className="gutenbee-state-tabs-content">{children(activeState)}</div>
    </div>
  );
};

StateTabs.propTypes = propTypes;

export default StateTabs;
