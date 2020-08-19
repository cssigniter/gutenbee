import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const SlideshowStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    dotsBackgroundColor,
    arrowsBackgroundColor,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={dotsBackgroundColor}
        rule=".slick-dots { background-color: %s; }"
      />
      <Rule
        value={arrowsBackgroundColor}
        rule="button.slick-arrow { background-color: %s; }"
      />
      {children}
    </StyleSheet>
  );
};

SlideshowStyle.propTypes = propTypes;

export default SlideshowStyle;
