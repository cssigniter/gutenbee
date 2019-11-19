import { Fragment } from 'wp.element';
import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import HeadingEdit from './edit';
import getBlockId from '../../util/getBlockId';
import HeadingStyle from './style';

registerBlockType('gutenbee/heading', {
  title: __('GutenBee Heading'),
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
    backgroundColor: {
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
      level,
      textColor,
      backgroundColor,
    } = attributes;
    const tagName = 'h' + level;

    const className = classNames({
      'has-text-color': !!textColor,
      'has-background-color': !!backgroundColor,
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
            color: textColor ? textColor : undefined,
            backgroundColor: backgroundColor ? backgroundColor : undefined,
          }}
          value={content}
        />
      </Fragment>
    );
  },
});
