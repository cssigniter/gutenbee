import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ParagraphStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, fontSize } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule value={fontSize} rule="{ font-size: %s; }" unit="px" />

      {children}
    </StyleSheet>
  );
};

ParagraphStyle.propTypes = propTypes;

export default ParagraphStyle;