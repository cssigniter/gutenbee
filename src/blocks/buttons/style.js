import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ButtonsStyle = ({ attributes, children }) => {
  const { uniqueId, align, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-buttons.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-buttons.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={align}
        rule=".wp-block-gutenbee-buttons.[root] { justify-content: %s; }"
        unit=""
      />

      {children}
    </StyleSheet>
  );
};

ButtonsStyle.propTypes = propTypes;

export default ButtonsStyle;
