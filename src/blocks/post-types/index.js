/**
 * Post Types block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import PostTypesEdit from './edit';
import PostTypesBlockIcon from './block-icon';

registerBlockType('gutenbee/post-types', {
  title: __('Post Types'),
  description: __('Display a list of post type items.'),
  icon: PostTypesBlockIcon,
  category: 'gutenbee',
  keywords: [__('custom post types')],
  attributes: {
    postType: {
      type: 'string',
      default: 'post',
    },
    taxonomySlug: {
      type: 'string',
      default: '',
    },
    termId: {
      type: 'string',
      default: '',
    },
    authorId: {
      type: 'string',
      default: '',
    },
    postsPerPage: {
      type: 'number',
      default: 3,
    },
    pagination: {
      type: 'boolean',
      default: false,
    },
    offset: {
      type: 'number',
      default: 0,
    },
    orderBy: {
      type: 'string',
      default: 'date',
    },
    order: {
      type: 'string',
      default: 'desc',
    },
    excludedPostIds: {
      type: 'array',
      default: [],
    },
    columns: {
      type: 'number',
      default: 3,
    },
    gridEffect: {
      type: 'string',
      default: 'none',
    },
    gridSpacing: {
      type: 'string',
      default: 'gutters',
    },
    masonry: {
      type: 'boolean',
      default: false,
    },
    categoryFilters: {
      type: 'boolean',
      default: false,
    },
  },

  edit: PostTypesEdit,
  save: () => null,
});
