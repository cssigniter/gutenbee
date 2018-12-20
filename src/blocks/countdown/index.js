/**
 * Countdown Block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.editor';

import CountdownEdit from './edit';
import { capitalize } from '../../util/text';
import CountdownBlockIcon from './block-icon';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';

const CountDown = ({ attributes, className }) => {
  const {
    date,
    textColor,
    backgroundColor,
    displayLabels,
    numberFontSize,
    labelFontSize,
    maxWidth,
    blockMargin,
  } = attributes;

  const renderItem = key => {
    const displayAttributeKey = `display${[capitalize(key)]}`;
    const labelAttributeKey = `label${[capitalize(key)]}`;

    if (!attributes[displayAttributeKey]) {
      return null;
    }

    return (
      <div
        className={`${className}-item`}
        style={{
          backgroundColor: backgroundColor || undefined,
          maxWidth: maxWidth ? `${maxWidth}%` : undefined,
        }}
      >
        <p
          className={`gutenbee-countdown-number gutenbee-countdown-${key}`}
          style={{ fontSize: numberFontSize }}
        />

        {displayLabels && !RichText.isEmpty(attributes[labelAttributeKey]) && (
          <RichText.Content
            tagName="p"
            className={`gutenbee-countdown-label gutenbee-countdown-label-${key}`}
            value={attributes[labelAttributeKey]}
            style={{ fontSize: labelFontSize }}
          />
        )}
      </div>
    );
  };

  const items = ['days', 'hours', 'minutes', 'seconds'];

  return (
    <div
      className={className}
      data-date={date}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
      <div
        className={`${className}-wrap`}
        style={{
          color: textColor || undefined,
        }}
      >
        {items.map(key => renderItem(key))}
      </div>
    </div>
  );
};

registerBlockType('gutenbee/countdown', {
  title: __('GutenBee Countdown'),
  description: __('Display awesome countdowns'),
  category: 'gutenbee',
  icon: CountdownBlockIcon,
  keywords: [__('counter'), __('numbers'), __('countdown')],
  attributes: {
    date: {
      type: 'string',
    },
    displayDays: {
      type: 'boolean',
      default: true,
    },
    displayHours: {
      type: 'boolean',
      default: true,
    },
    displayMinutes: {
      type: 'boolean',
      default: true,
    },
    displaySeconds: {
      type: 'boolean',
      default: true,
    },
    displayLabels: {
      type: 'boolean',
      default: true,
    },
    labelDays: {
      type: 'string',
      source: 'text',
      selector: '.gutenbee-countdown-label-days',
      default: 'Days',
    },
    labelHours: {
      type: 'string',
      source: 'text',
      selector: '.gutenbee-countdown-label-hours',
      default: 'Hours',
    },
    labelMinutes: {
      type: 'string',
      source: 'text',
      selector: '.gutenbee-countdown-label-minutes',
      default: 'Minutes',
    },
    labelSeconds: {
      type: 'string',
      source: 'text',
      selector: '.gutenbee-countdown-label-seconds',
      default: 'Seconds',
    },
    textColor: {
      type: 'string',
      default: '',
    },
    backgroundColor: {
      type: 'string',
      default: '',
    },
    numberFontSize: {
      type: 'number',
      default: 24,
    },
    labelFontSize: {
      type: 'number',
      default: 13,
    },
    maxWidth: {
      type: 'number',
    },
    blockMargin: {
      type: 'object',
      default: {},
    },
  },
  edit: CountdownEdit,
  save({ attributes, className }) {
    return <CountDown attributes={attributes} className={className} />;
  },
});
