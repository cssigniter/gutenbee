/**
 * Progress Bar block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';

import ImageComparisonEdit from './edit';
import ImageComparisonBlockIcon from './block-icon';

registerBlockType('gutenbee/image-comparison', {
  title: __('GutenBee Image Comparison'),
  description: __('Highlight the differences between two images.'),
  icon: ImageComparisonBlockIcon,
  category: 'gutenbee',
  keywords: [
    __('image comparison'),
    __('comparison'),
    __('diff'),
  ],
  attributes: {
    urlA: {
      type: 'string',
      source: 'attribute',
      selector: '.img-1',
      attribute: 'src',
    },
    idA: {
      type: 'number',
    },
    urlB: {
      type: 'string',
      source: 'attribute',
      selector: '.img-2',
      attribute: 'src',
    },
    idB: {
      type: 'number',
    },
    offset: {
      type: 'number',
      default: 50,
    },
  },
  edit: ImageComparisonEdit,
  save: ({ className, attributes }) => {
    const {
      urlA,
      urlB,
      offset,
    } = attributes;

    return (
      <div className={className} data-offset={offset}>
        {urlA && <img className="img-1" src={urlA} alt="" />}
        {urlB && <img className="img-2" src={urlB} alt="" />}
      </div>
    );
  },
});
