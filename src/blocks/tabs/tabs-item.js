/**
 * Tab element block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import {
  RichText,
} from 'wp.editor';
import classNames from 'classnames';

import TabsBlockIcon from './block-icon';
import TabItemEdit from './TabItemEdit';

const TabsItem = ({ attributes, className }) => {
  const {
    title,
    text,
  } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      <p className={`${className}-title`}>
        {title}
      </p>
      <div className={`${className}-content-wrap`}>
        <div className={`${className}-content`}>
          <RichText.Content
            tagName="p"
            value={text}
            className={`${className}-text`}
          />
        </div>
      </div>
    </div>
  );
};

registerBlockType('gutenbee/tabs-item', {
  title: __('GutenBee Tab Element'),
  description: __('A single tab element within a GutenBee Tab block.'),
  icon: TabsBlockIcon,
  category: 'gutenbee',
  keywords: [
    __('tab'),
  ],
  parent: ['gutenbee/tabs'],
  attributes: {
    title: {
      source: 'text',
      selector: '.wp-block-gutenbee-tabs-item-title',
    },
    text: {
      type: 'array',
      source: 'children',
      selector: '.wp-block-gutenbee-tabs-item-content p',
      default: [],
    },
    defaultExpanded: {
      type: 'boolean',
      default: false,
    },
  },
  edit: TabItemEdit,
  save({ attributes, className }) {
    return (
      <TabsItem
        attributes={attributes}
        className={className}
      />
    );
  },
});
