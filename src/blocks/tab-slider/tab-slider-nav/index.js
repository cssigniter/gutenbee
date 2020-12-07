import { registerTODOBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';

import getBlockId from '../../../util/getBlockId';
import TabSliderNavEdit from './edit';

registerTODOBlockType('gutenbee/tab-slider-nav', {
  title: __('GutenBee Tab Slider Navigation'),
  description: __('Create Tab Slider Navigation Items.'),
  icon: 'smiley',
  category: 'gutenbee',
  keywords: [__('tabs'), __('tabbed'), __('content'), __('navigation')],
  parent: ['gutenbee/tab-slider-nav-column'],
  attributes: {
    uniqueId: {
      type: 'string',
    },
  },
  edit: TabSliderNavEdit,
  save: ({ attributes, className }) => {
    const { uniqueId } = attributes;
    const blockId = getBlockId(uniqueId);
    return (
      <div id={blockId} className={classNames(className, blockId)}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
