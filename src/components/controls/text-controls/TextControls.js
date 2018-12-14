import PropTypes from 'prop-types';
import { Fragment } from 'wp.element';

import FontSizeControls from './FontSizeControl';

const propTypes = {
  setAttributes: PropTypes.func.isRequired,
  attributeKey: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  defaultFontSize: PropTypes.number,
  fontSizeLabel: PropTypes.string,
};

const TextControls = ({
  setAttributes,
  attributeKey,
  attributes,
  defaultFontSize,
  fontSizeLabel,
}) => (
  <Fragment>
    <FontSizeControls
      setAttributes={setAttributes}
      attributeKey={attributeKey}
      attributes={attributes}
      defaultFontSize={defaultFontSize}
      fontSizeLabel={fontSizeLabel}
    />
  </Fragment>
);

TextControls.propTypes = propTypes;

export default TextControls;
