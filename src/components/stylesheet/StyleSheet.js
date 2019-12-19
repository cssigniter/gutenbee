import { Children } from 'wp.element';
import PropTypes from 'prop-types';
import { sprintf } from 'wp.i18n';

import {
  getMarginSettingStyles,
  hasAllSpacingSettings,
} from '../controls/margin-controls/margin-settings';

const propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string,
};

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

const replaceBetweenCurly = (text, replacement) =>
  text.replace(/[^{\}]+(?=})/gi, replacement);

const getSpacingProperty = text => text.match(/margin|padding|position/gi)[0];

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
const getCSSRule = ({ id, value, rule, unit = '', edgeCase }) => {
  if (value == null || value === '') {
    return null;
  }

  const base = `#${id} ${rule}`;
  const spacingRules = ['padding', 'margin', 'position'];

  //
  // Spacing control (position or margin/padding)
  //
  if (spacingRules.some(spacingRule => rule.includes(spacingRule))) {
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
  // All other controls
  //

  // Handle edge cases
  if (edgeCase && edgeCase.edge === value) {
    return sprintf(base, edgeCase.value);
  }

  return sprintf(base, `${value}${unit}`);
};

/**
 * Iterates over the <Rule> child component and generates the styles array
 * (groups all styles into media queries).
 *
 * @param {string} id The unique block id.
 * @param children The StyleSheet component's children.
 * @return {Array<Object>}
 */
const defaultGetStylesArrayFromChildren = (id, children) => {
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

  return Children.toArray(children).reduce((acc, child) => {
    const { value, rule, unit, edgeCase, breakpointLimit } = child.props;

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

      if (styleRule != null) {
        styleBreakpoint.rules.push(styleRule);
      }
    });

    return acc;
  }, initial);
};

/**
 * Given a styles array it generate all necessary styles.
 *
 * @param {Array<Object>} styles The styles array.
 * @return {string}
 */
const defaultGenerateStyles = styles => {
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
const stylesArrayIsEmpty = stylesArray => {
  return stylesArray.every(style => style.rules.length === 0);
};

const StyleSheet = ({
  id = '',
  children,
  methods = {
    getStylesArrayFromChildren: defaultGetStylesArrayFromChildren,
    generateStyles: defaultGenerateStyles,
  },
}) => {
  const { getStylesArrayFromChildren, generateStyles } = methods;
  const stylesArray = getStylesArrayFromChildren(id, children);

  if (stylesArrayIsEmpty(stylesArray)) {
    return null;
  }

  return (
    <style dangerouslySetInnerHTML={{ __html: generateStyles(stylesArray) }} />
  );
};

StyleSheet.propTypes = propTypes;

export default StyleSheet;
