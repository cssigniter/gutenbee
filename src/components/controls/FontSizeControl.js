import PropTypes from 'prop-types';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  FontSizePicker,
} from 'wp.components';

const propTypes = {
  setAttributes: PropTypes.func.isRequired,
  attributeKey: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  defaultFontSize: PropTypes.number,
  label: PropTypes.string,
};

const defaultProps = {
  label: __('Font Size'),
};

const FontSizeControls = ({
  setAttributes,
  attributeKey,
  attributes,
  defaultFontSize = 16,
  label,
}) => {
  const FONT_SIZES = [
    {
      name: 'small',
      shortName: 'S',
      size: 14,
    },
    {
      name: 'regular',
      shortName: 'M',
      size: 16,
    },
    {
      name: 'small',
      shortName: 'L',
      size: 20,
    },
    {
      name: 'small',
      shortName: 'XL',
      size: 24,
    },
  ];

  const fontSizeKey = [`${attributeKey}FontSize`];
  const fontSize = attributes[fontSizeKey];

  return (
    <Fragment>
      <p>{label}</p>
      <FontSizePicker
        fontSizes={FONT_SIZES}
        fallbackFontSize={defaultFontSize}
        value={fontSize}
        onChange={value => setAttributes({ [fontSizeKey]: value })}
      />
    </Fragment>
  );
};

FontSizeControls.propTypes = propTypes;
FontSizeControls.defaultProps = defaultProps;

export default FontSizeControls;
