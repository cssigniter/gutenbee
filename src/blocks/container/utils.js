import times from 'lodash.times';

/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */
export const getColumnsTemplate = columns => {
  if (columns === undefined) {
    return null;
  }

  return times(columns, () => ['gutenbee/column']);
};
