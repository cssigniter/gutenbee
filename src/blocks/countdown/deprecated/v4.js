/**
 * Deprecated v4 - Handles blocks saved with the old ensureValueUnit bug.
 */
import { Fragment } from 'wp.element';
import { RichText, useBlockProps } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import OldStyleSheet from '../../../components/stylesheet/OldStyleSheet';
import { capitalize } from '../../../util/text';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../components/controls/animation-controls/helpers';

const OldCountdownStyle = ({ attributes }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    numberFontSize,
    labelFontSize,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <OldStyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-countdown.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-countdown.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={numberFontSize}
        rule=".wp-block-gutenbee-countdown.[root] .gutenbee-countdown-number { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={labelFontSize}
        rule=".wp-block-gutenbee-countdown.[root] .gutenbee-countdown-label { font-size: %s; }"
        unit="px"
      />
    </OldStyleSheet>
  );
};

const OldCountDown = ({ attributes }) => {
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

  const blockProps = useBlockProps.save({
    id: blockId,
    className: classNames(
      blockId,
      getBreakpointVisibilityClassNames(blockBreakpointVisibility),
      getAuthVisibilityClasses(blockAuthVisibility),
    ),
    'data-date': date,
    style: {
      backgroundColor: backgroundColor || undefined,
      ...getBorderCSSValue({ attributes }),
      ...getBoxShadowCSSValue({ attributes }),
    },
    ...getAnimationControlDataAttributes(attributes.animation),
  });

  return (
    <div {...blockProps}>
      <OldCountdownStyle attributes={attributes} />
      <div
        className="wp-block-gutenbee-countdown-wrap"
        style={{
          color: textColor || undefined,
        }}
      >
        {items.map(key => (
          <Fragment key={key}>{renderItem(key)}</Fragment>
        ))}
      </div>
    </div>
  );
};

const v4 = {
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
    ...animationControlAttributes(),
  },
  save({ attributes }) {
    return <OldCountDown attributes={attributes} />;
  },
};

export default v4;
