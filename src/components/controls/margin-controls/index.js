import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { TextControl, Button } from 'wp.components';

import { capitalize } from '../../../util/text';

const propTypes = {
  setAttributes: PropTypes.func.isRequired,
  attributeKey: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  label: PropTypes.string,
  breakpoint: PropTypes.string,
};

const defaultProps = {
  label: __('Block Margin'),
};

const MarginControls = ({
  setAttributes,
  attributeKey,
  attributes,
  label,
  breakpoint,
}) => {
  const margins = attributes[attributeKey];
  const positions = ['top', 'right', 'bottom', 'left'];

  const onMarginsChange = (value, position) => {
    // Accommodate for responsive changes.
    if (breakpoint) {
      if (linked) {
        setAttributes({
          [attributeKey]: {
            ...margins,
            [breakpoint]: {
              ...margins[breakpoint],
              top: value,
              right: value,
              left: value,
              bottom: value,
            },
          },
        });

        return;
      }

      setAttributes({
        [attributeKey]: {
          ...margins,
          [breakpoint]: {
            ...margins[breakpoint],
            [position]: value,
          },
        },
      });

      return;
    }

    if (linked) {
      setAttributes({
        [attributeKey]: {
          ...margins,
          top: value,
          right: value,
          left: value,
          bottom: value,
        },
      });

      return;
    }

    setAttributes({
      [attributeKey]: {
        ...margins,
        [position]: value,
      },
    });
  };

  const linked = attributes[attributeKey]?.linked;

  return (
    <div className="gutenbee-control-margins">
      <p className="gutenbee-control-margins-label">{label}</p>

      <div className="gutenbee-control-spacing-controls-wrap">
        <div className="gutenbee-control-spacing-controls">
          {positions.map(position => (
            <TextControl
              label={__(capitalize(position))}
              value={
                breakpoint ? margins[breakpoint][position] : margins[position]
              }
              type="number"
              min={-200}
              max={200}
              step={1}
              onChange={value => onMarginsChange(value, position)}
            />
          ))}
        </div>

        <Button
          isSecondary={!linked}
          isPrimary={linked}
          className="components-toolbar__control"
          label={__('Link Values')}
          icon="admin-links"
          onClick={() => {
            setAttributes({
              [attributeKey]: {
                ...margins,
                linked: !linked,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

MarginControls.propTypes = propTypes;
MarginControls.defaultProps = defaultProps;

export default MarginControls;
