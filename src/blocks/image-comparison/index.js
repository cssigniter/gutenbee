/**
 * Image Comparison block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import { useBlockProps } from 'wp.blockEditor';
import classNames from 'classnames';

import ImageComparisonEdit from './edit';
import ImageComparisonBlockIcon from './block-icon';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import ImageComparisonStyle from './style';
import deprecated from './deprecated';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../components/controls/animation-controls/helpers';

registerBlockType('gutenbee/image-comparison', {
  apiVersion: 3,
  title: __('GutenBee Image Comparison'),
  description: __('Highlight the differences between two images.'),
  icon: ImageComparisonBlockIcon,
  category: 'gutenbee',
  keywords: [__('image comparison'), __('comparison'), __('diff')],
  supports: {
    anchor: false,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
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
    imageSize: {
      type: 'string',
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    backgroundColor: {
      type: 'string',
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
    blockBreakpointVisibility: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: false,
        tablet: false,
        mobile: false,
      }),
    },
    blockAuthVisibility: {
      type: 'object',
      default: {
        loggedIn: false,
        loggedOut: false,
      },
    },
    ...animationControlAttributes(),
  },
  deprecated,
  edit: ImageComparisonEdit,
  save: ({ attributes }) => {
    const {
      uniqueId,
      urlA,
      urlB,
      offset,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;
    const blockId = getBlockId(uniqueId);
    const blockProps = useBlockProps.save({
      className: classNames(
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
      ),
      id: blockId,
      style: {
        backgroundColor: backgroundColor || undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      },
    });

    return (
      <div
        {...blockProps}
        {...getAnimationControlDataAttributes(attributes.animation)}
      >
        <div className="wp-block-gutenbee-comparison-wrap" data-offset={offset}>
          <ImageComparisonStyle attributes={attributes} />

          {urlA && <img className="img-1" src={urlA} alt="" />}
          {urlB && <img className="img-2" src={urlB} alt="" />}
        </div>
      </div>
    );
  },
});
