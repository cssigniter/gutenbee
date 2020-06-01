const borderControlAttributes = (prefix = 'block') => {
  if (prefix) {
    return {
      [`${prefix}BorderColor`]: {
        type: 'string',
      },
      [`${prefix}BorderWidth`]: {
        type: 'number',
      },
      [`${prefix}BorderStyle`]: {
        type: 'string',
        default: 'none',
      },
      [`${prefix}BorderRadius`]: {
        type: 'number',
      },
    };
  }

  return {
    borderColor: {
      type: 'string',
    },
    borderWidth: {
      type: 'number',
    },
    borderRadius: {
      type: 'number',
    },
    borderStyle: {
      type: 'string',
      default: 'none',
    },
  };
};

export default borderControlAttributes;
