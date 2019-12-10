import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { RichText } from 'wp.blockEditor';

import VideoEdit from './edit';
import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import VideoStyle from './style';
import VideoBlockIcon from './block-icon';

registerBlockType('gutenbee/video', {
  title: __('GutenBee Video'),
  description: __('Embed a video from your media library or upload a new one.'),
  icon: VideoBlockIcon,
  category: 'gutenbee',
  keywords: [__('video'), __('movie')],
  supports: {
    anchor: false,
    align: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    autoplay: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'autoplay',
    },
    caption: {
      type: 'string',
      source: 'html',
      selector: 'figcaption',
    },
    controls: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'controls',
      default: true,
    },
    id: {
      type: 'number',
    },
    loop: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'loop',
    },
    muted: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'muted',
    },
    poster: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'poster',
    },
    preload: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'preload',
      default: 'metadata',
    },
    src: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'src',
    },
    playsInline: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'playsinline',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
  },
  edit: VideoEdit,
  save: ({ attributes }) => {
    const {
      uniqueId,
      autoplay,
      caption,
      controls,
      loop,
      muted,
      poster,
      preload,
      src,
      playsInline,
    } = attributes;
    return (
      <figure id={getBlockId(uniqueId)}>
        <VideoStyle attributes={attributes} />
        {src && (
          <video
            autoPlay={autoplay}
            controls={controls}
            loop={loop}
            muted={muted}
            poster={poster}
            preload={preload !== 'metadata' ? preload : undefined}
            src={src}
            playsInline={playsInline}
          />
        )}
        {!RichText.isEmpty(caption) && (
          <RichText.Content tagName="figcaption" value={caption} />
        )}
      </figure>
    );
  },
});
