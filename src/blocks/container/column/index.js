/**
 * Column block
 */

import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.blockEditor';

import ColumnBlockEdit from './edit';
import getBlockId from '../../../util/getBlockId';
import ColumnStyle from './style';
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import Rule from '../../../components/stylesheet/Rule';

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
    verticalContentAlignment: {
      type: 'string',
      default: '',
    },
    horizontalContentAlignment: {
      type: 'string',
      default: '',
    },
  },
  getEditWrapperProps(attributes) {
    const { width } = attributes;

    if (Number.isFinite(width.desktop)) {
      return {
        style: {
          flexBasis: `${width.desktop}%`,
        },
      };
    }
  },
  edit: ColumnBlockEdit,
  save({ attributes }) {
    const {
      width,
      uniqueId,
      textColor,
      backgroundColor,
      backgroundImage,
    } = attributes;

    return (
      <Fragment>
        <ColumnStyle attributes={attributes}>
          <Rule value={width} rule="{ flex-basis: %s; }" unit="%" />
        </ColumnStyle>

        <div id={getBlockId(uniqueId)} className="wp-block-gutenbee-column">
          <div
            className="wp-block-gutenbee-column-content"
            style={{
              color: textColor,
              backgroundColor,
              ...getBackgroundImageStyle(backgroundImage),
            }}
          >
            <InnerBlocks.Content />
          </div>
        </div>
      </Fragment>
    );
  },
});
