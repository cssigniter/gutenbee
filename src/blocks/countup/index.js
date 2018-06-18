/**
 * Countup
 *
 * Count to a certain number
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import edit from './edit';
import Countup from './Countup';

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
    decimal: {
      type: 'string',
      default: '.',
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
  },
  edit,
  save({ attributes, className }) {
    return (
      <Countup
        {...attributes}
        className={className}
      />
    );
  },
});
