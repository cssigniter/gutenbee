import { Fragment, useState } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  Button,
  Popover,
  ColorIndicator,
  ColorPicker,
  Tooltip,
  Dashicon,
} from 'wp.components';

const propTypes = {
  label: PropTypes.string,
  disableAlpha: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const PopoverColorControl = ({
  label,
  disableAlpha = false,
  value,
  defaultValue,
  onChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    setIsVisible(v => !v);
  };

  return (
    <div className="gutenbee-color-popover-container">
      <div className="gutenbee-advanced-color-settings-container">
        {label && (
          <span className="gutenbee-advanced-color-label">{label}</span>
        )}

        <div className="gutenbee-advanced-color-label-controls" />
        {value && value !== defaultValue && (
          <Tooltip text={__('Clear')}>
            <Button
              className="components-color-palette__clear"
              type="button"
              onClick={() => {
                onChange(defaultValue);
              }}
              isSmall
            >
              <Dashicon icon="redo" />
            </Button>
          </Tooltip>
        )}

        <div className="gutenbee-beside-color-click">
          {isVisible && (
            <Fragment>
              <Popover
                position="top left"
                className="gutenbee-popover-color"
                onClose={toggleVisible}
              >
                <ColorPicker
                  color={value || defaultValue}
                  onChangeComplete={color => {
                    if ((color.rgb && color.rgb.a === 1) || disableAlpha) {
                      onChange(color.hex);
                    } else {
                      const { r, g, b, a } = color.rgb;
                      onChange(`rgba(${r}, ${g}, ${b}, ${a})`);
                    }
                  }}
                  disableAlpha={false}
                />
              </Popover>
            </Fragment>
          )}

          <Tooltip text={__('Select Color')}>
            <Button
              className="gutenbee-color-icon-indicator"
              onClick={toggleVisible}
            >
              <ColorIndicator
                className="gutenbee-advanced-color-indicator"
                colorValue={value}
              />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

PopoverColorControl.propTypes = propTypes;

export default PopoverColorControl;
