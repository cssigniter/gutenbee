import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const TabsStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    hoverTabBackgroundColor,
    hoverTabTextColor,
    activeTabBackgroundColor,
    activeTabTextColor,
    tabBackgroundColor,
    tabTextColor,
    tabContentBackgroundColor,
    tabContentTextColor,
    borderColor,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-tabs.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-tabs.[root] { padding: %s; }"
        unit="px"
      />

      <Rule
        value={borderColor}
        rule=".wp-block-gutenbee-tabs.[root] .wp-block-gutenbee-tabs-tab-content-wrap { border-color: %s; }"
      />
      <Rule
        value={tabTextColor}
        rule=".wp-block-gutenbee-tabs.[root] .wp-block-gutenbee-tabs-nav-item { color: %s; }"
      />
      <Rule
        value={tabBackgroundColor}
        rule=".wp-block-gutenbee-tabs.[root] .wp-block-gutenbee-tabs-nav-item { background-color: %s; }"
      />
      <Rule
        value={hoverTabTextColor}
        rule=".wp-block-gutenbee-tabs.[root] .wp-block-gutenbee-tabs-nav-item:hover { color: %s; }"
      />
      <Rule
        value={hoverTabBackgroundColor}
        rule=".wp-block-gutenbee-tabs.[root] .wp-block-gutenbee-tabs-nav-item:hover { background-color: %s; }"
      />
      <Rule
        value={activeTabTextColor}
        rule=".wp-block-gutenbee-tabs.[root] .wp-block-gutenbee-tabs-nav-item-active { color: %s; }"
      />
      <Rule
        value={activeTabBackgroundColor}
        rule=".wp-block-gutenbee-tabs.[root] .wp-block-gutenbee-tabs-nav-item-active { background-color: %s; }"
      />
      <Rule
        value={tabContentTextColor}
        rule=".wp-block-gutenbee-tabs.[root] .wp-block-gutenbee-tabs-tab-content-wrap { color: %s; }"
      />
      <Rule
        value={tabContentBackgroundColor}
        rule=".wp-block-gutenbee-tabs.[root] .wp-block-gutenbee-tabs-tab-content-wrap { background-color: %s; }"
      />
      {children}
    </StyleSheet>
  );
};

TabsStyle.propTypes = propTypes;

export default TabsStyle;
