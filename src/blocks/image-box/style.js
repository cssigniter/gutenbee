import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ImageBoxStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    imageMargin,
    titleFontSize,
    textFontSize,
    imageWidth,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-imagebox.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-imagebox.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={imageMargin}
        rule=".wp-block-gutenbee-imagebox.[root] .wp-block-gutenbee-imagebox-figure { margin: %s; }"
        unit="px"
      />
      <Rule
        value={titleFontSize}
        rule=".wp-block-gutenbee-imagebox.[root] .wp-block-gutenbee-imagebox-title { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={textFontSize}
        rule=".wp-block-gutenbee-imagebox.[root] .wp-block-gutenbee-imagebox-text { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={imageWidth}
        rule=".wp-block-gutenbee-imagebox.[root] .wp-block-gutenbee-imagebox-figure img { width: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

ImageBoxStyle.propTypes = propTypes;

export default ImageBoxStyle;
