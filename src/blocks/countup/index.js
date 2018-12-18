/**
 * Countup
 *
 * Count to a certain number
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { RichText } from 'wp.editor';

import edit from './edit';
import Countup from './Countup';
import CountupBlockIcon from './block-icon';
import { getMarginSettingStyles } from '../../components/controls/margin-controls/margin-settings';

const CountupRender = ({ attributes, className }) => {
  const { titleContent, align, blockMargin } = attributes;

  return (
    <div
      className={classNames({
        [className]: true,
        [`${className}-align-${align}`]: !!align,
      })}
      style={{
        margin: getMarginSettingStyles(blockMargin),
      }}
    >
      <Countup {...attributes} className={`${className}-number`} />

      {!RichText.isEmpty(titleContent) && (
        <RichText.Content
          tagName="p"
          value={titleContent}
          className={`${className}-title`}
        />
      )}
    </div>
  );
};

registerBlockType('gutenbee/countup', {
  title: __('GutenBee Countup'),
  description: __('Animate a numerical value by counting to it.'),
  category: 'gutenbee',
  icon: CountupBlockIcon,
  keywords: [__('counter'), __('numbers'), __('animation')],
  attributes: {
    startNumber: {
      type: 'string',
      default: '0',
    },
    endNumber: {
      type: 'string',
      default: '999',
    },
    animationDuration: {
      type: 'number',
      default: 2.5,
    },
    separator: {
      type: 'string',
      default: ',',
    },
    prefix: {
      type: 'string',
    },
    suffix: {
      type: 'string',
    },
    textFontSize: {
      type: 'number',
      default: 16,
    },
    textColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
    },
    titleContent: {
      source: 'html',
      selector: 'p',
    },
    align: {
      type: 'string',
      default: 'left',
    },
    blockMargin: {
      type: 'object',
      default: {},
    },
  },
  edit,
  save({ attributes, className }) {
    return <CountupRender attributes={attributes} className={className} />;
  },
});
