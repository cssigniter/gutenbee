import { registerTODOBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';

import getBlockId from '../../../util/getBlockId';
import TabSliderContentColumnEdit from './edit';

registerTODOBlockType('gutenbee/tab-slider-content-column', {
  title: __('GutenBee Tab Slider Content Column'),
  description: __('The content column for the tab slider.'),
  parent: ['gutenbee/tab-slider'],
  icon: 'smiley',
  category: 'gutenbee',
  attributes: {
    uniqueId: {
      type: 'string',
    },
  },
  edit: TabSliderContentColumnEdit,
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
