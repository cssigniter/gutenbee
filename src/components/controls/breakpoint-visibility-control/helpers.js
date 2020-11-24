/**
 * Returns the className for handling breakpoint visibility.
 *
 * @param {Object} values The breakpoint visibility attribute.
 * @returns {string}
 */
export const getBreakpointVisibilityClassNames = values => {
  if (!values) {
    return undefined;
  }

  return Object.keys(values)
    .reduce((classes, breakpoint) => {
      if (values[breakpoint]) {
        classes.push(`gutenbee-hidden-${breakpoint}`);
        return classes;
      }

      return classes;
    }, [])
    .join(' ');
};
