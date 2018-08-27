/**
 * Tabs block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.editor';
import TabsBlockIcon from './block-icon';

registerBlockType('gutenbee/tabs', {
  title: __('GutenBee Tabs'),
  description: __('Display fancy tabs'),
  icon: TabsBlockIcon,
  category: 'gutenbee',
  keywords: [
    __('tabs'),
  ],
  edit({ className }) {
    return (
      <div className={className}>
        <InnerBlocks />
      </div>
    );
  },
  save({ className }) {
    return (
      <div className={className}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
