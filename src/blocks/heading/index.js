import { Fragment } from 'wp.element';
import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { RichText } from 'wp.blockEditor';
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

registerBlockType('gutenbee/heading', {
  title: __('GutenBee Heading'),
  description: __(
    'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.',
  ),
  icon: HeadingBlockIcon,
  category: 'gutenbee',
  keywords: [__('title'), __('subtitle'), __('heading')],
  supports: {
    className: true,
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
  },
  deprecated,
  transforms,
  edit: HeadingEdit,
  save: ({ attributes, className }) => {
    const { uniqueId, content, level, textColor, backgroundColor } = attributes;
    const tagName = 'h' + level;

    const blockId = getBlockId(uniqueId);

    const classes = classNames({
      'wp-block-gutenbee-heading': true,
      [className]: !!className,
      [blockId]: true,
      'has-text-color': !!textColor,
      'has-background-color': !!backgroundColor,
    });

    return (
      <Fragment>
        <HeadingStyle attributes={attributes} />

        <RichText.Content
          className={classes}
          tagName={tagName}
          style={{
            color: textColor ? textColor : undefined,
            backgroundColor: backgroundColor ? backgroundColor : undefined,
            ...getBorderCSSValue({ attributes }),
            ...getBoxShadowCSSValue({ attributes }),
          }}
          value={content}
        />
      </Fragment>
    );
  },
});
