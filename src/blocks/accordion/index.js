/**
 * Tabs block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.editor';

import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import AccordionBlockIcon from './block-icon';
import AccordionsEdit from './edit';

const Accordion = ({ className, attributes }) => {
  const {
    tabs,
    blockMargin,
    titleBackgroundColor,
    titleTextColor,
    borderColor,
    collapseOthers,
  } = attributes;

  return (
    <div
      className={className}
      data-collapse-others={collapseOthers}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
      {tabs.map(tab => (
        <div className={`${className}-item`}>
          <div
            className={`${className}-item-title`}
            style={{
              color: titleTextColor || undefined,
              backgroundColor: titleBackgroundColor || undefined,
              borderColor: borderColor || undefined,
            }}
          >
            {tab.title}
          </div>

          <div className={`${className}-item-content-wrap`}>
            <div
              className={`${className}-item-content`}
              style={{
                borderColor: borderColor || undefined,
              }}
            >
              <RichText.Content
                tagName="p"
                value={tab.content}
                className={`${className}-item-text`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

registerBlockType('gutenbee/accordion', {
  title: __('GutenBee Accordion'),
  description: __('Display fancy accordions'),
  icon: AccordionBlockIcon,
  category: 'gutenbee',
  keywords: [__('accordion'), __('tabs')],
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
    collapseOthers: {
      type: 'boolean',
      default: true,
    },
    titleBackgroundColor: {
      type: 'string',
      default: '',
    },
    titleTextColor: {
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
  edit: AccordionsEdit,
  save: ({ className, attributes }) => (
    <Accordion className={className} attributes={attributes} />
  ),
});
