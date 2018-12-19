/**
 * Progress Bar block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.editor';

import ProgressBarEdit from './edit';
import ProgressBarBlockIcon from './block-icon';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';

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

registerBlockType('gutenbee/progress-bar', {
  title: __('GutenBee Progress Bar'),
  description: __('Create fancy progress bars'),
  icon: ProgressBarBlockIcon,
  category: 'gutenbee',
  keywords: [__('progress'), __('progress bar')],
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
  edit: ProgressBarEdit,
  save: ({ className, attributes }) => (
    <ProgressBar className={className} attributes={attributes} />
  ),
});
