import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ReviewStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    scoreSize,
    contentSize,
    barHeight,
    blockPadding,
    blockMargin,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-review.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-review.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={scoreSize}
        rule=".wp-block-gutenbee-review.[root] .entry-rating-final-score strong { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={contentSize}
        rule=".wp-block-gutenbee-review.[root] .entry-rating-final-score div { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={barHeight}
        rule=".wp-block-gutenbee-review.[root] .wp-block-gutenbee-review-item-outer { height: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

ReviewStyle.propTypes = propTypes;

export default ReviewStyle;
