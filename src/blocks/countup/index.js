/**
 * Countup
 *
 * Count to a certain number
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { RichText } from 'wp.editor';

import edit from './edit';
import Countup from './Countup';

const CountupRender = ({
  attributes,
  className,
}) => {
  const {
    titleContent,
    align,
  } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
        [`${className}-align-${align}`]: !!align,
      })}
    >
      <Countup
        {...attributes}
        className={`${className}-number`}
      />

      {!!titleContent && (
        <RichText.Content
          tagName="p"
          value={titleContent}
          className={`${className}-title`}
        />
      )}
    </div>
  );
};

registerBlockType('gutenbee/countup', {
  title: __('GutenBee Countup'),
  description: __('Animate a numerical value by counting to it.'),
  category: 'common',
  icon: 'sort',
  keywords: [
    __('counter'),
    __('numbers'),
    __('animation'),
  ],
  attributes: {
    startNumber: {
      type: 'number',
      default: 0,
    },
    endNumber: {
      type: 'number',
      default: 999,
    },
    animationDuration: {
      type: 'number',
      default: 2.5,
    },
    separator: {
      type: 'string',
      default: ',',
    },
    prefix: {
      type: 'string',
    },
    suffix: {
      type: 'string',
    },
    textFontSize: {
      type: 'number',
      default: 16,
    },
    textColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
    },
    titleContent: {
      type: 'array',
      source: 'children',
      selector: 'p',
    },
    align: {
      type: 'string',
      default: 'left',
    },
  },
  edit,
  save({ attributes, className }) {
    return (
      <CountupRender
        attributes={attributes}
        className={className}
      />
    );
  },
});
