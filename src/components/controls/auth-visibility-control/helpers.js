/**
 * Returns the className for handling authed visibility.
 *
 * @param {Object} values The auth visibility attribute.
 * @returns {string}
 */
import { camelToKebab } from '../../../util/text';

export const getAuthVisibilityClasses = values => {
  return Object.keys(values)
    .reduce((classes, auth) => {
      if (values[auth]) {
        classes.push(`gutenbee-hidden-${camelToKebab(auth)}`);
        return classes;
      }

      return classes;
    }, [])
    .join(' ');
};
