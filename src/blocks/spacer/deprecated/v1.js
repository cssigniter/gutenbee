import {
  getDefaultBackgroundImageValue,
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import SpacerStyle from '../style';
import getBlockId from '../../../util/getBlockId';

export default {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    height: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 100 }),
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
      blockMargin: getDefaultSpacingValue(),
      backgroundColor: undefined,
      backgroundImage: getDefaultBackgroundImageValue(),
    };
  },
  save: ({ attributes, className }) => {
    const { uniqueId } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div id={blockId} className={className} aria-hidden>
        <SpacerStyle attributes={attributes} />
      </div>
    );
  },
};
