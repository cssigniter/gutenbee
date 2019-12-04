import { useState } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { BaseControl, CheckboxControl, TextControl } from 'wp.components';
import { withInstanceId } from 'wp.compose';
import classNames from 'classnames';

const propTypes = {
  instanceId: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  value: PropTypes.array,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  help: PropTypes.node,
  hideLabelFromVision: PropTypes.bool,
};

const MultiSelectCheckboxControl = ({
  label,
  options = [],
  value = [],
  onChange,
  instanceId,
  className,
  hideLabelFromVision,
  help,
}) => {
  const id = `inspector-multi-select-checkbox-control-${instanceId}`;
  const classes = classNames('multi-select-checkbox', className);

  const [filter, setFilter] = useState('');
  const filteredOptions = options.filter(option =>
    option.label
      .toLowerCase()
      .trim()
      .includes(filter.toLowerCase().trim()),
  );

  const onCheckboxChange = optionValue => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
      return;
    }

    onChange([optionValue, ...value]);
  };

  return (
    <BaseControl
      label={label}
      id={id}
      hideLabelFromVision={hideLabelFromVision}
      help={help}
      className={classes}
    >
      <div className="multi-select-checkbox-option-wrap">
        <TextControl
          label={__('Search')}
          hideLabelFromVision
          placeholder={__('Search…')}
          className="multi-select-checkbox-search-control"
          onChange={setFilter}
        />

        {filteredOptions.map(option => {
          const checked = value.includes(option.value);

          return (
            <CheckboxControl
              label={option.label}
              value={option.value}
              checked={checked}
              onChange={() => onCheckboxChange(option.value)}
            />
          );
        })}
      </div>
    </BaseControl>
  );
};

MultiSelectCheckboxControl.propTypes = propTypes;

export default withInstanceId(MultiSelectCheckboxControl);
