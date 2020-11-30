import { Fragment } from 'wp.element';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import useUniqueId from '../../../hooks/useUniqueId';

const TabSliderContentColumnEdit = ({
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
        <InnerBlocks
          allowedBlocks={['gutenbee/tab-slider-content']}
          template={[['gutenbee/tab-slider-content']]}
          renderAppender={false}
          templateLock={false}
        />
      </div>
    </Fragment>
  );
};

export default TabSliderContentColumnEdit;
