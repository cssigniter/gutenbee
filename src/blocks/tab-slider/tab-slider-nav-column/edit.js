import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';
import { useSelect, useDispatch } from 'wp.data';
import { __ } from 'wp.i18n';
import { createBlock } from 'wp.blocks';
import { Button } from 'wp.components';

import getBlockId from '../../../util/getBlockId';
import useUniqueId from '../../../hooks/useUniqueId';

const TabSliderNavColumnEdit = ({
  attributes,
  setAttributes,
  className,
  clientId,
}) => {
  const { uniqueId } = attributes;
  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  const { navBlock, contentBlock } = useSelect(select => {
    const adjacentBlock = select('core/block-editor').getAdjacentBlockClientId(
      clientId,
    );
    const navBlock = select('core/block-editor').getBlock(clientId);
    const contentBlock = select('core/block-editor').getBlock(adjacentBlock);
    return {
      navBlock: navBlock,
      contentBlock: contentBlock,
    };
  });

  const newNav = createBlock('gutenbee/tab-slider-nav');
  const newContent = createBlock('gutenbee/tab-slider-content');
  const { insertBlock } = useDispatch('core/block-editor');

  return (
    <div id={blockId} className={classNames(className, blockId)}>
      <InnerBlocks
        allowedBlocks={['gutenbee/tab-slider-nav']}
        template={[['gutenbee/tab-slider-nav']]}
        templateLock={false}
        renderAppender={() => (
          <Button
            isSecondary
            onClick={() => {
              insertBlock(
                newNav,
                navBlock['innerBlocks'].length,
                navBlock['clientId'],
              );
              insertBlock(
                newContent,
                contentBlock['innerBlocks'].length,
                contentBlock['clientId'],
              );
            }}
          >
            {__('Add Tab', 'gutenbee')}
          </Button>
        )}
      />
    </div>
  );
};

export default TabSliderNavColumnEdit;
