import { Fragment } from 'wp.element';

const Icon = ({ icon }) => {
  // Return null if no icon is selected
  if (!icon) {
    return null;
  }

  try {
    const IconComponent = require(`../../icon/svg/${icon}.svg`).default;
    return (
      <Fragment>
        <span className="gutenbee-icon-block-icon-wrap">
          <IconComponent preserveAspectRatio="xMidYMid meet" />
        </span>
      </Fragment>
    );
  } catch {
    // If icon file doesn't exist, return null
    return null;
  }
};

export default Icon;
