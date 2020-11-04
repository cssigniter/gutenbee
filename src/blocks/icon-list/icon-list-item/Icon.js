import { Fragment } from 'wp.element';

const Icon = ({ icon }) => {
  const IconComponent = require(`../../icon/svg/${icon}.svg`).default;
  return (
    <Fragment>
      <span className="gutenbee-icon-block-icon-wrap">
        <IconComponent preserveAspectRatio="xMidYMid meet" />
      </span>
    </Fragment>
  );
};

export default Icon;
