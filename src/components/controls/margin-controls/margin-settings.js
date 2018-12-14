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

/**
 * Given a `margins` attribute object (with top, right, bottom, left values)
 * generates the required CSS object
 *
 * @param {Object} margins - The margins as passed from the block's attributes
 * @returns {Object} - The CSS object
 */
const getMarginSettingStyles = margins => {
  if (!margins) {
    return undefined;
  }

  if (hasMarginSettings(margins)) {
    return ['top', 'right', 'bottom', 'left']
      .map(position => `${margins[position] || 0}px`)
      .join(' ');
  }

  return undefined;
};

export { hasMarginSettings, getMarginSettingStyles };
