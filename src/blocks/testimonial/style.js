import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const TestimonialStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    contentSize,
    citationSize,
    infoSize,
    blockPadding,
    blockMargin,
    width,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-testimonial.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-testimonial.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={width}
        rule=".wp-block-gutenbee-testimonial.[root] .gutenbee-testimonial-avatar img { width: %s; }"
        unit="px"
      />
      <Rule
        value={contentSize}
        rule=".wp-block-gutenbee-testimonial.[root] .wp-block-testimonial-content-wrapper { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={citationSize}
        rule=".wp-block-gutenbee-testimonial.[root] .gutenbee-block-testimonial__citation { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={infoSize}
        rule=".wp-block-gutenbee-testimonial.[root] .gutenbee-block-testimonial__info { font-size: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

TestimonialStyle.propTypes = propTypes;

export default TestimonialStyle;
