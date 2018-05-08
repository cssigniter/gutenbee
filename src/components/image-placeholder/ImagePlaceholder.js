import { __ } from 'wp.i18n';
import { Placeholder, Button } from 'wp.components';
import { MediaUpload } from 'wp.editor';

const ImagePlaceholder = ({
  className,
  icon,
  label,
  onSelectImage,
  multiple = false,
}) => (
  <Placeholder
    className={className}
    instructions={multiple
      ? __('Add images from media library')
      : __('Add image from media library')}
    icon={icon}
    label={label}
  >
    <MediaUpload
      gallery={multiple}
      multiple={multiple}
      onSelect={onSelectImage}
      type="image"
      render={({ open }) => (
        <Button isLarge onClick={open}>
          {multiple
            ? __('Select Images')
            : __('Select Image')}
        </Button>
      )}
    />
  </Placeholder>
);

export default ImagePlaceholder;
