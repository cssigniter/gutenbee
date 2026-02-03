import { __ } from 'wp.i18n';
import { BaseControl } from 'wp.components';
import Select, { components } from 'react-select';
import startCase from 'lodash.startcase';

import icons from '../../../blocks/icon/icons';

/**
 * Custom option component to show icon with label in dropdown
 */
const CustomOption = ({ data, ...props }) => {
  let IconComponent = null;

  try {
    IconComponent = require(`../../../blocks/icon/svg/${data.value}.svg`)
      .default;
  } catch {
    // If icon doesn't exist, just show the label
    return <components.Option {...props} data={data} />;
  }

  return (
    <components.Option {...props} data={data}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <IconComponent
          style={{
            width: '20px',
            height: '20px',
            flexShrink: 0,
          }}
          preserveAspectRatio="xMidYMid meet"
        />
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
};

/**
 * Custom single value component to show icon with label in selected value
 */
const CustomSingleValue = ({ data, ...props }) => {
  let IconComponent = null;

  try {
    IconComponent = require(`../../../blocks/icon/svg/${data.value}.svg`)
      .default;
  } catch {
    // If icon doesn't exist, just show the label
    return <components.SingleValue {...props} data={data} />;
  }

  return (
    <components.SingleValue {...props} data={data}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <IconComponent
          style={{
            width: '16px',
            height: '16px',
            flexShrink: 0,
          }}
          preserveAspectRatio="xMidYMid meet"
        />
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  );
};

/**
 * IconSelect Component
 * A reusable icon selector using react-select with icon previews
 *
 * @param {Object} props - Component props
 * @param {string} props.value - Currently selected icon value
 * @param {Function} props.onChange - Callback when selection changes
 * @param {string} [props.label] - Label for the control
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.isClearable] - Whether the selection can be cleared
 * @param {string} [props.className] - Additional CSS class
 * @param {string} [props.id] - ID for the control
 */
const IconSelect = ({
  value,
  onChange,
  label = __('Icon'),
  placeholder = __('Select an icon...'),
  isClearable = true,
  className = 'gutenbee-icon-select-control',
  id = 'icon-select',
}) => {
  const iconOptions = icons.map(iconValue => ({
    value: iconValue,
    label: startCase(iconValue),
  }));

  const selectedValue = value
    ? {
        value,
        label: startCase(value),
      }
    : null;

  return (
    <BaseControl id={id} label={label} __nextHasNoMarginBottom>
      <div className={className}>
        <Select
          value={selectedValue}
          options={iconOptions}
          onChange={option => onChange(option?.value)}
          components={{
            Option: CustomOption,
            SingleValue: CustomSingleValue,
          }}
          isClearable={isClearable}
          isSearchable
          placeholder={placeholder}
          classNamePrefix="gutenbee-select"
          styles={{
            control: base => ({
              ...base,
              minHeight: '40px',
            }),
            menu: base => ({
              ...base,
              zIndex: 999999,
            }),
            option: base => ({
              ...base,
              padding: '8px 12px',
            }),
          }}
        />
      </div>
    </BaseControl>
  );
};

export default IconSelect;
