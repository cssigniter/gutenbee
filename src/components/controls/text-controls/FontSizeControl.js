import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { FontSizePicker } from 'wp.components';

const propTypes = {
  setAttributes: PropTypes.func.isRequired,
  attributeKey: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  defaultFontSize: PropTypes.number,
  fontSizeLabel: PropTypes.string,
};

const defaultProps = {
  fontSizeLabel: __('Font Size'),
  defaultFontSize: 16,
};

const FontSizeControls = ({
  setAttributes,
  attributeKey,
  attributes,
  defaultFontSize,
  fontSizeLabel,
}) => {
  const FONT_SIZES = [
    {
      name: 'Small',
      shortName: 'S',
      size: 14,
    },
    {
      name: 'Regular',
      shortName: 'M',
      size: 16,
    },
    {
      name: 'Large',
      shortName: 'L',
      size: 20,
    },
    {
      name: 'Extra Large',
      shortName: 'XL',
      size: 24,
    },
  ];

  const fontSizeKey = [`${attributeKey}FontSize`];
  const fontSize = attributes[fontSizeKey];

  // TODO: Re-instate `label` if support for custom labels gets added
  return (
    <div className="gutenbee-font-size-control">
      {fontSizeLabel && (
        <span className="components-base-control__label">{fontSizeLabel}</span>
      )}
      <FontSizePicker
        label={__('')}
        fontSizes={FONT_SIZES}
        fallbackFontSize={defaultFontSize}
        value={fontSize}
        onChange={value => setAttributes({ [fontSizeKey]: value })}
      />
    </div>
  );
};

FontSizeControls.propTypes = propTypes;
FontSizeControls.defaultProps = defaultProps;

export default FontSizeControls;
