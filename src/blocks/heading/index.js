import { Fragment } from 'wp.element';
import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { RichText, useBlockProps } from 'wp.blockEditor';
import classNames from 'classnames';

import HeadingEdit from './edit';
import getBlockId from '../../util/getBlockId';
import HeadingStyle from './style';
import HeadingBlockIcon from './block-icon';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import deprecated from './deprecated';
import transforms from './transforms';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

registerBlockType('gutenbee/heading', {
  apiVersion: 2,
  title: __('GutenBee Heading'),
  description: __(
    'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.',
  ),
  icon: HeadingBlockIcon,
  category: 'gutenbee',
  keywords: [__('title'), __('subtitle'), __('heading')],
  supports: {
    className: true,
    anchor: false,
  },
  example: {
    attributes: {
      content: __('Code is Poetry'),
      level: 2,
    },
  },
  attributes: {
    uniqueId: {
      type: 'string',
    },
    align: {
      type: 'object',
      default: getDefaultResponsiveValue(),
    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'h1,h2,h3,h4,h5,h6',
      default: '',
    },
    level: {
      type: 'number',
      default: 2,
    },
    placeholder: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    fontSize: {
      type: 'object',
      default: getDefaultResponsiveValue(),
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
  transforms,
  getEditWrapperProps() {
    return { 'data-align': true };
  },
  edit: HeadingEdit,
  save: ({ attributes }) => {
    const {
      uniqueId,
      content,
      level,
      textColor,
      backgroundColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;
    const tagName = 'h' + level;

    const blockId = getBlockId(uniqueId);

    const classes = classNames(
      blockId,
      getBreakpointVisibilityClassNames(blockBreakpointVisibility),
      getAuthVisibilityClasses(blockAuthVisibility),
      {
        'has-text-color': !!textColor,
        'has-background-color': !!backgroundColor,
      },
    );

    const blockProps = useBlockProps.save({
      id: blockId,
      className: classes,
      style: {
        color: textColor ? textColor : undefined,
        backgroundColor: backgroundColor ? backgroundColor : undefined,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      },
    });

    return (
      <Fragment>
        <RichText.Content tagName={tagName} value={content} {...blockProps} />
        <HeadingStyle attributes={attributes} />
      </Fragment>
    );
  },
});
