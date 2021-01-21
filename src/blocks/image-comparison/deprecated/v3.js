import classNames from 'classnames';

import getBlockId from '../../../util/getBlockId';
import StyleSheet from '../../../components/stylesheet';
import Rule from '../../../components/stylesheet/Rule';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';

const ImageComparisonStyle = ({ attributes, children }) => {
  const { uniqueId, blockPadding, blockMargin } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <StyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-image-comparison.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-image-comparison.[root] { padding: %s; }"
        unit="px"
      />
      {children}
    </StyleSheet>
  );
};

const v3 = {
  supports: {
    anchor: true,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    urlA: {
      type: 'string',
      source: 'attribute',
      selector: '.img-1',
      attribute: 'src',
    },
    idA: {
      type: 'number',
    },
    urlB: {
      type: 'string',
      source: 'attribute',
      selector: '.img-2',
      attribute: 'src',
    },
    idB: {
      type: 'number',
    },
    offset: {
      type: 'number',
      default: 50,
    },
    imageSize: {
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
    backgroundColor: {
      type: 'string',
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
    return attributes;
  },
  save: ({ className, attributes }) => {
    const {
      uniqueId,
      urlA,
      urlB,
      offset,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;
    const blockId = getBlockId(uniqueId);

    return (
      <div
        id={blockId}
        style={{
          backgroundColor: backgroundColor || undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
        className={classNames(
          className,
          blockId,
          getBreakpointVisibilityClassNames(blockBreakpointVisibility),
          getAuthVisibilityClasses(blockAuthVisibility),
        )}
      >
        <div className="wp-block-gutenbee-comparison-wrap" data-offset={offset}>
          <ImageComparisonStyle attributes={attributes} />

          {urlA && <img className="img-1" src={urlA} alt="" />}
          {urlB && <img className="img-2" src={urlB} alt="" />}
        </div>
      </div>
    );
  },
};

export default v3;
