/**
 * Deprecated v4 - Handles blocks saved with the old ensureValueUnit bug.
 */
import { Fragment } from 'wp.element';
import { InnerBlocks, useBlockProps } from 'wp.blockEditor';
import classNames from 'classnames';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import OldStyleSheet from '../../../components/stylesheet/OldStyleSheet';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../components/controls/animation-controls/helpers';

const OldIconListStyle = ({ attributes, children }) => {
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
    <OldStyleSheet id={blockId}>
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
    </OldStyleSheet>
  );
};

const v4 = {
  supports: {
    anchor: false,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    layout: {
      type: 'string',
      default: 'default',
    },
    itemSpacing: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    fontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '18',
        tablet: '',
        mobile: '',
      }),
    },
    iconSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '24',
        tablet: '',
        mobile: '',
      }),
    },
    align: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: 'left',
        tablet: 'left',
        mobile: 'left',
      }),
    },
    blockLink: {
      type: 'string',
      default: 'inline',
    },
    separatorWidth: {
      type: 'integer',
      default: 0,
    },
    separatorColor: {
      type: 'string',
    },
    iconColor: {
      type: 'string',
    },
    color: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockBreakpointVisibility: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: false,
        tablet: false,
        mobile: false,
      }),
    },
    blockAuthVisibility: {
      type: 'object',
      default: {
        loggedIn: false,
        loggedOut: false,
      },
    },
    ...animationControlAttributes(),
  },
  save: ({ className, attributes }) => {
    const {
      uniqueId,
      blockLink,
      layout,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;
    const blockId = getBlockId(uniqueId);
    const blockProps = useBlockProps.save({
      id: blockId,
      className: classNames(
        className,
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
      ),
      style: {
        backgroundColor: backgroundColor ? backgroundColor : undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      },
    });

    return (
      <div
        {...blockProps}
        {...getAnimationControlDataAttributes(attributes.animation)}
      >
        <ul
          className={classNames({
            'wp-block-gutenbee-icon-list-element': true,
            'wp-block-gutenbee-list-inline': layout === 'inline',
            'wp-block-gutenbee-list-block-link': blockLink === 'block',
          })}
        >
          <InnerBlocks.Content />
        </ul>
        <OldIconListStyle attributes={attributes} />
      </div>
    );
  },
};

export default v4;
