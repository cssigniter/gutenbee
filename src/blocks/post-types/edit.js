import { Fragment, useEffect, useRef } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import {
  SelectControl,
  RangeControl,
  PanelBody,
  ToggleControl,
  TextControl,
} from 'wp.components';
import { InspectorControls, useBlockProps } from 'wp.blockEditor';
import ServerSideRender from 'wp.serverSideRender';

import isRenderedInEditor from '../../util/isRenderedInEditor';
import usePostTypesData from './usePostTypesData';
import EntitySelect from '../../components/controls/entity-select/EntitySelect';
import TermSelect from '../../components/controls/advanced-color-control/term-select';
import { POST_TYPES_PAGINATION_TYPE } from './index';
import useUniqueId from '../../hooks/useUniqueId';
import AnimationControls from '../../components/controls/animation-controls/AnimationControls';

const propTypes = {
  attributes: PropTypes.shape({
    columns: PropTypes.number,
    postType: PropTypes.string,
    taxonomySlug: PropTypes.string,
    termId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    authorId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    postsPerPage: PropTypes.number,
    pagination: PropTypes.bool,
    paginationType: PropTypes.string,
    offset: PropTypes.number,
    orderBy: PropTypes.string,
    order: PropTypes.string,
    includedPostIds: PropTypes.array,
    excludedPostIds: PropTypes.array,
    gridEffect: PropTypes.string,
    gridSpacing: PropTypes.string,
    masonry: PropTypes.bool,
    categoryFilters: PropTypes.bool,
    className: PropTypes.string,
  }).isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

const PostTypesEdit = ({ attributes, setAttributes, isSelected, clientId }) => {
  const {
    postType,
    termId,
    postsPerPage,
    pagination,
    paginationType,
    columns,
    authorId,
    offset,
    orderBy,
    order,
    excludedPostIds,
    includedPostIds,
    gridEffect,
    gridSpacing,
    masonry,
    categoryFilters,
    postTagSlugs,
    ignitionEventQueryType,
    imageSizeSlug,
    readMoreButtonLabel,
  } = attributes;

  const supports = window.__GUTENBEE_SETTINGS__.theme_supports['post-types'];
  const postTypeColumns = window.__GUTENBEE_SETTINGS__.post_type_columns || {};
  const columnLimits = postTypeColumns[postType] || {};
  const ref = useRef(null);

  useUniqueId({ attributes, setAttributes, clientId });

  const { postTypes, authors, taxonomy, terms, imageSizes } = usePostTypesData({
    isSelected,
    selectedPostType: attributes.postType,
  });

  // When changing a post type, check its column limits and apply different ones
  useEffect(() => {
    const newColumnLimits = postTypeColumns[postType] || {};

    if (newColumnLimits.min > columns) {
      setAttributes({ columns: newColumnLimits.min || 3 });
      return;
    }

    if (newColumnLimits.max < columns) {
      setAttributes({ columns: newColumnLimits.max || 3 });
    }

    // Reset the post tags if we switch a post type.
    if (postType !== 'post') {
      setAttributes({ postTagSlugs: [] });
    }

    // Reset the ignition-event query type if we switch a post type.
    if (postType !== 'ignition-event') {
      setAttributes({ ignitionEventQueryType: '' });
    }
  }, [postType]);

  useEffect(() => {
    if (!!ref.current && !isRenderedInEditor(ref.current)) {
      ref.current
        .closest('.block-editor-block-styles__item')
        ?.classList?.add('gutenbee-post-types-block-style-item');

      ref.current
        .closest('.block-editor-block-styles')
        ?.classList?.add('gutenbee-post-types-block-editor-block-styles');
    }
  }, [ref.current]);

  const blockProps = useBlockProps({
    ref: ref,
  });

  return (
    <Fragment>
      <div {...blockProps}>
        <ServerSideRender
          key={postType}
          block="gutenbee/post-types"
          attributes={attributes}
        />
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
                    termId: undefined,
                  });
                }
              }}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />

            {postType === 'ignition-event' && (
              <SelectControl
                label={__('Events Type')}
                value={ignitionEventQueryType}
                options={[
                  { label: 'All events', value: '' },
                  { label: 'Recurring events', value: 'recurring' },
                  { label: 'Upcoming events', value: 'future' },
                  { label: 'Past events', value: 'past' },
                ]}
                onChange={value =>
                  setAttributes({ ignitionEventQueryType: value })
                }
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            )}

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
                    termId: value !== '' ? value : undefined,
                  })
                }
                __next40pxDefaultSize
                __nextHasNoMarginBottom
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
                setAttributes({ authorId: value !== '' ? value : undefined })
              }
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />

            {postType === 'post' && (
              <TermSelect
                label={__('Tags')}
                taxonomy="post_tag"
                values={postTagSlugs}
                onChange={value => setAttributes({ postTagSlugs: value })}
              />
            )}

            <EntitySelect
              postType={postType}
              label={__('Excluded Posts')}
              values={excludedPostIds}
              onChange={value => setAttributes({ excludedPostIds: value })}
            />

            <EntitySelect
              postType={postType}
              label={__('Included Posts')}
              values={includedPostIds}
              onChange={value => setAttributes({ includedPostIds: value })}
            />

            <RangeControl
              label={__('Posts Per Page')}
              value={postsPerPage}
              min={1}
              max={24}
              onChange={value => setAttributes({ postsPerPage: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />

            <ToggleControl
              label={__('Pagination')}
              checked={pagination}
              onChange={value => setAttributes({ pagination: value })}
              __nextHasNoMarginBottom
            />

            {pagination && (
              <SelectControl
                label={__('Pagination Type')}
                value={paginationType}
                options={[
                  { label: 'Normal', value: POST_TYPES_PAGINATION_TYPE.NORMAL },
                  {
                    label: 'Load More Button',
                    value: POST_TYPES_PAGINATION_TYPE.LOAD_MORE,
                  },
                ]}
                onChange={value => setAttributes({ paginationType: value })}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            )}

            <RangeControl
              label={__('Offset')}
              value={offset}
              min={0}
              step={1}
              onChange={value => setAttributes({ offset: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
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
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />

              <SelectControl
                label={__('Order')}
                value={order}
                options={[
                  { label: 'Ascending', value: 'asc' },
                  { label: 'Descending', value: 'desc' },
                ]}
                onChange={value => setAttributes({ order: value })}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            </div>
          </PanelBody>

          <PanelBody>
            <RangeControl
              label={__('Columns')}
              value={columns}
              min={columnLimits.min || 1}
              max={columnLimits.max || 4}
              onChange={value => setAttributes({ columns: value })}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
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
                __next40pxDefaultSize
                __nextHasNoMarginBottom
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
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />

            {supports.masonry && (
              <ToggleControl
                label={__('Masonry')}
                checked={masonry}
                onChange={value => setAttributes({ masonry: value })}
                __nextHasNoMarginBottom
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
                __nextHasNoMarginBottom
              />
            )}

            {supports.selectImageSize?.includes?.(postType) &&
              imageSizes?.length > 0 && (
                <SelectControl
                  label={__('Image Size')}
                  value={imageSizeSlug}
                  options={[
                    {
                      value: '',
                      label: __(''),
                    },
                    ...imageSizes.map(imageSize => ({
                      value: imageSize.slug,
                      label: imageSize.name,
                    })),
                  ]}
                  onChange={value => setAttributes({ imageSizeSlug: value })}
                  __next40pxDefaultSize
                  __nextHasNoMarginBottom
                />
              )}

            <TextControl
              label={__('Button Label')}
              onChange={value => setAttributes({ readMoreButtonLabel: value })}
              type="text"
              placeholder={__('Read More')}
              value={readMoreButtonLabel}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          </PanelBody>

          {__GUTENBEE_SETTINGS__.plugin.settings[
            'active_animation-controls'
          ] && (
            <PanelBody
              icon={!!attributes.animation?.type && 'saved'}
              title={__('Animation')}
              initialOpen={false}
            >
              <AnimationControls
                attributes={{
                  ...attributes.animation,
                  duration:
                    attributes.animation?.duration !== undefined &&
                    attributes.animation?.duration !== ''
                      ? Number(attributes.animation.duration)
                      : undefined,
                  delay:
                    attributes.animation?.delay !== undefined &&
                    attributes.animation?.delay !== ''
                      ? Number(attributes.animation.delay)
                      : undefined,
                }}
                setAttributes={setAttributes}
              />
            </PanelBody>
          )}
        </InspectorControls>
      )}
    </Fragment>
  );
};

PostTypesEdit.propTypes = propTypes;

export default PostTypesEdit;
