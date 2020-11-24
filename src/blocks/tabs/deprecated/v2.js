import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';

import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import getBlockId from '../../../util/getBlockId';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const TabsStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
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
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />

      <Rule
        value={borderColor}
        rule=".wp-block-gutenbee-tabs-tab-content-wrap { border-color: %s; }"
      />
      <Rule
        value={tabTextColor}
        rule=".wp-block-gutenbee-tabs-nav-item { color: %s; }"
      />
      <Rule
        value={tabBackgroundColor}
        rule=".wp-block-gutenbee-tabs-nav-item { background-color: %s; }"
      />
      <Rule
        value={activeTabTextColor}
        rule=".wp-block-gutenbee-tabs-nav-item-active { color: %s; }"
      />
      <Rule
        value={activeTabBackgroundColor}
        rule=".wp-block-gutenbee-tabs-nav-item-active { background-color: %s; }"
      />
      <Rule
        value={tabContentTextColor}
        rule=".wp-block-gutenbee-tabs-tab-content-wrap { color: %s; }"
      />
      <Rule
        value={tabContentBackgroundColor}
        rule=".wp-block-gutenbee-tabs-tab-content-wrap { background-color: %s; }"
      />
      {children}
    </StyleSheetV1>
  );
};

const Tabs = ({ attributes, className }) => {
  const { uniqueId, tabs } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div id={blockId} className={className}>
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

const v2 = {
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
  },
  migrate: attributes => {
    return {
      ...attributes,
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
    };
  },
  save: ({ className, attributes }) => (
    <Tabs className={className} attributes={attributes} />
  ),
};

export default v2;
