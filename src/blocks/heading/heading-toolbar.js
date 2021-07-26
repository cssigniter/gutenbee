import { range } from 'lodash';
import { __, sprintf } from 'wp.i18n';
import { Toolbar } from 'wp.components';

import HeadingLevelIcon from './heading-level-icon';

const HeadingToolbar = ({
  isCollapsed = true,
  minLevel,
  maxLevel,
  selectedLevel,
  onChange,
}) => {
  const createLevelControl = (targetLevel, selectedLevel, onChange) => {
    const isActive = targetLevel === selectedLevel;
    return {
      icon: (
        <HeadingLevelIcon level={targetLevel} __unstableActive={isActive} />
      ),
      // translators: %s: heading level e.g: "1", "2", "3"
      title: sprintf(__('Heading %d'), targetLevel),
      isActive,
      onClick: () => onChange(targetLevel),
    };
  };

  return (
    <Toolbar
      className="gutenbee-heading-toolbar"
      isCollapsed={isCollapsed}
      icon={<HeadingLevelIcon level={selectedLevel} />}
      controls={range(minLevel, maxLevel).map(index =>
        createLevelControl(index, selectedLevel, onChange),
      )}
    />
  );
};

export default HeadingToolbar;
