import PropTypes from 'prop-types';

import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import getBlockId from '../../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const FoodMenuItemStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    verticalContentAlignment,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule value={verticalContentAlignment} rule="{ align-items: %s; }" />
      {children}
    </StyleSheet>
  );
};

FoodMenuItemStyle.propTypes = propTypes;

export default FoodMenuItemStyle;
