/**
 * Utility function to escape HTML content to prevent XSS attacks
 * @param {string} text - The text to escape
 * @returns {string} - The escaped text
 */
const escapeHtml = text => {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

export default escapeHtml;
