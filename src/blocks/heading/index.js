import { Fragment } from 'wp.element';
import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { getColorClassName, RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import HeadingEdit from './edit';
import getBlockId from '../../util/getBlockId';
import HeadingStyle from './style';

registerBlockType('gutenbee/heading', {
  title: __('Heading'),
  description: __(
    'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.',
  ),
  icon: 'H',
  category: 'gutenbee',
  keywords: [__('title'), __('subtitle'), __('heading')],
  supports: {
    className: false,
    anchor: true,
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
      type: 'string',
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
    customTextColor: {
      type: 'string',
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
  edit: HeadingEdit,
  save: ({ attributes }) => {
    const {
      uniqueId,
      align,
      content,
      customTextColor,
      level,
      textColor,
    } = attributes;
    const tagName = 'h' + level;

    const textClass = getColorClassName('color', textColor);

    const className = classNames({
      [textClass]: textClass,
      'has-text-color': textColor || customTextColor,
      [`has-text-align-${align}`]: align,
    });

    const blockId = getBlockId(uniqueId);

    return (
      <Fragment>
        <HeadingStyle attributes={attributes} />

        <RichText.Content
          id={blockId}
          className={className ? className : undefined}
          tagName={tagName}
          style={{
            color: textClass ? undefined : customTextColor,
          }}
          value={content}
        />
      </Fragment>
    );
  },
});
