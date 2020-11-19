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
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-food-menu.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-food-menu.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={gutter}
        rule=".wp-block-gutenbee-food-menu.[root] { grid-gap: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

FoodMenuStyle.propTypes = propTypes;

export default FoodMenuStyle;
