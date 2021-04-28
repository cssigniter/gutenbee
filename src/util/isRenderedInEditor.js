/**
 * Checks if an element is rendered inside the editor.
 *
 * @param {HTMLElement} element The HTMLElement to check.
 * @returns {boolean}
 */
const isRenderedInEditor = element => {
  if (!element) {
    return false;
  }

  return !!element.closest?.('.block-editor-writing-flow');
};

export default isRenderedInEditor;
