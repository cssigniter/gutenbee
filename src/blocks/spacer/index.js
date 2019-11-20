import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';

import getBlockId from '../../util/getBlockId';
import { getDefaultResponsiveValue } from '../../components/controls/responsive-control/default-values';
import SpacerStyle from './style';
import SpacerEdit from './edit';
import SpacerBlockIcon from './block-icon';

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
  },
  edit: SpacerEdit,
  save: ({ attributes, className }) => {
    const { uniqueId } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div id={blockId} className={className} aria-hidden>
        <SpacerStyle attributes={attributes} />
      </div>
    );
  },
});
