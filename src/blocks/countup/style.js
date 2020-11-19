import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const CountupStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    textFontSize,
    titleFontSize,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-countup.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-countup.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={textFontSize}
        rule=".wp-block-gutenbee-countup.[root] .wp-block-gutenbee-countup-number { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={titleFontSize}
        rule=".wp-block-gutenbee-countup.[root] .wp-block-gutenbee-countup-title { font-size: %s; }"
        unit="px"
      />

      {children}
    </StyleSheet>
  );
};

CountupStyle.propTypes = propTypes;

export default CountupStyle;
