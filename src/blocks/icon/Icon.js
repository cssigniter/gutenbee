/**
 * Icon Component
 */

import classNames from 'classnames';

import { VIEWS } from './constants';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';

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
  blockMargin,
}) => {
  const wrapperClasses = classNames({
    'gutenbee-icon-block': true,
    [`align-${align || 'left'}`]: true,
    [`gutenbee-icon-block-${view}`]: !!view,
    [`gutenbee-icon-block-shape-${shape}`]: !!shape && view !== VIEWS.DEFAULT, // Ignore shape if we are on the default view
    [className]: !!className,
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
    <div
      className={wrapperClasses}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
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
        }}
      >
        <span className={iconClasses} />
      </span>
    </div>
  );
};

export default Icon;
