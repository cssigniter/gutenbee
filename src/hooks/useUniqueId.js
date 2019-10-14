import { useEffect } from 'wp.element';

const useUniqueId = ({ attributes, setAttributes, clientId }) => {
  const { uniqueId } = attributes;

  useEffect(() => {
    if (!uniqueId) {
      setAttributes({ uniqueId: clientId.substr(2, 9) });
    }
  }, []);
};

export default useUniqueId;
