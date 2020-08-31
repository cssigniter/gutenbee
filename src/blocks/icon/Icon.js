import classNames from 'classnames';

import { VIEWS } from './constants';
import IconStyle from './style';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';

const Icon = ({
  id,
  uniqueId,
  className,
  view,
  shape,
  icon,
  size,
  padding,
  borderWidth,
  align,
  colorPrimary,
  colorSecondary,
  blockMargin,
  blockPadding,
  ...attributes
}) => {
  const IconComponent = require(`./svg/${icon}.svg`).default;

  const wrapperClasses = classNames({
    'gutenbee-icon-block': true,
    [`align-${align || 'left'}`]: true,
    [`gutenbee-icon-block-${view}`]: !!view,
    [`gutenbee-icon-block-shape-${shape}`]: !!shape && view !== VIEWS.DEFAULT, // Ignore shape if we are on the default view
    [className]: !!className,
  });

  const iconClasses = classNames({
    [`${className}-icon`]: !!className,
  });

  let color = colorPrimary;
  let backgroundColor = 'transparent';
  let borderColor = 'transparent';
  let pad;

  if (view === VIEWS.STACKED) {
    color = colorSecondary;
    backgroundColor = colorPrimary;
    pad = padding;
  }

  if (view === VIEWS.FRAMED) {
    backgroundColor = colorSecondary;
    borderColor = colorPrimary;
    pad = padding;
  }

  return (
    <div id={id} className={wrapperClasses}>
      <IconStyle id={id} attributes={{ uniqueId, blockMargin, blockPadding }} />
      <span
        className="gutenbee-icon-block-icon-wrap"
        style={{
          fontSize: `${size}px`,
          color,
          backgroundColor,
          borderColor,
          width: pad ? `${pad}em` : 'auto',
          height: pad ? `${pad}em` : 'auto',
          borderWidth,
          ...getBoxShadowCSSValue({ attributes, prefix: 'icon' }),
        }}
      >
        <IconComponent
          className={iconClasses}
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      </span>
    </div>
  );
};

export default Icon;
