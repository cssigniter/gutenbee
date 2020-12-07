import classNames from 'classnames';

import { VIEWS } from './constants';
import IconStyle from './style';
import { getBoxShadowCSSValue } from '../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

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
  blockBreakpointVisibility,
  blockAuthVisibility,
  ...attributes
}) => {
  const IconComponent = require(`./svg/${icon}.svg`).default;

  const wrapperClasses = classNames(
    className,
    id,
    getBreakpointVisibilityClassNames(blockBreakpointVisibility),
    getAuthVisibilityClasses(blockAuthVisibility),
    {
      'gutenbee-icon-block': true,
      [`align-${align || 'left'}`]: true,
      [`gutenbee-icon-block-${view}`]: !!view,
      [`gutenbee-icon-block-shape-${shape}`]: !!shape && view !== VIEWS.DEFAULT, // Ignore shape if we are on the default view
    },
  );

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
      <IconStyle
        id={id}
        attributes={{ uniqueId, blockMargin, blockPadding, size }}
      />
      <span
        className="gutenbee-icon-block-icon-wrap"
        style={{
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
        />
      </span>
    </div>
  );
};

export default Icon;
