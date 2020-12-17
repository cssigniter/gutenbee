import PropTypes from 'prop-types';

import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import getBlockId from '../../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ReviewItemStyle = ({ attributes, children }) => {
  const { uniqueId, innerTitleFontSize } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={innerTitleFontSize}
        rule=".wp-block-gutenbee-review-item.[root] .wp-block-gutenbee-review-item-inner-title { font-size: %s; }"
        unit="px"
      />

      {children}
    </StyleSheet>
  );
};

ReviewItemStyle.propTypes = propTypes;

export default ReviewItemStyle;
