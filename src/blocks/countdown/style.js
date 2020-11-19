import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const CountdownStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    numberFontSize,
    labelFontSize,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-countdown.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-countdown.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={numberFontSize}
        rule=".wp-block-gutenbee-countdown.[root] .gutenbee-countdown-number { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={labelFontSize}
        rule=".wp-block-gutenbee-countdown.[root] .gutenbee-countdown-label { font-size: %s; }"
        unit="px"
      />

      {children}
    </StyleSheet>
  );
};

CountdownStyle.propTypes = propTypes;

export default CountdownStyle;
