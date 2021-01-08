import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const DividerStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, backgroundImage } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-divider.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-divider.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={backgroundImage}
        rule=".wp-block-gutenbee-divider.[root] { %s }"
      />
      {children}
    </StyleSheet>
  );
};

DividerStyle.propTypes = propTypes;

export default DividerStyle;
