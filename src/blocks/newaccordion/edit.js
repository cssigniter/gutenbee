import { Component, Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  RichText,
  PlainText,
  InspectorControls,
  ColorPalette,
} from 'wp.editor';
import {
  PanelBody,
  RangeControl,
  ToggleControl,
} from 'wp.components';

import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import MarginControls from '../../components/controls/margin-controls';

class AccordionsEdit extends Component {
  static propTypes = {
    attributes: PropTypes.shape({
      accordions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
      })),
      collapseOthers: PropTypes.bool,
      titleBackgroundColor: PropTypes.string,
      titleTextColor: PropTypes.string,
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
      tabs: tabs.map(((tab, i) => {
        if (i === index) {
          return {
            ...tab,
            title,
          };
        }

        return tab;
      })),
    });
  };

  onTabContentUpdate = (index, content) => {
    const { setAttributes, attributes } = this.props;
    const { tabs } = attributes;

    setAttributes({
      tabs: tabs.map(((tab, i) => {
        if (i === index) {
          return {
            ...tab,
            content,
          };
        }

        return tab;
      })),
    });
  };

  onUpdateTabsNumber = (number) => {
    const {
      attributes,
      setAttributes,
    } = this.props;
    const {
      tabs,
    } = attributes;

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

  render() {
    const { selectedTabIndex } = this.state;
    const {
      attributes,
      isSelected,
      className,
      setAttributes,
    } = this.props;
    const {
      tabs,
      blockMargin,
      titleBackgroundColor,
      titleTextColor,
      borderColor,
      collapseOthers,
    } = attributes;

    return (
      <Fragment>
        <div
          className={className}
          style={{
            margin: getMarginSettingStyles(blockMargin),
          }}
        >
          {tabs.map((tab, index) => (
            <div className={`${className}-item`}>
              <div
                className={`${className}-item-title`}
                onClick={() => {
                  this.setState(() => ({
                    selectedTabIndex: index,
                  }));
                }}
                style={{
                  color: titleTextColor || undefined,
                  backgroundColor: titleBackgroundColor || undefined,
                  borderColor: borderColor || undefined,
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

              {index === selectedTabIndex && (
                <div className={`${className}-item-content-wrap`}>
                  <div
                    className={`${className}-item-content`}
                    style={{
                      borderColor: borderColor || undefined,
                    }}
                  >
                    <RichText
                      tagName="p"
                      value={tab.content}
                      onChange={content => this.onTabContentUpdate(index, content)}
                      className={`${className}-item-text`}
                      placeholder={__('Write content…')}
                      keepPlaceholderOnFocus
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {isSelected && (
          <InspectorControls>
            <PanelBody title={__('Accordion Settings')} initialOpen>
              <RangeControl
                label={__('Number of tabs')}
                value={tabs.length}
                min={1}
                max={15}
                step={1}
                onChange={this.onUpdateTabsNumber}
              />

              <ToggleControl
                label={__('Collapse others on click')}
                checked={collapseOthers}
                onChange={value => setAttributes({ collapseOthers: value })}
              />
            </PanelBody>

            <PanelBody title={__('Title Background Color')} initialOpen={false}>
              <ColorPalette
                value={titleBackgroundColor}
                onChange={value => setAttributes({
                  titleBackgroundColor: value,
                })}
              />
            </PanelBody>

            <PanelBody title={__('Title Text Color')} initialOpen={false}>
              <ColorPalette
                value={titleTextColor}
                onChange={value => setAttributes({
                  titleTextColor: value,
                })}
              />
            </PanelBody>

            <PanelBody title={__('Border Color')} initialOpen={false}>
              <ColorPalette
                value={borderColor}
                onChange={value => setAttributes({
                  borderColor: value,
                })}
              />
            </PanelBody>

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

export default AccordionsEdit;
