/**
 * Divider Block
 *
 * Provide thematic content spacing with a fancy divider
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { useBlockProps } from 'wp.blockEditor';

import DividerBlockIcon from './block-icon';
import DividerEdit from './edit';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import DividerStyle from './style';
import { getDefaultResponsiveBackgroundImageValue } from '../../components/controls/background-controls/helpers';
import deprecated from './deprecated';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

export const BORDER_STYLES = {
  SOLID: 'solid',
  DOTTED: 'dotted',
  DASHED: 'dashed',
  DOUBLE: 'double',
};

export const Divider = ({ blockProps, attributes }) => {
  const { style, weight, width, color } = attributes;

  return (
    <div {...blockProps}>
      <DividerStyle attributes={attributes} />
      <div
        className="wp-block-gutenbee-divider-inner"
        style={{
          borderTopStyle: style,
          borderTopWidth: weight,
          borderTopColor: color,
          width: `${width}%`,
        }}
      />
    </div>
  );
};

registerBlockType('gutenbee/divider', {
  apiVersion: 3,
  title: __('GutenBee Divider'),
  description: __(
    'A divider to indicate a thematic change in the content in style.',
  ),
  icon: DividerBlockIcon,
  category: 'gutenbee',
  keywords: [__('divider'), __('horizontal-line'), 'hr'],
  supports: {
    anchor: false,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    style: {
      type: 'string',
      default: BORDER_STYLES.SOLID,
    },
    weight: {
      type: 'number',
      default: 1,
    },
    width: {
      type: 'number',
      default: 100,
    },
    height: {
      type: 'number',
      default: 10,
    },
    align: {
      type: 'string',
      default: 'center',
    },
    color: {
      type: 'string',
      default: '#000000',
    },
    backgroundColor: {
      type: 'string',
    },
    backgroundImage: {
      type: 'object',
      default: getDefaultResponsiveBackgroundImageValue(),
    },
    backgroundImageEffects: {
      type: 'object',
      default: {
        zoom: false,
        parallax: false,
        parallaxSpeed: 0.3,
      },
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
  edit: DividerEdit,
  save({ attributes }) {
    const {
      height,
      align,
      uniqueId,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    const blockProps = useBlockProps.save({
      id: blockId,
      className: classNames(
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
        {
          [`align-${align}`]: true,
        },
      ),
      style: {
        height,
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      },
    });

    return <Divider blockProps={blockProps} attributes={attributes} />;
  },
});
