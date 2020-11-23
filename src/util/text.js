/**
 * Capitalizes a string (makes first character uppercase
 * and the rest lowercase).
 *
 * @param {string} string The string to capitalize
 * @returns {string} The capitalized string
 */
export const capitalize = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`;

/**
 * Capitalizes a sentence (defined as a string containing
 * words that are separated by space characters).
 *
 * @param {string} sentence The sentence to capitalize
 * @returns {string} The capitalized sentene
 */
export const capitalizeSentence = sentence =>
  sentence
    .split(' ')
    .map(capitalize)
    .join(' ');

/**
 * Converts a string from camelCase to kebab-case.
 * https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707#gistcomment-2993938
 *
 * @param {string} string The string.
 * @returns {string}
 */
export const camelToKebab = string => {
  return string
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();
};
