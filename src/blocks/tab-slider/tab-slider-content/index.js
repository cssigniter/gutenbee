import { registerTODOBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';

import getBlockId from '../../../util/getBlockId';
import TabSliderContentEdit from './edit';

registerTODOBlockType('gutenbee/tab-slider-content', {
  title: __('GutenBee Tab Slider Content'),
  description: __('Create Tab Slider Content.'),
  icon: 'smiley',
  category: 'gutenbee',
  keywords: [__('tabs'), __('tabbed'), __('content')],
  parent: ['gutenbee/tab-slider-content-column'],
  attributes: {
    uniqueId: {
      type: 'string',
    },
  },
  edit: TabSliderContentEdit,
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
