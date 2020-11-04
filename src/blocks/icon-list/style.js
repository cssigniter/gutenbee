import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';

import StyleSheet from '../../components/stylesheet';
import Rule from '../../components/stylesheet/Rule';
import getBlockId from '../../util/getBlockId';

const propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const IconListStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    fontSize,
    iconSize,
    itemSpacing,
    layout,
    align,
    separatorWidth,
    separatorColor,
    color,
    iconColor,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  const renderLayoutSpecificRules = () => {
    return layout === 'inline' ? (
      <Fragment>
        <Rule
          value={itemSpacing}
          rule=".wp-block-gutenbee-icon-list li.wp-block-gutenbee-icon-list-item:not(:last-child) { padding-right: calc( %s/2 ); }"
          unit="px"
        />
        <Rule
          value={itemSpacing}
          rule=".wp-block-gutenbee-icon-list li.wp-block-gutenbee-icon-list-item:not(:last-child) { margin-right: calc( %s/2 ); }"
          unit="px"
        />
        <Rule
          value={separatorWidth}
          rule=".wp-block-gutenbee-icon-list li.wp-block-gutenbee-icon-list-item:not(:last-child) { border-right: solid %s; }"
          unit="px"
        />
        <Rule
          value={align}
          rule=".wp-block-gutenbee-icon-list { justify-content: %s; }"
          unit=""
        />
      </Fragment>
    ) : (
      <Fragment>
        <Rule
          value={itemSpacing}
          rule=".wp-block-gutenbee-icon-list li.wp-block-gutenbee-icon-list-item:not(:last-child) { padding-bottom: calc( %s/2 ); }"
          unit="px"
        />
        <Rule
          value={itemSpacing}
          rule=".wp-block-gutenbee-icon-list li.wp-block-gutenbee-icon-list-item:not(:last-child) { margin-bottom: calc( %s/2 ); }"
          unit="px"
        />
        <Rule
          value={align}
          rule="li.wp-block-gutenbee-icon-list-item { justify-content: %s; }"
          unit=""
        />
        <Rule
          value={separatorWidth}
          rule=".wp-block-gutenbee-icon-list li.wp-block-gutenbee-icon-list-item:not(:last-child) { border-bottom: solid %s; }"
          unit="px"
        />
      </Fragment>
    );
  };

  return (
    <StyleSheet id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule value={fontSize} rule="{ font-size: %s; }" unit="px" />
      {renderLayoutSpecificRules()}
      <Rule
        value={iconSize}
        rule=".gutenbee-icon-block-icon-wrap svg { width: %1$s; height: %1$s; }"
        unit="px"
      />
      <Rule
        value={separatorColor}
        rule=".wp-block-gutenbee-icon-list li.wp-block-gutenbee-icon-list-item:not(:last-child) { border-color: %s; }"
        unit=""
      />
      <Rule value={color} rule="{ color: %s; }" unit="" />
      <Rule
        value={iconColor}
        rule=".gutenbee-icon-block-icon-wrap { color: %s; }"
        unit=""
      />
      {children}
    </StyleSheet>
  );
};

IconListStyle.propTypes = propTypes;

export default IconListStyle;
