import { registerTODOBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';

import getBlockId from '../../../util/getBlockId';
import TabSliderNavColumnEdit from './edit';

registerTODOBlockType('gutenbee/tab-slider-nav-column', {
  title: __('GutenBee Tab Slider Navigation Column'),
  description: __('The navigation column for the tab slider.'),
  parent: ['gutenbee/tab-slider'],
  icon: 'smiley',
  category: 'gutenbee',
  attributes: {
    uniqueId: {
      type: 'string',
    },
  },
  edit: TabSliderNavColumnEdit,
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
