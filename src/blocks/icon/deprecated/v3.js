import classNames from 'classnames';

import { SHAPES, VIEWS } from '../constants';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const IconStyle = ({ id, attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = id || getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      {children}
    </StyleSheetV1>
  );
};

export const IconV3 = ({
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
  const IconComponent = require(`../svg/${icon}.svg`).default;

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

const v3 = {
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
      type: 'number',
      default: 40,
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
  },
  migrate: attributes => {
    return {
      ...attributes,
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
      size: {
        desktop: attributes.size || 40,
        tablet: '',
        mobile: '',
      },
    };
  },
  save({ className, attributes }) {
    const id = getBlockId(attributes.uniqueId);
    return <IconV3 id={id} className={className} {...attributes} />;
  },
};

export default v3;
