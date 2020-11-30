import { Fragment } from 'wp.element';
import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../util/getBlockId';
import useUniqueId from '../../hooks/useUniqueId';

const TabSliderEdit = ({ attributes, setAttributes, className, clientId }) => {
  const { uniqueId } = attributes;
  useUniqueId({ attributes, setAttributes, clientId });
  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <div id={blockId} className={classNames(className, blockId)}>
        <InnerBlocks
          template={[
            ['gutenbee/tab-slider-nav-column'],
            ['gutenbee/tab-slider-content-column'],
          ]}
          templateLock="all"
        />
      </div>
    </Fragment>
  );
};

export default TabSliderEdit;
