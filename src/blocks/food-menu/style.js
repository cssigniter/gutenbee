import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const FoodMenuStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, gutter } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule value={gutter} rule="{ grid-gap: %s; }" unit="px" />
      {children}
    </StyleSheet>
  );
};

FoodMenuStyle.propTypes = propTypes;

export default FoodMenuStyle;
