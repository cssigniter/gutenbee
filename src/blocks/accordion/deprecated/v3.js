import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

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
  const { uniqueId, blockPadding, blockMargin } = attributes;
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
      {children}
    </StyleSheet>
  );
};

const Accordion = ({ className, attributes }) => {
  const {
    uniqueId,
    tabs,
    titleBackgroundColor,
    titleTextColor,
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
          <div
            className="wp-block-gutenbee-accordion-item-title"
            style={{
              color: titleTextColor || undefined,
              backgroundColor: titleBackgroundColor || undefined,
              borderColor: borderColor || undefined,
            }}
          >
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

const v3 = {
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
    titleTextColor: {
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
  save: ({ className, attributes }) => (
    <Accordion className={className} attributes={attributes} />
  ),
};

export default v3;
