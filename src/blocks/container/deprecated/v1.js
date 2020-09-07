import { InnerBlocks } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';

const ContainerStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    containerHeight,
    innerContentWidth,
    blockPadding,
    blockMargin,
    columnDirection,
    verticalContentAlignment,
    horizontalContentAlignment,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={columnDirection}
        rule=".wp-block-gutenbee-container-row { flex-direction: %s; }"
      />
      <Rule
        value={containerHeight}
        rule="{ height: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100vh',
        }}
      />
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={innerContentWidth}
        rule=".wp-block-gutenbee-container-inner { width: %s; }"
        unit="px"
        edgeCase={{
          edge: -1,
          value: '100%',
        }}
      />
      <Rule value={verticalContentAlignment} rule="{ align-items: %s; }" />
      <Rule
        value={horizontalContentAlignment}
        rule="{ justify-content: %s; }"
      />
      {children}
    </StyleSheet>
  );
};

const v1 = {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    gutter: {
      type: 'string',
      default: 'md',
    },
    columnDirection: {
      type: 'object',
      default: {
        desktop: '',
        tablet: '',
        mobile: '',
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
    overlayBackgroundColor: {
      type: 'string',
    },
    overlayBackgroundColorOpacity: {
      type: 'number',
      default: 1,
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    wideAlign: {
      type: 'boolean',
      default: false,
    },
    themeGrid: {
      type: 'boolean',
      default: false,
    },
    containerHeight: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    innerContentWidth: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '',
        tablet: '',
        mobile: '',
      }),
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
  migrate(attributes) {
    return {
      ...attributes,
      gutter: attributes.gutter,
    };
  },
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      textColor,
      backgroundColor,
      backgroundImage,
      gutter,
      overlayBackgroundColor,
      themeGrid,
    } = attributes;

    const { parallax, parallaxSpeed } = backgroundImage;

    return (
      <div
        id={getBlockId(uniqueId)}
        className={classNames(className, {
          'has-parallax': parallax,
          'theme-grid': themeGrid,
        })}
        style={{
          color: textColor,
        }}
      >
        <ContainerStyle attributes={attributes} />
        <div className="wp-block-gutenbee-container-inner">
          <div
            className={classNames({
              'wp-block-gutenbee-container-row': true,
              [`wp-block-gutenbee-container-${gutter}`]: true,
            })}
          >
            <InnerBlocks.Content />
          </div>

          {overlayBackgroundColor && (
            <div
              className="wp-block-gutenbee-container-background-overlay"
              style={{
                backgroundColor: overlayBackgroundColor,
              }}
            />
          )}
        </div>

        <div
          className={classNames({
            'wp-block-gutenbee-container-background': true,
            'gutenbee-parallax': parallax,
          })}
          data-parallax-speed={parallaxSpeed}
          style={{
            backgroundColor,
            ...getBackgroundImageStyle(backgroundImage),
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
        />
      </div>
    );
  },
};

export default v1;
