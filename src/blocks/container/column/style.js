import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import getBlockId from '../../../util/getBlockId';

const ColumnStyle = ({ attributes }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-column-content { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-column-content { padding: %s; }"
        unit="px"
      />
    </StyleSheet>
  );
};

export default ColumnStyle;
