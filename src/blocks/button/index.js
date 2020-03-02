import { registerBlockType } from 'wp.blocks';
import { __ } from 'wp.i18n';
import { RichText } from 'wp.blockEditor';
import classnames from 'classnames';

import { getDefaultSpacingValue } from '../../components/controls/responsive-control/default-values';
import ButtonEdit from './edit';
import ButtonStyle from './style';
import getBlockId from '../../util/getBlockId';
import ButtonBlockIcon from './block-icon';

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
    borderRadius: {
      type: 'number',
    },
    borderWidth: {
      type: 'number',
    },
    backgroundColor: {
      type: 'string',
    },
    borderColor: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
  },
  edit: ButtonEdit,
  save: ({ attributes }) => {
    const {
      uniqueId,
      textColor,
      borderColor,
      backgroundColor,
      borderRadius,
      borderWidth,
      linkTarget,
      rel,
      text,
      url,
    } = attributes;

    const blockId = getBlockId(uniqueId);

    return (
      <div id={blockId}>
        <ButtonStyle attributes={attributes} />
        <RichText.Content
          tagName="a"
          href={url}
          value={text}
          target={linkTarget}
          rel={rel}
          className={classnames({
            'gutenbee-block-button-link': true,
          })}
          style={{
            backgroundColor: backgroundColor || undefined,
            borderColor: borderColor || undefined,
            color: textColor || undefined,
            borderRadius:
              borderRadius != null ? `${borderRadius}px` : undefined,
            borderWidth: borderWidth != null ? `${borderWidth}px` : undefined,
          }}
        />
      </div>
    );
  },
});
