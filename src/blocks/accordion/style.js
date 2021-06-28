import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const AccordionStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    titleActiveBackgroundColor,
    titleHoverBackgroundColor,
    titleActiveTextColor,
    titleHoverTextColor,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  // TODO: remove !important and add all colors here + deprecation

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-accordion.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-accordion.[root] { padding: %s; }"
        unit="px"
      />

      <Rule
        value={titleActiveBackgroundColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-expanded .wp-block-gutenbee-accordion-item-title { background-color: %s !important; }"
      />
      <Rule
        value={titleHoverBackgroundColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-title:hover { background-color: %s !important; }"
      />

      <Rule
        value={titleActiveTextColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-expanded .wp-block-gutenbee-accordion-item-title { color: %s !important; }"
      />
      <Rule
        value={titleHoverTextColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-title:hover { color: %s !important; }"
      />
      {children}
    </StyleSheet>
  );
};

AccordionStyle.propTypes = propTypes;

export default AccordionStyle;
