import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';

import { getMarginSettingStyles } from '../../../components/controls/margin-controls/margin-settings';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';

const Tabs = ({ attributes, className }) => {
  const {
    tabs,
    blockMargin,
    activeTabBackgroundColor,
    activeTabTextColor,
    borderColor,
  } = attributes;

  return (
    <div
      className={className}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
      <div className={`${className}-nav`}>
        {tabs.map((tab, index) => (
          <div
            className={classNames({
              [`${className}-nav-item`]: true,
              [`${className}-nav-item-active`]: index === 0,
            })}
          >
            {tab.title}
          </div>
        ))}
      </div>

      <div
        className={`${className}-tab-content-wrap`}
        style={{
          borderColor: borderColor || undefined,
        }}
      >
        {tabs.map((tab, index) => (
          <div
            className={`${className}-tab-content`}
            style={{
              display: index === 0 ? 'block' : 'none',
            }}
          >
            <RichText.Content tagName="p" value={tab.content} />
          </div>
        ))}
      </div>

      <style>
        {`.${className}-nav-item-active {
            background-color: ${activeTabBackgroundColor};
            color: ${activeTabTextColor};
          }`}
      </style>
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
    activeTabBackgroundColor: {
      type: 'string',
      default: '',
    },
    activeTabTextColor: {
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
    <Tabs className={className} attributes={attributes} />
  ),
};

export default v1;
