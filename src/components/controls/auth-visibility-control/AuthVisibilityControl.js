import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { BaseControl, ToggleControl } from 'wp.components';
import { home, institution } from '@wordpress/icons';

const AUTH_VISIBILITY_CONTROLS = [
  {
    icon: home,
    title: __('Hide for logged in users'),
    value: 'loggedIn',
  },
  {
    icon: institution,
    title: __('Hide for logged out users'),
    value: 'loggedOut',
  },
];

const propTypes = {
  values: PropTypes.shape({
    loggedIn: PropTypes.bool,
    loggedOut: PropTypes.bool,
  }),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  isCollapsed: PropTypes.bool,
};

const AuthVisibilityControl = ({
  values = {},
  onChange,
  label = __('Authentication visibility'),
}) => {
  return (
    <BaseControl className="gutenbee-visibility-control">
      <BaseControl.VisualLabel>{label}</BaseControl.VisualLabel>

      {AUTH_VISIBILITY_CONTROLS.map(control => {
        const isActive = !!values[control.value];

        return (
          <ToggleControl
            key={control.value}
            label={control.title}
            checked={isActive}
            onChange={() =>
              onChange({
                ...values,
                [control.value]: !isActive,
              })
            }
          />
        );
      })}
    </BaseControl>
  );
};

AuthVisibilityControl.propTypes = propTypes;

export default AuthVisibilityControl;
