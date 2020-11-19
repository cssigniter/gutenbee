/**
 * Accordion block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import AccordionBlockIcon from './block-icon';
import AccordionsEdit from './edit';
import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import AccordionStyle from './style';
import getBlockId from '../../util/getBlockId';
import deprecated from './deprecated';

const Accordion = ({ className, attributes }) => {
  const {
    uniqueId,
    tabs,
    titleBackgroundColor,
    titleTextColor,
    borderColor,
    tabContentBackgroundColor,
    tabContentTextColor,
    collapseOthers,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div
      className={classNames({
        [className]: !!className,
        [blockId]: true,
      })}
      data-collapse-others={collapseOthers}
    >
      <AccordionStyle attributes={attributes} />

      {tabs.map(tab => (
        <div className="wp-block-gutenbee-accordion-item">
          <div
            className="wp-block-gutenbee-accordion-item-title"
            style={{
              color: titleTextColor || undefined,
              backgroundColor: titleBackgroundColor || undefined,
              borderColor: borderColor || undefined,
            }}
          >
            {tab.title}
          </div>

          <div className="wp-block-gutenbee-accordion-item-content-wrap">
            <div
              className="wp-block-gutenbee-accordion-item-content"
              style={{
                borderColor: borderColor || undefined,
                backgroundColor: tabContentBackgroundColor || undefined,
                color: tabContentTextColor || undefined,
              }}
            >
              <RichText.Content
                tagName="p"
                value={tab.content}
                className="wp-block-gutenbee-accordion-item-text"
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
    tabContentTextColor: {
      type: 'string',
      default: '',
    },
    tabContentBackgroundColor: {
      type: 'string',
      default: '',
    },
    borderColor: {
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
  edit: AccordionsEdit,
  save: ({ className, attributes }) => (
    <Accordion className={className} attributes={attributes} />
  ),
});
