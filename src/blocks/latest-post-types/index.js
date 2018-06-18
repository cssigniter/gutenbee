/**
 * Dynamic block
 */

import { __ } from 'wp.i18n';
import {
  registerBlockType,
} from 'wp.blocks';

import LatestPostItemsEdit from './edit';

registerBlockType('gutenbee/latest-post-types', {
  title: __('Gutenbee Latest Post Types'),
  description: __('Fetch latest content from any post type.'),
  icon: 'list-view',
  category: 'widgets',
  edit: LatestPostItemsEdit,
  save() {
    return null;
  },
});
