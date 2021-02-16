import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const ContainerStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    containerHeight,
    innerContentWidth,
    blockPadding,
    blockMargin,
    verticalContentAlignment,
    horizontalContentAlignment,
    backgroundImage,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={containerHeight}
        rule=".wp-block-gutenbee-container.[root] { height: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100vh',
        }}
      />
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-container.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-container.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={innerContentWidth}
        rule=".wp-block-gutenbee-container.[root] > .wp-block-gutenbee-container-inner { width: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100%',
        }}
      />
      <Rule
        value={verticalContentAlignment}
        rule=".wp-block-gutenbee-container.[root] { align-items: %s; }"
      />
      <Rule
        value={horizontalContentAlignment}
        rule=".wp-block-gutenbee-container.[root] { justify-content: %s; }"
      />
      <Rule
        value={backgroundImage}
        rule=".wp-block-gutenbee-container.[root] > .wp-block-gutenbee-container-background { %s }"
      />
      {children}
    </StyleSheet>
  );
};

ContainerStyle.propTypes = propTypes;

export default ContainerStyle;
