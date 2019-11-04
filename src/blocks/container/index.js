/**
 * Container block
 */

import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import ContainerBlockEdit from './edit';
import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
import ContainerStyle from './style';
import ContainerBlockIcon from './block-icon';
import getBlockId from '../../util/getBlockId';

registerBlockType('gutenbee/container', {
  title: __('Container'),
  description: __('A versatile container for your blocks.'),
  icon: ContainerBlockIcon,
  category: 'gutenbee',
  keywords: [__('container'), __('wrapper'), __('row'), __('section')],
  supports: {
    align: ['wide', 'full'],
    anchor: true,
    html: false,
  },
  isMultiBlock: true,
  attributes: {
    uniqueId: {
      type: 'string',
    },
    gutter: {
      type: 'string',
      default: 'md',
    },
    columnDirection: {
      type: 'object',
      default: {
        desktop: 'row',
        tablet: 'row',
        mobile: 'row',
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
    wideAlign: {
      type: 'boolean',
      default: false,
    },
    containerHeight: {
      type: 'object',
      default: {
        desktop: '',
        tablet: '',
        mobile: '',
      },
    },
    innerContentWidth: {
      type: 'object',
      default: {
        desktop: -1,
        tablet: -1,
        mobile: -1,
      },
    },
    verticalContentAlignment: {
      type: 'string',
      default: 'center',
    },
    horizontalContentAlignment: {
      type: 'string',
      default: 'flex-start',
    },
  },
  edit: ContainerBlockEdit,
  save: ({ attributes }) => {
    const {
      uniqueId,
      textColor,
      backgroundColor,
      backgroundImage,
      verticalContentAlignment,
      horizontalContentAlignment,
      gutter,
    } = attributes;

    const { parallax, parallaxSpeed } = backgroundImage;

    return (
      <Fragment>
        <ContainerStyle attributes={attributes} />

        <div
          id={getBlockId(uniqueId)}
          className="wp-block-gutenbee-container"
          style={{
            color: textColor,
            justifyContent: horizontalContentAlignment,
            alignItems: verticalContentAlignment,
          }}
        >
          <div className="wp-block-gutenbee-container-inner">
            <div
              className={classNames({
                'wp-block-gutenbee-container-row': true,
                [`wp-block-gutenbee-container-${gutter}`]: true,
              })}
            >
              <InnerBlocks.Content />
            </div>
          </div>
          <div
            className={classNames({
              'wp-block-gutenbee-container-background': true,
              'gutenbee-parallax': parallax,
            })}
            data-parallax-speed={parallaxSpeed}
            style={{
              backgroundColor,
              ...getBackgroundImageStyle(backgroundImage),
            }}
          />
        </div>
      </Fragment>
    );
  },
});
