import { Fragment } from 'wp.element';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import useUniqueId from '../../../hooks/useUniqueId';

const TabSliderContentEdit = ({
  attributes,
  setAttributes,
  className,
  clientId,
}) => {
  const { uniqueId } = attributes;
  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div id={blockId} className={classNames(className, blockId)}>
        <InnerBlocks template={[['gutenbee/paragraph']]} />
      </div>
    </Fragment>
  );
};

export default TabSliderContentEdit;
