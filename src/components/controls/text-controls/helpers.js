import { getDefaultResponsiveValue } from '../responsive-control/default-values';

const typographyControlAttributes = (prefix = '') => {
  if (prefix) {
    return {
      [`${prefix}FontSize`]: {
        type: 'object',
        default: getDefaultResponsiveValue(),
      },
      [`${prefix}LineHeight`]: {
        type: 'object',
        default: getDefaultResponsiveValue(),
      },
      [`${prefix}LetterSpacing`]: {
        type: 'object',
        default: getDefaultResponsiveValue(),
      },
      [`${prefix}TextDecoration`]: {
        type: 'object',
        default: getDefaultResponsiveValue(),
      },
      [`${prefix}TextTransform`]: {
        type: 'object',
        default: getDefaultResponsiveValue(),
      },
    };
  }

  return {
    fontSize: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    lineHeight: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    letterSpacing: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    textDecoration: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    textTransform: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
  };
};

export default typographyControlAttributes;
