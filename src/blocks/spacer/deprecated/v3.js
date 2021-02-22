import classNames from 'classnames';

import {
  getDefaultBackgroundImageValue,
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import getBlockId from '../../../util/getBlockId';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import { getBackgroundImageStyle } from '../../../components/controls/background-controls/helpers';
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const SpacerStyle = ({ attributes, children }) => {
  const { uniqueId, height, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheetV1 id={blockId}>
      <Rule value={height} rule="{ height: %s; }" unit="px" />
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      {children}
    </StyleSheetV1>
  );
};

const v3 = {
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
      default: getDefaultBackgroundImageValue(),
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
  },
  migrate: attributes => {
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
      blockBreakpointVisibility: {
        desktop: false,
        tablet: false,
        mobile: false,
      },
      blockAuthVisibility: {
        loggedIn: false,
        loggedOut: false,
      },
    };
  },
  save: ({ attributes, className }) => {
    const { uniqueId, backgroundColor, backgroundImage } = attributes;
    const blockId = getBlockId(uniqueId);
    const { parallax, parallaxSpeed } = backgroundImage;

    return (
      <div
        id={blockId}
        className={classNames(className, {
          'has-parallax': parallax,
        })}
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
            ...getBackgroundImageStyle(backgroundImage),
          }}
        />
      </div>
    );
  },
};

export default v3;
