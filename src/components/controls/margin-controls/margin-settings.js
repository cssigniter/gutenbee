/**
 * @file Margin settings utilities
 */

/**
 * Given a `margins` attribute object (with top, right, bottom, left values)
 * determines if it actually contains values (0 is considered a value)
 *
 * @param {Object} margins - The margins as passed from the block's attributes
 * @returns {string} - Whether margins have been set or not
 */
const hasMarginSettings = margins => {
  if (!margins) {
    return false;
  }

  return Object.values(margins).some(value => value != null && value !== '');
};

export const hasAllSpacingSettings = margins => {
  if (!margins) {
    return false;
  }

  return Object.values(margins).every(value => value != null && value !== '');
};

/**
 * Given a `margins` attribute object (with top, right, bottom, left values)
 * generates the required CSS object
 *
 * @param {Object} margins - The margins as passed from the block's attributes
 * @param {string} [breakpoint] - Optionally a breakpoint, i.e. desktop|tablet|mobile.
 * @returns {Object} - The CSS object
 */
const getMarginSettingStyles = (margins, breakpoint) => {
  if (!margins) {
    return undefined;
  }

  if (hasMarginSettings(margins) || hasMarginSettings(margins[breakpoint])) {
    const values = margins[breakpoint] || margins;

    return ['top', 'right', 'bottom', 'left']
      .map(position => `${values[position] || 0}px`)
      .join(' ');
  }

  return undefined;
};

export { hasMarginSettings, getMarginSettingStyles };
