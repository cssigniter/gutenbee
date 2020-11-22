import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import classNames from 'classnames';

import getBlockId from '../../util/getBlockId';
import {
  getDefaultBackgroundImageValue,
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import SpacerStyle from './style';
import SpacerEdit from './edit';
import SpacerBlockIcon from './block-icon';
import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
import deprecated from './deprecated';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';

registerBlockType('gutenbee/spacer', {
  title: __('GutenBee Spacer'),
  description: __('Add white space between blocks and customize its height.'),
  icon: SpacerBlockIcon,
  category: 'gutenbee',
  keywords: [__('spacer'), __('spacing'), __('distance')],
  supports: {
    anchor: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    height: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 100 }),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    backgroundColor: {
      type: 'string',
    },
    backgroundImage: {
      type: 'object',
      default: getDefaultBackgroundImageValue(),
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  edit: SpacerEdit,
  deprecated,
  save: ({ attributes, className }) => {
    const { uniqueId, backgroundColor, backgroundImage } = attributes;
    const blockId = getBlockId(uniqueId);
    const { parallax, parallaxSpeed } = backgroundImage;

    return (
      <div
        id={blockId}
        className={classNames(className, blockId, {
          'has-parallax': parallax,
        })}
        style={{
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        aria-hidden
      >
        <SpacerStyle attributes={attributes} />

        <div
          className={classNames({
            'wp-block-gutenbee-spacer-background': true,
            'gutenbee-parallax': parallax,
          })}
          data-parallax-speed={parallaxSpeed}
          style={{
            backgroundColor: backgroundColor || undefined,
            ...getBackgroundImageStyle(backgroundImage),
          }}
        />
      </div>
    );
  },
});
