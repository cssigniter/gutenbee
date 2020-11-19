import { RichText } from 'wp.blockEditor';

import { getMarginSettingStyles } from '../../../components/controls/margin-controls/margin-settings';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';

const ProgressBar = ({ className, attributes }) => {
  const {
    title,
    innerTitle,
    percentage,
    displayPercentage,
    textColor,
    backgroundColor,
    titleTextColor,
    titleFontSize,
    innerTitleFontSize,
    blockMargin,
  } = attributes;

  return (
    <div
      className={className}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
      {!RichText.isEmpty(title) && (
        <RichText.Content
          tagName="p"
          value={title}
          className={`${className}-title`}
          style={{
            fontSize: titleFontSize,
            color: titleTextColor,
          }}
        />
      )}

      <div className={`${className}-outer`}>
        <div
          className={`${className}-inner`}
          style={{
            width: `${percentage}%`,
            backgroundColor,
            color: textColor,
          }}
        >
          {!RichText.isEmpty(innerTitle) && (
            <RichText.Content
              tagName="span"
              value={innerTitle}
              className={`${className}-inner-title`}
              style={{ fontSize: innerTitleFontSize }}
            />
          )}

          {displayPercentage && (
            <span className={`${className}-percentage`}>{percentage}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

const v1 = {
  attributes: {
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
    backgroundColor: {
      type: 'string',
    },
    titleTextColor: {
      type: 'string',
    },
    titleFontSize: {
      type: 'number',
      default: 16,
    },
    innerTitleFontSize: {
      type: 'number',
      default: 14,
    },
    blockMargin: {
      type: 'object',
      default: {},
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
      progressBackgroundColor: attributes.backgroundColor || '',
      backgroundColor: '',
      barBackgroundColor: '',
      titleFontSize: getDefaultResponsiveValue({
        desktop: attributes.titleFontSize,
      }),
      innerTitleFontSize: getDefaultResponsiveValue({
        desktop: attributes.innerTitleFontSize,
      }),
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
  save: ({ className, attributes }) => (
    <ProgressBar className={className} attributes={attributes} />
  ),
};

export default v1;
