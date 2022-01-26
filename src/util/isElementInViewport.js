/**
 * Checks if element is in viewport.
 *
 * @param {HTMLElement} el The element.
 * @param {number} offset The offset in pixels.
 * @returns {boolean}
 */
const isElementInViewport = (el, offset = 0) => {
  const scroll = window.scrollY || window.pageYOffset;
  const boundsTop = el.getBoundingClientRect().top + scroll;

  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight,
  };

  const bounds = {
    top: boundsTop + offset,
    bottom: boundsTop + el.clientHeight + offset,
  };

  return (
    (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
    (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
  );
};

export default isElementInViewport;
