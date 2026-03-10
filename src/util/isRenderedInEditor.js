/**
 * Checks if an element is rendered inside the editor.
 *
 * @param {HTMLElement} element The HTMLElement to check.
 * @returns {boolean}
 */
const isRenderedInEditor = element => {
  if (!element || 'undefined' === typeof window) {
    return false;
  }

  return !!(
    element.closest?.('.block-editor-writing-flow') ||
    element.closest?.('.is-root-container') ||
    element.ownerDocument?.body?.classList?.contains?.(
      'block-editor-iframe__body',
    )
  );
};

export default isRenderedInEditor;
