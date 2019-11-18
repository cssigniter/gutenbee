import { __, sprintf } from 'wp.i18n';
import {
  BlockAlignmentToolbar,
  BlockControls,
  BlockIcon,
  InspectorControls,
  InspectorAdvancedControls,
  MediaPlaceholder,
  URLPopover,
  RichText,
} from 'wp.blockEditor';

import useUniqueId from '../../hooks/useUniqueId';
import getBlockId from '../../util/getBlockId';

const ImageEdit = ({ attributes, setAttributes, clientId }) => {
  const { uniqueId, id, url } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const blockId = getBlockId(uniqueId);

  const labels = {
    title: !url ? __('Image') : __('Edit image'),
    instructions: __('Pick an image file from your media library.'),
  };

  const onImageSelect = () => {};

  const mediaPreview = !!url && (
    <img
      alt={__('Edit image')}
      title={__('Edit image')}
      className={'edit-image-preview'}
      src={url}
    />
  );

  return (
    <div>
      <MediaPlaceholder
        icon="format-image"
        labels={labels}
        onSelect={onImageSelect}
        allowedTypes={['image']}
        value={{ id, src: url }}
        mediaPreview={mediaPreview}
        disableMediaButtons={false}
      />
    </div>
  );
};

export default ImageEdit;
