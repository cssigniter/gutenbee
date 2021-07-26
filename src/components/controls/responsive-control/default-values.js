export const getDefaultResponsiveValue = ({
  desktop = '',
  tablet = '',
  mobile = '',
} = {}) => ({
  desktop,
  tablet,
  mobile,
});

export const getDefaultSpacingValue = () => ({
  desktop: {
    top: '',
    right: '',
    bottom: '',
    left: '',
  },
  tablet: {
    top: '',
    right: '',
    bottom: '',
    left: '',
  },
  mobile: {
    top: '',
    right: '',
    bottom: '',
    left: '',
  },
  linked: undefined,
});

export const getDefaultBackgroundImageValue = () => ({
  url: '',
  image: null,
  repeat: 'no-repeat',
  size: 'cover',
  position: 'top center',
  attachment: 'scroll',
  parallax: false,
  parallaxSpeed: 0.3,
});
