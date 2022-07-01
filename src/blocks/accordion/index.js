/**
 * Accordion block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import AccordionBlockIcon from './block-icon';
import AccordionsEdit from './edit';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import AccordionStyle from './style';
import getBlockId from '../../util/getBlockId';
import deprecated from './deprecated';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../components/controls/animation-controls/helpers';

const Accordion = ({ className, attributes }) => {
  const {
    uniqueId,
    tabs,
    borderColor,
    tabContentBackgroundColor,
    tabContentTextColor,
    collapseOthers,
    blockBreakpointVisibility,
    blockAuthVisibility,
    defaultOpenTabs = [],
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
      data-collapse-others={collapseOthers}
      {...getAnimationControlDataAttributes(attributes.animation)}
    >
      <AccordionStyle attributes={attributes} />

      {tabs.map((tab, index) => (
        <div
          className={classNames({
            'wp-block-gutenbee-accordion-item': true,
            'wp-block-gutenbee-accordion-item-expanded': defaultOpenTabs?.includes(
              index,
            ),
          })}
        >
          <div className="wp-block-gutenbee-accordion-item-title">
            <span className="wp-block-gutenbee-accordion-item-title-content">
              {tab.title}
            </span>

            <span className="wp-block-gutenbee-accordion-item-title-icon" />
          </div>

          <div className="wp-block-gutenbee-accordion-item-content-wrap">
            <div
              className="wp-block-gutenbee-accordion-item-content"
              style={{
                borderColor: borderColor || undefined,
                backgroundColor: tabContentBackgroundColor || undefined,
                color: tabContentTextColor || undefined,
              }}
            >
              <RichText.Content
                tagName="p"
                value={tab.content}
                className="wp-block-gutenbee-accordion-item-text"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

registerBlockType('gutenbee/accordion', {
  title: __('GutenBee Accordion'),
  description: __('Display fancy accordions'),
  icon: AccordionBlockIcon,
  category: 'gutenbee',
  keywords: [__('accordion'), __('tabs')],
  supports: {
    anchor: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    tabs: {
      type: 'array',
      default: [
        {
          title: '',
          content: '',
        },
      ],
    },
    collapseOthers: {
      type: 'boolean',
      default: true,
    },
    defaultOpenTabs: {
      type: 'array',
    },
    titleBackgroundColor: {
      type: 'string',
      default: '',
    },
    titleActiveBackgroundColor: {
      type: 'string',
      default: '',
    },
    titleHoverBackgroundColor: {
      type: 'string',
      default: '',
    },
    titleTextColor: {
      type: 'string',
      default: '',
    },
    titleActiveTextColor: {
      type: 'string',
      default: '',
    },
    titleHoverTextColor: {
      type: 'string',
      default: '',
    },
    tabContentTextColor: {
      type: 'string',
      default: '',
    },
    tabContentBackgroundColor: {
      type: 'string',
      default: '',
    },
    borderColor: {
      type: 'string',
      default: '',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
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
  deprecated,
  edit: AccordionsEdit,
  save: ({ className, attributes }) => (
    <Accordion className={className} attributes={attributes} />
  ),
});
