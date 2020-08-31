import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import { getMarginSettingStyles } from '../../../components/controls/margin-controls/margin-settings';
import { Icon, attributes } from '../../icon/deprecated/v1';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';

const IconBox = ({ className, attributes }) => {
  const {
    titleNodeLevel,
    titleContent,
    titleFontSize,
    textContent,
    textFontSize,
    align,
    contentAlign,
    blockMargin,
    iconMargin,
  } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
        [`${className}-align-${align}`]: true,
        [`${className}-content-align-${contentAlign}`]: !!contentAlign,
      })}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
      <Icon
        {...{
          ...attributes,
          blockMargin: iconMargin,
        }}
      />
      <div className={`${className}-content`}>
        {!RichText.isEmpty(titleContent) && (
          <RichText.Content
            tagName={`h${titleNodeLevel}`}
            value={titleContent}
            className={`${className}-title`}
            style={{
              fontSize: titleFontSize ? `${titleFontSize}px` : undefined,
            }}
          />
        )}

        {!RichText.isEmpty(textContent) && (
          <RichText.Content
            tagName="p"
            value={textContent}
            className={`${className}-text`}
            style={{
              fontSize: textFontSize ? `${textFontSize}px` : undefined,
            }}
          />
        )}
      </div>
    </div>
  );
};

const deprecated = {
  attributes: {
    ...attributes,
    titleContent: {
      source: 'html',
      selector: 'h1,h2,h3,h4,h5,h6',
      default: '',
    },
    titleNodeLevel: {
      type: 'number',
      default: 3,
    },
    titleFontSize: {
      type: 'number',
      default: null,
    },
    textContent: {
      source: 'html',
      selector: 'p',
      default: '',
    },
    textFontSize: {
      type: 'number',
      default: 16,
    },
    align: {
      type: 'string',
      default: 'left',
    },
    contentAlign: {
      type: 'string',
      default: null,
    },
    blockMargin: {
      type: 'object',
      default: {},
    },
    iconMargin: {
      type: 'object',
      default: {},
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
      uniqueId: undefined,
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
      blockPadding: getDefaultSpacingValue(),
      iconMargin: {
        desktop: {
          top: attributes.iconMargin.top || '',
          right: attributes.iconMargin.right || '',
          bottom: attributes.iconMargin.bottom || '',
          left: attributes.iconMargin.left || '',
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
      iconPadding: getDefaultSpacingValue(),
    };
  },
  save({ className, attributes }) {
    return <IconBox className={className} attributes={attributes} />;
  },
};

export default deprecated;
