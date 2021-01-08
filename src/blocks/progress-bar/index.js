/**
 * Progress Bar block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import ProgressBarEdit from './edit';
import ProgressBarBlockIcon from './block-icon';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import ProgressBarStyle from './style';
import getBlockId from '../../util/getBlockId';
import deprecated from './deprecated';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

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
    blockBreakpointVisibility,
    blockAuthVisibility,
  } = attributes;

  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={classNames(
        className,
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
      )}
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

registerBlockType('gutenbee/progress-bar', {
  title: __('GutenBee Progress Bar'),
  description: __('Create fancy progress bars'),
  icon: ProgressBarBlockIcon,
  category: 'gutenbee',
  keywords: [__('progress'), __('progress bar')],
  supports: {
    anchor: false,
  },
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
  edit: ProgressBarEdit,
  save: ({ className, attributes }) => (
    <ProgressBar className={className} attributes={attributes} />
  ),
});
