import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
  tagName: PropTypes.string,
};

const HeadingStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    fontSize,
    lineHeight,
    letterSpacing,
    textTransform,
    textDecoration,
    align,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-heading.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-heading.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={fontSize}
        rule=".wp-block-gutenbee-heading.[root] { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={lineHeight}
        rule=".wp-block-gutenbee-heading.[root] { line-height: %s; }"
        unit=""
      />
      <Rule
        value={letterSpacing}
        rule=".wp-block-gutenbee-heading.[root] { letter-spacing: %s; }"
        unit=""
      />
      <Rule
        value={textTransform}
        rule=".wp-block-gutenbee-heading.[root] { text-transform: %s; }"
        unit=""
      />
      <Rule
        value={textDecoration}
        rule=".wp-block-gutenbee-heading.[root] { text-decoration: %s; }"
        unit=""
      />
      <Rule
        value={align}
        rule=".wp-block-gutenbee-heading.[root] { text-align: %s; }"
        unit=""
      />

      {children}
    </StyleSheet>
  );
};

HeadingStyle.propTypes = propTypes;

export default HeadingStyle;
