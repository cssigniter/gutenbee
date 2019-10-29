/**
 * External dependencies
 */
import memoize from 'memize';
import { times, findIndex, sumBy, merge, mapValues } from 'lodash';

/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */
export const getColumnsTemplate = memoize(columns => {
  if (columns === undefined) {
    return null;
  }

  return times(columns, () => ['gutenbee/column']);
});

/**
 * Returns a column width attribute value rounded to standard precision.
 * Returns `undefined` if the value is not a valid finite number.
 *
 * @param {?number} value Raw value.
 *
 * @return {number} Value rounded to standard precision.
 */
export const toWidthPrecision = value =>
  Number.isFinite(value) ? parseFloat(value.toFixed(2)) : undefined;

/**
 * Returns the considered adjacent to that of the specified `clientId` for
 * resizing consideration. Adjacent blocks are those occurring after, except
 * when the given block is the last block in the set. For the last block, the
 * behavior is reversed.
 *
 * @param {WPBlock[]} blocks   Block objects.
 * @param {string}    clientId Client ID to consider for adjacent blocks.
 *
 * @return {WPBlock[]} Adjacent block objects.
 */
export function getAdjacentBlocks(blocks, clientId) {
  const index = findIndex(blocks, { clientId });
  const isLastBlock = index === blocks.length - 1;

  return isLastBlock ? blocks.slice(0, index) : blocks.slice(index + 1);
}

/**
 * Returns an effective width for a given block. An effective width is equal to
 * its attribute value if set, or a computed value assuming equal distribution.
 *
 * @param {WPBlock} block           Block object.
 * @param {number}  totalBlockCount Total number of blocks in Columns.
 *
 * @return {number} Effective column width.
 */
export function getEffectiveColumnWidth({
  block,
  totalBlockCount,
  breakpoint,
}) {
  const { width } = block.attributes;
  const w = width[breakpoint] || 100 / totalBlockCount;

  return toWidthPrecision(w);
}

/**
 * Returns the total width occupied by the given set of column blocks.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 *
 * @return {number} Total width occupied by blocks.
 */
export function getTotalColumnsWidth({
  blocks,
  totalBlockCount = blocks.length,
  breakpoint,
}) {
  return sumBy(blocks, block =>
    getEffectiveColumnWidth({ block, totalBlockCount, breakpoint }),
  );
}

/**
 * Returns an object of `clientId` → `width` of effective column widths.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 *
 * @return {Object<string,number>} Column widths.
 */
export function getColumnWidths({
  blocks,
  totalBlockCount = blocks.length,
  breakpoint,
}) {
  return blocks.reduce((accumulator, block) => {
    const width = getEffectiveColumnWidth({
      block,
      totalBlockCount,
      breakpoint,
    });

    return Object.assign(accumulator, {
      [block.clientId]: {
        ...block.attributes.width,
        [breakpoint]: width,
      },
    });
  }, {});
}

/**
 * Returns an object of `clientId` → `width` of column widths as redistributed
 * proportional to their current widths, constrained or expanded to fit within
 * the given available width.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {number}    availableWidth  Maximum width to fit within.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 * @param {BREAKPOINT_NAMES} breakpoint  Maximum width to fit within.
 *
 * @return {Object<string,number>} Redistributed column widths.
 */
export function getRedistributedColumnWidths({
  blocks,
  availableWidth,
  totalBlockCount = blocks.length,
  breakpoint,
}) {
  const totalWidth = getTotalColumnsWidth({
    blocks,
    totalBlockCount,
    breakpoint,
  });
  const difference = availableWidth - totalWidth;
  const adjustment = difference / blocks.length;

  return mapValues(
    getColumnWidths({ blocks, totalBlockCount, breakpoint }),
    width => ({
      ...width,
      [breakpoint]: toWidthPrecision(width[breakpoint] + adjustment),
    }),
  );
}

/**
 * Returns true if column blocks within the provided set are assigned with
 * explicit widths, or false otherwise.
 *
 * @param {WPBlock[]} blocks Block objects.
 * @param {BREAKPOINT_NAMES} breakpoint A breakpoint.
 *
 * @return {boolean} Whether columns have explicit widths.
 */
export function hasExplicitColumnWidths(blocks, breakpoint) {
  return blocks.some(block =>
    Number.isFinite(block.attributes.width[breakpoint]),
  );
}

/**
 * Returns a copy of the given set of blocks with new widths assigned from the
 * provided object of redistributed column widths.
 *
 * @param {WPBlock[]}             blocks Block objects.
 *
 * @return {WPBlock[]} blocks Mapped block objects.
 */
export function getMappedColumnWidths(blocks) {
  return blocks.map(block =>
    merge({}, block, {
      attributes: {
        width: {
          desktop: '',
          tablet: 100,
          mobile: 100,
        },
      },
    }),
  );
}
