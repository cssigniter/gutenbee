import { unregisterBlockType } from 'wp.blocks';

export const blocks = [
  'accordion',
  'banner',
  'buttons',
  'container',
  'countdown',
  'countup',
  'divider',
  'food-menu',
  'heading',
  'icon',
  'iconbox',
  'icon-list',
  'image',
  'imagebox',
  'image-comparison',
  'justified-gallery',
  'paragraph',
  'post-types',
  'progress-bar',
  'review',
  'spacer',
  'slideshow',
  'tab-slider',
  'tabs',
  'testimonial',
  'video',
  'video-embed',
  'google-maps',
  // 'lottie',
];

// Deactivate blocks based on user settings (GutenBee options page)
blocks.forEach(block => {
  if (__GUTENBEE_SETTINGS__[`active_${block}`] !== '1') {
    unregisterBlockType(`gutenbee/${block}`);
  }
});
