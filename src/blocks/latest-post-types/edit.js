import pickBy from 'lodash.pickby';
import moment from 'moment';
import { stringify } from 'querystringify';

import { Component, Fragment } from 'wp.element';
import {
  PanelBody,
  Placeholder,
  QueryControls,
  SelectControl,
  Spinner,
  ToggleControl,
  withAPIData,
} from 'wp.components';
import { __ } from 'wp.i18n';
import { decodeEntities } from 'wp.utils';
import {
  InspectorControls,
} from 'wp.editor';
import getPostTypeSlugToApi from '../../util/getPostTypeSlugMapping';

class LatestPostItemsEdit extends Component {
  toggleDisplayPostDate = () => {
    const { setAttributes, attributes } = this.props;
    const { displayPostDate } = attributes;

    setAttributes({ displayPostDate: !displayPostDate });
  };

  render() {
    const { attributes, setAttributes } = this.props;
    const latestPosts = this.props.latestPosts.data;
    const postTypeData = this.props.postTypeList.data || {};
    const postTypeList = Object.keys(postTypeData).map(postType => ({
      value: postTypeData[postType].slug,
      label: postTypeData[postType].name,
    })).filter(postType => !['wp_block', 'attachment'].includes(postType.value));
    const {
      displayPostDate,
      order,
      orderBy,
      postType,
      postsToShow,
    } = attributes;
    const hasPosts = Array.isArray(latestPosts) && latestPosts.length;

    const inspectorControls = (
      <InspectorControls>
        <PanelBody title={__('Latest Post Types Settings')}>
          <SelectControl
            label={__('Post Type')}
            value={postType}
            onChange={value => setAttributes({ postType: value })}
            options={postTypeList}
          />
          <QueryControls
            {...{ order, orderBy }}
            numberOfItems={postsToShow}
            onOrderChange={value => setAttributes({ order: value })}
            onOrderByChange={value => setAttributes({ orderBy: value })}
            onNumberOfItemsChange={value => setAttributes({ postsToShow: value })}
          />
          <ToggleControl
            label={__('Display date')}
            checked={displayPostDate}
            onChange={this.toggleDisplayPostDate}
          />
        </PanelBody>
      </InspectorControls>
    );

    if (!hasPosts) {
      return (
        <Fragment>
          {inspectorControls}
          <Placeholder
            icon="list-view"
            label={__('Latest Post Types')}
          >
            {!Array.isArray(latestPosts)
              ? <Spinner />
              : __('No posts found.')
            }
          </Placeholder>
        </Fragment>
      );
    }

    // Removing posts from display should be instant.
    const displayPosts = latestPosts.length > postsToShow
      ? latestPosts.slice(0, postsToShow)
      : latestPosts;

    return (
      <Fragment>
        {inspectorControls}
        <ul className={this.props.className}>
          {displayPosts.map((post, i) => (
            <li key={i}>
              <a
                href={post.link}
                target="_blank"
              >
                {decodeEntities(post.title.rendered.trim()) || __('(Untitled)')}
              </a>

              {displayPostDate && post.date_gmt && (
                <time
                  dateTime={moment(post.date_gmt).utc().format()}
                  className={`${this.props.className}-post-date`}
                >
                  {moment(post.date_gmt).local().format('MMMM DD, Y')}
                </time>
              )}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default withAPIData((props) => {
  const { postsToShow, order, orderBy, postType } = props.attributes;
  const latestPostsQuery = stringify(pickBy({
    post_type: postType,
    order,
    orderby: orderBy,
    per_page: postsToShow,
    _fields: ['date_gmt', 'link', 'title'],
  }, value => value != null));

  return {
    postTypeList: '/wp/v2/types',
    latestPosts: `/wp/v2/${getPostTypeSlugToApi(postType)}?${latestPostsQuery}`,
  };
})(LatestPostItemsEdit);
