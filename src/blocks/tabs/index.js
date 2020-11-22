/**
 * Tabs block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';

import TabsBlockIcon from './block-icon';
import TabsEdit from './edit';
import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import TabsStyle from './style';
import deprecated from './deprecated';

const Tabs = ({ attributes, className }) => {
  const { uniqueId, tabs } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div id={blockId} className={classNames(className, blockId)}>
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

registerBlockType('gutenbee/tabs', {
  title: __('GutenBee Tabs'),
  description: __('Display fancy tabs'),
  icon: TabsBlockIcon,
  category: 'gutenbee',
  keywords: [__('tabs')],
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
  deprecated,
  edit: TabsEdit,
  save: ({ className, attributes }) => (
    <Tabs className={className} attributes={attributes} />
  ),
});
