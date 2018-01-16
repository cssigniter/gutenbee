/* global wp */

const { __ } = wp.i18n;
const { Component } = wp.element;
const {
  MediaUploadButton,
} = wp.blocks;
const {
  DropZone,
  FormFileUpload,
  Placeholder,
} = wp.components;
const { mediaUpload } = wp.utils;

class Image extends Component {
  onSelectImage = media =>
    this.props.setAttributes({
      imageId: media.id,
      url: media.url,
      alt: media.alt,
    });

  onUploadFromFiles = event =>
    mediaUpload(event.target.files, this.props.setAttributes);

  onDropFiles = files =>
    mediaUpload(files, this.props.setAttributes);

  render() {
    const { attributes } = this.props;
    const { url, alt } = attributes;

    return !url ? (
      <Placeholder
        instructions={__('Upload an image or choose')}
        icon="format-image"
        label={__('Image')}
        style={{
          margin: '10px 0',
        }}
      >
        <DropZone onFilesDrop={this.onDropFiles} />
        <FormFileUpload
          isLarge
          className="wp-block-image__upload-button"
          accept="image/*"
          onChange={this.onUploadFromFiles}
        >
          {__('Upload')}
        </FormFileUpload>
        <MediaUploadButton
          buttonProps={{
            isLarge: true,
          }}
          onSelect={this.onSelectImage}
          type="image"
        >
          {__('Insert from Media Library')}
        </MediaUploadButton>
      </Placeholder>
    ) : (
      <figure
        style={{
          margin: '10px 0',
        }}
      >
        <img src={url} alt={alt || ''} />
      </figure>
    );
  }
}

export default Image;
