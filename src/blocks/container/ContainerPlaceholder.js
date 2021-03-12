import { __experimentalBlockVariationPicker as ExperimentalBlockVariationPicker } from 'wp.blockEditor';
import { useSelect, useDispatch } from 'wp.data';

import { createBlocksFromInnerBlocksTemplate } from './utils';

const ContainerPlaceholder = ({ clientId, name, setAttributes }) => {
  const { replaceInnerBlocks } = useDispatch('core/block-editor');

  const { variations, blockType, defaultVariation } = useSelect(
    select => {
      const {
        getBlockVariations,
        getBlockType,
        getDefaultBlockVariation,
      } = select('core/blocks');

      return {
        variations: getBlockVariations(name, 'block'),
        defaultVariation: getDefaultBlockVariation(name, 'block'),
        blockType: getBlockType(name),
      };
    },
    [clientId],
  );

  return (
    <div>
      <ExperimentalBlockVariationPicker
        icon={blockType?.icon?.src}
        label={blockType?.title}
        variations={variations}
        onSelect={(nextVariation = defaultVariation) => {
          if (nextVariation.attributes) {
            setAttributes(nextVariation.attributes);
          }

          if (nextVariation.innerBlocks) {
            replaceInnerBlocks(
              clientId,
              createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks),
            );
          }
        }}
        allowSkip
      />
    </div>
  );
};

export default ContainerPlaceholder;
