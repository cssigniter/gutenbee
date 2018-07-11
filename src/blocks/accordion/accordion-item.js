/**
 * Accordion element block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import {
  RichText,
} from 'wp.editor';
import classNames from 'classnames';

import AccordionItemEdit from './AccordionItemEdit';
import AccordionBlockIcon from './block-icon';

const AccordionItem = ({ attributes, className }) => {
  const {
    title,
    text,
    defaultExpanded,
  } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
        [`${className}-expanded`]: defaultExpanded,
      })}
    >
      <h4 className={`${className}-title`}>
        {title}
      </h4>
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

registerBlockType('gutenbee/accordion-item', {
  title: __('GutenBee Accordion Element'),
  description: __('A single accordion element within a Accordion block.'),
  icon: AccordionBlockIcon,
  category: 'gutenbee',
  keywords: [
    __('accordion'),
    __('tab'),
  ],
  parent: ['gutenbee/accordion'],
  attributes: {
    title: {
      source: 'text',
      selector: 'h4',
    },
    text: {
      type: 'array',
      source: 'children',
      selector: 'p',
      default: [],
    },
    defaultExpanded: {
      type: 'boolean',
      default: false,
    },
  },
  edit: AccordionItemEdit,
  save({ attributes, className }) {
    return (
      <AccordionItem
        attributes={attributes}
        className={className}
      />
    );
  },
});
