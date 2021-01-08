import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import { getBackgroundImageStyle } from '../../../../components/controls/background-controls/helpers';
import { getBorderCSSValue } from '../../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../../components/controls/box-shadow-controls/helpers';
import Rule from '../../../../components/stylesheet/Rule';
import getBlockId from '../../../../util/getBlockId';
import StyleSheet from '../../../../components/stylesheet';
import borderControlAttributes from '../../../../components/controls/border-controls/attributes';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../../components/controls/responsive-control/default-values';
import { getBreakpointVisibilityClassNames } from '../../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../../components/controls/auth-visibility-control/helpers';

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
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-column.[root] .wp-block-gutenbee-column-content { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-column.[root] .wp-block-gutenbee-column-content { padding: %s; }"
        unit="px"
      />
      <Rule
        value={horizontalContentAlignment}
        rule=".wp-block-gutenbee-column.[root] .wp-block-gutenbee-column-content { align-items: %s; }"
      />
      <Rule
        value={verticalContentAlignment}
        rule=".wp-block-gutenbee-column.[root] .wp-block-gutenbee-column-content { justify-content: %s; }"
      />
      {children}
    </StyleSheet>
  );
};

const v2 = {
  supports: {
    inserter: false,
    reusable: false,
    html: false,
    anchor: true,
  },
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
  },
  migrate(attributes) {
    return {
      ...attributes,
      backgroundImage: {
        desktop: {
          url: attributes.backgroundImage.url,
          repeat: attributes.backgroundImage.repeat,
          size: attributes.backgroundImage.size,
          position: attributes.backgroundImage.position,
          attachment: attributes.backgroundImage.attachment,
        },
        tablet: {
          url: '',
          repeat: 'no-repeat',
          size: 'cover',
          position: 'top center',
          attachment: 'scroll',
        },
        mobile: {
          url: '',
          repeat: 'no-repeat',
          size: 'cover',
          position: 'top center',
          attachment: 'scroll',
        },
      },
      backgroundImageEffects: {
        zoom: attributes.backgroundImage?.zoom ?? false,
        parallax: attributes.backgroundImage?.parallax ?? false,
        parallaxSpeed: attributes.backgroundImage?.parallaxSpeed ?? 0.3,
      },
    };
  },
  save({ attributes, className }) {
    const {
      width,
      uniqueId,
      textColor,
      backgroundColor,
      backgroundImage,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
          {
            'wp-block-gutenbee-column': true,
          },
        )}
      >
        <ColumnStyle attributes={attributes}>
          <Rule
            value={width}
            rule=".wp-block-gutenbee-column.[root] { flex-basis: %s; }"
            unit="%"
          />
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

export default v2;
