import { getMarginSettingStyles } from '../../../components/controls/margin-controls/margin-settings';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';

const v1 = {
  attributes: {
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
    blockMargin: {
      type: 'object',
      default: {},
    },
    imageSize: {
      type: 'string',
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
      uniqueId: undefined,
      backgroundColor: undefined,
      blockPadding: getDefaultSpacingValue(),
      blockMargin: {
        desktop: {
          top: attributes.blockMargin.top || '',
          right: attributes.blockMargin.right || '',
          bottom: attributes.blockMargin.bottom || '',
          left: attributes.blockMargin.left || '',
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
    };
  },
  save: ({ className, attributes }) => {
    const { urlA, urlB, offset, blockMargin } = attributes;

    return (
      <div
        className={className}
        data-offset={offset}
        style={{
          margin: getMarginSettingStyles(blockMargin),
        }}
      >
        {urlA && <img className="img-1" src={urlA} alt="" />}
        {urlB && <img className="img-2" src={urlB} alt="" />}
      </div>
    );
  },
};

export default v1;
