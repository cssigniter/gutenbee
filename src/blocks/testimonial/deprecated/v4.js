/**
 * Deprecated v4 - Handles blocks saved with the old ensureValueUnit bug.
 */
import { RichText, useBlockProps } from 'wp.blockEditor';
import classNames from 'classnames';
import { Fragment } from 'wp.element';

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
import getBlockId from '../../../util/getBlockId';
import Rule from '../../../components/stylesheet/Rule';
import OldStyleSheet from '../../../components/stylesheet/OldStyleSheet';
import { getBreakpointVisibilityClassNames } from '../../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../../components/controls/auth-visibility-control/helpers';
import {
  animationControlAttributes,
  getAnimationControlDataAttributes,
} from '../../../components/controls/animation-controls/helpers';

const OldTestimonialStyle = ({ attributes, children }) => {
  const {
    uniqueId,
    contentSize,
    citationSize,
    infoSize,
    blockPadding,
    blockMargin,
    width,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <OldStyleSheet id={blockId}>
      <Rule
        value={blockMargin}
        rule=".wp-block-gutenbee-testimonial.[root] { margin: %s; }"
        unit="px"
      />
      <Rule
        value={blockPadding}
        rule=".wp-block-gutenbee-testimonial.[root] { padding: %s; }"
        unit="px"
      />
      <Rule
        value={width}
        rule=".wp-block-gutenbee-testimonial.[root] .gutenbee-testimonial-avatar img { width: %s; }"
        unit="px"
      />
      <Rule
        value={contentSize}
        rule=".wp-block-gutenbee-testimonial.[root] .wp-block-testimonial-content-wrapper { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={citationSize}
        rule=".wp-block-gutenbee-testimonial.[root] .gutenbee-block-testimonial__citation { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={infoSize}
        rule=".wp-block-gutenbee-testimonial.[root] .gutenbee-block-testimonial__info { font-size: %s; }"
        unit="px"
      />
      {children}
    </OldStyleSheet>
  );
};

const v4 = {
  supports: {
    anchor: false,
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    url: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
    },
    alt: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'alt',
      default: '',
    },
    title: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'title',
    },
    id: {
      type: 'number',
    },
    width: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '150',
        tablet: '',
        mobile: '',
      }),
    },
    content: {
      type: 'string',
      source: 'html',
      selector: '.wp-block-testimonial-content-wrapper',
      default: '',
    },
    sizeSlug: {
      type: 'string',
    },
    citation: {
      type: 'string',
      source: 'html',
      selector: 'cite',
      default: '',
    },
    info: {
      type: 'string',
      source: 'html',
      selector: '.gutenbee-block-testimonial__info',
      default: '',
    },
    align: {
      type: 'string',
    },
    avatarPosition: {
      type: 'string',
      default: 'top',
    },
    contentSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '17',
        tablet: '',
        mobile: '',
      }),
    },
    citationSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '17',
        tablet: '',
        mobile: '',
      }),
    },
    infoSize: {
      type: 'object',
      default: getDefaultResponsiveValue({
        desktop: '15',
        tablet: '',
        mobile: '',
      }),
    },
    textColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    ...borderControlAttributes(),
    ...boxShadowControlAttributes(),
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
      align,
      url,
      alt,
      title,
      content,
      citation,
      info,
      avatarPosition,
      sizeSlug,
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
        {
          [`has-text-align-${align}`]: align,
          [`gutenbee-testimonial-avatar-${avatarPosition}`]: avatarPosition,
        },
      ),
      style: {
        backgroundColor: backgroundColor ? backgroundColor : undefined,
        color: textColor ? textColor : undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      },
      ...getAnimationControlDataAttributes(attributes.animation),
    });

    const image = (
      <img
        src={url}
        alt={alt}
        className={blockId ? `wp-image-${blockId}` : null}
        title={title}
      />
    );

    const classes = classNames({
      [`size-${sizeSlug}`]: sizeSlug,
      'gutenbee-testimonial-avatar': true,
    });

    const renderContent = () => {
      return (
        <Fragment>
          {!RichText.isEmpty(content) && (
            <div className="wp-block-testimonial-content-wrapper">
              <RichText.Content value={content} />
            </div>
          )}
        </Fragment>
      );
    };

    const renderCitation = () => {
      return (
        <Fragment>
          {!RichText.isEmpty(citation) && (
            <RichText.Content
              tagName="cite"
              className="gutenbee-block-testimonial__citation"
              value={citation}
              style={{
                color: textColor ? textColor : undefined,
              }}
            />
          )}
        </Fragment>
      );
    };

    const renderInfo = () => {
      return (
        <Fragment>
          {!RichText.isEmpty(info) && (
            <RichText.Content
              tagName="p"
              className="gutenbee-block-testimonial__info"
              value={info}
            />
          )}
        </Fragment>
      );
    };
    const renderTestimonialLayout = () => {
      if (['left', 'right'].includes(avatarPosition)) {
        return (
          <Fragment>
            {url && <figure className={classes}>{image}</figure>}
            <div className="gutenbee-testimonial-content-citation-wrapper">
              {renderContent()}
              {renderCitation()}
              {renderInfo()}
            </div>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            {url && <figure className={classes}>{image}</figure>}
            {renderContent()}
            {renderCitation()}
            {renderInfo()}
          </Fragment>
        );
      }
    };

    return (
      <blockquote {...blockProps}>
        {renderTestimonialLayout()}
        <OldTestimonialStyle attributes={attributes} />
      </blockquote>
    );
  },
};

export default v4;
