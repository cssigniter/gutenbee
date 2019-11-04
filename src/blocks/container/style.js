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
        breakpointLimit
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
        breakpointLimit
        edgeCase={{
          edge: -1,
          value: '100%',
        }}
      />
      {children}
    </StyleSheet>
  );
};

ContainerStyle.propTypes = propTypes;

export default ContainerStyle;
