export const boxShadowControlAttributes = (prefix = 'block') => {
  if (prefix) {
    return {
      [`${prefix}BoxShadowType`]: {
        type: 'string',
        default: 'none',
      },
      [`${prefix}BoxShadowColor`]: {
        type: 'string',
        default: 'rgba(0,0,0,0.5)',
      },
      [`${prefix}BoxShadowWidth`]: {
        type: 'number',
        default: 7,
      },
      [`${prefix}BoxShadowSpread`]: {
        type: 'number',
        default: 0,
      },
    };
  }

  return {
    boxShadowType: {
      type: 'string',
      default: 'none',
    },
    boxShadowColor: {
      type: 'string',
      default: 'rgba(0,0,0,0.5)',
    },
    boxShadowWidth: {
      type: 'number',
      default: 7,
    },
    boxShadowSpread: {
      type: 'number',
      default: 0,
    },
  };
};

export const getBoxShadowCSSValue = ({ attributes, prefix = 'block' }) => {
  const type = prefix
    ? attributes[`${prefix}BoxShadowType`]
    : attributes.boxShadowType;
  const color = prefix
    ? attributes[`${prefix}BoxShadowColor`]
    : attributes.boxShadowColor;
  const width = prefix
    ? attributes[`${prefix}BoxShadowWidth`]
    : attributes.boxShadowWidth;
  const spread = prefix
    ? attributes[`${prefix}BoxShadowSpread`]
    : attributes.boxShadowSpread;

  if (type === 'none' || !type) {
    return {};
  }

  if (spread) {
    return {
      boxShadow: `0 0 ${width}px ${spread}px ${
        type === 'outset' ? '' : type
      } ${color}`,
    };
  }

  return {
    boxShadow: `0 0 ${width}px ${type === 'outset' ? '' : type} ${color}`,
  };
};
