import { Fragment } from 'wp.element';
import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';

import getBlockId from '../../util/getBlockId';
import { getDefaultResponsiveValue } from '../../components/controls/responsive-control/default-values';
import SpacerStyle from './style';
import SpacerEdit from './edit';

registerBlockType('gutenbee/spacer', {
  title: __('GutenBee Spacer'),
  description: __('Add white space between blocks and customize its height.'),
  icon: 'S',
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
  },
  edit: SpacerEdit,
  save: ({ attributes }) => {
    const { uniqueId } = attributes;

    const blockId = getBlockId(uniqueId);

    return (
      <Fragment>
        <SpacerStyle attributes={attributes} />
        <div id={blockId} className="wp-block-gutenbee-spacer" aria-hidden />
      </Fragment>
    );
  },
});
