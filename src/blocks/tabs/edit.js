import { Fragment, useState, useEffect } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  RichText,
  PlainText,
  InspectorControls,
  PanelColorSettings,
} from 'wp.blockEditor';
import { PanelBody, RangeControl } from 'wp.components';
import classNames from 'classnames';

import MarginControls from '../../components/controls/margin-controls';
import getBlockId from '../../util/getBlockId';
import TabsStyle from './style';
import useUniqueId from '../../hooks/useUniqueId';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';

const propTypes = {
  attributes: PropTypes.shape({
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
      }),
    ),
    activeTabBackgroundColor: PropTypes.string,
    activeTabTextColor: PropTypes.string,
    borderColor: PropTypes.string,
    tabBackgroundColor: PropTypes.string,
    tabTextColor: PropTypes.string,
    tabContentBackgroundColor: PropTypes.string,
    tabContentTextColor: PropTypes.string,
    blockPadding: PropTypes.object,
    blockMargin: PropTypes.object,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  setAttributes: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
};

const TabsEdit = ({
  attributes,
  isSelected,
  className,
  setAttributes,
  clientId,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const {
    uniqueId,
    tabs,
    activeTabBackgroundColor,
    activeTabTextColor,
    tabBackgroundColor,
    tabTextColor,
    tabContentBackgroundColor,
    tabContentTextColor,
    borderColor,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  useEffect(
    () => {
      if (selectedTabIndex > tabs.length - 1) {
        setSelectedTabIndex(0);
      }
    },
    [tabs.length],
  );

  const onTabTitleUpdate = (index, title) => {
    setAttributes({
      tabs: tabs.map((tab, i) => {
        if (i === index) {
          return {
            ...tab,
            title,
          };
        }

        return tab;
      }),
    });
  };

  const onTabContentUpdate = content => {
    setAttributes({
      tabs: tabs.map((tab, i) => {
        if (i === selectedTabIndex) {
          return {
            ...tab,
            content,
          };
        }

        return tab;
      }),
    });
  };

  const onUpdateTabsNumber = number => {
    // We don't allow less than 1 tab
    if (number === 0) {
      return;
    }

    const tabItem = {
      title: '',
      content: '',
    };

    if (number > tabs.length) {
      setAttributes({
        tabs: [...tabs, tabItem],
      });
    }

    if (number < tabs.length) {
      setAttributes({
        tabs: tabs.slice(0, number),
      });
    }
  };

  const isActiveTab = index => {
    return index === selectedTabIndex;
  };

  const activeTab = tabs[selectedTabIndex];
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div id={blockId} className={className}>
        <TabsStyle attributes={attributes} />

        <div className={`${className}-nav`}>
          {tabs.map((tab, index) => (
            <div
              className={classNames({
                [`${className}-nav-item`]: true,
                [`${className}-nav-item-active`]: isActiveTab(index),
              })}
              onClick={() => {
                setSelectedTabIndex(index);
              }}
              style={{
                fontSize: tabs.length > 4 ? '14px' : undefined,
                color: isActiveTab(index)
                  ? activeTabTextColor
                  : tabTextColor || undefined,
                backgroundColor: isActiveTab(index)
                  ? activeTabBackgroundColor
                  : tabBackgroundColor || undefined,
              }}
            >
              <PlainText
                value={tab.title}
                onChange={value => onTabTitleUpdate(index, value)}
                onFocus={() => {
                  setSelectedTabIndex(index);
                }}
                placeholder={__('Write title…')}
              />
            </div>
          ))}
        </div>

        {activeTab && (
          <div
            className={`${className}-tab-content-wrap`}
            style={{
              borderColor: borderColor || undefined,
              color: tabContentTextColor || undefined,
              backgroundColor: tabContentBackgroundColor || undefined,
            }}
          >
            <div className={`${className}-tab-content`}>
              <RichText
                tagName="p"
                value={activeTab.content}
                onChange={content => onTabContentUpdate(content)}
                className={`${className}-text`}
                placeholder={__('Write content…')}
                keepPlaceholderOnFocus
              />
            </div>
          </div>
        )}
      </div>

      {isSelected && (
        <InspectorControls>
          <PanelBody title={__('Tab Settings')} initialOpen>
            <RangeControl
              label={__('Number of tabs')}
              value={tabs.length}
              min={1}
              max={10}
              step={1}
              onChange={onUpdateTabsNumber}
            />
          </PanelBody>

          <PanelColorSettings
            title={__('Block Appearance')}
            initialOpen={false}
            colorSettings={[
              {
                value: tabTextColor,
                onChange: value =>
                  setAttributes({
                    tabTextColor: value,
                  }),
                label: __('Tab Text Color'),
              },
              {
                value: tabBackgroundColor,
                onChange: value =>
                  setAttributes({
                    tabBackgroundColor: value,
                  }),
                label: __('Tab Background Color'),
              },
              {
                value: activeTabTextColor,
                onChange: value =>
                  setAttributes({
                    activeTabTextColor: value,
                  }),
                label: __('Active Tab Text Color'),
              },
              {
                value: activeTabBackgroundColor,
                onChange: value =>
                  setAttributes({
                    activeTabBackgroundColor: value,
                  }),
                label: __('Active Tab Background Color'),
              },
              {
                value: tabContentTextColor,
                onChange: value =>
                  setAttributes({
                    tabContentTextColor: value,
                  }),
                label: __('Content Text Color'),
              },
              {
                value: tabContentBackgroundColor,
                onChange: value =>
                  setAttributes({
                    tabContentBackgroundColor: value,
                  }),
                label: __('Content Background Color'),
              },
              {
                value: borderColor,
                onChange: value =>
                  setAttributes({
                    borderColor: value,
                  }),
                label: __('Content Border Color'),
              },
            ]}
          >
            <ResponsiveControl>
              {breakpoint => (
                <MarginControls
                  label={__('Padding (px)')}
                  attributeKey="blockPadding"
                  attributes={attributes}
                  setAttributes={setAttributes}
                  breakpoint={breakpoint}
                />
              )}
            </ResponsiveControl>

            <ResponsiveControl>
              {breakpoint => (
                <MarginControls
                  label={__('Margin (px)')}
                  attributeKey="blockMargin"
                  attributes={attributes}
                  setAttributes={setAttributes}
                  breakpoint={breakpoint}
                />
              )}
            </ResponsiveControl>
          </PanelColorSettings>
        </InspectorControls>
      )}
    </Fragment>
  );
};

TabsEdit.propTypes = propTypes;

export default TabsEdit;
