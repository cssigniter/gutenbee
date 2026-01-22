import { Fragment } from 'wp.element';
import { RichText, useBlockProps } from 'wp.blockEditor';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import ImageStyle from '../style';
import getBlockId from '../../../util/getBlockId';
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

export default {
  attributes: {
    uniqueId: {
      type: 'string',
    },
    align: {
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
    caption: {
      type: 'string',
      source: 'html',
      selector: 'figcaption',
    },
    title: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'title',
    },
    href: {
      type: 'string',
      source: 'attribute',
      selector: 'figure > a',
      attribute: 'href',
    },
    rel: {
      type: 'string',
      source: 'attribute',
      selector: 'figure > a',
      attribute: 'rel',
    },
    linkClass: {
      type: 'string',
      source: 'attribute',
      selector: 'figure > a',
      attribute: 'class',
    },
    id: {
      type: 'number',
    },
    width: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    sizeSlug: {
      type: 'string',
    },
    linkDestination: {
      type: 'string',
      default: 'none',
    },
    linkTarget: {
      type: 'string',
      source: 'attribute',
      selector: 'figure > a',
      attribute: 'target',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    backgroundColor: {
      type: 'string',
    },
    ...borderControlAttributes('image'),
    ...boxShadowControlAttributes('image'),
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
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      url,
      alt,
      caption,
      align,
      href,
      rel,
      linkClass,
      id,
      linkTarget,
      sizeSlug,
      title,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const newRel = isEmpty(rel) ? undefined : rel;

    const classes = classNames({
      [`align${align}`]: align,
      [`size-${sizeSlug}`]: sizeSlug,
    });

    const blockId = getBlockId(uniqueId);

    if (!url) {
      return null;
    }

    const image = (
      <img
        src={url}
        alt={alt}
        className={id ? `wp-image-${id}` : null}
        title={title}
        style={{
          ...getBorderCSSValue({ attributes, prefix: 'image' }),
          ...getBoxShadowCSSValue({ attributes, prefix: 'image' }),
        }}
      />
    );

    const style = {
      backgroundColor: backgroundColor || undefined,
    };

    const figure = (
      <Fragment>
        {href ? (
          <a
            className={linkClass}
            href={href}
            target={linkTarget}
            rel={newRel}
            style={style}
          >
            {image}
          </a>
        ) : (
          image
        )}
        {!RichText.isEmpty(caption) && (
          <RichText.Content tagName="figcaption" value={caption} />
        )}
      </Fragment>
    );

    if ('left' === align || 'right' === align || 'center' === align) {
      return (
        <div
          {...useBlockProps.save({
            id: blockId,
            className: classNames(
              className,
              blockId,
              getBreakpointVisibilityClassNames(blockBreakpointVisibility),
              getAuthVisibilityClasses(blockAuthVisibility),
            ),
            style,
          })}
          id={blockId} // Preserving existing behavior of duplicate ID on div in this branch
        >
          <ImageStyle attributes={attributes} />
          <figure className={classes}>{figure}</figure>
        </div>
      );
    }

    return (
      <figure
        {...useBlockProps.save({
          id: blockId,
          className: classNames(
            className,
            blockId,
            classes,
            getBreakpointVisibilityClassNames(blockBreakpointVisibility),
            getAuthVisibilityClasses(blockAuthVisibility),
          ),
          style,
          ...getAnimationControlDataAttributes(attributes.animation),
        })}
      >
        <ImageStyle attributes={attributes} />
        {figure}
      </figure>
    );
  },
};
