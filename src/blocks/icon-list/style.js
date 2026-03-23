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
    const hasItemSpacing =
      itemSpacing &&
      (itemSpacing.desktop != null ||
        itemSpacing.tablet != null ||
        itemSpacing.mobile != null);
    const hasAlign =
      align &&
      (align.desktop != null || align.tablet != null || align.mobile != null);

    return layout === 'inline' ? (
      <Fragment>
        {hasItemSpacing && (
          <>
            <Rule
              value={itemSpacing}
              rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { padding-right: calc( %s/2 ); }"
              unit="px"
            />
            <Rule
              value={itemSpacing}
              rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { margin-right: calc( %s/2 ); }"
              unit="px"
            />
          </>
        )}
        {separatorWidth != null && separatorWidth !== undefined && (
          <Rule
            value={separatorWidth}
            rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { border-right: solid %s; }"
            unit="px"
          />
        )}
        {hasAlign && (
          <Rule
            value={align}
            rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element { justify-content: %s; }"
            unit=""
          />
        )}
      </Fragment>
    ) : (
      <Fragment>
        {hasItemSpacing && (
          <>
            <Rule
              value={itemSpacing}
              rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { padding-bottom: calc( %s/2 ); }"
              unit="px"
            />
            <Rule
              value={itemSpacing}
              rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { margin-bottom: calc( %s/2 ); }"
              unit="px"
            />
          </>
        )}
        {hasAlign && (
          <>
            <Rule
              value={align}
              rule=".wp-block-gutenbee-icon-list.[root] li.wp-block-gutenbee-icon-list-item { justify-content: %s; }"
              unit=""
            />
            <Rule
              value={align}
              rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-list-block-link a { justify-content: %s; }"
              unit=""
            />
          </>
        )}
        {separatorWidth != null && separatorWidth !== undefined && (
          <Rule
            value={separatorWidth}
            rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { border-bottom: solid %s; }"
            unit="px"
          />
        )}
      </Fragment>
    );
  };

  const hasBlockMargin =
    blockMargin &&
    (blockMargin.desktop != null ||
      blockMargin.tablet != null ||
      blockMargin.mobile != null);
  const hasBlockPadding =
    blockPadding &&
    (blockPadding.desktop != null ||
      blockPadding.tablet != null ||
      blockPadding.mobile != null);
  const hasFontSize =
    fontSize &&
    (fontSize.desktop != null ||
      fontSize.tablet != null ||
      fontSize.mobile != null);
  const hasIconSize =
    iconSize &&
    (iconSize.desktop != null ||
      iconSize.tablet != null ||
      iconSize.mobile != null);

  return (
    <StyleSheet id={blockId}>
      {hasBlockMargin && (
        <Rule
          value={blockMargin}
          rule=".wp-block-gutenbee-icon-list.[root] { margin: %s; }"
          unit="px"
        />
      )}
      {hasBlockPadding && (
        <Rule
          value={blockPadding}
          rule=".wp-block-gutenbee-icon-list.[root] { padding: %s; }"
          unit="px"
        />
      )}
      {hasFontSize && (
        <Rule
          value={fontSize}
          rule=".wp-block-gutenbee-icon-list.[root] { font-size: %s; }"
          unit="px"
        />
      )}
      {renderLayoutSpecificRules()}
      {hasIconSize && (
        <Rule
          value={iconSize}
          rule=".wp-block-gutenbee-icon-list.[root] .gutenbee-icon-block-icon-wrap svg { width: %1$s; height: %1$s; }"
          unit="px"
        />
      )}
      {separatorColor && separatorColor !== undefined && (
        <Rule
          value={separatorColor}
          rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { border-color: %s; }"
          unit=""
        />
      )}
      {color && color !== undefined && (
        <Rule value={color} rule="{ color: %s; }" unit="" />
      )}
      {iconColor && iconColor !== undefined && (
        <Rule
          value={iconColor}
          rule=".wp-block-gutenbee-icon-list.[root] .gutenbee-icon-block-icon-wrap { color: %s; }"
          unit=""
        />
      )}
      {children}
    </StyleSheet>
  );
};

IconListStyle.propTypes = propTypes;

export default IconListStyle;
