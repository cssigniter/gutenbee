import classNames from 'classnames';
import PropTypes from 'prop-types';

import getBlockId from '../../../util/getBlockId';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import { getDefaultResponsiveBackgroundImageValue } from '../../../components/controls/background-controls/helpers';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';

const SpacerStyle = ({ attributes, children }) => {
  const { uniqueId, height, blockMargin, backgroundImage } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={height}
        rule=".wp-block-gutenbee-spacer.[root] { height: %s; }"
        unit="px"
      />
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-spacer.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={backgroundImage}
        rule=".wp-block-gutenbee-spacer.[root] .wp-block-gutenbee-spacer-background { %s }"
      />
      {children}
    </StyleSheet>
  );
};

SpacerStyle.propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const v5 = {
  supports: {
    anchor: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    height: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 100 }),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    backgroundColor: {
      type: 'string',
    },
    backgroundImage: {
      type: 'object',
      default: getDefaultResponsiveBackgroundImageValue(),
    },
    backgroundImageEffects: {
      type: 'object',
      default: {
        zoom: false,
        parallax: false,
        parallaxSpeed: 0.3,
      },
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
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      backgroundColor,
      backgroundImageEffects,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;
    const blockId = getBlockId(uniqueId);
    const { parallax, parallaxSpeed } = backgroundImageEffects ?? {};

    return (
      <div
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
          {
            'has-parallax': parallax,
          },
        )}
        style={{
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        aria-hidden
      >
        <SpacerStyle attributes={attributes} />

        <div
          className={classNames({
            'wp-block-gutenbee-spacer-background': true,
            'gutenbee-parallax': parallax,
          })}
          data-parallax-speed={parallaxSpeed}
          style={{
            backgroundColor: backgroundColor || undefined,
          }}
        />
      </div>
    );
  },
};

export default v5;
