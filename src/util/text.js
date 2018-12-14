/**
 * Capitalizes a string (makes first character uppercase
 * and the rest lowercase).
 *
 * @param {string} string The string to capitalize
 * @returns {string} The capitalized string
 */
const capitalize = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`;

/**
 * Capitalizes a sentence (defined as a string containing
 * words that are separated by space characters).
 *
 * @param {string} sentence The sentence to capitalize
 * @returns {string} The capitalized sentene
 */
const capitalizeSentence = sentence =>
  sentence
    .split(' ')
    .map(capitalize)
    .join(' ');

export { capitalize, capitalizeSentence };
