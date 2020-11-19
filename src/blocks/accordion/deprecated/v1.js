import { RichText } from 'wp.blockEditor';

import { getMarginSettingStyles } from '../../../components/controls/margin-controls/margin-settings';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';

const Accordion = ({ className, attributes }) => {
  const {
    tabs,
    blockMargin,
    titleBackgroundColor,
    titleTextColor,
    borderColor,
    collapseOthers,
  } = attributes;

  return (
    <div
      className={className}
      data-collapse-others={collapseOthers}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
      {tabs.map(tab => (
        <div className={`${className}-item`}>
          <div
            className={`${className}-item-title`}
            style={{
              color: titleTextColor || undefined,
              backgroundColor: titleBackgroundColor || undefined,
              borderColor: borderColor || undefined,
            }}
          >
            {tab.title}
          </div>

          <div className={`${className}-item-content-wrap`}>
            <div
              className={`${className}-item-content`}
              style={{
                borderColor: borderColor || undefined,
              }}
            >
              <RichText.Content
                tagName="p"
                value={tab.content}
                className={`${className}-item-text`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const v1 = {
  attributes: {
    tabs: {
      type: 'array',
      default: [
        {
          title: '',
          content: '',
        },
      ],
    },
    collapseOthers: {
      type: 'boolean',
      default: true,
    },
    titleBackgroundColor: {
      type: 'string',
      default: '',
    },
    titleTextColor: {
      type: 'string',
      default: '',
    },
    borderColor: {
      type: 'string',
      default: '',
    },
    blockMargin: {
      type: 'object',
      default: {},
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
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
  save: ({ className, attributes }) => (
    <Accordion className={className} attributes={attributes} />
  ),
};

export default v1;
