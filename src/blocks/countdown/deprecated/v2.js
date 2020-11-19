import { RichText } from 'wp.blockEditor';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { capitalize } from '../../../util/text';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const CountdownStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    numberFontSize,
    labelFontSize,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={numberFontSize}
        rule=".gutenbee-countdown-number { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={labelFontSize}
        rule=".gutenbee-countdown-label { font-size: %s; }"
        unit="px"
      />

      {children}
    </StyleSheetV1>
  );
};

const CountDown = ({ attributes, className }) => {
  const {
    uniqueId,
    date,
    textColor,
    backgroundColor,
    displayLabels,
    maxWidth,
    labelTopMargin,
    labelTextColor,
    numberBackgroundColor,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  const renderItem = key => {
    const displayAttributeKey = `display${[capitalize(key)]}`;
    const labelAttributeKey = `label${[capitalize(key)]}`;

    if (!attributes[displayAttributeKey]) {
      return null;
    }

    return (
      <div
        className="wp-block-gutenbee-countdown-item"
        style={{
          backgroundColor: numberBackgroundColor || undefined,
          maxWidth: maxWidth ? `${maxWidth}%` : undefined,
        }}
      >
        <p className={`gutenbee-countdown-number gutenbee-countdown-${key}`} />

        {displayLabels && !RichText.isEmpty(attributes[labelAttributeKey]) && (
          <RichText.Content
            tagName="p"
            className={`gutenbee-countdown-label gutenbee-countdown-label-${key}`}
            value={attributes[labelAttributeKey]}
            style={{
              marginTop:
                labelTopMargin != null ? `${labelTopMargin}px` : undefined,
              color: labelTextColor || undefined,
            }}
          />
        )}
      </div>
    );
  };

  const items = ['days', 'hours', 'minutes', 'seconds'];

  return (
    <div
      id={blockId}
      className={className}
      data-date={date}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
    >
      <CountdownStyle attributes={attributes} />
      <div
        className="wp-block-gutenbee-countdown-wrap"
        style={{
          color: textColor || undefined,
        }}
      >
        {items.map(key => renderItem(key))}
      </div>
    </div>
  );
};

const v2 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
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
    labelTextColor: {
      type: 'string',
      default: '',
    },
    numberBackgroundColor: {
      type: 'string',
      default: '',
    },
    backgroundColor: {
      type: 'string',
      default: '',
    },
    numberFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 24 }),
    },
    labelFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 13 }),
    },
    labelTopMargin: {
      type: 'number',
    },
    maxWidth: {
      type: 'number',
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  save({ attributes, className }) {
    return <CountDown attributes={attributes} className={className} />;
  },
};

export default v2;
