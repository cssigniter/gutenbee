import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import { getMarginSettingStyles } from '../../../components/controls/margin-controls/margin-settings';

const ImageBox = ({ className, attributes }) => {
  const {
    titleContent,
    titleNodeLevel,
    titleFontSize,
    textContent,
    textFontSize,
    url,
    alt,
    imageAlign,
    imageWidth,
    contentAlign,
    blockMargin,
    imageMargin,
  } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
        [`${className}-align-${imageAlign}`]: true,
        [`${className}-content-align-${contentAlign}`]: !!contentAlign,
      })}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
      <figure
        className={`${className}-figure`}
        style={{
          margin: getMarginSettingStyles(imageMargin),
        }}
      >
        <img
          src={url}
          alt={alt}
          style={{
            width: imageWidth ? `${imageWidth}px` : undefined,
          }}
        />
      </figure>

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

const v1 = {
  attributes: {
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
    url: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
    },
    alt: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'alt',
      default: '',
    },
    id: {
      type: 'number',
    },
    imageAlign: {
      type: 'string',
      default: 'left',
    },
    imageWidth: {
      type: 'number',
      default: 160,
    },
    contentAlign: {
      type: 'string',
      default: null,
    },
    blockMargin: {
      type: 'object',
      default: {},
    },
    imageMargin: {
      type: 'object',
      default: {},
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
      uniqueId: undefined,
      titleBottomSpacing: null,
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
      imageMargin: {
        desktop: {
          top: attributes.imageMargin.top || '',
          right: attributes.imageMargin.right || '',
          bottom: attributes.imageMargin.bottom || '',
          left: attributes.imageMargin.left || '',
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
  save({ className, attributes }) {
    return <ImageBox className={className} attributes={attributes} />;
  },
};

export default v1;
