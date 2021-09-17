import { useSelect } from 'wp.data';

const getPostTypeTaxonomy = (taxonomies, postType) => {
  if (!taxonomies || !postType) {
    return null;
  }

  // Return the first hierarchical taxonomy that's assigned to the given post type.
  return taxonomies.find(
    taxonomy => taxonomy.hierarchical && taxonomy.types.includes(postType),
  );
};

const usePostTypesData = ({ isSelected, selectedPostType }) => {
  const excludedPostTypeSlugs =
    // eslint-disable-next-line
    __GUTENBEE_SETTINGS__?.blocks?.post_types?.excluded_post_types ?? [];

  const data = useSelect(
    select => {
      if (!isSelected) {
        return {
          postTypes: [],
          authors: [],
          taxonomy: null,
          terms: [],
          imageSizes: [],
        };
      }

      const {
        getPostTypes,
        getAuthors,
        getTaxonomies,
        getEntityRecords,
      } = select('core');
      const postTypes = getPostTypes({ per_page: -1 }) || [];
      const authors = getAuthors({ per_page: -1 });

      const taxonomies = getTaxonomies({ per_page: -1 });
      const taxonomy = getPostTypeTaxonomy(taxonomies, selectedPostType);

      const { getSettings } = select('core/block-editor');
      const { imageSizes } = getSettings();

      return {
        postTypes: postTypes.filter(
          postType => !excludedPostTypeSlugs.includes(postType.slug),
        ),
        authors,
        taxonomy,
        terms: taxonomy
          ? getEntityRecords('taxonomy', taxonomy.slug, { per_page: -1 })
          : [],
        imageSizes,
      };
    },
    [isSelected, selectedPostType],
  );

  return data;
};

export default usePostTypesData;
