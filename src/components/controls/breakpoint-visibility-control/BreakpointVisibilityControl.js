import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { BaseControl, ToggleControl } from 'wp.components';
import { desktop, tablet, mobile } from '@wordpress/icons';

import { BREAKPOINT_NAMES } from '../../stylesheet/helpers';
import { getDefaultResponsiveValue } from '../responsive-control/default-values';

const BREAKPOINT_VISIBILITY_CONTROLS = [
  {
    icon: desktop,
    title: __('Hide on desktop'),
    breakpoint: BREAKPOINT_NAMES.desktop,
    value: 'gutenbee-hidden-desktop',
  },
  {
    icon: tablet,
    title: __('Hide on tablet'),
    breakpoint: BREAKPOINT_NAMES.tablet,
    value: 'gutenbee-hidden-tablet',
  },
  {
    icon: mobile,
    title: __('Hide on mobile'),
    breakpoint: BREAKPOINT_NAMES.mobile,
    value: 'gutenbee-hidden-mobile',
  },
];

const propTypes = {
  values: PropTypes.shape({
    desktop: PropTypes.bool,
    tablet: PropTypes.bool,
    mobile: PropTypes.bool,
  }),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  isCollapsed: PropTypes.bool,
};

const BreakpointVisibilityControl = ({
  values = getDefaultResponsiveValue(),
  onChange,
  label = __('Viewport visibility'),
}) => {
  return (
    <BaseControl className="gutenbee-visibility-control">
      <BaseControl.VisualLabel>{label}</BaseControl.VisualLabel>

      {BREAKPOINT_VISIBILITY_CONTROLS.map(control => {
        const isActive = !!values[control.breakpoint];

        return (
          <ToggleControl
            key={control.breakpoint}
            label={control.title}
            checked={isActive}
            onChange={() =>
              onChange({
                ...values,
                [control.breakpoint]: !isActive,
              })
            }
          />
        );
      })}
    </BaseControl>
  );
};

BreakpointVisibilityControl.propTypes = propTypes;

export default BreakpointVisibilityControl;
