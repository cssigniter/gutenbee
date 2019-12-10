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
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={numberFontSize}
        rule=".gutenbee-countdown-number { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={labelFontSize}
        rule=".gutenbee-countdown-label { font-size: %s; }"
        unit="px"
      />

      {children}
    </StyleSheet>
  );
};

CountdownStyle.propTypes = propTypes;

export default CountdownStyle;
