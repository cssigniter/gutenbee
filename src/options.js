import { unregisterBlockType } from 'wp.blocks';

export const blocks = [
  'accordion',
  'buttons',
  'container',
  'countdown',
  'countup',
  'divider',
  'heading',
  'icon',
  'iconbox',
  'image',
  'imagebox',
  'image-comparison',
  'justified-gallery',
  'paragraph',
  'post-types',
  'progress-bar',
  'spacer',
  'slideshow',
  'tabs',
  'video',
  'google-maps',
  'lottie',
];

// Deactivate blocks based on user settings (GutenBee options page)
blocks.forEach(block => {
  if (__GUTENBEE_SETTINGS__[`active_${block}`] !== '1') {
    unregisterBlockType(`gutenbee/${block}`);
  }
});
