import { Children } from 'wp.element';
import { sprintf } from 'wp.i18n';

import {
  getMarginSettingStyles,
  hasAllSpacingSettings,
} from '../controls/margin-controls/margin-settings';

/**
 * @enum BREAKPOINT_NAMES
 * @type {{tablet: string, desktop: string, mobile: string}}
 */
export const BREAKPOINT_NAMES = {
  desktop: 'desktop',
  tablet: 'tablet',
  mobile: 'mobile',
};

export const BREAKPOINTS = {
  [BREAKPOINT_NAMES.desktop]: '',
  [BREAKPOINT_NAMES.tablet]: 991,
  [BREAKPOINT_NAMES.mobile]: 575,
};

export const replaceBetweenCurly = (text, replacement) =>
  text.replace(/[^{\}]+(?=})/gi, replacement);

export const getSpacingProperty = text =>
  text.match(/margin|padding|position/gi)[0];

export const isSpacingRule = rule => {
  const spacingRules = ['padding', 'margin', 'position'];
  // Remove instances where we want to style individual padding items
  // like padding-right or margin-bottom
  const exceptions = ['padding-', 'margin-'];

  return (
    spacingRules.some(spacingRule => rule.includes(spacingRule)) &&
    !exceptions.some(exception => rule.includes(exception))
  );
};

export const isBackgroundImageRuleValue = value => {
  if (!value) {
    return false;
  }

  return (
    typeof value === 'object' &&
    'url' in value &&
    'attachment' in value &&
    'repeat' in value
  );
};

const getRuleContents = rule => {
  if (!rule) {
    return '';
  }

  const style = rule.match(/[^{\}]+(?=})/gi)[0];
  const selector = rule
    .replace(style, '')
    .replace('{', '')
    .replace('}', '');

  return {
    selector: selector.trim(),
    style: style.trim(),
  };
};

const getFlattenedRules = (rules = []) => {
  if (!rules || !rules.length) {
    return [];
  }

  const flattenedRules = rules.reduce((acc, rule) => {
    const contents = getRuleContents(rule);
    const existingSelector = acc.find(
      ({ selector }) => selector === contents.selector,
    );
    if (existingSelector) {
      existingSelector.styles.push(contents.style);
      return acc;
    }

    acc.push({
      selector: contents.selector,
      styles: [contents.style],
    });

    return acc;
  }, []);

  return flattenedRules.map(flattenedRule => {
    return `${flattenedRule.selector} { ${flattenedRule.styles.join(' ')} }`;
  });
};

export const getFlattenedRulesBreakpoint = breakpoint => {
  return {
    ...breakpoint,
    rules: getFlattenedRules(breakpoint.rules),
  };
};

/**
 * Creates the CSS rule of a particular ruleset.
 *
 * @param {string} id The selector id (block id).
 * @param {any} value The value.
 * @param {string} rule The CSS rule.
 * @param {string} [unit] The unit (px, em, rem, etc).
 * @param {Object} edgeCase CSS rule edge case (see <Rule> component).
 * @return {*}
 */
export const defaultGetCSSRule = ({ id, value, rule, unit = '', edgeCase }) => {
  if (value == null || value === '') {
    return null;
  }

  const base = (() => {
    if (rule.includes('[root]')) {
      return rule.replace('[root]', id);
    }

    return `.${id} ${rule}`;
  })();

  //
  // Spacing control (position or margin/padding)
  //
  if (isSpacingRule(rule)) {
    // If margin or padding and every value is set return the shorthand rule.
    if (hasAllSpacingSettings(value) && rule !== 'position') {
      const spacingStyles = getMarginSettingStyles(value);

      return spacingStyles && sprintf(base, spacingStyles);
    } else {
      // Else only a few values are set so only return those.
      const val = ['top', 'right', 'bottom', 'left']
        .map(pos => {
          const property = getSpacingProperty(rule);

          if (value[pos] != null && value[pos] !== '') {
            const finalValue = `${value[pos]}${unit}`;
            return property === 'position'
              ? `${pos}: ${finalValue};`
              : `${property}-${pos}: ${finalValue};`;
          }
        })
        .join(' ');

      return !!val.trim() ? replaceBetweenCurly(base, ` ${val} `) : undefined;
    }
  }

  //
  // Background image controls
  //
  if (isBackgroundImageRuleValue(value)) {
    if (!value.url) {
      return undefined;
    }

    const backgroundImageStyle = [
      `background-image: url(${value.url});`,
      `background-repeat: ${value.repeat};`,
      `background-size: ${value.size};`,
      `background-position: ${value.position};`,
      `background-attachment: ${value.attachment};`,
    ].join(' ');

    return sprintf(base, backgroundImageStyle);
  }

  //
  // All other controls
  //

  // Handle edge cases
  if (edgeCase && edgeCase.edge === value) {
    return sprintf(base, edgeCase.value);
  }

  return sprintf(base, `${value}${unit}`);
};

