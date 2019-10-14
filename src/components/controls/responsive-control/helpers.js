/**
 * Returns a size's (such as width or height) CSS style.
 *
 * @param {string} attribute The attribute's value.
 * @param {string} breakpoint The breakpoint, desktop|tablet|mobile.
 * @param {string} unit The unit, i.e. px, em, rem, %, etc.
 * @param {Object} edgeRules What happens in an edge rule.
 * @return {*}
 */
export const getSizeSettingStyles = ({
  attribute,
  breakpoint,
  unit = 'px',
  edgeRule,
}) => {
  if (attribute[breakpoint] == null || attribute[breakpoint] === '') {
    return attribute == null || attribute === ''
      ? undefined
      : `${attribute}${unit}`;
  }

  if (edgeRule && attribute[breakpoint] === edgeRule.value) {
    return `${edgeRule.rule}`;
  }

  return `${attribute[breakpoint]}${unit}`;
};
