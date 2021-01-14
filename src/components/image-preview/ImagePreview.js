import PropTypes from 'prop-types';

const propTypes = {
  src: PropTypes.string,
  onDismiss: PropTypes.func,
};

const ImagePreview = ({ src, onDismiss }) => {
  return src ? (
    <div className="gutenbee-image-preview">
      {onDismiss && (
        <button className="gutenbee-image-preview-dismiss" onClick={onDismiss}>
          &times;
        </button>
      )}

      <img src={src} alt="" className="gutenbee-image-preview-img" />
    </div>
  ) : null;
};

ImagePreview.propTypes = propTypes;

export default ImagePreview;
