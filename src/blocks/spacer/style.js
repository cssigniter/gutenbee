import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const SpacerStyle = ({ attributes, children }) => {
  const { uniqueId, height, blockMargin, backgroundImage } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={height}
        rule=".wp-block-gutenbee-spacer.[root] { height: %s; }"
        unit="px"
      />
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-spacer.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={backgroundImage}
        rule=".wp-block-gutenbee-spacer.[root] .wp-block-gutenbee-spacer-background { %s }"
      />
      {children}
    </StyleSheet>
  );
};

SpacerStyle.propTypes = propTypes;

export default SpacerStyle;
