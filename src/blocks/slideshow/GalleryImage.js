import classnames from 'classnames';
import { Component } from 'wp.element';
import { IconButton, withAPIData, Spinner } from 'wp.components';
import { __ } from 'wp.i18n';
import { keycodes } from 'wp.utils';

const { BACKSPACE, DELETE } = keycodes;

class GalleryImage extends Component {
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

  componentWillReceiveProps({ image }) {
    if (image && image.data && !this.props.url) {
      this.props.setAttributes({
        url: image.data.source_url,
        alt: image.data.alt_text,
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
    case 'media':
      href = url;
      break;
    case 'attachment':
      href = link;
      break;
    default:
      break;
    }

    const img = url
      ? <img src={url} alt={alt} data-id={id} onClick={this.onImageClick} />
      : <Spinner />;

    const className = classnames({
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
          <div className="blocks-gallery-item__inline-menu">
            <IconButton
              icon="no-alt"
              onClick={onRemove}
              className="blocks-gallery-item__remove"
              label={__('Remove Image')}
            />
          </div>
        )}
        {href ? <a href={href}>{img}</a> : img}
      </figure>
    );
  }
}

export default withAPIData(({ id }) => ({
  image: id ? `/wp/v2/media/${id}` : {},
}))(GalleryImage);
