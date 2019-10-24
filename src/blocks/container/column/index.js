/**
 * Column block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.editor';

import ColumnBlockEdit from './edit';
import getBlockId from '../../../util/getBlockId';

registerBlockType('gutenbee/column', {
  title: __('Column'),
  category: 'gutenbee',
  description: __('A single column within a container block'),
  supports: {
    inserter: false,
    reusable: false,
    html: false,
  },
  attributes: {
    uniqueId: {
      type: 'string',
      default: '',
    },
    width: {
      type: 'object',
      default: {
        desktop: '',
        tablet: 100,
        mobile: 100,
      },
    },
    textColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    backgroundImage: {
      type: 'object',
      default: {
        url: '',
        image: null,
        repeat: 'no-repeat',
        size: 'cover',
        position: 'top center',
        attachment: 'scroll',
        parallax: false,
        parallaxSpeed: 0.3,
      },
    },
    blockPadding: {
      type: 'object',
      default: {
        desktop: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
    },
    blockMargin: {
      type: 'object',
      default: {
        desktop: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
    },
  },
  getEditWrapperProps(attributes) {
    const { width } = attributes;

    if (Number.isFinite(width.desktop)) {
      return {
        style: {
          width: `${width.desktop}%`,
        },
      };
    }
  },
  edit: ColumnBlockEdit,
  save({ attributes }) {
    const { uniqueId } = attributes;

    return (
      <div id={getBlockId(uniqueId)}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
