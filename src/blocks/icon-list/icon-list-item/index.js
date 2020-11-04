import { Fragment } from 'wp.element';
import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import Icon from './Icon';
import IconListItemEdit from './edit';
import IconListItemBlockIcon from './block-icon';

registerBlockType('gutenbee/icon-list-item', {
  title: __('GutenBee Icon List Item'),
  description: __('List item for the icon list.'),
  icon: IconListItemBlockIcon,
  category: 'gutenbee',
  keywords: [__('icon'), __('list')],
  parent: ['gutenbee/icon-list'],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    content: {
      type: 'string',
      source: 'html',
      selector: '.wp-block-gutenbee-icon-list-item-text',
      default: '',
    },
    placeholder: {
      type: 'string',
    },
    icon: {
      type: 'string',
      default: 'add-bag',
    },
    color: {
      type: 'string',
    },
    iconColor: {
      type: 'string',
    },
    listUrl: {
      type: 'string',
      source: 'attribute',
      selector: '.wp-block-gutenbee-list-icon-link',
      attribute: 'href',
    },
    newTab: {
      type: 'boolean',
      default: false,
    },
  },
  edit: IconListItemEdit,
  save: ({ attributes, className }) => {
    const { content, color, listUrl, newTab } = attributes;
    const listItem = (
      <Fragment>
        <Icon className={className} {...attributes} />
        <RichText.Content
          tagName="div"
          className={classNames(className, {
            'wp-block-gutenbee-icon-list-item-text': true,
          })}
          value={content}
        />
      </Fragment>
    );
    return (
      <li
        className={classNames(className, {
          'wp-block-gutenbee-icon-list-item': true,
        })}
        style={{
          color: color ? color : undefined,
        }}
      >
        {listUrl ? (
          <a
            href={listUrl}
            target={newTab && '_blank'}
            rel={newTab && 'noopener noreferrer'}
            className="wp-block-gutenbee-list-icon-link"
          >
            {listItem}
          </a>
        ) : (
          listItem
        )}
      </li>
    );
  },
});
