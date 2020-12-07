import classNames from 'classnames';

import { SHAPES, VIEWS } from '../constants';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import Rule from '../../../components/stylesheet/Rule';
import getBlockId from '../../../util/getBlockId';
import { getDefaultSpacingValue } from '../../../components/controls/responsive-control/default-values';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';

const IconV2Style = ({ id, attributes, children }) => {
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

export const attributes = {
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
};

export const IconV2 = ({
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
    <div id={id} className={wrapperClasses}>
      <IconV2Style
        id={id}
        attributes={{ uniqueId, blockMargin, blockPadding }}
      />
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
        <span className={iconClasses} />
      </span>
    </div>
  );
};

export default {
  attributes,
  migrate(attributes) {
    return attributes;
  },
  save({ className, attributes }) {
    const id = getBlockId(attributes.uniqueId);
    return <IconV2 id={id} className={className} {...attributes} />;
  },
};
