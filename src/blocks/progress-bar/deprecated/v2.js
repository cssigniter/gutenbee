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
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const ProgressBarStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    titleFontSize,
    innerTitleFontSize,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={titleFontSize}
        rule=".wp-block-gutenbee-progress-bar-title{ font-size: %s; }"
        unit="px"
      />
      <Rule
        value={innerTitleFontSize}
        rule=".wp-block-gutenbee-progress-bar-inner-title { font-size: %s; }"
        unit="px"
      />

      {children}
    </StyleSheetV1>
  );
};

const ProgressBar = ({ className, attributes }) => {
  const {
    uniqueId,
    title,
    innerTitle,
    percentage,
    displayPercentage,
    textColor,
    backgroundColor,
    barBackgroundColor,
    titleTextColor,
    progressBackgroundColor,
    titleBottomMargin,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={className}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
    >
      <ProgressBarStyle attributes={attributes} />

      {!RichText.isEmpty(title) && (
        <RichText.Content
          tagName="p"
          value={title}
          className="wp-block-gutenbee-progress-bar-title"
          style={{
            color: titleTextColor || undefined,
            marginBottom:
              titleBottomMargin == null ? undefined : `${titleBottomMargin}px`,
          }}
        />
      )}

      <div
        className="wp-block-gutenbee-progress-bar-outer"
        style={{
          backgroundColor: barBackgroundColor || undefined,
        }}
      >
        <div
          className="wp-block-gutenbee-progress-bar-inner"
          style={{
            width: `${percentage}%`,
            backgroundColor: progressBackgroundColor || undefined,
            color: textColor || undefined,
          }}
        >
          {!RichText.isEmpty(innerTitle) && (
            <RichText.Content
              tagName="span"
              value={innerTitle}
              className="wp-block-gutenbee-progress-bar-inner-title"
            />
          )}

          {displayPercentage && (
            <span className="wp-block-gutenbee-progress-bar-percentage">
              {percentage}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const v2 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    title: {
      source: 'html',
      selector: '.wp-block-gutenbee-progress-bar-title',
    },
    innerTitle: {
      source: 'html',
      selector: '.wp-block-gutenbee-progress-bar-inner-title',
    },
    percentage: {
      type: 'number',
      default: 50,
    },
    displayPercentage: {
      type: 'boolean',
      default: true,
    },
    textColor: {
      type: 'string',
    },
    barBackgroundColor: {
      type: 'string',
    },
    progressBackgroundColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    titleTextColor: {
      type: 'string',
    },
    titleBottomMargin: {
      type: 'number',
    },
    titleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 16 }),
    },
    innerTitleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 14 }),
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
  migrate: attributes => {
    return {
      ...attributes,
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
    };
  },
  save: ({ className, attributes }) => (
    <ProgressBar className={className} attributes={attributes} />
  ),
};

export default v2;
