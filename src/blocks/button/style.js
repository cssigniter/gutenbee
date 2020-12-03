import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ButtonStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, fontSize } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-button.[root] .gutenbee-block-button-link { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-button.[root] .gutenbee-block-button-link { padding: %s; }"
        unit="px"
      />
      <Rule
        value={fontSize}
        rule=".wp-block-gutenbee-button.[root] .gutenbee-block-button-link { font-size: %s; }"
        unit="px"
      />

      {children}
    </StyleSheet>
  );
};

ButtonStyle.propTypes = propTypes;

export default ButtonStyle;
