/**
 * Divider Block
 *
 * Provide thematic content spacing with a fancy divider
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';

import DividerBlockIcon from './block-icon';
import DividerEdit from './edit';
import {
  getDefaultBackgroundImageValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import DividerStyle from './style';
import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
import deprecated from './deprecated';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import borderControlAttributes from '../../components/controls/border-controls/attributes';

export const BORDER_STYLES = {
  SOLID: 'solid',
  DOTTED: 'dotted',
  DASHED: 'dashed',
  DOUBLE: 'double',
};

export const Divider = ({ className, attributes, ...props }) => {
  const {
    height,
    style,
    weight,
    width,
    align,
    color,
    uniqueId,
    backgroundColor,
    backgroundImage,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <div
      className={classNames(className, blockId, {
        [`align-${align}`]: true,
      })}
      style={{
        height,
        backgroundColor: backgroundColor || undefined,
        ...getBackgroundImageStyle(backgroundImage),
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      }}
      {...props}
    >
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
  title: __('GutenBee Divider'),
  description: __(
    'A divider to indicate a thematic change in the content in style.',
  ),
  icon: DividerBlockIcon,
  category: 'gutenbee',
  keywords: [__('divider'), __('horizontal-line'), 'hr'],
  supports: {
    anchor: true,
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
      default: getDefaultBackgroundImageValue(),
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
  deprecated,
  edit: DividerEdit,
  save({ className, attributes }) {
    return <Divider className={className} attributes={attributes} />;
  },
});
