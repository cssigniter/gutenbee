/**
 * Countup
 *
 * Count to a certain number
 */

import { __ } from 'wp.i18n';
import { registerBlockType } from 'wp.blocks';
import classNames from 'classnames';
import { RichText } from 'wp.blockEditor';

import CountupEdit from './edit';
import Countup from './Countup';
import CountupBlockIcon from './block-icon';
import {
  getDefaultResponsiveValue,
  getDefaultSpacingValue,
} from '../../components/controls/responsive-control/default-values';
import getBlockId from '../../util/getBlockId';
import CountupStyle from './style';
import deprecated from './deprecated';

const CountupRender = ({ attributes, className }) => {
  const {
    titleContent,
    align,
    titleColor,
    backgroundColor,
    titleTopMargin,
    uniqueId,
  } = attributes;
  const blockId = getBlockId(uniqueId);

  return (
    <div
      id={blockId}
      className={classNames({
        [className]: true,
        [`${className}-align-${align}`]: !!align,
      })}
      style={{
        backgroundColor: backgroundColor || undefined,
      }}
    >
      <CountupStyle attributes={attributes} />

      <Countup {...attributes} className={`${className}-number`} />

      {!RichText.isEmpty(titleContent) && (
        <RichText.Content
          tagName="p"
          value={titleContent}
          className={`${className}-title`}
          style={{
            color: titleColor || undefined,
            marginTop:
              titleTopMargin != null ? `${titleTopMargin}px` : undefined,
          }}
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
    uniqueId: {
      type: 'string',
    },
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
      default: getDefaultResponsiveValue({ desktop: 16 }),
    },
    titleFontSize: {
      type: 'object',
      default: getDefaultResponsiveValue({ desktop: 16 }),
    },
    titleContent: {
      source: 'html',
      selector: 'p',
    },
    align: {
      type: 'string',
      default: 'left',
    },
    blockPadding: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    blockMargin: {
      type: 'object',
      default: getDefaultSpacingValue(),
    },
    titleTopMargin: {
      type: 'number',
    },
    textColor: {
      type: 'string',
    },
    titleColor: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
  },
  deprecated,
  edit: CountupEdit,
  save({ attributes, className }) {
    return <CountupRender attributes={attributes} className={className} />;
  },
});