/**
 * Iterates over the children of a <Style> component and extracts
 * all nested <Rule> elements (recursively).
 *
 * @param {Children} children
 * @returns {*}
 */
const getStylesheetRuleChildren = children => {
  return Children.toArray(children)
    .map(child => {
      if (Array.isArray(child.props.children)) {
        return getStylesheetRuleChildren(child.props.children);
      }

      return child;
    })
    .reduce((acc, child) => {
      if (Array.isArray(child)) {
        return [...acc, ...child];
      }

      return [...acc, child];
    }, [])
    .filter(child => child.type && child.type.displayName === 'Rule');
};

/**
 * Iterates over the <Rule> child component and generates the styles array
 * (groups all styles into media queries).
 *
 * @param {Object} options The options.
 * @param {string} options.id The unique block id.
 * @param {React.Children} options.children The StyleSheet component's children.
 * @param {function} options.getCSSRule The function that defines how to extract CSS rules.
 * @param {function} [options.mapper] An optional mapper function to pass rules in.
 * @return {Array<Object>}
 */
export const defaultGetStylesArrayFromChildren = ({
  id,
  children,
  getCSSRule,
  mapper = rule => rule,
}) => {
  const initial = [
    {
      name: 'desktop',
      media: 'max',
      width: BREAKPOINTS.desktop,
      rules: [],
    },
    {
      name: 'tablet',
      media: 'max',
      width: BREAKPOINTS.tablet,
      rules: [],
    },
    {
      name: 'mobile',
      media: 'max',
      width: BREAKPOINTS.mobile,
      rules: [],
    },
    {
      name: 'desktop-only',
      media: 'min',
      width: BREAKPOINTS.tablet + 1,
      rules: [],
    },
    {
      name: 'tablet-only',
      media: 'min',
      width: BREAKPOINTS.mobile + 1,
      rules: [],
    },
  ];

  const rules = getStylesheetRuleChildren(children);

  const mappedRules = rules.reduce((acc, child) => {
    const { value, rule, unit, edgeCase, breakpointLimit } = child.props;

    if (value == null) {
      return acc;
    }

    if (typeof value !== 'object' || !('desktop' in value)) {
      // We don't have a responsive setting, add the rules in the
      // desktop breakpoint
      const desktopBreakpoint = acc.find(({ name }) => name === 'desktop');
      const styleRule = getCSSRule({
        id,
        value,
        rule,
        unit,
        edgeCase,
      });

      if (styleRule != null) {
        desktopBreakpoint.rules.push(styleRule);
      }
      return acc;
    }

    Object.keys(value).forEach(breakpoint => {
      const styleBreakpoint = acc.find(({ name }) => {
        if (breakpointLimit && breakpoint !== 'mobile') {
          return `${breakpoint}-only` === name;
        }

        return name === breakpoint;
      });

      const styleRule = getCSSRule({
        id,
        value: value[breakpoint],
        rule,
        unit,
        edgeCase,
        breakpointLimit,
      });

      if (styleRule != null && styleBreakpoint) {
        styleBreakpoint.rules.push(styleRule);
      }
    });

    return acc;
  }, initial);

  return mappedRules.map(mapper);
};

/**
 * Given a styles array it generate all necessary styles.
 *
 * @param {Array<Object>} styles The styles array.
 * @return {string}
 */
export const defaultGenerateStyles = styles => {
  return styles
    .reduce((acc, breakpoint) => {
      if (!breakpoint.rules.length) {
        return acc;
      }

      const rules = breakpoint.rules.map(s => s.trim()).join('\n');

      if (!breakpoint.width) {
        return `${acc}${rules}\n`;
      }

      if (breakpoint.name === 'tablet-only') {
        return `${acc}\n
          @media (min-width: ${BREAKPOINTS.mobile + 1}px) and (max-width: ${
          BREAKPOINTS.tablet
        }px) {
            ${rules}
          }
        `;
      }

      return `${acc}\n
      @media (${breakpoint.media}-width: ${breakpoint.width}px) {
        ${rules}
      }
    `;
    }, '')
    .trim();
};

/**
 * Determines whether a styles array is empty.
 *
 * @param {Array} stylesArray The styles array.
 * @return {boolean}
 */
export const stylesArrayIsEmpty = stylesArray => {
  return stylesArray.every(style => style.rules.length === 0);
};
