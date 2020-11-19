import { Fragment } from 'wp.element';
import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { RichText, getColorClassName } from 'wp.blockEditor';
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

registerBlockType('gutenbee/paragraph', {
  title: __('GutenBee Paragraph'),
  description: __('Start with the building block of all narrative.'),
  icon: ParagraphBlockIcon,
  category: 'gutenbee',
  keywords: [__('text'), __('content'), __('paragraph')],
  supports: {
    className: true,
    anchor: true,
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
  },
  deprecated,
  edit: ParagraphEdit,
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      content,
      dropCap,
      backgroundColor,
      textColor,
      customBackgroundColor,
      customTextColor,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    const textClass = getColorClassName('color', textColor);
    const backgroundClass = getColorClassName(
      'background-color',
      backgroundColor,
    );

    const classes = classNames(
      'wp-block-gutenbee-paragraph',
      className,
      blockId,
      {
        'has-text-color': textColor || customTextColor,
        'has-drop-cap': dropCap,
        [textClass]: textClass,
        [backgroundClass]: backgroundClass,
      },
    );

    const styles = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor,
      ...getBorderCSSValue({ attributes }),
      ...getBoxShadowCSSValue({ attributes }),
    };

    return (
      <Fragment>
        <ParagraphStyle attributes={attributes} />

        <RichText.Content
          tagName="p"
          style={styles}
          className={classes}
          value={content}
        />
      </Fragment>
    );
  },
});
