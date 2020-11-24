import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';
import { Fragment } from 'wp.element';

import {
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
import StyleSheetV1 from '../../../components/stylesheet/deprecated/v1';
import Rule from '../../../components/stylesheet/Rule';

const TestimonialStyle = ({ attributes, children }) => {
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
    <StyleSheetV1 id={blockId}>
      <Rule value={blockMargin} rule="{ margin: %s; }" unit="px" />
      <Rule value={blockPadding} rule="{ padding: %s; }" unit="px" />
      <Rule
        value={width}
        rule=".gutenbee-testimonial-avatar img { width: %s; }"
        unit="px"
      />
      <Rule
        value={contentSize}
        rule=".wp-block-testimonial-content-wrapper { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={citationSize}
        rule=".gutenbee-block-testimonial__citation { font-size: %s; }"
        unit="px"
      />
      <Rule
        value={infoSize}
        rule=".gutenbee-block-testimonial__info { font-size: %s; }"
        unit="px"
      />
      {children}
    </StyleSheetV1>
  );
};

const v1 = {
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
  },
  migrate: attributes => {
    return {
      ...attributes,
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
    } = attributes;
    const id = getBlockId(uniqueId);

    const blockProps = {
      className: classNames(className, {
        [`has-text-align-${align}`]: align,
        [`gutenbee-testimonial-avatar-${avatarPosition}`]: avatarPosition,
      }),
    };

    const image = (
      <img
        src={url}
        alt={alt}
        className={id ? `wp-image-${id}` : null}
        title={title}
      />
    );

    const classes = classNames({
      [`size-${sizeSlug}`]: sizeSlug,
      'gutenbee-testimonial-avatar': true,
    });

    const renderContent = () => {
      return (
        <div className="wp-block-testimonial-content-wrapper">
          <RichText.Content multiline value={content} />
        </div>
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
            <figure className={classes}>{image}</figure>
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
            <figure className={classes}>{image}</figure>
            {renderContent()}
            {renderCitation()}
            {renderInfo()}
          </Fragment>
        );
      }
    };

    return (
      <blockquote
        id={id}
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
};

export default v1;
