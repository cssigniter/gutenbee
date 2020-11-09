import { useCallback, useState, useLayoutEffect } from 'wp.element';

const getSize = el => {
  if (!el) {
    return {
      width: 0,
      height: 0,
    };
  }
  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
};

const useComponentSize = ref => {
  const [ComponentSize, setComponentSize] = useState(
    getSize(ref ? ref.current : {}),
  );
  const handleResize = useCallback(
    function handleResize() {
      if (ref.current) {
        setComponentSize(getSize(ref.current));
      }
    },
    [ref],
  );
  useLayoutEffect(
    () => {
      if (!ref.current) {
        return undefined;
      }
      handleResize();
      if (typeof ResizeObserver === 'function') {
        let resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(ref.current);
        return () => {
          resizeObserver.disconnect(ref.current);
          resizeObserver = null;
        };
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
    [ref.current],
  );
  return ComponentSize;
};

export default useComponentSize;
