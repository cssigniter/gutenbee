import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import deprecated from './deprecated';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../util/getBlockId';
import IconListEdit from './edit';
import IconListStyle from './style';
import IconListBlockIcon from './block-icon';

registerBlockType('gutenbee/icon-list', {
  title: __('GutenBee Icon List'),
  description: __('Create lists with icons.'),
  icon: IconListBlockIcon,
  category: 'gutenbee',
  keywords: [__('icon'), __('list')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    layout: {
      type: 'string',
      default: 'default',
    },
    itemSpacing: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    fontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '18',
        tablet: '',
        mobile: '',
      }),
    },
    iconSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '24',
        tablet: '',
        mobile: '',
      }),
    },
    align: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: 'left',
        tablet: 'left',
        mobile: 'left',
      }),
    },
    blockLink: {
      type: 'string',
      default: 'inline',
    },
    separatorWidth: {
      type: 'integer',
      default: 0,
    },
    separatorColor: {
      type: 'string',
    },
    iconColor: {
      type: 'string',
    },
    color: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
  },
  deprecated,
  edit: IconListEdit,
  save: ({ className, attributes }) => {
    const { uniqueId, blockLink, layout, backgroundColor } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div
        className={classNames(blockId, 'wp-block-gutenbee-list-icon-wrapper')}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        <ul
          className={classNames(className, {
            'wp-block-gutenbee-icon-list': true,
            'wp-block-gutenbee-list-inline': layout === 'inline',
            'wp-block-gutenbee-list-block-link': blockLink === 'block',
          })}
        >
          <InnerBlocks.Content />
        </ul>
        <IconListStyle attributes={attributes} />
      </div>
    );
  },
});
