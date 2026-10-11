import { useEffect } from 'wp.element';
import { select } from 'wp.data';

// Keep track of which block each unique id belongs to, so that
// when we duplicate a block we can generate a new uniqueId for the copy.
const owners = new Map();

/**
 * Checks whether a unique id is currently in use by a different block.
 *
 * Blocks get mounted again, or even recreated, without having been duplicated
 * (e.g. while the editor loads, or when switching between the visual and the
 * code editor). So an id only counts as taken if the block that claimed it is
 * still around, and still uses it.
 *
 * @param {string} uniqueId The unique id to check.
 * @param {string} clientId The client id of the block that wants to use it.
 * @returns {boolean}
 */
const isUsedByAnotherBlock = (uniqueId, clientId) => {
  const ownerClientId = owners.get(uniqueId);

  if (!ownerClientId || ownerClientId === clientId) {
    return false;
  }

  const owner = select('core/block-editor').getBlock(ownerClientId);

  return owner?.attributes?.uniqueId === uniqueId;
};

const useUniqueId = ({ attributes, setAttributes, clientId }) => {
  const { uniqueId } = attributes;

  useEffect(() => {
    if (!uniqueId || isUsedByAnotherBlock(uniqueId, clientId)) {
      const newId = clientId.substr(2, 14);
      owners.set(newId, clientId);
      setAttributes({ uniqueId: newId });
      return;
    }

    owners.set(uniqueId, clientId);
  }, []);
};

export default useUniqueId;
