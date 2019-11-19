import { Fragment } from 'wp.element';
import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { RichText, getColorClassName } from 'wp.blockEditor';
import classNames from 'classnames';

import getBlockId from '../../util/getBlockId';
import ParagraphEdit from './edit';
import ParagraphStyle from './style';

registerBlockType('gutenbee/paragraph', {
  title: __('GutenBee Paragraph'),
  description: __('Start with the building block of all narrative.'),
  icon: 'P',
  category: 'gutenbee',
  keywords: [__('text'), __('content'), __('paragraph')],
  supports: {
    className: false,
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
      type: 'string',
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
    blockPadding: {
      type: 'object',
      default: {
        desktop: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
    },
    blockMargin: {
      type: 'object',
      default: {
        desktop: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        tablet: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
        mobile: {
          top: '',
          right: '',
          bottom: '',
          left: '',
        },
      },
    },
  },
  edit: ParagraphEdit,
  save: ({ attributes }) => {
    const {
      uniqueId,
      align,
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

    const className = classNames({
      'has-text-color': textColor || customTextColor,
      'has-drop-cap': dropCap,
      [`has-text-align-${align}`]: align,
      [textClass]: textClass,
      [backgroundClass]: backgroundClass,
    });

    const styles = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor,
    };

    return (
      <Fragment>
        <ParagraphStyle attributes={attributes} />

        <RichText.Content
          id={blockId}
          tagName="p"
          style={styles}
          className={className ? className : undefined}
          value={content}
        />
      </Fragment>
    );
  },
});
