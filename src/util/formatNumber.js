/**
 * Splits a number in thousands given a separator
 * https://stackoverflow.com/a/2901298/6267661
 *
 * @param {number} number The number
 * @param {string} separator The separator character to use
 * @returns {string} The number (string now) split into thousands
 */
const numberWithCommas = (number, separator = ',') =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

/**
 * Format a number by splitting into thousands and optionally
 * setting a prefix or a suffix
 *
 * @param {number} number The number
 * @param {string} separator The separator character to use
 * @param {string} prefix The prefix that should lead the number
 * @param {string} suffix The suffix that should follow the number
 * @returns {string} The resulting number (stringified, prefixed, and suffixed)
 */
const formatNumber = (number, separator = ',', prefix, suffix) =>
  `${prefix || ''}${numberWithCommas(number, separator)}${suffix || ''}`;

export default formatNumber;
