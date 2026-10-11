import { __ } from 'wp.i18n';
import { Placeholder, Button } from 'wp.components';
import { MediaUpload } from 'wp.blockEditor';

const ImagePlaceholder = ({
  className,
  icon,
  label,
  onSelectImage,
  multiple = false,
  ...props
}) => (
  <Placeholder
    className={className}
    instructions={
      multiple
        ? __('Add images from media library', 'gutenbee')
        : __('Add image from media library', 'gutenbee')
    }
    icon={icon}
    label={label}
    {...props}
  >
    <MediaUpload
      gallery={multiple}
      multiple={multiple}
      onSelect={onSelectImage}
      allowedTypes={['image']}
      render={({ open }) => (
        <Button variant="secondary" className="is-large" onClick={open}>
          {multiple
            ? __('Select Images', 'gutenbee')
            : __('Select Image', 'gutenbee')}
        </Button>
      )}
    />
  </Placeholder>
);

export default ImagePlaceholder;
