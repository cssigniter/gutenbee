import classNames from 'classnames';
import { Component } from 'wp.element';
import { IconButton, Spinner } from 'wp.components';
import { __ } from 'wp.i18n';
import { keycodes } from 'wp.utils';
import { withSelect } from 'wp.data';

import { LINKTO } from './constants';

const { BACKSPACE, DELETE } = keycodes;

class GalleryItem extends Component {
  onImageClick = () => {
    if (!this.props.isSelected) {
      this.props.onSelect();
    }
  };

  onKeyDown = (event) => {
    if (
      this.container === document.activeElement &&
      this.props.isSelected && [BACKSPACE, DELETE].includes(event.keyCode)
    ) {
      event.stopPropagation();
      event.preventDefault();
      this.props.onRemove();
    }
  };

  componentWillReceiveProps({ image, url }) {
    if (image && !url) {
      this.props.setAttributes({
        url: image.source_url,
        alt: image.alt_text,
      });
    }
  }

  render() {
    const {
      url,
      alt,
      id,
      linkTo,
      link,
      isSelected,
      onRemove,
    } = this.props;

    let href;

    switch (linkTo) {
      case LINKTO.MEDIA:
        href = url;
        break;
      case LINKTO.ATTACHMENT:
        href = link;
        break;
      default:
        break;
    }

    const img = url
      ? <img src={url} alt={alt} data-id={id} onClick={this.onImageClick} />
      : <Spinner />;

    const className = classNames({
      'is-selected': isSelected,
      'is-transient': url && url.indexOf('blob:') === 0,
    });

    return (
      <figure
        className={className}
        tabIndex="-1"
        onKeyDown={this.onKeyDown}
        ref={(ref) => {
          this.container = ref;
        }}
      >
        {isSelected && (
          <div className="gutenbee-gallery-item-inline-menu">
            <IconButton
              icon="no-alt"
              onClick={onRemove}
              className="gutenbee-gallery-item-remove"
              label={__('Remove Image')}
            />
          </div>
        )}
        {href ? <a href={href}>{img}</a> : img}
      </figure>
    );
  }
}

export default withSelect((select, ownProps) => {
  const { getMedia } = select('core');
  const { id } = ownProps;

  return {
    image: id ? getMedia(id) : null,
  };
})(GalleryItem);
