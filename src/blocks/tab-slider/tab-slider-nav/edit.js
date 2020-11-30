import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';
import { useSelect, useDispatch } from 'wp.data';
import { BlockControls } from 'wp.blockEditor';
import { Toolbar, Button } from 'wp.components';

import getBlockId from '../../../util/getBlockId';
import useUniqueId from '../../../hooks/useUniqueId';

const TabSliderNavEdit = ({
  attributes,
  setAttributes,
  className,
  clientId,
}) => {
  const { uniqueId } = attributes;
  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  const { contentSibling } = useSelect(select => {
    const parentNavColumn = select(
      'core/block-editor',
    ).getBlockParentsByBlockName(clientId, 'gutenbee/tab-slider-nav-column');
    const parentAdjacentColumn = select(
      'core/block-editor',
    ).getAdjacentBlockClientId(parentNavColumn[0]);

    const parentAdjacentBlock = select('core/block-editor').getBlock(
      parentAdjacentColumn,
    );
    const navItemIndex = select('core/block-editor').getBlockIndex(
      clientId,
      parentNavColumn,
    );

    let contentSibling = null;
    parentAdjacentBlock['innerBlocks'].forEach(block => {
      const currentBlockIndex = select('core/block-editor').getBlockIndex(
        block.clientId,
        parentAdjacentColumn,
      );

      if (currentBlockIndex === navItemIndex) {
        contentSibling = block;
      }
    });

    return {
      contentSibling: contentSibling.clientId,
    };
  });

  const { removeBlock } = useDispatch('core/block-editor');

  return (
    <Fragment>
      <div id={blockId} className={classNames(className, blockId)}>
        <InnerBlocks
          allowedBlocks={['gutenbee/heading', 'gutenbee/paragraph']}
          template={[['gutenbee/heading'], ['gutenbee/paragraph']]}
          templateLock={false}
        />
      </div>
      <BlockControls>
        <Toolbar>
          <Button
            className={classNames(
              'components-icon-button components-toolbar__control',
            )}
            label={__('Remove Tab')}
            onClick={() => {
              removeBlock(clientId);
              removeBlock(contentSibling);
            }}
            icon="trash"
          />
        </Toolbar>
      </BlockControls>
    </Fragment>
  );
};

export default TabSliderNavEdit;
