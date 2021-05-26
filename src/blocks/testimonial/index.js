import { registerBlockType } from 'wp.blocks';
import { __, _x } from 'wp.i18n';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';
import { Fragment } from 'wp.element';

import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import TestimonialEdit from './edit';
import getBlockId from '../../util/getBlockId';
import TestimonialStyle from './style';
import TestimonialBlockIcon from './block-icon';
import deprecated from './deprecated';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

registerBlockType('gutenbee/testimonial', {
  title: __('GutenBee Testimonial'),
  description: __('Displays a testimonial.'),
  icon: TestimonialBlockIcon,
  category: 'gutenbee',
  keywords: [__('testimonial'), __('quote'), __('blockquote')],
  styles: [
    { name: 'default', label: _x('Default', 'block style'), isDefault: true },
    { name: 'rounded', label: _x('Rounded', 'block style') },
  ],
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
      multiline: 'p',
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
  },
  deprecated,
  edit: TestimonialEdit,
  save: ({ attributes, className }) => {
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

    const blockProps = {
      id: blockId,
      className: classNames(
        className,
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
        {
          [`has-text-align-${align}`]: align,
          [`gutenbee-testimonial-avatar-${avatarPosition}`]: avatarPosition,
        },
      ),
    };

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
              <RichText.Content multiline value={content} />
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
      <blockquote
        {...blockProps}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : undefined,
          color: textColor ? textColor : undefined,
          ...getBorderCSSValue({ attributes }),
          ...getBoxShadowCSSValue({ attributes }),
        }}
      >
        {renderTestimonialLayout()}
        <TestimonialStyle attributes={attributes} />
      </blockquote>
    );
  },
});
