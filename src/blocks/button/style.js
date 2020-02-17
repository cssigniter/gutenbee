import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ButtonStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".gutenbee-block-button-link { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".gutenbee-block-button-link { padding: %s; }"
        unit="px"
      />

      {children}
    </StyleSheet>
  );
};

ButtonStyle.propTypes = propTypes;

export default ButtonStyle;
