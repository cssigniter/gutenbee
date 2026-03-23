import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import getBlockId from '../../../util/getBlockId';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../components/controls/animation-controls/helpers';

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

const Tabs = ({ attributes, className }) => {
  const {
    uniqueId,
    tabs,
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
      {...getAnimationControlDataAttributes(attributes.animation)}
    >
      <div className="wp-block-gutenbee-tabs-nav">
        {tabs.map((tab, index) => (
          <div
            className={classNames({
              'wp-block-gutenbee-tabs-nav-item': true,
              'wp-block-gutenbee-tabs-nav-item-active': index === 0,
            })}
          >
            {tab.title}
          </div>
        ))}
      </div>

      <div className="wp-block-gutenbee-tabs-tab-content-wrap">
        {tabs.map((tab, index) => (
          <div
            className="wp-block-gutenbee-tabs-tab-content"
            style={{
              display: index === 0 ? 'block' : 'none',
            }}
          >
            <RichText.Content tagName="p" value={tab.content} />
          </div>
        ))}
      </div>
      <TabsStyle attributes={attributes} />
    </div>
  );
};

const v3 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    tabs: {
      type: 'array',
      default: [
        {
          title: '',
          content: '',
        },
      ],
    },
    tabBackgroundColor: {
      type: 'string',
      default: '',
    },
    tabTextColor: {
      type: 'string',
      default: '',
    },
    activeTabBackgroundColor: {
      type: 'string',
      default: '',
    },
    activeTabTextColor: {
      type: 'string',
      default: '',
    },
    hoverTabBackgroundColor: {
      type: 'string',
      default: '',
    },
    hoverTabTextColor: {
      type: 'string',
      default: '',
    },
    borderColor: {
      type: 'string',
      default: '',
    },
    tabContentBackgroundColor: {
      type: 'string',
      default: '',
    },
    tabContentTextColor: {
      type: 'string',
      default: '',
    },
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
  save: ({ className, attributes }) => (
    <Tabs className={className} attributes={attributes} />
  ),
};

export default v3;
