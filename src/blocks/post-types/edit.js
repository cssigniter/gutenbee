import { Fragment } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { compose } from 'wp.compose';
import { withSelect } from 'wp.data';
import {
  SelectControl,
  RangeControl,
  PanelBody,
  ToggleControl,
} from 'wp.components';
import { InspectorControls } from 'wp.blockEditor';
import ServerSideRender from 'wp.serverSideRender';
import MultiSelectCheckboxControl from '../../components/controls/multi-select-checkbox-control';

const propTypes = {
  attributes: PropTypes.shape({
    columns: PropTypes.number,
    postType: PropTypes.string,
    taxonomySlug: PropTypes.string,
    termId: PropTypes.number,
    authorId: PropTypes.number,
    postsPerPage: PropTypes.number,
    pagination: PropTypes.bool,
    offset: PropTypes.number,
    orderBy: PropTypes.string,
    order: PropTypes.string,
    excludedPostIds: PropTypes.array,
    gridEffect: PropTypes.string,
    gridSpacing: PropTypes.string,
    masonry: PropTypes.bool,
    categoryFilters: PropTypes.bool,
  }).isRequired,
  className: PropTypes.string.isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  postTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    }),
  ),
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.shape({
        raw: PropTypes.string,
        rendered: PropTypes.string,
      }),
    }),
  ),
  terms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      slug: PropTypes.string,
    }),
  ),
  taxonomy: PropTypes.shape({
    id: PropTypes.number,
  }),
};

