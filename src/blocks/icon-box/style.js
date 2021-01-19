import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const IconBoxStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    textFontSize,
    titleFontSize,
    iconMargin,
    iconPadding,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-iconbox.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-iconbox.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={iconMargin}
        rule=".wp-block-gutenbee-iconbox.[root] .gutenbee-icon-block { margin: %s; }"
        unit="px"
      />
      <Rule
        value={iconPadding}
        rule=".wp-block-gutenbee-iconbox.[root] .gutenbee-icon-block { padding: %s; }"
        unit="px"
      />
      <Rule
        value={textFontSize}
        rule=".wp-block-gutenbee-iconbox.[root] .wp-block-gutenbee-iconbox-text { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={titleFontSize}
        rule=".wp-block-gutenbee-iconbox.[root] .wp-block-gutenbee-iconbox-title { font-size: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

IconBoxStyle.propTypes = propTypes;

export default IconBoxStyle;
