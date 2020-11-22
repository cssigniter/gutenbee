import { createBlock } from 'wp.blocks';
import memoize from 'memize';
import { times, findIndex, sumBy, merge, mapValues, map } from 'lodash';

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
export const getEffectiveColumnWidth = ({
  block,
  totalBlockCount,
  breakpoint,
}) => {
  const { width } = block.attributes;
  const w = width[breakpoint] || 100 / totalBlockCount;

  return toWidthPrecision(w);
};

/**
 * Returns the total width occupied by the given set of column blocks.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 *
 * @return {number} Total width occupied by blocks.
 */
export const getTotalColumnsWidth = ({
  blocks,
  totalBlockCount = blocks.length,
  breakpoint,
}) => {
  return sumBy(blocks, block =>
    getEffectiveColumnWidth({ block, totalBlockCount, breakpoint }),
  );
};

/**
 * Returns an object of `clientId` → `width` of effective column widths.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 *
 * @return {Object<string,number>} Column widths.
 */
export const getColumnWidths = ({
  blocks,
  totalBlockCount = blocks.length,
  breakpoint,
}) => {
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
};

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
export const getRedistributedColumnWidths = ({
  blocks,
  availableWidth,
  totalBlockCount = blocks.length,
  breakpoint,
}) => {
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
};

/**
 * Returns true if column blocks within the provided set are assigned with
 * explicit widths, or false otherwise.
 *
 * @param {WPBlock[]} blocks Block objects.
 * @param {BREAKPOINT_NAMES} breakpoint A breakpoint.
 *
 * @return {boolean} Whether columns have explicit widths.
 */
export const hasExplicitColumnWidths = (blocks, breakpoint) => {
  return blocks.some(block =>
    Number.isFinite(block.attributes.width[breakpoint]),
  );
};

/**
 * Returns a copy of the given set of blocks with new widths assigned from the
 * provided object of redistributed column widths.
 *
 * @param {WPBlock[]}             blocks Block objects.
 *
 * @return {WPBlock[]} blocks Mapped block objects.
 */
export const getMappedColumnWidths = blocks => {
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
};

export const createBlocksFromInnerBlocksTemplate = innerBlocksTemplate => {
  return map(innerBlocksTemplate, ([name, attributes, innerBlocks = []]) =>
    createBlock(
      name,
      attributes,
      createBlocksFromInnerBlocksTemplate(innerBlocks),
    ),
  );
};

/**
 * Creates the YouTube video embed.
 *
 * @param {HTMLElement} videoElement The element which will host the video embed.
 */
export const onYouTubeApiReady = videoElement => {
  const dataset = videoElement.dataset;

  new window.YT.Player(videoElement, {
    videoId: dataset.videoId,
    playerVars: {
      autoplay: 0,
      controls: 0,
      showinfo: 0,
      modestbranding: 0,
      loop: 0,
      playlist: dataset.videoId,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0,
      mute: 1,
      start: parseInt(dataset.videoStart, 10) || undefined,
      end: parseInt(dataset.videoEnd, 10) || undefined,
    },
  });
};

/**
 * Creates the Vimeo video embed.
 *
 * @param {HTMLElement} videoElement The element which will host the video embed.
 */
export const onVimeoApiReady = videoElement => {
  const dataset = videoElement.dataset;

  new window.Vimeo.Player(videoElement, {
    id: dataset.videoId,
    loop: 0,
    autoplay: 0,
    controls: 0,
    byline: false,
    title: false,
    autopause: false,
    muted: 1,
  });
};
