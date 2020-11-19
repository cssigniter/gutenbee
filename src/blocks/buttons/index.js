import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import ButtonsEdit from './edit';
import getBlockId from '../../util/getBlockId';
import ButtonsStyle from './style';
import ButtonsBlockIcon from './block-icon';
import deprecated from './deprecated';

registerBlockType('gutenbee/buttons', {
  title: __('GutenBee Button Group'),
  description: __(
    'Prompt visitors to take action with a group of button-style links',
  ),
  supports: {
    anchor: true,
  },
  icon: ButtonsBlockIcon,
  category: 'gutenbee',
  keywords: [__('link'), __('button'), __('call to action')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    align: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: 'flex-start',
        tablet: '',
        mobile: '',
      }),
    },
    backgroundColor: {
      type: 'string',
    },
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
  edit: ButtonsEdit,
  save: ({ attributes, className }) => {
    const { uniqueId, backgroundColor } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div
        className={classNames(className, blockId)}
        style={{
          backgroundColor: backgroundColor || undefined,
        }}
      >
        <ButtonsStyle attributes={attributes} />
        <InnerBlocks.Content />
      </div>
    );
  },
});
