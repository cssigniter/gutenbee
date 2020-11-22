import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';
import { getColorClassName } from 'wp.blockEditor';

import { getMarginSettingStyles } from '../../../components/controls/margin-controls/margin-settings';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import formatNumber from '../../../util/formatNumber';

const Countup = ({
  startNumber,
  endNumber,
  animationDuration,
  separator,
  textFontSize,
  textColor,
  customTextColor,
  prefix,
  suffix,
  className,
}) => {
  const textClass = getColorClassName('color', textColor);
  const classes = classNames({
    [className]: true,
    [textClass]: !!textClass,
  });

  return (
    <span
      className={classes}
      style={{
        fontSize: `${textFontSize}px`,
        color: textClass ? undefined : customTextColor,
      }}
      data-start={startNumber}
      data-end={endNumber}
      data-animation-duration={animationDuration}
      data-separator={separator}
      data-prefix={prefix}
      data-suffix={suffix}
    >
      {formatNumber(startNumber, separator, prefix, suffix)}
    </span>
  );
};

const CountupRender = ({ attributes, className }) => {
  const { titleContent, align, blockMargin } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
        [`${className}-align-${align}`]: !!align,
      })}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
      <Countup {...attributes} className={`${className}-number`} />

      {!RichText.isEmpty(titleContent) && (
        <RichText.Content
          tagName="p"
          value={titleContent}
          className={`${className}-title`}
        />
      )}
    </div>
  );
};

const v1 = {
  attributes: {
    startNumber: {
      type: 'string',
      default: '0',
    },
    endNumber: {
      type: 'string',
      default: '999',
    },
    animationDuration: {
      type: 'number',
      default: 2.5,
    },
    separator: {
      type: 'string',
      default: ',',
    },
    prefix: {
      type: 'string',
    },
    suffix: {
      type: 'string',
    },
    textFontSize: {
      type: 'number',
      default: 16,
    },
    textColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
    },
    titleContent: {
      source: 'html',
      selector: 'p',
    },
    align: {
      type: 'string',
      default: 'left',
    },
    blockMargin: {
      type: 'object',
      default: {},
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
      uniqueId: undefined,
      titleTopMargin: undefined,
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
      titleColor: attributes.titleColor,
      backgroundColor: attributes.backgroundColor,
      textFontSize: getDefaultResponsiveValue({
        desktop: attributes.textFontSize,
      }),
      titleFontSize: getDefaultResponsiveValue({ desktop: 16 }),
    };
  },
  save({ attributes, className }) {
    return <CountupRender attributes={attributes} className={className} />;
  },
};

export default v1;
