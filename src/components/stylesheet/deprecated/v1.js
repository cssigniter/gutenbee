import PropTypes from 'prop-types';
import { sprintf } from 'wp.i18n';

import {
  defaultGenerateStyles,
  defaultGetStylesArrayFromChildren,
  getSpacingProperty,
  isSpacingRule,
  replaceBetweenCurly,
  stylesArrayIsEmpty,
} from '../helpers';
import {
  getMarginSettingStyles,
  hasAllSpacingSettings,
} from '../../controls/margin-controls/margin-settings';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  id: PropTypes.string,
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
const getCSSRule = ({ id, value, rule, unit = '', edgeCase }) => {
  if (value == null || value === '') {
    return null;
  }

  const base = `#${id} ${rule}`;

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
  // All other controls
  //

  // Handle edge cases
  if (edgeCase && edgeCase.edge === value) {
    return sprintf(base, edgeCase.value);
  }

  return sprintf(base, `${value}${unit}`);
};

const StyleSheetV1 = ({ id = '', children }) => {
  const stylesArray = defaultGetStylesArrayFromChildren({
    id,
    children,
    getCSSRule,
    mapper: rule => rule,
  });

  if (stylesArrayIsEmpty(stylesArray)) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{ __html: defaultGenerateStyles(stylesArray) }}
    />
  );
};

StyleSheetV1.propTypes = propTypes;

export default StyleSheetV1;
