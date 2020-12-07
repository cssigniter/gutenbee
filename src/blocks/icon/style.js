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
  const { uniqueId, blockPadding, blockMargin, size } = attributes;
  const blockId = id || getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-icon.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-icon.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={size}
        rule=".gutenbee-icon-block.[root] .gutenbee-icon-block-icon-wrap { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={size}
        rule=".gutenbee-icon-block.[root] svg { width: %s; }"
        unit="px"
      />
      <Rule
        value={size}
        rule=".gutenbee-icon-block.[root] svg { height: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

IconStyle.propTypes = propTypes;

export default IconStyle;
