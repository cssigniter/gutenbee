import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  RichText,
  PlainText,
  InspectorControls,
  PanelColorSettings,
} from 'wp.editor';
import { PanelBody, RangeControl } from 'wp.components';
import classNames from 'classnames';

import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import MarginControls from '../../components/controls/margin-controls';

class TabsEdit extends Component {
  static propTypes = {
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
      blockMargin: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
      }),
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    setAttributes: PropTypes.func.isRequired,
  };

  state = {
    selectedTabIndex: 0,
  };

  componentWillReceiveProps(nextProps) {
    const { selectedTabIndex } = this.state;
    const { attributes } = nextProps;
    const { tabs } = attributes;

    if (selectedTabIndex > tabs.length - 1) {
      this.setState(() => ({
        selectedTabIndex: 0,
      }));
    }
  }

  onTabTitleUpdate = (index, title) => {
    const { attributes, setAttributes } = this.props;
    const { tabs } = attributes;

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

  onTabContentUpdate = content => {
    const { selectedTabIndex } = this.state;
    const { setAttributes, attributes } = this.props;
    const { tabs } = attributes;

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

  onUpdateTabsNumber = number => {
    const { attributes, setAttributes } = this.props;
    const { tabs } = attributes;

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

  isActiveTab = index => {
    const { selectedTabIndex } = this.state;

    return index === selectedTabIndex;
  };

  render() {
    const { selectedTabIndex } = this.state;
    const { attributes, isSelected, className, setAttributes } = this.props;
    const {
      tabs,
      blockMargin,
      activeTabBackgroundColor,
      activeTabTextColor,
      borderColor,
    } = attributes;

    const activeTab = tabs[selectedTabIndex];

    return (
      <Fragment>
        <div
          className={className}
          style={{
            margin: getMarginSettingStyles(blockMargin),
          }}
        >
          <div className={`${className}-nav`}>
            {tabs.map((tab, index) => (
              <div
                className={classNames({
                  [`${className}-nav-item`]: true,
                  [`${className}-nav-item-active`]: this.isActiveTab(index),
                })}
                onClick={() => {
                  this.setState(() => ({
                    selectedTabIndex: index,
                  }));
                }}
                style={{
                  fontSize: tabs.length > 4 ? '14px' : undefined,
                  color: this.isActiveTab(index)
                    ? activeTabTextColor
                    : undefined,
                  backgroundColor: this.isActiveTab(index)
                    ? activeTabBackgroundColor
                    : undefined,
                }}
              >
                <PlainText
                  value={tab.title}
                  onChange={value => this.onTabTitleUpdate(index, value)}
                  onFocus={() => {
                    this.setState(() => ({
                      selectedTabIndex: index,
                    }));
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
              }}
            >
              <div className={`${className}-tab-content`}>
                <RichText
                  tagName="p"
                  value={activeTab.content}
                  onChange={content => this.onTabContentUpdate(content)}
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
                onChange={this.onUpdateTabsNumber}
              />
            </PanelBody>

            <PanelColorSettings
              title={__('Color Settings')}
              initialOpen={false}
              colorSettings={[
                {
                  value: activeTabBackgroundColor,
                  onChange: value =>
                    setAttributes({
                      activeTabBackgroundColor: value,
                    }),
                  label: __('Active Tab Background Color'),
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
                  value: borderColor,
                  onChange: value =>
                    setAttributes({
                      borderColor: value,
                    }),
                  label: __('Border Color'),
                },
              ]}
            />

            <PanelBody title={__('Appearance')} initialOpen={false}>
              <MarginControls
                attributeKey="blockMargin"
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  }
}

export default TabsEdit;
