import { Fragment } from 'wp.element';
import { RichText, getColorClassName } from 'wp.blockEditor';
import classNames from 'classnames';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const ParagraphStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, fontSize, align } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule value={fontSize} rule="{ font-size: %s; }" unit="px" />
      <Rule value={align} rule="{ text-align: %s; }" unit="" />

      {children}
    </StyleSheetV1>
  );
};

const v2 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    align: {
      type: 'object',
      default: getDefaultResponsiveValue(),
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
      default: {
        desktop: '',
        tablet: '',
        mobile: '',
      },
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
  },
  migrate: attributes => {
    return {
      ...attributes,
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
    };
  },
  save: ({ attributes }) => {
    const {
      uniqueId,
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
      [textClass]: textClass,
      [backgroundClass]: backgroundClass,
    });

    const styles = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor,
      ...getBorderCSSValue({ attributes }),
      ...getBoxShadowCSSValue({ attributes }),
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

export default v2;
