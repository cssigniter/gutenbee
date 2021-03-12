import { Fragment, useState, useRef } from 'wp.element';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { __, sprintf } from 'wp.i18n';
import {
  Button,
  Popover,
  ColorIndicator,
  ColorPicker,
  Tooltip,
  Dashicon,
} from 'wp.components';
import { useSelect } from 'wp.data';

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
  const [forceColorPickerReset, setForceColorPickerReset] = useState(false);
  const defaultColor = useRef(defaultValue);
  const colorPalette = useSelect(select => {
    const settings = select('core/block-editor').getSettings();

    return _.get(settings, ['colors'], []);
  });

  const toggleVisible = () => {
    setIsVisible(v => !v);
  };

  return (
    <div className="gutenbee-color-popover-container">
      <div className="gutenbee-color-popover-settings-container">
        {label && (
          <span className="gutenbee-advanced-color-label">{label}</span>
        )}

        {value && value !== defaultColor.current && (
          <Tooltip text={__('Reset')}>
            <Button
              className="components-color-palette__clear"
              type="button"
              onClick={() => {
                onChange(defaultColor.current);
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
                onClose={() => setIsVisible(false)}
              >
                <ColorPicker
                  key={forceColorPickerReset}
                  color={value}
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

                {colorPalette.length > 0 && (
                  <div className="components-color-palette">
                    {colorPalette.map(color => {
                      return (
                        <div
                          key={color.slug}
                          className="components-color-palette__item-wrapper"
                        >
                          <Button
                            type="button"
                            className={`components-color-palette__item ${
                              value === color.color ? 'is-active' : ''
                            }`}
                            onClick={() => {
                              onChange(color.color);
                              setForceColorPickerReset(v => !v);
                            }}
                            style={{
                              backgroundColor: color.color,
                              color: color.color,
                            }}
                            aria-label={
                              color.name
                                ? // translators: %s: The name of the color e.g: "vivid red".
                                  sprintf(__('Color: %s'), name)
                                : // translators: %s: color hex code e.g: "#f00".
                                  sprintf(__('Color code: %s'), color)
                            }
                            aria-pressed={color.color === value}
                          />
                          {color.color === value && <Dashicon icon="saved" />}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="gutenbee-color-popover-footer">
                  <Button
                    isSecondary
                    isSmall
                    disabled={!value}
                    onClick={() => onChange()}
                  >
                    {__('Clear')}
                  </Button>
                </div>
              </Popover>
            </Fragment>
          )}

          <Tooltip text={__('Select Color')}>
            <Button
              className="gutenbee-color-icon-indicator"
              // Prevents from firing Popover.onClose before the onClick registers.
              // This prevents the Popover to close and open when clicking at this trigger
              // while it's open.
              onMouseDown={event => {
                event.preventDefault();
                event.stopPropagation();
              }}
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
