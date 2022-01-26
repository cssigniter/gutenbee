import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';

import getBlockId from '../../../util/getBlockId';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';

const AccordionStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    titleTextColor,
    titleBackgroundColor,
    borderColor,
    titleActiveBackgroundColor,
    titleHoverBackgroundColor,
    titleActiveTextColor,
    titleHoverTextColor,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-accordion.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-accordion.[root] { padding: %s; }"
        unit="px"
      />

      <Rule
        value={borderColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-title { border-color: %s; }"
      />
      <Rule
        value={titleTextColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-title { color: %s; }"
      />
      <Rule
        value={titleBackgroundColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-title { background-color: %s; }"
      />
      <Rule
        value={titleActiveTextColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-expanded .wp-block-gutenbee-accordion-item-title { color: %s; }"
      />
      <Rule
        value={titleActiveBackgroundColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-expanded .wp-block-gutenbee-accordion-item-title { background-color: %s; }"
      />
      <Rule
        value={titleHoverTextColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-title:hover { color: %s; }"
      />
      <Rule
        value={titleHoverBackgroundColor}
        rule=".wp-block-gutenbee-accordion.[root] .wp-block-gutenbee-accordion-item-title:hover { background-color: %s; }"
      />
      {children}
    </StyleSheet>
  );
};

const Accordion = ({ className, attributes }) => {
  const {
    uniqueId,
    tabs,
    borderColor,
    tabContentBackgroundColor,
    tabContentTextColor,
    collapseOthers,
    blockBreakpointVisibility,
    blockAuthVisibility,
    defaultOpenTabs = [],
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
      data-collapse-others={collapseOthers}
    >
      <AccordionStyle attributes={attributes} />

      {tabs.map((tab, index) => (
        <div
          className={classNames({
            'wp-block-gutenbee-accordion-item': true,
            'wp-block-gutenbee-accordion-item-expanded': defaultOpenTabs?.includes(
              index,
            ),
          })}
        >
          <div className="wp-block-gutenbee-accordion-item-title">
            {tab.title}
          </div>

          <div className="wp-block-gutenbee-accordion-item-content-wrap">
            <div
              className="wp-block-gutenbee-accordion-item-content"
              style={{
                borderColor: borderColor || undefined,
                backgroundColor: tabContentBackgroundColor || undefined,
                color: tabContentTextColor || undefined,
              }}
            >
              <RichText.Content
                tagName="p"
                value={tab.content}
                className="wp-block-gutenbee-accordion-item-text"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const v4 = {
  supports: {
    anchor: true,
  },
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
    collapseOthers: {
      type: 'boolean',
      default: true,
    },
    defaultOpenTabs: {
      type: 'array',
    },
    titleBackgroundColor: {
      type: 'string',
      default: '',
    },
    titleActiveBackgroundColor: {
      type: 'string',
      default: '',
    },
    titleHoverBackgroundColor: {
      type: 'string',
      default: '',
    },
    titleTextColor: {
      type: 'string',
      default: '',
    },
    titleActiveTextColor: {
      type: 'string',
      default: '',
    },
    titleHoverTextColor: {
      type: 'string',
      default: '',
    },
    tabContentTextColor: {
      type: 'string',
      default: '',
    },
    tabContentBackgroundColor: {
      type: 'string',
      default: '',
    },
    borderColor: {
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
  },
  migrate: attributes => {
    return {
      ...attributes,
    };
  },
  save: ({ className, attributes }) => (
    <Accordion className={className} attributes={attributes} />
  ),
};

export default v4;
