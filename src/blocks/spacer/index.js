import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';

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

registerBlockType('gutenbee/spacer', {
  title: __('GutenBee Spacer'),
  description: __('Add white space between blocks and customize its height.'),
  icon: SpacerBlockIcon,
  category: 'gutenbee',
  keywords: [__('spacer'), __('spacing'), __('distance')],
  supports: {
    anchor: false,
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
  },
  edit: SpacerEdit,
  deprecated,
  save: ({ attributes, className }) => {
    const { uniqueId, backgroundColor, backgroundImage } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        className={className}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBackgroundImageStyle(backgroundImage),
        }}
        aria-hidden
      >
        <SpacerStyle attributes={attributes} />
      </div>
    );
  },
});
