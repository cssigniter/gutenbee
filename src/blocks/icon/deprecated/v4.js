import classNames from 'classnames';

import { VIEWS, SHAPES } from '../constants';
import IconStyle from '../style';
import { getBoxShadowCSSValue } from '../../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { getAnimationControlDataAttributes } from '../../../components/controls/animation-controls/helpers';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import { boxShadowControlAttributes } from '../../../components/controls/box-shadow-controls/helpers';
import { animationControlAttributes } from '../../../components/controls/animation-controls/helpers';
import getBlockId from '../../../util/getBlockId';

const IconV4 = ({
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
  const IconComponent = require(`../svg/${icon}.svg`).default;

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
    <div
      id={id}
      className={wrapperClasses}
      {...getAnimationControlDataAttributes(attributes.animation)}
    >
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

const v4 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    view: {
      type: 'string',
      default: VIEWS.DEFAULT,
    },
    shape: {
      type: 'string',
      default: SHAPES.CIRCLE,
    },
    icon: {
      type: 'string',
      default: 'add-bag',
    },
    size: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: 40,
        tablet: '',
        mobile: '',
      }),
    },
    padding: {
      type: 'number',
      default: 2,
    },
    borderWidth: {
      type: 'number',
      default: 3,
    },
    align: {
      type: 'string',
      default: 'left',
    },
    colorPrimary: {
      type: 'string',
    },
    colorSecondary: {
      type: 'string',
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    ...boxShadowControlAttributes('icon'),
    blockBreakpointVisibility: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: false,
        tablet: false,
        mobile: false,
      }),
    },
    blockAuthVisibility: {
      type: 'object',
      default: {
        loggedIn: false,
        loggedOut: false,
      },
    },
    ...animationControlAttributes(),
  },
  save({ className, attributes }) {
    const id = getBlockId(attributes.uniqueId);
    return <IconV4 id={id} className={className} {...attributes} />;
  },
};

export default v4;
