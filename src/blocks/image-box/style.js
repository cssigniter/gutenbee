import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ImageBoxStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, imageMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={imageMargin}
        rule=".wp-block-gutenbee-imagebox-figure { margin: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

ImageBoxStyle.propTypes = propTypes;

export default ImageBoxStyle;
