/**
 * Image Comparison block
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';

import ImageComparisonEdit from './edit';
import ImageComparisonBlockIcon from './block-icon';
import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import ImageComparisonStyle from './style';
import deprecated from './deprecated';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';

registerBlockType('gutenbee/image-comparison', {
  title: __('GutenBee Image Comparison'),
  description: __('Highlight the differences between two images.'),
  icon: ImageComparisonBlockIcon,
  category: 'gutenbee',
  keywords: [__('image comparison'), __('comparison'), __('diff')],
  supports: {
    anchor: true,
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
  },
  deprecated,
  edit: ImageComparisonEdit,
  save: ({ className, attributes }) => {
    const { uniqueId, urlA, urlB, offset, backgroundColor } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        className={classNames(className, blockId)}
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
