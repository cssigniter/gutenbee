/**
 * Deprecated v5 - Handles blocks saved with the old ensureValueUnit bug.
 */
import classNames from 'classnames';
import { useBlockProps } from 'wp.blockEditor';

import { VIEWS, SHAPES } from '../constants';
import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import OldStyleSheet from '../../../components/stylesheet/OldStyleSheet';
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

const OldIconStyle = ({ id, attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin, size } = attributes;
  const blockId = id || getBlockId(uniqueId);

  return (
    <OldStyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-icon.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-icon.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={size}
        rule=".gutenbee-icon-block.[root] .gutenbee-icon-block-icon-wrap { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={size}
        rule=".gutenbee-icon-block.[root] svg { width: %s; }"
        unit="px"
      />
      <Rule
        value={size}
        rule=".gutenbee-icon-block.[root] svg { height: %s; }"
        unit="px"
      />
      {children}
    </OldStyleSheet>
  );
};

const IconV5 = ({
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
  blockProps = {},
  ...attributes
}) => {
  const IconComponent = require(`../svg/${icon}.svg`).default;

  const wrapperClasses = classNames(
    className,
    blockProps.className,
    id,
    getBreakpointVisibilityClassNames(blockBreakpointVisibility),
    getAuthVisibilityClasses(blockAuthVisibility),
    {
      'gutenbee-icon-block': true,
      [`align-${align || 'left'}`]: true,
      [`gutenbee-icon-block-${view}`]: !!view,
      [`gutenbee-icon-block-shape-${shape}`]: !!shape && view !== VIEWS.DEFAULT,
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
      {...blockProps}
      className={wrapperClasses}
      {...getAnimationControlDataAttributes(attributes.animation)}
    >
      <OldIconStyle
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

const v5 = {
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
  save({ attributes }) {
    const id = getBlockId(attributes.uniqueId);
    const blockProps = useBlockProps.save();
    return <IconV5 id={id} blockProps={blockProps} {...attributes} />;
  },
};

export default v5;
