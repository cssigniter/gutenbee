/**
 * Column block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import ColumnBlockEdit from './edit';
import getBlockId from '../../../util/getBlockId';
import ColumnStyle from './style';
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import Rule from '../../../components/stylesheet/Rule';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import ColumnBlockIcon from './block-icon';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';

registerBlockType('gutenbee/column', {
  title: __('GutenBee Column'),
  category: 'gutenbee',
  description: __('A single column within a container block.'),
  icon: ColumnBlockIcon,
  supports: {
    inserter: false,
    reusable: false,
    html: false,
    anchor: false,
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
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    verticalContentAlignment: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    horizontalContentAlignment: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
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
  save({ attributes, className }) {
    const {
      width,
      uniqueId,
      textColor,
      backgroundColor,
      backgroundImage,
    } = attributes;

    return (
      <div
        id={getBlockId(uniqueId)}
        className={classNames(className, {
          'wp-block-gutenbee-column': true,
        })}
      >
        <ColumnStyle attributes={attributes}>
          <Rule value={width} rule="{ flex-basis: %s; }" unit="%" />
        </ColumnStyle>

        <div
          className="wp-block-gutenbee-column-content"
          style={{
            color: textColor,
            backgroundColor,
            ...getBackgroundImageStyle(backgroundImage),
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
        >
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
});