const PostTypesEdit = ({
  attributes,
  setAttributes,
  className,
  isSelected,
  postTypes,
  authors,
  posts,
  terms,
  taxonomy,
}) => {
  const {
    postType,
    termId,
    postsPerPage,
    pagination,
    columns,
    authorId,
    offset,
    orderBy,
    order,
    excludedPostIds,
    gridEffect,
    gridSpacing,
    masonry,
    categoryFilters,
  } = attributes;

  const supports = window.__GUTENBEE_SETTINGS__.theme_supports['post-types'];

  return (
    <Fragment>
      <div className={className}>
        <ServerSideRender block="gutenbee/post-types" attributes={attributes} />
      </div>

      {isSelected && (
        <InspectorControls>
          <PanelBody>
            <SelectControl
              label={__('Post Type')}
              value={postType}
              options={postTypes.map(p => ({
                value: p.slug,
                label: p.name,
              }))}
              onChange={value => {
                setAttributes({ postType: value });

                // Reset taxonomy and term id every time we change the post type.
                if (value !== postType) {
                  setAttributes({
                    taxonomySlug: '',
                    termId: '',
                  });
                }
              }}
            />

            {taxonomy && terms && (
              <SelectControl
                label={__('Base Category')}
                value={termId}
                options={[
                  {
                    value: null,
                    label: '',
                  },
                  ...terms.map(p => ({
                    value: p.id,
                    label: p.name,
                  })),
                ]}
                onChange={value =>
                  setAttributes({
                    taxonomySlug: value ? taxonomy.slug : '',
                    termId: value !== '' ? value : '',
                  })
                }
              />
            )}

            <SelectControl
              label={__('Author')}
              value={authorId}
              options={[
                {
                  value: null,
                  label: '',
                },
                ...authors.map(p => ({
                  value: p.id,
                  label: p.name,
                })),
              ]}
              onChange={value =>
                setAttributes({ authorId: value !== '' ? value : '' })
              }
            />

            {posts && posts.length && (
              <MultiSelectCheckboxControl
                label={__('Excluded Posts')}
                value={excludedPostIds}
                options={posts.map(p => ({
                  value: p.id,
                  label: p.title.raw,
                }))}
                onChange={value => setAttributes({ excludedPostIds: value })}
              />
            )}

            <RangeControl
              label={__('Posts Per Page')}
              value={postsPerPage}
              min={1}
              max={24}
              onChange={value => setAttributes({ postsPerPage: value })}
            />

            <ToggleControl
              label={__('Pagination')}
              checked={pagination}
              onChange={value => setAttributes({ pagination: value })}
            />

            <RangeControl
              label={__('Offset')}
              value={offset}
              min={0}
              step={1}
              onChange={value => setAttributes({ offset: value })}
            />

            <div className="ci-split-field">
              <SelectControl
                label={__('Order By')}
                value={orderBy}
                options={[
                  { label: '', value: '' },
                  { label: 'Post Id', value: 'ID' },
                  { label: 'Post Author', value: 'author' },
                  { label: 'Title', value: 'title' },
                  { label: 'Date', value: 'date' },
                  { label: 'Last Modified Date', value: 'modified' },
                  { label: 'Parent Id', value: 'parent' },
                  { label: 'Random', value: 'rand' },
                  { label: 'Comment Count', value: 'comment_count' },
                  { label: 'Menu Order', value: 'menu_order' },
                ]}
                onChange={value => setAttributes({ orderBy: value })}
              />

              <SelectControl
                label={__('Order')}
                value={order}
                options={[
                  { label: 'Ascending', value: 'asc' },
                  { label: 'Descending', value: 'desc' },
                ]}
                onChange={value => setAttributes({ order: value })}
              />
            </div>
          </PanelBody>

          <PanelBody>
            <RangeControl
              label={__('Columns')}
              value={columns}
              min={1}
              max={4}
              onChange={value => setAttributes({ columns: value })}
            />

            {supports.gridEffect && (
              <SelectControl
                label={__('Grid Effect')}
                value={gridEffect}
                options={[
                  { label: 'None', value: 'none' },
                  { label: 'Fade In', value: 'fade-in' },
                  { label: 'Move Up', value: 'move-up' },
                  { label: 'Scale Up', value: 'scale-up' },
                  { label: 'Fall Perspective', value: 'fall-perspective' },
                  { label: 'Flip', value: 'flip' },
                  { label: 'Pop Up', value: 'pop-up' },
                ]}
                onChange={value => setAttributes({ gridEffect: value })}
              />
            )}

            <SelectControl
              label={__('Grid Spacing')}
              value={gridSpacing}
              options={[
                { label: 'With Gutters', value: 'gutters' },
                { label: 'No Gutters', value: 'no-gutters' },
              ]}
              onChange={value => setAttributes({ gridSpacing: value })}
            />

            {supports.masonry && (
              <ToggleControl
                label={__('Masonry')}
                checked={masonry}
                onChange={value => setAttributes({ masonry: value })}
              />
            )}

            {supports.categoryFilters && (
              <ToggleControl
                label={__('Category Filters')}
                checked={categoryFilters}
                help={__(
                  'When enabled, ignores the "Items Per Page" and "Pagination" setting.',
                )}
                onChange={value => setAttributes({ categoryFilters: value })}
              />
            )}
          </PanelBody>
        </InspectorControls>
      )}
    </Fragment>
  );
};

PostTypesEdit.propTypes = propTypes;

const getPostTypeTaxonomy = (taxonomies, postType) => {
  if (!taxonomies || !postType) {
    return null;
  }

  // Return the first hierarchical taxonomy that's assigned to the given post type.
  return taxonomies.find(
    taxonomy => taxonomy.hierarchical && taxonomy.types.includes(postType),
  );
};

const withData = withSelect((select, ownProps) => {
  const excludedPostTypeSlugs = ['attachment', 'wp_block'];
  const { getPostTypes, getAuthors, getTaxonomies, getEntityRecords } = select(
    'core',
  );

  const postTypes = getPostTypes() || [];
  const authors = getAuthors();

  const taxonomies = getTaxonomies();
  const taxonomy = getPostTypeTaxonomy(
    taxonomies,
    ownProps.attributes.postType,
  );

  return {
    postTypes: postTypes.filter(
      postType => !excludedPostTypeSlugs.includes(postType.slug),
    ),
    posts: getEntityRecords('postType', ownProps.attributes.postType, {
      per_page: -1,
    }),
    authors,
    taxonomy,
    terms: taxonomy
      ? getEntityRecords('taxonomy', taxonomy.slug, { per_page: -1 })
      : [],
  };
});

export default compose(withData)(PostTypesEdit);
