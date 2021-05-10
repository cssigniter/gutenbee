const v1 = {
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
    includedPostIds: {
      type: 'array',
      default: [],
    },
    postTagSlugs: {
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
    className: {
      type: 'string',
      default: '',
    },
    imageSizeSlug: {
      type: 'string',
      default: '',
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
      includedPosts: attributes.includedPostIds.map(id => ({
        id,
        title: '',
      })),
      excludedPosts: attributes.excludedPostIds.map(id => ({
        id,
        title: '',
      })),
    };
  },
  save: () => null,
};

export default v1;
