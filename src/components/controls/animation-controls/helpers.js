/**
 * Return animation control attributes.
 *
 * @returns {{animation: {default: {duration: string, delay: string, repeat: boolean, threshold: string, type: string, easing: string}, type: string}}}
 */
export const animationControlAttributes = () => {
  return {
    animation: {
      type: 'object',
      default: {
        type: '',
        duration: '',
        delay: '',
        easing: '',
        threshold: '',
        repeat: false,
      },
    },
  };
};

/**
 * Return data attributes to be applied on blocks for animations.
 * @param attributes
 * @returns {{"data-sal-delay": (string|string), "data-sal-easing": (string|*), "data-sal", "data-sal-threshold": (undefined|string), "data-sal-duration": (string|string), "data-sal-repeat": (undefined|string)}|undefined}
 */
export const getAnimationControlDataAttributes = attributes => {
  const { type, duration, delay, easing, threshold, repeat } = attributes ?? {};

  if (!type) {
    return {};
  }

  return {
    'data-sal': type,
    'data-sal-delay': delay == null || delay === '' ? '5' : `${delay * 1000}`,
    'data-sal-duration':
      duration == null || duration === '' ? '700' : `${duration * 1000}`,
    'data-sal-easing': easing == null || easing === '' ? 'ease-in-out' : easing,
    'data-sal-threshold':
      threshold == null || threshold === '' ? undefined : `${threshold / 100}`,
    'data-sal-repeat': !repeat ? undefined : '',
  };
};
