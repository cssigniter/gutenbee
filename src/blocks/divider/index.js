/**
 * Divider Block
 *
 * Provide thematic content spacing with a fancy divider
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import DividerBlockIcon from './block-icon';
import DividerEdit from './edit';
import {
  getDefaultBackgroundImageValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';

export const BORDER_STYLES = {
  SOLID: 'solid',
  DOTTED: 'dotted',
  DASHED: 'dashed',
  DOUBLE: 'double',
};

export const Divider = ({
  className,
  height,
  style,
  weight,
  width,
  align,
  color,
  ...props
}) => (
  <div
    key="divider"
    className={`${className} align-${align}`}
    style={{
      height,
      ...props.style,
    }}
    {...props}
  >
    <div
      className={`${className}-inner`}
      style={{
        borderTopStyle: style,
        borderTopWidth: weight,
        borderTopColor: color,
        width: `${width}%`,
      }}
    />
  </div>
);

registerBlockType('gutenbee/divider', {
  title: __('GutenBee Divider'),
  description: __(
    'A divider to indicate a thematic change in the content in style.',
  ),
  icon: DividerBlockIcon,
  category: 'gutenbee',
  keywords: [__('divider'), __('horizontal-line'), 'hr'],
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
  },
  edit: DividerEdit,
  save({ className, attributes }) {
    return <Divider className={className} {...attributes} />;
  },
});
