import PropTypes from 'prop-types';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  ButtonGroup,
  Button,
  RangeControl,
} from 'wp.components';

const propTypes = {
  setAttributes: PropTypes.func.isRequired,
  attributeKey: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  defaultFontSize: PropTypes.number,
};

const FontSizeControls = ({
  setAttributes,
  attributeKey,
  attributes,
  defaultFontSize = 16,
}) => {
  const FONT_SIZES = {
    small: 14,
    regular: 16,
    large: 20,
    larger: 24,
  };

  const FONT_SIZE_OPTIONS = {
    S: 'small',
    M: 'regular',
    L: 'large',
    XL: 'larger',
  };

  const fontSizeKey = [`${attributeKey}FontSize`];
  const fontSize = attributes[fontSizeKey];

  return (
    <Fragment>
      <p>{__('Font size')}</p>
      <div className="blocks-font-size__main">
        <ButtonGroup aria-label={__('Font Size')}>
          {Object.keys(FONT_SIZE_OPTIONS).map((label) => {
            const size = FONT_SIZES[FONT_SIZE_OPTIONS[label]];

            return (
              <Button
                key={label}
                isLarge
                isPrimary={fontSize === size}
                aria-pressed={fontSize === size}
                onClick={() => setAttributes({ [fontSizeKey]: size })}
              >
                {label}
              </Button>
            );
          })}
        </ButtonGroup>
        <Button
          isLarge
          onClick={() => setAttributes({ [fontSizeKey]: defaultFontSize })}
        >
          {__('Reset')}
        </Button>
      </div>
      <RangeControl
        className="blocks-paragraph__custom-size-slider"
        label={__('Custom size')}
        value={fontSize || ''}
        initialPosition={defaultFontSize}
        onChange={(value) => {
          setAttributes({ [fontSizeKey]: value });
        }}
        min={12}
        max={72}
        beforeIcon="editor-textcolor"
        afterIcon="editor-textcolor"
      />
    </Fragment>
  );
};

FontSizeControls.propTypes = propTypes;

export default FontSizeControls;
