import { animationControlAttributes } from '../../../components/controls/animation-controls/helpers';

const v1 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
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
    paginationType: {
      type: 'string',
      default: 'normal',
    },
    offset: {
      type: 'number',
      default: 0,
    },
    orderBy: {
      type: 'string',
      default: '',
    },
    order: {
      type: 'string',
      default: 'desc',
    },
    excludedPostIds: {
      type: 'array',
      default: [],
    },
    includedPostIds: {
      type: 'array',
      default: [],
    },
    postTagSlugs: {
      type: 'array',
      default: [],
    },
    ignitionEventQueryType: {
      type: 'string',
      default: '',
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
    className: {
      type: 'string',
      default: '',
    },
    imageSizeSlug: {
      type: 'string',
      default: '',
    },
    readMoreButtonLabel: {
      type: 'string',
      default: '',
    },
    ...animationControlAttributes(),
  },
  save: () => null,
};

export default v1;
