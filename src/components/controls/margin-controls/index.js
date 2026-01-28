import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { __experimentalBoxControl as BoxControl } from 'wp.components';

const propTypes = {
  setAttributes: PropTypes.func.isRequired,
  attributeKey: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  label: PropTypes.string,
  breakpoint: PropTypes.string,
};

const MarginControls = ({
  setAttributes,
  attributeKey,
  attributes,
  label = __('Block Margin'),
  breakpoint,
}) => {
  const margins = attributes[attributeKey] || {};

  // Get current values based on breakpoint
  const currentValues = breakpoint ? margins[breakpoint] || {} : margins;

  // Convert numeric values to string with 'px' unit for BoxControl
  const boxControlValues = {
    top:
      currentValues.top != null && currentValues.top !== ''
        ? `${currentValues.top}px`
        : '',
    right:
      currentValues.right != null && currentValues.right !== ''
        ? `${currentValues.right}px`
        : '',
    bottom:
      currentValues.bottom != null && currentValues.bottom !== ''
        ? `${currentValues.bottom}px`
        : '',
    left:
      currentValues.left != null && currentValues.left !== ''
        ? `${currentValues.left}px`
        : '',
  };

  const handleChange = nextValues => {
    // Convert values back to numbers (remove 'px' unit)
    const numericValues = {
      top: nextValues?.top ? parseInt(nextValues.top) : '',
      right: nextValues?.right ? parseInt(nextValues.right) : '',
      bottom: nextValues?.bottom ? parseInt(nextValues.bottom) : '',
      left: nextValues?.left ? parseInt(nextValues.left) : '',
    };

    if (breakpoint) {
      setAttributes({
        [attributeKey]: {
          ...margins,
          [breakpoint]: numericValues,
        },
      });
    } else {
      setAttributes({
        [attributeKey]: {
          ...margins,
          ...numericValues,
        },
      });
    }
  };

  return (
    <div style={{ paddingTop: '2rem' }}>
      <BoxControl
        label={label}
        values={boxControlValues}
        onChange={handleChange}
        sides={['top', 'right', 'bottom', 'left']}
        units={[{ value: 'px', label: 'px' }]}
        allowReset={true}
        resetValues={{ top: '', right: '', bottom: '', left: '' }}
      />
    </div>
  );
};

MarginControls.propTypes = propTypes;

export default MarginControls;
