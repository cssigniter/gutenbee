/**
 * Container block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.editor';
import classNames from 'classnames';

import ContainerBlockEdit from './edit';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';
import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';

registerBlockType('gutenbee/container', {
  title: __('Container'),
  description: __('A versatile container for your blocks.'),
  // TODO add icon
  icon: 'minus',
  category: 'gutenbee',
  keywords: [__('container'), __('wrapper'), __('row'), __('section')],
  supports: {
    align: ['wide', 'full'],
    anchor: true,
    html: false,
  },
  isMultiBlock: true,
  attributes: {
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
      default: {},
    },
    blockMargin: {
      type: 'object',
      default: {},
    },
    wideAlign: {
      type: 'boolean',
      default: false,
    },
    containerHeight: {
      type: 'number',
    },
    innerContentWidth: {
      type: 'number',
      default: 100,
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
  save: ({ attributes, className }) => {
    const {
      containerHeight,
      innerContentWidth,
      textColor,
      backgroundColor,
      backgroundImage,
      blockPadding,
      blockMargin,
      wideAlignment,
      verticalContentAlignment,
      horizontalContentAlignment,
    } = attributes;

    const height = (() => {
      if (containerHeight == null) {
        return undefined;
      }

      return containerHeight === -1 ? '100vh' : `${containerHeight}px`;
    })();

    const { parallax, parallaxSpeed } = backgroundImage;

    return (
      <div
        className={className}
        style={{
          margin: getMarginSettingStyles(blockMargin),
          padding: getMarginSettingStyles(blockPadding),
          color: textColor,
          height,
          justifyContent: horizontalContentAlignment,
          alignItems: verticalContentAlignment,
        }}
      >
        <div
          className="wp-block-gutenbee-container-inner"
          style={{
            width: innerContentWidth ? `${innerContentWidth}%` : undefined,
          }}
        >
          <InnerBlocks.Content />
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
    );
  },
});
