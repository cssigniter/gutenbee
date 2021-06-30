import { Fragment } from 'wp.element';
import { RichText, getColorClassName } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';

const ParagraphStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, fontSize, align } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-paragraph.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-paragraph.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={fontSize}
        rule=".wp-block-gutenbee-paragraph.[root] { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={align}
        rule=".wp-block-gutenbee-paragraph.[root] { text-align: %s; }"
        unit=""
      />

      {children}
    </StyleSheet>
  );
};

const v3 = {
  supports: {
    className: true,
    anchor: false,
  },
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
    blockBreakpointVisibility: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: false,
        tablet: false,
        mobile: false,
      }),
    },
    blockAuthVisibility: {
      type: 'object',
      default: {
        loggedIn: false,
        loggedOut: false,
      },
    },
  },
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      content,
      dropCap,
      backgroundColor,
      textColor,
      customBackgroundColor,
      customTextColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    const textClass = getColorClassName('color', textColor);
    const backgroundClass = getColorClassName(
      'background-color',
      backgroundColor,
    );

    const classes = classNames(
      'wp-block-gutenbee-paragraph',
      className,
      blockId,
      getBreakpointVisibilityClassNames(blockBreakpointVisibility),
      getAuthVisibilityClasses(blockAuthVisibility),
      {
        'has-text-color': textColor || customTextColor,
        'has-drop-cap': dropCap,
        [textClass]: textClass,
        [backgroundClass]: backgroundClass,
      },
    );

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
          className={classes}
          tagName="p"
          style={styles}
          value={content}
        />
      </Fragment>
    );
  },
};

export default v3;
