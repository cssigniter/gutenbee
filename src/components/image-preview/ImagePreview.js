import { Component } from 'wp.element';
import PropTypes from 'prop-types';

class ImagePreview extends Component {
  static propTypes = {
    src: PropTypes.string,
    onDismiss: PropTypes.func,
  };

  render() {
    const { src, onDismiss } = this.props;

    return src ? (
      <div className="gutenbee-image-preview">
        {onDismiss && (
          <button
            className="gutenbee-image-preview-dismiss"
            onClick={onDismiss}
          >
            &times;
          </button>
        )}

        <img src={src} alt="" className="gutenbee-image-preview-img" />
      </div>
    ) : null;
  }
}

export default ImagePreview;
