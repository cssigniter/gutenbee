import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  id: PropTypes.string,
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const IconStyle = ({ id, attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = id || getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      {children}
    </StyleSheet>
  );
};

IconStyle.propTypes = propTypes;

export default IconStyle;
