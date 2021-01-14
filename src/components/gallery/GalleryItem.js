import { useRef, useEffect } from 'wp.element';
import classNames from 'classnames';
import { Button, Spinner } from 'wp.components';
import { __ } from 'wp.i18n';
import { BACKSPACE, DELETE } from 'wp.keycodes';
import { withSelect } from 'wp.data';

const GalleryItem = ({
  image,
  url,
  alt,
  id,
  isSelected,
  onRemove,
  onSelect,
  setAttributes,
}) => {
  const ref = useRef();

  const onImageClick = () => {
    if (!isSelected) {
      onSelect();
    }
  };

  const onKeyDown = event => {
    if (
      ref.current === document.activeElement &&
      isSelected &&
      [BACKSPACE, DELETE].includes(event.keyCode)
    ) {
      event.stopPropagation();
      event.preventDefault();
      onRemove();
    }
  };

  useEffect(
    () => {
      if (image && !url) {
        setAttributes({
          url: image.source_url,
          alt: image.alt_text,
        });
      }
    },
    [image, url],
  );

  const img = url ? (
    <img src={url} alt={alt} data-id={id} onClick={onImageClick} />
  ) : (
    <Spinner />
  );

  const className = classNames({
    'is-selected': isSelected,
    'is-transient': url && url.indexOf('blob:') === 0,
  });

  return (
    <figure className={className} tabIndex="-1" onKeyDown={onKeyDown} ref={ref}>
      {isSelected && (
        <div className="gutenbee-gallery-item-inline-menu">
          <Button
            icon="trash"
            onClick={onRemove}
            className="gutenbee-gallery-item-remove"
            label={__('Remove Image')}
          />
        </div>
      )}
      {img}
    </figure>
  );
};

export default withSelect((select, ownProps) => {
  const { getMedia } = select('core');
  const { id } = ownProps;

  return {
    image: id ? getMedia(id) : null,
  };
})(GalleryItem);
