import { Fragment } from 'wp.element';
import { RichText, getColorClassName } from 'wp.blockEditor';
import classNames from 'classnames';

import Rule from '../../../components/stylesheet/Rule';
import getBlockId from '../../../util/getBlockId';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';

const ParagraphStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, fontSize } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule value={fontSize} rule="{ font-size: %s; }" unit="px" />

      {children}
    </StyleSheetV1>
  );
};

const v1 = {
  supports: {
    className: true,
    anchor: false,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    align: {
      type: 'string',
    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'p',
      default: '',
    },
    dropCap: {
      type: 'boolean',
      default: false,
    },
    placeholder: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    customBackgroundColor: {
      type: 'string',
    },
    fontSize: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
  },
  migrate(attributes) {
    return {
      ...attributes,
      align: getDefaultResponsiveValue({
        desktop: attributes.align,
        tablet: '',
        mobile: '',
      }),
    };
  },
  save: ({ attributes }) => {
    const {
      uniqueId,
      align,
      content,
      dropCap,
      backgroundColor,
      textColor,
      customBackgroundColor,
      customTextColor,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    const textClass = getColorClassName('color', textColor);
    const backgroundClass = getColorClassName(
      'background-color',
      backgroundColor,
    );

    const className = classNames({
      'has-text-color': textColor || customTextColor,
      'has-drop-cap': dropCap,
      [`has-text-align-${align}`]: align,
      [textClass]: textClass,
      [backgroundClass]: backgroundClass,
    });

    const styles = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor,
    };

    return (
      <Fragment>
        <ParagraphStyle attributes={attributes} />

        <RichText.Content
          id={blockId}
          tagName="p"
          style={styles}
          className={className ? className : undefined}
          value={content}
        />
      </Fragment>
    );
  },
};

export default v1;
