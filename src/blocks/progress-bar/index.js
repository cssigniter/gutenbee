/**
 * Progress Bar block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import {
  RichText,
} from 'wp.editor';

import ProgressBarEdit from './edit';
import ProgressBarBlockIcon from './block-icon';

const ProgressBar = ({
  className,
  attributes,
}) => {
  const {
    title,
    innerTitle,
    percentage,
    displayPercentage,
    textColor,
    backgroundColor,
    titleFontSize,
    innerTitleFontSize,
  } = attributes;

  return (
    <div className={className}>
      <RichText.Content
        tagName="p"
        value={title}
        className={`${className}-title`}
        style={{ fontSize: titleFontSize }}
      />

      <div className={`${className}-outer`}>
        <div
          className={`${className}-inner`}
          style={{
            width: `${percentage}%`,
            backgroundColor,
            color: textColor,
          }}
        >
          <RichText.Content
            tagName="span"
            value={innerTitle}
            className={`${className}-inner-title`}
            style={{ fontSize: innerTitleFontSize }}
          />

          {displayPercentage && (
            <span className={`${className}-percentage`}>
              {percentage}%
            </span>
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
  keywords: [
    __('progress'),
    __('progress bar'),
  ],
  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: '.wp-block-gutenbee-progress-bar-title',
    },
    innerTitle: {
      type: 'array',
      source: 'children',
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
    titleFontSize: {
      type: 'number',
      default: 16,
    },
    innerTitleFontSize: {
      type: 'number',
      default: 14,
    },
  },
  edit: ProgressBarEdit,
  save: ({ className, attributes }) => (
    <ProgressBar
      className={className}
      attributes={attributes}
    />
  ),
});
