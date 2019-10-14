import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const ContainerStyle = ({ attributes }) => {
  const {
    uniqueId,
    containerHeight,
    innerContentWidth,
    blockPadding,
    blockMargin,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
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
    </StyleSheet>
  );
};

export default ContainerStyle;
