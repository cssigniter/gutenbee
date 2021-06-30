import { Fragment } from 'wp.element';
import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { RichText, getColorClassName, useBlockProps } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../util/getBlockId';
import ParagraphEdit from './edit';
import ParagraphStyle from './style';
import ParagraphBlockIcon from './block-icon';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import deprecated from './deprecated';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import { getBreakpointVisibilityClassNames } from '../../components/controls/breakpoint-visibility-control/helpers';
import { getAuthVisibilityClasses } from '../../components/controls/auth-visibility-control/helpers';

registerBlockType('gutenbee/paragraph', {
  apiVersion: 2,
  title: __('GutenBee Paragraph'),
  description: __('Start with the building block of all narrative.'),
  icon: ParagraphBlockIcon,
  category: 'gutenbee',
  keywords: [__('text'), __('content'), __('paragraph')],
  supports: {
    className: true,
    anchor: false,
  },
  example: {
    attributes: {
      content: __(
        'It was a bright cold day in April, and the clocks were striking thirteen.',
      ),
      fontSize: 16,
      dropCap: false,
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
      selector: 'p',
      default: '',
    },
    dropCap: {
      type: 'boolean',
      default: false,
    },
    placeholder: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    customBackgroundColor: {
      type: 'string',
    },
    fontSize: {
      type: 'object',
      default: {
        desktop: '',
        tablet: '',
        mobile: '',
      },
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
  getEditWrapperProps() {
    return { 'data-align': true };
  },
  deprecated,
  edit: ParagraphEdit,
  save: ({ attributes }) => {
    const {
      uniqueId,
      content,
      dropCap,
      backgroundColor,
      textColor,
      customBackgroundColor,
      customTextColor,
      blockBreakpointVisibility,
      blockAuthVisibility,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    const textClass = getColorClassName('color', textColor);
    const backgroundClass = getColorClassName(
      'background-color',
      backgroundColor,
    );

    const blockProps = useBlockProps.save({
      id: blockId,
      className: classNames(
        blockId,
        getBreakpointVisibilityClassNames(blockBreakpointVisibility),
        getAuthVisibilityClasses(blockAuthVisibility),
        {
          'has-text-color': textColor || customTextColor,
          'has-drop-cap': dropCap,
          [textClass]: textClass,
          [backgroundClass]: backgroundClass,
        },
      ),
      style: {
        backgroundColor: backgroundClass ? undefined : customBackgroundColor,
        color: textClass ? undefined : customTextColor,
        ...getBorderCSSValue({ attributes }),
        ...getBoxShadowCSSValue({ attributes }),
      },
    });

    return (
      <Fragment>
        <RichText.Content {...blockProps} tagName="p" value={content} />
        <ParagraphStyle attributes={attributes} />
      </Fragment>
    );
  },
});
