/**
 * Countup
 *
 * Count to a certain number
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';

import CountupEdit from './edit';
import Countup from './Countup';
import CountupBlockIcon from './block-icon';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import CountupStyle from './style';
import deprecated from './deprecated';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

const CountupRender = ({ attributes, className }) => {
  const {
    titleContent,
    align,
    titleColor,
    backgroundColor,
    titleTopMargin,
    uniqueId,
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
        {
          [`wp-block-gutenbee-countup-align-${align}`]: !!align,
        },
      )}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
    >
      <CountupStyle attributes={attributes} />

      <Countup {...attributes} className="wp-block-gutenbee-countup-number" />

      {!RichText.isEmpty(titleContent) && (
        <RichText.Content
          tagName="p"
          value={titleContent}
          className="wp-block-gutenbee-countup-title"
          style={{
            color: titleColor || undefined,
            marginTop:
              titleTopMargin != null ? `${titleTopMargin}px` : undefined,
          }}
        />
      )}
    </div>
  );
};

registerBlockType('gutenbee/countup', {
  title: __('GutenBee Countup'),
  description: __('Animate a numerical value by counting to it.'),
  category: 'gutenbee',
  icon: CountupBlockIcon,
  keywords: [__('counter'), __('numbers'), __('animation')],
  supports: {
    anchor: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    startNumber: {
      type: 'string',
      default: '0',
    },
    endNumber: {
      type: 'string',
      default: '999',
    },
    animationDuration: {
      type: 'number',
      default: 2.5,
    },
    separator: {
      type: 'string',
      default: ',',
    },
    prefix: {
      type: 'string',
    },
    suffix: {
      type: 'string',
    },
    textFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 16 }),
    },
    titleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 16 }),
    },
    titleContent: {
      source: 'html',
      selector: 'p',
    },
    align: {
      type: 'string',
      default: 'left',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    titleTopMargin: {
      type: 'number',
    },
    textColor: {
      type: 'string',
    },
    titleColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
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
  edit: CountupEdit,
  save({ attributes, className }) {
    return <CountupRender attributes={attributes} className={className} />;
  },
});
