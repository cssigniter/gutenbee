import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../../util/getBlockId';
import Rule from '../../../../components/stylesheet/Rule';
import { getBackgroundImageStyle } from '../../../../components/controls/background-controls/helpers';
import { getBorderCSSValue } from '../../../../components/controls/border-controls/helpers';
import StyleSheetV1 from '../../../../components/stylesheet/deprecated/v1';

const ColumnStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    blockPadding,
    blockMargin,
    verticalContentAlignment,
    horizontalContentAlignment,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-column-content { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-column-content { padding: %s; }"
        unit="px"
      />
      <Rule
        value={horizontalContentAlignment}
        rule=".wp-block-gutenbee-column-content { align-items: %s; }"
      />
      <Rule
        value={verticalContentAlignment}
        rule=".wp-block-gutenbee-column-content { justify-content: %s; }"
      />
      {children}
    </StyleSheetV1>
  );
};

const v1 = {
  attributes: {
    uniqueId: {
      type: 'string',
      default: '',
    },
    width: {
      type: 'object',
      default: {
        desktop: '',
        tablet: 100,
        mobile: 100,
      },
    },
    textColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    backgroundImage: {
      type: 'object',
      default: {
        url: '',
        image: null,
        repeat: 'no-repeat',
        size: 'cover',
        position: 'top center',
        attachment: 'scroll',
        parallax: false,
        parallaxSpeed: 0.3,
      },
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    verticalContentAlignment: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    horizontalContentAlignment: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  save({ attributes, className }) {
    const {
      width,
      uniqueId,
      textColor,
      backgroundColor,
      backgroundImage,
    } = attributes;

    return (
      <div
        id={getBlockId(uniqueId)}
        className={classNames(className, {
          'wp-block-gutenbee-column': true,
        })}
      >
        <ColumnStyle attributes={attributes}>
          <Rule value={width} rule="{ flex-basis: %s; }" unit="%" />
        </ColumnStyle>

        <div
          className="wp-block-gutenbee-column-content"
          style={{
            color: textColor,
            backgroundColor,
            ...getBackgroundImageStyle(backgroundImage),
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
        >
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
};

export default v1;
