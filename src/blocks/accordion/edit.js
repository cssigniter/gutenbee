import { Fragment, useState } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { RichText, PlainText, InspectorControls } from 'wp.blockEditor';
import { PanelBody, RangeControl, ToggleControl } from 'wp.components';
import classNames from 'classnames';

import MarginControls from '../../components/controls/margin-controls';
import useUniqueId from '../../hooks/useUniqueId';
import AccordionStyle from './style';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import getBlockId from '../../util/getBlockId';
import PopoverColorControl from '../../components/controls/advanced-color-control/PopoverColorControl';
import BreakpointVisibilityControl from '../../components/controls/breakpoint-visibility-control';
import AuthVisibilityControl from '../../components/controls/auth-visibility-control';
import StateTabs from '../../components/controls/state-tabs';

const propTypes = {
  attributes: PropTypes.shape({
    uniqueId: PropTypes.string,
    accordions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
      }),
    ),
    collapseOthers: PropTypes.bool,
    titleBackgroundColor: PropTypes.string,
    titleTextColor: PropTypes.string,
    tabContentBackgroundColor: PropTypes.string,
    tabContentTextColor: PropTypes.string,
    borderColor: PropTypes.string,
    blockPadding: PropTypes.object,
    blockMargin: PropTypes.object,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  setAttributes: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
};

const AccordionsEdit = ({
  attributes,
  isSelected,
  className,
  setAttributes,
  clientId,
}) => {
  const {
    uniqueId,
    tabs,
    tabContentTextColor,
    tabContentBackgroundColor,
    borderColor,
    collapseOthers,
    blockBreakpointVisibility,
    blockAuthVisibility,
    defaultOpenTabs = [],
  } = attributes;
  const [activeTab, setActiveTab] = useState(0);
  const initialOpenTabs =
    defaultOpenTabs?.length > 0 ? defaultOpenTabs : [activeTab];
  const [openTabs, setOpenTabs] = useState(initialOpenTabs);

  useUniqueId({ attributes, setAttributes, clientId });

  const isTabExpanded = index => {
    return openTabs.includes(index);
  };

  const onTabToggle = (index, focus) => {
    const isExpanded = isTabExpanded(index);
    setActiveTab(index);

    if (collapseOthers) {
      setOpenTabs([index]);
      return;
    }

    setOpenTabs(prev =>
      isExpanded && !focus ? prev.filter(i => i !== index) : [...prev, index],
    );
  };

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

  const onTabContentUpdate = (index, content) => {
    setAttributes({
      tabs: tabs.map((tab, i) => {
        if (i === index) {
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

  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <AccordionStyle attributes={attributes} />
      <div id={blockId} className={classNames(className, blockId)}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={classNames({
              'wp-block-gutenbee-accordion-item': true,
              'wp-block-gutenbee-accordion-item-expanded': isTabExpanded(index),
            })}
          >
            <div
              className="wp-block-gutenbee-accordion-item-title"
              onClick={() => onTabToggle(index)}
            >
              <PlainText
                value={tab.title}
                onChange={value => onTabTitleUpdate(index, value)}
                onFocus={event => {
                  if (isSelected) {
                    event.stopPropagation();
                    onTabToggle(index, 'focus');
                  }
                }}
                onClick={event => {
                  event.stopPropagation();
                }}
                placeholder={__('Write title…')}
              />
              <span className="wp-block-gutenbee-accordion-item-title-icon" />
            </div>

            {isTabExpanded(index) && (
              <div className="wp-block-gutenbee-accordion-item-content-wrap">
                <div
                  className="wp-block-gutenbee-accordion-item-content"
                  style={{
                    borderColor: borderColor || undefined,
                    backgroundColor: tabContentBackgroundColor || undefined,
                    color: tabContentTextColor || undefined,
                  }}
                >
                  <RichText
                    tagName="p"
                    value={tab.content}
                    onChange={content => onTabContentUpdate(index, content)}
                    className="wp-block-gutenbee-accordion-item-text"
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
              onChange={onUpdateTabsNumber}
            />

            <ToggleControl
              label={__('Collapse others on click')}
              checked={collapseOthers}
              onChange={value => setAttributes({ collapseOthers: value })}
            />

            <ToggleControl
              label={__('Start current tab open')}
              checked={defaultOpenTabs.includes(activeTab)}
              onChange={() => {
                if (defaultOpenTabs.includes(activeTab)) {
                  // Uncheck
                  setAttributes({
                    defaultOpenTabs: defaultOpenTabs.filter(
                      i => i !== activeTab,
                    ),
                  });
                } else {
                  // Check
                  setAttributes({
                    defaultOpenTabs: [...defaultOpenTabs, activeTab],
                  });
                }
              }}
            />
          </PanelBody>

          <PanelBody title={__('Block Appearance')} initialOpen={false}>
            <StateTabs>
              {activeState => {
                return (
                  <Fragment>
                    <PopoverColorControl
                      label={__(`Title ${activeState} Text Color`)}
                      value={attributes[`title${activeState}TextColor`] || ''}
                      defaultValue={
                        attributes[`title${activeState}TextColor`] || ''
                      }
                      onChange={value =>
                        setAttributes({
                          [`title${activeState}TextColor`]: value,
                        })
                      }
                    />
                    <PopoverColorControl
                      label={__(`Title ${activeState} Background Color`)}
                      value={
                        attributes[`title${activeState}BackgroundColor`] || ''
                      }
                      defaultValue={
                        attributes[`title${activeState}BackgroundColor`] || ''
                      }
                      onChange={value =>
                        setAttributes({
                          [`title${activeState}BackgroundColor`]: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }}
            </StateTabs>

            <PopoverColorControl
              label={__('Content Text Color')}
              value={tabContentTextColor || ''}
              defaultValue={tabContentTextColor || ''}
              onChange={value => setAttributes({ tabContentTextColor: value })}
            />
            <PopoverColorControl
              label={__('Content Background Color')}
              value={tabContentBackgroundColor || ''}
              defaultValue={tabContentBackgroundColor || ''}
              onChange={value =>
                setAttributes({ tabContentBackgroundColor: value })
              }
            />
            <PopoverColorControl
              label={__('Border Color')}
              value={borderColor || ''}
              defaultValue={borderColor || ''}
              onChange={value => setAttributes({ borderColor: value })}
            />

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
          </PanelBody>

          <PanelBody title={__('Visibility Settings')} initialOpen={false}>
            <BreakpointVisibilityControl
              values={blockBreakpointVisibility}
              onChange={values => {
                setAttributes({
                  blockBreakpointVisibility: values,
                });
              }}
            />

            <AuthVisibilityControl
              values={blockAuthVisibility}
              onChange={values => {
                setAttributes({
                  blockAuthVisibility: values,
                });
              }}
            />
          </PanelBody>
        </InspectorControls>
      )}
    </Fragment>
  );
};

AccordionsEdit.propTypes = propTypes;

export default AccordionsEdit;
