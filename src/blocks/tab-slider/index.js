import { registerTODOBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';

import getBlockId from '../../util/getBlockId';
import TabSliderEdit from './edit';

registerTODOBlockType('gutenbee/tab-slider', {
  title: __('GutenBee Tab Slider'),
  description: __('Create Tab Slider.'),
  icon: 'smiley',
  category: 'gutenbee',
  keywords: [__('tabs'), __('tabbed'), __('content')],
  attributes: {
    uniqueId: {
      type: 'string',
    },
  },
  edit: TabSliderEdit,
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
