/**
 * Countdown Block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import CountdownEdit from './edit';
import { capitalize } from '../../util/text';
import CountdownBlockIcon from './block-icon';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import CountdownStyle from './style';
import deprecated from './deprecated';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

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
    blockBreakpointVisibility,
    blockAuthVisibility,
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
      className={classNames(
        className,
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
      )}
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

registerBlockType('gutenbee/countdown', {
  title: __('GutenBee Countdown'),
  description: __('Display awesome countdowns'),
  category: 'gutenbee',
  icon: CountdownBlockIcon,
  keywords: [__('counter'), __('numbers'), __('countdown')],
  supports: {
    anchor: false,
  },
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
    blockBreakpointVisibility: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: false,
        tablet: false,
        mobile: false,
      }),
    },
    blockAuthVisibility: {
      type: 'object',
      default: {
        loggedIn: false,
        loggedOut: false,
      },
    },
  },
  deprecated,
  edit: CountdownEdit,
  save({ attributes, className }) {
    return <CountDown attributes={attributes} className={className} />;
  },
});
