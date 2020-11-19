import { RichText } from 'wp.blockEditor';

import { capitalize } from '../../../util/text';
import { getMarginSettingStyles } from '../../../components/controls/margin-controls/margin-settings';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';

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

const v1 = {
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
  migrate(attributes) {
    return {
      ...attributes,
      uniqueId: undefined,
      labelTextColor: undefined,
      numberFontSize: {
        desktop: attributes.numberFontSize,
        tablet: '',
        mobile: '',
      },
      labelFontSize: {
        desktop: attributes.labelFontSize,
        tablet: '',
        mobile: '',
      },
      numberBackgroundColor: attributes.backgroundColor || '',
      backgroundColor: '',
      labelTopMargin: undefined,
      blockMargin: {
        desktop: {
          top: attributes.blockMargin.top || '',
          right: attributes.blockMargin.right || '',
          bottom: attributes.blockMargin.bottom || '',
          left: attributes.blockMargin.left || '',
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
      blockPadding: getDefaultSpacingValue(),
    };
  },
  save({ attributes, className }) {
    return <CountDown attributes={attributes} className={className} />;
  },
};

export default v1;
