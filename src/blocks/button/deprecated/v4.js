/**
 * Deprecated v4 - Handles blocks saved with the old ensureValueUnit bug.
 */
import classNames from 'classnames';
import { RichText, useBlockProps } from 'wp.blockEditor';

import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import OldStyleSheet from '../../../components/stylesheet/OldStyleSheet';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../components/controls/animation-controls/helpers';

const OldButtonStyle = ({ attributes }) => {
  const { uniqueId, blockPadding, blockMargin, fontSize } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <OldStyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-button.[root] .gutenbee-block-button-link { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-button.[root] .gutenbee-block-button-link { padding: %s; }"
        unit="px"
      />
      <Rule
        value={fontSize}
        rule=".wp-block-gutenbee-button.[root] .gutenbee-block-button-link { font-size: %s; }"
        unit="px"
      />
    </OldStyleSheet>
  );
};

const v4 = {
  supports: {
    className: true,
    anchor: false,
    splitting: true,
  },
  parent: ['gutenbee/buttons'],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    url: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'href',
    },
    text: {
      type: 'string',
      source: 'html',
      selector: 'a',
    },
    linkTarget: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'target',
    },
    rel: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'rel',
    },
    backgroundColor: {
      type: 'string',
    },
    fontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '',
        tablet: '',
        mobile: '',
      }),
    },
    textColor: {
      type: 'string',
    },
    ...borderControlAttributes(''),
    ...boxShadowControlAttributes(''),
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
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
  save: ({ attributes }) => {
    const {
      uniqueId,
      textColor,
      backgroundColor,
      linkTarget,
      rel,
      text,
      url,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    const blockProps = useBlockProps.save({
      id: blockId,
      className: classNames(
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
      ),
      ...getAnimationControlDataAttributes(attributes.animation),
    });

    return (
      <div {...blockProps}>
        <OldButtonStyle attributes={attributes} />
        <RichText.Content
          tagName="a"
          href={url}
          value={text}
          target={linkTarget}
          rel={rel}
          className={classNames({
            'gutenbee-block-button-link': true,
          })}
          style={{
            backgroundColor: backgroundColor || undefined,
            color: textColor || undefined,
            ...getBorderCSSValue({ attributes, prefix: '' }),
            ...getBoxShadowCSSValue({ attributes, prefix: '' }),
          }}
        />
      </div>
    );
  },
};

export default v4;
