/**
 * Icon Component
 */

import classNames from 'classnames';

import { VIEWS } from './constants';

const Icon = ({
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
}) => {
  const wrapperClasses = classNames({
    [className]: !!className,
    [`align-${align}`]: !!align,
    [`${className}-${view}`]: !!view,
    [`${className}-shape-${shape}`]: !!shape && view !== VIEWS.DEFAULT, // Ignore shape if we are on the default view
  });

  const iconClasses = classNames({
    'ep-icon-module': true,
    [`${className}-icon`]: !!className,
    [`ep-icon-module-${icon}`]: !!icon,
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
    <div className={wrapperClasses}>
      <span
        className={`${className}-icon-wrap`}
        style={{
          fontSize: `${size}px`,
          color,
          backgroundColor,
          borderColor,
          width: pad ? `${pad}em` : 'auto',
          height: pad ? `${pad}em` : 'auto',
          borderWidth,
        }}
      >
        <span
          className={iconClasses}
        />
      </span>
    </div>
  );
};

export default Icon;
