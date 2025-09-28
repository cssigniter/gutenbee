// TODO: This is a temporary copy of the respective function inside the @wordpress/dom package.
// We should use the native WordPress one, as soon as we can import it (node dependencies, etc).

/**
 * Strips scripts and on* attributes from HTML.
 *
 * @param {string} html HTML to sanitize.
 *
 * @return {string} The sanitized HTML.
 */
function safeHTML(html) {
  const { body } = document.implementation.createHTMLDocument('');
  body.innerHTML = html;
  const elements = body.getElementsByTagName('*');
  let elementIndex = elements.length;

  while (elementIndex--) {
    const element = elements[elementIndex];

    if (element.tagName === 'SCRIPT') {
      remove(element);
    } else {
      let attributeIndex = element.attributes.length;

      while (attributeIndex--) {
        const { name: key } = element.attributes[attributeIndex];

        if (key.startsWith('on')) {
          element.removeAttribute(key);
        }
      }
    }
  }

  return body.innerHTML;
}

/**
 * Given a DOM node, removes it from the DOM.
 *
 * @param {Node} node Node to be removed.
 * @return {void}
 */
function remove(node) {
  assertIsDefined(node.parentNode, 'node.parentNode');
  node.parentNode.removeChild(node);
}

function assertIsDefined(val, name) {
  if (
    process.env.NODE_ENV !== 'production' &&
    (val === undefined || val === null)
  ) {
    throw new Error(`Expected '${name}' to be defined, but received ${val}`);
  }
}

export default safeHTML;
