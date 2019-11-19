import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const SpacerStyle = ({ attributes, children }) => {
  const { uniqueId, height } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule value={height} rule="{ height: %s; }" unit="px" />
      {children}
    </StyleSheet>
  );
};

SpacerStyle.propTypes = propTypes;

export default SpacerStyle;
