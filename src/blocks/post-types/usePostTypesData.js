import { useSelect } from 'wp.data';
import { useMemo } from 'wp.element';

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

  const rawPostTypes = useSelect(
    select => {
      if (!isSelected) {
        return [];
      }
      return select('core').getPostTypes({ per_page: -1 }) || [];
    },
    [isSelected],
  );

  const authors = useSelect(
    select => {
      if (!isSelected) {
        return [];
      }
      return select('core').getUsers({ who: 'authors', per_page: -1 }) || [];
    },
    [isSelected],
  );

  const taxonomies = useSelect(
    select => {
      if (!isSelected) {
        return [];
      }
      return select('core').getTaxonomies({ per_page: -1 }) || [];
    },
    [isSelected],
  );

  const imageSizes = useSelect(
    select => {
      if (!isSelected) {
        return [];
      }
      return select('core/block-editor').getSettings().imageSizes || [];
    },
    [isSelected],
  );

  const taxonomy = useMemo(
    () => getPostTypeTaxonomy(taxonomies, selectedPostType),
    [taxonomies, selectedPostType],
  );

  const terms = useSelect(
    select => {
      if (!isSelected || !taxonomy) {
        return null;
      }
      const { getEntityRecords } = select('core');
      return getEntityRecords('taxonomy', taxonomy.slug, { per_page: -1 });
    },
    [isSelected, taxonomy?.slug],
  );

  const postTypes = useMemo(() => {
    return rawPostTypes.filter(
      postType => !excludedPostTypeSlugs.includes(postType.slug),
    );
  }, [rawPostTypes]);

  const stableData = useMemo(() => {
    return {
      postTypes,
      authors: authors ?? [],
      taxonomy,
      terms: terms ?? [],
      imageSizes: imageSizes ?? [],
    };
  }, [postTypes, authors, taxonomy, terms, imageSizes]);

  return stableData;
};

export default usePostTypesData;
