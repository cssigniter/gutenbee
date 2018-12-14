/**
 * Tabs block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { RichText } from 'wp.editor';

import TabsBlockIcon from './block-icon';
import TabsEdit from './edit';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';

const Tabs = ({ attributes, className }) => {
  const {
    tabs,
    blockMargin,
    activeTabBackgroundColor,
    activeTabTextColor,
    borderColor,
  } = attributes;

  return (
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
              [`${className}-nav-item-active`]: index === 0,
            })}
          >
            {tab.title}
          </div>
        ))}
      </div>

      <div
        className={`${className}-tab-content-wrap`}
        style={{
          borderColor: borderColor || undefined,
        }}
      >
        {tabs.map((tab, index) => (
          <div
            className={`${className}-tab-content`}
            style={{
              display: index === 0 ? 'block' : 'none',
            }}
          >
            <RichText.Content tagName="p" value={tab.content} />
          </div>
        ))}
      </div>

      <style>
        {`.${className}-nav-item-active {
            background-color: ${activeTabBackgroundColor};
            color: ${activeTabTextColor};
          }`}
      </style>
    </div>
  );
};

registerBlockType('gutenbee/tabs', {
  title: __('GutenBee Tabs'),
  description: __('Display fancy tabs'),
  icon: TabsBlockIcon,
  category: 'gutenbee',
  keywords: [__('tabs')],
  attributes: {
    tabs: {
      type: 'array',
      default: [
        {
          title: '',
          content: '',
        },
      ],
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
    blockMargin: {
      type: 'object',
      default: {},
    },
  },
  edit: TabsEdit,
  save: ({ className, attributes }) => (
    <Tabs className={className} attributes={attributes} />
  ),
});
