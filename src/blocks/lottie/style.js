import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';
import StyleSheetV1 from '../../components/stylesheet/deprecated/v1';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const LottieStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      {children}
    </StyleSheetV1>
  );
};

LottieStyle.propTypes = propTypes;

export default LottieStyle;
