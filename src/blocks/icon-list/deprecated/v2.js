import { Fragment } from 'wp.element';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import StyleSheet from '../../../components/stylesheet';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';

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
          rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { padding-right: calc( %s/2 ); }"
          unit="px"
        />
        <Rule
          value={itemSpacing}
          rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { margin-right: calc( %s/2 ); }"
          unit="px"
        />
        <Rule
          value={separatorWidth}
          rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { border-right: solid %s; }"
          unit="px"
        />
        <Rule
          value={align}
          rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element { justify-content: %s; }"
          unit=""
        />
      </Fragment>
    ) : (
      <Fragment>
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
        <Rule
          value={separatorWidth}
          rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { border-bottom: solid %s; }"
          unit="px"
        />
      </Fragment>
    );
  };

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-icon-list.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-icon-list.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={fontSize}
        rule=".wp-block-gutenbee-icon-list.[root] { font-size: %s; }"
        unit="px"
      />
      {renderLayoutSpecificRules()}
      <Rule
        value={iconSize}
        rule=".wp-block-gutenbee-icon-list.[root] .gutenbee-icon-block-icon-wrap svg { width: %1$s; height: %1$s; }"
        unit="px"
      />
      <Rule
        value={separatorColor}
        rule=".wp-block-gutenbee-icon-list.[root] .wp-block-gutenbee-icon-list-element li.wp-block-gutenbee-icon-list-item:not(:last-child) { border-color: %s; }"
        unit=""
      />
      <Rule value={color} rule="{ color: %s; }" unit="" />
      <Rule
        value={iconColor}
        rule=".wp-block-gutenbee-icon-list.[root] .gutenbee-icon-block-icon-wrap { color: %s; }"
        unit=""
      />
      {children}
    </StyleSheet>
  );
};

const v2 = {
  supports: {
    anchor: true,
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
  },
  migrate(attributes) {
    return attributes;
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

    return (
      <div
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
        )}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
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
        <IconListStyle attributes={attributes} />
      </div>
    );
  },
};

export default v2;
