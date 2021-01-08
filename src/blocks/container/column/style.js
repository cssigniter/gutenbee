import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import getBlockId from '../../../util/getBlockId';

const ColumnStyle = ({ attributes, children }) => {
  const {
    uniqueId,
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
        value={blockMargin}
        rule=".wp-block-gutenbee-column.[root] .wp-block-gutenbee-column-content { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-column.[root] .wp-block-gutenbee-column-content { padding: %s; }"
        unit="px"
      />
      <Rule
        value={horizontalContentAlignment}
        rule=".wp-block-gutenbee-column.[root] .wp-block-gutenbee-column-content { align-items: %s; }"
      />
      <Rule
        value={verticalContentAlignment}
        rule=".wp-block-gutenbee-column.[root] .wp-block-gutenbee-column-content { justify-content: %s; }"
      />
      <Rule
        value={backgroundImage}
        rule=".wp-block-gutenbee-column.[root] .wp-block-gutenbee-column-content { %s }"
      />
      {children}
    </StyleSheet>
  );
};

export default ColumnStyle;
