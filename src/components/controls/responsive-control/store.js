import { registerStore } from 'wp.data';

// Constants

const SET_BREAKPOINT = 'SET_BREAKPOINT';

/**
 * @enum BREAKPOINTS
 * @type {{tablet: string, desktop: string, mobile: string}}
 */
const BREAKPOINTS = {
  desktop: 'desktop',
  tablet: 'tablet',
  mobile: 'mobile',
};

// Reducer

const initialState = {
  breakpoint: BREAKPOINTS.desktop,
};

registerStore('gutenbee-breakpoints', {
  reducer(state = initialState, action) {
    switch (action.type) {
      case SET_BREAKPOINT: {
        return {
          ...state,
          breakpoint: action.breakpoint,
        };
      }

      default:
        return state;
    }
  },
  actions: {
    onBreakpointSet: breakpoint => ({
      type: SET_BREAKPOINT,
      breakpoint,
    }),
  },
  selectors: {
    getBreakpoint: state => state.breakpoint,
  },
});
