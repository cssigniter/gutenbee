/**
 * Checks whether the Google Maps API is loaded.
 *
 * @returns {boolean}
 */
export const isGoogleMapsApiLoaded = () => {
  return typeof window.google?.maps === 'object';
};
