import { Fragment, useState } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  RichText,
  PlainText,
  InspectorControls,
  PanelColorSettings,
} from 'wp.blockEditor';
import { PanelBody, RangeControl, ToggleControl } from 'wp.components';

import MarginControls from '../../components/controls/margin-controls';
import useUniqueId from '../../hooks/useUniqueId';
import AccordionStyle from './style';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import getBlockId from '../../util/getBlockId';

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
  const [openTabs, setOpenTabs] = useState([0]);
  const {
    uniqueId,
    tabs,
    titleBackgroundColor,
    titleTextColor,
    tabContentTextColor,
    tabContentBackgroundColor,
    borderColor,
    collapseOthers,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const isTabExpanded = index => {
    return openTabs.includes(index);
  };

  const onTabToggle = (index, focus) => {
    const isExpanded = isTabExpanded(index);

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
      <div id={blockId} className={className}>
        {tabs.map((tab, index) => (
          <div className={`${className}-item`}>
            <div
              className={`${className}-item-title`}
              onClick={() => onTabToggle(index)}
              style={{
                color: titleTextColor || undefined,
                backgroundColor: titleBackgroundColor || undefined,
                borderColor: borderColor || undefined,
              }}
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
                style={{
                  color: titleTextColor || undefined,
                }}
              />
            </div>

            {isTabExpanded(index) && (
              <div className={`${className}-item-content-wrap`}>
                <div
                  className={`${className}-item-content`}
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
              onChange={onUpdateTabsNumber}
            />

            <ToggleControl
              label={__('Collapse others on click')}
              checked={collapseOthers}
              onChange={value => setAttributes({ collapseOthers: value })}
            />
          </PanelBody>

          <PanelColorSettings
            title={__('Block Appearance')}
            initialOpen={false}
            colorSettings={[
              {
                value: titleTextColor,
                onChange: value =>
                  setAttributes({
                    titleTextColor: value,
                  }),
                label: __('Title Text Color'),
              },
              {
                value: titleBackgroundColor,
                onChange: value =>
                  setAttributes({
                    titleBackgroundColor: value,
                  }),
                label: __('Title Background Color'),
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
                label: __('Border Color'),
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

AccordionsEdit.propTypes = propTypes;

export default AccordionsEdit;
