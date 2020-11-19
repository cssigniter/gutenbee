import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { RichText } from 'wp.blockEditor';
import classNames from 'classnames';

import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import ButtonEdit from './edit';
import ButtonStyle from './style';
import getBlockId from '../../util/getBlockId';
import ButtonBlockIcon from './block-icon';
import borderControlAttributes from '../../components/controls/border-controls/attributes';
import { getBorderCSSValue } from '../../components/controls/border-controls/helpers';
import {
  boxShadowControlAttributes,
  getBoxShadowCSSValue,
} from '../../components/controls/box-shadow-controls/helpers';
import deprecated from './deprecated';

registerBlockType('gutenbee/button', {
  title: __('GutenBee Button'),
  description: __('Prompt visitors to take action with a button-style link.'),
  icon: ButtonBlockIcon,
  category: 'gutenbee',
  keywords: [__('button'), __('button link'), __('call to action')],
  supports: {
    className: true,
    anchor: false,
  },
  parent: ['gutenbee/buttons'],
  attributes: {
    uniqueId: {
      type: 'string',
    },
    url: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'href',
    },
    text: {
      type: 'string',
      source: 'html',
      selector: 'a',
    },
    linkTarget: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'target',
    },
    rel: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'rel',
    },
    backgroundColor: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    ...borderControlAttributes(''),
    ...boxShadowControlAttributes(''),
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
  edit: ButtonEdit,
  save: ({ attributes, className }) => {
    const {
      uniqueId,
      textColor,
      backgroundColor,
      linkTarget,
      rel,
      text,
      url,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    return (
      <div className={classNames(blockId, className)}>
        <ButtonStyle attributes={attributes} />
        <RichText.Content
          tagName="a"
          href={url}
          value={text}
          target={linkTarget}
          rel={rel}
          className={classNames({
            'gutenbee-block-button-link': true,
          })}
          style={{
            backgroundColor: backgroundColor || undefined,
            color: textColor || undefined,
            ...getBorderCSSValue({ attributes, prefix: '' }),
            ...getBoxShadowCSSValue({ attributes, prefix: '' }),
          }}
        />
      </div>
    );
  },
});
