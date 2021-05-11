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
  const excludedPostTypeSlugs = ['attachment', 'wp_block'];
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
      const postTypes = getPostTypes() || [];
      const authors = getAuthors();

      const taxonomies = getTaxonomies();
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
