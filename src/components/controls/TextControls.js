import PropTypes from 'prop-types';
import { Fragment } from 'wp.element';

import FontSizeControls from './FontSizeControl';

const propTypes = {
  setAttributes: PropTypes.func.isRequired,
  attributeKey: PropTypes.string.isRequired,
  attributes: PropTypes.shape,
  defaultFontSize: PropTypes.number,
};

const TextControls = ({
  setAttributes,
  attributeKey,
  attributes,
  defaultFontSize,
}) => (
  <Fragment>
    <FontSizeControls
      setAttributes={setAttributes}
      attributeKey={attributeKey}
      attributes={attributes}
      defaultFontSize={defaultFontSize}
    />
  </Fragment>
);

TextControls.propTypes = propTypes;

export default TextControls;
