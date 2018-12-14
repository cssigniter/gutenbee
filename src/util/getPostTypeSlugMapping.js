/**
 * Accepts a post type slug and returns
 * its correct endpoint slug for usage in WP API.
 *
 * E.g. Posts have a slug of "post" but
 * the WP API endpoint is /wp/v2/posts
 *
 * @param {string} postType The post type's slug
 * @returns {string} The WP API endpoint slug
 */
const getPostTypeSlugToApi = postType => {
  if (postType === 'post') {
    return 'posts';
  }

  if (postType === 'page') {
    return 'pages';
  }

  return postType;
};

export default getPostTypeSlugToApi;
