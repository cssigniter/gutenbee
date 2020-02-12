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
    columnDirection,
    verticalContentAlignment,
    horizontalContentAlignment,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={columnDirection}
        rule=".wp-block-gutenbee-container-row { flex-direction: %s; }"
      />
      <Rule
        value={containerHeight}
        rule="{ height: %s; }"
        unit="px"
        // breakpointLimit TODO add deprecation
        edgeCase={{
          edge: -1,
          value: '100vh',
        }}
      />
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={innerContentWidth}
        rule=".wp-block-gutenbee-container-inner { width: %s; }"
        unit="px"
        // breakpointLimit TODO add deprecation
        edgeCase={{
          edge: -1,
          value: '100%',
        }}
      />
      <Rule value={verticalContentAlignment} rule="{ align-items: %s; }" />
      <Rule
        value={horizontalContentAlignment}
        rule="{ justify-content: %s; }"
      />
      {children}
    </StyleSheet>
  );
};

ContainerStyle.propTypes = propTypes;

export default ContainerStyle;
