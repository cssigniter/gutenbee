import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ProgressBarStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    titleFontSize,
    innerTitleFontSize,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-progress-bar.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-progress-bar.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={titleFontSize}
        rule=".wp-block-gutenbee-progress-bar.[root] .wp-block-gutenbee-progress-bar-title { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={innerTitleFontSize}
        rule=".wp-block-gutenbee-progress-bar.[root] .wp-block-gutenbee-progress-bar-inner-title { font-size: %s; }"
        unit="px"
      />

      {children}
    </StyleSheet>
  );
};

ProgressBarStyle.propTypes = propTypes;

export default ProgressBarStyle;
