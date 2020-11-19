import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ImageStyle = ({ attributes, children }) => {
  const { uniqueId, width, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={width}
        rule=".wp-block-gutenbee-image.[root] img { width: %s; }"
        unit="px"
      />
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-image.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-image.[root] { padding: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

ImageStyle.propTypes = propTypes;

export default ImageStyle;
